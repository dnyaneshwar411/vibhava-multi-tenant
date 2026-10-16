# 🏢 Vibhava Estate Systems

### `vibhava-multi-tenant`

**A high-performance, enterprise-grade multi-tenant SaaS platform engineered to manage real estate operations, property portfolios, leasing, and tenant workflows with strict data isolation.**

[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-BullMQ_6-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 📖 Overview

**Vibhava Estate Systems** is a production-ready, multi-tenant SaaS platform purpose-built for modern real estate operations. It enables enterprises, property management firms, and agencies to run their entire leasing lifecycle — from portfolio onboarding to lease execution, ledger payments, and tenant communication — on a single, isolated, and horizontally scalable infrastructure.

The platform solves the hard problems that generic CRMs cannot:

- **Strict tenant data isolation** at the query layer, not just the UI layer.
- **Asynchronous heavy lifting** (report generation, email notifications, document generation, payment webhook processing) offloaded to BullMQ workers so the API stays responsive.
- **Role-scoped access** for Admins, Property Managers, Agents, and Tenants without leaking cross-tenant context.
- **Redis-backed caching + compound Mongo indexes** for high-throughput dashboards.
- **Integrated payment gateways** (Razorpay + Stripe) with webhook-driven ledger reconciliation.

> **Note:** Vibhava is architected as a **multi-tenant, single-database with logical isolation** model — every document is scoped by an `organizationId`, and every request is validated against a resolved tenant context before it reaches a controller.

---

## ✨ Core Features

| Capability | Description |
|---|---|
| 🏢 **Multi-Tenant Architecture** | Logical isolation via `organizationId` scoping + request-level tenant resolution (subdomain-based). Zero cross-tenant leakage by design. |
| 🔐 **RBAC** | Granular role permissions across **Admin**, **Property Manager**, **Agent**, and **Tenant** personas. Enforced at route, middleware, and query layers. |
| ⚙️ **Async Background Workers** | BullMQ + Redis queues for report generation, email notifications, document generation, scheduled jobs (cron), and payment gateway webhook processing. |
| ⚡ **High-Throughput Optimizations** | Redis caching layer, compound MongoDB indexes, `.lean()` queries, pagination, and projection-based reads. |
| 📊 **Real-Time Dashboards** | Next.js App Router dashboards for property portfolios, lease status, occupancy, and financial summaries — powered by React Query / SWR with cache invalidation. |
| 🏘️ **Property & Lease Management** | Full CRUD on properties, units, tenants, leases, invoices, and maintenance tickets with Kanban-style ticket ordering. |
| 📄 **Document Generation** | Server-side lease agreements and invoices generated via background workers; S3-backed file storage. |
| 💳 **Payment & Ledger** | Razorpay + Stripe integration with webhook-driven ledger reconciliation and org-level payment gateway setup. |
| ✅ **Schema-First Validation** | Zod schemas shared between request validation and TypeScript types. |
| 🐳 **Containerized Dev & Prod** | Docker + Docker Compose for Redis, API, and Worker. GitHub Actions builds to GHCR and deploys to AWS EC2. |

---

## 🏗️ Multi-Tenancy Explained

### What is Multi-Tenancy in Vibhava?

In Vibhava, **multi-tenancy** means a single deployed instance of the platform serves many independent organizations ("tenants") — each with its own users, properties, leases, and settings — while guaranteeing that **no tenant can ever see or mutate another tenant's data**.

We achieve this through **logical data isolation**:

1. **Every tenant-scoped document** carries an `organizationId` field.
2. **Every inbound request** resolves a tenant context via **subdomain-based routing** (e.g., `acme.vibhava.app` → `acme` organization). The client also uses an `apexDomain` config for company pages that are accessible via the root domain.
3. **Middleware** validates the authenticated user's membership in the resolved organization before the request reaches any controller.
4. **Data access layer** injects `organizationId` into every query — enforced via scoping middleware and config-level `scopes.ts`, so cross-tenant queries are prevented by design.

```ts
// Simplified tenant-scoping middleware (server/src/api/middlewares)
// Injects organizationId into request context before controllers run
```

> **Note:** The `scopes.ts` config file centralizes tenant scoping rules, and the async queue system revalidates org company pages independently of the request lifecycle.

---

### How Organizations Access the Platform

**Step-by-step onboarding workflow:**

**1. Organization Registration**
An enterprise signs up. The platform creates an `Organization` document with a unique identifier and an owner user. The client also supports company pages visible at the root domain.

**2. Subdomain Provisioning**
- The org receives a **subdomain** (e.g., `acme.vibhava.app`) resolved via the `apexDomain` configuration.
- The Next.js client detects the subdomain and routes requests to the correct tenant context.

**3. Admin Invitation & Staff Onboarding**
The Org Admin invites staff via email (Nodemailer + BullMQ queue). Each invite is scoped to a role (`PROPERTY_MANAGER`, `AGENT`) and tied to the `organizationId`. On acceptance, the user is bound to that organization.

**4. Role & Permission Assignment**
Admins assign granular permissions via the RBAC layer, centralized in `config/scopes.ts`. Roles are stored per-membership, allowing a user to belong to multiple orgs with different roles.

**5. Isolated Data Access**
From this point forward, every API call the org's users make is automatically scoped to their tenant. Dashboards, reports, audit logs, and exports are all filtered by `organizationId`.

```
┌────────────┐   subdomain routing    ┌──────────────┐   scoped query   ┌──────────┐
│  Web App   │ ─────────────────────► │  API Gateway │ ───────────────► │ MongoDB  │
│ (Next.js)  │                        │  (Express 5) │                  │          │
└────────────┘                        └──────┬───────┘                  └──────────┘
                                             │
                                             ▼
                                      ┌──────────────┐
                                      │ Redis+BullMQ │  ← async jobs (email, PDF,
                                      └──────────────┘     webhooks, schedulers)
```

---

## 📁 Project Architecture

Vibhava uses a **pnpm monorepo** layout with a `client/` (Next.js) and `server/` (Express) split.

```
vibhava-multi-tenant/
├── .github/
│   └── workflows/
│       └── deploy.yaml             # Build to GHCR + deploy to EC2
│
├── client/                         # Next.js (App Router) frontend
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (company)/          # Company (org) pages — root domain
│   │   │   ├── (organization)/     # Organization dashboard pages
│   │   │   ├── api/                # ISR revalidation endpoint
│   │   │   ├── c/                  # Cipher / protected routes
│   │   │   ├── login/
│   │   │   └── not-found/
│   │   ├── components/             # shadcn/ui + Radix components
│   │   ├── config/                 # apexDomain and app config
│   │   ├── hooks/                  # React Query hooks, cache revalidation
│   │   ├── lib/
│   │   ├── modules/                # Feature modules (rent flow, etc.)
│   │   ├── network/                # API client
│   │   ├── providers/              # React context providers
│   │   └── types/
│   ├── components.json             # shadcn/ui config
│   └── README.md
│
├── server/                         # Express + TypeScript backend
│   ├── ai/                         # AI-related utilities
│   ├── http-client/                # External API clients
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/        # auth, lease, ledger, maintenance, etc.
│   │   │   ├── middlewares/        # auth, tenant scoping, RBAC, error
│   │   │   ├── routes/
│   │   │   ├── schemas/            # Zod schemas
│   │   │   └── utils/
│   │   ├── common/
│   │   ├── config/                 # envVars, constants, scopes, payment
│   │   ├── core/
│   │   │   ├── events/
│   │   │   ├── services/
│   │   │   └── use-cases/
│   │   ├── infrastructure/         # database, seed, external services
│   │   ├── workers/
│   │   │   ├── cron/               # Scheduled jobs (schedulers)
│   │   │   ├── init.ts             # Worker entrypoint
│   │   │   └── worker.ts           # BullMQ processors
│   │   ├── app.ts
│   │   └── index.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   └── tsconfig.json
│
├── docker-compose.dev.yaml
├── docker-compose.prod.yaml
├── .gitignore
└── README.md
```

---

## 🚀 Local Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** `>= 18.x` — [download](https://nodejs.org/)
- **pnpm** `>= 12.x` — `npm i -g pnpm@12.3.4` (the repo pins `pnpm@12.3.4`)
- **Docker** & **Docker Compose** — [download](https://www.docker.com/products/docker-desktop)
- **Git**

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/dnyaneshwar411/vibhava-multi-tenant.git
cd vibhava-multi-tenant
```

---

### Step 2 — Configure Environment Variables

Copy the example env files and fill in your values.

```bash
# Server
cp server/.env.example server/.env

# Client
cp client/.env.example client/.env.local
```

> **Note:** For local development, the defaults in `.env.example` will work out of the box with the provided Docker Compose setup. You only need to change values if you're pointing at an external Mongo/Redis instance.

---

### Step 3 — Spin Up Infrastructure (Redis)

```bash
docker compose -f docker-compose.dev.yaml up -d redis_db
```

Verify the container is healthy:

```bash
docker ps
```

You should see `redis_db` running.

> **Note:** The dev compose file currently only declares `redis_db` as a standalone infrastructure service — the `api` and `workers` services build from `./server` and expect a running MongoDB instance (Atlas or local).

---

### Step 4 — Install Dependencies

The server uses pnpm as the package manager. From the `server/` directory:

```bash
cd server
pnpm install
```

---

### Step 5 — Run API and Worker Concurrently

From the `server/` directory:

```bash
# Terminal 1 — API
pnpm dev:api

# Terminal 2 — Worker
pnpm dev:worker
```

Then start the client from the `client/` directory:

```bash
cd ../client
pnpm install
pnpm dev
```

This starts:

- **API** → `http://localhost:1993` (the Docker Compose maps port `1993:1993`)
- **Web** → `http://localhost:3000`
- **BullMQ Worker** → separate process (`tsx watch src/workers/init.ts`)

> **Tip:** The `dev:api` script runs `tsx watch src/index.ts`, and `dev:worker` runs `tsx watch src/workers/init.ts`. Keep both running for full async functionality.

---

## 🔐 Environment Variables Reference

### `server/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | API server port | `1993` |
| `NODE_ENV` | Runtime environment | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/vibhava` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for signing access tokens | `super-secret-change-me` |
| `JWT_EXPIRES_IN` | Access token TTL | `15m` |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens | `another-secret` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `RAZORPAY_KEY_ID` | Razorpay key ID | `rzp_test_xxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | `xxxx` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_xxxx` |
| `AWS_S3_BUCKET` | S3 bucket for file storage | `vibhava-files` |
| `SMTP_HOST` | Nodemailer SMTP host | `smtp.example.com` |

### `client/.env.local`

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Public API base URL | `http://localhost:1993/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | App display name | `Vibhava Estate Systems` |
| `NEXT_PUBLIC_APEX_DOMAIN` | Apex domain for subdomain routing | `vibhava.app` |

> **Note:** Never commit real secrets. All `.env*` files (except `.env.example`) are gitignored. The repo's `.gitignore` also excludes `dump.rdb` (Redis persistence files).

---

## 🩺 API Verification & Health Checks

### API Health Check

```bash
curl -s http://localhost:1993/api/v1/health | jq
```
<!-- 
### Quick Auth Smoke Test

```bash
curl -X POST http://localhost:1993/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acme.test","password":"Passw0rd!","organizationName":"Acme Realty"}'
```

### Trigger a Worker Job (e.g., report generation)

```bash
curl -X POST http://localhost:1993/api/v1/reports/profit-loss \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"<org_id>","period":"2026-Q1"}'
```

> **Note:** The async queue system also handles **org company page revalidation** and **payment gateway webhooks** (Razorpay/Stripe) via BullMQ.

--- -->

## 🐳 Deployment & Docker Support

### Production Compose

The production compose file pulls a pre-built image from GHCR:

```yaml
# docker-compose.prod.yaml (abridged)
services:
  redis_db:
    image: redis
    container_name: redis_db
    restart: always
    volumes:
      - redis_data:/data
  api:
    image: ghcr.io/dnyaneshwar411/vibhava-multi-tenant:latest
    container_name: api
    restart: always
    ports:
      - "1993:1993"
    env_file:
      - .env
    command: node dist/index.js
  workers:
    image: ghcr.io/dnyaneshwar411/vibhava-multi-tenant:latest
    container_name: workers
    restart: always
    env_file:
      - .env
    command: node dist/workers/init.js
volumes:
  redis_data:
```

### Pull and Run in Detached Mode

```bash
docker compose -f docker-compose.prod.yaml up -d
```

### CI/CD Pipeline (`.github/workflows/deploy.yaml`)

On every push to `main`, GitHub Actions:

1. **Builds** the Docker image from `./server` context.
2. **Pushes** it to **GitHub Container Registry** (`ghcr.io/dnyaneshwar411/vibhava-multi-tenant:latest`).
3. **SCPs** `docker-compose.prod.yaml` to the EC2 instance at `/home/ec2-user/vibhava/backend`.
4. **SSHs** into EC2, logs into GHCR, pulls the latest image, and runs `docker compose up -d --remove-orphans`.

> **Note:** In production, ensure `NODE_ENV=production`, rotate `JWT_SECRET`, and restrict Redis ports to the private VPC only. The EC2 deploy path is `/home/ec2-user/vibhava/backend`.

---

## 🧪 Scripts Cheat Sheet

### Server (`server/`)

| Command | Description |
|---|---|
| `pnpm dev:api` | Run API in watch mode (`tsx watch src/index.ts`) |
| `pnpm dev:worker` | Run BullMQ worker in watch mode (`tsx watch src/workers/init.ts`) |
| `pnpm seed` | Seed demo tenant data (`tsx src/infrastructure/database/seed.ts`) |
| `pnpm check` | TypeScript type-check (`tsc --noEmit`) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start:api` | Run compiled API (`node dist/index.js`) |
| `pnpm start:worker` | Run compiled worker (`node dist/workers/init.js`) |

### Client (`client/`)

| Command | Description |
|---|---|
| `pnpm dev` | Run Next.js dev server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |

---

## 👤 Author

**Dnyaneshwar**
GitHub: [@dnyaneshwar411](https://github.com/dnyaneshwar411)
Project: [vibhava-multi-tenant](https://github.com/dnyaneshwar411/vibhava-multi-tenant)

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

You are free to use, modify, and distribute this software for personal or commercial purposes with attribution.

---

<p align="center">
  <sub>Built with ❤️ and a lot of <code>organizationId</code> checks.</sub>
</p>
