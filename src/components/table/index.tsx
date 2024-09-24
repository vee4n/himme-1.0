import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter } from "~/components/table/Filter";
import { RoundButton } from "~/components/table/RoundButton";
import { LoadingSpinner } from "~/components/Spinner";

import {
  colorOf,
  fuzzyFilter,
  refreshData,
  toggleCheckIn,
  togglePickUp,
  updateStatusCheckIn,
  updateStatusPickUp,
} from "~/lib/table";
import type { Participant } from "~/lib/table";
import { Modal } from "../Modal";
import { useModal } from "~/lib/hooks/useModal";

export function Table({ participants }) {
  const [data, setData] = useState(participants ?? []);
  const [loadingCheckIn, setLoadingCheckIn] = useState(-1);
  const [loadingPickup, setLoadingPickup] = useState(-1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(0);
  const [selectedRowValue, setSelectedRowValue] = useState(0);
  const columns = useMemo<ColumnDef<Participant>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <code>{info.getValue()}</code>,
      },
      {
        accessorKey: "name",
        header: "Nama",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "nim",
        header: "NIM",
        cell: (info) => <code>{info.getValue()}</code>,
      },
      {
        accessorKey: "phone",
        header: "No HP",
        cell: (info) => <code>{info.getValue()}</code>,
      },
      {
        accessorFn: (p) => p.group.name,
        header: "Kelompok",
        cell: (info) => (
          <span
            style={{
              ...colorOf(info.getValue()),
              fontWeight: 600,
              padding: ".25rem",
              whiteSpace: "nowrap",
              borderRadius: "4px",
            }}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorFn: (p) => p.group.pic,
        header: "PIC",
        cell: (info) => info.getValue(),
      },
      // {
      //   accessorKey: "pickedUp",
      //   header: "Item Picked Up",
      //   cell: (info) => (
      //     <button
      //       className="ml-12 text-center hover:bg-gray-200 active:bg-gray-300 p-2 rounded-full"
      //       disabled={loadingPickup === Number(info.row.id)}
      //       onClick={() => {
      //         setSelectedRowId(info.row.getValue("id"));
      //         setSelectedRowValue(info.getValue());
      //         // @ts-ignore
      //         toggleModalPickup();
      //       }}
      //     >
      //       {loadingPickup === Number(info.row.id) ? (
      //         <LoadingSpinner color={"slate-400"} />
      //       ) : info.getValue() ? (
      //         "✅"
      //       ) : (
      //         "❌"
      //       )}
      //     </button>
      //   ),
      // },
      {
        accessorKey: "checkInId",
        header: "Status",
        cell: (info) => (
          <button
            className="ml-2 text-center hover:bg-gray-200 active:bg-gray-300 p-2 rounded-full"
            disabled={loadingCheckIn === Number(info.row.id)}
            onClick={() => {
              setSelectedRowId(info.row.getValue("id"));
              setSelectedRowValue(info.getValue());
              // @ts-ignore
              toggleModalCheckIn();
            }}
          >
            {loadingCheckIn === Number(info.row.id) ? (
              <LoadingSpinner color={"slate-400"} />
            ) : info.getValue() ? (
              "✅"
            ) : (
              "❌"
            )}
          </button>
        ),
      },
      {
        accessorKey: "checkIn",
        header: "Check-In",
        cell: (info) => {
          if (!info.getValue()) return "N/A";
          // @ts-ignore
          const dt = new Date(info.getValue().date);
          const pad = (num) => (num < 10 ? `0${num}` : num);
          return <code>{`${pad(dt.getHours())}:${pad(dt.getMinutes())}`}</code>;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingCheckIn]
  );
  const [isOpenCheckIn, toggleModalCheckIn] = useModal();
  const [isOpenPickup, toggleModalPickup] = useModal();

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
  });

  const download = () => {
    const csvStr = [
      ["ID", "Nama", "NIM", "Email", "No. HP", "Kelompok", "PIC", "Check In"],
      ...data.map((i) => [
        i.id,
        i.name,
        i.nim,
        i.email,
        i.phone,
        i.group.name,
        i.group.pic,
        i.checkInId ? i.checkIn.date : "",
      ]),
    ]
      .map((i) => i.join(","))
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([csvStr], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "check-in-peserta.csv";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <Modal
        isOpen={isOpenCheckIn}
        toggleModal={toggleModalCheckIn}
        action={async () => {
          setLoadingCheckIn(selectedRowId - 1);

          const checkIn = await toggleCheckIn(selectedRowId, selectedRowValue);
          updateStatusCheckIn(selectedRowId, checkIn, setData);

          setLoadingCheckIn(-1);
        }}
        message={`Change status to ${selectedRowValue ? '"Not Checked-In"' : '"Checked-In"'
          }?`}
      />

      <Modal
        isOpen={isOpenPickup}
        toggleModal={toggleModalPickup}
        action={async () => {
          setLoadingPickup(selectedRowId - 1);

          const _pickedUp = await togglePickUp(selectedRowId, selectedRowValue);
          updateStatusPickUp(selectedRowId, setData);

          setLoadingPickup(-1);
        }}
        message={`Change status to ${selectedRowValue ? '"Not Picked Up"' : '"Picked Up"'
          }?`}
      />

      <div className="px-4 py-3 flex flex-col justify-center space-y-3 min-w-[16rem] text-xl font-bold md:hidden">
        Open this page on your laptop to view the dashboard.
      </div>
      <div className="hidden md:block border rounded-lg shadow-md border bg-white max-w-7xl m-auto p-8 my-16 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Participants</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {/* <button
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-3 py-2 text-white font-semibold hover:bg-opacity-80 rounded flex space-x-2 text-sm"
              onClick={download}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Export CSV</span>
            </button> */}
            <p>Participants checked-in: {data.reduce((acc, e) => acc + (e.checkInId ? 1 : 0), 0)} </p>
            {/* <p>Items picked up: {data.reduce((acc, e) => acc + (e.pickedUp ? 1 : 0), 0)}</p> */}
          </div>
          <div className="flex items-center space-x-4">
            <RoundButton
              type="refresh"
              onClick={() => refreshData(setData, setIsRefreshing)}
              spin={isRefreshing}
            />
            <Filter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <table className="w-full overflow-x-scroll">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header, id) => (
                  // kelompok & pic kelompok has same header.id
                  <th key={header.id + id} className="p-3 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell, id) => (
                  // kelompok & pic kelompok has same cell.id
                  <td key={cell.id + id} className="p-3 text-left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between text-sm">
          <span>
            {`Showing ${table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1
              }-${table.getState().pagination.pageSize *
              (table.getState().pagination.pageIndex + 1)
              } of ${table.getPrePaginationRowModel().rows.length} entries`}
          </span>

          <div className="flex items-center">
            <span>
              Show:
              <select
                className="bg-transparent border p-1 rounded mx-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 50, 100, 200, 500].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </span>

            <span className="space-x-3 ml-8">
              <RoundButton
                type="first"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              />
              <RoundButton
                type="prev"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              <RoundButton
                type="next"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
              <RoundButton
                type="last"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
