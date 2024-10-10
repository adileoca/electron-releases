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
      label={label}
      show={show}
    />
  );

  const LabelComp = <LabelComponent label={label} />;

  // Conditionally decide the order of components
  const Components =
    labelLocation === "before" ? [IconComp, LabelComp] : [LabelComp, IconComp];

  return (
    <button
      onClick={onClick}
      className={clsx(
        label ? "rounded-lg px-2.5 py-0.5" : "rounded-full p-2",
        "flex items-center space-x-2 transition hover:bg-neutral-900/10 dark:hover:bg-white/10"
      )}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Render the components based on the order defined */}
      {Components.map((Component, index) => (
        <Fragment key={index}>{Component}</Fragment>
      ))}
    </button>
  );
};

const LabelComponent = ({ label }) => (
  <>
    {label && (
      <span className="font-medium text-neutral-600 text-opacity-80 dark:text-neutral-200 dark:text-opacity-80">
        {label}
      </span>
    )}
  </>
);

const IconComponent = ({ Icon, IconSize, tooltipContent, label, show }) => (
  <div className="relative">
    <Icon
      size={IconSize || 16}
      className=" text-neutral-600  text-opacity-80 dark:text-neutral-200 dark:text-opacity-80"
    />
    {tooltipContent && <Tooltip content={tooltipContent} show={show} />}
  </div>
);

export default ViewHeaderButton;
