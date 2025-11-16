import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface AttributeBoolProps {
  attributeNumber: number;
  attributeName?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const AttributeBool = ({
  attributeNumber,
  attributeName = `Atributo ${attributeNumber}`,
  defaultValue = 0,
  onChange
}: AttributeBoolProps) => {

  const [active, setActive] = useState(defaultValue === 1);

  const toggle = () => {
    const newValue = !active;
    setActive(newValue);
    onChange?.(newValue ? 1 : 0);
  };

  return (
    <Card
      className="
        p-6 
        bg-white/10
        backdrop-blur-lg 
        border border-white/10
        hover:border-[#87D300]/40 
        rounded-xl
        shadow-lg hover:shadow-xl
        transition-colors duration-300
      "
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        {attributeName}
      </h3>

      {/* Switch container */}
      <div className="flex items-center justify-between px-2">

        {/* Label NO */}
        <span 
          className={`
            text-sm font-medium transition-colors 
            ${!active ? "text-[#87D300]" : "text-white/60"}
          `}
        >
          No
        </span>

        {/* Switch */}
        <button
          onClick={toggle}
          className="
            relative w-16 h-8 
            bg-white/10 
            border border-white/20 
            rounded-full 
            flex items-center
            transition-colors duration-300
          "
        >
          {/* Knob */}
          <div
            className={`
              absolute top-[3px] left-1 h-6 w-6 rounded-full
              bg-[#626469]
              shadow-md
              transition-transform duration-300
              ${active ? "translate-x-8" : "translate-x-0"}
            `}
          ></div>
        </button>

        {/* Label YES */}
        <span
          className={`
            text-sm font-medium transition-colors 
            ${active ? "text-[#87D300]" : "text-white/60"}
          `}
        >
          Yes
        </span>

      </div>
    </Card>
  );
};

export default AttributeBool;