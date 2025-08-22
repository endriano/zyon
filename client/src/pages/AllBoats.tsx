import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function AllBoats() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = () => {
    setLocation('/');
  };

  const categories = [
    {
      title: t('boats.speedboats.title'),
      description: t('boats.speedboats.description'),
      route: '/lanchas-rapidas',
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: t('boats.workboats.title'),
      description: t('boats.workboats.description'),
      route: '/embarcaciones-trabajo',
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: t('boats.panga.title'),
      description: t('boats.panga.description'),
      route: '/pangas',
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

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
              {t('boats.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('boats.subtitle')}. Explora nuestra completa gama de embarcaciones profesionales, 
              diseñadas para satisfacer todas tus necesidades náuticas.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zyon-gray dark:text-white">
            Categorías de Embarcaciones
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => setLocation(category.route)}
                data-testid={`category-${index}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={category.image}
                    alt={`${category.title} - ${category.description} - Embarcaciones profesionales Zyon Galicia especializadas en el sector náutico gallego`}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                    <div className="flex items-center text-zyon-orange font-semibold">
                      <span className="mr-2">Ver modelos</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid Section */}
      <section className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zyon-gray dark:text-white">
            Todos Nuestros Modelos
          </h2>
          
          {/* Grid preparado para todos los productos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder cards - se pueden reemplazar con datos reales */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid={`boat-placeholder-${item}`}
              >
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Imagen</span>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-zyon-gray dark:text-white">
                  Modelo {item}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Descripción breve del modelo.
                </p>
                <Button size="sm" className="w-full bg-zyon-orange hover:bg-zyon-orange-dark text-white">
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
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a encontrar la embarcación perfecta para ti.
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