# Storefront architecture

## 1. Overview

A Next.js App Router site used as a client-side application. Every page is a thin server component (`page.tsx`) that renders a `"use client"` component (`*Content.tsx`). Data is fetched in the browser with Axios from the IMPACTPURE API; Next.js serves static pages and one dynamic route (`/product/[productId]`).

```
 Browser ── Next.js pages (React 18)
   │  ShopContext (products, cart, token)
   ├── Axios ─────────► impactpure-backend  (/api/user, /product, /cart, /order, /newsletter)
   ├── Razorpay Checkout (checkout.razorpay.com) ─► payment; result confirmed through the API
   ├── fetch (no-cors) ─► Google Apps Script (contact form → Google Sheets)
   └── GSAP (cdnjs), 3D models from /public
```

## 2. Page composition

`app/layout.tsx` wraps every page, outermost first:

`ShopContextProvider` → `ScrollRestoration` (scroll to top on route change) → `SmoothScroll` (Lenis, loaded dynamically) → `Cursor` → `Navbar` → `PageTransition` (Framer Motion) → `<main>` → `Footer` → `ToastContainer` (React-Toastify, top-right, 3 s).

The root layout also sets metadata (title, description, Open Graph), the Outfit font, and loads two external scripts: GSAP/ScrollTrigger (cdnjs, `beforeInteractive`) and Razorpay Checkout (`lazyOnload`).

Home (`app/page.tsx`) stacks `Hero`, `Features`, `LatestProducts` (first 8 products from context), `PremiumBanners`, `Testimonials` (static data in `lib/mockData.ts`) and `Newsletter`.

## 3. State management

One React context, `ShopContext`, holds all shared state; there is no external state library.

| State | Source | Notes |
|---|---|---|
| `products` | `GET /api/product/list` on mount | Reversed so newest is first |
| `token` | `localStorage["token"]`, set after login or registration | Cleared on logout or expiry |
| `cartItems` | `POST /api/cart/get` when a token exists | `{ productId: quantity }` |
| `search`, `showSearch` | local | Search UI state |

Cart operations (`addToCart`, `updateQuantity`, `removeFromCart`) are **optimistic**: the local state changes first, then the API is called; on failure the previous value is restored and the server's message is shown. A 401 or a "Session expired" message triggers `handleExpiredToken`: toast, clear the stored token and cart, go to `/login`. Adding to the cart without a token redirects to `/login`.

`getCartAmount` sums `price × quantity` over products present in the catalogue; delivery is the constant `₹249` (`lib/constants.ts`), mirroring the server. The server recomputes every total.

## 4. Authentication flows (`app/login`)

- **Sign up:** phone number (formatted as `+91 ##########`) → `POST /api/user/send-otp` (resend timer 60 s) → `verify-otp` returns a `verificationToken` → `POST /api/user/register` with name, email, password (hint: at least 10 characters), phone and that token. The form refuses to submit until the OTP is verified.
- **Login:** `POST /api/user/login` with `identifier` (email or phone) and password.
- **Forgot password:** OTP verification, then `POST /api/user/reset-password`.
- On success the JWT is saved in `localStorage["token"]` and in context. The navbar loads `GET /api/user/profile` for the account dropdown. Logout removes the token and clears the cart state.
- Server messages (including rate-limit messages) are shown directly from `error.response.data.message`.

## 5. Checkout and payment (`app/place-order`)

1. The customer fills the address form (country defaults to India) and chooses COD or Razorpay. Items sent are only cart lines with quantity above 0 whose product still exists; an empty cart stops early.
2. **COD:** `POST /api/order/place` with `{ address, items, amount }` → on success clear the cart and open `/orders`.
3. **Razorpay:** `POST /api/order/razorpay` returns a Razorpay order created with the server's total. The page opens Razorpay Checkout (`NEXT_PUBLIC_RAZORPAY_KEY_ID`). On success it calls `POST /api/order/verifyRazorpay` with only the three Razorpay fields.
   - HTTP 200 success → "Payment Successful", clear cart, go to `/orders`.
   - HTTP 202 (`lib/apiMessage.js` → `verifyOutcome` = `pending`) → "Your payment is being confirmed… Do not pay again", go to `/orders`.
   - Anything else → a message telling the customer to contact support before paying again.
4. The amount the browser sends is only a staleness check; the backend ignores it for pricing. Backend webhooks complete orders even if the browser never returns.

`lib/apiMessage.js` has two helpers: `serverMessage(error, fallback)` (server text if present, plain and under 300 characters) and `verifyOutcome(response)`.

## 6. Orders (`app/orders`)

`POST /api/order/userorders` returns the caller's orders with products populated. The page flattens orders into item rows, newest first. If a product was deleted, the row uses the name and price saved on the order.

## 7. Other integrations

- **Newsletter:** `POST /api/newsletter/subscribe`; the toast shows the server message (new and existing addresses get the same answer).
- **Contact form:** `fetch(GET NEXT_PUBLIC_SHEETS?name=…&email=…)` with `mode: "no-cors"`; success cannot be read, so the UI assumes success if the request did not throw.
- **3D hero:** `components/hero/HeroModel.tsx` is loaded with `next/dynamic` (`ssr: false`). It uses React Three Fiber, drei (`useGLTF`, `OrbitControls`, `Environment`) and `framer-motion-3d` to switch between the assembled model (`/Impactpure.glb`) and the exploded model (`/all seprate.glb`). Both files are preloaded. Double-click toggles the models.
- **Smooth scroll and animation:** Lenis (`SmoothScroll`), Framer Motion (page and section transitions), GSAP from CDN.

## 8. API surface used (`lib/constants.ts`)

| Area | Calls |
|---|---|
| User | `send-otp`, `verify-otp`, `register`, `login`, `reset-password`, `profile` |
| Products | `GET /api/product/list` |
| Cart | `get`, `add`, `update`, `remove` |
| Orders | `place`, `razorpay`, `verifyRazorpay`, `userorders` |
| Newsletter | `subscribe` |

All authenticated calls send the JWT in a `token` header.

## 9. Build and configuration

- `next.config.mjs`: ESLint and TypeScript errors do not fail the build; `images.unoptimized` is on; remote images are allowed from any `https` host (product images come from Cloudinary).
- `tsconfig.json`: strict mode, path alias `@/*` → project root, `allowJs` (so `lib/apiMessage.js` imports cleanly).
- Tailwind: class-based dark mode, shadcn-style CSS variables, `tailwindcss-animate`.
- `.npmrc`: `auto-install-peers=false` (see the README).
- `NEXT_PUBLIC_*` values are inlined at build time.

## 10. Security notes

- No secrets in the bundle; the Razorpay key id is publishable.
- The JWT lives in `localStorage`, so a script injected into the page could read it. The site does not render user-supplied HTML.
- All price, quantity, session and payment decisions are enforced by the backend; the client's checks are for usability only.

## 11. Planned work and known gaps

- Migrate to a patched Next.js release (requires React 19 and React Three Fiber 9).
- Clearer message when "+" is pressed at the 10-unit cap.
- Remove debug logging and unused UI primitives.
- Cookie-based session instead of `localStorage`.
