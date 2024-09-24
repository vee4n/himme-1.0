import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn } from "@tanstack/react-table";
import { fetcher } from "~/lib/fetcher";

export interface Participant {
  id: number;
  name: string;
  nim: string;
  phone: string;
  group: any;
  checkIn: any;
  pickedUp: boolean;
}

export const colorOf = (kelompok) => {
  const lookup = {
    "Caribbean Sea": { color: "white", background: "black" },
    "Black Sea": { color: "black", background: "#f4f4f5" },
    "Red Sea": { color: "white", background: "#713f12" },
    "Yellow Sea": { color: "black", background: "#facc15" },
    "Arabian Sea": { color: "white", background: "#b45309" },
    "Andaman Sea": { color: "black", background: "#fef3c7" },
    "Caspian Sea": { color: "black", background: "#65a30d" },
    "Baltic Sea": { color: "black", background: "#a3e635" },
    "Coral Sea": { color: "white", background: "#047857" },
    "Weddell Sea": { color: "black", background: "#10b981" },
    "Sargasso Sea": { color: "black", background: "#ca8a04" },
    "Tasman Sea": { color: "white", background: "#374151" },
    "Adriatic Sea": { color: "white", background: "#6b7280" },
    "Solomon Sea": { color: "black", background: "#f97316" },
    "Java Sea": { color: "black", background: "#f472b6" },
    "Arafura Sea": { color: "white", background: "#dc2626" },
    "Lazarev Sea": { color: "white", background: "#7f1d1d" },
    "Mar de Grau": { color: "black", background: "#22c55e" },
    "Mozambique Sea": { color: "white", background: "#3b82f6" },
    "Pacific Ocean": { color: "black", background: "#0ea5e9" },
    "Arctic Ocean": { color: "black", background: "#a855f7" },
    "Atlantic Ocean": { color: "black", background: "#ddd6fe" },
    "Indian Ocean": { color: "white", background: "#1e3a8a" },
    "Southern Ocean": { color: "white", background: "#c0a392" },
    "Antarctic Ocean": { color: "black", background: "#d97706" },
    "Hudson Bay": { color: "black", background: "#06b6d4" },
    "Labrador Sea": { color: "white", background: "#7c2d12" },
    "Ionian Sea": { color: "black", background: "#86efac" },
  };

  return lookup.hasOwnProperty(kelompok)
    ? lookup[kelompok]
    : { color: "black", background: "white" };
};

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (value === "-" || value === "NA") {
    columnId = "checkIn";
    value = "null";
  }

  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta(itemRank);
  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const refreshData = async (setData, setIsRefreshing) => {
  setIsRefreshing((state) => !state);

  const res = await fetcher("participants");
  const newData = await res.json();
  setData((data) => newData);

  setIsRefreshing((state) => !state);
};

export const toggleCheckIn = async (id: number, checkInId: number) => {
  const checkIn = await fetcher("check-in", { id, checkInId });
  const res = await checkIn.json();

  return res.body;
};

export const togglePickUp = async (id: number, curValue: boolean) => {
  const checkIn = await fetcher("pick-up", { id, curValue });
  const res = await checkIn.json();

  return res.body;
};

export const updateStatusCheckIn = (id, checkIn, setData) => {
  setData((data) =>
    data.map((i) =>
      i.id === id
        ? {
          ...i,
          checkInId: i.checkInId ? null : checkIn.id,
          checkIn: i.checkIn ? null : { date: new Date().toISOString() },
        }
        : i
    )
  );
};

export const updateStatusPickUp = (id, setData) => {
  setData((data) =>
    data.map((i) =>
      i.id === id
        ? {
          ...i,
          pickedUp: !i.pickedUp,
        }
        : i
    )
  );
};
