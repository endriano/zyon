import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, Moon, Menu, ChevronDown, Ship } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "es", label: "ES", name: "Español" },
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-zyon-orange rounded-lg flex items-center justify-center">
              <Ship className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zyon-gray dark:text-white">Zyon Galicia</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Embarcaciones Profesionales</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              data-testid="nav-home"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('servicios')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              data-testid="nav-services"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('embarcaciones')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              data-testid="nav-boats"
            >
              {t('nav.boats')}
            </button>
            <button 
              onClick={() => scrollToSection('galeria')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              data-testid="nav-gallery"
            >
              {t('nav.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors"
              data-testid="nav-contact"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  data-testid="language-selector"
                >
                  <span className="text-sm font-medium">{currentLang.label}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    data-testid={`language-${lang.code}`}
                  >
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
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                  <button 
                    onClick={() => scrollToSection('inicio')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    data-testid="mobile-nav-home"
                  >
                    {t('nav.home')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicios')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    data-testid="mobile-nav-services"
                  >
                    {t('nav.services')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('embarcaciones')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    data-testid="mobile-nav-boats"
                  >
                    {t('nav.boats')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('galeria')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    data-testid="mobile-nav-gallery"
                  >
                    {t('nav.gallery')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('contacto')}
                    className="text-left text-zyon-gray dark:text-gray-300 hover:text-zyon-orange transition-colors py-2"
                    data-testid="mobile-nav-contact"
                  >
                    {t('nav.contact')}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
