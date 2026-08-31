# Buffalo Back Labs - Agroecological Stack Landing Page

This repository contains the high-fidelity, responsive static landing page for **Buffalo Back Labs (BBL)**, a social for-profit ecosystem enabler in agroecology. The website showcases the dual-engine architecture of the BBL platform: the Field Layer (data in) and the Market Layer (cash out).

---

## 🎨 Design System & Colors
The visual design is grounded, authentic, and structural (B2B infrastructure platform style) built with the following custom palette:
* **Linen / Canvas background** (`#FAF6F0`)
* **Earth Brown** (`#3F2A1D`)
* **Olive Green** (`#4D5D3B`)
* **Indigo Blue** (`#1E1B4B`)
* **Typography**: Warm serif headers (*Lora* via Google Fonts) and clean humanist sans-serif UI text (*Plus Jakarta Sans*).

---

## ⚙️ Tech Stack & Overrides
As overridden by `kaithota.md`:
* **Frontend**: React.js SPA powered by Vite
* **Styling**: Tailwind CSS
* **Build Engine**: Vite
* **PWA Features**: Service Worker (`sw.js`) and Web Manifest (`manifest.json`) supporting immediate cache takeover (`skipWaiting` and `clients.claim`).
* **i18n Mappings**: Supporting English (`en`) and Kannada (`kn`) translations out of the box.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your system.
* Node.js: `v22.20.0` or higher
* npm: `10.9.3` or higher

### Installation
Clone the repository and install the project dependencies:
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

### Preview Production Build
Locally serve the compiled bundle for verification:
```bash
npm run preview
```

---

## 🌾 Platform Demonstration Capabilities
An **Interactive Demo** sandbox is integrated directly into the landing page containing:
1. **Farmer Voice UI (Smartphone Simulator)**: Clicking Kannada/English speech presets triggers audio wave transcription and parses values into normalized grams (e.g. 2.5 kg to 2500g).
2. **Cooperative Hub Dashboard**: Reactively recalculates available inventories in the distribution pool table based on simulated entries and active dispatch triggers, showing deficit/surplus states (`Amber`, `Green`, `Blue`).
