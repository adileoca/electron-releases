const ViewHeaderInfo = ({ title = "", info = "" }) => (
  <h1 className="px-2 text-neutral-600/80 dark:text-white/80">
    <span className="">&nbsp;{title}</span>
    {info && <span className="">&nbsp;{info}</span>}
  </h1>
);

export default ViewHeaderInfo;
