import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SpeedBoats from "@/pages/SpeedBoats";
import WorkBoats from "@/pages/WorkBoats";
import Pangas from "@/pages/Pangas";
import AllBoats from "@/pages/AllBoats";
import NotFound from "@/pages/not-found";
import "./i18n";
import { Helmet } from "react-helmet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre-nosotros" component={About} />
      <Route path="/lanchas-rapidas" component={SpeedBoats} />
      <Route path="/embarcaciones-trabajo" component={WorkBoats} />
      <Route path="/pangas" component={Pangas} />
      <Route path="/embarcaciones-lanchas" component={AllBoats} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Helmet>
              <title>Zyon Galicia - Embarcaciones Profesionales | Lanchas Rápidas, Embarcaciones de Trabajo y Pangas</title>
              <meta 
                name="description" 
                content="Zyon Galicia - Especialistas en embarcaciones profesionales con más de 20 años de experiencia. Venta, mantenimiento y asesoramiento en lanchas rápidas, embarcaciones de trabajo y pangas en Galicia." 
              />
              <meta name="keywords" content="embarcaciones profesionales, lanchas rápidas, pangas, embarcaciones trabajo, venta barcos, mantenimiento náutico, Galicia, Vigo" />
              <meta property="og:title" content="Zyon Galicia - Embarcaciones Profesionales" />
              <meta property="og:description" content="Especialistas en embarcaciones profesionales con más de 20 años de experiencia en el sector náutico gallego." />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://zyongalicia.com" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Zyon Galicia - Embarcaciones Profesionales" />
              <meta name="twitter:description" content="Especialistas en embarcaciones profesionales con más de 20 años de experiencia en el sector náutico gallego." />
              <link rel="canonical" href="https://zyongalicia.com" />
            </Helmet>
            <Layout>
              <Toaster />
              <Router />
            </Layout>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
