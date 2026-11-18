# Buffalo Back Labs — Technology for Agroecology

The official website for **Buffalo Back Labs (OPC) Private Limited** (`pi-bbl-maker/bbc-website`).

Clean, independent studio design with auto-detecting Light & Dark mode, plain-spoken voice, and zero template clutter.

---

## 🎨 Visual System & Studio Design
* **Typography**: `Barlow` / `Barlow Condensed` (light, regular, medium weights) + `Inter` matching the monoline BBL vector logo.
* **Canvas Colors**:
  * **Light Mode**: Warm off-white canvas (`#FAF9F6`), deep indigo / charcoal ink (`#111827` / `#003149`), hairline borders (`rgba(27, 42, 74, 0.12)`).
  * **Dark Mode**: Deep teal-slate canvas (`#0B1F22`), surface (`#0F2A2E`), crisp warm-white text (`#F4F1EA`), subtle gold (`#E5B622`) and teal (`#2DD4BF`) accents.
* **Branding**: Full vector SVGs rendered directly from the BBL Logo Kit:
  * Light Mode: `public/brand/Logo Color Blue.svg`
  * Dark Mode: `public/brand/Logo Color White.svg`
* **Theme Switching**: Respects `prefers-color-scheme` by default with minimal Sun/Moon toggle.
* **Localization**: Full bilingual parity in English (`en`) and Kannada (`kn`).

---

## ⚙️ Tech Stack
* **Frontend**: React 18 SPA powered by Vite
* **Styling**: Tailwind CSS (Tailwind v3 with `darkMode: 'class'`)
* **Icons**: Lucide React
* **QA Suite**: Automated Playwright test suite (`node qa-test.cjs`)
* **Hosting**: Firebase Hosting (`bbl-website.web.app`)

---

## 📬 Contact Form & Google Apps Script Webhook Setup

The website uses a zero-cost, serverless Google Apps Script webhook to log inquiries into a Google Sheet and email `weare@buffaloback.in`.

### Quick Setup (2 Minutes):
1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet named **"BBL Website Inquiries"**.
2. Click **Extensions > Apps Script** in the top menu.
3. Paste the contents of [`google_apps_script.js`](./google_apps_script.js) into `Code.gs`.
4. Click **Deploy > New deployment**.
   * Type: **Web app**
   * Description: `BBL Website Webhook`
   * Execute as: **Me**
   * Who has access: **Anyone**
5. Click **Deploy**, authorize Google permissions, and copy the **Web App URL** (`https://script.google.com/macros/s/.../exec`).
6. Add the URL to `.env.local`:
   ```env
   VITE_CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   ```
7. *(Fallback)* If `VITE_CONTACT_WEBHOOK_URL` is omitted, the form runs in dev mode with a seamless direct `mailto:weare@buffaloback.in` fallback.

---

## 🚀 Development & Verification

### Install Dependencies
```bash
npm install
```

### Local Dev Server
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```

### Playwright Automated QA (Light & Dark Mode)
```bash
npm test
```

---

## 📜 Legal & Corporate Information
* **Legal Entity**: Buffalo Back Labs (OPC) Private Limited
* **Registered Office**: 33 (Old No. 43), Mountain Street, 1st Block Jayanagar, Madhavan Park, Bangalore - 560011
* **CIN**: U62011KA2026OPC220541
* **Email**: `weare@buffaloback.in`
