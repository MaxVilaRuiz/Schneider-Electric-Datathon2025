import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
 
interface AttributeSelectorProps {
  attributeNumber: number;
  attributeName?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  defaultValue?: number;
  description?: string;
  onChange?: (value: number) => void;
}

const AttributeSelector = ({ 
  attributeNumber, 
  attributeName = `Atributo ${attributeNumber}`,
  minValue = 0, 
  maxValue = 100, 
  step = 0.1,
  defaultValue = 50,
  description = "que miras friki",
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
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">
           {attributeName}
         </h3>
         <Tooltip>
           <TooltipTrigger asChild>
             <div className="w-6 h-6 rounded-full bg-white/20 hover:bg-[#87D300]/40 flex items-center justify-center cursor-help transition-colors">
               <Info className="w-4 h-4 text-white" />
             </div>
           </TooltipTrigger>
           <TooltipContent side="top" className="bg-white/50 text-black border-white/30 max-w-[500px] text-base">
             {description}
           </TooltipContent>
         </Tooltip>
       </div>
      </div>
          
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
