Vocalize/
├─ public/                     # Static assets (images, fonts, icons, etc.)
├─ src/                        # Main source code
│  ├─ app/                     # Next.js app router (pages, layouts, API routes)
│  │  ├─ api/                  # API route handlers (Next.js server functions)
│  │  ├─ favicon.ico           # App favicon
│  │  ├─ globals.css           # Global styles
│  │  ├─ layout.tsx            # Root layout wrapper
│  │  └─ page.tsx              # Main landing page
│  ├─ components/              # Reusable UI components
│  ├─ constants/               # App-wide constants / config values
│  ├─ features/                # Feature-based modules (domain driven)
│  │  ├─ auth/                 # Authentication module (login, register, etc.)
│  │  └─ vocalizer/            # Vocalizer feature (AI audio/vocal mixing logic)
│  ├─ hooks/                   # Custom React hooks
│  │  ├─ use-auto-play.ts      # Hook for autoplay logic
│  │  ├─ use-carousel-animation.ts # Hook for carousel animations
│  │  └─ use-multi-steps.ts    # Hook for multistep form logic
│  ├─ lib/                     # Utility and client-side libraries
│  │  ├─ api-client.ts         # API client instance (fetch/axios wrapper)
│  │  ├─ format-time.ts        # Time/date formatting helpers
│  │  ├─ sessions.ts           # Session handling utilities
│  │  └─ utils.ts              # General utilities
│  ├─ providers/               # React Query providers
│  └─ store/                   # State management (Zustand, etc.)
│     └─ auth-dialog-store.ts  # Store for auth dialog state
├─ .env.example                # Example environment variables template
├─ .env                        # Local environment variables
├─ .gitignore                  # Git ignore configuration
├─ components.json             # Shadcn/UI generator config
├─ next-env.d.ts               # Next.js TypeScript environment declarations
├─ next.config.ts              # Next.js project configuration
├─ package.json                # Project dependencies and scripts
├─ package-lock.json           # Lockfile for npm dependencies
├─ postcss.config.mjs          # PostCSS config (used by Tailwind)
├─ README.md                   # Project documentation
├─ tailwind.config.ts          # Tailwind CSS configuration
└─ tsconfig.json               # TypeScript configuration
