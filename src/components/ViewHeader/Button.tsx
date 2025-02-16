import { LucideProps } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { useState, Fragment } from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: (...args: any[]) => any;
  labelLocation?: "before" | "after";
  IconSize?: number;
  tooltipContent?: string;
};

const ViewHeaderButton: React.FC<Props> = ({
  Icon,
  label,
  tooltipContent,
  onClick,
  labelLocation = "before",
  IconSize,
}) => {
  const [show, setShow] = useState(false);

  const IconComp = (
    <IconComponent
      Icon={Icon}
      IconSize={IconSize}
      tooltipContent={tooltipContent}
      show={show}
    />
  );

  const LabelComp = <LabelComponent label={label} />;

  // Conditionally decide the order of components
  const Components =
    labelLocation === "before" ? [IconComp, LabelComp] : [LabelComp, IconComp];

  return (
    <div className="flex items-center">
      <button
        onClick={onClick}
        className={clsx(
          label ? " py-1 pl-2 pr-2.5" : "p-1",
          "flex items-center border border-transparent group rounded-lg text-sm space-x-1.5 transition hover:bg-neutral-900/10 "
        )}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {/* Render the components based on the order defined */}
        {Components.map((Component, index) => (
          <Fragment key={index}>{Component}</Fragment>
        ))}
      </button>
    </div>
  );
};

const LabelComponent = ({ label }) => (
  <>
    {label && (
      <span className="font-medium text-black/80 dark:text-white/80 ">
        {label}
      </span>
    )}
  </>
);

const IconComponent = ({ Icon, IconSize, tooltipContent, show }) => (
  <div className="relative">
    <Icon
      style={{ height: IconSize || 18, width: IconSize || 18, strokeWidth: 2 }}
      size={IconSize || 16}
      className="text-black/80 dark:text-white/80 dark:group-hover:text-white"
    />
    {tooltipContent && <Tooltip content={tooltipContent} show={show} />}
  </div>
);

export default ViewHeaderButton;
