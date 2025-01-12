const ViewHeaderTitle = ({ title = "", info = "" }) => (
  <h1 className="text-lg space-x-1 font-semibold text-neutral-600/80 dark:text-white/80">
    {title && <span>{title}</span>}
    {info && <span className="font-medium">{info}</span>}
  </h1>
);

export default ViewHeaderTitle;
