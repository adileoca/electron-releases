const CardWrapper = ({ children }) => (
  <div className="h-full overflow-hidden rounded-lg border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:bg-opacity-70">
    {children}
  </div>
);

export default CardWrapper;
