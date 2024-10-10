const ViewHeaderTitle = ({ title, info = "" }) => (
  <h1 className="px-2 text-lg font-medium text-neutral-600/80 dark:text-white/60">
    <span>{title}</span>
    <span className="font-normal">{info}</span>
  </h1>
);

export default ViewHeaderTitle;
