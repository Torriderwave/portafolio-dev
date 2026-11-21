export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Seguridad / Tiempo real' | 'Web3 / Solana' | 'Negocios / POS' | 'Plataformas' | 'Herramientas' | 'Infraestructura';
  stack: string[];
  highlights: string[];
  featured?: boolean;
  /** Capturas reales en /public/projects/. Si hay, el proyecto se muestra como demo con marco. */
  shots?: { src: string; label: string }[];
  device?: 'browser' | 'phone';
  /** Lo que resolví / cómo lo pensé (una o dos frases). */
  note?: string;
  repo?: string;  // solo si el repo es público
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: 'gustello', name: 'Gustello',
    tagline: 'POS para restaurantes y cafeterías.',
    description: 'Mesas en vivo, caja, cocina, inventario y reportes, más app QR para el comensal.',
    category: 'Negocios / POS',
    stack: ['Fastify', 'TypeScript', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'TanStack Query', 'Zustand', 'Tailwind', 'Zod'],
    highlights: ['Plano de mesas en tiempo real', 'Roles: dueño, cajero, mesero y cocina', 'Contratos Zod compartidos front/back'],
    device: 'browser',
    shots: [
      { src: 'gustello-piso.webp', label: 'Piso (POS)' },
      { src: 'gustello-mesas.webp', label: 'Plano de mesas' },
      { src: 'gustello-catalogo.webp', label: 'Catálogo' },
    ],
    demo: 'https://torriderwave.github.io/demos/gustello/',
    note: 'Monorepo: una API y tres apps con tipos compartidos.',
  },
  {
    slug: 'havren', name: 'Havren',
    tagline: 'Gestión escolar con marca propia por colegio.',
    description: 'Cursos, notas, asistencia, pagos y mensajería, con paneles por rol.',
    category: 'Plataformas',
    stack: ['Next.js 14', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io', 'Docker'],
    highlights: ['Cinco roles, de administrador a padre', 'Marca blanca: tema, escudo y colores', 'Auditoría de cambios de notas'],
    device: 'browser',
    shots: [
      { src: 'havren-inicio.webp', label: 'Panel' },
      { src: 'havren-cursos.webp', label: 'Cursos' },
      { src: 'havren-usuarios.webp', label: 'Usuarios' },
      { src: 'havren-landing.webp', label: 'Landing' },
    ],
    demo: 'https://torriderwave.github.io/demos/havren/',
    note: 'Un mismo sistema para varios colegios; solo cambia la configuración.',
  },
  {
    slug: 'mconnect', name: 'MConnect', featured: true,
    tagline: 'Radio walkie-talkie y chat cifrado.',
    description: 'Radio en tiempo real y chat con mensajes efímeros. Cliente web y gateway propio.',
    category: 'Seguridad / Tiempo real',
    stack: ['Rust', 'axum', 'WebSocket', 'React', 'Vite', 'WASM', 'MLS'],
    highlights: ['Cripto propia: AEAD, Ed25519, KEM híbrido, MLS', 'Gateway en Rust: auth, relay WebSocket, TTL', 'Cliente web con CSP estricta y SRI'],
  },
  {
    slug: 'soma-staking', name: 'SOMA Staking', featured: true,
    tagline: 'Staking de NFTs Metaplex Core con rewards Token-2022.',
    description: 'Freeze escrowless y transfer hook, con programas on-chain sin Anchor.',
    category: 'Web3 / Solana',
    stack: ['Solana', 'Rust', 'Pinocchio', 'Next.js', 'Fastify', 'TypeScript', 'pnpm'],
    highlights: ['Programas en Pinocchio, sin Anchor', 'SDK propio: PDAs, encoders, discriminators', 'API que arma transacciones y cofirma'],
  },
  {
    slug: 'tcg-soma', name: 'Soma TCG', featured: true,
    tagline: 'TCG PvP con NFTs de Solana como rasgos.',
    description: 'Servidor en tiempo real, indexador on-chain y frontend web.',
    category: 'Web3 / Solana',
    stack: ['Next.js', 'Fastify', 'Colyseus', 'Drizzle', 'Postgres', 'Redis', 'Turborepo'],
    highlights: ['Servidor de partidas con Colyseus', 'Paquetes compartidos: game-core, contracts, db, ui', 'Indexer + worker para traits de NFTs'],
  },
  {
    slug: 'qwin', name: 'Qwin',
    tagline: 'Quinielas sobre Solana devnet.',
    description: 'Frontend, backend y programa on-chain.',
    category: 'Web3 / Solana',
    stack: ['Next.js 15', 'NestJS', 'Prisma', 'Pinocchio', 'Solana'],
    highlights: ['Tres capas: FE, BE y on-chain', 'Programa sin Anchor'],
  },
  {
    slug: 'entregas', name: 'Entregas', featured: true,
    tagline: 'Pedidos y entregas open source.',
    description: 'Tienda, panel de comercios y app de conductores, con avisos por WhatsApp.',
    category: 'Plataformas',
    stack: ['Node.js', 'SQLite', 'WhatsApp', 'GPS', 'Recurrente'],
    highlights: ['Tres roles: cliente, tienda, conductor', 'GPS de alta precisión', 'Avisos de estado por WhatsApp'],
  },
  {
    slug: 'punto-de-venta', name: 'Punto de venta',
    tagline: 'POS genérico: caja, inventario y reportes.',
    description: 'Ventas con pagos mixtos, anulaciones y reportes.',
    category: 'Negocios / POS',
    stack: ['Fastify', 'SQLite', 'React', 'Vite'],
    highlights: ['Dinero en centavos enteros', 'SQLite nativo de Node, sin dependencias nativas'],
  },
  {
    slug: 'shopcart', name: 'ShopCart',
    tagline: 'Ventas en línea (Tech Challenge).',
    description: 'SQL Server, API en Node/TypeScript y frontend React.',
    category: 'Plataformas',
    stack: ['SQL Server', 'Express', 'TypeScript', 'React'],
    highlights: ['9 módulos de punta a punta', '114 pruebas de integración en la API', '20 pruebas e2e en navegador'],
  },
  {
    slug: 'sistema-inventario', name: 'Sistema de inventario',
    tagline: 'Control de inventario web.',
    description: 'Next.js y Drizzle ORM.',
    category: 'Negocios / POS',
    stack: ['Next.js', 'Drizzle', 'Docker', 'pnpm'],
    highlights: ['Documento de arquitectura incluido'],
  },
  {
    slug: 'aetherreader', name: 'AetherReader',
    tagline: 'Lector de PDF con experiencia 3D.',
    description: 'Biblioteca, progreso, marcadores y escaneo de carpetas.',
    category: 'Herramientas',
    stack: ['React', 'Node.js', 'PostgreSQL', '3D', 'Docker'],
    highlights: ['Biblioteca y progreso de lectura', 'Escaneo de carpetas locales'],
  },
  {
    slug: 'md-reader', name: 'MD Reader',
    tagline: 'Lector de Markdown de escritorio.',
    description: 'App de escritorio con Tauri y React.',
    category: 'Herramientas',
    stack: ['Tauri', 'Rust', 'React', 'TypeScript', 'Vite'],
    highlights: ['App de escritorio ligera con Tauri'],
  },
  {
    slug: 'alyron-view', name: 'Alyron View',
    tagline: 'Observabilidad para un VPS.',
    description: 'Paneles de VPS, apps, deploys, alertas y logs.',
    category: 'Infraestructura',
    stack: ['Grafana', 'Prometheus', 'Loki', 'Alloy', 'Alertmanager', 'Caddy', 'Docker'],
    highlights: ['Métricas, logs y alertas unificadas', 'Checks externos con Blackbox'],
  },
  {
    slug: 'casino-online', name: 'Casino Online',
    tagline: 'Microservicios para un casino en línea.',
    description: 'Frontend Next.js con servicios de auth y jugador.',
    category: 'Plataformas',
    stack: ['Next.js', 'Node.js', 'JWT', 'PostgreSQL', 'Turborepo', 'Docker'],
    highlights: ['Servicios auth y player independientes', 'Frontend sin lógica de negocio'],
  },
  {
    slug: 'platform-eventos', name: 'Plataforma de eventos',
    tagline: 'Plataforma event-driven multi-tenant.',
    description: 'API, worker, dashboard y eventos validados por tipo y versión.',
    category: 'Plataformas',
    stack: ['Turborepo', 'pnpm', 'PostgreSQL', 'Valkey', 'Next.js', 'Zod'],
    highlights: ['Evento canónico con Zod versionado', 'Paquetes compartidos por scope'],
  },
];

export const profile = {
  name: 'Pablo',
  role: 'Desarrollador full stack',
  bio: 'Construyo aplicaciones web, sistemas de punto de venta, plataformas en Solana e infraestructura.',
  availability: 'Disponible para empleo y freelance',
  offers: [
    { t: 'Apps web completas', d: 'React/Next.js, Node y SQL.' },
    { t: 'Sistemas para negocios', d: 'POS, inventario, pedidos y entregas.' },
    { t: 'Backend y tiempo real', d: 'APIs, WebSockets y servicios en Node y Rust.' },
    { t: 'Web3 en Solana', d: 'Programas on-chain, SDKs y frontends.' },
  ],
  github: 'https://github.com/Torriderwave',
  email: '', // ← pon aquí tu correo y aparecerá el botón «Correo» (con asunto prellenado)
  motion: 'https://torriderwave.github.io/portafolio-motion/',
};
