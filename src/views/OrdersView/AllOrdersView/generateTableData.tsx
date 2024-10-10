import React, { useState } from "react";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { OrdersSummaryType } from "@/lib/supabase/database";
import CheckboxInput from "./CheckboxInput";

export const generateTableData = (
  orders: OrdersSummaryType
): {
  headers: {
    Component?: React.ReactNode | undefined;
    text?: string | undefined;
    isSticky?: boolean;
    minConstraints: [width: number, height: number];
    initialWidth: number;
  }[];
  rows: {
    id: number;
    text?: string | undefined;
    Component?: React.ReactNode | undefined;
  }[][];
} => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAllRows, setSelectAllRows] = useState(false);

  return {
    headers: [
      {
        Component: (
          <CheckboxInput checked={selectAllRows} onChange={setSelectAllRows} />
        ),
        minConstraints: [57, 48],
        initialWidth: 57, // todo: save and fetch in localStorage on change
        isSticky: true,
      },
      {
        text: "Order no.",
        minConstraints: [133, 48],
        initialWidth: 133,
        isSticky: true,
      },
      {
        text: "Date placed",
        minConstraints: [183, 48], // todo add 33 (padding + border) to min constraints in comp
        initialWidth: 183,
      },
      {
        text: "Status",
        minConstraints: [133, 0],
        initialWidth: 133,
      },
      {
        text: "Total",
        minConstraints: [133, 0],
        initialWidth: 133,
      },
      {
        text: "Address",
        minConstraints: [133, 0],
        initialWidth: 300,
      },
      {
        text: "",
        minConstraints: [133, 0],
        initialWidth: 100,
      },
    ],
    rows: orders.map((order, idx) => [
      {
        id: idx,
        text: "",
        Component: (
          <Checkbox
            checked={selectedRows.some((id) => id === idx)}
            onChange={(checked) =>
              checked
                ? selectedRows.push(idx)
                : selectedRows.filter((id) => id === idx)
            }
            className="group my-0.5 flex size-5 place-items-center rounded border border-neutral-300 bg-white data-[checked]:bg-blue-500"
          >
            <CheckIcon className="mx-auto size-4 stroke-white opacity-0 group-data-[checked]:opacity-100" />
          </Checkbox>
        ),
      },
    ]),
  };
};
