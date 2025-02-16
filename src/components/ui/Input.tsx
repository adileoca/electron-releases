import clsx from "clsx";
import React from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "border-neutral-400 ring-0 dark:text-white/80 transition placeholder:text-neutral-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 shadow shadow-black/15 dark:border-white/20 dark:border-t-white/25 dark:bg-white/10 placeholder:dark:text-white/60 focus:dark:border-blue-600 focus:dark:ring-blue-600/50",
        className
      )}
    />
  );
};

export default Input;
