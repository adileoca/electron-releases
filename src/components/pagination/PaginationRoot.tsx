import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

type PaginationRootProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
};

const PaginationRoot: React.FC<PaginationRootProps> = ({
  children,
  className,
  innerClassName,
  style,
}) => {
  return (
    <div
      style={{ width: "calc(100% - 200px)", ...style }}
      className={clsx("fixed bottom-2 right-2 px-px py-px", className)}
    >
      <div
        className={clsx(
          "flex h-12 items-center justify-between overflow-visible rounded-b-[11px] border-t border-neutral-700 bg-neutral-900/90 px-2.5 backdrop-blur-xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default PaginationRoot;
