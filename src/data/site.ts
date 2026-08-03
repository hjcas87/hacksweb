/**
 * Single source of truth for site content.
 * Keys/identifiers are English; user-facing copy is Spanish (es-AR).
 * Placeholder copy uses lorem-style filler until the client delivers final text.
 */

export const contact = {
  whatsapp: '5491127900030',
  whatsappDisplay: '+54 9 11 2790 0030',
  email: 'hello@hacks-digital.com',
  instagramStudio: 'https://instagram.com/hacksestudio_',
  linkedin: 'https://www.linkedin.com/company/hacks-digital/',
};

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Podhacks', href: '#podhacks' },
  { label: 'Estudio', href: '#estudio' },
];

/** Words that rotate in the hero headline. */
export const heroRotator = ['despegue', 'venda más', 'crezca', 'se destaque', 'facture'];

export const marqueeItems = [
  'Social Media',
  'Paid Media',
  'E-commerce',
  'E-mail Marketing',
  'Content Creation',
  'Branding',
  'Shootings',
];

export const stats = [
  { value: 6, suffix: '+', label: 'años en órbita' },
  { value: 200, suffix: '+', label: 'marcas acompañadas' },
  { value: 15, suffix: '', label: 'servicios activos' },
  { value: 100, suffix: '%', label: 'foco en resultados' },
];

export const monthlyServices = [
  {
    id: '01',
    title: 'Social Media Management',
    desc: 'Estrategia, contenido y comunidad. Tu marca activa, coherente y creciendo todos los días.',
  },
  {
    id: '02',
    title: 'E-commerce Management',
    desc: 'Tu tienda funcionando como máquina de vender: catálogo, conversión y experiencia.',
  },
  {
    id: '03',
    title: 'Paid Media Management',
    desc: 'Pauta que rinde. Inversión optimizada, reportes claros y ventas que se notan.',
  },
  {
    id: '04',
    title: 'E-mail Marketing',
    desc: 'Automatizaciones y campañas que fidelizan y vuelven a vender sobre tu base.',
  },
  {
    id: '05',
    title: 'Content Creation',
    desc: 'Piezas que frenan el scroll. Fotografía, video y diseño con identidad propia.',
  },
];

export const oneShotServices = [
  { id: '01', title: 'Refresh en Tiendanube' },
  { id: '02', title: 'Set up en Tiendanube' },
  { id: '03', title: 'Set up en WordPress' },
  { id: '04', title: 'Set up sitio a medida' },
  { id: '05', title: 'Re-branding' },
  { id: '06', title: 'Manual de marca' },
  { id: '07', title: 'Shooting digital' },
  { id: '08', title: 'Creación de contenido' },
  { id: '09', title: 'Producción y dirección de shootings' },
];

export const projects = [
  { client: 'Studio Calaf', service: 'Set up Tiendanube', tint: 'from-lila/45 to-space-3' },
  { client: 'Bling', service: 'Refresh Tiendanube', tint: 'from-yellow/40 to-space-3' },
  { client: 'TGM', service: 'Social Media', tint: 'from-yellow/35 to-lila/30' },
  { client: 'Enrique Gagliardi', service: 'Set up WordPress', tint: 'from-lila/40 to-yellow/25' },
  { client: 'Brasil', service: 'Producción y dirección', tint: 'from-space-3 to-lila/40' },
  { client: 'Tica', service: 'E-mail Marketing', tint: 'from-lila/50 to-yellow/30' },
  { client: 'Cambel', service: 'Social Media', tint: 'from-yellow/45 to-space-3' },
  { client: 'AAV', service: 'Paid Media', tint: 'from-space-3 to-yellow/35' },
  { client: 'BY', service: 'E-commerce', tint: 'from-lila/35 to-yellow/40' },
];

export const testimonials = [
  {
    quote:
      'Con HACKS me sentí súper acompañada y cómoda desde el minuto cero. Son CAPOS en lo que hacen: el acompañamiento en pauta es excelente y los resúmenes mensuales, impecables.',
    author: 'Flor',
    handle: '@bas_creative',
  },
  {
    quote:
      'Más allá de estar súper conforme con los resultados, destaco la responsabilidad y la excelente atención. Se nota que hay un equipo que sabe lo que hace. Anímense a delegar.',
    author: 'Agus',
    handle: '@minilike_egresaditos',
  },
  {
    quote:
      'Habían caído las ventas, decidimos reactivar redes y hacer publicidad digital, y nos está dando muy buen resultado. Están en todo lo que necesito. ¡Los recomiendo!',
    author: 'Alberto',
    handle: '@cambeleventos',
  },
  {
    quote:
      '6 años trabajando juntos y la marca creció un montón con HACKS. Asumieron el compromiso como si BY fuese de ellos. La organización y las propuestas comerciales, lo que más destaco.',
    author: 'Matías',
    handle: '@bylenceria',
  },
  {
    quote:
      'Trabajar con HACKS fue un antes y un después. Empezamos con el manual de marca y hoy seguimos en paid media: la mejora fue notable en todo. 100% recomendados.',
    author: 'Karen',
    handle: '@amoravosdenim',
  },
  {
    quote:
      'Destaco la calidad humana del equipo, la predisposición para escuchar y la rapidez para resolver. Buscan entender el negocio y acompañarnos con propuestas que aportan valor.',
    author: 'Celeste',
    handle: '@tica.sustentable',
  },
];

export const podcast = {
  title: 'Podhacks',
  desc: 'Nuestro podcast sobre marketing, marcas y todo lo que pasa en el universo HACKS. Charlas honestas para que tomes mejores decisiones para tu negocio.',
  youtube: 'https://www.youtube.com/@podhackss',
  spotify:
    'https://open.spotify.com/show/6piM7FMLnoWfSv2AOfR949?si=UmqrC1suTFeEIuUK5M5eYw',
  handle: '@podhacks_',
};

/** HACKS Estudio — the in-house content/photo studio. The section shows a
 *  peek of the space and links out to the Instagram profile. */
export const studio = {
  handle: '@hacksestudio_',
  url: 'https://www.instagram.com/hacksestudio_',
  title: 'Nuestro estudio',
  desc: 'Fotos, video y contenido con identidad propia. Tenemos estudio propio, equipado y listo para producir la próxima campaña de tu marca.',
  // Curated, web-optimized shots (raw HEIC lives in the gitignored client_images/).
  photos: [
    { src: '/images/studio-placa.jpg', alt: 'HACKS Estudio', span: true },
    { src: '/images/studio-01.jpg', alt: 'Set de fotografía del estudio HACKS' },
    { src: '/images/studio-02.jpg', alt: 'Iluminación y softboxes del estudio' },
    { src: '/images/studio-03.jpg', alt: 'Estudio HACKS con vista a la ciudad' },
  ],
};

/** Tiendanube "Partner Expert" certification — shown as a trust badge. */
export const partners = {
  tiendanube: {
    badge: '/images/tiendanube-expert.png',
    label: 'Tiendanube Partner Expert',
    url: 'https://www.tiendanube.com/partners',
  },
};
