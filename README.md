# Buffalo Back Labs - Agroecological Stack Editorial Manifesto

This repository contains the overhauled, high-fidelity responsive landing page for **Buffalo Back Labs (BBL)**, a social for-profit ecosystem enabler in agroecology, optimized for **Patient Capital Funders** and **Impact VCs**.

The UI/UX focuses on clean typography, generous whitespace, and an authentic editorial manifesto layout (shifting away from generic SaaS tech-graphics and dashboards).

---

## 🎨 Design System & Visual Constraints
The styling adheres to a raw, structural manifesto:
* **Background Tones**: Natural, raw unbleached linen/canvas backgrounds (`#FAF6F0`).
* **Colors**: Indigo Blue (`#1E1B4B`), Olive Green (`#4D5D3B`), and Earth Brown (`#3F2A1D`).
* **Typography**: Elegant Georgia/Lora serif for headers, and Plus Jakarta Sans/Inter for structured UI labels.
* **Photo Placeholders**: Large canvas elements styled as raw photo containers showing strict photo specifications:
  * **Placeholder 1 (Hero Background)**: `[IMAGE REQ: High-quality photograph of women farmers at the Kai Thota demo farm in Ragihalli, working the soil.]`
  * **Placeholder 2 (Field Layer Card)**: `[IMAGE REQ: Close-up of a farmer logging voice data on a mobile device in the field.]`
  * **Placeholder 3 (Market Layer Card)**: `[IMAGE REQ: Fresh, organic harvest aggregated for community distribution.]`

---

## ⚙️ Tech Stack & Configurations
* **Frontend**: React.js SPA powered by Vite
* **Styling**: Tailwind CSS
* **Build Engine**: Vite
* **PWA Features**: Service Worker (`sw.js`) and Web Manifest (`manifest.json`) supporting immediate cache takeover.
* **i18n Mappings**: Localized in English (`en`) and Kannada (`kn`).

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your system.
* Node.js: `v22.20.0` or higher
* npm: `10.9.3` or higher

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Build
Build the optimized static bundle:
```bash
npm run build
```
The output will compile into the `dist/` directory.
