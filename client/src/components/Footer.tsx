import { useLanguage } from "@/contexts/LanguageContext";
import { Ship } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zyon-gray dark:bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-zyon-orange rounded-lg flex items-center justify-center">
                <Ship className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Zyon Galicia</h1>
                <p className="text-xs text-gray-400">Embarcaciones Profesionales</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en embarcaciones profesionales con más de 20 años de experiencia en el sector náutico gallego.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-400 hover:text-zyon-orange transition-colors"
                  data-testid="footer-link-home"
                >
                  {t('footer.links.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="text-gray-400 hover:text-zyon-orange transition-colors"
                  data-testid="footer-link-services"
                >
                  {t('footer.links.services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('embarcaciones')}
                  className="text-gray-400 hover:text-zyon-orange transition-colors"
                  data-testid="footer-link-boats"
                >
                  {t('footer.links.boats')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('galeria')}
                  className="text-gray-400 hover:text-zyon-orange transition-colors"
                  data-testid="footer-link-gallery"
                >
                  {t('footer.links.gallery')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="text-gray-400 hover:text-zyon-orange transition-colors"
                  data-testid="footer-link-contact"
                >
                  {t('footer.links.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-zyon-orange transition-colors">
                  {t('footer.services.sales')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-zyon-orange transition-colors">
                  {t('footer.services.maintenance')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-zyon-orange transition-colors">
                  {t('footer.services.consulting')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-zyon-orange transition-colors">
                  {t('footer.services.financing')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-zyon-orange">📍</span>
                <span className="text-gray-400">Puerto Deportivo de Vigo</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-zyon-orange">📞</span>
                <span className="text-gray-400">+34 986 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-zyon-orange">✉️</span>
                <span className="text-gray-400">info@zyongalicia.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Zyon Galicia. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-zyon-orange text-sm transition-colors">
              {t('footer.legal.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-zyon-orange text-sm transition-colors">
              {t('footer.legal.terms')}
            </a>
            <a href="#" className="text-gray-400 hover:text-zyon-orange text-sm transition-colors">
              {t('footer.legal.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
