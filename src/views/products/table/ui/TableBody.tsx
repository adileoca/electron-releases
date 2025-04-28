import { Fragment } from "react";
import clsx from "clsx";

import { ColProps } from "../context/types";

type TableBodyProps = {
  rows: Record<string, any>[];
  cols: Record<string, ColProps>;
};

const TableBody: React.FC<TableBodyProps> = ({ rows, cols }) => {
  return (
    <tbody>
      {rows.map((row, rowIdx) => {
        let prevKeys: string[] = [];
        return (
          <tr key={rowIdx} className="group items-center">
            {Object.entries(row)
              .sort(([a], [b]) => cols[a].position - cols[b].position)
              .map(([key, cell], cellIdx) => {
                const col = cols[key] as ColProps;

                let tdStyle: React.CSSProperties = {
                  maxWidth: `${col.width}px`,
                };
                if (col.isSticky) {
                  tdStyle = {
                    ...tdStyle,
                    left:
                      prevKeys.length > 0
                        ? `${prevKeys.reduce(
                            (acc, key) => (acc = acc + cols[key].width),
                            0
                          )}px`
                        : 0,
                  };
                }

                prevKeys = [...prevKeys, key];
                return (
                  <Fragment key={`${rowIdx}-${cellIdx}`}>
                    <TdWrapper
                      isLast={rowIdx === rows.length - 1}
                      key={`${cellIdx}-${rowIdx}`}
                      className={clsx(
                        col.isSticky ? "is-sticky group sticky" : ""
                      )}
                      style={tdStyle}
                    >
                      {cell.Component ? (
                        cell.Component
                      ) : (
                        <span className="truncate">{cell.text}</span>
                      )}
                    </TdWrapper>
                  </Fragment>
                );
              })}
          </tr>
        );
      })}
    </tbody>
  );
};

const TdWrapper = ({ children, className = "", style = {}, isLast }) => (
  <td style={style} className={clsx("p-0", className)}>
    <div className="duration-50 flex h-12 w-full items-center border-y border-r border-neutral-200 border-t-transparent bg-white px-4 text-neutral-600 transition group-hover:bg-blue-50 group-[.is-sticky]:bg-neutral-900 dark:border-neutral-700 dark:border-t-transparent dark:bg-neutral-900 dark:text-neutral-200 group-hover:dark:bg-neutral-800 ">
      {children}
    </div>
  </td>
);

export default TableBody;
