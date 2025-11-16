import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AttributeSelectorProps {
  attributeNumber: number;
  attributeName?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
}


const AttributeSelector = ({ 
  attributeNumber, 
  attributeName = `Atributo ${attributeNumber}`,
  defaultValue = 0,
  onChange
}: 




  AttributeSelectorProps) => {

    // ✅ ESTAT correctament definit dins del component
    const [attributeactive, setAttributeactive] = useState(true);

    const handleButton = () => {
        setAttributeactive(!attributeactive);
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      
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
        <h3 className="text-xl font-bold text-white mb flex items-center gap-2">
            {attributeName}
        </h3>
            
        <div className="space-y-4">
            <Button
            size = "sm"
            onClick={handleButton}
            className="bg-primary-foreground/90 text-primary hover:bg-primary-foreground text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group absolute left-[68%] top-1/2 -translate-y-1/2"
            >
            {attributeactive ? "oola" : "adeuu"}
            </Button>
        </div>
        </Card>
    );
};

export default AttributeSelector;
