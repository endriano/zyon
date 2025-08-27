import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

// Datos de los modelos de embarcaciones
const boatModels = [
  {
    id: 1,
    name: "Zyon Speed 3000",
    category: "speedboat",
    purpose: "Transporte rápido y recreación",
    year: 2023,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Lancha de alta velocidad con motor potente y diseño aerodinámico",
    features: ["Motor 300HP", "Capacidad 8 personas", "Velocidad máxima 60 nudos"]
  },
  {
    id: 2,
    name: "Zyon Work Pro 25",
    category: "workboat",
    purpose: "Pesca comercial y transporte de carga",
    year: 2022,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Embarcación robusta diseñada para condiciones marítimas exigentes",
    features: ["Casco reforzado", "Capacidad carga 2 toneladas", "Sistema de pesca integrado"]
  },
  {
    id: 3,
    name: "Zyon Panga Classic",
    category: "panga",
    purpose: "Pesca costera y navegación tradicional",
    year: 2023,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Panga tradicional gallega con acabados modernos",
    features: ["Madera de pino marítimo", "Motor 40HP", "Capacidad 4 personas"]
  },
  {
    id: 4,
    name: "Zyon Rescue 15",
    category: "rescue",
    purpose: "Rescate marítimo y emergencias",
    year: 2024,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Bote de rescate rápido con equipos de emergencia",
    features: ["Motor gemelo 200HP", "Sistema GPS avanzado", "Equipo de rescate incluido"]
  },
  {
    id: 5,
    name: "Zyon Speed Turbo",
    category: "speedboat",
    purpose: "Deportes acuáticos y recreación",
    year: 2023,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Lancha de lujo para deportes acuáticos",
    features: ["Motor 400HP", "Sistema de sonido premium", "Capacidad 10 personas"]
  },
  {
    id: 6,
    name: "Zyon Work Heavy",
    category: "workboat",
    purpose: "Trabajos pesados y transporte industrial",
    year: 2022,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Embarcación industrial para trabajos pesados",
    features: ["Motor 500HP", "Capacidad carga 5 toneladas", "Grúa hidráulica incluida"]
  },
  {
    id: 7,
    name: "Zyon Panga Modern",
    category: "panga",
    purpose: "Pesca recreativa y turismo",
    year: 2024,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Panga moderna con acabados de lujo",
    features: ["Fibra de vidrio reforzada", "Motor 60HP", "Sistema de navegación digital"]
  },
  {
    id: 8,
    name: "Zyon Rescue Pro",
    category: "rescue",
    purpose: "Rescate profesional y guardacostas",
    year: 2024,
    image: "https://images.unsplash.com/photo-1552832230-52d5c6132cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Bote de rescate profesional certificado",
    features: ["Casco auto-estabilizante", "Sistema de comunicación militar", "Capacidad 12 personas"]
  }
];

export default function AllBoats() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = () => {
    setLocation('/');
  };

  // Categorías para el filtro
  const categories = [
    { id: "all", name: "Todos", count: boatModels.length },
    { id: "speedboat", name: t('boats.speedboats.title'), count: boatModels.filter(b => b.category === "speedboat").length },
    { id: "workboat", name: t('boats.workboats.title'), count: boatModels.filter(b => b.category === "workboat").length },
    { id: "panga", name: t('boats.panga.title'), count: boatModels.filter(b => b.category === "panga").length },
    { id: "rescue", name: "Botes de Rescate", count: boatModels.filter(b => b.category === "rescue").length }
  ];

  // Filtrar modelos según la categoría seleccionada
  const filteredModels = selectedCategory === "all" 
    ? boatModels 
    : boatModels.filter(model => model.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Header Section con animaciones */}
      <motion.section 
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              onClick={goBack}
              className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white transition-all duration-300"
              data-testid="back-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </motion.button>
          </motion.div>

          <motion.div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              {t('boats.title')}
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t('boats.subtitle')}. Explora nuestra completa gama de embarcaciones profesionales, 
              diseñadas para satisfacer todas tus necesidades náuticas.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Filter Section */}
      <motion.section 
        className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-zyon-gray dark:text-white">
            Filtrar por Categoría
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-zyon-orange text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-zyon-orange/20 hover:text-zyon-orange'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} 
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* All Products Grid Section con animaciones */}
      <motion.section 
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-zyon-gray dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nuestros Modelos {selectedCategory !== "all" && (
              <span className="text-zyon-orange">
                - {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </motion.h2>

          {/* Grid con animaciones escalonadas */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            viewport={{ once: true }}
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
                data-testid={`boat-model-${model.id}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setLocation(`/embarcacion/${model.id}`)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={model.image}
                    alt={`${model.name} - ${model.description}`}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-zyon-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                    {model.year}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-1 text-zyon-gray dark:text-white">
                  {model.name}
                </h3>

                <p className="text-sm text-zyon-orange font-medium mb-2">
                  {categories.find(c => c.id === model.category)?.name}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {model.description}
                </p>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Propósito:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{model.purpose}</p>
                </div>

                <motion.button 
                  className="w-full bg-zyon-orange hover:bg-zyon-orange-dark text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Detalles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {filteredModels.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron modelos en esta categoría.
              </p>
              <Button 
                onClick={() => setSelectedCategory("all")}
                variant="outline"
                className="mt-4 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
              >
                Ver Todos los Modelos
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section con animaciones */}
      <motion.section 
        className="py-20 bg-zyon-orange"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ¿No encuentras lo que buscas?
          </motion.h2>

          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contacta con nosotros y te ayudaremos a encontrar la embarcación perfecta para ti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={goBack}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300"
              data-testid="contact-cta"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar Ahora
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}