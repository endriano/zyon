import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, Gauge, Fuel, Anchor } from "lucide-react";
import { useLocation } from "wouter";
import { boatModels } from "@/data";

// Mapeo de iconos para características
const featureIcons = {
  speed: Gauge,
  capacity: Users,
  engine: Fuel,
  year: Calendar,
  material: Anchor,
  length: Anchor,
  width: Anchor,
};

export default function BoatDetail() {
  const { t, currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [boatData, setBoatData] = useState<(typeof boatModels)[0] | null>(null);

  // Obtener ID de la URL
  const getBoatId = () => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    return id ? parseInt(id, 10) : null;
  };

  // Cargar datos del barco
  useEffect(() => {
    const id = getBoatId();
    if (id) {
      const boat = boatModels.find((b) => b.id === id);
      if (boat) {
        setBoatData(boat);
      } else {
        // Redirigir si no se encuentra el barco
        setLocation("/embarcaciones-lanchas");
      }
    } else {
      setLocation("/embarcaciones-lanchas");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setLocation]);

  // Función para obtener texto en el idioma actual
  const getText = (textObj: { es: string; en: string; fr: string }) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.es;
  };

  const goBack = () => {
    setLocation("/embarcaciones-lanchas");
  };

  // Función para contactar con información pre-rellenada
  const contactWithInfo = (type: "info" | "quote") => {
    if (!boatData) return;

    const boatName = getText(boatData.name);
    const message =
      type === "info"
        ? `Estoy interesado en obtener más información sobre el modelo ${boatName} (${boatData.year}). Por favor, envíenme detalles adicionales.`
        : `Me gustaría solicitar un presupuesto para el modelo ${boatName} (${boatData.year}). ¿Podrían proporcionarme una cotización detallada?`;

    // Guardar mensaje en localStorage para usar en el formulario de contacto
    localStorage.setItem(
      "contactSubject",
      type === "info" ? "informacion" : "presupuesto",
    );
    localStorage.setItem("contactMessage", message);

    // Navegar a contacto
    setLocation("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (!boatData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zyon-gray dark:text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section con animaciones mejoradas */}
      <motion.section
        className="py-12 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={goBack}
              className="mb-6 flex items-center px-4 py-2 border-2 border-zyon-orange text-zyon-orange 
                           rounded-full font-medium shadow-sm
                           hover:bg-zyon-orange hover:text-white 
                           transition-all duration-300 ease-in-out"
              data-testid="back-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("aboutPage.back")}
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-zyon-gray dark:text-white">
                {getText(boatData.name)}
              </h1>
              <p className="text-lg text-zyon-orange font-medium">
                {getText(boatData.purpose)} • {boatData.year}
              </p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Image Gallery con animaciones mejoradas */}
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
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={boatData.gallery[selectedImage]}
                alt={`${getText(boatData.name)} - Vista principal`}
                className="w-full h-96 object-cover transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-zyon-orange text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {selectedImage + 1} / {boatData.gallery.length}
              </div>
            </motion.div>

            {/* Gallery Thumbnails */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-zyon-gray dark:text-white">
                {t("boatDetail.gallery")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {boatData.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-zyon-orange shadow-lg"
                        : "border-transparent hover:border-zyon-orange/50 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${getText(boatData.name)} - Vista ${index + 1}`}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-zyon-orange/20 rounded-lg"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features and Specifications con animaciones mejoradas */}
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
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t("boatDetail.features").split(" ")[0]}{" "}
                <span className="text-zyon-orange">
                  {t("boatDetail.features").split(" ")[1]}
                </span>
              </motion.h3>

              <motion.p
                className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {getText(boatData.description)}
              </motion.p>

              <motion.div
                className="grid sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                viewport={{ once: true }}
              >
                {getText(boatData.features).map((feature, index) => {
                  // Determinar icono basado en el contenido de la característica
                  let IconComponent = Anchor;
                  if (
                    feature.toLowerCase().includes("velocidad") ||
                    feature.toLowerCase().includes("speed")
                  ) {
                    IconComponent = Gauge;
                  } else if (
                    feature.toLowerCase().includes("capacidad") ||
                    feature.toLowerCase().includes("capacity")
                  ) {
                    IconComponent = Users;
                  } else if (
                    feature.toLowerCase().includes("motor") ||
                    feature.toLowerCase().includes("engine")
                  ) {
                    IconComponent = Fuel;
                  } else if (
                    feature.toLowerCase().includes("año") ||
                    feature.toLowerCase().includes("year")
                  ) {
                    IconComponent = Calendar;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-zyon-orange/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-zyon-orange" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t("boatDetail.feature")}
                          </p>
                          <p className="font-semibold text-zyon-gray dark:text-white">
                            {feature}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t("boatDetail.specifications")}
              </motion.h3>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <dl className="space-y-4">
                  {Object.entries(getText(boatData.specifications)).map(
                    ([key, value], index) => (
                      <motion.div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <dt className="text-gray-600 dark:text-gray-400">
                          {key}
                        </dt>
                        <dd className="font-medium text-zyon-gray dark:text-white">
                          {value}
                        </dd>
                      </motion.div>
                    ),
                  )}
                </dl>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold mb-4 text-zyon-gray dark:text-white">
                  {t("boatDetail.questions")}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("boatDetail.expertHelp")}
                </p>
                <motion.button
                  onClick={() => contactWithInfo("info")}
                  className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-6 py-3 rounded-md transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("boatDetail.contactAdvisor")}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section con animaciones mejoradas */}
      <motion.section
        className="py-16 bg-zyon-orange"
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
            {t("boatDetail.interestedIn")} {getText(boatData.name)}?
          </motion.h2>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("boatDetail.requestMoreInfo")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => contactWithInfo("info")}
              className="bg-white text-zyon-orange hover:bg-gray-100 px-8 py-3 text-lg rounded-md transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("boatDetail.requestDetailedInfo")}
            </motion.button>
            <motion.button
              onClick={() => contactWithInfo("quote")}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg rounded-md transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("boatDetail.requestQuote")}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
