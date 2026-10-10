# Impactpure storefront

Next.js 14 (App Router) storefront for www.impactpure.com. Client-side only: no API routes and no middleware. All data comes from the Impactpure API.

## Deployment
- Production: Vercel project "impactpure", branch main, root ./, Node 22.x, pnpm (see pnpm-lock.yaml).
- Staging: Vercel project "impactpure-store-staging", branch staging, fake data only.
- Every push to main is a production deploy.

## Local development
Copy .env.example to .env.local. Point NEXT_PUBLIC_BACKEND_URL at a staging API, never production, when testing writes.
    pnpm install
    pnpm dev

## Environment variables (names only)
App: storefront. All public by design; values are embedded at build time, so changing one needs a redeploy.

| Variable | Visibility | Environments | Service |
|---|---|---|---|
| NEXT_PUBLIC_BACKEND_URL | public (build time) | Production, Staging | Impactpure API |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | public (build time) | Production (live key), Staging (test key) | Razorpay |
| NEXT_PUBLIC_SHEETS | public (build time) | Production only; unset in Staging | Google Sheets (contact form) |
