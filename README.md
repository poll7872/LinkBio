# Linkbio

Proyecto full‑stack tipo Linktree para crear una página pública con tus enlaces y administrarlos desde un panel. Incluye registro/login, edición de perfil, carga de imagen, selección y ordenamiento de enlaces sociales.

## Features
- Registro y login con JWT.
- Perfil público por `handle` con listado de enlaces.
- Panel de administración para editar perfil y enlaces.
- Carga de imagen de perfil (Cloudinary).
- Activar/desactivar enlaces y ordenarlos con drag & drop.
- Búsqueda de disponibilidad de `handle`.

## Stack
**Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT, bcrypt, express-validator
- Cloudinary + formidable

**Frontend**
- React + TypeScript + Vite
- React Router
- React Query
- Tailwind CSS
- dnd-kit

## Arquitectura
Monorepo con dos apps:
- `backend/`: API REST y lógica de negocio.
- `frontend/`: SPA para el panel y el sitio público.

La SPA consume la API mediante Axios y maneja autenticación con token en `localStorage`.

## Requisitos
- Node.js 18+ (recomendado)
- MongoDB (local o remoto)
- Cuenta de Cloudinary (para subida de imágenes)

## Variables de entorno
Crea un archivo `.env` en `backend/`:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/linkbio
JWT_SECRET=tu_secreto_jwt
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Crea un archivo `.env` en `frontend/`:
```env
VITE_API_URL=http://localhost:4000
```

## Instalación
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Scripts útiles
**Backend** (`backend/`)
- `npm run dev`: servidor en modo desarrollo con nodemon.
- `npm run dev:api`: habilita CORS sin `FRONTEND_URL` (ver `--api`).
- `npm run build`: compila TypeScript a `dist/`.
- `npm start`: ejecuta el build.

**Frontend** (`frontend/`)
- `npm run dev`: servidor de desarrollo Vite.
- `npm run build`: build de producción.
- `npm run preview`: previsualizar build.
- `npm run lint`: linting.

## Endpoints principales
Base URL: `http://localhost:4000`

- `POST /auth/register` registrar usuario.
- `POST /auth/login` login y obtención de token.
- `GET /user` obtener perfil (auth).
- `PUT /user` actualizar perfil y links (auth).
- `POST /user/image` subir imagen de perfil (auth).
- `GET /:handle` obtener perfil público por handle.
- `POST /search` validar disponibilidad de handle.

## Estructura del proyecto
```
LinkBio/
  backend/
    src/
      config/
      handlers/
      middleware/
      models/
      utils/
      index.ts
      router.ts
      server.ts
  frontend/
    src/
      api/
      components/
      data/
      layouts/
      views/
      router.tsx
```

## Notas
- La autorización usa `Bearer <token>` en el header `Authorization`.
- `links` se guarda como JSON string en el documento de usuario.
- En modo `dev:api` se permite CORS sin origen para pruebas con herramientas externas.

## Autor
Edward Ojeda
