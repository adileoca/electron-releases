import CardWrapper from "./CardWrapper";

const InfoCard = ({ title, buttonLabel, onClick = () => {}, children }) => {
  return (
    <CardWrapper>
      <div className="flex h-full flex-col">
        <h2 className=" border-b border-neutral-600 bg-neutral-800/90 p-3 font-medium text-neutral-300">
          {title}
        </h2>
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6 p-3">{children}</div>
          <div className="p-3 pt-0">
            <button
              onClick={onClick}
              className="w-full rounded border border-neutral-600 bg-neutral-700 py-1.5 transition dark:hover:bg-neutral-600"
            >
              <span className="text-neutral-200">{buttonLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default InfoCard;
