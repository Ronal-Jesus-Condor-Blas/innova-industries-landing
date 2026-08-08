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

## Variables del formulario

Configura en Vercel las variables documentadas en `.env.example`. El formulario usa Resend para los correos y Upstash Redis para limitar cada dirección de correo a un máximo total de 2 consultas exitosas. `CONTACT_RATE_LIMIT_SECRET` debe ser un valor aleatorio largo y privado; se usa para convertir el correo en un identificador HMAC antes de guardarlo en Redis.

1. Agrega Upstash Redis al proyecto desde Vercel Marketplace; la integración crea `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.
2. Crea `CONTACT_RATE_LIMIT_SECRET` con al menos 32 caracteres (por ejemplo, `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) y guárdalo en Vercel para Production, Preview y Development.
3. Vuelve a desplegar el proyecto.

Si Redis o el secreto no están disponibles, el formulario continúa funcionando con un contador en memoria por instancia. Este respaldo evita interrumpir el contacto, pero la garantía estricta del límite entre todas las instancias de Vercel requiere conectar Upstash Redis.
