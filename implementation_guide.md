# Buffalo Back Collective — Implementation & User Guide

This guide documents the technical architecture, layout designs, and compliance protocols implemented in the Buffalo Back Collective landing page.

---

## 🛠️ Technical Architecture

### 1. Simulated Session & Auth System (`app.js` & `index.html`)
To fulfill the requirement for a fully functional Log In and Log Out flow out of the box in a static HTML5/Tailwind CDN setup:
- A local session store is simulated in `localStorage` under the key `bb_user`.
- Clicking "Log In" shows a login modal where users select between two roles: `User` and `Admin`.
- Once authenticated:
  - The UI updates. The "Log In" buttons hide, and the profile avatar dropdown displays in the top-right header (displaying name, email, role, a role-switching button, a link to the dashboard, and a logout button).
  - The `#dashboardSection` is toggled visible.
  - If the role is `Admin`, the `#adminTelemetry` panel becomes visible, exposing the real-time Security Audit Logs.
  - Every login, logout, and role switch triggers a security log event.

### 2. First-Time Login Consent Gate (`app.js` & `index.html`)
- If the authenticated user has not yet checked the compliance notice:
  - A modal overlay blocks all interaction on the viewport (using `overflow-hidden` on the body and high z-index backdrop blur).
  - Checking the consent checkbox and clicking "Proceed" registers a timestamped compliance flag in `localStorage` under `bb_consent_<email>` and appends a `CONSENT_ACCEPTANCE` security audit log entry.

### 3. Localization Strategy (`locales.js` & `app.js`)
- All UI strings are stored inside `locales.js` mapping to `en` and `kn` (Kannada) resource keys. No user-facing text is hardcoded inside rendering loops.
- The `setLanguage(lang)` function iterates through all elements marked with a `data-i18n` attribute, replacing text nodes dynamically. This keeps localization fast, client-side, and highly scalable.

### 4. PWA Caching & Activation (`sw.js`)
- A service worker (`sw.js`) is registered on DOM load.
- It caches critical structural assets (`index.html`, `locales.js`, `app.js`, `manifest.json`, `buffalo_back_icon.jpg`) to enable offline accessibility.
- Following the `kaithota.md` instructions, the service worker utilizes:
  - `self.skipWaiting()` on install to skip the waiting status.
  - `self.clients.claim()` on activate to take control of active pages immediately.

---

## 🚜 User Operations Guide

1. **Changing Languages:** Click the language toggles (`EN` | `KN`) in the desktop navigation bar or mobile drawer menu to switch all page content instantly.
2. **Accessing the System:**
   - Click **Log In** in the top right.
   - Enter an email (e.g. `admin@buffaloback.in` for admin credentials) and click submit.
3. **Accepting Terms:** Read the compliance notice, check the consent box, and proceed.
4. **Inspecting Security Audit Logs:** Log in as an Admin, scroll down to the Dashboard, and inspect the real-time logs under the *Admin Control Cockpit*.
5. **Switching Roles:** Toggle the profile dropdown avatar in the header and click **Switch Role** to switch access roles on the fly.
