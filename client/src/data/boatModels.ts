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
  gallery: string[];
  description: {
    es: string;
    en: string;
    fr: string;
  };
  features: {
    icon: string;
    es: string[];
    en: string[];
    fr: string[];
  };
  specifications: {
    es: Record<string, string>;
    en: Record<string, string>;
    fr: Record<string, string>;
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
    gallery: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    description: {
      es: "Lancha de alta velocidad con motor potente y diseño aerodinámico",
      en: "High-speed boat with powerful engine and aerodynamic design",
      fr: "Bateau à grande vitesse avec moteur puissant et design aérodynamique"
    },
    features: {
      icon: "Gauge",
      es: ["Motor 300HP", "Capacidad 8 personas", "Velocidad máxima 60 nudos"],
      en: ["300HP Engine", "8 Person Capacity", "Maximum Speed 60 knots"],
      fr: ["Moteur 300CH", "Capacité 8 personnes", "Vitesse maximale 60 nœuds"]
    },
    specifications: {
      es: {
        "Longitud": "12 metros",
        "Ancho": "3.2 metros",
        "Calado": "0.8 metros",
        "Peso": "2,800 kg",
        "Combustible": "Tanque de 400 litros",
        "Color": "Blanco perlado"
      },
      en: {
        "Length": "12 meters",
        "Width": "3.2 meters",
        "Draft": "0.8 meters",
        "Weight": "2,800 kg",
        "Fuel": "400-liter tank",
        "Color": "Pearl white"
      },
      fr: {
        "Longueur": "12 mètres",
        "Largeur": "3,2 mètres",
        "Tirant d'eau": "0,8 mètre",
        "Poids": "2 800 kg",
        "Carburant": "Réservoir de 400 litres",
        "Couleur": "Blanc nacré"
      }
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
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    description: {
      es: "Embarcación robusta diseñada para condiciones marítimas exigentes",
      en: "Robust vessel designed for demanding maritime conditions",
      fr: "Embarcation robuste conçue pour des conditions maritimes exigeantes"
    },
    features: {
      icon: "Anchor",
      es: ["Casco reforzado", "Capacidad carga 2 toneladas", "Sistema de pesca integrado"],
      en: ["Reinforced hull", "2-ton cargo capacity", "Integrated fishing system"],
      fr: ["Coque renforcée", "Capacité de charge 2 tonnes", "Système de pêche intégré"]
    },
    specifications: {
      es: {
        "Longitud": "15 metros",
        "Ancho": "4.5 metros",
        "Calado": "1.2 metros",
        "Peso": "5,200 kg",
        "Combustible": "Tanque de 600 litros",
        "Material": "Acero inoxidable"
      },
      en: {
        "Length": "15 meters",
        "Width": "4.5 meters",
        "Draft": "1.2 meters",
        "Weight": "5,200 kg",
        "Fuel": "600-liter tank",
        "Material": "Stainless steel"
      },
      fr: {
        "Longueur": "15 mètres",
        "Largeur": "4,5 mètres",
        "Tirant d'eau": "1,2 mètre",
        "Poids": "5 200 kg",
        "Carburant": "Réservoir de 600 litres",
        "Matériau": "Acier inoxydable"
      }
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
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    description: {
      es: "Panga tradicional gallega con acabados modernos",
      en: "Traditional Galician panga with modern finishes",
      fr: "Panga traditionnelle galicienne avec finitions modernes"
    },
    features: {
      icon: "Ship",
      es: ["Madera de pino marítimo", "Motor 40HP", "Capacidad 4 personas"],
      en: ["Maritime pine wood", "40HP Engine", "4 Person Capacity"],
      fr: ["Bois de pin maritime", "Moteur 40CH", "Capacité 4 personnes"]
    },
    specifications: {
      es: {
        "Longitud": "6.5 metros",
        "Ancho": "2.2 metros",
        "Calado": "0.4 metros",
        "Peso": "450 kg",
        "Combustible": "Tanque de 50 litros",
        "Color": "Natural con barniz"
      },
      en: {
        "Length": "6.5 meters",
        "Width": "2.2 meters",
        "Draft": "0.4 meters",
        "Weight": "450 kg",
        "Fuel": "50-liter tank",
        "Color": "Natural with varnish"
      },
      fr: {
        "Longueur": "6,5 mètres",
        "Largeur": "2,2 mètres",
        "Tirant d'eau": "0,4 mètre",
        "Poids": "450 kg",
        "Carburant": "Réservoir de 50 litres",
        "Couleur": "Naturel avec vernis"
      }
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
    gallery: [
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    description: {
      es: "Bote de rescate rápido con equipos de emergencia",
      en: "Fast rescue boat with emergency equipment",
      fr: "Bateau de sauvetage rapide avec équipement d'urgence"
    },
    features: {
      icon: "LifeBuoy",
      es: ["Motor gemelo 200HP", "Sistema GPS avanzado", "Equipo de rescate incluido"],
      en: ["Twin 200HP Engine", "Advanced GPS System", "Rescue Equipment Included"],
      fr: ["Moteur jumeau 200CH", "Système GPS avancé", "Équipement de sauvetage inclus"]
    },
    specifications: {
      es: {
        "Longitud": "8 metros",
        "Ancho": "2.8 metros",
        "Calado": "0.6 metros",
        "Peso": "1,200 kg",
        "Combustible": "Tanque de 200 litros",
        "Color": "Rojo de seguridad"
      },
      en: {
        "Length": "8 meters",
        "Width": "2.8 meters",
        "Draft": "0.6 meters",
        "Weight": "1,200 kg",
        "Fuel": "200-liter tank",
        "Color": "Safety red"
      },
      fr: {
        "Longueur": "8 mètres",
        "Largeur": "2,8 mètres",
        "Tirant d'eau": "0,6 mètre",
        "Poids": "1 200 kg",
        "Carburant": "Réservoir de 200 litres",
        "Couleur": "Rouge de sécurité"
      }
    }
  }
];