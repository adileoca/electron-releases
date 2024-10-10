const ViewBarWrapper = ({ children }) => (
  <div className="draggable flex h-12 w-full items-center space-x-5 border-b border-neutral-300 bg-white bg-opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:bg-opacity-50">

    {children}
  </div>
);

export default ViewBarWrapper;
