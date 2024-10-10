import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

const ViewHeaderPagination: React.FC<{
  onNext?: (...args: any[]) => any;
  onPrev?: (...args: any[]) => any;
  sliceSize?: number;
  currentPage?: number;
  totalPages?: number;
}> = ({ onNext, onPrev, sliceSize, totalPages, currentPage }) => (
  <div className="flex items-center space-x-3">
    <span className="text-sm font-medium pointer-events-none text-opacity-80 dark:text-opacity-80 text-neutral-600 dark:text-neutral-200">
      Showing 1-50 of 1234
    </span>
    <div className="flex items-center">
      <button className="flex items-center rounded-l-lg border-b border-l border-t border-neutral-400 p-1 dark:border-neutral-600">
        <ChevronLeft
          size={16}
          className="text-neutral-600 dark:text-neutral-200 text-opacity-80 dark:text-opacity-80"
        />
      </button>
      <button className="flex items-center rounded-r-lg border border-neutral-400 p-1 dark:border-neutral-600">
        <ChevronRight
          size={16}
          className="text-neutral-600 dark:text-neutral-200 text-opacity-80 dark:text-opacity-80"
        />
      </button>
    </div>
  </div>
);

export default ViewHeaderPagination;
