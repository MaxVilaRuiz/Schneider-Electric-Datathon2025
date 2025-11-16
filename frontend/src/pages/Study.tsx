import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttributeSelector from "@/components/AttributeSelector";
import AttributeBoolean from "@/components/AttributeBoolean";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const Study = () => {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 0, 0, 0, 0]);
  const names = [
    "Product A sold in the past",
    "Product B sold in the past",
    "A recomendations",
    "A product",
    "B product",
    "C product",
    "D product",
    "Hit rate",
    "Iterations",
    "Contracts",
    "Initial month",
    "Time opened",
    "Competitor Z",
    "Comptetitor X",
    "Comptetitor Y",
    "Customer in Iberia"
  ]
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({attributes}),
      });

      const result = await response.json();
      console.log("Backend answer: ", result);

      navigate("/results");
    }
    catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  const descriptions = [
    "Historical sales of Product A with the costumer concerned",
    "Historical sales of Product B with the costumer concerned",
    "INdicates if Product A was recommended in the past to the costumer",
    "Amount we are trying to sell of product A",
    "Amount we are trying to sell of product B",
    "Amount we are trying to sell of product C",
    "Amount we are trying to sell of product D",
    "Customer succes rate in previous interactions",
    "Number of iteractions with the costumer",
    "Month when the opportunity was created",
    "Indicates if the opportunity has been opened for a long time",
    "Pressence of competitor Z in the opportunity",
    "Pressence of competitor X in the opportunity",
    "CPressence of competitor Y in the opportunity",
    "Competidor X presente",
    "Competidor Y presente",
    "A binary variable indicating whether the customer is located in the Iberian Peninsula"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009530] via-[#00551b] to-[#002e0f] text-white relative overflow-hidden">
      {/* Header with colored bar and decorative elements */}
      <header className="
        sticky top-0 z-50 
        bg-gradient-to-r from-[#002e0f]/70 via-[#00551b]/60 to-[#009530]/50
        backdrop-blur-xl 
        border-b border-white/10
        shadow-xl
      ">
        <div className="
          max-w-6xl mx-auto px-6 py-4 
          flex items-center justify-between
        ">
          <h1 className="
            text-3xl font-bold 
            tracking-tight 
            text-white drop-shadow-sm
          ">
            Opportunity Study Form
          </h1>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-6xl mx-auto mt-12 px-6 pb-20 relative">
        <section className="bg-white/20 supports-backdrop-blur:bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/20 space-y-8 will-change-contents">

          {/* Title inside form */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">Fill in the opportunity attributes</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm">
              Provide the data for this opportunity. These attributes will be used to predict win/loss probability.
            </p>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {[...Array(12)].map((_, idx) => (
              <div key={idx}>
                <AttributeSelector
                  attributeNumber={idx + 1}
                  attributeName={names[idx]}
                  defaultValue={attributes[idx]}
                  description={descriptions[idx]}
                  onChange={(value) => {
                    const newAttributes = [...attributes];
                    newAttributes[idx] = value;
                    setAttributes(newAttributes);
                  }}
                />
              </div>
            ))
            }
            {[...Array(4)].map((_, idz) => (
              <div key = {idz}>
                <AttributeBoolean
                  attributeNumber={idz + 13}
                  attributeName={names[idz + 12]}
                  defaultValue={attributes[idz + 12]}
                  description={descriptions[idz + 12]}
                  onChange={(value) => {
                    const newAttributes = [...attributes];
                    newAttributes[idz + 12] = value;
                    setAttributes(newAttributes);
                  }}
                />
              </div>

            ))
            
            }

          </div>

          {/* Submit */}
          <div className="pt-6 flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="bg-primary-foreground/90 text-primary hover:bg-primary-foreground text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              Submit
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
        </main>
    </div>
  );
};

export default Study;
