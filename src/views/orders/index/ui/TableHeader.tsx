import { ResizableBox } from "react-resizable";
import clsx from "clsx";

import { useOrdersTableContext } from "../context";
import { ColId } from "../context/types";

const TableHeader = () => {
  const {
    state: { cols },
    actions: { setColWidth },
  } = useOrdersTableContext();

  let prevWidths = 0;
  return (
    <thead>
      <tr className="overflow-hidden rounded-lg">
        {Object.entries(cols)
          .sort(([_ka, a], [_kb, b]) => a.position - b.position)
          .map(([columnId, column], idx) => {
            let thStyle = {};
            if (column.isSticky) {
              thStyle = { left: `${prevWidths}px` };
              prevWidths += column.width;
            }

            return (
              <th
                key={idx}
                style={thStyle}
                className={clsx(
                  column.isSticky ? "z-30 hover:z-[35]" : "",
                  "sticky top-0 z-20 p-0 hover:z-[25]"
                )}
              >
                <ResizableBox
                  width={column.width}
                  minConstraints={column.minConstraints}
                  maxConstraints={[1000, 48]}
                  className="p-0"
                  axis="x"
                  resizeHandles={["e"]}
                  onResize={(_, data) =>
                    setColWidth(columnId as ColId, data.size.width)
                  }
                >
                  <div className="flex h-12 items-center border-b border-r border-neutral-300 bg-neutral-50 px-4 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900">
                    <p className="text-left font-medium text-neutral-600 dark:text-white/80">
                      {column.Component ? column.Component : column.label}
                    </p>
                  </div>
                </ResizableBox>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

export default TableHeader;
