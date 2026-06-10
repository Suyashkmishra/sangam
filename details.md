# 🎨 SANGAM — Frontend Development Prompt

## Project Overview

Build the complete frontend for **SANGAM** — a cultural bridge platform that connects **young emerging poets and musicians** with **experienced masters and mentors** for content verification, guidance, and recognition.

The name "Sangam" evokes confluence — the sacred meeting of rivers — and the UI should feel like that: two worlds flowing together into something greater.

---

## Brand Identity & Aesthetic Direction

### Theme
**"Sacred Ink meets Digital Soul"** — A rich, editorial Indian-arts aesthetic. Think the texture of handmade paper, the elegance of Devanagari calligraphy, warm lamp-lit evenings at a mushaira (poetry gathering), blended with a clean modern digital interface.

### Color Palette
- **Primary**: Deep Saffron `#C45C1A` or Vermilion `#C0392B`
- **Secondary**: Aged Ivory / Parchment `#F5ECD7`
- **Dark Background**: Deep Indigo / Charcoal `#1A1A2E` or `#2C1A0E`
- **Accent**: Gold `#D4AF37`
- **Text (Dark mode)**: Soft Cream `#EDE8DC`
- **Text (Light mode)**: Deep Brown `#2C1810`

### Typography
- **Display / Headings**: A beautiful serif or calligraphic font — e.g., `Playfair Display`, `Cormorant Garamond`, or `Yatra One` (supports Devanagari) — for a poetic, refined feel
- **Body**: `Lora` or `EB Garamond` — warm, readable, literary
- **UI Labels / Nav**: `DM Sans` or `Outfit` — clean, modern contrast
- Mix Hindi and English naturally in headings where appropriate (e.g., "संगम" as a logo subtitle)

### Motifs & Visual Language
- Subtle paper texture backgrounds
- Mandala-inspired decorative dividers
- Ink-drop or diya (lamp) iconography
- Flowing line art of musical instruments (sitar, tabla, harmonium) or quill/pen
- Watercolor-style washes in section backgrounds
- Gold foil shimmer on CTAs and key headings

---

## Pages to Build

### 1. Landing Page (`/`)
**Goal**: Immediately communicate the purpose and evoke emotion.

**Sections:**
- **Hero**: Full-screen with a cinematic background (dark, moody — a poet by lamplight or a musician on stage). Large heading: *"Where Young Voices Find Their Guru"* (or similar). Subtitle explaining the platform in 1–2 lines. Two CTAs: `Join as Young Talent` and `Join as Mentor/Guru`
- **About Sangam**: 2-column — left: evocative illustration/image, right: platform story in literary prose. Mention the river confluence metaphor.
- **How It Works**: 3-step visual flow (Register → Submit → Get Verified & Grow) — separate paths for Young Talent and Gurus shown side by side
- **Featured Artists**: Horizontal scroll cards showcasing sample young poets/musicians with profile photo, name, art form, city
- **Testimonials**: Quotes styled like shayari — in a decorative quotation block
- **Trust Bar**: Stats — "X young artists registered", "Y verified gurus", "Z pieces verified"
- **Footer**: Logo, tagline, nav links, social links, "Made with ❤️ for Indian Arts"

---

### 2. Registration Pages

#### 2a. Young Talent Registration (`/register/talent`)
Fields:
- Full Name, Stage Name (optional)
- Date of Birth, City, State
- Art Form (Poetry / Music / Both) — toggle selector
- Genre / Style (e.g., Ghazal, Classical, Folk, Rap, etc.)
- Short Bio (textarea, 200 chars)
- Upload Profile Photo
- Upload Sample Work (audio file / text poem / video link)
- Social Media Links (optional)
- **Payment Section** → "Choose Your Plan" (Freemium / Monthly / Annual) — styled as a plan selector card UI

#### 2b. Guru / Expert Registration (`/register/guru`)
Fields:
- Full Name, Professional Title
- Years of Experience, Specialization
- Affiliated Organizations / Awards (optional)
- Short Bio + Philosophy
- Upload Profile Photo + Credentials / Certificate (optional)
- Languages they mentor in
- Availability (hours/week)
- **Payment Section** → Different plans (Verified Badge / Priority Listing / Featured Guru) — styled differently from talent plans, premium-feeling

---

### 3. Dashboard — Young Talent (`/dashboard/talent`)
- **Header**: Welcome greeting with name + art form badge
- **My Submissions**: List/grid of submitted poems or tracks with status tags: `Pending Review`, `Under Review`, `Verified ✅`, `Needs Revision`
- **Assigned Guru**: Profile card of the mentor reviewing their work
- **Notifications**: Recent activity feed
- **Upload New Work**: Quick upload CTA
- **Subscription Info**: Current plan, renewal date, upgrade option

