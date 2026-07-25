# INNOVA INDUSTRIES AMERICA SAC Landing Page

Landing page corporativa desarrollada con Next.js, TypeScript, Tailwind CSS y shadcn/ui.

## Ejecutar localmente

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Abre `http://localhost:3000`.

## Validar producción

```bash
pnpm lint
pnpm build
```

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel, crea un nuevo proyecto e importa el repositorio.
3. Mantén la configuración por defecto para Next.js. Vercel detectará pnpm mediante `pnpm-lock.yaml`.
4. Ejecuta el deploy.

El formulario está preparado visualmente para conectarse luego a Formspree, Resend, Netlify Forms o una API propia.
