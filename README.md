# Fusion Starter

A Next.js 15 app router project with a small Express API, Tailwind CSS, Radix UI primitives, and a kanban-style demo UI. Built for quick prototyping with TypeScript, React Query, and modern tooling.

## Quickstart

```bash
npm install
npm dev
```

- App: http://localhost:3000
- API examples: http://localhost:3000/api/ping and http://localhost:3000/api/demo (proxied via Next/Express when integrated)

## Scripts

```bash
pnpm dev        # Start Next.js dev server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm typecheck  # Run TypeScript compiler checks
pnpm format.fix # Run Prettier on the repo
pnpm test       # Placeholder (no test runner configured)
```

## Tech stack

- Next.js 15 (App Router, TypeScript)
- React 18
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- Radix UI components and primitives
- TanStack Query (React Query)
- Zustand for lightweight state where needed
- Express 5 (via `src/server`)

## Project structure

```
/workspace
├─ src/
│  ├─ app/                # Next App Router
│  │  ├─ layout.tsx       # Root layout with QueryClient + TooltipProvider
│  │  ├─ page.tsx         # Home page that renders the dashboard + Kanban
│  │  └─ global.css       # Tailwind base styles
│  ├─ components/
│  │  ├─ ui/              # Reusable UI components (button, badge, sidebar, ...)
│  │  ├─ kanban/          # Kanban board components
│  │  └─ DashboardWithSidebar.tsx
│  ├─ pages/              # Feature-level React components (e.g., BoardApp)
│  ├─ lib/                # Shared utilities
│  ├─ server/             # Express API (createServer, routes)
│  │  ├─ index.ts
│  │  └─ routes/
│  │     └─ demo.ts
│  └─ shared/             # Shared types/interfaces (e.g., API response types)
├─ public/                # Static assets (icons, svg)
├─ tailwind.config.ts
├─ next.config.ts
├─ tsconfig.json          # Uses path alias @/* -> ./src/*
└─ package.json
```

## Development

- TypeScript strict mode is enabled.
- Path alias `@/*` maps to `./src/*`. Example: `import { DemoResponse } from "@/shared/api"`.
- Tailwind is configured to scan `./src/**/*.{js,ts,jsx,tsx,mdx}` and related app/pages/components folders.

### UI

- Common components live in `src/components/ui` (button, badge, card, input, progress, sidebar, skeleton, tooltip).
- The home page renders a dashboard with a Kanban board (`src/pages/BoardApp.tsx`).

### API (Express)

Express is scaffolded in `src/server`:

```ts
// src/server/index.ts
export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  return app;
}
```

```ts
// src/server/routes/demo.ts
export const handleDemo: RequestHandler = (_req, res) => {
  res.status(200).json({ message: "Hello from Express server" });
};
```

You can integrate this Express app with Next.js using a custom server or serverless adapter (e.g., `serverless-http`) depending on your deployment target.

## Environment

- Create a `.env` file if needed. Example:

```
PING_MESSAGE=custom ping
```

## Building & Running

```bash
pnpm build
pnpm start
```

This runs the Next.js production server. If you wire Express into Next (or deploy as serverless functions), ensure your hosting environment supports the chosen integration.

## Coding standards

- Prettier is configured. Use `pnpm format.fix`.
- ESLint uses `eslint-config-next`.
- Prefer meaningful names and strict typing.
