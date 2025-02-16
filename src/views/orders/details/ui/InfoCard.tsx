import React from "react";
import CardWrapper from "@/components/ui/CardWrapper";
import Button from "@/components/ui/Button";
const InfoCard: React.FC<{
  title: string;
  button?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  };
  children: any;
}> = ({ title, button, children }) => {
  return (
    <div className=" flex  flex-col rounded-md">
      {/* <h2 className="p-3 pt-2 font-medium text-neutral-300">
        {title}
      </h2> */}
      <div className="flex h-full flex-col justify-between ">
        <div className="space-y-6 ">{children}</div>
        {button && (
          <div className="mt-4">
            <Button onClick={button.onClick}>{button.label}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
