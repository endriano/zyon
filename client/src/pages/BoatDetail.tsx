import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, Gauge, Fuel, Anchor } from "lucide-react";
import { useLocation } from "wouter";

// Datos de ejemplo para una embarcación específica
const boatData = {
  id: 1,
  name: "Zyon Speed 3000",
  category: "speedboat",
  purpose: "Transporte rápido y recreación",
  year: 2023,
  mainImage: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  gallery: [
    "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  ],
  description: "La Zyon Speed 3000 es una lancha de alta velocidad diseñada para ofrecer el máximo rendimiento y comodidad. Con su motor potente y diseño aerodinámico, es perfecta para transporte rápido y actividades recreativas en el agua.",
  features: [
    { icon: Gauge, label: "Velocidad máxima", value: "60 nudos" },
    { icon: Users, label: "Capacidad", value: "8 personas" },
    { icon: Fuel, label: "Motor", value: "300HP Yamaha" },
    { icon: Calendar, label: "Año", value: "2023" },
    { icon: Anchor, label: "Material", value: "Fibra de vidrio" }
  ],
  specifications: {
    "Longitud": "12 metros",
    "Ancho": "3.2 metros",
    "Calado": "0.8 metros",
    "Peso": "2,800 kg",
    "Combustible": "Tanque de 400 litros",
    "Color": "Blanco perlado"
  }
};

export default function BoatDetail() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = () => {
    setLocation('/embarcaciones-lanchas');
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.section 
        className="py-12 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.button 
            onClick={goBack}
            className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
            data-testid="back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </motion.button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-zyon-gray dark:text-white">
                {boatData.name}
              </h1>
              <p className="text-lg text-zyon-orange font-medium">
                {boatData.purpose} • {boatData.year}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <motion.button 
                className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Información
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Image Gallery */}
      <motion.section 
        className="py-8 bg-white dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={boatData.gallery[selectedImage]}
                alt={`${boatData.name} - Vista principal`}
                className="w-full h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-zyon-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                {selectedImage + 1} / {boatData.gallery.length}
              </div>
            </motion.div>

            {/* Gallery Thumbnails */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-zyon-gray dark:text-white">
                Galería de Imágenes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {boatData.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer border-2 ${
                      selectedImage === index 
                        ? 'border-zyon-orange' 
                        : 'border-transparent hover:border-zyon-orange/50'
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={image}
                      alt={`${boatData.name} - Vista ${index + 1}`}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features and Specifications */}
      <motion.section 
        className="py-16 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                Características Principales
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {boatData.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {boatData.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-zyon-orange/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-zyon-orange" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{feature.label}</p>
                          <p className="font-semibold text-zyon-gray dark:text-white">{feature.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                Especificaciones Técnicas
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <dl className="space-y-4">
                  {Object.entries(boatData.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <dt className="text-gray-600 dark:text-gray-400">{key}</dt>
                      <dd className="font-medium text-zyon-gray dark:text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-bold mb-4 text-zyon-gray dark:text-white">
                  ¿Tienes preguntas?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Nuestro equipo de expertos está listo para ayudarte con cualquier consulta sobre esta embarcación.
                </p>
                <motion.button
                  className="bg-zyon-orange hover:bg-zyon-orange-dark text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactar con un Asesor
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-zyon-orange"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Interesado en {boatData.name}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Solicita más información o agenda una visita para conocer esta embarcación en persona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="bg-white text-zyon-orange hover:bg-gray-100 px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Solicitar Información Detallada
            </motion.button>
            <motion.button 
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Visita
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}