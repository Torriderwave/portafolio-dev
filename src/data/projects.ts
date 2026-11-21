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
    tagline: 'Sistema POS para restaurantes y cafeterías.',
    description: 'Plataforma completa para operar un local: plano de mesas en vivo, caja, cocina, catálogo, inventario y reportes. Incluye una app para el comensal con QR, cuenta y pickup.',
    category: 'Negocios / POS',
    stack: ['Fastify', 'TypeScript', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'TanStack Query', 'Zustand', 'Tailwind', 'Zod'],
    highlights: ['Plano de mesas visual con estado en tiempo real', 'Flujo por rol: dueño, cajero, mesero y cocina', 'Contratos Zod compartidos entre frontend y backend', 'Panel de administración: catálogo, inventario, compras, auditoría'],
    device: 'browser',
    shots: [
      { src: 'gustello-piso.webp', label: 'Piso (POS)' },
      { src: 'gustello-mesas.webp', label: 'Plano de mesas' },
      { src: 'gustello-catalogo.webp', label: 'Catálogo' },
    ],
    demo: 'https://torriderwave.github.io/demos/gustello/',
    note: 'Monorepo modular: una API y tres apps (POS, administración y comensal) que comparten tipos y validaciones.',
  },
  {
    slug: 'havren', name: 'Havren',
    tagline: 'Plataforma de gestión escolar personalizable por colegio.',
    description: 'Gestión académica y administrativa para colegios: cursos, calificaciones, asistencia, horarios, pagos, citas y mensajería, con paneles según el rol. Cada colegio configura su nombre, escudo y paleta.',
    category: 'Plataformas',
    stack: ['Next.js 14', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io', 'Docker'],
    highlights: ['Cinco roles: administrador, director, maestro, estudiante y padre', 'Marca blanca: tema, escudo y colores editables', 'Auditoría y solicitudes de cambio de notas', 'Landing pública editable desde el panel'],
    device: 'browser',
    shots: [
      { src: 'havren-inicio.webp', label: 'Panel' },
      { src: 'havren-cursos.webp', label: 'Cursos' },
      { src: 'havren-usuarios.webp', label: 'Usuarios' },
      { src: 'havren-landing.webp', label: 'Landing' },
    ],
    demo: 'https://torriderwave.github.io/demos/havren/',
    note: 'Pensado como producto: el mismo sistema sirve a distintos colegios cambiando solo su configuración visual.',
  },
  {
    slug: 'mconnect', name: 'MConnect', featured: true,
    tagline: 'Radio walkie-talkie y chat cifrado en tiempo real.',
    description: 'Sistema cerrado de radio en tiempo real, chat cifrado con mensajes efímeros y ubicación familiar, vía túnel a un VPS. Cliente web y gateway propio.',
    category: 'Seguridad / Tiempo real',
    stack: ['Rust', 'axum', 'WebSocket', 'React', 'Vite', 'WASM', 'MLS'],
    highlights: ['Núcleo criptográfico propio (AEAD, Ed25519, KEM híbrido, grupos MLS)', 'Gateway en Rust con auth, relay WebSocket y almacén con TTL', 'Cliente web con CSP estricta y SRI'],
  },
  {
    slug: 'soma-staking', name: 'SOMA Staking', featured: true,
    tagline: 'Staking de NFTs Metaplex Core con rewards Token-2022.',
    description: 'Plataforma de staking de NFTs con freeze escrowless y rewards en Token-2022 con transfer hook. Programas on-chain escritos sin Anchor.',
    category: 'Web3 / Solana',
    stack: ['Solana', 'Rust', 'Pinocchio', 'Next.js', 'Fastify', 'TypeScript', 'pnpm'],
    highlights: ['Programas en Pinocchio (sin Anchor)', 'SDK propio: PDAs, encoders y discriminators', 'API que construye transacciones y cofirma delegación'],
  },
  {
    slug: 'tcg-soma', name: 'Soma TCG', featured: true,
    tagline: 'Juego de cartas PvP con NFTs de Solana como fuente de rasgos.',
    description: 'Monorepo de un TCG PvP off-chain: servidor de juego en tiempo real, indexador de datos on-chain y frontend web.',
    category: 'Web3 / Solana',
    stack: ['Next.js', 'Fastify', 'Colyseus', 'Drizzle', 'Postgres', 'Redis', 'Turborepo'],
    highlights: ['Servidor de partidas con Colyseus', 'Paquetes compartidos: game-core, contracts, db, ui', 'Indexer + worker para traits de NFTs'],
  },
  {
    slug: 'qwin', name: 'Qwin',
    tagline: 'App de quinielas con infraestructura on-chain.',
    description: 'App de quinielas mainstream sobre Solana devnet, con frontend, backend y programa on-chain.',
    category: 'Web3 / Solana',
    stack: ['Next.js 15', 'NestJS', 'Prisma', 'Pinocchio', 'Solana'],
    highlights: ['Tres capas: FE, BE y programa on-chain', 'Programa sin Anchor'],
  },
  {
    slug: 'entregas', name: 'Entregas', featured: true,
    tagline: 'Plataforma open source de pedidos y entregas.',
    description: 'Tienda para clientes, panel para comercios y app para conductores, con mensajería por WhatsApp y pago en efectivo o en línea.',
    category: 'Plataformas',
    stack: ['Node.js', 'SQLite', 'WhatsApp', 'GPS', 'Recurrente'],
    highlights: ['Tres roles: cliente, tienda y conductor', 'Ubicación GPS de alta precisión', 'Pedidos y avisos de estado por WhatsApp'],
  },
  {
    slug: 'punto-de-venta', name: 'Punto de venta',
    tagline: 'POS genérico: caja, inventario y reportes.',
    description: 'POS no atado a un rubro: catálogo, venta con pagos mixtos, caja, inventario, anulaciones y reportes.',
    category: 'Negocios / POS',
    stack: ['Fastify', 'SQLite', 'React', 'Vite'],
    highlights: ['Dinero en centavos enteros', 'SQLite nativo de Node, sin dependencias nativas', 'Pruebas del servidor'],
  },
  {
    slug: 'shopcart', name: 'ShopCart',
    tagline: 'Plataforma de ventas en línea (Tech Challenge).',
    description: 'Solución completa para un reto técnico Full Stack: base de datos SQL Server, API en Node/TypeScript y frontend React.',
    category: 'Plataformas',
    stack: ['SQL Server', 'Express', 'TypeScript', 'React'],
    highlights: ['9 módulos de punta a punta', '114 pruebas de integración en la API', '20 pruebas e2e en navegador'],
  },
  {
    slug: 'sistema-inventario', name: 'Sistema de inventario',
    tagline: 'Control de inventario web.',
    description: 'Aplicación de inventario con Next.js y Drizzle ORM.',
    category: 'Negocios / POS',
    stack: ['Next.js', 'Drizzle', 'Docker', 'pnpm'],
    highlights: ['Documento de arquitectura incluido'],
  },
  {
    slug: 'aetherreader', name: 'AetherReader',
    tagline: 'Lector de PDF con experiencia 3D.',
    description: 'Lector de PDF con biblioteca personal, progreso de lectura, marcadores y escaneo de carpetas locales. Incluye configuración para móvil.',
    category: 'Herramientas',
    stack: ['React', 'Node.js', 'PostgreSQL', '3D', 'Docker'],
    highlights: ['Biblioteca y progreso de lectura', 'Escaneo de carpetas locales'],
  },
  {
    slug: 'md-reader', name: 'MD Reader',
    tagline: 'Lector de Markdown de escritorio.',
    description: 'Aplicación de escritorio para leer Markdown, construida con Tauri y React.',
    category: 'Herramientas',
    stack: ['Tauri', 'Rust', 'React', 'TypeScript', 'Vite'],
    highlights: ['App de escritorio ligera con Tauri'],
  },
  {
    slug: 'alyron-view', name: 'Alyron View',
    tagline: 'Stack de observabilidad para un VPS.',
    description: 'Monitoreo con paneles ejecutivos de VPS, apps, deploys, alertas y logs.',
    category: 'Infraestructura',
    stack: ['Grafana', 'Prometheus', 'Loki', 'Alloy', 'Alertmanager', 'Caddy', 'Docker'],
    highlights: ['Métricas, logs y alertas unificadas', 'Checks externos con Blackbox'],
  },
  {
    slug: 'casino-online', name: 'Casino Online',
    tagline: 'Arquitectura de microservicios para un casino en línea.',
    description: 'Frontend en Next.js y servicios separados de autenticación y jugador (balance, perfil, depósitos).',
    category: 'Plataformas',
    stack: ['Next.js', 'Node.js', 'JWT', 'PostgreSQL', 'Turborepo', 'Docker'],
    highlights: ['Servicios auth y player independientes', 'Frontend sin lógica de negocio'],
  },
  {
    slug: 'platform-eventos', name: 'Plataforma de eventos',
    tagline: 'Plataforma event-driven multi-tenant.',
    description: 'Monorepo con API, worker, dashboard y esquemas de eventos validados por tipo y versión.',
    category: 'Plataformas',
    stack: ['Turborepo', 'pnpm', 'PostgreSQL', 'Valkey', 'Next.js', 'Zod'],
    highlights: ['Evento canónico con validación Zod versionada', 'Paquetes compartidos por scope'],
  },
];

export const profile = {
  name: 'Pablo',
  role: 'Desarrollador full stack',
  bio: 'Construyo aplicaciones web, sistemas de punto de venta, plataformas on-chain en Solana y herramientas de infraestructura.',
  availability: 'Disponible para empleo y proyectos freelance',
  offers: [
    { t: 'Aplicaciones web completas', d: 'Del modelo de datos a la interfaz: React/Next.js, Node y bases de datos SQL.' },
    { t: 'Sistemas para negocios', d: 'Puntos de venta, inventario, pedidos y entregas que se usan a diario.' },
    { t: 'Backend y tiempo real', d: 'APIs, WebSockets, colas y servicios en Node y Rust.' },
    { t: 'Web3 en Solana', d: 'Programas on-chain, SDKs y frontends para NFTs y tokens.' },
  ],
  github: 'https://github.com/Torriderwave',
  email: '', // agrega tu correo público si quieres mostrarlo
  motion: 'https://torriderwave.github.io/portafolio-motion/',
};
