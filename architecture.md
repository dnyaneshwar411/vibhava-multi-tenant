# Architecture — Vibhava Estate Systems

> Backend architecture reference for `vibhava-multi-tenant`.
> For setup and usage, see the [README](../README.md).

---

## Table of Contents

1. [Design Goals](#1-design-goals)
2. [System Overview](#2-system-overview)
3. [Process Model](#3-process-model)
4. [Request Lifecycle](#4-request-lifecycle)
5. [Multi-Tenancy Enforcement](#5-multi-tenancy-enforcement)
6. [Layering Rules](#6-layering-rules)
7. [Async Workers & Queues](#7-async-workers--queues)
8. [Data Model (Tenant-Scoped)](#8-data-model-tenant-scoped)
9. [Deployment Topology](#9-deployment-topology)
10. [Key Design Decisions](#10-key-design-decisions)
11. [Folder Map](#11-folder-map)

---

## 1. Design Goals

The architecture optimizes for four things, in order:

1. **Provable tenant isolation** — a developer should not be able to leak data even by accident.
2. **Fast request path** — the API must stay responsive under dashboard load; heavy work is deferred.
3. **Independent scaling** — the async workload profile is fundamentally different from the request profile.
4. **Cheap deploys** — one image, two entrypoints, one compose file, one pipeline.

Everything below is a consequence of these four.

---

## 2. System Overview

```mermaid
flowchart TB
    subgraph Client["🖥️ Client"]
        WEB["Next.js App Router<br/>client/<br/>(subdomain-aware)"]
    end

    subgraph Edge["🚪 Edge / Entry"]
        LB["Reverse Proxy / TLS<br/>(subdomain → org)"]
    end

    subgraph API["⚙️ API Process — server/src/index.ts"]
        APP["Express 5 App<br/>app.ts"]

        subgraph MW["Middleware Chain"]
            M1["Request Context<br/>+ Logger"]
            M2["Auth (JWT)"]
            M3["Tenant Scope<br/>organizationId"]
            M4["RBAC<br/>config/scopes.ts"]
            M5["Zod Validation"]
            M6["Error Handler"]
        end

        subgraph API_L["API Layer"]
            ROUTES["Routes"]
            CTRL["Controllers<br/>api/controllers/*"]
            SCHEMAS["Zod Schemas<br/>api/schemas/*"]
        end

        subgraph CORE["Core Domain — core/"]
            UC["Use Cases<br/>orchestration"]
            SVC["Services<br/>business rules"]
            EVT["Events<br/>domain events"]
        end

        subgraph INFRA["Infrastructure"]
            REPO["Repositories<br/>Mongoose models"]
            CACHE["Cache Layer<br/>Redis"]
            EXT["External Clients<br/>Razorpay · Stripe<br/>S3 · Nodemailer · AI"]
            QUEUE_P["Queue Producer<br/>BullMQ"]
        end
    end

    subgraph Workers["🔁 Worker Process — workers/init.ts"]
        W_INIT["Worker Bootstrap"]
        W_EMAIL["email.queue"]
        W_REPORT["reports.queue"]
        W_DOC["documents.queue"]
        W_PAY["payments.queue<br/>webhook processors"]
        W_CRON["Cron Schedulers<br/>workers/cron/*"]
    end

    subgraph Data["💾 Data Stores"]
        MONGO[("MongoDB<br/>org-scoped collections<br/>compound indexes")]
        REDIS[("Redis<br/>cache + BullMQ<br/>+ rate limits")]
    end

    WEB --> LB --> APP
    APP --> M1 --> M2 --> M3 --> M4 --> M5 --> ROUTES --> CTRL
    CTRL --> SCHEMAS
    CTRL --> UC --> SVC
    SVC --> EVT
    SVC --> REPO --> MONGO
    SVC --> CACHE --> REDIS
    SVC --> EXT
    SVC --> QUEUE_P --> REDIS

    REDIS --> W_INIT
    W_INIT --> W_EMAIL
    W_INIT --> W_REPORT
    W_INIT --> W_DOC
    W_INIT --> W_PAY
    W_INIT --> W_CRON
    W_EMAIL --> EXT
    W_REPORT --> MONGO
    W_DOC --> EXT
    W_PAY --> MONGO
    W_CRON --> MONGO

    M6 -.-> APP
```

**Reading this diagram:** traffic enters through the reverse proxy, which resolves the tenant from the subdomain. The Express app runs a fixed middleware chain before any controller. Domain logic lives in `core/`, and all I/O (Mongo, Redis, S3, payment gateways) sits behind the infrastructure layer. The worker process shares no memory with the API — it communicates only through Redis and Mongo.

---

## 3. Process Model

The single most important architectural decision:

> **One Docker image, two entrypoints.**

| Process | Entrypoint | Purpose | Scale profile |
|---|---|---|---|
| `api` | `node dist/index.js` | HTTP request handling | Scales with traffic |
| `workers` | `node dist/workers/init.js` | Job processing, cron, webhooks | Scales with queue depth |

Both run the same compiled `dist/`, share the same domain logic, and use the same env config. They differ only in what they bootstrap.

**Why this matters:**

- **No logic drift.** A repository method used by the API is the *same* method used by a worker. There is no "worker copy" of anything.
- **Independent scaling.** Under report-generation load, you add worker containers without over-provisioning API capacity (and vice versa).
- **Simple deploys.** One image build, one push to GHCR, two `docker compose` services referencing the same tag.
- **Graceful shutdown parity.** Both processes use the same SIGTERM handler for draining.

```mermaid
flowchart LR
    IMG["ghcr.io/.../vibhava-multi-tenant:latest"]
    IMG --> API_S["api service<br/>node dist/index.js"]
    IMG --> WRK_S["workers service<br/>node dist/workers/init.js"]
    API_S -->|HTTP| HTTP["Port 1993"]
    WRK_S -->|consume| REDIS[("Redis")]
    API_S -->|produce| REDIS
```

**Trade-off accepted:** a cold-start cost of ~2s for workers because they load the full domain bundle. In exchange, we avoid duplicating business logic in a separate "jobs package" — which historically is where tenant-scoping bugs hide.

---

## 4. Request Lifecycle

Tracing a single write request through the system:

```mermaid
sequenceDiagram
    autonumber
    participant C as Client (Next.js)
    participant MW as Middleware Chain
    participant CT as Controller
    participant UC as Use Case
    participant SV as Service
    participant R as Repository
    participant DB as MongoDB
    participant RC as Redis
    participant Q as BullMQ

    C->>MW: POST /api/v1/leases<br/>Authorization + subdomain
    MW->>MW: Resolve org from subdomain
    MW->>MW: Verify JWT → user
    MW->>MW: Assert membership in org
    MW->>MW: RBAC check (scope: lease:create)
    MW->>MW: Zod validate body
    MW->>CT: req { user, organizationId, body }

    CT->>UC: createLease(dto, ctx)
    UC->>SV: enforce domain rules
    SV->>R: findUnits({ organizationId, unitId })
    R->>DB: query (auto-scoped)
    DB-->>R: unit
    R-->>SV: unit

    SV->>R: insertLease({ ...dto, organizationId })
    R->>DB: insert
    DB-->>R: lease

    SV->>RC: invalidate cache org:{id}:leases
    SV->>Q: enqueue documents.generate(leaseId)
    SV->>Q: enqueue email.leaseSigned(leaseId)

    SV-->>UC: lease
    UC-->>CT: lease
    CT-->>C: 201 Created
```

**Key invariants:**

- `organizationId` is resolved by middleware and placed on the request context. **It is never read from the request body.**
- The controller does no business logic — it validates input, calls one use-case, and returns.
- Side effects that can fail independently (PDF generation, email) are enqueued, not awaited.
- Cache invalidation happens *before* the response returns, so the next read is guaranteed fresh.

---

## 5. Multi-Tenancy Enforcement

Isolation is not a convention — it's enforced at three layers.

### Layer 1 — Tenant resolution (middleware)

The subdomain is mapped to an `organizationId` before any controller runs. Unknown subdomains short-circuit with 404.

### Layer 2 — Membership check (middleware)

The authenticated user must have an active membership in the resolved organization. Roles are per-membership, not per-user, so a user in two orgs has two independent role sets.

### Layer 3 — Repository scoping (data layer)

Every tenant-scoped collection requires `organizationId` in its filter. A Mongoose plugin injects it automatically:

```ts
// server/src/infrastructure/database/plugins/tenantScope.ts
schema.pre(/^find|^count|^update|^delete/, function (next) {
  if (this.getOptions().skipTenantScope) return next();
  this.where({ organizationId: getContext().organizationId });
  next();
});
```

The `skipTenantScope` escape hatch exists only for platform-admin operations and is audit-logged.

### The isolation contract

| Rule | Enforced by | Violation test |
|---|---|---|
| Request carries valid org context | Middleware | Integration test: no subdomain → 404 |
| User belongs to org | Middleware | Integration test: cross-org JWT → 403 |
| Queries scoped to org | Mongoose plugin | Unit test: cross-org `find` returns empty |
| Writes include `organizationId` | Schema `required: true` | Schema validation error |

> **Note:** These four rules are the ones to point at if asked "how do you *know* data is isolated?" Every one has a test.

---

## 6. Layering Rules

```mermaid
flowchart TB
    subgraph L1["1. Transport Layer"]
        direction LR
        A1["routes/"] --> A2["controllers/"] --> A3["schemas/"]
    end
    subgraph L2["2. Application Layer"]
        direction LR
        B1["use-cases/"] --> B2["events/"]
    end
    subgraph L3["3. Domain Layer"]
        direction LR
        C1["services/"] --> C2["config/scopes.ts"]
    end
    subgraph L4["4. Infrastructure Layer"]
        direction LR
        D1["repositories/"] --> D2["cache/"] --> D3["external/"] --> D4["queues/"]
    end

    L1 --> L2 --> L3 --> L4

    X["❌ No upward imports<br/>❌ No HTTP types below L1<br/>❌ No Mongoose models above L4"]
    L2 -.- X
```

**The rule:** dependencies point **downward only**.

- `controllers/` may import from `use-cases/` — never the reverse.
- `use-cases/` may import from `services/` — never from `express` or `mongoose`.
- `services/` express business rules with no knowledge of HTTP, ORM, or transport.
- `repositories/` are the only place Mongoose is imported.

**Why this rule exists:** it makes services testable without spinning up Express or a database, and it makes it *impossible* for a controller to bypass tenant scoping by querying Mongo directly.

---

## 7. Async Workers & Queues

```mermaid
flowchart LR
    subgraph Producers["Producers"]
        API["API Process<br/>(controllers → use-cases)"]
        CRON["Cron Schedulers<br/>workers/cron/*"]
        HOOK["Payment Webhooks<br/>Razorpay · Stripe"]
    end

    subgraph Redis["Redis"]
        Q1[["email.queue"]]
        Q2[["reports.queue"]]
        Q3[["documents.queue"]]
        Q4[["payments.queue"]]
        DLQ[["dead-letter"]]
    end

    subgraph Consumers["Worker Process"]
        E["Email Processor<br/>Nodemailer"]
        RP["Report Processor<br/>PDF · CSV"]
        D["Document Processor<br/>Lease PDFs → S3"]
        P["Payment Processor<br/>idempotent ledger writes"]
    end

    subgraph Effects["Side Effects"]
        SMTP["SMTP"]
        S3["AWS S3"]
        MONGO[("MongoDB")]
        REVAL["Client ISR Revalidation<br/>(/api route)"]
    end

    API --> Q1 & Q2 & Q3
    HOOK --> Q4
    CRON --> Q2

    Q1 --> E --> SMTP
    Q2 --> RP --> S3 --> REVAL
    Q3 --> D --> S3
    Q4 --> P --> MONGO

    E -.on failure.-> DLQ
    RP -.on failure.-> DLQ
    D -.on failure.-> DLQ
    P -.on failure.-> DLQ
```

### Job contracts

| Queue | Producer | Consumer | Idempotent? | Retries |
|---|---|---|---|---|
| `email.queue` | API, workers | Email processor | Yes (message ID) | 3, exp backoff |
| `reports.queue` | API, cron | Report processor | No (regenerated) | 2 |
| `documents.queue` | API | Document processor | Yes (leaseId + version) | 3 |
| `payments.queue` | Webhook handler | Payment processor | **Yes (event.id as jobId)** | 5, exp backoff |

### The idempotency rule

Payment webhooks use the gateway's `event.id` as the BullMQ `jobId`. If the gateway retries, BullMQ deduplicates. If the processor crashes mid-write, the retry is a no-op because the ledger entry is keyed by event ID.

**This is the only queue where correctness under retry is non-negotiable.**

---

## 8. Data Model (Tenant-Scoped)

Every collection below carries `organizationId` as a required, indexed field.

```mermaid
erDiagram
    ORGANIZATION ||--o{ MEMBERSHIP : has
    ORGANIZATION ||--o{ PROPERTY : owns
    ORGANIZATION ||--o{ LEASE : manages
    USER ||--o{ MEMBERSHIP : "belongs to"
    MEMBERSHIP }o--|| ROLE : "grants"

    PROPERTY ||--o{ UNIT : contains
    UNIT ||--o{ LEASE : "leased via"
    LEASE ||--o{ LEDGER_ENTRY : "generates"
    LEASE ||--o{ DOCUMENT : "produces"
    LEASE }o--|| USER : "signed by"

    ORGANIZATION {
        ObjectId _id
        string slug
        string subdomain
        string apexDomain
    }
    MEMBERSHIP {
        ObjectId _id
        ObjectId organizationId
        ObjectId userId
        string role
        string status
    }
    PROPERTY {
        ObjectId _id
        ObjectId organizationId
        string name
        object address
    }
    UNIT {
        ObjectId _id
        ObjectId organizationId
        ObjectId propertyId
        string label
        number rent
    }
    LEASE {
        ObjectId _id
        ObjectId organizationId
        ObjectId unitId
        ObjectId tenantUserId
        date startDate
        date endDate
        string status
    }
    LEDGER_ENTRY {
        ObjectId _id
        ObjectId organizationId
        ObjectId leaseId
        number amount
        string direction
        string gatewayEventId
    }
    DOCUMENT {
        ObjectId _id
        ObjectId organizationId
        ObjectId leaseId
        string s3Key
        string type
    }
```

**Indexing strategy:** every compound index is prefixed with `organizationId`. This means Mongo can never serve a query that spans tenants without an explicit `$in` on organization IDs — which the tenant-scope plugin blocks.

```js
// Example: lease lookups for a dashboard
{ organizationId: 1, status: 1, endDate: 1 }
```

---

## 9. Deployment Topology

```mermaid
flowchart TB
    subgraph GH["GitHub"]
        REPO["vibhava-multi-tenant"]
        GA["GitHub Actions<br/>.github/workflows/deploy.yaml"]
        GHCR[("GHCR<br/>ghcr.io/.../vibhava-multi-tenant:latest")]
    end

    subgraph AWS["AWS EC2 — /home/ec2-user/vibhava/backend"]
        subgraph Compose["docker compose -f docker-compose.prod.yaml"]
            API_C["api<br/>:1993<br/>node dist/index.js"]
            WRK_C["workers<br/>node dist/workers/init.js"]
            RDS_C["redis_db<br/>redis:alpine<br/>redis_data volume"]
        end
    end

    subgraph Managed["Managed Services"]
        ATLAS[("MongoDB Atlas")]
        S3B[("AWS S3")]
        GATE["Razorpay / Stripe"]
    end

    subgraph Frontend["Frontend Host"]
        NXT["Next.js<br/>(Vercel / EC2)"]
    end

    REPO --> GA
    GA -->|build & push| GHCR
    GA -->|SCP compose file| AWS
    GA -->|SSH: pull + up -d| Compose

    GHCR -->|pull image| API_C & WRK_C
    API_C --> ATLAS & RDS_C
    WRK_C --> ATLAS & RDS_C
    WRK_C --> S3B
    API_C --> GATE
    NXT -->|HTTPS| API_C
```

**Pipeline contract:**

1. On push to `main`, Actions builds the Docker image from `./server`.
2. Image is pushed to **GitHub Container Registry** with the `latest` tag.
3. `docker-compose.prod.yaml` is **SCP'd** to `/home/ec2-user/vibhava/backend` on the EC2 host.
4. Actions SSHs in, logs into GHCR, pulls the new image, and runs `docker compose up -d --remove-orphans`.

**Why SCP the compose file rather than baking it into the image:** infrastructure config lives in the repo, versioned alongside code. Rollback is `git revert` + re-run — not an SSH session.

---

## 10. Key Design Decisions

| Decision | Alternative considered | Why we chose this |
|---|---|---|
| One image, two entrypoints | Separate `worker` package | Prevents domain-logic drift; worker uses the same repository methods as the API |
| Shared collection + `organizationId` | DB-per-tenant | Cost and operational simplicity; isolation enforced at the data layer, not the cluster layer |
| Mongoose `pre` hook for scoping | Manual `organizationId` in every query | Manual filtering fails eventually; hooks fail loudly instead |
| Subdomain-based tenant resolution | Header-based (`X-Organization-Id`) | Subdomains are user-visible and cacheable; headers are trivially spoofed if middleware is missing |
| BullMQ on Redis | Mongo-backed job queue | Atomic job operations, native retries, native delayed jobs, native job IDs for idempotency |
| Zod for validation + types | Class-validator + manual types | Single source of truth; schemas double as TS types via `z.infer` |
| SCP compose file in CI | Bake compose into image | Config is versioned in the repo, deployed atomically with the code |

---

## 11. Folder Map

```
vibhava-multi-tenant/
├── .github/workflows/deploy.yaml   # Build → GHCR → EC2
├── client/                         # Next.js App Router
│   └── src/
│       ├── app/                    # (company) · (organization) · api
│       ├── components/             # shadcn/ui + Radix
│       ├── config/                 # apexDomain
│       ├── hooks/                  # React Query + revalidation
│       ├── modules/                # Feature modules (rent flow)
│       └── network/                # API client
│
├── server/                         # Express + TypeScript
│   ├── ai/                         # AI utilities
│   ├── http-client/                # External API clients
│   └── src/
│       ├── api/
│       │   ├── controllers/        # Thin: validate → use-case → respond
│       │   ├── middlewares/        # auth · tenant · rbac · error
│       │   ├── routes/
│       │   └── schemas/            # Zod
│       ├── config/                 # envVars · constants · scopes · payment
│       ├── core/
│       │   ├── events/             # Domain events
│       │   ├── services/           # Business rules (no HTTP, no ORM)
│       │   └── use-cases/          # Orchestration
│       ├── infrastructure/
│       │   ├── database/           # Mongoose models + tenant plugin
│       │   └── external/           # Razorpay · Stripe · S3 · SMTP
│       ├── workers/
│       │   ├── cron/               # Scheduled jobs
│       │   ├── init.ts             # Worker entrypoint
│       │   └── worker.ts           # BullMQ processors
│       ├── app.ts
│       └── index.ts                # API entrypoint
│
├── docker-compose.dev.yaml         # Redis only (local dev)
├── docker-compose.prod.yaml        # Full stack (pulls from GHCR)
└── README.md
```

---

## Where to Go Next

- **Setup & environment** → [README](../README.md)
- **Multi-tenancy rationale** → Section [5](#5-multi-tenancy-enforcement) above
- **Queue contracts** → Section [7](#7-async-workers--queues) above