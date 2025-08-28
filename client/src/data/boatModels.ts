// src/data/boatModels.ts
export interface BoatModel {
  id: number;
  name: {
    es: string;
    en: string;
    fr: string;
  };
  category: "speedboat" | "workboat" | "panga" | "rescue";
  purpose: {
    es: string;
    en: string;
    fr: string;
  };
  year: number;
  image: string;
  description: {
    es: string;
    en: string;
    fr: string;
  };
  features: {
    es: string[];
    en: string[];
    fr: string[];
  };
}

export const boatModels: BoatModel[] = [
  {
    id: 1,
    name: {
      es: "Zyon Speed 3000",
      en: "Zyon Speed 3000",
      fr: "Zyon Speed 3000"
    },
    category: "speedboat",
    purpose: {
      es: "Transporte rápido y recreación",
      en: "Fast transport and recreation",
      fr: "Transport rapide et récréation"
    },
    year: 2023,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: {
      es: "Lancha de alta velocidad con motor potente y diseño aerodinámico",
      en: "High-speed boat with powerful engine and aerodynamic design",
      fr: "Bateau à grande vitesse avec moteur puissant et design aérodynamique"
    },
    features: {
      es: ["Motor 300HP", "Capacidad 8 personas", "Velocidad máxima 60 nudos"],
      en: ["300HP Engine", "8 Person Capacity", "Maximum Speed 60 knots"],
      fr: ["Moteur 300CH", "Capacité 8 personnes", "Vitesse maximale 60 nœuds"]
    }
  },
  {
    id: 2,
    name: {
      es: "Zyon Work Pro 25",
      en: "Zyon Work Pro 25",
      fr: "Zyon Work Pro 25"
    },
    category: "workboat",
    purpose: {
      es: "Pesca comercial y transporte de carga",
      en: "Commercial fishing and cargo transport",
      fr: "Pêche commerciale et transport de marchandises"
    },
    year: 2022,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: {
      es: "Embarcación robusta diseñada para condiciones marítimas exigentes",
      en: "Robust vessel designed for demanding maritime conditions",
      fr: "Embarcation robuste conçue pour des conditions maritimes exigeantes"
    },
    features: {
      es: ["Casco reforzado", "Capacidad carga 2 toneladas", "Sistema de pesca integrado"],
      en: ["Reinforced hull", "2-ton cargo capacity", "Integrated fishing system"],
      fr: ["Coque renforcée", "Capacité de charge 2 tonnes", "Système de pêche intégré"]
    }
  },
  {
    id: 3,
    name: {
      es: "Zyon Panga Classic",
      en: "Zyon Panga Classic",
      fr: "Zyon Panga Classique"
    },
    category: "panga",
    purpose: {
      es: "Pesca costera y navegación tradicional",
      en: "Coastal fishing and traditional navigation",
      fr: "Pêche côtière et navigation traditionnelle"
    },
    year: 2023,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: {
      es: "Panga tradicional gallega con acabados modernos",
      en: "Traditional Galician panga with modern finishes",
      fr: "Panga traditionnelle galicienne avec finitions modernes"
    },
    features: {
      es: ["Madera de pino marítimo", "Motor 40HP", "Capacidad 4 personas"],
      en: ["Maritime pine wood", "40HP Engine", "4 Person Capacity"],
      fr: ["Bois de pin maritime", "Moteur 40CH", "Capacité 4 personnes"]
    }
  },
  {
    id: 4,
    name: {
      es: "Zyon Rescue 15",
      en: "Zyon Rescue 15",
      fr: "Zyon Rescue 15"
    },
    category: "rescue",
    purpose: {
      es: "Rescate marítimo y emergencias",
      en: "Maritime rescue and emergencies",
      fr: "Sauvetage maritime et urgences"
    },
    year: 2024,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: {
      es: "Bote de rescate rápido con equipos de emergencia",
      en: "Fast rescue boat with emergency equipment",
      fr: "Bateau de sauvetage rapide avec équipement d'urgence"
    },
    features: {
      es: ["Motor gemelo 200HP", "Sistema GPS avanzado", "Equipo de rescate incluido"],
      en: ["Twin 200HP Engine", "Advanced GPS System", "Rescue Equipment Included"],
      fr: ["Moteur jumeau 200CH", "Système GPS avancé", "Équipement de sauvetage inclus"]
    }
  }
];