# Portafolio de Desarrollo

Sitio estático con Astro + Tailwind, desplegado en GitHub Pages.

## Agregar o editar proyectos
Todo está en `src/data/projects.ts`. Para una captura, guarda la imagen en `public/projects/` y pon `image: 'archivo.png'`.
Pon `repo:` solo si el repositorio es público.

## Comandos
```bash
npm install
npm run dev      # http://localhost:4321/portafolio-dev
npm run build
```

Se publica solo al hacer push a `main` (Settings → Pages → Source: GitHub Actions).
