import { useState } from "react";

const locale = "ro-RO";

const getCountryName = (countryCode) => {
  return new Intl.DisplayNames([locale], { type: "region" }).of(countryCode);
};

export const Flag = ({ countryCode }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative"
    >
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 transform rounded bg-neutral-700 px-2 py-1 text-xs text-white">
          {getCountryName(countryCode)}
        </div>
      )}
      <div className={`fi rounded-sm fi-${countryCode.toLowerCase()}`} />
    </span>
  );
};
