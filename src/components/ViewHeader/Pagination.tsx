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
    <span className="pointer-events-none text-sm font-medium text-neutral-600 text-opacity-80 dark:text-neutral-200 dark:text-opacity-80">
      Showing 1-50 of 1234
    </span>
    <div className="flex items-center -space-x-px">
      <button className="flex items-center rounded-l-lg border-b border-l border-t border-neutral-400 p-1 transition dark:border-white/20 hover:dark:bg-white/5">
        <ChevronLeft size={16} className="text-black/60 dark:text-white/60" />
      </button>
      <button className="flex items-center rounded-r-lg border border-neutral-400 p-1 transition dark:border-white/20 hover:dark:bg-white/5">
        <ChevronRight size={16} className="text-black/60 dark:text-white/60" />
      </button>
    </div>
  </div>
);

export default ViewHeaderPagination;
