import { useMemo } from "react";
import clsx from "clsx";

import ShortToggle from "@/components/ui/ShortToggle";
import { usePrintsDisplayContext } from "../context";
import Input from "@/components/ui/Input";
import { ArrowLeftIcon, ArrowRightIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import PaginationPerPageMenu from "@/components/ui/PaginationPerPageMenu";

const Pagination = () => {
  const {
    data,
    state: { pagination, updating },
    actions: { setPagination, setShouldRefresh },
  } = usePrintsDisplayContext();

  const totalPages = useMemo(() => {
    if (!data || !data.count) return 1;
    return Math.ceil(data.count / pagination.resultsPerPage);
  }, [data, pagination.resultsPerPage]);
  const perPageOptions = useMemo(() => {
    const defaults = [24, 48, 96];
    const optionSet = new Set([...defaults, pagination.resultsPerPage]);
    return Array.from(optionSet)
      .sort((a, b) => a - b)
      .map((value) => ({ value }));
  }, [pagination.resultsPerPage]);
  return (
    <div
      style={{ width: "calc(100% - 200px)" }}
      className="fixed bottom-2 right-2 z-[100] px-px py-px"
    >
      <div className="flex h-12 items-center justify-between overflow-visible rounded-b-[7px] border-t border-neutral-700 bg-neutral-900/90 px-3 py-2 backdrop-blur-xl">
        <div className="flex items-center space-x-5">
          <button
            onClick={() => {
              if (pagination.currentPage > 1) {
                setPagination({ currentPage: pagination.currentPage - 1 });
              }
            }}
            disabled={pagination.currentPage <= 1}
            className="rounded-md border border-neutral-700 p-1 text-neutral-200 transition hover:border-neutral-500 hover:text-neutral-200 disabled:text-neutral-700 disabled:hover:cursor-not-allowed disabled:hover:border-neutral-700"
          >
            <ArrowLeftIcon className="size-5 " />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-neutral-200">
              Pagina
            </span>
            <Input
              type="number"
              min={1}
              disabled={totalPages <= 1}
              max={totalPages}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (isNaN(value)) value = 1;
                if (value < 1) value = 1;
                if (value > totalPages) value = totalPages;
                setPagination({ currentPage: value });
              }}
              value={pagination.currentPage}
              className={clsx(
                "h-7 w-12 rounded-md px-2 text-center ",
                totalPages <= 1 &&
                  "hover:cursor-not-allowed dark:bg-neutral-900 dark:text-neutral-600"
              )}
            />
            <span className="text-sm font-semibold text-neutral-200">
              din {totalPages}
            </span>
          </div>
          <button
            onClick={() => {
              if (pagination.currentPage < totalPages) {
                setPagination({ currentPage: pagination.currentPage + 1 });
              }
            }}
            disabled={pagination.currentPage >= totalPages}
            className="rounded-md border border-neutral-700 p-1 text-neutral-200 transition hover:border-neutral-500 hover:text-neutral-200 disabled:text-neutral-700 disabled:hover:cursor-not-allowed disabled:hover:border-neutral-700"
          >
            <ArrowRightIcon className="size-5" />
          </button>
          <PaginationPerPageMenu
            value={pagination.resultsPerPage}
            options={perPageOptions}
            onChange={(value) => {
              if (value === pagination.resultsPerPage) return;
              setPagination({ resultsPerPage: value, currentPage: 1 });
            }}
          />

          <span className="text-sm font-semibold text-neutral-200">
            {data?.count} rezultate
          </span>
        </div>

        <div className="flex items-center space-x-5">
          <ShortToggle />
          <button
            onClick={() => setShouldRefresh(true)}
            disabled={updating}
            className="flex w-[135px] items-center space-x-1.5 rounded-md border border-neutral-700 p-1 pl-1.5 pr-3 text-neutral-200 transition hover:border-neutral-500 hover:text-neutral-200 disabled:hover:border-neutral-700"
          >
            <ArrowPathIcon
              className={clsx(updating ? "animate-spin" : "", "size-5")}
            />
            <span className="flex-1 text-left text-sm font-semibold">
              {updating ? "Actualizez..." : "Actualizeazǎ"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
