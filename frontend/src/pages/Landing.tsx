import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/study");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      <div className="aurora-bg"></div>
      <div className="noise"></div>
      {/* Animated background elements */}
      <div className={`absolute inset-0 opacity-10 transition-opacity duration-600`}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite] motion-safe:animate-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-foreground rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Title Rectangle - This transforms into header */}
      <div className={`relative ease-in-out z-50 flex items-center justify-center overflow-hidden p-5`}>
        <div className={`relative flex items-center`}>
          <h1
            className={`
              font-extrabold 
              tracking-tight 
              bg-gradient-to-r 
              from-white 
              via-white/80 
              to-white/60 
              bg-clip-text 
              text-transparent 
              drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] ease-out
              text-5xl sm:text-7xl md:text-[7.5rem] leading-[1] opacity-100 p-3
            `}
          >
            CustomStudy
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-4 animate-fade-in transition-opacity duration-300`}>
        <p className="text-sm sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
          Customize your learning experience with precision and control
        </p>

        <Button
          size="lg"
          onClick={handleStart}
          className="bg-primary-foreground/90 text-primary hover:bg-primary-foreground text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          Start
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Landing;
