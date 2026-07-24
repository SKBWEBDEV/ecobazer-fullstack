# EcoBazer — Frontend

A production-ready e-commerce frontend built with React, Vite, and Tailwind CSS. This is **frontend only** — it expects your existing Node.js + Express + MongoDB backend to be running and reachable.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM v6
- Axios (with JWT interceptor)
- React Hook Form
- Context API (Auth + Cart)
- react-hot-toast for notifications
- lucide-react icons

## Getting started

```bash
npm install
cp .env.example .env   # edit VITE_API_URL if your backend runs elsewhere
npm run dev
```

The app expects your backend at the URL in `VITE_API_URL` (defaults to `http://localhost:5000`).

## Build

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  components/   Reusable UI (Navbar, Footer, ProductCard, Button, Input, Modal, Loader, Toast)
  pages/        Route-level pages, including pages/admin for the admin panel
  layouts/      MainLayout (storefront) and AdminLayout (dashboard shell)
  context/      AuthContext and CartContext (Context API state)
  hooks/        useAuth, useCart
  services/     Axios instance + one service file per API domain
  utils/        formatPrice, getErrorMessage
  routes/       ProtectedRoute, AdminRoute guards
```

## API endpoints expected on the backend

- `POST /register`, `POST /login`
- `POST /verify-email/:token`
- `POST /forgot-password`, `POST /reset-password/:token`
- `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`
- `POST /cart`, `POST /cart/update/:id`, `GET /cart/:userId`, `DELETE /cart/:id`
- `POST /payment`
- `GET /users`, `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id`

## Notes

- JWT is stored in `localStorage` under `ecobazer_token`; the logged-in user (`id`, `email`, `role`) under `ecobazer_user`.
- A `401` response from any request automatically clears the session and redirects to `/login`.
- The admin panel (`/admin`, `/admin/products`, `/admin/users`) is gated by `role: "admin"` on the logged-in user.
- All API response shapes are read defensively (e.g. `data.products || data`) since exact backend response envelopes can vary — adjust the small number of `data?.x || data` lines in the service-consuming pages if your backend's response shape differs.
