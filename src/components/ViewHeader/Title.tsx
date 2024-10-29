const ViewHeaderTitle = ({ title, info = "" }) => (
  <h1 className="pr-2 text-lg font-medium text-neutral-600/80 dark:text-white/70">
    <span>{title}</span>
    {info && <span className="font-normal">&nbsp;{info}</span>}
  </h1>
);

export default ViewHeaderTitle;
