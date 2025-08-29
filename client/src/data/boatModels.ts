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
  }
];