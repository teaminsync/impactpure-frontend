# IMPACTPURE Storefront (`impactpure-frontend`)

Customer-facing website for [www.impactpure.com](https://www.impactpure.com): product showcase with an interactive 3D model, accounts with phone OTP, cart, checkout (cash on delivery or Razorpay), order history, contact form and newsletter.

- **Stack:** Next.js 14.2.35 (App Router), React 18, TypeScript, Tailwind CSS 3, Framer Motion, Three.js via React Three Fiber, Axios, React-Toastify.
- **Client-side app:** no API routes and no middleware. All data comes from the IMPACTPURE API (`impactpure-backend`). Design notes are in [ARCHITECTURE.md](./ARCHITECTURE.md).
- **Package manager:** pnpm (`pnpm-lock.yaml`). `.npmrc` sets `auto-install-peers=false`; keep it, otherwise pnpm installs optional React Native/Expo peers of `@react-three/fiber`.

## Quick start

```powershell
pnpm install
Copy-Item .env.example .env.local     # set the three NEXT_PUBLIC_ values
pnpm dev                               # http://localhost:3000
```

Production-style check: `pnpm build` then `pnpm start` (serves on port 3000).

Use a backend you can safely write to while testing checkout. Registering, adding to cart and placing orders are real writes. The API accepts browser calls from `http://localhost:3000` only if that origin is in the backend's `CORS_ORIGINS` (it is in production's list).

## Scripts

| Script | Command | Use |
|---|---|---|
| `pnpm dev` | `next dev` | Development server |
| `pnpm build` | `next build` | Production build (about 14 pages) |
| `pnpm start` | `next start` | Serve the production build |
| `pnpm lint` | `next lint` | ESLint (skipped during builds) |

Type-checking is not enforced during the build (`typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` are on in `next.config.mjs`). `pnpm exec tsc --noEmit` currently reports 15 errors that exist in untouched code: Three.js JSX typings in `components/hero/HeroModel.tsx` and file-name casing duplicates (`button.tsx` / `Button.tsx`, `input.tsx` / `Input.tsx`) in unused UI components.

## Environment variables

All are public and embedded in the browser bundle at build time, so a change needs a rebuild/redeploy. Never put secrets here.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the API, no trailing slash |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay **publishable** key id for Checkout (live key in production) |
| `NEXT_PUBLIC_SHEETS` | Google Apps Script web-app URL that receives the contact form |

## Routes

| Path | Page |
|---|---|
| `/` | Hero with 3D model, features, latest products, banners, testimonials, newsletter |
| `/product/[productId]` | Product detail, Add to Cart, Buy Now |
| `/login` | Login, sign up with OTP, forgot password |
| `/cart` | Cart |
| `/place-order` | Checkout |
| `/orders` | Order history |
| `/about`, `/contact` | Company pages; contact form posts to Google Sheets |
| `/privacypolicy`, `/termsandconditions`, `/shippinganddelivery`, `/cancellationsandrefunds` | Legal pages |

## Project layout

```
app/                  routes (page.tsx + a *Content.tsx client component per page)
components/           common (Navbar, Footer), sections (home page blocks), hero (3D model),
                      animations, ui (UI primitives; many are unused)
contexts/ShopContext.tsx   global state: products, cart, token
hooks/                use-navigation, use-toast, use-mobile
lib/                  constants (API paths, config), utils, apiMessage (error/payment helpers),
                      animation, mockData (static testimonials)
types/                shared TypeScript types
public/               favicon and the two 3D models (Impactpure.glb, "all seprate.glb")
styles/globals.css    Tailwind layers and theme variables
```

## Dependencies

| Group | Packages (ranges) |
|---|---|
| Framework | next 14.2.35, react and react-dom ^18.3.1 |
| HTTP, feedback | axios ^1.21.0, react-toastify (latest), sonner (latest) |
| 3D | three ^0.173.0, @react-three/fiber ^8.2.2, @react-three/drei ^9.121.4, framer-motion-3d ^12.4.1, @types/three |
| Motion and scroll | framer-motion ^11.15.0, gsap (latest), lenis (latest), react-intersection-observer |
| Styling | tailwindcss ^3.4.17 (dev), postcss, autoprefixer, tailwind-merge, clsx, class-variance-authority, tailwindcss-animate, next-themes, lucide-react |
| UI primitives | 27 `@radix-ui/*` packages, cmdk, vaul, embla-carousel-react, input-otp, react-day-picker, react-hook-form, @hookform/resolvers, zod, recharts, date-fns, react-resizable-panels |
| Tooling (dev) | typescript ^5, @types/node, @types/react, @types/react-dom |

Versions are fixed by `pnpm-lock.yaml`. Most "UI primitives" packages are used only by `components/ui/*` files that no page imports.

`pnpm audit` currently reports 58 unique advisories: 29 in Next.js 14 and the rest in build tooling (tailwindcss, postcss, autoprefixer) and a few transitive packages.

## Deployment

- Vercel project `impactpure`, branch `main`, Node 22.x, pnpm. Domains: `impactpure.com`, `www.impactpure.com`, `impactpure.vercel.app`.
- Every push to `main` deploys to production. There is no staging environment. A failed build does not replace the live deployment.
- Third-party scripts loaded at runtime: GSAP and ScrollTrigger from cdnjs (before interactive) and Razorpay Checkout from `checkout.razorpay.com` (lazy).

## Known limitations and planned work

- The cart "+" button stops at 10 units, but still shows "Cart updated successfully!" when pressed at 10.
- Debug `console.log` lines remain in the 3D hero component and product page.
- The JWT is kept in `localStorage`.
- Next.js 14 has open security advisories; migrating to a patched Next.js release needs a React 19 and React Three Fiber 9 migration.
- Unused UI primitives and their packages can be removed.
