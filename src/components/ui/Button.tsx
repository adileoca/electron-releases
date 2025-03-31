import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Button: React.FC<{
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;
  children: any;
  className?: string;
}> = ({ onClick, children, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={twMerge(
        "w-full rounded-md border-t border-neutral-500 bg-neutral-600 px-3 py-[3px] hover:border-neutral-400 hover:bg-neutral-500 disabled:scale-100 disabled:border-transparent disabled:bg-amber-600 disabled:cursor-default ",
        className
      )}
    >
      <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white/90">
        {children}
      </div>
    </button>
  );
};

export default Button;
