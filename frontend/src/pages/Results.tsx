import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, ArrowLeft } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


// Datos simulados para los gráficos
const generateRandomData = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    name: `Attr ${i + 1}`,
    value: Math.floor(Math.random() * 100),
    target: Math.floor(Math.random() * 100),
  }));
};

const Results = () => {
  const chartData = generateRandomData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary/95 to-accent h-16 flex items-center justify-center shadow-lg relative overflow-hidden">
        
        {/* Botón de volver */}
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-30">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-1" />
            Return
          </Button>
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-foreground rounded-full blur-2xl" />
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-primary-foreground rounded-full blur-2xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <Sparkles className="text-primary-foreground" size={28} />
          <h1 className="text-3xl font-bold text-primary-foreground tracking-wide">
            Resultados
          </h1>
          <Sparkles className="text-primary-foreground" size={28} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Explicación */}
          <Card className="lg:col-span-1 border-2 border-primary/20 shadow-xl animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-primary">Análisis de Atributos</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 text-foreground">
                  <p className="text-lg font-semibold">
                    Resultados del Análisis
                  </p>
                  <p>
                    Basado en los atributos seleccionados, se ha generado un análisis 
                    detallado de tu perfil de aprendizaje.
                  </p>
                  <p>
                    Los gráficos muestran una comparativa entre tus valores actuales 
                    y los objetivos recomendados para optimizar tu experiencia de estudio.
                  </p>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="font-medium text-primary mb-2">Nota:</p>
                    <p className="text-sm">
                      Los datos mostrados son simulados. Una vez conectado el backend, 
                      estos valores se actualizarán automáticamente con tu información real.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Gráficos */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
                <CardTitle className="text-primary">Gráfico de Barras</CardTitle>
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

            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="text-primary">Gráfico de Líneas</CardTitle>
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
