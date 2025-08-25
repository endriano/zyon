import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onScrollTo: (sectionId: string) => void;
  isHomePage: boolean;
}

export function MobileMenu({ isOpen, onClose, onNavigate, onScrollTo, isHomePage }: MobileMenuProps) {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t('nav.home'), action: () => onScrollTo('inicio') },
    { id: 'services', label: t('nav.services'), action: () => onScrollTo('servicios') },
    { id: 'boats', label: t('nav.boats'), action: () => onNavigate('/embarcaciones-lanchas') },
    { id: 'gallery', label: t('nav.gallery'), action: () => onScrollTo('galeria') },
    { id: 'contact', label: t('nav.contact'), action: () => onScrollTo('contacto') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Menu con slide y scale */}
          <motion.div
            initial={{ x: "100%", opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "100%", opacity: 0, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header del menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-zyon-gray dark:text-white">Menú</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-zyon-orange"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Items del menu con stagger animation */}
            <motion.nav 
              className="flex flex-col space-y-2 p-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={{
                    hidden: { x: 20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ x: 10, backgroundColor: "rgba(242, 124, 56, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="text-left py-4 px-4 text-lg font-medium text-zyon-gray dark:text-gray-300 hover:text-zyon-orange rounded-lg transition-all duration-200"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.nav>

            {/* Footer del menu */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                © 2024 Zyon Galicia
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}