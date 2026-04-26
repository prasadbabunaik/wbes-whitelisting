# WBES IP Whitelisting Portal

A production-grade, multi-role IP Whitelisting Approval Workflow portal built for **Grid Controller of India Limited (GRID-INDIA)**. It manages the end-to-end lifecycle of IP address whitelisting requests submitted by Regional Load Despatch Centres (RLDCs), routed through a structured approval chain before final implementation by IT.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Workflow](#workflow)
6. [Role-Based Access Control](#role-based-access-control)
7. [Project Structure](#project-structure)
8. [Database Schema](#database-schema)
9. [API Reference](#api-reference)
10. [Authentication & Security](#authentication--security)
11. [Email Notifications](#email-notifications)
12. [In-App Notifications](#in-app-notifications)
13. [Session Management](#session-management)
14. [Environment Variables](#environment-variables)
15. [Local Setup](#local-setup)
16. [Seeding the Database](#seeding-the-database)
17. [Key Components](#key-components)
18. [Pages & Routes](#pages--routes)

---

## Overview

The WBES IP Whitelisting Portal digitises and enforces a formal approval workflow for granting network-level IP access to WBES (Web Based Energy Scheduling) system users. An RLDC (or NLDC) initiates a request; it travels through NLDC → CISO → SOC → IT, with email and in-app notifications at every step. Emergency requests trigger a pulsing red alert and a login popup for immediate attention.

---

## Key Features

### Workflow Management
- Full multi-stage approval chain: **RLDC → NLDC → CISO → SOC → IT**
- Forward, reject, and override actions per role
- Workflow timeline displayed inside each request's action modal
- Admin override capability — Admin can act at any pending stage
- Emergency flag with blinking badge and priority routing

### Request Management
- Create IP whitelisting requests (New User / Existing User)
- Support for CIDR notation and IP range expansion (up to /22)
- IPs to Add and IPs to Remove tracked separately
- API Access flag for requests requiring backend access
- Ticket number auto-generated (e.g., `WBES-2025-0001`)
- Permanent delete by Admin with confirmation modal

### Filtering & Sorting
- **Requests table**: multi-select Status, Category, Region, Emergency toggle
- **Audit logs table**: Search, Date Range (last 24h / 7d / 30d / All), Status, Category, Region, Emergency
- Sortable column headers with `▲` / `▼` / `⇅` indicators on all tables
- Record count badge when filters are active
- CSV Export from the audit logs page

### Email Notifications
- Automatic workflow emails at every approval/rejection/completion step
- Nodemailer singleton with lazy initialisation — SMTP credentials from `.env` only, never hardcoded
- Role-based `To` + `CC` routing (NLDC, CISO, SOC, IT, regional RLDCs)
- Always-CC address configurable via `MAIL_CC_ALWAYS`
- Resend Mail button per request row
- Alert emails for overdue emergency requests via cron job

### In-App Notifications
- Bell icon in the header with live unread badge count
- Polled every 30 seconds via `/api/notifications`
- Clicking a notification navigates to the relevant approval page
- Mark-all-read on dropdown open
- Persisted in `Notification` table in PostgreSQL

### Session & Security
- HttpOnly cookie sessions (`wbes_session` in dev, `__Host-session` in prod)
- CSRF double-submit token stored in `sessionStorage` and validated server-side
- Session inactivity countdown timer in the header (30-minute idle timeout)
- Warning at 5 minutes remaining, danger state at 2 minutes
- Activity events reset the timer: mouse move, keydown, click, scroll, touch
- Session auto-extended every 30 minutes of activity via `/api/auth/session/extend`
- Auto-logout with redirect to login on timeout

### Emergency Popup
- Shown once per browser session via `sessionStorage` flag
- 1.2-second delay after login to let auth settle
- Pulsing red modal listing all pending emergency requests for the logged-in role
- Per-row "Take Action" button navigating directly to the correct approval page
- "Go to My Approvals" shortcut in the footer

### Admin Panel
- User creation and password reset
- Entity management with region mapping
- Beneficiary user and active IP management
- IP revocation with security alert email
- Comprehensive audit logs with timeline for every request

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | Reactstrap (Bootstrap 5) |
| State Management | Redux Toolkit + Redux Persist |
| ORM | Prisma 6 |
| Database | PostgreSQL |
| Email | Nodemailer 8 |
| Tables | TanStack React Table 8 |
| Forms | Formik + Yup |
| Dropdowns | React Select 5 |
| Charts | ApexCharts + Chart.js |
| Notifications | react-toastify |
| Auth | HttpOnly Cookie Sessions + CSRF tokens |
| Validation | Zod |
| Styling | SCSS + Bootstrap 5 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                     │
│                                                             │
│  ┌───────────────────┐        ┌──────────────────────────┐  │
│  │   Client Pages    │        │      API Routes          │  │
│  │  (React 19 + RSC) │◄──────►│  /api/ip-request         │  │
│  │                   │        │  /api/auth/*             │  │
│  │  Redux Store      │        │  /api/notifications      │  │
│  │  (layout state)   │        │  /api/entities           │  │
│  └───────────────────┘        │  /api/audit-logs         │  │
│                               │  /api/dashboard/stats    │  │
│                               │  /api/cron/*             │  │
│                               └──────────┬───────────────┘  │
└──────────────────────────────────────────┼──────────────────┘
                                           │
              ┌────────────────────────────┼───────────────┐
              │         Server Layer                        │
              │                           ▼               │
              │  ┌────────────────┐  ┌──────────────┐     │
              │  │  src/lib/auth  │  │ src/lib/     │     │
              │  │  (session +    │  │ mailer       │     │
              │  │   CSRF check)  │  │ (Nodemailer) │     │
              │  └────────────────┘  └──────────────┘     │
              │                                           │
              │  ┌─────────────────────────────────────┐  │
              │  │         Prisma ORM Client            │  │
              │  │   src/server/db/client.ts            │  │
              │  └──────────────────┬──────────────────┘  │
              └─────────────────────┼─────────────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │        PostgreSQL              │
                    │   wbes_ip_whitelist DB         │
                    │                               │
                    │  Organizations, Users,         │
                    │  Sessions, Notifications,      │
                    │  IpRequests, WorkflowLogs,     │
                    │  IpWhitelist, Entities,        │
                    │  BeneficiaryUsers              │
                    └───────────────────────────────┘
```

---

## Workflow

```
                    ┌─────────────┐
                    │  RLDC/NLDC  │  Creates request
                    │  (Initiator)│  Status: UNDER_NLDC_REVIEW
                    └──────┬──────┘
                           │ FORWARD
                           ▼
                    ┌─────────────┐
                    │    NLDC     │  Reviews & approves
                    │             │  Status: SENT_TO_CISO
                    └──────┬──────┘
                           │ FORWARD
                           ▼
                    ┌─────────────┐
                    │    CISO     │  Security review
                    │             │  Status: SENT_TO_SOC
                    └──────┬──────┘
                           │ FORWARD
                           ▼
                    ┌─────────────┐
                    │     SOC     │  Security verification
                    │             │  Status: SOC_VERIFIED
                    └──────┬──────┘
                           │ FORWARD
                           ▼
                    ┌─────────────┐
                    │     IT      │  Implements whitelist
                    │             │  Status: COMPLETED
                    └─────────────┘

At any stage: REJECT  → returns to initiator with remarks
              ADMIN   → can override action at any stage
```

### Status Values

| Status | Meaning |
|---|---|
| `CREATED` | Request submitted, not yet reviewed |
| `UNDER_NLDC_REVIEW` | With NLDC for review |
| `SENT_TO_CISO` | NLDC approved, forwarded to CISO |
| `CISO_APPROVED` | CISO approved |
| `SENT_TO_SOC` | Forwarded to SOC for verification |
| `SOC_VERIFIED` | SOC verified |
| `SENT_TO_IT` | With IT for implementation |
| `WHITELISTED` | IPs whitelisted in system |
| `COMPLETED` | Fully completed |
| `NEED_MORE_INFO` | Sent back for additional information |
| `REJECTED` | Rejected at any stage |

---

## Role-Based Access Control

| Role | Capabilities |
|---|---|
| `RLDC` | Create requests; view own region's requests; modify & resubmit on rejection |
| `NLDC` | Create requests; review all requests; forward or reject at NLDC stage |
| `CISO` | Approve or reject at CISO stage |
| `SOC` | Verify or reject at SOC stage |
| `IT` | Final implementation; mark complete; reject |
| `ADMIN` | Full access; override any stage; delete requests; manage users & entities |

### Regional RLDC Mapping

Each RLDC user belongs to one of the five regional load despatch centres:

| Region | Label | Email (Production) |
|---|---|---|
| Northern | NRLDC | nrldc@grid-india.in |
| Southern | SRLDC | srldc@grid-india.in |
| Western | WRLDC | wrldc@grid-india.in |
| Eastern | ERLDC | erldc@grid-india.in |
| North-Eastern | NERLDC | nerldc@grid-india.in |

The region is resolved from the `initiatorRegion` field on the request, or derived from the submitting user's organisation mapping.

---

## Project Structure

```
wbes-whitelisting/
├── prisma/
│   ├── schema.prisma               # All DB models, enums, relations
│   ├── seed.ts                     # Initial organisations + users
│   └── seed-requests.ts            # 15 dummy requests covering all stages (dev)
│
├── src/
│   ├── app/
│   │   ├── (with-layout)/          # Pages rendered inside the sidebar+header shell
│   │   │   ├── dashboard/
│   │   │   └── modules/
│   │   │       ├── admin/
│   │   │       │   ├── logs/       # Audit logs — filters, sorting, CSV export
│   │   │       │   ├── reports/    # Shared IPs report, analytics
│   │   │       │   ├── sop-workflow/
│   │   │       │   └── users/      # User & entity management
│   │   │       ├── approval/
│   │   │       │   ├── ciso/       # CISO approval queue
│   │   │       │   ├── it/         # IT implementation queue
│   │   │       │   ├── nldc/       # NLDC review queue
│   │   │       │   └── soc/        # SOC verification queue
│   │   │       └── request/
│   │   │           ├── all/        # All requests (RLDC/ADMIN view)
│   │   │           └── create/     # New request form
│   │   │
│   │   ├── (with-nonlayout)/       # Full-screen pages (login, errors)
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       ├── logout/
│   │   │       └── forget-password/
│   │   │
│   │   └── api/                    # All backend API route handlers
│   │       ├── audit-logs/route.ts
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   ├── me/route.ts
│   │       │   └── session/extend/route.ts
│   │       ├── beneficiary-users/
│   │       │   ├── route.ts
│   │       │   └── [username]/
│   │       │       ├── route.ts
│   │       │       └── remove-ip/route.ts
│   │       ├── cron/
│   │       │   └── hourly-alerts/route.ts
│   │       ├── dashboard/stats/route.ts
│   │       ├── entities/route.ts
│   │       ├── global-ips/route.ts
│   │       ├── ip-request/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       ├── action/route.ts       # Approve / Reject / Forward
│   │       │       └── resend-mail/route.ts  # Resend notification email
│   │       ├── notifications/
│   │       │   ├── route.ts
│   │       │   └── read-all/route.ts
│   │       └── reports/shared-ips/route.ts
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── EmergencyPopup.tsx          # Login-time emergency request alert modal
│   │   │   ├── NotificationsDropdown.tsx   # Bell icon + notification list
│   │   │   ├── SessionTimer.tsx            # Idle countdown in the header
│   │   │   ├── TableContainerReactTable.tsx # TanStack table with sort + pagination
│   │   │   └── ProfileDropdown.tsx
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── RoleGuard.tsx               # Client-side role access gate
│   │   └── request/
│   │       ├── AllRequestsTable.tsx        # Request list with filters and actions
│   │       ├── ApprovalActionForm.tsx      # Forward / reject / complete form
│   │       └── CreateRequestForm.tsx       # New request form
│   │
│   ├── layouts/Layouts/
│   │   ├── index.tsx       # Root layout shell (Header + Sidebar + EmergencyPopup)
│   │   ├── Header.tsx      # Header bar: Notifications → SessionTimer → ProfileDropdown
│   │   └── Sidebar.tsx     # Left navigation sidebar
│   │
│   ├── lib/
│   │   ├── auth.ts         # validateSecureSession() — cookie + optional CSRF check
│   │   └── mailer.ts       # Nodemailer singleton + workflow email routing
│   │
│   └── server/
│       ├── db/client.ts                        # Prisma singleton (globalThis cache)
│       ├── repositories/ipRequestRepository.ts # Data access: create, filter, update requests
│       └── services/ipRequestService.service.ts # Business logic: transitions, notifications
│
├── middleware.ts           # Route guard: redirects unauthenticated users to /auth/login
├── .env                    # Secret config (NEVER commit)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Database Schema

### `Organization`

Top-level grouping. Each RLDC/NLDC office is one organisation.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | String | Unique organisation name |
| `createdAt` | DateTime | |

---

### `User`

Portal users. The `role` field determines workflow access.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | String | Display name |
| `email` | String | Unique; used for login |
| `password` | String | bcrypt-hashed |
| `role` | Enum | `RLDC` `NLDC` `CISO` `SOC` `IT` `ADMIN` `USER` |
| `organizationId` | UUID | FK → Organization |
| `createdAt` | DateTime | |

---

### `Session`

One active row per logged-in user.

| Field | Type | Notes |
|---|---|---|
| `sessionToken` | String | Unique 64-char hex; stored in HttpOnly cookie |
| `csrfToken` | String | 64-char hex; returned at login; required on state-changing requests |
| `userId` | UUID | FK → User (cascade delete) |
| `expiresAt` | DateTime | Checked on every authenticated request |
| `userAgent` | String? | Browser info for audit |
| `ipAddress` | String? | Client IP for audit |

---

### `Notification`

In-app notification per user per workflow event.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `userId` | UUID | FK → User (recipient, cascade delete) |
| `title` | String | Short heading (e.g., "New Request Assigned") |
| `message` | String | Detail text |
| `requestId` | String? | Linked IpRequest ID |
| `ticketNo` | String? | For display in the dropdown |
| `link` | String? | URL to navigate to on click |
| `isRead` | Boolean | Default `false`; indexed with `userId` |
| `createdAt` | DateTime | Ordered descending in queries |

---

### `IpRequest`

The central model. One row per whitelisting request.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `ticketNo` | String | Unique; e.g., `WBES-2025-0001` |
| `userId` | UUID | FK → User (submitter) |
| `organizationId` | UUID | FK → Organization |
| `category` | Enum | `NEW_USER` or `EXISTING_USER` |
| `status` | Enum | Current workflow status (see table above) |
| `currentRole` | Enum | Role currently holding the request |
| `submittedByRole` | Enum | Original submitter's role |
| `initiatorRegion` | String? | NRLDC / SRLDC / WRLDC / ERLDC / NERLDC |
| `entityName` | String | Beneficiary organisation name |
| `username` | String | WBES username of the beneficiary |
| `isEmergency` | Boolean | Triggers priority email + popup |
| `duration` | String? | Emergency duration string |
| `isApiAccess` | Boolean | Whether API backend access is requested |
| `ips` | IpRequestIP[] | IP addresses to add |
| `ipToRemove` | String? | Comma-separated IPs to revoke |
| `reason` | String? | Justification from initiator |
| `remarks` | String? | Latest action remarks |
| `logs` | WorkflowLog[] | Full immutable audit trail |

---

### `WorkflowLog`

Immutable audit entry. Created once per action; never updated.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `requestId` | UUID | FK → IpRequest (cascade delete) |
| `stage` | Enum | `NLDC` `CISO` `SOC` `IT` |
| `action` | Enum | `APPROVED` `REJECTED` `FORWARDED` `SENT_BACK` |
| `role` | Enum? | Actor's role |
| `approvedById` | UUID? | FK → User who took the action |
| `remarks` | String? | Actor's comments |
| `createdAt` | DateTime | Immutable timestamp |

---

### `IpRequestIP`

Individual IP address entry linked to a request.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `requestId` | UUID | FK → IpRequest (cascade delete) |
| `ipAddress` | String | Single IPv4 address |
| `createdAt` | DateTime | |

---

### `IpWhitelist`

Record of an IP that has been actively whitelisted.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `userId` | String | WBES username |
| `ipAddress` | String | Whitelisted IP |
| `active` | Boolean | `false` when revoked |
| `requestId` | String? | Source request reference |
| `createdAt` | DateTime | |

---

### `Entity`

External organisation (SLDC, utility company, etc.).

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | String | Unique entity name |
| `region` | String? | NR / SR / WR / ER / NER |
| `beneficiaryUsers` | BeneficiaryUser[] | |
| `controllerMappings` | EntityControllerMapping[] | |

---

### `BeneficiaryUser`

End-user (WBES login) whose IPs are being managed.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `entityId` | UUID | FK → Entity (cascade delete) |
| `username` | String | Unique WBES username |
| `contactPerson` | String? | |
| `email` | String? | |
| `phone` | String? | |
| `location` | String? | |
| `activeIps` | BeneficiaryUserIP[] | Currently whitelisted IPs |

---

### `EntityControllerMapping`

Maps which portal users (RLDC controllers) manage which entities.

| Field | Type | Notes |
|---|---|---|
| `entityId` | UUID | FK → Entity |
| `controllerId` | UUID | FK → User |
| | | Unique composite `(entityId, controllerId)` |

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Validate credentials; set HttpOnly cookie; return CSRF token |
| POST | `/api/auth/logout` | Cookie | Clear session cookie and DB record |
| GET | `/api/auth/me` | Cookie | Return current user profile and role |
| POST | `/api/auth/session/extend` | Cookie | Extend session expiry by 8 hours from now |

**Login Response**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "NLDC User",
    "role": "NLDC",
    "organizationId": "..."
  },
  "csrfToken": "<64-char hex>"
}
```

Store `csrfToken` in `sessionStorage("csrfToken")`. Send it as the `x-csrf-token` header on all POST/PUT/DELETE requests.

---

### IP Requests

| Method | Endpoint | CSRF | Description |
|---|---|---|---|
| GET | `/api/ip-request` | No | List requests filtered by `?role=&orgId=` |
| POST | `/api/ip-request` | Yes | Create new request |
| GET | `/api/ip-request/[id]` | No | Full request detail including logs and IPs |
| DELETE | `/api/ip-request/[id]` | Yes | Admin-only permanent delete |
| POST | `/api/ip-request/[id]/action` | Yes | Approve / Reject / Forward; advances workflow |
| POST | `/api/ip-request/[id]/resend-mail` | No | Resend current-stage notification email |

**Action Request Body**
```json
{
  "action": "APPROVE",
  "remarks": "All IPs verified against the entity's network plan.",
  "modifiedIps": "10.0.0.1, 10.0.0.2",
  "modifiedIpToRemove": "192.168.1.5"
}
```

**Action values:** `APPROVE`, `REJECT`, `FORWARD`, `COMPLETE`

---

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | Return up to 30 latest notifications with `unreadCount` |
| POST | `/api/notifications/read-all` | Mark all notifications as read for the session user |

**GET Response**
```json
{
  "success": true,
  "unreadCount": 3,
  "data": [
    {
      "id": "...",
      "title": "New Request Assigned",
      "message": "WBES-2025-0012 is pending your review at NLDC stage.",
      "link": "/modules/approval/nldc",
      "ticketNo": "WBES-2025-0012",
      "isRead": false,
      "createdAt": "2025-04-26T10:00:00.000Z"
    }
  ]
}
```

---

### Audit Logs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/audit-logs` | All requests with full workflow logs for the authenticated role's jurisdiction |

---

### Entities & Beneficiary Users

| Method | Endpoint | CSRF | Description |
|---|---|---|---|
| GET | `/api/entities` | No | List entities for the role/region |
| POST | `/api/entities` | Yes | Create new entity |
| PUT | `/api/entities` | Yes | Update entity |
| GET | `/api/beneficiary-users` | No | List WBES beneficiary users |
| POST | `/api/beneficiary-users` | Yes | Create beneficiary user |
| PUT | `/api/beneficiary-users/[username]` | Yes | Update beneficiary user |
| POST | `/api/beneficiary-users/[username]/remove-ip` | Yes | Revoke a specific IP address |

---

### Dashboard & Reports

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/stats` | Request counts per status, emergency count, recent activity |
| GET | `/api/reports/shared-ips` | IPs whitelisted across multiple beneficiary users |
| GET | `/api/global-ips` | All currently active whitelisted IPs |

---

### Cron Job

| Method | Endpoint | Auth Header | Description |
|---|---|---|---|
| GET | `/api/cron/hourly-alerts` | `Authorization: Bearer <CRON_SECRET>` | Send escalation emails for overdue emergency requests |

Configure an external cron scheduler (cPanel, GitHub Actions, etc.) to call this endpoint every hour.

---

## Authentication & Security

### Session Flow

```
1.  User POSTs credentials to /api/auth/login
2.  Server bcrypt-compares password
3.  Server creates Session row:
      sessionToken = crypto.randomBytes(32).toString('hex')
      csrfToken    = crypto.randomBytes(32).toString('hex')
      expiresAt    = now + 8h
4.  Server sets HttpOnly, SameSite=Strict cookie
5.  Server returns csrfToken in JSON body
6.  Client saves csrfToken to sessionStorage("csrfToken")
7.  All state-changing requests include header: x-csrf-token: <token>
8.  validateSecureSession(req, true) on server verifies:
      a. Cookie present
      b. Session exists in DB and not expired
      c. x-csrf-token header matches session.csrfToken
```

### `validateSecureSession(req, requireCsrf)` — `src/lib/auth.ts`

Called at the top of every API route handler.

```typescript
// Read-only (GET) endpoints
const user = await validateSecureSession(req, false);

// State-changing (POST / PUT / DELETE) endpoints
const user = await validateSecureSession(req, true);
```

Returns the validated `User` object. Throws with HTTP-mapped messages:

| Error Message | HTTP Status |
|---|---|
| `Unauthorized - No session cookie found` | 401 |
| `Unauthorized - Session expired or invalid` | 401 |
| `Forbidden - Missing CSRF Token` | 403 |
| `Forbidden - CSRF Token Mismatch` | 403 |

### Cookie Configuration

| Environment | Cookie Name | Notes |
|---|---|---|
| Development | `wbes_session` | Standard cookie |
| Production | `__Host-session` | Enforces HTTPS-only, no `Domain`, max CSRF protection |

---

## Email Notifications

### Mailer Architecture (`src/lib/mailer.ts`)

The mailer uses a **lazy singleton** pattern:

```
First sendMail() call:
  → getTransporter() checks env vars
  → creates Nodemailer transport
  → caches in module-scoped _transporter

Subsequent calls:
  → reuses cached transporter (no reconnect overhead)

On failure:
  → error logged to console
  → exception suppressed — email failure NEVER breaks the workflow
```

### Email Routing Logic

| Scenario | To | CC |
|---|---|---|
| Forward / Approve | Next role in chain | All prior roles + MAIL_CC_ALWAYS |
| Final completion (IT) | Original initiator | All prior approvers + MAIL_CC_ALWAYS |
| Rejection | Original initiator | NLDC + all intermediate approvers + MAIL_CC_ALWAYS |
| Emergency overdue (cron) | Current pending role | Adjacent roles + MAIL_CC_ALWAYS |
| IP revocation | IT desk | Full chain + MAIL_CC_ALWAYS |

### Role Email Map (update for production)

| Role | Email |
|---|---|
| NLDC | nldc@gridindia.in |
| CISO | ciso@gridindia.in |
| SOC | soc@gridindia.in |
| IT | it@gridindia.in |
| NRLDC | nrldc@gridindia.in |
| SRLDC | srldc@gridindia.in |
| WRLDC | wrldc@gridindia.in |
| ERLDC | erldc@gridindia.in |
| NERLDC | nerldc@gridindia.in |

### Exported Email Functions

```typescript
// Triggered at every workflow action (approve / reject / complete)
sendWorkflowEmail(
  ticketNo: string,
  entityName: string,
  action: string,         // "APPROVE" | "REJECT" | ...
  actorRole: string,
  remarks: string,
  initiatorRole: string,
  initiatorRegion: string
): Promise<void>

// Triggered hourly by cron for overdue emergency requests
sendAlertEmail(
  ticketNo: string,
  entityName: string,
  currentRole: string,
  initiatorRegion: string,
  submittedByRole: string,
  hoursPending: number
): Promise<void>

// Triggered on manual IP revocation through admin panel
sendRevocationEmail(params: {
  username: string,
  entityName: string,
  revokedIps: string[],
  actorRole: string,
  actorName: string,
  region: string
}): Promise<void>
```

---

## In-App Notifications

### Notification Creation (`/api/ip-request/[id]/action/route.ts`)

After every successful workflow action, notifications are bulk-created:

| Event | Recipients |
|---|---|
| Forward to next role | All users whose `role` matches `nextRole` |
| Completion (IT done) | The original request submitter |
| Rejection | The original request submitter |

Each notification includes a `link` field pointing to the recipient's approval page (e.g., `/modules/approval/ciso`).

### `NotificationsDropdown` Component

```
Mount → GET /api/notifications → render bell with badge
Every 30s → re-fetch → update badge
On dropdown open → POST /api/notifications/read-all → badge clears
On notification click → router.push(notification.link)
```

---

## Session Management

### `SessionTimer` Component (`src/components/Common/SessionTimer.tsx`)

| Constant | Value | Description |
|---|---|---|
| `IDLE_TIMEOUT_S` | 1800s (30 min) | Time before forced logout |
| `WARN_AT_S` | 300s (5 min) | Yellow warning starts |
| `DANGER_AT_S` | 120s (2 min) | Red pulsing danger state |
| `EXTEND_EVERY_MS` | 1,800,000ms (30 min) | Minimum gap between server extension calls |

**Tracked activity events:** `mousemove`, `keydown`, `mousedown`, `touchstart`, `scroll`

**On any activity event:**
1. Update `lastActivityRef` timestamp
2. If `now - lastExtendRef > EXTEND_EVERY_MS` → call `POST /api/auth/session/extend`
3. Visible countdown resets

**On timeout (counter hits 0):**
1. Call `POST /api/auth/logout`
2. Redirect to `/auth/login`

---

## Environment Variables

Create a `.env` file in the project root. This file must **never** be committed.

```env
# ── Database ────────────────────────────────────────────────────
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wbes_ip_whitelist"

# ── SMTP / Email ────────────────────────────────────────────────
SMTP_HOST="mail.grid-india.in"
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER="your-email@grid-india.in"
SMTP_PASS="your-password"
SMTP_FROM="your-email@grid-india.in"
SMTP_TLS_REJECT_UNAUTHORIZED=false
MAIL_CC_ALWAYS="your-email@grid-india.in"

# ── Security ────────────────────────────────────────────────────
CRON_SECRET=replace-with-a-random-secret-string

# ── Public App URL (used in email links) ────────────────────────
NEXT_PUBLIC_DEV_API_URL="http://localhost:3000"

# ── Google reCAPTCHA (optional) ─────────────────────────────────
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-site-key"
RECAPTCHA_SECRET_KEY="your-secret-key"
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SMTP_HOST` | Yes | Mail server hostname |
| `SMTP_PORT` | Yes | `25` (relay) or `587` (STARTTLS) |
| `SMTP_SECURE` | Yes | `true` for port 465 only |
| `SMTP_USER` | Yes | SMTP login username or email |
| `SMTP_PASS` | Yes | SMTP password |
| `SMTP_FROM` | Yes | From address shown to recipients |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | No | Set `false` in dev for self-signed certs |
| `MAIL_CC_ALWAYS` | No | Address always included in CC on every workflow email |
| `CRON_SECRET` | Yes | Bearer token checked by `/api/cron/hourly-alerts` |
| `NEXT_PUBLIC_DEV_API_URL` | No | Portal base URL embedded in email links |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | No | Google reCAPTCHA v2 site key |
| `RECAPTCHA_SECRET_KEY` | No | Google reCAPTCHA v2 secret |

---

## Local Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/wbes-whitelisting.git
cd wbes-whitelisting

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env
# Edit .env with your actual values

# 4. Create the PostgreSQL database
psql -U postgres -c "CREATE DATABASE wbes_ip_whitelist;"

# 5. Apply migrations
npx prisma migrate deploy

# 6. Generate the Prisma client
npx prisma generate

# 7. Seed initial users and organisations
npx ts-node prisma/seed.ts

# 8. (Optional) Seed dummy requests for development
npx ts-node prisma/seed-requests.ts

# 9. Start the development server
npm run dev
```

The portal will be available at **http://localhost:3000**.

### Default Login Credentials (after seeding)

| Role | Email | Password |
|---|---|---|
| Admin | admin@grid-india.in | Password@123 |
| NLDC | nldc@grid-india.in | Password@123 |
| CISO | ciso@grid-india.in | Password@123 |
| SOC | soc@grid-india.in | Password@123 |
| IT | it@grid-india.in | Password@123 |
| SRLDC | srldc@grid-india.in | Password@123 |

---

## Seeding the Database

### `prisma/seed.ts`

Creates the initial set of organisations and portal users. Run once after the first migration.

### `prisma/seed-requests.ts`

Creates 15 dummy IP whitelisting requests for development and testing:

- Requests at every status from `UNDER_NLDC_REVIEW` through `COMPLETED`
- Both emergency and non-emergency variants
- CIDR and individual IP entries
- Requests from multiple regional RLDCs (NRLDC, SRLDC, WRLDC, ERLDC, NERLDC)
- Complete `WorkflowLog` audit trail for completed and rejected entries

```bash
npx ts-node prisma/seed-requests.ts
```

---

## Key Components

### `AllRequestsTable` — `src/components/request/AllRequestsTable.tsx`

The primary request listing component used by all role-specific approval pages and the all-requests view.

**Data Flow:**
```
Mount → GET /api/ip-request?role=&orgId=
      → GET /api/entities
      → GET /api/beneficiary-users
      → apply client-side filters → render table
```

**Filter Bar:**
- **Status**: multi-select (all workflow statuses)
- **Category**: single-select (New User / Existing User)
- **Region**: single-select (NLDC / NRLDC / SRLDC / WRLDC / ERLDC / NERLDC)
- **Emergency**: toggle button

**Per-Row Actions:**
- **Take Action** (green) — opens action modal for the user's turn
- **Override Action** (amber) — Admin acting outside their natural turn
- **Resend Mail** (icon button) — calls `/api/ip-request/[id]/resend-mail`
- **Delete** (red icon, Admin only) — opens confirmation modal

**Action Modal:**
- Top panel: entity, username, API access, category
- IP section: editable CreatableSelect for IPs to add/remove (when it is the user's turn)
- Workflow timeline: chronological log of all prior actions
- `ApprovalActionForm` at the bottom for submitting the decision

---

### `ApprovalActionForm` — `src/components/request/ApprovalActionForm.tsx`

Renders the correct form fields based on the current role's capabilities:

| Role | Available Actions |
|---|---|
| RLDC | Modify & Resubmit |
| NLDC | Forward to CISO / Reject |
| CISO | Forward to SOC / Reject |
| SOC | Forward to IT / Reject |
| IT | Mark Complete / Reject |
| ADMIN | Any of the above depending on `currentRole` |

Sends `POST /api/ip-request/[id]/action` with `x-csrf-token` header.

---

### `SessionTimer` — `src/components/Common/SessionTimer.tsx`

Displayed in the header right panel between the notification bell and profile dropdown.

- Renders `MM:SS` countdown
- Colour transitions: default → warning yellow (5 min) → danger red pulsing (2 min)
- Calls `POST /api/auth/session/extend` when the user is active, debounced to once per 30 minutes
- On expiry: calls `POST /api/auth/logout`, then `router.push('/auth/login')`

---

### `NotificationsDropdown` — `src/components/Common/NotificationsDropdown.tsx`

Bell icon with live badge in the header.

```
Poll every 30s → unreadCount badge updates
Bell click → open dropdown, POST read-all, badge clears
Notification click → router.push(link)
```

Shows up to 30 notifications with `timeAgo` relative timestamps (e.g., "2 hours ago").

---

### `EmergencyPopup` — `src/components/Common/EmergencyPopup.tsx`

Full-screen overlay shown once per login session.

```
Mount (in root Layout) → wait 1.2s
→ GET /api/auth/me   → get role
→ GET /api/ip-request?role=...
→ filter: isEmergency=true AND status not COMPLETED/REJECTED
→ if any found: open modal, set sessionStorage flag
```

Modal features:
- Pulsing red header (`em-pulse` CSS animation)
- Card per emergency request: ticket, entity, pending role, hours waiting
- "Take Action" → `router.push(ROLE_LINK[req.currentRole])`
- "Go to My Approvals" → `router.push(ROLE_LINK[userRole])`
- Dismiss closes without navigating

---

### `TableContainerReactTable` — `src/components/Common/TableContainerReactTable.tsx`

Reusable TanStack React Table v8 wrapper.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `columns` | ColumnDef[] | Column definitions with `enableSorting` |
| `data` | any[] | Filtered data array |
| `isGlobalFilter` | boolean | Show the fuzzy search input |
| `customPageSize` | number | Default rows per page |
| `SearchPlaceholder` | string | Search input placeholder text |
| `tableClass` | string | CSS classes for `<table>` |
| `theadClass` | string | CSS classes for `<thead>` |

**Sort Indicators:**
- `⇅` (dimmed) — column is sortable but currently unsorted
- `▲` — sorted ascending
- `▼` — sorted descending

Click any sortable header to toggle direction. Second click on the same column reverses direction.

---

## Pages & Routes

### Authenticated Routes (require `wbes_session` cookie)

| Path | Access | Description |
|---|---|---|
| `/dashboard` | All roles | Summary statistics and recent activity |
| `/modules/request/create` | RLDC, NLDC | New IP request form |
| `/modules/request/all` | RLDC, NLDC, ADMIN | All requests with full filter bar |
| `/modules/approval/nldc` | NLDC, ADMIN | NLDC review queue |
| `/modules/approval/ciso` | CISO, ADMIN | CISO approval queue |
| `/modules/approval/soc` | SOC, ADMIN | SOC verification queue |
| `/modules/approval/it` | IT, ADMIN | IT implementation queue |
| `/modules/admin/logs` | All roles | Audit log history with filters, sorting, CSV export |
| `/modules/admin/users` | ADMIN | User, entity, and beneficiary user management |
| `/modules/admin/reports` | ADMIN, NLDC | Shared IPs report and analytics |
| `/modules/admin/sop-workflow` | ADMIN | Standard Operating Procedure document viewer |

### Public Routes (no login required)

| Path | Description |
|---|---|
| `/auth/login` | Login form with Google reCAPTCHA |
| `/auth/logout` | Session termination + cookie clear |
| `/auth/forget-password` | Password reset request form |

---

## License

Internal use only — **Grid Controller of India Limited (GRID-INDIA)**.  
All rights reserved.
