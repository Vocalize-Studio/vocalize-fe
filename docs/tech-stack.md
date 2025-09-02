# Tech Stack

## Core

| Layer              | Technology / Tools                       |
| ------------------ | ---------------------------------------- |
| Framework          | **Next.js (15.3.4)**                     |
| Language           | TypeScript (5.x)                         |
| Styling            | Tailwind CSS (v4) + Tailwind CSS Animate |
| State Management   | React Query (TanStack) + Zustand         |
| Forms & Validation | React Hook Form + Zod                    |
| Deployment         | Vercel                                   |

---

## UI & Components

- **shadcn/ui**: Component system built on top of Radix Primitives (Dialog, Avatar, Dropdown, Checkbox Label, Slot)
- **Lucide Icons** and **react-icons**
- **class-variance-authority**, `clsx`, and `tailwind-merge` for conditional styling
- **sonner** for toast notifications
- **next-themes** for theme switching (dark/light mode)

---

## Animations & Media

- **Framer Motion**: UI animations
- **GSAP + @gsap/react**: advanced timeline animations
- **wavesurfer.js**: audio waveform visualization
- **react-player**: video & audio player

---

## Developer Experience

- **ESLint** + **Prettier** for linting & formatting
- **TypeScript** for static typing
- **PostCSS** with Tailwind
- **tw-animate-css** for utility-based animations

---

## Notes

This stack is designed to:

- Leverage **Next.js App Router** features with server-side rendering & API routes.
- Use **React Query** for data synchronization and caching, while **Zustand** handles lightweight local state.
- Provide modern UI/UX with **ShadCN UI**, **Framer Motion**, and **GSAP**.
