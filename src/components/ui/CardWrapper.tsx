const CardWrapper = ({ children }) => (
  <div
    style={{
      boxShadow: "0 0 0 0.6px black",
    }}
    className="relative h-full overflow-hidden rounded-md border-neutral-300 bg-white dark:bg-white/5"
  >
    <div className="pointer-events-none absolute z-50 h-full w-full rounded-md ring-1 ring-inset ring-white/15" />
    <div
      style={{
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.03) inset",
        clipPath: "inset(0 0 calc(100% - 1px) 0)",
      }}
      className="pointer-events-none absolute z-50 h-full w-full rounded-md ring-1 ring-inset ring-white/15"
    />
    <div
      style={{
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.03) inset",
        clipPath: "inset(0 0 calc(100% - 2px) 0)",
      }}
      className="pointer-events-none absolute z-50 h-full w-full rounded-md ring-1 ring-inset ring-white/15"
    />
    <div
      style={{
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.03) inset",
        clipPath: "inset(0 0 calc(100% - 3px) 0)",
      }}
      className="pointer-events-none absolute z-50 h-full w-full rounded-md ring-1 ring-inset ring-white/15"
    />
    <div
      style={{
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.03) inset",
        clipPath: "inset(0 0 calc(100% - 4px) 0)",
      }}
      className="pointer-events-none absolute z-50 h-full w-full rounded-md ring-1 ring-inset ring-white/15"
    />

    <div className="z-20">{children}</div>
  </div>
);

export default CardWrapper;
