import CardWrapper from "./CardWrapper";

const InfoCard = ({
  title,
  button: { label, onClick = () => {} },
  children,
}) => {
  return (
    <CardWrapper>
      <h2 className="border-b border-white/15 p-3 font-medium text-neutral-300">
        {title}
      </h2>
      <div className="flex h-full bg-white/5 flex-col justify-between">
        <div className="space-y-6 p-3">{children}</div>
        <div className="p-3 pt-0">
          <button
            onClick={onClick}
            className="w-full rounded-md bg-white/20 border-white/10 border py-1.5 transition dark:hover:bg-white/25"
          >
            <span className="text-white/75 font-medium">{label}</span>
          </button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default InfoCard;
