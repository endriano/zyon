import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Gauge, 
  Fuel, 
  Anchor, 
  Ship, 
  LifeBuoy,
  Mail,
  FileText
} from "lucide-react";
import { useLocation } from "wouter";
import { boatModels } from "@/data";

// Mapa de iconos para las features
const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  Gauge: Gauge,
  Anchor: Anchor,
  Ship: Ship,
  LifeBuoy: LifeBuoy,
  Users: Users,
  Fuel: Fuel,
  Calendar: Calendar
};

export default function BoatDetail() {
  const { t, currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [boatData, setBoatData] = useState<any>(null);

  // Obtener el ID del boat de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const boatId = parseInt(urlParams.get('id') || '1');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Encontrar el boat data
    const foundBoat = boatModels.find(boat => boat.id === boatId);
    setBoatData(foundBoat);
  }, [boatId]);

  const goBack = () => {
    setLocation('/embarcaciones-lanchas');
  };

  // Función para obtener texto en el idioma actual
  const getText = (textObj: any) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.es;
  };

  // Función para hacer scroll a la sección de contacto con mensaje preestablecido
  const scrollToContactWithMessage = (messageType: 'info' | 'budget') => {
    const boatName = getText(boatData?.name);

    let subject = '';
    let message = '';

    if (messageType === 'info') {
      subject = t('boatDetail.contact.subject.info');
      message = t('boatDetail.contact.message.info', { boatName, year: boatData?.year });
    } else {
      subject = t('boatDetail.contact.subject.budget');
      message = t('boatDetail.contact.message.budget', { boatName, year: boatData?.year });
    }

    // Guardar en sessionStorage para usar en el formulario
    sessionStorage.setItem('contactSubject', subject);
    sessionStorage.setItem('contactMessage', message);

    // Navegar a home y scroll a contacto
    setLocation('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!boatData) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t('boatDetail.notFound')}
          </p>
          <Button 
            onClick={goBack}
            className="mt-4 bg-zyon-orange hover:bg-zyon-orange-dark text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('aboutPage.back')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.section 
        className="py-12 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={goBack}
                variant="outline"
                className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
                data-testid="back-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('aboutPage.back')}
              </Button>
            </motion.div>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-zyon-gray dark:text-white">
                {getText(boatData.name)}
              </h1>
              <p className="text-lg text-zyon-orange font-medium">
                {getText(boatData.purpose)} • {boatData.year}
              </p>
            </motion.div>
            <motion.div
              className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToContactWithMessage('info')}
                  className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-6 py-3 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('boatDetail.actions.requestInfo')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToContactWithMessage('budget')}
                  variant="outline"
                  className="border-2 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white px-6 py-3 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t('boatDetail.actions.requestBudget')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Image Gallery */}
      <motion.section 
        className="py-8 bg-white dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={boatData.gallery[selectedImage]}
                alt={`${getText(boatData.name)} - Vista principal`}
                className="w-full h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-zyon-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                {selectedImage + 1} / {boatData.gallery.length}
              </div>
            </motion.div>

            {/* Gallery Thumbnails */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-zyon-gray dark:text-white">
                {t('boatDetail.gallery')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {boatData.gallery.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-lg cursor-pointer border-2 ${
                      selectedImage === index 
                        ? 'border-zyon-orange' 
                        : 'border-transparent hover:border-zyon-orange/50'
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={image}
                      alt={`${getText(boatData.name)} - Vista ${index + 1}`}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features and Specifications */}
      <motion.section 
        className="py-16 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                {t('boatDetail.features')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {getText(boatData.description)}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {getText(boatData.features).map((feature: string, index: number) => {
                  const IconComponent = iconMap[boatData.features.icon] || Ship;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-zyon-orange/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-zyon-orange" />
                        </div>
                        <div>
                          <p className="font-medium text-zyon-gray dark:text-white">{feature}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                {t('boatDetail.specifications')}
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <dl className="space-y-4">
                  {Object.entries(getText(boatData.specifications)).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <dt className="text-gray-600 dark:text-gray-400">{key}</dt>
                      <dd className="font-medium text-zyon-gray dark:text-white">{value as string}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-bold mb-4 text-zyon-gray dark:text-white">
                  {t('boatDetail.questions')}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('boatDetail.expertHelp')}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => scrollToContactWithMessage('info')}
                    className="bg-zyon-orange hover:bg-zyon-orange-dark text-white flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t('boatDetail.contactAdvisor')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-zyon-orange"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('boatDetail.interested', { boatName: getText(boatData.name) })}
          </motion.h2>

          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('boatDetail.requestInfoOrBudget')}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToContactWithMessage('info')}
                className="bg-white text-zyon-orange hover:bg-gray-100 px-8 py-3 text-lg flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('boatDetail.actions.detailedInfo')}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToContactWithMessage('budget')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg flex items-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                {t('boatDetail.actions.scheduleVisit')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
