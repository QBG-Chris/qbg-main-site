# Quantum Beauty Group website

The public QBG marketing, education-booking, BlendIQ, and account site. Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn-style UI primitives.

## Local development

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and add the service credentials needed for the features you are testing.
3. Start the app with `npm run dev`.

The marketing pages render without service credentials. Supabase is required for authentication and account features; Stripe is required for subscription checkout and billing; SMTP settings are required for contact, booking, and beta-request delivery.

## Quality checks

- `npm run lint` checks Next.js, React, accessibility, and TypeScript rules.
- `npx tsc --noEmit` checks types.
- `npm run build` creates the production build.

## Design system

Shared color, typography, radius, surface, and dark-mode values live in `app/globals.css`. Reusable interface primitives live in `components/ui`; compose those primitives instead of introducing one-off control styles.
