import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AttributeBooleanProps {
  attributeNumber: number;
  attributeName?: string;
  defaultValue?: number;
  description?: string;
  onChange?: (value: number) => void;
}

const AttributeBoolean = ({ 
  attributeNumber, 
  attributeName = `Atributo ${attributeNumber}`,
  defaultValue = 0,
  description = "Sin descripción disponible",
  onChange
}: AttributeBooleanProps) => {
  const [value, setValue] = useState<boolean>(defaultValue === 1);

  const handleToggle = (newValue: boolean) => {
    setValue(newValue);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">
            {attributeName}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 rounded-full bg-white/20 hover:bg-[#87D300]/40 flex items-center justify-center cursor-help transition-colors">
                <Info className="w-4 h-4 text-white " />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-white/50 text-black border-white/30 max-w-[500px] text-base">
              {description}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/60">
            {value ? "Sí" : "No"}
          </span>
          <Switch
            checked={value}
            onCheckedChange={handleToggle}
            className="bg-white/20"
          />
        </div>
      </div>
    </Card>
  );
};

export default AttributeBoolean;