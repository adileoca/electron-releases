const ViewHeaderInfo = ({ title = "", info = "" }) => (
  <h1 className="px-2 font-medium text-neutral-600/80 dark:text-white/80">
    <span className="font-medium">&nbsp;{title}</span>
    {info && <span className="font-normal">&nbsp;{info}</span>}
  </h1>
);

export default ViewHeaderInfo;
