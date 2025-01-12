import { createTableContext } from "@/context/Table";
import { RowProps } from "@/context/Table/types";

export const ordersTableColumns = {
  order_no: {
    // immutable
    id: "order_no",
    label: "Nr. comandǎ",
    minConstraints: [135, 48] as [number, number],
    initialWidth: 135,
    // mutable
    isSticky: true,
    position: 1,
    width: 135,
  },
  date_placed: {
    id: "date_placed",
    label: "Datǎ plasare",
    position: 2,
    minConstraints: [200, 48] as [number, number],
    initialWidth: 200,
    width: 200,
  },
  status: {
    id: "status",
    label: "Stare",
    position: 3,
    minConstraints: [150, 48] as [number, number],
    initialWidth: 150,
    width: 150,
  },
  amount: {
    id: "amount",
    label: "Sumǎ",
    position: 4,
    minConstraints: [100, 48] as [number, number],
    initialWidth: 100,
    width: 100,
  },
  address: {
    id: "address",
    label: "Adresǎ",
    position: 5,
    minConstraints: [400, 48] as [number, number],
    initialWidth: 400,
    width: 400,
  },
} as const;

export type ColumnId = keyof typeof ordersTableColumns;
export type Row = Map<ColumnId, RowProps<ColumnId>>;

const { TableProvider, useTable } = createTableContext(ordersTableColumns);
export { useTable, TableProvider };
