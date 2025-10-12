import { Fragment, type ReactNode } from "react";
import clsx from "clsx";
import { useOrdersTableContext } from "../context";
import { ColProps } from "../context/types";

const TableBody = () => {
  const {
    state: { rows, cols },
  } = useOrdersTableContext();

  return (
    <tbody>
      {rows.map((row, rowIdx) => {
        let stickyOffset = 0;
        return (
          <tr
            key={rowIdx}
            className={clsx(
              rowIdx === rows.length - 1 &&
                "border-b-[47px] dark:border-b-neutral-900",
              "group items-center"
            )}
          >
            {Object.entries(row)
              .sort(([a], [b]) => cols[a].position - cols[b].position)
              .map(([key, cell], cellIdx) => {
                const col = cols[key] as ColProps;
                const width = col.width;

                const stickyLeft = col.isSticky ? stickyOffset : undefined;
                if (col.isSticky) {
                  stickyOffset += col.width;
                }

                return (
                  <Fragment key={`${rowIdx}-${cellIdx}`}>
                    <TdWrapper
                      key={`${cellIdx}-${rowIdx}`}
                      className={clsx(
                        col.isSticky ? "is-sticky group sticky" : "",
                        " "
                      )}
                      columnId={key}
                      width={width}
                      stickyLeft={stickyLeft}
                      isSticky={col.isSticky}
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

type TdWrapperProps = {
  children: ReactNode;
  className?: string;
  columnId: string;
  width: number;
  stickyLeft?: number;
  isSticky?: boolean;
};

const TdWrapper = ({
  children,
  className = "",
  columnId,
  width,
  stickyLeft,
  isSticky,
}: TdWrapperProps) => {
  const tdStyle: React.CSSProperties = isSticky
    ? {
        left: `${stickyLeft ?? 0}px`,
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      }
    : {
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      };

  return (
    <td
      data-column-id={columnId}
      style={tdStyle}
      className={clsx("p-0 box-border", className)}
    >
      <div
        className="duration-50 flex h-12 w-full items-center border-y border-r border-neutral-200 border-t-transparent bg-white px-4 box-border text-neutral-600 transition group-hover:bg-blue-50 group-[.is-sticky]:bg-neutral-900 dark:border-neutral-700 dark:border-t-transparent dark:bg-neutral-900 dark:text-neutral-200 group-hover:dark:bg-neutral-800 "
        style={{
          width: `${width}px`,
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
        }}
      >
        {children}
      </div>
    </td>
  );
};

export default TableBody;
