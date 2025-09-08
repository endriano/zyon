import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BoatCategoryCard } from "@/components/BoatCategoryCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  highlightKeywords,
  highlightKeywordsHero,
} from "@/lib/highlightKeywords";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Gallery } from "@/components/Gallery";
import {
  insertContactMessageSchema,
  type InsertContactMessage,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  ChevronDown,
  Ship,
  Wrench,
  LifeBuoy,
  Tag,
  Truck,
  Handshake,
  ArrowRight,
  Anchor,
} from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { submitContactFormPhp } from "@/lib/queryClient";

// Importar imagen del hero desde assets
import heroImage from "@/assets/images/home/hero.webp";
import speedboatImage from "@/assets/images/home/lancha.webp";
import workboatImage from "@/assets/images/home/trabajo.webp";
import pangaImage from "@/assets/images/home/panga.webp";
import rescueImage from "@/assets/images/home/rescate.webp";

export default function Home() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [animatedStats, setAnimatedStats] = useState({
    boats: 0,
    years: 0,
    satisfaction: 0,
  });
  const [, setLocation] = useLocation();

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 },
    );

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { boats: 50, years: 15, satisfaction: 99 };
    const duration = 2000;
    const steps = 60;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        boats: Math.floor(targets.boats * progress),
        years: Math.floor(targets.years * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targets);
      }
    }, duration / steps);
  };

  // Contact form
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    // Verificar si hay mensajes preestablecidos en sessionStorage
    const savedSubject = sessionStorage.getItem("contactSubject");
    const savedMessage = sessionStorage.getItem("contactMessage");

    if (savedSubject) {
      form.setValue("subject", savedSubject);
      sessionStorage.removeItem("contactSubject"); // Limpiar después de usar
    }

    if (savedMessage) {
      form.setValue("message", savedMessage);
      sessionStorage.removeItem("contactMessage"); // Limpiar después de usar
    }
  }, [form]);

  const contactMutation = useMutation({
    mutationFn: submitContactFormPhp,
    onSuccess: (responseData) => {
      if (responseData.success) {
        toast({
          title: t('contact.toast.success.title'),
          description: t('contact.toast.success.description'),
        });
        form.reset();
      } else {
        toast({
          title: t('contact.toast.error.title'),
          description: responseData.message || t('contact.toast.error.description'),
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: t('contact.toast.error.title'),
        description: error.message || t('contact.form.error'),
        variant: "destructive",
      });
    },
  });

  /*
  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: t("contact.form.success"),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: t("contact.form.error"),
        variant: "destructive",
      });
    },
  });*/

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Ship,
      title: t("services.sales.title"),
      description: t("services.sales.description"),
    },
    {
      icon: Wrench,
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
    },
    {
      icon: LifeBuoy,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
    },
    {
      icon: Tag,
      title: t("services.certifications.title"),
      description: t("services.certifications.description"),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image - Importada desde assets */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Zyon Galicia - Embarcaciones Profesionales en Puerto Deportivo de Vigo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay mejorado con gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 dark:from-black/60 dark:via-black/70 dark:to-black/90" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {highlightKeywordsHero(t("hero.title"))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {highlightKeywordsHero(t("hero.subtitle"))}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setLocation("/embarcaciones-lanchas")}
              className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="hero-cta-boats"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.cta_primary")}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contacto")}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-gray px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              data-testid="hero-cta-contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.cta_secondary")}
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator con mejor animación */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white text-2xl opacity-70" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Contenido de texto con animaciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-zyon-gray dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {highlightKeywords(t("about.title"))}
                </motion.h2>

                <motion.p
                  className="text-lg mb-8 leading-relaxed text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {t("about.description")}
                </motion.p>
              </div>

              {/* Estadísticas */}
              <div id="stats" className="grid sm:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center bg-zyon-orange/5 dark:bg-zyon-orange/10 rounded-xl p-6 transition-all duration-300"
                >
                  <motion.div
                    className="text-4xl font-bold text-zyon-orange mb-2"
                    data-testid="stat-boats"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5,
                    }}
                    viewport={{ once: true }}
                  >
                    {animatedStats.boats}+
                  </motion.div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t("about.stat1")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center bg-zyon-orange/5 dark:bg-zyon-orange/10 rounded-xl p-6 transition-all duration-300"
                >
                  <motion.div
                    className="text-4xl font-bold text-zyon-orange mb-2"
                    data-testid="stat-years"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.7,
                    }}
                    viewport={{ once: true }}
                  >
                    {animatedStats.years}+
                  </motion.div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t("about.stat2")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center bg-zyon-orange/5 dark:bg-zyon-orange/10 rounded-xl p-6 transition-all duration-300"
                >
                  <motion.div
                    className="text-4xl font-bold text-zyon-orange mb-2"
                    data-testid="stat-satisfaction"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.9,
                    }}
                    viewport={{ once: true }}
                  >
                    {animatedStats.satisfaction}%
                  </motion.div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t("about.stat3")}
                  </p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setLocation("/sobre-nosotros")}
                  className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="about-cta"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("about.cta")}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t("services.title").split(" ")[0]}{" "}
              <span className="text-zyon-orange">
                {t("services.title").split(" ")[1]}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  data-testid={`service-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {/* Icono y título alineados horizontalmente */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-zyon-orange group-hover:text-white transition-all duration-300 mt-1">
                      <IconComponent className="text-zyon-orange text-xl group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-zyon-gray dark:text-white self-center">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400">
                    {highlightKeywords(service.description)}
                  </p>

                  {/* Línea decorativa que aparece al hacer hover */}
                  <motion.div
                    className="mt-4 h-0.5 bg-zyon-orange/0 group-hover:bg-zyon-orange/20 transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boats Categories Section */}
      <section id="embarcaciones" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t("boats.title").split(" ")[0]}{" "}
              <span className="text-zyon-orange">
                {t("boats.title").split(" ")[1]}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("boats.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Componente reutilizable para cada categoría */}
            <BoatCategoryCard
              image={speedboatImage}
              title={t("boats.speedboats.title")}
              description={t("boats.speedboats.description")}
              onClick={() => {
                // Guardar la categoría seleccionada y redirigir a AllBoats
                localStorage.setItem("selectedBoatCategory", "speedboat");
                setLocation("/embarcaciones-lanchas");
              }}
              delay={0.1}
              testId="boat-category-speedboats"
              altText="Lancha rápida Zyon Galicia navegando a alta velocidad - Embarcaciones deportivas y recreativas de máximo rendimiento en Galicia"
            />

            <BoatCategoryCard
              image={workboatImage}
              title={t("boats.workboats.title")}
              description={t("boats.workboats.description")}
              onClick={() => {
                // Guardar la categoría seleccionada y redirigir a AllBoats
                localStorage.setItem("selectedBoatCategory", "workboat");
                setLocation("/embarcaciones-lanchas");
              }}
              delay={0.2}
              testId="boat-category-workboats"
              altText="Embarcación de trabajo profesional Zyon Galicia - Barcos robustos para pesca comercial y trabajos marítimos en puertos gallegos"
            />

            <BoatCategoryCard
              image={pangaImage}
              title={t("boats.panga.title")}
              description={t("boats.panga.description")}
              onClick={() => {
                // Guardar la categoría seleccionada y redirigir a AllBoats
                localStorage.setItem("selectedBoatCategory", "panga");
                setLocation("/embarcaciones-lanchas");
              }}
              delay={0.3}
              testId="boat-category-pangas"
              altText="Panga Zyon Galicia - Embarcación para pesca costera y navegación"
            />

            <BoatCategoryCard
              image={rescueImage}
              title={t("boats.rescue.title")}
              description={t("boats.rescue.description")}
              onClick={() => {
                // Guardar la categoría seleccionada y redirigir a AllBoats
                localStorage.setItem("selectedBoatCategory", "rescue");
                setLocation("/embarcaciones-lanchas");
              }}
              delay={0.3}
              testId="boat-category-rescue"
              altText="Embarcación de rescate Zyon Galicia - Barcos de salvamento y seguridad marítima"
            />
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setLocation("/embarcaciones-lanchas")}
              className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(242, 124, 56, 0.3), 0 10px 10px -5px rgba(242, 124, 56, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("boats.cta")}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <motion.section
        id="galeria"
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
              {highlightKeywords(t("gallery.title"))}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </motion.div>

          <Gallery />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contacto"
        className="py-20 bg-white dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
              {highlightKeywords(t("contact.title"))}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-40">
            {/* Contact Form */}
            <motion.div
              className="bg-zyon-bg dark:bg-gray-900 rounded-2xl p-8 h-fit"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                {t("contact.form.title")}
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.name")} *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contact.form.placeholders.name")}
                              {...field}
                              data-testid="contact-name"
                              className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-zyon-orange transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.email")} *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("contact.form.placeholders.email")}
                              {...field}
                              data-testid="contact-email"
                              className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-zyon-orange transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.phone")}</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t("contact.form.placeholders.phone")}
                            {...field}
                            data-testid="contact-phone"
                            className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-zyon-orange transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.subject")} *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              data-testid="contact-subject"
                              className="bg-white dark:bg-gray-800 border-2 border-transparent focus:border-zyon-orange transition-colors"
                            >
                              <SelectValue
                                placeholder={t("contact.form.subject")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="venta">
                              {t("contact.form.subjects.sale")}
                            </SelectItem>
                            <SelectItem value="mantenimiento">
                              {t("contact.form.subjects.maintenance")}
                            </SelectItem>
                            <SelectItem value="otro">
                              {t("contact.form.subjects.other")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.message")} *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={t("contact.form.placeholders.message")}
                            {...field}
                            data-testid="contact-message"
                            className="resize-none bg-white dark:bg-gray-800 border-2 border-transparent focus:border-zyon-orange transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      type="submit"
                      className="w-full bg-zyon-orange hover:bg-zyon-orange-dark text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={contactMutation.isPending}
                      data-testid="contact-submit"
                      whileHover={{
                        scale: 1.02,
                        boxShadow:
                          "0 20px 25px -5px rgba(242, 124, 56, 0.3), 0 10px 10px -5px rgba(242, 124, 56, 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t("contact.form.sending")}
                        </div>
                      ) : (
                        t("contact.form.submit")
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </Form>

              {/* Mensaje de confirmación/success*/}
              {contactMutation.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      {t("contact.form.success")}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Mensaje de error */}
              {contactMutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {t("contact.form.error")}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Information */}
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                className="space-y-8 h-fit"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                    {t("contact.info.title")}
                  </h3>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-zyon-orange text-4xl">📍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                          {t("contact.info.address.title")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t("contact.info.address.address1")}
                          <br />
                          {t("contact.info.address.address2")}
                          <br />
                          {t("contact.info.address.address3")}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-zyon-orange text-4xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                          {t("contact.info.phone.title")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          +34 986 497 436
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          +34 986 497 344
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-zyon-orange text-4xl">✉️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                          {t("contact.info.email.title")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          info@zyongalicia.com
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-zyon-orange text-4xl">🕒</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                          {t("contact.info.hours.title")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t("contact.info.hours.hours1")}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/*  Social Media
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-zyon-gray dark:text-white mb-4">
                  {t("contact.social.title")}
                </h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="w-12 h-12 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-facebook"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">📘</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-12 h-12 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-instagram"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">📷</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-12 h-12 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-linkedin"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">💼</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-12 h-12 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-youtube"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">📺</span>
                  </motion.a>
                </div>
              </motion.div>
          */}

                {/* Google Maps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.865433744954!2d-8.5527903!3d42.2912942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f7ebff8f7fff9%3A0x520b38101c9db809!2sYacht%20Port%20Marinas%2C%20S.L.!5e0!3m2!1ses!2ses!4v1721734567890!5m2!1ses!2ses"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Zyon Galicia"
                      data-testid="google-maps"
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
