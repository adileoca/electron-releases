const CardWrapper = ({ children }) => (
  <div className="h-full overflow-hidden rounded-lg border border-neutral-300 bg-white shadow shadow-black/20 dark:border-neutral-600/60 dark:bg-neutral-700/50">
    {children}
  </div>
);

export default CardWrapper;