---

### 4. Dashboard — Guru/Expert (`/dashboard/guru`)
- **Review Queue**: List of works pending verification with artist info, submission date, art form filter
- **Work Detail View**: Full poem text or audio player + notes area + status action buttons (`Approve`, `Request Revision`, `Decline`)
- **My Mentees**: Grid of artists currently under their guidance
- **Earnings / Payout Summary**: Clean table or card with monthly stats
- **Profile Completeness Bar**: Nudge to fill remaining details
- **Subscription/Plan**: Their plan status + upgrade options

---

### 5. Pricing Page (`/pricing`)
Two-column split clearly labeled:

**Young Talent Plans:**
| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | 1 submission/month, basic profile |
| Rising Star | ₹99/mo | 5 submissions, priority review |
| Pro Artist | ₹249/mo | Unlimited submissions, featured listing |

**Guru/Expert Plans:**
| Plan | Price | Features |
|------|-------|----------|
| Verified Guru | ₹199/mo | Verified badge, review up to 10/month |
| Master | ₹499/mo | Priority listing, unlimited reviews, earn commission |

Style: Warm card UI, gold highlight on recommended plan, subtle background distinction between the two sections.

---

### 6. Explore / Discover Page (`/explore`)
- Filter bar: Art Form, Genre, City, Verified Only toggle
- Grid of artist/work cards
- Each card: Profile photo, name, art form, 1-line excerpt or audio snippet, Verified badge if applicable
- Infinite scroll or pagination

---

### 7. Artist Public Profile (`/artist/:id`)
- Cover image / banner
- Profile photo + name + badge
- Bio section
- Published / Verified Works (gallery)
- "Invite as Guru" or "Follow" CTA (role-dependent)

---

## Key UI Components to Design

1. **Dual CTA Hero Button Pair** — styled distinctly for Talent vs Guru
2. **Submission Status Badge System** — color-coded (Pending = amber, Verified = green, Revision = red)
3. **Plan Selector Cards** — interactive, toggleable between Monthly/Annual
4. **Audio Player Component** — minimal, elegant, for music submissions
5. **Poem Display Card** — literary typeset styling with decorative border
6. **Guru Profile Card** — authoritative, trust-inspiring design
7. **Review Action Panel** — for gurus to approve/reject/comment
8. **Notification Bell with Dropdown**
9. **Mobile Navigation** — drawer or bottom tab bar

---

## Technical Requirements

- **Framework**: React (preferred) or Next.js for SEO
- **Styling**: Tailwind CSS + custom CSS variables for theme tokens
- **Animations**: Framer Motion for page transitions, scroll reveals, hero entrance
- **Icons**: Lucide React or custom SVG icons with Indian motif styling
- **Fonts**: Load via Google Fonts (Cormorant Garamond + Outfit)
- **Responsive**: Mobile-first. Must work beautifully on 375px (phone) through 1440px (desktop)
- **Accessibility**: ARIA labels, keyboard navigable, sufficient contrast ratios
- **State Management**: React Context or Zustand for auth/role state
- **Routing**: React Router v6 or Next.js App Router

---

## Role-Based Logic

- The app has two user roles: `talent` and `guru`
- After login, redirect to the appropriate dashboard based on role
- Pricing page shows relevant plans first based on role
- Submissions visible only to the submitting talent and their assigned guru
- Guru dashboard only accessible to verified guru accounts

---

## Tone & Copy Voice

- Warm, literary, and aspirational — never corporate
- Mix of English and Hindi/Urdu where it feels natural (e.g., section titles like "Apni Kahani Sunao")
- Avoid tech jargon; use words like "your craft", "your voice", "your guru", "your journey"
- CTAs should feel inviting: "Begin Your Journey", "Find Your Guru", "Share Your Voice"

---

## What Makes SANGAM Unforgettable

- The **dual-river visual metaphor** — the UI literally shows two streams (Talent / Guru) that merge into one brand
- **Poetic micro-copy** everywhere — loading states, empty states, confirmations all written like shayari or poetic phrases
- **Paper texture + ink motifs** give the feeling of a living, breathing literary world
- The verified badge should feel like a **wax seal or mudra stamp** — not a generic checkmark

---

*Build something that a young poet from Lucknow or a young classical singer from Chennai would feel proud to use — and that their Ustad would trust.*