import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Search } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Puerto Deportivo de Vigo - Marina con embarcaciones de lujo y yates donde opera Zyon Galicia",
    category: "marina"
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Lancha rápida Zyon Galicia navegando a alta velocidad en aguas gallegas",
    category: "speedboat"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Embarcación de pesca profesional Zyon Galicia trabajando en aguas de Galicia",
    category: "workboat"
  },
  {
    src: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Taller naval profesional Zyon Galicia - Instalaciones de reparación y mantenimiento de embarcaciones",
    category: "workshop"
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Puerto de Vigo al atardecer con embarcaciones amarradas - Base de operaciones de Zyon Galicia",
    category: "harbor"
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Detalle de casco y motor de embarcación Zyon Galicia - Calidad y precisión en construcción naval",
    category: "detail"
  },
  {
    src: "https://images.unsplash.com/photo-1552832230-52d5c6132cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Equipo profesional Zyon Galicia realizando mantenimiento especializado de embarcaciones",
    category: "maintenance"
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Embarcaciones Zyon Galicia ancladas en costa rocosa gallega - Navegación segura en aguas atlánticas",
    category: "coast"
  }
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
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className="relative group cursor-pointer"
            onClick={() => openLightbox(index)}
            data-testid={`gallery-image-${index}`}
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Search className="text-white text-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent 
          className="max-w-7xl max-h-[90vh] p-0 bg-black/90 border-none"
          onKeyDown={handleKeyDown}
          data-testid="lightbox-modal"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-zyon-orange bg-transparent hover:bg-transparent z-10"
              size="icon"
              data-testid="lightbox-close"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Previous Button */}
            <Button
              onClick={previousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zyon-orange bg-transparent hover:bg-transparent"
              size="icon"
              data-testid="lightbox-previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Image */}
            <img
              src={galleryImages[currentImageIndex]?.src}
              alt={galleryImages[currentImageIndex]?.alt}
              className="max-w-full max-h-full object-contain"
              data-testid="lightbox-image"
            />

            {/* Next Button */}
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zyon-orange bg-transparent hover:bg-transparent"
              size="icon"
              data-testid="lightbox-next"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
