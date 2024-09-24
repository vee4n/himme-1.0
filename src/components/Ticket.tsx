import { useState } from "react";
import { fetcher } from "~/lib/fetcher";

export function Ticket({ ticketDetails, success }) {
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState(
    // prettier-ignore
    !success ? -1 : (ticketDetails.checkInId ? 1 : 0)
  ); // -1: fail, 0: not checked-in, 1: checked in, 2: successful

  const checkIn = async () => {
    setLoading(true);
    const createCheckIn = await fetcher("check-in", {
      id: ticketDetails.id,
      checkInId: ticketDetails.checkInId,
    });
    setstate(2);
    setLoading(false);
  };

  return (
    <div
      className={
        "border rounded shadow-md px-8 py-6 flex flex-col justify-center space-y-3 min-w-[16rem] " +
        (state === 0 ? "" : "max-w-xs")
      }
    >
      {state === 0 ? (
        <>
          <h1 className="text-xl text-center font-bold">
            No. Peserta #{ticketDetails.id}
          </h1>
          <div className="font-medium">
            <p>Nama</p>
            <p className="text-gray-400">{ticketDetails.name}</p>
            <p>NIM</p>
            <p className="text-gray-400">{ticketDetails.nim}</p>
            <p>PIC</p>
            <p className="text-gray-400">{ticketDetails.group.pic}</p>
            <p>Kelompok</p>
            <p className="text-gray-400">{ticketDetails.group.name}</p>
          </div>
          <button
            className={
              "py-2 text-white font-semibold rounded " +
              (loading ? "bg-gray-400" : "bg-green-500")
            }
            onClick={checkIn}
            disabled={loading}
          >
            {loading ? "Loading..." : "Check In"}
          </button>
        </>
      ) : (
        <>
          {/* <h1 className="text-4xl text-center">
            {state === -1 ? "😵" : (state === 1 ? "😎" : "🤩")}
          </h1> */}
          <h2
            className={
              "text-2xl font-bold text-center " +
              (state === -1 ? "text-red-600" : (state === 1 ? "text-blue-600" : "text-green-600"))
            }
          >
            {state === -1 ? "Oopsie!" : (state === 1 ? "Verified!" : "Success!")}
          </h2>
          <p>
            {state === -1
              ? "This is not a valid ticket. Please confirm with other commitees."
              : (state === 1
                ? "This ticket has already been verified. Participant is allowed to go in the venue."
                : "Ticket successfully verified! "
              )
            } 
          </p>
        </>
      )}
    </div>
  );
}
