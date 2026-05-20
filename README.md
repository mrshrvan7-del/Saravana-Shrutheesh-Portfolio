# Saravana Shrutheesh &mdash; Data Portfolio

A premium, custom-designed data portfolio showcasing projects, professional experience, skills, and credentials. Built with Next.js 15+ and optimized for performance and responsive layout.

---

## 🎨 Design Philosophy & Themes
The portfolio is designed with a **warm-cream luxury editorial** aesthetic:
* **Typography**: Elegant serif titles paired with clean, functional monospaced tags for meta-information.
* **Palette**: Tailored HSL color variables (warm wheat backgrounds, soft charcoal borders, and dark charcoal texts).
* **Interactivity**: Smooth CSS/JS scroll reveal animations, interactive chips in the skills grid, and clean transitions.
* **Responsive Layout**: Designed for seamless viewing across mobile, tablet, and desktop devices with optimized grid columns and centered text blocks.

---

## ✨ Features

1. **Editorial Hero Section**: Minimalist introduction featuring custom visual typography, optimized subheadings, and quick links.
2. **Interactive Bento Grid (Skills)**: Custom dashboard showcasing tools and proficiency across Data Analysis, Databases, Cloud & Big Data, and Languages with hover-triggered descriptive captions.
3. **Experience Timeline**: Vertical chronological layout highlighting key roles, contributions, and project deliveries.
4. **Education Timeline**: Structured academic records detailing courses from Surana College.
5. **Projects Showcase**: Grid representation of 5 production projects (Walmart Copilot, Hyperlocal Marketplace, Sign Language Recognition, AI Call Auditor, and ServeIn Marketplace) featuring compact specification lists and zero-void-space styling.
6. **Credentials Split List**: Clean list format for professional certifications (Google Advanced Data Analytics, Microsoft Power BI Analyst, etc.) and leadership records (Rotaract Club Director, College Hackathon runner-up).

---

## 📁 Repository Structure

```
├── app/                     # Next.js App Router code
│   ├── globals.css          # Design system & responsive styles
│   ├── layout.tsx           # Base page layout & metadata
│   └── page.tsx             # Main page layout orchestrator
├── components/              # Reusable React components
│   ├── About.tsx            # Intro summary block
│   ├── Certs.tsx            # Redesigned Credentials section
│   ├── Contact.tsx          # Connect form and links
│   ├── Education.tsx        # Education timeline
│   ├── Experience.tsx       # Professional experience timeline
│   ├── Hero.tsx             # Minimalist hero component
│   ├── Nav.tsx              # Navigation bar
│   ├── Projects.tsx         # Projects list and grid details
│   └── Skills.tsx           # Interactive Bento Grid
├── public/                  # PDF downloads, SVGs, and project images
├── vanilla-build/           # Standard HTML/CSS/JS version of the portfolio
│   ├── index.html           # Main markup file
│   ├── script.js            # Hover and scroll interaction scripts
│   └── style.css            # Static styles
└── package.json             # Build configuration and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your system.

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Running Development Server
Start the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Bundle
Generate the optimized build output:
```bash
npm run build
```
The application will compile static files ready to be deployed.
