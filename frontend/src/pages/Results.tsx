import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, ArrowLeft } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// Datos simulados para los gráficos
const generateRandomData = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    name: `Attr ${i + 1}`,
    value: Math.floor(Math.random() * 100),
    target: Math.floor(Math.random() * 100),
  }));
};

const Results = () => {
  const location = useLocation();
  const rawSummary = location.state?.result?.summary;
  const summary =
  Array.isArray(rawSummary)
    ? rawSummary.join("\n\n")
    : rawSummary || "";
  
  console.log("Data received from Study: ", summary);

  const chartData = generateRandomData();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002e0f] via-[#00551b] to-[#009530] text-white relative overflow-hidden">
      {/* Header */}
      <header className="
        sticky top-0 z-50 
        bg-gradient-to-r from-[#002e0f]/70 via-[#00551b]/60 to-[#009530]/50
        backdrop-blur-xl 
        shadow-xl
        border-b border-white/10 
      ">

        {/* Fade inferior */}
        <div className="
          absolute bottom-0 left-0 right-0 
          h-10 
          bg-gradient-to-b 
          from-transparent 
          to-[#002e0f]/0
          pointer-events-none
        " />

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">

          {/* Button on left */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/study")}
            className="flex items-center gap-1 bg-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Return
          </Button>

          {/* Title on right */}
          <h1 className="
            text-3xl font-bold 
            tracking-tight 
            text-white 
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]
          ">
            Results
          </h1>

        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Explicación */}
          <Card className="
            lg:col-span-1 
            bg-white/5 
            backdrop-blur-lg 
            border border-white/15 
            rounded-2xl 
            shadow-xl 
            animate-fade-in
          ">
            <CardHeader className="
              bg-white/5 
              backdrop-blur-md 
              border-b border-white/10 
              rounded-t-2xl
            ">
              <CardTitle className="text-white font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="text-[#87D300]" size={22} />
                AI Analysis
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="max-h-screen overflow-y-auto px-4 py-4">
                <div className="space-y-6">

                  {/* Mensaje IA */}
                  <div className="flex items-start gap-3">
                    <div className="
                      w-7 h-7 sm:w-9 sm:h-9 
                      rounded-full 
                      bg-gradient-to-br from-[#009530] to-[#87D300] 
                      flex items-center justify-center 
                      text-black text-sm sm:text-base font-bold
                    ">
                      AI
                    </div>
                    <div className="
                      bg-white/10 
                      backdrop-blur-md 
                      px-4 py-3 
                      rounded-xl 
                      border border-white/10
                      text-white 
                      shadow-lg
                      leading-relaxed
                      max-w-[85%]
                    ">
                      <pre className="whitespace-pre-wrap text-white/90 leading-relaxed">
                        {summary}
                      </pre>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Graphics */}
          <div className="space-y-6 animate-fade-in">
          <Card className="
            bg-white/5 
            backdrop-blur-lg
            border border-white/15 
            rounded-2xl 
            shadow-xl 
            transition-all 
            hover:shadow-2xl 
            hover:bg-white/10
          ">
          <CardHeader className="
            bg-white/5 
            border-b border-white/10 
            backdrop-blur-md 
            rounded-t-2xl
          ">
            <CardTitle className="text-white font-semibold tracking-wide">Gráfico de Barras</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Actual" />
                    <Bar dataKey="target" fill="hsl(var(--accent))" name="Objetivo" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="
              bg-white/5 
              backdrop-blur-lg
              border border-white/15 
              rounded-2xl 
              shadow-xl 
              transition-all 
              hover:shadow-2xl 
              hover:bg-white/10
            ">
              <CardHeader className="
                bg-white/5 
                border-b border-white/10 
                backdrop-blur-md 
                rounded-t-2xl
              ">
                <CardTitle className="text-white font-semibold tracking-wide">Gráfico de Líneas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--accent))" strokeWidth={3} name="Objetivo" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
