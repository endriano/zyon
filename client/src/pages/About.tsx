import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ship, Users, Award, Clock, Target, Wrench, LifeBuoy, Handshake } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = () => {
    setLocation('/');
  };

  // Variantes de animación para las secciones
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header Section con animación */}
      <motion.section 
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              onClick={goBack}
              variant="outline"
              className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white transition-all duration-300"
              data-testid="back-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </motion.button>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              Sobre Zyon Galicia
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Más de 20 años de experiencia en el sector náutico gallego nos avalan como 
              especialistas en embarcaciones profesionales de la más alta calidad.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Story con animaciones mejoradas */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
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
                Nuestra Historia
              </motion.h2>
              <motion.div 
                className="space-y-4 text-gray-600 dark:text-gray-400"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p variants={itemVariants}>
                  Fundada en Galicia con la pasión por el mar, Zyon Galicia nació de la visión 
                  de ofrecer embarcaciones profesionales que combinaran tradición, innovación y calidad excepcional.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Durante más de dos décadas, hemos trabajado estrechamente con pescadores, 
                  profesionales marítimos y entusiastas del mar para desarrollar soluciones 
                  náuticas que superen las expectativas más exigentes.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Cada embarcación que sale de nuestros talleres lleva consigo el compromiso 
                  con la excelencia y la durabilidad que ha caracterizado a Zyon Galicia 
                  desde sus inicios.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Historia de Zyon Galicia - Más de 20 años construyendo embarcaciones profesionales de calidad en el sector náutico gallego"
                className="rounded-2xl shadow-lg"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />

              {/* Elementos flotantes con animaciones */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-zyon-orange text-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.8 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5, rotate: 5 }}
              >
                <Ship className="text-3xl mb-2" />
                <p className="text-sm font-semibold">Tradición Naval</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section con animaciones escalonadas */}
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
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada embarcación que creamos
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
              { icon: Award, title: "Calidad Excepcional", desc: "Utilizamos solo los mejores materiales y técnicas de construcción para garantizar embarcaciones duraderas y confiables." },
              { icon: Users, title: "Servicio Personalizado", desc: "Cada cliente es único. Trabajamos de cerca con nuestros clientes para entender sus necesidades específicas." },
              { icon: Handshake, title: "Compromiso Total", desc: "Nuestro compromiso no termina con la entrega. Ofrecemos soporte continuo y mantenimiento profesional." },
              { icon: Target, title: "Innovación Constante", desc: "Combinamos técnicas tradicionales con las últimas innovaciones para crear embarcaciones de vanguardia." },
              { icon: Clock, title: "Puntualidad", desc: "Respetamos los plazos acordados y entregamos en tiempo y forma, cumpliendo siempre nuestros compromisos." },
              { icon: LifeBuoy, title: "Soporte Integral", desc: "Ofrecemos asesoramiento completo desde el diseño hasta el mantenimiento, con un equipo experto siempre disponible." }
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
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-8 h-8 text-zyon-orange" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold mb-3 text-zyon-gray dark:text-white"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
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

      {/* Team Section con animaciones de entrada */}
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
              Profesionales apasionados por el mar y comprometidos con la excelencia
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
              { icon: "ZG", title: "Equipo de Diseño", subtitle: "Especialistas en Ingeniería Naval", desc: "Más de 15 años creando diseños innovadores que combinan funcionalidad y estética." },
              { icon: Wrench, title: "Equipo Técnico", subtitle: "Maestros Constructores", desc: "Artesanos especializados en construcción naval con técnicas tradicionales y modernas." },
              { icon: Users, title: "Atención al Cliente", subtitle: "Servicio Personalizado", desc: "Dedicados a brindar el mejor servicio y asesoramiento personalizado a cada cliente." }
            ].map((member, index) => {
              const IconComponent = typeof member.icon === 'string' ? null : member.icon;
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
                    {typeof member.icon === 'string' ? (
                      <span className="text-2xl text-white font-bold">{member.icon}</span>
                    ) : (
                      <IconComponent className="text-2xl text-white" />
                    )}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-zyon-gray dark:text-white">{member.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{member.subtitle}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section con animaciones finales */}
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
            ¿Listo para conocer nuestras embarcaciones?
          </motion.h2>

          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Descubre por qué Zyon Galicia es la elección preferida de profesionales del mar en Galicia.
          </motion.p>

          <motion.div 
            className="space-x-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => setLocation('/embarcaciones-lanchas')}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300"
              data-testid="boats-cta"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Embarcaciones
            </motion.button>
            <motion.button 
              onClick={goBack}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300"
              data-testid="contact-cta"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}