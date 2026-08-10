# Buffalo Back Collective Landing Page

A fully responsive, modern, accessible, and high-performance landing page built for the **Buffalo Back Collective**. It integrates the collective's four key pillars, agricultural principles, and grassroots initiatives into a sleek, organic visual theme.

---

## 🌟 Key Features

* **Organic Premium Aesthetics:** Implements a warm, structured, and earthy palette:
  * Warm Forest Green (`#1C382B`)
  * Moss (`#2D4A3E`)
  * Terracotta (`#C86D51`)
  * Sand (`#F7F4EE`)
  * Warm Cream background (`#FAF7F2`)
  * Dark Charcoal text (`#222222`)
* **Responsive Layout:** Engineered with fluid margins, flexbox, and CSS grids, collapsing seamlessly from wide desktop monitors (up to `1440px`) to narrow mobile screens (`375px`).
* **Internationalization (i18n):** Translates all UI assets dynamically between **English** and **Kannada** via isolated language dictionaries.
* **Authentication and Role-Based Access Control (RBAC):** Simulated authentication flows (User/Admin roles) utilizing `localStorage` and client-side session states out of the box.
* **Consent Gate Compliance:** First-time login blocks dashboard access until the user signs a compliance data consent modal overlay, generating timestamped audit log trails.
* **Service Worker (PWA):** Registered service worker caching static resources with immediate cache takeover controls.

---

## 📂 Project Structure

```
.
├── index.html          # Main HTML5 Structure & Page Components
├── locales.js          # Translation Dictionaries (EN & KN)
├── app.js              # Application Logic (Auth, i18n, DOM Events)
├── sw.js               # Service Worker (PWA Caching & Offline Support)
├── manifest.json       # PWA Application Metadata
└── buffalo_back_icon.jpg # Brand logo icon
```

---

## 🚀 Execution & Local Development

No compilation or build runner is required. Simply serve the workspace directory using any local development server (e.g., Python's HTTP server, VS Code Live Server, or `http-server`).

### Serve using python:
```bash
python3 -m http-server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🔐 Credentials for Dashboard Testing

* **User Role:**
  * **Email:** `user@buffaloback.in`
  * **Password:** (Any string)
* **Admin Role:**
  * **Email:** `admin@buffaloback.in`
  * **Password:** (Any string)
