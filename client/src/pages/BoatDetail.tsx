import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Users,
  Gauge,
  Fuel,
  Anchor,
  Ship,
  LifeBuoy,
  Mail,
  FileText,
  Wrench,
  Target,
  Clock,
  Award,
  Zap,
  Expand,
  X,
} from "lucide-react";
import { useLocation } from "wouter";
import { boatModels } from "@/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Mapa de iconos para las features
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gauge: Gauge,
  Anchor: Anchor,
  Ship: Ship,
  LifeBuoy: LifeBuoy,
  Users: Users,
  Fuel: Fuel,
  Calendar: Calendar,
  Wrench: Wrench,
  Target: Target,
  Clock: Clock,
  Award: Award,
  Zap: Zap,
  // Agrega más iconos según necesites
};

export default function BoatDetail() {
  const { t, currentLanguage } = useLanguage();
  const [location, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [boatData, setBoatData] = useState<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxImageIndex((prev) =>
      prev === (boatData?.gallery.length || 1) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setLightboxImageIndex((prev) =>
      prev === 0 ? (boatData?.gallery.length || 1) - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  // Obtener el ID del boat de la URL (ruta: /embarcacion/1)
  const getBoatIdFromUrl = () => {
    const path = location;
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return id ? parseInt(id, 10) : 1;
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Obtener el ID correcto de la URL
    const boatId = getBoatIdFromUrl();

    // Encontrar el boat data
    const foundBoat = boatModels.find((boat) => boat.id === boatId);

    if (foundBoat) {
      setBoatData(foundBoat);
    } else {
      // Si no se encuentra, redirigir al catálogo
      setLocation("/embarcaciones-lanchas");
    }
  }, [location, setLocation]);

  const goBack = () => {
    setLocation("/embarcaciones-lanchas");
  };

  // Función para obtener texto en el idioma actual
  const getText = (textObj: any) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.es;
  };

  // Función para hacer scroll a la sección de contacto con mensaje preestablecido
  const scrollToContactWithMessage = (messageType: "info" | "budget") => {
    if (!boatData) return;

    const boatName = getText(boatData.name);

    let subject = "";
    let message = "";

    if (messageType === "info") {
      subject = t("boatDetail.contact.subject.info", {
        boatName,
        year: boatData.year,
      });
      message = t("boatDetail.contact.message.info", {
        boatName,
        year: boatData.year,
      });
    } else {
      subject = t("boatDetail.contact.subject.budget", {
        boatName,
        year: boatData.year,
      });
      message = t("boatDetail.contact.message.budget", {
        boatName,
        year: boatData.year,
      });
    }

    // Guardar en sessionStorage para usar en el formulario
    sessionStorage.setItem("contactSubject", subject);
    sessionStorage.setItem("contactMessage", message);

    // Navegar a home y scroll a contacto
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
      <div className="w-full py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t("boatDetail.notFound")}
          </p>
          <Button
            onClick={goBack}
            className="mt-4 bg-zyon-orange hover:bg-zyon-orange-dark text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("aboutPage.back")}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.section
        className="py-12 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
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

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-zyon-gray dark:text-white">
                {getText(boatData.name)}
              </h1>
              <p className="text-lg text-zyon-orange font-medium">
                {getText(boatData.purpose)}
              </p>
            </motion.div>
            <motion.div
              className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>
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
            {/* Main Image con botón de pantalla completa */}
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={boatData.gallery[selectedImage]}
                alt={`${getText(boatData.name)} - Vista principal`}
                className="w-full h-96 object-cover cursor-pointer"
                loading="lazy"
                onClick={() => openLightbox(selectedImage)}
              />
              {/* Botón de pantalla completa en la imagen principal */}
              <motion.button
                className="absolute top-4 right-16 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                onClick={() => openLightbox(selectedImage)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Expand className="w-4 h-4" />
              </motion.button>
              <div className="absolute top-4 right-4 bg-zyon-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                {selectedImage + 1} / {boatData.gallery.length}
              </div>
            </motion.div>

            {/* Gallery Thumbnails con botón de pantalla completa */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-zyon-gray dark:text-white">
                  {t("boatDetail.gallery")}
                </h3>
                {/* Botón de pantalla completa para toda la galería */}
                <motion.button
                  onClick={() => openLightbox(selectedImage)}
                  className="flex items-center text-zyon-orange hover:text-zyon-orange-dark text-sm font-medium ml-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Expand className="w-4 h-4 mr-1" />
                  {t("boatDetail.galleryFullscreen")}
                </motion.button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {boatData.gallery.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-zyon-orange"
                        : "border-transparent hover:border-zyon-orange/50"
                    } group`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${getText(boatData.name)} - Vista ${index + 1}`}
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
            {/* Features con animaciones mejoradas */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {t("boatDetail.features").split(" ")[0]}{" "}
                <span className="text-zyon-orange">
                  {t("boatDetail.features").split(" ")[1]}
                </span>
              </motion.h3>

              <motion.p
                className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {getText(boatData.description)}
              </motion.p>

              {/* Features con iconos individuales */}
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
                {boatData.features.items.map((feature: any, index: number) => {
                  const IconComponent = iconMap[feature.icon] || Ship;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center"
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-zyon-orange group-hover:rotate-20" />
                        </motion.div>
                        <div>
                          <motion.p
                            className="font-medium text-zyon-gray dark:text-white"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {getText(feature)}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Specifications con animaciones mejoradas */}
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
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {t("boatDetail.specifications").split(" ")[0]}{" "}
                <span className="text-zyon-orange">
                  {t("boatDetail.specifications").split(" ")[1]}
                </span>
              </motion.h3>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
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
                        whileHover={{ x: 5 }}
                      >
                        <dt className="text-gray-600 dark:text-gray-400 font-medium">
                          {key}
                        </dt>
                        <dd className="font-semibold text-zyon-gray dark:text-white">
                          {value as string}
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
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold mb-4 text-zyon-gray dark:text-white">
                  {t("boatDetail.questions")}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("boatDetail.expertHelp")}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={() => scrollToContactWithMessage("info")}
                    className="bg-zyon-orange hover:bg-zyon-orange-dark text-white flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t("boatDetail.contactAdvisor")}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section con animaciones mejoradas */}
      <motion.section
        className="py-16 bg-zyon-orange"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t("boatDetail.interested", { boatName: getText(boatData.name) })}
          </motion.h2>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("boatDetail.requestInfoOrBudget")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            viewport={{ once: true }}
          >
            {/* Botón de Información Detallada */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.button
                onClick={() => scrollToContactWithMessage("info")}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-zyon-orange rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(242, 124, 56, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                data-testid="detailed-info-button"
              >
                {/* Efecto de brillo al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                <div className="relative flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-3 group-hover:animate-pulse group-hover:rotate-12" />
                  <span>{t("boatDetail.actions.detailedInfo")}</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Botón de solicitar presupuesto */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.button
                onClick={() => scrollToContactWithMessage("budget")}
                className="group relative px-8 py-4 bg-zyon-orange hover:bg-zyon-orange-dark text-white border-2 border-zyon-orange hover:border-zyon-orange-dark rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-zyon-orange/25"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(242, 124, 56, 0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                data-testid="schedule-visit-button"
              >
                {/* Efecto de pulsación suave */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="relative flex items-center justify-center">
                  <FileText className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t("boatDetail.actions.scheduleVisit")}</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="max-w-7xl max-h-[90vh] p-0 bg-black/95 border-none backdrop-blur-sm overflow-hidden"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Header con botón de cerrar */}
            <div className="absolute top-4 right-4 z-20">
              <motion.button
                onClick={closeLightbox}
                className="text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Área principal de la imagen con contenedor flexible */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
              {/* Botón anterior */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 z-10 rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 lg:left-8"
                disabled={boatData?.gallery.length <= 1}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* CONTENEDOR RESPONSIVE PARA LA IMAGEN */}
              <div className="relative w-full h-full max-w-6xl max-h-[70vh] flex items-center justify-center">
                <motion.img
                  src={boatData?.gallery[lightboxImageIndex]}
                  alt={`${getText(boatData?.name || "")} - Vista ${lightboxImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  key={lightboxImageIndex}
                  onLoad={(e) => {
                    // Opcional: puedes ajustar el zoom o posición basado en las dimensiones reales
                    const img = e.target as HTMLImageElement;
                    console.log(
                      `Imagen cargada: ${img.naturalWidth}x${img.naturalHeight}`,
                    );
                  }}
                />
              </div>

              {/* Botón siguiente */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 z-10 rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 lg:right-8"
                disabled={boatData?.gallery.length <= 1}
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>

            {/* Footer con información y controles */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-white text-lg font-semibold">
                    {getText(boatData?.name || "")}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {lightboxImageIndex + 1} / {boatData?.gallery.length}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center"></div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
