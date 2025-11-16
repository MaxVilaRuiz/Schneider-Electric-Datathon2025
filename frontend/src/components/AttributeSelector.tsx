import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AttributeSelectorProps {
  attributeNumber: number;
  attributeName?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const AttributeSelector = ({ 
  attributeNumber, 
  attributeName = `Atributo ${attributeNumber}`,
  minValue = 0, 
  maxValue = 100, 
  step = 0.1,
  defaultValue = 50,
  onChange
}: 

  AttributeSelectorProps) => {
    const [value, setValue] = useState<number>(defaultValue);

    const handleSliderChange = (newValue: number[]) => {
      setValue(newValue[0]);
      onChange?.(newValue[0]);
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      const clampedValue = Math.max(minValue, Math.min(maxValue, inputValue));
      setValue(clampedValue);
      onChange?.(clampedValue);
    }
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
      <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        {attributeName}
      </h3>
          
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={value.toFixed(1)}
            onChange={handleInputChange}
            step={step}
            min={minValue}
            max={maxValue}
            className="w-24 text-center font-medium bg-white/10 text-white border-white/20"
          />
          <span className="text-sm text-white/60">
            / {maxValue}
          </span>
        </div>
            
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          step={step}
          className="w-full"
        />
      </div>
    </Card>
  );
};

export default AttributeSelector;
