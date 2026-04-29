# Adriatik Tours — Project Context

## What this is
A Viator-style tour marketplace for Albania and Kosovo, built as a Next.js-style
React prototype. Modern minimal Airbnb-style design with editorial typography.

## Tech stack
- Vite + React (JavaScript, not TypeScript)
- Tailwind CSS v3
- lucide-react for icons
- Single-file component at `src/AdriatikTours.jsx` (~1,800 lines)
- Hash-based routing (no router lib) — see the `route` state and `navigate()` function
- Mock data inline at top of file: `TOURS`, `AGENTS`, `REVIEWS`, `CATEGORIES`

## Design system
- Primary: terracotta #C75A3F
- Accent: deep #1F1D1B (charcoal)
- Success: #3F7D58
- Beige accents: #F8F4ED, #E9E2D5
- Page background: white
- Display font: Instrument Serif (Google Fonts)
- Body font: Inter
- Logo image: `public/logo.png`, referenced as `/logo.png` in 3 places (header, footer, auth)

## Pages implemented
home, browse, tour (detail), agents, agent (profile), booking, auth, dashboard-client, dashboard-agent

## Current state
- Deployed on Vercel via GitHub auto-deploy
- Images: real Albania/Kosovo photos from Wikimedia Commons (upload.wikimedia.org direct file URLs); agent portraits from i.pravatar.cc
- Mock data only — no real backend yet

## Strategic foundation
A research document covering market analysis, competitors (Viator/GetYourGuide ~25%
commission), recommended 15-18% commission, tech stack (Stripe Connect with EU
parent entity since Stripe doesn't support Albania/Kosovo merchants natively),
GDPR via Albanian Law 124/2024 and Kosovo Law 06/L-082, and a 12-month roadmap.

## Conventions
- Tailwind classes inline, arbitrary values for brand colors (`bg-[#C75A3F]`)
- All file edits should preserve the modern minimal aesthetic — generous whitespace,
  rounded corners (rounded-2xl, rounded-3xl, rounded-full), soft shadows
- Don't add backend/database — keep mock data unless explicitly asked