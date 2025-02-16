const Tooltip = ({ content, show, placement = "down" }) => {
  const tooltipStyles = {
    right: {
      container: "absolute left-full top-1/2 -translate-y-1/2 translate-x-3",
      arrow:
        "-ml-[0.35rem] inset-y-0 left-0 right-full my-auto -rotate-[135deg]",
    },
    down: {
      container:
        "absolute top-full left-1/2 -translate-x-1/2 translate-y-[0.8rem]",
      arrow: "-mt-[0.355rem] inset-x-0 top-0 bottom-full mx-auto -rotate-45",
    },
    // Add more placements if needed, like "left", "up", etc.
  };

  const styles = tooltipStyles[placement];

  return (
    <>
      {show && (
        <div className={`absolute z-50 max-w-64 transform ${styles.container}`}>
          <div className="rounded-lg z-50 border border-neutral-500 bg-neutral-900 backdrop-blur px-3 py-1.5 text-sm text-white">
            <span>{content}</span>
          </div>
          <span
            className={`absolute h-3 w-3 transform rounded-sm border-r border-t border-neutral-500 bg-neutral-900 backdrop-blur ${styles.arrow}`}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
