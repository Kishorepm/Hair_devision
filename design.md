# Hair Division — Website Design Brief

A self-contained brief for designing the **Hair Division** website. Hand it to any
design tool (v0, Lovable, Stitch, Figma AI, Claude, etc.) to reproduce or remix this
direction. A working reference build lives at [`web/index.html`](web/index.html).

---

## 1. The ask (paste-ready)

> Design a **high-end, premium, editorial landing page** for **Hair Division**, a
> boutique hair salon in Takapuna, Auckland (NZ). One long scrolling page. The feeling
> is calm luxury — unhurried, expensive, confident — closer to a fashion-house or fine
> skincare site than a typical salon. Lead on the owner's 30 years of craft, not on
> discounts. Use the brand palette and type below exactly. Signature motif: **the arch**.
> Sections: sticky nav → hero → promise statement → services & pricing → atmosphere
> gallery → team → visit/booking → footer. Must be fully responsive and accessible.

**Single job of the page:** make a first-time visitor feel this is a premium salon and
get them to **book** (or call).

---

## 2. Brand

- **Name:** Hair Division · **Locality tag:** Takapuna
- **Where:** 446 Lake Road, Takapuna, Auckland, New Zealand
- **People:** **Raine** — owner & senior stylist, 30+ years' experience. **Ivy** — stylist.
- **Products:** Wella premium range (in-salon retail).
- **Positioning:** a small, expert salon where you're listened to and never rushed; you
  leave looking and feeling your best every visit.
- **Tone of voice:** warm, confident, understated. Plain elegant English. No exclamation
  marks, no salesy hype, no clichés ("pamper yourself", "tresses"). Sentence case.

---

## 3. Visual direction

- **Mood:** editorial boutique · porcelain calm · eucalyptus · quiet luxury · generous
  whitespace · high-contrast serif display.
- **Signature element — the arch.** Feature photos sit in an arched frame (rounded top,
  near-flat bottom). It's drawn from two real brand cues: the salon's black cathedral-arch
  product shelf, and the circular logo. Reuse the arch for hero, team, and feature imagery.
  A thin sage **circle outline** accent behind the hero echoes the logo.
- **Restraint:** spend boldness on the arch + the oversized serif headline; keep
  everything else quiet. Lots of negative space.
- **Avoid:** generic salon-template looks, stocky gradients, drop-shadowed cards,
  rainbow service icons, cramped layouts, centered everything. Not a "cream-bg +
  terracotta" AI default — the accent is **eucalyptus sage**, from the real logo.

---

## 4. Design tokens

### Colour
| Token | Hex | Role |
|-------|-----|------|
| Ink | `#20231F` | primary text, dark buttons, footer bg |
| Ink soft | `#5B5F57` | secondary/body text |
| Sage | `#6F9C8E` | brand accent (from logo), thin accents |
| Sage deep | `#4D756A` | eyebrows, links, button hover |
| Sage mist | `#EEF3F0` | tinted section background |
| Porcelain | `#F7F5F0` | page background |
| Paper | `#FFFFFF` | cards, floating tags |
| Sand | `#E7DFD2` | warm neutral (gallery gutter) |
| Line | `rgba(32,35,31,.14)` | hairline dividers |

### Typography
- **Display / headings:** *Cormorant Garamond* (serif), weights 400/500/600 + italic.
  High-contrast, elegant, echoes the logo's letterforms. **Used sparingly** — headlines,
  section titles, service names, names.
- **Body / UI / labels:** *Jost* (geometric sans), weights 300/400/500. Body text is
  **300 (light)** for an airy feel.
- **Eyebrows/labels:** Jost, uppercase, `letter-spacing: .26–.42em` (wide tracking, like
  the "TAKAPUNA" in the logo).
- **Scale (fluid):**
  - h1 hero: `clamp(2.9rem, 6.6vw, 5.6rem)`, line-height 1.02
  - section h2: `clamp(2.1rem, 4.6vw, 3.6rem)`
  - statement: `clamp(1.7rem, 3.7vw, 2.9rem)`
  - body: ~1.05rem · eyebrow: .72rem · nav: .78rem
- **Italic accent:** key words in headlines set in Cormorant *italic* + sage-deep colour.

### Shape, depth, motion
- **Arch radius:** `border-radius: 50% 50% 8px 8px / 42% 42% 5px 5px`.
- **Corner radius (non-arch):** 5–8px (minimal).
- **Shadows:** soft, large, low-opacity, e.g. `0 40px 80px -40px rgba(32,35,31,.45)`.
- **Motion:** fade + 26px rise on scroll-into-view, `1s cubic-bezier(.22,.61,.36,1)`;
  sticky nav goes translucent/blurred after 40px scroll; image hover scale 1.04.
  **Respect `prefers-reduced-motion`** (disable all of it).

### Layout
- Outer padding: `clamp(20px, 6vw, 120px)`. Section vertical padding: `clamp(70px, 11vw, 150px)`.
- Hero: editorial 2-col split (~1.05fr text / .95fr image).
- Services: 3 columns. Team: 2 columns. Atmosphere: 2-up image band.
- **Mobile (<900px):** everything collapses to 1 column; nav becomes a slide-in panel
  behind a burger.

