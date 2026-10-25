<div align="center">

# 🦷 Dentora — Modern Dental Clinic Website

**کلینیک دندان‌پزشکی مدرن دنتورا** · **Modern Trilingual Dental Clinic** · **عيادة أسنان حديثة**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)

**فارسی (RTL)** · **Türkçe (LTR)** · **العربية (RTL)**

A production-ready, fully responsive dental clinic website with instant language switching, real RTL/LTR support, dark mode, buttery-smooth animations, and a full-stack appointment booking system (Next.js API Routes + Prisma + SQLite).

</div>

---

## ✨ Features

### 🌍 Trilingual & RTL — سه زبانه با پشتیبانی کامل راست‌چین
- **Persian (فارسی)**, **Turkish (Türkçe)** and **Arabic (العربية)** — switch instantly from the navbar
- Real **RTL / LTR** layout mirroring using CSS logical properties (`ms-*`, `me-*`, `text-start`)
- Language preference **persisted in localStorage**; localized number formatting (`fa-IR`, `ar-EG`, `tr-TR`)

### 🎨 Design & Animations
- Modern **teal / emerald medical palette** with Light & **Dark mode** (`next-themes`)
- Animated gradient blobs, floating cards, shine-sweep hovers, scroll-reveal everywhere
- **Animated counters** (12,000+ patients, 98% satisfaction…), scroll-spy navbar with layout-animated active pill
- Glassmorphism navbar, floating booking CTA on mobile, back-to-top button

### 🗂 Complete Clinic Sections
| Section | Description |
|---|---|
| Hero | Headline, CTAs, rating, live phone CTA, floating stat cards |
| Stats | 15+ years · 12,000+ patients · 98% satisfaction · 25+ specialists |
| Services | 8 treatments: implants, orthodontics, whitening, veneers, root canal, pediatric, smile design, surgery |
| About | Image collage + 4 key differentiators |
| Doctors | 4 specialists with hover-reveal bios |
| Gallery | Masonry clinic gallery with captions |
| Testimonials | Auto-rotating carousel (pauses on hover), RTL-aware arrows |
| Booking | **Full-stack appointment form** → validated with Zod → saved to SQLite |
| FAQ | Accessible accordion (6 questions) |
| Contact | Address / phone / email / working hours cards |

### ⚙️ Full-Stack
- **`POST /api/appointments`** — Zod-validated booking creation, stored with Prisma
- **`GET /api/appointments`** — live "booked this month" counter shown in the UI
- **`POST /api/contact`** — contact messages endpoint
- SQLite database — zero-config, works out of the box

### 📱 Quality
- **Mobile-first responsive** (safe-area aware floating buttons, sticky footer)
- Accessible: semantic HTML, ARIA labels, keyboard navigation, alt texts
- Clean lint (`eslint` 0 errors), typed end-to-end with TypeScript

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript 5** |
| UI | **React 19**, shadcn/ui (New York), Radix UI, Lucide Icons |
| Styling | **Tailwind CSS 4**, tw-animate-css, CSS logical properties for RTL |
| Animation | **Framer Motion 12** |
| Database | **Prisma ORM + SQLite** |
| Validation | **Zod** |
| State | React Context (i18n), react-hook-form |
| Fonts | Vazirmatn (FA/AR/TR glyphs) |

---

## 🚀 Getting Started

> Requires **Node.js 20+** (or [Bun](https://bun.sh)) — npm, pnpm, yarn and bun all work.

```bash
# 1. Install dependencies
npm install        # or: bun install

# 2. Configure environment
cp .env.example .env

# 3. Create the database
npm run db:push    # or: bun run db:push

# 4. Start the dev server
npm run dev        # or: bun run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site boots in **Persian**; switch to Türkçe or العربية from the navbar globe menu. 🌐

---

## 🔌 API Reference

### `POST /api/appointments`

Create an appointment request.

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Rezaei",
    "phone": "+905551112233",
    "email": "ali@example.com",
    "service": "Dental Implant",
    "doctor": "Any doctor",
    "date": "2026-11-06",
    "time": "10:00",
    "message": "Optional note",
    "lang": "fa"
  }'
```

**Response `201`**

```json
{ "success": true, "id": "cmv…", "count": 1 }
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | min 2 chars |
| `phone` | string | ✅ | min 7 chars |
| `email` | string | ➖ | valid email or empty |
| `service` | string | ✅ | selected treatment |
| `doctor` | string | ➖ | preferred doctor |
| `date` | string | ✅ | `YYYY-MM-DD` |
| `time` | string | ➖ | e.g. `10:00` |
| `message` | string | ➖ | max 2000 chars |
| `lang` | string | ➖ | `fa` / `tr` / `ar` |

### `GET /api/appointments`

Returns the number of appointments created this month.

```json
{ "success": true, "count": 42 }
```

### `POST /api/contact`

Stores a contact message (`name`, `email`, `subject?`, `message`).

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── appointments/route.ts   # POST (create) + GET (monthly count)
│   │   └── contact/route.ts        # POST contact messages
│   ├── layout.tsx                  # Metadata, fonts (Vazirmatn), RTL default
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Tailwind 4 theme (teal palette, dark mode, keyframes)
├── components/
│   ├── dental/
│   │   ├── LanguageProvider.tsx    # Locale context + RTL/LTR switching
│   │   ├── Navbar.tsx              # Glass navbar, language menu, theme toggle
│   │   ├── Hero.tsx  Stats.tsx  Services.tsx  About.tsx
│   │   ├── Doctors.tsx  Gallery.tsx  Testimonials.tsx
│   │   ├── Booking.tsx             # Full-stack appointment form
│   │   ├── FAQ.tsx  Contact.tsx  Footer.tsx
│   │   └── Counter.tsx  FloatingButtons.tsx  shared.tsx
│   └── ui/                         # shadcn/ui components
└── lib/
    ├── i18n/                       # fa.ts · tr.ts · ar.ts · types.ts
    └── db.ts                       # Prisma client singleton
prisma/schema.prisma                # Appointment + ContactMessage models
public/images/                      # AI-generated clinic & team photos
```

---

## 🌍 Adding a New Language

1. Create `src/lib/i18n/<locale>.ts` implementing the `Dictionary` interface from `types.ts`
2. Register it in `src/lib/i18n/index.ts` (`dictionaries` + `localeOrder`)
3. Done — the navbar language menu picks it up automatically; set `dir: "rtl" | "ltr"` to control layout direction

---

## 📄 License

Released for demonstration and educational purposes. Feel free to fork and customize for your own clinic.

<div align="center">

**Built with ❤️ using Next.js by [amiraliSite](https://github.com/amiraliSite)**

</div>
