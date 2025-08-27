import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

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

        {/* Contenido */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>

          {/* Descripción */}
          <p className="text-sm opacity-90 mb-4 transition-all duration-300">
            {description}
          </p>

          {/* CTA con traducción según idioma */}
          <motion.div 
            className="flex items-center text-zyon-orange font-semibold group-hover:translate-x-1 transition-transform duration-300"
            whileHover={{ x: 5 }}
          >
            <span className="mr-2">{t('boats.category.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}