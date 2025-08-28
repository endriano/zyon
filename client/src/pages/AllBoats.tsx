import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { boatModels } from "@/data";
import {
  highlightKeywords,
  highlightKeywordsHero,
} from "@/lib/highlightKeywords";

export default function AllBoats() {
  const { t, currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = () => {
    setLocation("/");
  };

  // Función para obtener texto en el idioma actual
  const getText = (textObj: { es: string; en: string; fr: string }) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.es;
  };

  // Categorías para el filtro
  const categories = [
    {
      id: "all",
      name: t("allBoats.categories.all"),
      count: boatModels.length,
    },
    {
      id: "speedboat",
      name: t("allBoats.speedboats.title"),
      count: boatModels.filter((b) => b.category === "speedboat").length,
    },
    {
      id: "workboat",
      name: t("allBoats.workboats.title"),
      count: boatModels.filter((b) => b.category === "workboat").length,
    },
    {
      id: "panga",
      name: t("allBoats.panga.title"),
      count: boatModels.filter((b) => b.category === "panga").length,
    },
    {
      id: "rescue",
      name: t("allBoats.rescue.title"),
      count: boatModels.filter((b) => b.category === "rescue").length,
    },
  ];

  // Filtrar modelos según la categoría seleccionada
  const filteredModels =
    selectedCategory === "all"
      ? boatModels
      : boatModels.filter((model) => model.category === selectedCategory);

  // Función para hacer scroll a la sección de contacto
  const scrollToContact = () => {
    setLocation("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.section
        className="py-20 bg-zyon-bg dark:bg-gray-900"
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

          <motion.div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zyon-gray dark:text-white">
              {t("allBoats.title").split(" ")[0]}{" "}
              <span className="text-zyon-orange">
                {t("allBoats.title").split(" ")[1]}
              </span>
            </h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t("allBoats.explore")}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Filter Section */}
      <motion.section
        className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-zyon-gray dark:text-white">
            {t("allBoats.filter")}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-zyon-orange text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-zyon-orange/20 hover:text-zyon-orange"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* All Products Grid Section con animaciones */}
      <motion.section
        className="py-20 bg-zyon-bg dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-zyon-gray dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {highlightKeywords(t("allBoats.models"))}{" "}
            {selectedCategory !== "all" && (
              <span className="text-zyon-orange">
                - {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
          </motion.h2>

          {/* Grid con animaciones escalonadas */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            viewport={{ once: true }}
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                data-testid={`boat-model-${model.id}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setLocation(`/embarcacion/${model.id}`)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={model.image}
                    alt={`${getText(model.name)} - ${getText(model.description)}`}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-zyon-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                    {model.year}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-1 text-zyon-gray dark:text-white">
                  {getText(model.name)}
                </h3>

                <p className="text-sm text-zyon-orange font-medium mb-2">
                  {categories.find((c) => c.id === model.category)?.name}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {getText(model.description)}
                </p>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t("allBoats.purpose")}:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getText(model.purpose)}
                  </p>
                </div>

                <motion.button
                  className="w-full flex items-center justify-center px-4 py-2 bg-zyon-orange hover:bg-zyon-orange-dark text-white rounded-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("allBoats.details")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {filteredModels.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t("allBoats.noModels")}
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                variant="outline"
                className="mt-4 border-zyon-orange text-zyon-orange hover:bg-zyon-orange hover:text-white"
              >
                {t("allBoats.viewAll")}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section con animaciones */}
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
            {t("allBoats.notFound")}
          </motion.h2>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("allBoats.contactHelp")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={scrollToContact}
              className="border-2 border-white text-white hover:bg-white hover:text-zyon-orange px-8 py-3 text-lg transition-all duration-300 rounded-md"
              data-testid="contact-cta"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("allBoats.contactNow")}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
