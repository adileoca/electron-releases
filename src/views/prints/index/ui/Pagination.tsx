import { useMemo } from "react";
import clsx from "clsx";

import ShortToggle from "@/components/ui/ShortToggle";
import { usePrintsDisplayContext } from "../context";
import Input from "@/components/ui/Input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import PaginationPerPageMenu from "@/components/ui/PaginationPerPageMenu";
import {
  PaginationRoot,
  PaginationSection,
  PaginationButton,
} from "@/components/pagination";

const Pagination = () => {
  const {
    data,
    state: { pagination, updating, liveModeEnabled },
    actions: { setPagination, setShouldRefresh, setLiveModeEnabled },
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
    <PaginationRoot className="z-[100]">
      <PaginationSection>
        <PaginationButton
          onClick={() => {
            if (pagination.currentPage > 1) {
              setPagination({ currentPage: pagination.currentPage - 1 });
            }
          }}
          disabled={pagination.currentPage <= 1}
        >
          <ArrowLeftIcon className="size-5 " />
        </PaginationButton>
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
                "h-7 w-12 rounded-lg px-2 text-center ",
                totalPages <= 1 &&
                  "hover:cursor-not-allowed dark:bg-neutral-900 dark:text-neutral-600"
              )}
            />
            <span className="text-sm font-semibold text-neutral-200">
              din {totalPages}
            </span>
          </div>
          <PaginationButton
            onClick={() => {
              if (pagination.currentPage < totalPages) {
                setPagination({ currentPage: pagination.currentPage + 1 });
              }
            }}
            disabled={pagination.currentPage >= totalPages}
          >
            <ArrowRightIcon className="size-5" />
          </PaginationButton>
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
      </PaginationSection>
      <PaginationSection>
          <ShortToggle
            checked={liveModeEnabled}
            onChange={(value) => setLiveModeEnabled(value)}
          />
        <PaginationButton
          variant="action"
          onClick={() => setShouldRefresh(true)}
          disabled={updating}
        >
          <ArrowPathIcon
            className={clsx(updating ? "animate-spin" : "", "size-5")}
          />
          <span className="flex-1 text-left text-sm font-semibold">
            {updating ? "Actualizez..." : "Actualizeazǎ"}
          </span>
        </PaginationButton>
      </PaginationSection>
    </PaginationRoot>
  );
};

export default Pagination;
