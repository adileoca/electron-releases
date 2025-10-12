import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "action";
};

const baseClasses =
  "border border-neutral-700 text-neutral-200 transition hover:border-neutral-500 hover:text-neutral-200 disabled:text-neutral-700 disabled:hover:cursor-not-allowed disabled:hover:border-neutral-700";

const variantClasses: Record<NonNullable<PaginationButtonProps["variant"]>, string> = {
  icon: "rounded-lg p-1",
  action: "flex w-[135px] items-center space-x-1.5 rounded-lg p-1 pl-1.5 pr-3",
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  className,
  variant = "icon",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