---

## 5. Logo & photography

- **Logo:** circular mark — "HD" monogram (charcoal H + sage D sharing a crossbar),
  "HAIR DIVISION" wordmark, dot divider, "TAKAPUNA", inside a thin sage ring.
  File: `web/assets/logo.png`. In the nav: small round mark + wordmark lockup.
- **Photo inventory** (real photos in `web/assets/`, web-optimised to ~1800px):
  | File | Subject | Used for |
  |------|---------|----------|
  | `img_8232.jpg` | **Ivy** — glossy dark wavy hair | hero + team |
  | `img_8233.jpg` | **Raine** — portrait | team |
  | `img_0057.jpg` | Raine in the salon (wide) | visit aside |
  | `img_0081.jpg` | salon floor (wide) | atmosphere |
  | `img_0066.jpg` | Wella products on the arch shelf | atmosphere |
- **Real vs generated:** keep **people and the real interior photographic** (authenticity
  + local trust + SEO). Generated images (e.g. Nano Banana Pro) only for **non-literal**
  assets — an abstract sage/eucalyptus/silk **hero backdrop**, service-detail macros
  (strands, colour swatch, scissors), a favicon, and a social-share image.
- **Gap:** only one photo of Ivy exists (currently reused in hero + team). A dedicated
  Ivy portrait + a few styled "result" shots would be the highest-value real upgrade.

---

## 6. Page structure & content

Real copy below — use it. `⚠` marks data to confirm with Raine.

**Nav (sticky):** logo lockup · Services · Team · Visit · **Book** button.

**Hero** — editorial split.
- Eyebrow: `Hair salon · North Shore, Auckland`
- Headline: **"Beautiful hair, *thirty years* in the making."** (italic on "thirty years")
- Sub: "Hair Division is Raine's Takapuna salon — expert cut, colour and care in a calm,
  unhurried space, with Wella's premium range."
- Buttons: **Book an appointment** (solid) · **View services** (ghost)
- Image: Ivy's hair shot in an arch + thin sage circle behind + small floating tag
  "Cut · Colour · Care / Since the 90s".

**Promise statement** — full-width, centered, big serif:
> "A small salon with a simple promise — you leave looking and feeling your best, *every* visit."

**Services & pricing** — 3 columns, typeset list (name left, price right), not cards.
`⚠ Prices below are from the old site + estimates — confirm the real menu with Raine.`
- *Cut & Style:* Women's cut from $110 · Men's cut $65 · Student cut (on request) ·
  Blow wave from $55 · Occasion styling (on request)
- *Colour:* Regrowth colour from $110 · Half-head foils from $142 · Full-head foils to
  $210 · Toner / gloss (on request)
- *Treatments:* Conditioning treatment (add-on) · Smooth filler treatment from $250 ·
  Wella home care (in salon)
- Note line: "Prices shown are starting points. Your exact quote is confirmed in a quick
  consultation."

**Atmosphere** — 2-up image band (salon floor + Wella shelf) with italic captions
("Calm, light and unhurried." / "The Wella range, in store.").

**Team** — 2 arched portraits, centered.
- Heading: "The hands behind your hair."
- **Raine** — *Owner & Senior Stylist* — "Thirty-plus years behind the chair. Raine
  built Hair Division around unhurried, expert care — you're listened to, never rushed."
- **Ivy** — *Stylist* — "A fresh eye for modern cut, colour and styling. Book with Raine
  or Ivy — both take appointments."

**Visit** — details list + image.
- Where: 446 Lake Road, Takapuna, Auckland
- Call: 09 488 9295
- Hours `⚠ confirm`: Tue–Fri 9:15am–5:30pm · Thu until 7:00pm · Sat 9:00am–4:00pm ·
  Sun & Mon closed
- CTA: **Call to book** (`tel:094889295`)

**Footer** — round logo · "446 Lake Road, Takapuna · 09 488 9295" ·
"Tuesday – Saturday by appointment".

---

## 7. Technical target (for the real build)

- **Stack:** Next.js + a simple CMS (so the owner can edit prices/hours/photos). The
  current `web/index.html` is a static mockup of the look only.
- **Booking:** handled by a salon SaaS (TBD — Timely / Fresha / Square Appointments),
  embedded; the site's "Book" buttons point to it.
- **Quality floor:** responsive to mobile, visible keyboard focus, `prefers-reduced-motion`
  respected, alt text on images, fast (compress images, lazy-load below the fold).
- **Extras to generate:** favicon + Open Graph/social-share image from the logo; local
  SEO basics (title, meta description, LocalBusiness schema, Google Business Profile link).

---

## 8. Open items
- ⚠ Real service menu + prices (confirm with Raine)
- ⚠ Real opening hours (old site's were contradictory)
- POS vendor (decides booking SaaS) · booking SaaS choice
- Dedicated Ivy portrait + styled "result" shots
- Decide which generated assets to use (hero backdrop? service macros?)

---

## 9. References
- Current (old) site: https://www.hairdivision.co.nz/ (dated Wix one-pager, no online booking)
- Working reference build: [`web/index.html`](web/index.html)
- Brand assets: [`web/assets/`](web/assets/)
