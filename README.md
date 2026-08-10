# Buffalo Back Collective Landing Page

An ultra-minimalist, responsive, and accessible landing page built for the **Buffalo Back Collective**. This project is formally owned, engineered, and maintained by **Buffalo Back Labs (BBL)** under the technical oversight of **bbl-maker**.

---

## 🌟 Key Features

* **Minimalist Aesthetics:** Implements a strict white background (`#FFFFFF`) with geometric headings (Nunito) and Lato body fonts, using micro-accent visual cues.
* **Fine-line SVG Art:** Handcrafted vector illustrations for the Hero background, Pillars, and circular loop diagrams.
* **Internationalization (i18n):** Translates all UI assets dynamically between English and Kannada.
* **Simulated RBAC Authentication:** Local session storage managing User and Admin dashboards, telemetry panels, and compliance logging.
* **Automated CI/CD:** Integrated GitHub Actions pipeline for automated static site deployment to GitHub Pages.

---

## 📂 Project Structure

```
.
├── .github/workflows/
│   └── deploy.yml      # CI/CD GitHub Actions Pages Pipeline
├── index.html          # Main HTML5 structure with inline SVG artwork
├── locales.js          # Translation dictionaries (EN/KN)
├── app.js              # State logic (Auth, i18n, audits)
├── sw.js               # Service Worker caching schema
├── manifest.json       # PWA Application Metadata
└── package.json        # Project manifest & build configuration
```

---

## ⚙️ Operations Guide for BBL Team Members

### 1. Cloning the Repository
```bash
git clone https://github.com/buffalobacklabs/landing-page.git
cd landing-page
```

### 2. Local Development & Preview
To run the server locally:
```bash
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser. All assets are loaded with relative paths (`./`) to support smooth subpath serving.

### 3. CI/CD & Verification of Deployments
The repository deploys automatically to **GitHub Pages** on every push to the `main` or `master` branches:
- **Pipeline Config:** Located at `.github/workflows/deploy.yml`.
- **Status Check:** Check progress on the GitHub repository page under the **Actions** tab.
- **Handshake Verification:** Ensure the PWA service worker cache compiles cleanly without console warnings.
