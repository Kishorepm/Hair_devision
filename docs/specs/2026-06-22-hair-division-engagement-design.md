# Hair Division — Engagement Design

- **Date:** 2026-06-22
- **Status:** Approved (backbone); sub-projects pending their own specs
- **Author:** Kish (consultant) — for Hair Division, Takapuna
- **JD address:** 24 Hair Division

## Context

Hair Division is an operating, scaling hair salon at **446 Lake Road, Takapuna,
Auckland** (ph 09 488 9295), owned by **Raine** (30+ years' experience). Kish is
engaged as a **freelance consultant** to grow the business and make it easier to
run. Raine is a **first-time business owner** and non-technical, so everything
built must be low-maintenance and simple to operate after handover.

**Current state of the digital/admin stack:**

- Website: a dated **Wix** one-pager at `hairdivision.co.nz` (Home/About/Services/
  Contact all scroll the same page). Has prices and bio; **no online booking, no
  testimonials, no staff gallery, no social integration.**
- A POS / card system exists (specific vendor **to confirm**).
- Otherwise **mostly manual** — paper diary, spreadsheets, phone/DM bookings, lots
  of admin by hand. **No online booking system.**

The gap is clear: a weak front door, zero online booking, and manual admin.

## Goal / North Star

**Grow Hair Division's revenue/profit while cutting the owner's admin load.**
The growth levers — utilization, retention, retail attach — and admin reduction
all hang beneath this as supporting objectives (see OKR tree).

## Scope

**This engagement = a small portfolio, not one project.** It is delivered as a
shared backbone plus four sub-projects, each sequenced and each getting its **own**
spec → plan → build cycle. We do not design all sub-projects up front.

**In scope (this spec):**

- A new **standalone git repo** (`hair-division`), independent of the Nex_Doc monorepo.
- The **OKR tree** as the first real artifact.
- Repo structure, README, handover scaffolding.
- Register `24 Hair Division` in the JDex; write a project memory note.

**Out of scope here (each its own future spec):** the website rebuild, booking
SaaS setup, admin dashboard, and growth automations — see the roadmap below.

## Decisions locked

1. **Operating model:** fixed salon, operating/scaling stage.
2. **Build philosophy:** SaaS core + custom glue. Proven salon SaaS owns
   booking/reminders/POS (commodity, low-maintenance); the repo owns the rebuilt
   website, dashboards, automations, and integrations on top.
3. **Website build:** Next.js (Kish's stack) + a simple CMS so Raine can edit
   prices/hours/photos herself. Booking handled by the SaaS widget, embedded.
4. **North Star:** grow revenue/profit (OKR apex).
5. **Sequencing:** website-first, then booking SaaS, then admin dashboard, then
   growth automations. Constraint: the rebuilt site must embed online booking at
   launch, so the booking SaaS is *chosen* early even though it's fully configured
   after the site ships.
6. **Repo placement:** the repo root is the `24 Hair Division` JD folder itself, so
   it stays findable in the JD system while being its own git repo. The Nex_Doc
   monorepo will `.gitignore` (and `.graphifyignore`) this folder to avoid a tangled
   nested repo.

## Repo structure

```
hair-division/                  <- standalone git repo (root = "24 Hair Division" folder)
|- README.md                    overview . how to run . handover index
|- docs/
|  |- okrs/
|  |  |- okr-tree.md            the OKR tree below
|  |  |- reviews/               monthly/quarterly check-ins
|  |- strategy/                 operating model . KPI definitions . positioning
|  |- specs/                    brainstorm design docs (this file)
|  |- handover/                 plain-English how-to guides for Raine
|- web/                         Next.js site + simple CMS   (sub-project 1)
|- tools/                       dashboards & automations    (sub-projects 3-4)
|- .gitignore
```

## OKR tree

North Star = grow revenue while cutting owner admin. Four lever-objectives beneath
it; the four sub-projects are the *initiatives* that move the KRs.

**Targets are placeholders** until 3 baselines are captured from Raine: current
monthly revenue, current owner admin hrs/week, current no-show %. Bracketed numbers
are illustrative examples to make the shape concrete, not committed targets.

> **O0 — North Star (annual):** A more profitable Hair Division that runs with less owner effort.
> - KR0.1 Monthly revenue **+[20]%** vs. today's baseline
> - KR0.2 Owner admin **[8] -> [<3] hrs/week**
> - KR0.3 Rebooking rate to **[60]%**

> **O1 — Get found & booked online** *(front door)*
> - KR1.1 New site live; **[50]%** of bookings online within 90 days
> - KR1.2 No-shows **[15] -> [<5]%**
> - KR1.3 Top-3 Google for "hair salon Takapuna"; **[40]** reviews
> - *Initiatives: Website rebuild, Booking SaaS setup*

> **O2 — Fill the chairs** *(utilization)*
> - KR2.1 Chair utilization **[55] -> [75]%**
> - KR2.2 Off-peak (Tue/Wed AM) bookings **+[30]%**
> - *Initiatives: automated rebooking + waitlist fill*

> **O3 — Grow value per visit** *(retention + retail)*
> - KR3.1 8-week return rate to **[50]%**
> - KR3.2 Retail attach / avg ticket **+[15]%**
> - *Initiatives: retention & retail-prompt automations*

> **O4 — Make it run itself** *(admin reduction)*
> - KR4.1 One dashboard = all KPIs, zero manual reporting
> - KR4.2 Reminders/reporting fully automated
> - *Initiatives: Admin dashboard, Growth automations*

## Sub-project roadmap (website-first)

1. **Website rebuild** — Next.js + simple CMS (Raine edits prices/hours/photos),
   embeds the booking widget, local-SEO + Google Business Profile,
   testimonials/staff gallery the current site lacks. *Optional:* use the **Wix MCP**
   (`https://mcp.wix.com/mcp`) to pull existing content out via API during migration.
2. **Booking SaaS** — pick + stand up (decision below); embedded in the site at
   launch, then fully configured (services, reminders, no-show protection).
3. **Admin dashboard** — pulls booking/POS data into one KPI view mapped to the OKRs.
4. **Growth automations** — rebooking nudges, retention, retail prompts, off-peak fill.

**Booking SaaS — decision to finalise (depends on POS):** if POS is **Square** ->
**Square Appointments** (single system). Otherwise candidates are **Timely**
(NZ-built, Auckland, salon-grade) or **Fresha** (free + marketplace exposure).
Locked at the start of sub-project 1 so the embed is ready.

## Tech & handover constraints

- **Stack:** Next.js + simple CMS for the site; booking/POS = SaaS; tools =
  lightweight (Next.js API routes / scripts). Nothing Raine must babysit.
- **Handover-first:** every sub-project ships a plain-English guide in
  `docs/handover/`. No developer needed for day-to-day operation.
- **Low-maintenance bias:** prefer managed/hosted over self-run; SaaS owns commodity flows.

## Open items / inputs awaited

- **Current logo** (from Kish) — feeds website visual design.
- **Raine's brief** — what she wants — feeds website design + execution.
- **OKR baselines** — current monthly revenue, admin hrs/week, no-show % — to set real KR targets.
- **POS vendor** — to confirm; decides the booking SaaS pick.
- **Booking SaaS choice** — finalised at the start of the website sub-project.
- **Current opening hours** — the live site's hours look garbled; confirm with Raine.

## Backbone deliverables (what implementation builds now)

1. Repo structure + `.gitignore` + `README.md`.
2. `docs/okrs/okr-tree.md` (the tree above, targets as placeholders).
3. `docs/handover/` scaffold + `docs/strategy/` placeholder for KPI definitions.
4. Register `24 Hair Division` in `40-49 Brain/00 Index/JDex.md`.
5. Project memory note + MEMORY.md index pointer.
6. Nex_Doc `.gitignore` / `.graphifyignore` entry for this folder.
