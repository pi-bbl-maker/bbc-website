# Buffalo Back Labs - Implementation & User Guide

This guide documents the design topology and validation details built for the Buffalo Back Labs editorial landing page.

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
│   │   ├── Hero.jsx        # Landing hero with Hero Image Placeholder 1
│   │   ├── Problem.jsx     # The Manifesto (Typographic focus for Funders)
│   │   ├── Ecosystem.jsx   # The Architecture of Scale (Field & Market grid with Placeholders 2 & 3)
│   │   ├── Pitch.jsx       # Connect with the Founder Form (with Org Focus validations)
│   │   └── Footer.jsx      # Branding and dynamic copyright notice
│   ├── index.css           # Global CSS, Font face, & keyframe setups
│   ├── App.jsx             # React component assembler
│   └── main.jsx            # React bootstrap entry
├── package.json            # Node dependencies
├── tailwind.config.js      # Custom theme configurations
└── vite.config.js          # Vite server and build specs
```

---

## 🛠️ Design & Validation Details

### 1. Visual Placement & Styling
* Placeholders are rendered as `<div className="bg-[#EFE9E0] border border-earth/15 flex items-center justify-center">` containers, giving them a raw, unbleached canvas structure.
* Monospace italic text centers the strict image requirements in the respective language.
* The header logo features a minimalist curved wireframe woven matrix SVG as requested.

### 2. Partnership Form validations (`Pitch.jsx`)
In alignment with the VC/Funder-focused narrative:
* **Contact Name & Fund Name**: String length check after `.trim()`.
* **Email Address**: Checked against an RFC 5322 regex pattern to confirm professional email structures.
* **Partnership Interest / Organization Focus**: Replaced previous farmer count metrics, validating that the input is non-empty.
* **Message / Alignment Vision**: Rejects empty strings.
* Real-time inputs styled dynamically: errors show red border rings, and error messages are rendered below the field. Submitting is blocked until all errors resolve.

### 3. PWA sw.js Cache
* Caches `/`, `/index.html`, and `/manifest.json` for offline manifest execution.
* Intercepts standard browser requests to serve from cache first.
