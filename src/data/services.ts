export type Service = {
  slug: string;
  name: string;
  description: string;
  imageId: string; // 👈 referencia al id del JSON
};

export const services = [
  {
    slug: "examen-de-sangre-viva",
    name: "Examen de Sangre Viva",
    description: "Análisis profundo para un diagnóstico preventivo.",
    imageId: "service-blood-test",
  },
  {
    slug: "fisioterapia-y-terapia-vital",
    name: "Fisioterapia y Terapia Vital",
    description: "Restauración integral que combina técnicas tradicionales y naturales.",
    imageId: "service-physiotherapy",
  },
  {
    slug: "hidroterapia",
    name: "Hidroterapia",
    description: "El poder curativo del agua para estimular la circulación y eliminar toxinas.",
    imageId: "service-hydrotherapy",
  },
  {
    slug: "medicina-biologica",
    name: "Medicina Biológica",
    description: "Terapias biológicas para la restauración de la salud.",
    imageId: "service-biological-medicine",
  },
  {
    slug: "consultas-nutricionales",
    name: "Consultas Nutricionales",
    description: "Planes de alimentación personalizados para tus objetivos.",
    imageId: "service-nutrition",
  },
  {
    slug: "alimentacion-terapeutica",
    name: "Alimentación Terapéutica",
    description: "Platos veganos equilibrados con ingredientes frescos y naturales.",
    imageId: "service-herbalism",
  },
  {
    slug: "medicamentos-naturales",
    name: "Medicamentos Naturales",
    description: "Productos 100% naturales, desde hierbas hasta fórmulas personalizadas.",
    imageId: "service-natural-meds",
  },
  {
    slug: "terapias-intravenosas",
    name: "Terapias Intravenosas",
    description: "Nutrientes y vitaminas administrados directamente para una absorción completa.",
    imageId: "service-iv-therapy",
  },
];
