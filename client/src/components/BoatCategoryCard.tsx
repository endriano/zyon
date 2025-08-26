// components/BoatCategoryCard.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BoatCategoryCardProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
  delay: number;
  testId: string;
  altText: string;
}

export function BoatCategoryCard({ 
  image, 
  title, 
  description, 
  onClick, 
  delay, 
  testId, 
  altText 
}: BoatCategoryCardProps) {
  return (
    <motion.div 
      className="group cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7,
        delay,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ y: -15 }}
      data-testid={testId}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Imagen */}
        <div className="relative h-80">
          <motion.img 
            src={image}
            alt={altText}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Contenido - Siempre visible */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>

          {/* Descripción siempre visible en móvil, con efecto hover en desktop */}
          <p className="text-sm opacity-90 mb-4 transition-all duration-300">
            {description}
          </p>

          {/* CTA siempre visible */}
          <div className="flex items-center text-zyon-orange font-semibold group-hover:translate-x-1 transition-transform duration-300">
            <span className="mr-2">Ver modelos</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}