import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, Moon, Menu, ChevronDown, Ship, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Estados para el efecto de scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const languages = [
    { code: "es", label: "ES", name: "Español", flag: "🇪🇸" },
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "fr", label: "FR", name: "Français", flag: "🇫🇷" }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const isHomePage = location === '/';

  // Efecto para controlar la visibilidad del header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solo ocultar si hemos hecho scroll suficiente (más de 100px)
      if (currentScrollY > 100) {
        // Si estamos haciendo scroll hacia abajo, ocultar
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } 
        // Si estamos haciendo scroll hacia arriba, mostrar
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      } 
      // Si estamos cerca del top, siempre mostrar
      else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    // Animación con Framer Motion y control de visibilidad
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300"
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('inicio')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="header-logo"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/images/zyon.png" 
                alt="Logo Zyon Galicia" 
                className="w-12 h-12 object-contain" 
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-zyon-gray dark:text-white">Zyon Galicia</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Embarcaciones Profesionales</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.button 
              onClick={() => scrollToSection('inicio')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              data-testid="nav-home"
            >
              {t('nav.home')}
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('servicios')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              data-testid="nav-services"
            >
              {t('nav.services')}
            </motion.button>
            <motion.button 
              onClick={() => navigateToPage('/embarcaciones-lanchas')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              data-testid="nav-boats"
            >
              {t('nav.boats')}
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('galeria')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              data-testid="nav-gallery"
            >
              {t('nav.gallery')}
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contacto')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              data-testid="nav-contact"
            >
              {t('nav.contact')}
            </motion.button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Mejorado */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2"
                  data-testid="language-selector"
                >
                  <Globe className="w-4 h-4 text-zyon-orange" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex items-center space-x-2"
                    data-testid={`language-${lang.code}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    <span className="ml-2 text-sm text-gray-500">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2"
              data-testid="theme-toggle"
            >
              {theme === "light" ? (
                <Sun className="w-4 h-4 text-zyon-orange" />
              ) : (
                <Moon className="w-4 h-4 text-yellow-400" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden bg-gray-100 dark:bg-gray-800"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <motion.button 
                    onClick={() => scrollToSection('inicio')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    whileHover={{ x: 5 }}
                    data-testid="mobile-nav-home"
                  >
                    {t('nav.home')}
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('servicios')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    whileHover={{ x: 5 }}
                    data-testid="mobile-nav-services"
                  >
                    {t('nav.services')}
                  </motion.button>
                  <motion.button 
                    onClick={() => navigateToPage('/embarcaciones-lanchas')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    whileHover={{ x: 5 }}
                    data-testid="mobile-nav-boats"
                  >
                    {t('nav.boats')}
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('galeria')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    whileHover={{ x: 5 }}
                    data-testid="mobile-nav-gallery"
                  >
                    {t('nav.gallery')}
                  </motion.button>
                  <motion.button 
                    onClick={() => scrollToSection('contacto')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    whileHover={{ x: 5 }}
                    data-testid="mobile-nav-contact"
                  >
                    {t('nav.contact')}
                  </motion.button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
