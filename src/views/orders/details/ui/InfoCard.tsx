import React from "react";
import CardWrapper from "@/components/ui/CardWrapper";

const InfoCard: React.FC<{
  title: string;
  button?: { label: string; onClick?: () => void };
  children: any;
}> = ({ title, button, children }) => {
  return (
    <CardWrapper>
      <h2 className="border-b  border-white/15 p-3 font-medium text-neutral-300">
        {title}
      </h2>
      <div className="flex h-full flex-col justify-between bg-white/5">
        <div className="space-y-6 p-3">{children}</div>
        {button && (
          <div className="p-3 pt-0">
            <button
              onClick={button.onClick}
              className="w-full rounded-md border border-white/10 bg-white/20 py-1.5 transition dark:hover:bg-white/25"
            >
              <span className="font-medium text-white/75">{button.label}</span>
            </button>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default InfoCard;
