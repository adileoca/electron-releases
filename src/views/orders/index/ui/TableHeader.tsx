import { ResizableBox } from "react-resizable";
import clsx from "clsx";

import CheckboxInput from "./CheckboxInput";
import { useTable } from "../context";

const TableHeader = ({ widths }) => {
  const { cols: tableCols, checkboxCol, handleOnResize } = useTable();

  return (
    <thead>
      <tr>
        <th key={0} className="sticky left-0 top-0 z-30 p-0 hover:z-[35]">
          <ResizableBox
            width={checkboxCol.width}
            minConstraints={checkboxCol.minConstraints}
            maxConstraints={[1000, 0]}
            className="border-none p-0"
            axis="x"
            resizeHandles={["e"]}
            // onResize={(_, data) => onResize(0, data.size.width)}
          >
            <div className="flex h-12 items-center border-b border-r border-neutral-300 bg-neutral-50 px-4 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900">
              <p className="text-left font-medium text-neutral-600 dark:text-neutral-300">
                <CheckboxInput checked={false} onChange={() => {}} />
              </p>
            </div>
          </ResizableBox>
        </th>

        {Array.from(tableCols.entries()).map(([columnKey, column], index) => {
          let idx = index + 1;
          let thStyle = {};
          if (column.isSticky) {
            const prevRowsWidth = idx > 0 ? accPrevWidths(widths, idx) : 0;
            thStyle = { left: `${prevRowsWidth}px` };
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
                maxConstraints={[1000, 0]} // Optional max width
                className="border-none p-0" // Apply no padding and no borders
                axis="x"
                resizeHandles={["e"]}
                onResize={(_, data) =>
                  handleOnResize(columnKey, data.size.width)
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

const accPrevWidths = (widths: number[], index: number) =>
  widths.slice(0, index).reduce((acc, value) => acc + value, 0);
