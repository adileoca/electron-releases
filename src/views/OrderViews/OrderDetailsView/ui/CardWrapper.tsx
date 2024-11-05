const CardWrapper = ({ children }) => (
  <div
    style={{
      boxShadow: "0 0 0 0.6px black",
    }}
    className="relative h-full overflow-hidden rounded-lg  border-neutral-300 bg-white dark:bg-neutral-700/50"
  >
    <div className="absolute pointer-events-none z-50 h-full ring-1 ring-inset ring-white/15 rounded-lg w-full" />
    <div className="z-20 ">
      {children}
    </div>
  </div>
);

export default CardWrapper;
