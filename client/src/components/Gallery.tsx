import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Search } from "lucide-react";

// Importar imágenes de la galería desde assets
import embarcacionBarcelona from "@/assets/images/home/galeria/embarcacionBarcelona.webp";
import embarcacionLimpieza from "@/assets/images/home/galeria/embarcacionLimpieza.webp";
import embarcacionLimpieza2 from "@/assets/images/home/galeria/embarcacionLimpieza2.webp";
import embarcaciónNeumatica from "@/assets/images/home/galeria/embarcaciónNeumatica.webp";
import lanchaLLoret from "@/assets/images/home/galeria/lanchaLLoret.webp";
import motores from "@/assets/images/home/galeria/motores.webp";
import workboat1 from "@/assets/images/home/galeria/workboat1.webp";
import workboatTrimarine from "@/assets/images/home/galeria/workboatTrimarine.webp";
import speedboatArmon from "@/assets/images/home/galeria/speedboatArmon.webp";
import speedboats from "@/assets/images/home/galeria/speedboats.webp";
import workboat2 from "@/assets/images/home/galeria/workboat2.webp";
import workboatCalvo from "@/assets/images/home/galeria/workboatCalvo.webp";
import embarcacionBombero from "@/assets/images/home/galeria/embarcacionBombero.webp";
import lanchaRapida from "@/assets/images/home/galeria/lanchaRapida.webp";
import lanchaRescate from "@/assets/images/home/galeria/lanchaRescate.webp";
import speedboat from  "@/assets/images/home/galeria/speedboat.webp";

const galleryImages = [
  {
    src: lanchaLLoret,
    alt: "Embarcación para realizar acciones de rescate",
    category: "workboat",
  },
  {
    src: embarcaciónNeumatica,
    alt: "Lancha rápida Zyon Galicia listas para navegar",
    category: "speedboat",
  },
  {
    src: embarcacionLimpieza2,
    alt: "Embarcación de limpieza realizando su función a modo de prueba",
    category: "detail",
  },
  {
    src: embarcacionBarcelona,
    alt: "Embarcación profesional con casco y motores fuera de borda",
    category: "workboat",
  },
  {
    src: workboat1,
    alt: "Embarcación de diseño panga",
    category: "workboat",
  },
  {
    src: motores,
    alt: "Detalle de motores de embarcación Zyon Galicia - Calidad y precisión en construcción naval",
    category: "detail",
  },
  {
    src: embarcacionLimpieza,
    alt: "Equipo profesional Zyon Galicia realizando para operaciones de limpieza de las aguas del mar",
    category: "workboat",
  },
  {
    src: speedboatArmon,
    alt: "Embarcaciones rápidas de Zyon Galicia",
    category: "speedboat",
  },
  {
    src: workboatCalvo,
    alt: "Embarcación de trabajo lista para ser introducida en el agua",
    category: "workboat",
  },
  {
    src: speedboats,
    alt: "Lanchas rápidas en puerto listas para su operación",
    category: "speedboat",
  },
  {
    src: workboat2,
    alt: "Pruebas de motor en embarcación recién construida",
    category: "workboat",
  },
  {
    src: embarcacionBombero,
    alt: "Embarcación de bomberos equipada para emergencias marítimas",
    category: "rescue",
  },
  {
    src: workboatTrimarine,
    alt: "Pruebas de embarcaciones panga",
    category: "workboat",
  },

  {
    src: lanchaRapida,
    alt: "Lancha rápida lista para operaciones marítimas",
    category: "speedboat",
  },
  {
    src: lanchaRescate,
    alt: "Lancha de rescate equipada para emergencias en el mar",
    category: "rescue",
  },
  {
    src: speedboat,
    alt: "Speedboat moderna y veloz en puerto",
    category: "speedboat",
  },
];


export function Gallery() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") previousImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      {/* Gallery Grid con animaciones mejoradas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
            data-testid={`gallery-image-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Imagen con lazy loading y placeholder */}
            <motion.img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover transition-transform duration-500"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Overlay con animación mejorada */}
            <motion.div
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Search className="text-white text-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal mejorado */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="max-w-7xl max-h-[90vh] p-0 bg-black/95 border-none backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          data-testid="lightbox-modal"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 z-10 rounded-full p-2 transition-colors"
              data-testid="lightbox-close"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Previous Button */}
            <motion.button
              onClick={previousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 z-10 rounded-full p-3 transition-colors"
              data-testid="lightbox-previous"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            {/* Image con animación de entrada */}
            <motion.img
              src={galleryImages[currentImageIndex]?.src}
              alt={galleryImages[currentImageIndex]?.alt}
              className="max-w-full max-h-full object-contain"
              data-testid="lightbox-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={currentImageIndex} // Para animar cuando cambia la imagen
            />

            {/* Next Button */}
            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zyon-orange bg-black/30 hover:bg-black/50 z-10 rounded-full p-3 transition-colors"
              data-testid="lightbox-next"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Image Info con animación */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white text-sm mb-2">
                {galleryImages[currentImageIndex]?.alt}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
                <div className="text-white text-xs bg-zyon-orange/20 px-2 py-1 rounded capitalize">
                  {galleryImages[currentImageIndex]?.category}
                </div>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
