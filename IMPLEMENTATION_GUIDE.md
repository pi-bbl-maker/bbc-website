# Buffalo Back Labs - Implementation & User Guide

This guide documents the layout structures, data pipelines, and validation layers built for the Buffalo Back Labs landing page.

---

## 📂 Project Architecture

```
BBL Website/
├── public/
│   ├── manifest.json       # PWA Installable Configuration
│   └── sw.js               # Service Worker (Cache Takeover Protocols)
├── src/
│   ├── locales/
│   │   ├── en.json         # English Translation Dictionary
│   │   └── kn.json         # Kannada Translation Dictionary
│   ├── context/
│   │   └── LanguageContext.jsx # Language State Provider (EN <-> KN)
│   ├── components/
│   │   ├── Header.jsx      # Top Navbar (Logo, Nav items, lang switcher)
│   │   ├── Hero.jsx        # Landing hero with Woven Matrix SVG and indicators
│   │   ├── Problem.jsx     # Auditor vs Field narrative grid
│   │   ├── Ecosystem.jsx   # Dual-engine Field and Market Columns
│   │   ├── InteractiveDemo.jsx # Interactive Sandbox (Phone & Dashboard)
│   │   ├── Pitch.jsx       # Collective CTA with Form Validations
│   │   └── Footer.jsx      # Branding, sitemap, and dynamic copyright
│   ├── index.css           # Global CSS, Google Font configurations, & keyframes
│   ├── App.jsx             # Component assembler
│   └── main.jsx            # Bootstrap entry point
├── package.json            # Node dependencies and build scripts
├── tailwind.config.js      # Custom theme setup
└── vite.config.js          # Vite bundler parameters
```

---

## 🛠️ Mechanism Details

### 1. Custom Translation Layer (`LanguageContext.jsx`)
Instead of pulling in heavy dependencies, i18n is handled by a custom React Context.
* The translation function `t('key.path')` splits the string path and resolves nesting recursively inside `en.json` or `kn.json`.
* Toggling languages updates state instantly and propagates across all UI components, rendering text, presets, and logs in the selected locale.

### 2. Sandbox Simulation Engine (`InteractiveDemo.jsx`)
To simulate full-stack functionality entirely on the frontend:
* **The Voice UI Shell** handles simulated mic recording states (`idle` ➔ `listening` ➔ `processing` ➔ `success`).
* When a voice preset is clicked, its text is animated inside the transcript box. The parser extracts crop types and masses (e.g. `2.5 kg` is normalized under the hood to `2500g`).
* **The Hub Dashboard Table** runs reactively. When the voice log succeeds, the respective crop row's `poolGrams` state is incremented. The layout reactively recalculates status classes:
  * **Deficit (Amber)**: Available mass < target mass.
  * **Target Met (Green)**: Available mass is at or above target.
  * **Surplus (Blue)**: Available mass exceeds 120% of target.
* Users can click **[Dispatch 500g]** to simulate shipping products out, which decrements the pool balance and shifts row highlight colors.
* An **In-App Help Center Widget** is toggleable inside the dashboard header to guide users through the sandbox.

### 3. Partnership Form Validation (`Pitch.jsx`)
In alignment with form validation constraints:
* **Name & Organization**: Evaluates `.trim()` to reject empty strings.
* **Email**: Checked against regular expression `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` to ensure valid domains.
* **Farmer Count**: Ensures the value is entered, is a valid number, is an integer, and is strictly positive (`> 0`).
* **Real-time feedback** is rendered in red copy beneath fields on blur (`onBlur`) and cleared immediately as the user resolves typos (`onChange`).
* Forms are prevented from executing submissions if any field error state exists.

### 4. PWA Cache Takeover (`sw.js`)
To adhere to standard PWA cache protocols defined in `kaithota.md`:
* **Installation hook**: Calls `self.skipWaiting()` to immediately activate the worker.
* **Activation hook**: Calls `self.clients.claim()` to force instant page takeover.
* Files (`/`, `/index.html`, `/manifest.json`) are cached locally to allow offline access.
