import { useEffect } from "react";
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

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Button 
            onClick={goBack}
            variant="outline"
            className="mb-6 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              Sobre Zyon Galicia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Más de 20 años de experiencia en el sector náutico gallego nos avalan como 
              especialistas en embarcaciones profesionales de la más alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zyon-gray dark:text-white">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Fundada en Galicia con la pasión por el mar, Zyon Galicia nació de la visión 
                  de ofrecer embarcaciones profesionales que combinaran tradición, innovación y calidad excepcional.
                </p>
                <p>
                  Durante más de dos décadas, hemos trabajado estrechamente con pescadores, 
                  profesionales marítimos y entusiastas del mar para desarrollar soluciones 
                  náuticas que superen las expectativas más exigentes.
                </p>
                <p>
                  Cada embarcación que sale de nuestros talleres lleva consigo el compromiso 
                  con la excelencia y la durabilidad que ha caracterizado a Zyon Galicia 
                  desde sus inicios.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Historia de Zyon Galicia - Más de 20 años construyendo embarcaciones profesionales de calidad en el sector náutico gallego"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-zyon-orange text-white p-6 rounded-xl shadow-lg">
                <Ship className="text-3xl mb-2" />
                <p className="text-sm font-semibold">Tradición Naval</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-zyon-bg dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada embarcación que creamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Calidad Excepcional</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Utilizamos solo los mejores materiales y técnicas de construcción para garantizar 
                embarcaciones duraderas y confiables.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Servicio Personalizado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cada cliente es único. Trabajamos de cerca con nuestros clientes para 
                entender sus necesidades específicas.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Compromiso Total</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nuestro compromiso no termina con la entrega. Ofrecemos soporte continuo 
                y mantenimiento profesional.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Innovación Constante</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Combinamos técnicas tradicionales con las últimas innovaciones 
                para crear embarcaciones de vanguardia.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Puntualidad</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Respetamos los plazos acordados y entregamos en tiempo y forma, 
                cumpliendo siempre nuestros compromisos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-zyon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LifeBuoy className="w-8 h-8 text-zyon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zyon-gray dark:text-white">Soporte Integral</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ofrecemos asesoramiento completo desde el diseño hasta el mantenimiento, 
                con un equipo experto siempre disponible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zyon-gray dark:text-white">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Profesionales apasionados por el mar y comprometidos con la excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-zyon-orange to-zyon-orange-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">ZG</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-zyon-gray dark:text-white">Equipo de Diseño</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Especialistas en Ingeniería Naval</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Más de 15 años creando diseños innovadores que combinan funcionalidad y estética.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-zyon-orange to-zyon-orange-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zyon-gray dark:text-white">Equipo Técnico</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Maestros Constructores</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Artesanos especializados en construcción naval con técnicas tradicionales y modernas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-zyon-orange to-zyon-orange-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zyon-gray dark:text-white">Atención al Cliente</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Servicio Personalizado</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dedicados a brindar el mejor servicio y asesoramiento personalizado a cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zyon-orange">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para conocer nuestras embarcaciones?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre por qué Zyon Galicia es la elección preferida de profesionales del mar en Galicia.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => setLocation('/embarcaciones-lanchas')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg"
              data-testid="boats-cta"
            >
              Ver Embarcaciones
            </Button>
            <Button 
              onClick={goBack}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg"
              data-testid="contact-cta"
            >
              Contactar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}