import { twMerge } from "tailwind-merge";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
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
  }
);

Button.displayName = "Button";

export default Button;
