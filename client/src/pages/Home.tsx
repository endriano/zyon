import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Gallery } from "@/components/Gallery";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ChevronDown, Ship, Wrench, LifeBuoy, Tag, Truck, Handshake, ArrowRight, Anchor } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [animatedStats, setAnimatedStats] = useState({ boats: 0, years: 0, satisfaction: 0 });
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
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { boats: 200, years: 20, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        boats: Math.floor(targets.boats * progress),
        years: Math.floor(targets.years * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
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
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: t('contact.form.success'),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: t('contact.form.error'),
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Ship,
      title: t('services.sales.title'),
      description: t('services.sales.description')
    },
    {
      icon: Wrench,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description')
    },
    {
      icon: LifeBuoy,
      title: t('services.consulting.title'),
      description: t('services.consulting.description')
    },
    {
      icon: Tag,
      title: t('services.certifications.title'),
      description: t('services.certifications.description')
    },
    {
      icon: Truck,
      title: t('services.transport.title'),
      description: t('services.transport.description')
    },
    {
      icon: Handshake,
      title: t('services.financing.title'),
      description: t('services.financing.description')
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span>{t('hero.title')}</span><br />
            <span className="text-zyon-orange">Profesionales</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection('embarcaciones')}
              className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="hero-cta-boats"
            >
              {t('hero.cta_primary')}
            </Button>
            <Button
              onClick={() => scrollToSection('contacto')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-gray px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              data-testid="hero-cta-contact"
            >
              {t('hero.cta_secondary')}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white text-2xl opacity-70" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zyon-gray dark:text-white">
                {t('about.title')}
                <span className="text-zyon-orange"> en Galicia</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                {t('about.description')}
              </p>
              <div id="stats" className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-zyon-orange mb-2" data-testid="stat-boats">
                    {animatedStats.boats}+
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('about.stat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-zyon-orange mb-2" data-testid="stat-years">
                    {animatedStats.years}+
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('about.stat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-zyon-orange mb-2" data-testid="stat-satisfaction">
                    {animatedStats.satisfaction}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('about.stat3')}
                  </p>
                </div>
              </div>
              <Button className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {t('about.cta')}
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Zyon Galicia boat workshop and marina facilities"
                className="rounded-xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-zyon-orange text-white p-6 rounded-xl shadow-lg">
                <Anchor className="text-3xl mb-2" />
                <p className="text-sm font-semibold">Calidad Garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  data-testid={`service-${index}`}
                >
                  <div className="w-16 h-16 bg-zyon-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zyon-orange group-hover:text-white transition-colors">
                    <IconComponent className="text-zyon-orange text-2xl group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zyon-gray dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <a 
                    href="#" 
                    className="text-zyon-orange hover:text-zyon-orange-dark font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    Ver más <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boats Categories Section */}
      <section id="embarcaciones" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t('boats.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('boats.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Speedboats */}
            <div 
              className="group cursor-pointer" 
              data-testid="boat-category-speedboats"
              onClick={() => setLocation('/lanchas-rapidas')}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Speedboat racing through blue waters"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('boats.speedboats.title')}</h3>
                  <p className="text-sm opacity-90 mb-4">{t('boats.speedboats.description')}</p>
                  <div className="flex items-center text-zyon-orange font-semibold">
                    <span className="mr-2">Ver modelos</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Workboats */}
            <div 
              className="group cursor-pointer" 
              data-testid="boat-category-workboats"
              onClick={() => setLocation('/embarcaciones-trabajo')}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Professional work boat in harbor"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('boats.workboats.title')}</h3>
                  <p className="text-sm opacity-90 mb-4">{t('boats.workboats.description')}</p>
                  <div className="flex items-center text-zyon-orange font-semibold">
                    <span className="mr-2">Ver modelos</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pangas */}
            <div 
              className="group cursor-pointer" 
              data-testid="boat-category-pangas"
              onClick={() => setLocation('/pangas')}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Traditional panga boat on coastal waters"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('boats.panga.title')}</h3>
                  <p className="text-sm opacity-90 mb-4">{t('boats.panga.description')}</p>
                  <div className="flex items-center text-zyon-orange font-semibold">
                    <span className="mr-2">Ver modelos</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Button 
              onClick={() => setLocation('/embarcaciones-lanchas')}
              className="bg-zyon-orange hover:bg-zyon-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('boats.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t('gallery.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>

          <Gallery />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-zyon-bg dark:bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                {t('contact.form.title')}
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.name')} *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu nombre" 
                              {...field} 
                              data-testid="contact-name"
                              className="bg-white dark:bg-gray-800"
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
                          <FormLabel>{t('contact.form.email')} *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="tu@email.com" 
                              {...field} 
                              data-testid="contact-email"
                              className="bg-white dark:bg-gray-800"
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
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+34 600 000 000" 
                            {...field} 
                            data-testid="contact-phone"
                            className="bg-white dark:bg-gray-800"
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
                        <FormLabel>{t('contact.form.subject')} *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              data-testid="contact-subject"
                              className="bg-white dark:bg-gray-800"
                            >
                              <SelectValue placeholder="Selecciona un asunto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="venta">Consulta de venta</SelectItem>
                            <SelectItem value="mantenimiento">Servicio de mantenimiento</SelectItem>
                            <SelectItem value="financiacion">Información sobre financiación</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
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
                        <FormLabel>{t('contact.form.message')} *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Cuéntanos en qué podemos ayudarte..." 
                            {...field} 
                            data-testid="contact-message"
                            className="resize-none bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-zyon-orange hover:bg-zyon-orange-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                    disabled={contactMutation.isPending}
                    data-testid="contact-submit"
                  >
                    {contactMutation.isPending ? "Enviando..." : t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-zyon-gray dark:text-white">
                  {t('contact.info.title')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-zyon-orange text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                        {t('contact.info.address.title')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Puerto Deportivo de Vigo<br />
                        Muelle 3, Local 15<br />
                        36202 Vigo, Pontevedra
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-zyon-orange text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                        {t('contact.info.phone.title')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">+34 986 123 456</p>
                      <p className="text-gray-600 dark:text-gray-400">+34 600 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-zyon-orange text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                        {t('contact.info.email.title')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">info@zyongalicia.com</p>
                      <p className="text-gray-600 dark:text-gray-400">ventas@zyongalicia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-zyon-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-zyon-orange text-xl">🕒</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-zyon-gray dark:text-white mb-1">
                        {t('contact.info.hours.title')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Lunes - Viernes: 9:00 - 18:00<br />
                        Sábado: 9:00 - 14:00<br />
                        Domingo: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-zyon-gray dark:text-white mb-4">
                  {t('contact.social.title')}
                </h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-facebook"
                  >
                    <span>📘</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-instagram"
                  >
                    <span>📷</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-linkedin"
                  >
                    <span>💼</span>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-lg flex items-center justify-center transition-colors"
                    data-testid="social-youtube"
                  >
                    <span>📺</span>
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <h4 className="font-semibold text-zyon-gray dark:text-white mb-4">
                  Localización
                </h4>
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.8234567890123!2d-8.7267!3d42.2328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f621234567890%3A0x1234567890abcdef!2sPuerto%20Deportivo%20de%20Vigo%2C%20Vigo%2C%20Pontevedra%2C%20Spain!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
