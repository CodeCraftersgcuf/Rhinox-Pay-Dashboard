import React from "react";

interface TimeFilterTabsProps {
  options: string[];
  value: string;
  onChange: (option: string) => void;
  className?: string;
}

const TimeFilterTabs: React.FC<TimeFilterTabsProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex max-w-full flex-nowrap gap-2 overflow-x-auto pb-1 ${className}`}>
      {options.map((option) => {
        const isActive = option === value;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`h-[34px] shrink-0 rounded-full px-4 text-xs transition-colors ${
              isActive
                ? "bg-white text-[#111827]"
                : "border border-[#2A3945] text-white hover:border-[#405160]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default TimeFilterTabs;
