/**
 * Solaris Lux — Unified Product Data
 * Extracted from Solaris_Lux_Improved.pptx
 */

export const products = [
  {
    id: 1,
    name: "SmartCharge V1",
    model: "Série Titane",
    category: "CHARGING",
    price: 249,
    originalPrice: 299,
    trending: true,
    tagline: "L'énergie solaire dans votre poche.",
    description: "Le fer de lance de la gamme Solaris Lux. Une batterie externe solaire ultra-compacte avec recharge sans fil Qi 15W intégrée.",
    image_url: "/product-v1.png",
    thumbnails: ["/product-v1.png"],
    specs: [
      { label: "Puissance Qi", value: "15W Certifié" },
      { label: "Capacité", value: "10,000 mAh" },
      { label: "Solaire", value: "Panneau Monocristallin" },
      { label: "Ports", value: "USB-C Power Delivery" },
      { label: "Spécificité", value: "Dissipateur Ionique" }
    ],
    features: [
      "Charge sans fil magnétique",
      "Recharge solaire d'appoint",
      "Protection thermique intelligente",
      "Format ultra-fin 8mm"
    ]
  },
  {
    id: 2,
    name: "Câble Solaris Precision",
    model: "USB-C vers USB-C",
    category: "ACCESSORIES",
    price: 39,
    description: "Câble haute performance avec tressage en fibre d'aramide pour une durabilité extrême et une charge sans perte.",
    image_url: "/product-cable.png",
    thumbnails: ["/product-cable.png"],
    specs: [
      { label: "Longueur", value: "2.0 Mètres" },
      { label: "Débit", value: "480 Mbps" },
      { label: "Matériau", value: "Fibre d'Aramide" }
    ]
  },
  {
    id: 3,
    name: "Support Stasis",
    model: "Portrait & Paysage",
    category: "ACCESSORIES",
    price: 89,
    description: "Support minimaliste en aluminium aéronautique avec base nano-succion pour une stabilité parfaite sur toute surface.",
    image_url: "/product-stasis.png",
    thumbnails: ["/product-stasis.png"],
    specs: [
      { label: "Matériau", value: "Aluminium 6061" },
      { label: "Angle", value: "45° Fixe" },
      { label: "Base", value: "Nano-Succion" }
    ]
  },
  {
    id: 4,
    name: "Adaptateur PowerPulse",
    model: "GaN 45W",
    category: "ACCESSORIES",
    price: 79,
    description: "Chargeur mural ultra-compact utilisant la technologie GaN pour une efficacité énergétique maximale et une chauffe minimale.",
    image_url: "/product-gan.png",
    thumbnails: ["/product-gan.png"],
    specs: [
      { label: "Technologie", value: "GaN (Nitrure de Gallium)" },
      { label: "Puissance", value: "45W PD" },
      { label: "Ports", value: "USB-C x1" }
    ]
  },
  {
    id: 5,
    name: "Pack Complet Solaris",
    model: "Ultimate Bundle",
    category: "CHARGING",
    price: 399,
    originalPrice: 456,
    trending: false,
    description: "L'expérience Solaris Lux complète : SmartCharge V1 + Câble Precision + Support Stasis + Adaptateur GaN.",
    image_url: "/product-bundle.png",
    thumbnails: ["/product-bundle.png"],
    specs: [
      { label: "SmartCharge V1", value: "Inclus" },
      { label: "Accessoires", value: "Kit Complet" },
      { label: "Économie", value: "57 DH" }
    ]
  }
];
