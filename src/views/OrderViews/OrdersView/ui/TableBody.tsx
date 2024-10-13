import { Fragment, useState } from "react";
import clsx from "clsx";

import CheckboxInput from "./CheckboxInput";
import { useTable } from "../context";

const TableBody = ({ widths }) => {
  const [enabled, setEnabled] = useState(false);
  const { rows, cols } = useTable();

  return (
    <tbody>
      {rows.map((row, rowIdx) => (
        <tr key={rowIdx} className="group items-center">
          {Array.from(row.entries()).map(([columnKey, cell], cellIdx) => {
            const col = cols.get(columnKey)!;
            let tdStyle = {};
            if (col.isSticky) {
              tdStyle = { left: `${widths[cellIdx]}px` };
            }

            return (
              <Fragment key={`${rowIdx}-${cellIdx}`}>
                {cellIdx === 0 && (
                  <TdWrapper
                    key={`checkbox-${rowIdx}`}
                    className="is-sticky group sticky left-0 p-0"
                  >
                    <CheckboxInput checked={enabled} onChange={setEnabled} />
                  </TdWrapper>
                )}
                <TdWrapper
                  key={`${cellIdx}-${rowIdx}`}
                  className={clsx(col.isSticky ? "is-sticky group sticky" : "")}
                  style={tdStyle}
                >
                  {cell.Component ? cell.Component : cell.text}
                </TdWrapper>
              </Fragment>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

const TdWrapper = ({ children, className = "", style = {} }) => (
  <td style={style} className={clsx("p-0", className)}>
    <div className="duration-50 flex h-12 w-full items-center border-y border-r border-neutral-200 border-t-transparent bg-white px-4 text-neutral-600 transition group-hover:bg-blue-50 group-[.is-sticky]:bg-neutral-900 dark:border-neutral-700 dark:border-t-transparent dark:bg-neutral-900/90 dark:text-neutral-200 group-hover:dark:bg-neutral-800 ">
      {children}
    </div>
  </td>
);

export default TableBody;
