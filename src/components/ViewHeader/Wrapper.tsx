const ViewHeaderWrapper = ({ children }) => (
  <div className="draggable flex h-12 w-full items-center space-x-5 border-b border-neutral-300 bg-white/50 dark:border-neutral-700 dark:bg-neutral-900/50">
    <div className="flex h-full w-full items-center justify-between">
      {children}
    </div>
  </div>
);

export default ViewHeaderWrapper;
