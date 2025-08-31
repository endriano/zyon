import React from "react";

// Función base reutilizable
const highlightKeywordsBase = (
  text: string,
  mode: "hero" | "theme" = "theme",
) => {
  // Palabras a resaltar (case insensitive)
  const keywords = [
    "calidad",
    "quality",
    "experiencia",
    "excepcional",
    "experience",
    "exceptional",
    "qualité",
    "expérience",
    "exceptionnel",
    "Professionnels",
    "Profesionales",
    "Professional",
    "navigation",
    "sailing",
    "navegando",
    "15",
    "services",
    "servicios",
    "servicio",
    "service",
    "soluciones completas",
    "Amplio catálogo",
    "completos",
    "Consultoría especializada",
    "Gestión completa",
    "complete solutions",
    "Wide catalog",
    "Complete",
    "Specialized consultancy",
    "management",
    "Large catalogue",
    "complets",
    "Conseil spécialisé",
    "Gestion complète",
    "Galerie",
    "Gallery",
    "Galería",
    "Contacto",
    "Contact",
    "Contactez-nous",
    "Galicia",
  ];

  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part === "") return null;

    // Verificar si esta parte es keyword
    const isKeyword = keywords.some(
      (keyword) =>
        keyword.toLowerCase() ===
        part.toLowerCase().replace(/[.,;:!?()]/g, ""),
    );

    if (isKeyword) {
      return (
        <span key={index} className="text-zyon-orange font-bold">
          {part}
        </span>
      );
    } else {
      const textColorClass =
        mode === "hero"
          ? "text-white"
          : "text-zyon-gray dark:text-white";

      return (
        <span key={index} className={textColorClass}>
          {part}
        </span>
      );
    }
  });
};

// Funciones específicas
export const highlightKeywords = (text: string) => {
  return highlightKeywordsBase(text, "theme");
};

export const highlightKeywordsHero = (text: string) => {
  return highlightKeywordsBase(text, "hero");
};
