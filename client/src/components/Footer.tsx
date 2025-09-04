// components/Footer.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Ship, Download } from "lucide-react"; // Añadido Download
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

import zyonLogoLight from "@/assets/images/logos/zyon-logo.png";
import zyonLogoDark from "@/assets/images/logos/zyon-logo-dark.png";

export function Footer() {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  const { theme } = useTheme();

  // Función para hacer scroll a una sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Función mejorada para navegar y/o hacer scroll
  const navigateAndScroll = (path: string, sectionId?: string) => {
    if (location === path) {
      if (sectionId) {
        scrollToSection(sectionId);
      }
    } else {
      setLocation(path);
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }
    }
  };

  // Función para descargar el catálogo
  const downloadCatalog = () => {
    // Ruta al catálogo en la carpeta public
    const catalogPath = "src/assets/catalog/zyon-catalogo.pdf";

    // Crear un elemento 'a' temporal para la descarga
    const link = document.createElement("a");
    link.href = catalogPath;
    link.download = "catalogo-zyon-galicia.pdf"; // Nombre del archivo al descargar
    link.target = "_blank"; // Abrir en nueva pestaña por si el navegador lo bloquea

    // Simular click para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="bg-zyon-gray dark:bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-20 h-20 rounded-lg flex items-center justify-center">
                <img
                  src={theme === "dark" ? zyonLogoDark : zyonLogoLight}
                  alt="Logo Zyon Galicia"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-400 dark:text-white">
                  ZYON <span className="text-zyon-orange">GALICIA</span>
                </h1>
              </div>
            </div>
            {/* Botón de descarga del catálogo */}
            <button
              onClick={downloadCatalog}
              className="flex items-center px-4 py-2 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              data-testid="footer-download-catalog"
            >
              <Download className="w-4 h-4 mr-2" />
              {t("footer.downloadCatalog")}
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "inicio")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-home"
                >
                  {t("footer.links.home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/sobre-nosotros")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-home"
                >
                  {t("footer.links.about")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "servicios")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-services"
                >
                  {t("footer.links.services")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/embarcaciones-lanchas")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-boats"
                >
                  {t("footer.links.boats")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "galeria")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-gallery"
                >
                  {t("footer.links.gallery")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "contacto")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-link-contact"
                >
                  {t("footer.links.contact")}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.services.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "contacto")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-service-sales"
                >
                  {t("footer.services.sales")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "contacto")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-service-maintenance"
                >
                  {t("footer.services.maintenance")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateAndScroll("/", "contacto")}
                  className="text-gray-400 hover:text-zyon-orange transition-colors text-left w-full"
                  data-testid="footer-service-consulting"
                >
                  {t("footer.services.consulting")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-zyon-orange mt-1">📍</span>
                <span className="text-gray-400">
                  {t("contact.info.address.address1")}
                  <br />
                  {t("contact.info.address.address2")}
                  <br />
                  {t("contact.info.address.address3")}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zyon-orange mt-1">📞</span>
                <span className="text-gray-400">
                  +34 986 497 436
                  <br />
                  +34 986 497 344
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zyon-orange mt-1">✉️</span>
                <span className="text-gray-400">info@zyongalicia.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t("footer.legal.privacy")}
          </p>
          {/*<div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-zyon-orange text-sm transition-colors"
            >
              {t("footer.legal.privacy")}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-zyon-orange text-sm transition-colors"
            >
              {t("footer.legal.terms")}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-zyon-orange text-sm transition-colors"
            >
              {t("footer.legal.cookies")}
            </a>
          </div>*/}
        </div>
      </div>
    </footer>
  );
}