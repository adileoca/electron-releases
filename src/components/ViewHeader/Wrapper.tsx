
const ViewHeaderWrapper = ({ children }) => (
  <div className="draggable flex h-12 w-full items-center space-x-5  ">
    <div className="flex h-full clickable w-full items-center justify-between">

      {children}
    </div>
  </div>
);

export default ViewHeaderWrapper;
