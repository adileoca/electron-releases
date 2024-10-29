const CardWrapper = ({ children }) => (
  <div
    style={{

      boxShadow: "0 0 0 0.6px black",
    }}
    className="h-full overflow-hidden rounded-lg border border-neutral-300 bg-white  dark:border-neutral-600/60 dark:bg-neutral-700/50"
  >
    {children}
  </div>
);

export default CardWrapper;
