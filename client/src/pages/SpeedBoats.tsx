import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function SpeedBoats() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation('/');
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Button 
            onClick={goBack}
            variant="outline"
            className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              {t('boats.speedboats.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('boats.speedboats.description')}. Descubre nuestra selección de lanchas rápidas 
              diseñadas para ofrecer máximo rendimiento, seguridad y comodidad en el agua.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zyon-gray dark:text-white">
            Nuestros Modelos
          </h2>
          
          {/* Grid preparado para productos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder cards - se pueden reemplazar con datos reales */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="bg-zyon-bg dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid={`speedboat-placeholder-${item}`}
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Imagen del modelo</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zyon-gray dark:text-white">
                  Modelo {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Descripción del modelo de lancha rápida disponible.
                </p>
                <Button className="w-full bg-zyon-orange hover:bg-zyon-orange-dark text-white">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zyon-orange">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas asesoramiento personalizado?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos te ayudarán a elegir la lancha rápida perfecta para tus necesidades.
          </p>
          <Button 
            onClick={goBack}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg"
            data-testid="contact-cta"
          >
            Contactar Ahora
          </Button>
        </div>
      </section>
    </div>
  );
}