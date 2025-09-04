import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Menu, ChevronDown, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";

// Importar imágenes desde assets
import zyonLogoLight from "@/assets/images/logos/zyon-logo.png";
import zyonLogoDark from "@/assets/images/logos/zyon-logo-dark.png";
import flagES from "@/assets/images/flags/es.png";
import flagEN from "@/assets/images/flags/en.png";
import flagFR from "@/assets/images/flags/fr.png";

// Hook personalizado para detectar el breakpoint
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Usar 1200px como breakpoint en lugar del md por defecto
  const isMobileView = useMediaQuery("(max-width: 1199px)");

  // Estados para el efecto de scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const languages = [
    { code: "es", name: "Español", flag: flagES },
    { code: "en", name: "English", flag: flagEN },
    { code: "fr", name: "Français", flag: flagFR },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const isHomePage = location === "/";

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  // Items de navegación
  const navItems = [
    { id: "home", label: t("nav.home"), action: () => scrollToSection("inicio") },
    { id: "about", label: t("nav.about"), action: () => navigateToPage("/sobre-nosotros") },
    { id: "services", label: t("nav.services"), action: () => scrollToSection("servicios") },
    { id: "boats", label: t("nav.boats"), action: () => navigateToPage("/embarcaciones-lanchas") },
    { id: "gallery", label: t("nav.gallery"), action: () => scrollToSection("galeria") },
    { id: "contact", label: t("nav.contact"), action: () => scrollToSection("contacto") },
  ];

  return (
    <>
      {/* Animación con Framer Motion y control de visibilidad */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300"
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection("inicio")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="header-logo"
            >
              <div className="w-20 h-12 rounded-lg flex items-center justify-center">
                <img
                  src={theme === "dark" ? zyonLogoDark : zyonLogoLight}
                  alt="Logo Zyon Galicia"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-zyon-gray dark:text-white">
                  ZYON <span className="text-zyon-orange">GALICIA</span>
                </h1>
              </div>
            </motion.div>

            {/* Desktop Navigation - Solo visible en pantallas >= 1200px */}
            {!isMobileView && (
              <div className="hidden xl:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={item.action}
                    className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    data-testid={`nav-${item.id}`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zyon-orange transition-all group-hover:w-full"></span>
                  </motion.button>
                ))}
              </div>
            )}

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
                      className="flex items-center space-x-3 py-2"
                      data-testid={`language-${lang.code}`}
                    >
                      <img
                        src={lang.flag}
                        alt={`${lang.name} flag`}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          {lang.name}
                        </span>
                      </div>
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

              {/* Mobile Menu Button - Visible en pantallas < 1200px */}
              {isMobileView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="bg-gray-100 dark:bg-gray-800 rounded-full p-2"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={navigateToPage}
        onScrollTo={scrollToSection}
        isHomePage={isHomePage}
        navItems={navItems}
      />
    </>
  );
}
