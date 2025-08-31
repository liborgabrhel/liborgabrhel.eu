# liborgabrhel.eu

Personal website of Libor Gabrhel - showcasing both developer and beekeeper personas.

## About

This is a dual-purpose personal website featuring:
- **Developer Section** - Software engineering portfolio, projects, and technical notes
- **Beekeeper Section** - Beekeeping content, apiary management, and related notes

## Tech Stack

- 🚀 **React Router v7** - Full-stack React framework with SSR
- ⚡️ **TypeScript** - Type-safe development
- 📦 **Vite** - Fast build tool with HMR
- 🎨 **CSS Modules** - Scoped styling
- 🗄️ **Prisma + SQLite** - Database with Better-SQLite3 adapter
- 🔧 **Biome** - Fast formatting and linting
- 🪝 **Lefthook** - Git hooks automation

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

Install Git hooks for code quality automation:

```bash
pnpm lefthook:install
```

> **Note**: This project uses [Lefthook](./docs/lefthook.md) for automated code formatting, linting, and testing on commits and pushes.

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm build`

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Project Structure

```
app/
├── components/          # Reusable UI components
├── routes/             # File-based routing
│   ├── developer/      # Developer section routes
│   └── beekeeper/      # Beekeeper section routes
├── styles/             # Global styles
└── utils/              # Utility functions

docs/                   # Project documentation
prisma/                 # Database schema and migrations
```

---

Built with ❤️ by Libor Gabrhel.
