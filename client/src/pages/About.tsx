import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Ship,
  Users,
  Award,
  Clock,
  Target,
  Wrench,
  LifeBuoy,
  Handshake,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  highlightKeywords,
  highlightKeywordsHero,
} from "@/lib/highlightKeywords";

import aboutFondo from "@/assets/images/aboutPage/fondoAbout.webp";

export default function About() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = () => {
    setLocation("/");
  };

  // Variantes de animación para las secciones
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.section
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={goBack}
              className="mb-6 flex items-center px-4 py-2 border-2 border-zyon-orange text-zyon-orange 
                         rounded-full font-medium shadow-sm
                         hover:bg-zyon-orange hover:text-white 
                         transition-all duration-300 ease-in-out"
              data-testid="back-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("aboutPage.back")}
            </motion.button>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              {highlightKeywords(t("aboutPage.header.title"))}
            </h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("aboutPage.header.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Story con imagen de fondo */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutFondo}
            alt="Historia de Zyon Galicia - Más de 15 años construyendo embarcaciones profesionales de calidad en el sector náutico gallego"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 dark:from-black/80 dark:via-black/60 dark:to-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-1 gap-16 items-center">
            {/* Contenido con animaciones */}
            <motion.div
              className="p-8 text-white max-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-zyon-gray dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {highlightKeywords(t("aboutPage.story.title"))}
              </motion.h2>
              <motion.div 
                className="space-y-4 text-gray-300 dark:text-gray-300"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p variants={itemVariants} className="leading-relaxed">
                  {t("aboutPage.story.description1")}
                </motion.p>
                <motion.p variants={itemVariants} className="leading-relaxed">
                  {t("aboutPage.story.description2")}
                </motion.p>
                <motion.p variants={itemVariants} className="leading-relaxed">
                  {t("aboutPage.story.description3")}
                </motion.p>
                <motion.p variants={itemVariants} className="leading-relaxed">
                  {t("aboutPage.story.description4")}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Espacio vacío que ahora muestra mejor la imagen de fondo */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {highlightKeywords(t("aboutPage.values.title"))}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("aboutPage.values.subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Award,
                title: t("aboutPage.values.quality.title"),
                desc: t("aboutPage.values.quality.description"),
              },
              {
                icon: Users,
                title: t("aboutPage.values.service.title"),
                desc: t("aboutPage.values.service.description"),
              },
              {
                icon: Handshake,
                title: t("aboutPage.values.commitment.title"),
                desc: t("aboutPage.values.commitment.description"),
              },
              {
                icon: Target,
                title: t("aboutPage.values.innovation.title"),
                desc: t("aboutPage.values.innovation.description"),
              },
              {
                icon: Clock,
                title: t("aboutPage.values.puntuality.title"),
                desc: t("aboutPage.values.puntuality.description"),
              },
              {
                icon: LifeBuoy,
                title: t("aboutPage.values.support.title"),
                desc: t("aboutPage.values.support.description"),
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-12 h-12 text-zyon-orange" />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-3 text-zyon-gray dark:text-white opacity-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section con animaciones de entrada 
      <motion.section
        className="py-20 bg-white dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Profesionales apasionados por el mar y comprometidos con la
              excelencia
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "ZG",
                title: "Equipo de Diseño",
                subtitle: "Especialistas en Ingeniería Naval",
                desc: "Más de 15 años creando diseños innovadores que combinan funcionalidad y estética.",
              },
              {
                icon: Wrench,
                title: "Equipo Técnico",
                subtitle: "Maestros Constructores",
                desc: "Artesanos especializados en construcción naval con técnicas tradicionales y modernas.",
              },
              {
                icon: Users,
                title: "Atención al Cliente",
                subtitle: "Servicio Personalizado",
                desc: "Dedicados a brindar el mejor servicio y asesoramiento personalizado a cada cliente.",
              },
            ].map((member, index) => {
              const IconComponent =
                typeof member.icon === "string" ? null : member.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-zyon-orange to-zyon-orange-dark rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {typeof member.icon === "string" ? (
                      <span className="text-2xl text-white font-bold">
                        {member.icon}
                      </span>
                    ) : (
                      <IconComponent className="text-2xl text-white" />
                    )}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-zyon-gray dark:text-white">
                    {member.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {member.subtitle}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section> */}

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-zyon-orange"
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
            {t("aboutPage.cta.title")}
          </motion.h2>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("aboutPage.cta.description")}
          </motion.p>

          <motion.div
            className="space-x-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setLocation("/embarcaciones-lanchas")}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300"
              data-testid="boats-cta"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("aboutPage.cta.cta1")}
            </motion.button>
            <motion.button
              onClick={goBack}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300"
              data-testid="contact-cta"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("aboutPage.cta.cta2")}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
