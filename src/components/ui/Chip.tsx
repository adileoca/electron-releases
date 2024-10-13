import clsx from "clsx";

const Chip: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => (
  <span
    className={clsx(
      "items-center rounded-md border-transparent border-neutral-200 bg-neutral-100 px-2 py-1 text-sm capitalize text-neutral-600 dark:border-blue-500 dark:bg-blue-700 dark:text-blue-100",
      className
    )}
  >
    {text}
  </span>
);

export default Chip;
