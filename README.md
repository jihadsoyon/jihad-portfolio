# Jihad Soyon | Portfolio

A personal portfolio website built with **Next.js (App Router)**, **Tailwind CSS v4**, and **MDX**, featuring light and dark themes, a fully animated interface, a bilingual-ready structure, a contact system, and an MDX-powered blog and project case studies.

**Live:** [jihadsoyon.com](https://jihadsoyon.com)

---

## Features

- **Responsive design** across mobile, tablet and desktop
- **Light and dark theme** with system preference detection and no flash on load
- **Animated interface** built with Framer Motion, including scroll reveals, tilt cards and micro-interactions
- **MDX-powered content**: blog articles and project case studies are plain `.mdx` files, so new content needs no code changes
- **Contact form** with inquiry types, package selection and conditional budget and timeline fields, delivered by email through Resend
- **Floating chat widget** that opens WhatsApp with a pre-filled message
- **Service catalogue** with details pages, a toolkit overview and a clear process
- **Project-based pricing** with a request modal
- **SEO**: per-page metadata, Open Graph and Twitter cards, `sitemap.xml` and `robots.txt`
- **Custom 404 page** and route-level metadata

## Tech Stack

| Area | Technologies |
|------|-------------|
| Framework | Next.js 16 (App Router), React |
| Styling | Tailwind CSS v4, custom CSS variables |
| Animation | Framer Motion |
| Content | MDX (`next-mdx-remote`), `gray-matter` |
| Email | Resend |
| Icons | Lucide React, custom brand icons |
| Hosting | Vercel |
| DNS & Domain | Custom domain (`jihadsoyon.com`) |

## Project Structure

```
jihad-portfolio/
├── content/
│   ├── blog/              # Blog articles (.mdx)
│   └── projects/          # Project case studies (.mdx)
├── public/
│   ├── images/            # Photos, thumbnails, OG image
│   └── resume/            # Resume PDF
├── src/
│   ├── app/               # Routes: home, about, skills, projects, services,
│   │                      # blog, pricing, contact, resume, API route
│   ├── components/
│   │   ├── home/          # Hero, About, Experience, Skills, Projects, Blog, Contact
│   │   ├── layout/        # Navbar, Footer, Logo, theme toggle, route progress
│   │   ├── blog/          # Blog card and listing
│   │   ├── projects/      # Project card and video
│   │   ├── services/      # Service card and process timeline
│   │   ├── pricing/       # Pricing cards and request modal
│   │   ├── contact/       # Contact form, inquiry dropdown
│   │   ├── chat/          # Floating WhatsApp chat widget
│   │   └── ui/            # Shared UI pieces
│   ├── data/              # Site config, experience, skills, services, pricing
│   └── lib/               # MDX readers for blog and projects
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/jihadsoyon/jihad-portfolio.git
cd jihad-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Sends contact form emails through Resend |
| `CONTACT_TO_EMAIL` | Address that receives contact messages |
| `NEXT_PUBLIC_SITE_URL` | Base URL used for sitemap and social metadata |

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## Managing Content

**Blog articles:** add a `.mdx` file to `content/blog/` with this frontmatter:

```mdx
---
title: "Article title"
description: "Short summary shown on cards."
date: "2026-11-08"
category: "Technology"
tags: ["Technology", "Career"]
image: "/images/blog/article.jpg"
featured: true
---
```

Available tags are defined in `src/data/blogTags.js`.

**Projects:** add a `.mdx` file to `content/projects/` with `title`, `description`, `image`, `tech`, `github`, `live`, `video`, `accent` and `order`.

**Site content:** update `src/data/site.js` for name, designation, contact links and tagline.

**Experience and skills:** edit `src/data/experience.js` and `src/data/skills.js`.

**Services and pricing:** edit `src/data/services.js` and `src/data/pricing.js`.

## Deployment

The site is deployed on **Vercel**. Every push to the `main` branch triggers a new production build automatically.

1. Import the repository in Vercel.
2. Add the environment variables listed above, with `NEXT_PUBLIC_SITE_URL` set to the live domain.
3. Deploy, then attach the custom domain under **Settings → Domains**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Contact

- **Email:** [jihadsoyon@gmail.com](mailto:jihadsoyon@gmail.com)
- **LinkedIn:** [linkedin.com/in/jihad-soyon](https://www.linkedin.com/in/jihad-soyon/)
- **GitHub:** [github.com/jihadsoyon](https://github.com/jihadsoyon)

---

Built and maintained by **Jihad Soyon**.
