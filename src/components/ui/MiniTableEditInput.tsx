import clsx from "clsx";
import React, { useMemo, useState } from "react";

export interface MiniTableEditInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  label?: React.ReactNode;
}

const MiniTableEditInput = React.forwardRef<
  HTMLInputElement,
  MiniTableEditInputProps
>(({ className, error, onFocus, onBlur, disabled, label, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = useMemo(() => {
    if (rest.value === undefined || rest.value === null) return false;
    if (Array.isArray(rest.value)) {
      return rest.value.length > 0;
    }
    return String(rest.value).trim().length > 0;
  }, [rest.value]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div
      className={clsx(
        "relative flex min-h-[40px] w-full items-center",
        disabled && "opacity-70"
      )}
    >
      {label ? (
        <span className="pointer-events-none absolute left-0 bg-neutral-900/80 py-2 pr-2 top-1/2 -translate-y-1/2 text-white/60">
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        disabled={disabled}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(
          "w-full border-none bg-transparent py-2  px-0 text-right text-white/90 focus:ring-transparent placeholder:text-right placeholder:text-white/40 focus:outline-none",
          error && "text-amber-300 placeholder:text-amber-300/60",
          className
        )}
      />
      {/*<span
        className={clsx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10 transition-colors",
          error && "bg-amber-400"
        )}
      />*/}
      <span
        className={clsx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 transform bg-white transition-transform duration-150 ease-out",
          (isFocused || hasValue) && "scale-x-100",
          error && "bg-amber-400"
        )}
      />
    </div>
  );
});

MiniTableEditInput.displayName = "MiniTableEditInput";

export default MiniTableEditInput;
