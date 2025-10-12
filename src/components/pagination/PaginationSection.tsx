import clsx from "clsx";
import type { ReactNode } from "react";

type PaginationSectionProps = {
  children: ReactNode;
  className?: string;
};

const PaginationSection: React.FC<PaginationSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("flex items-center space-x-5", className)}>
      {children}
    </div>
  );
};

export default PaginationSection;
