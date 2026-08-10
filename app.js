// Global State
let currentLang = localStorage.getItem("bb_lang") || "en";
let currentUser = JSON.parse(localStorage.getItem("bb_user")) || null;
let auditLogs = JSON.parse(localStorage.getItem("bb_audit_logs")) || [];

// Helper to write audit logs
function logSecurityEvent(userId, actionType, impactedEntity, status = "Success") {
  const newLog = {
    timestamp: new Date().toISOString(),
    userId: userId || "Anonymous",
    action: actionType,
    entity: impactedEntity,
    status: status
  };
  auditLogs.unshift(newLog); // Prepend to show latest first
  localStorage.setItem("bb_audit_logs", JSON.stringify(auditLogs));
  renderAuditLogs();
}

// Translate Page
function applyTranslations() {
  document.documentElement.lang = currentLang;
  const translationDict = window.locales[currentLang];

  // Dynamic elements with data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translationDict[key]) {
      // Check if it has child elements (e.g. icon/span inside a button)
      // If it is pure text, replace it. If not, only replace text nodes.
      if (el.children.length === 0) {
        el.textContent = translationDict[key];
      } else {
        // Replace first text node child
        for (let child of el.childNodes) {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
            child.textContent = translationDict[key];
            break;
          }
        }
      }
    }
  });

  // Dynamic placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translationDict[key]) {
      el.setAttribute("placeholder", translationDict[key]);
    }
  });

  // Highlight active language button
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    if (lang === currentLang) {
      btn.classList.add("bg-forest", "text-cream");
      btn.classList.remove("text-forest", "bg-transparent");
    } else {
      btn.classList.remove("bg-forest", "text-cream");
      btn.classList.add("text-forest", "bg-transparent");
    }
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("bb_lang", lang);
  applyTranslations();
}

// Session Controls
function handleLogin(email, role) {
  const name = role === "admin" ? "Admin Administrator" : "Grassroots User";
  currentUser = {
    email: email,
    name: name,
    role: role
  };
  localStorage.setItem("bb_user", JSON.stringify(currentUser));
  logSecurityEvent(email, "LOGIN_ATTEMPT", "User Session", "Success");
  
  updateAuthUI();
  closeLoginModal();

  // Check consent gate
  const consentAccepted = localStorage.getItem(`bb_consent_${email}`);
  if (!consentAccepted) {
    showConsentModal();
  } else {
    showAppDashboard();
  }
}

function handleLogout() {
  if (currentUser) {
    logSecurityEvent(currentUser.email, "LOGOUT", "User Session", "Success");
  }
  currentUser = null;
  localStorage.removeItem("bb_user");
  updateAuthUI();
  hideAppDashboard();
  hideConsentModal();
  closeProfileDropdown();
}

function acceptConsent() {
  if (!currentUser) return;
  const email = currentUser.email;
  localStorage.setItem(`bb_consent_${email}`, JSON.stringify({
    privacyAcceptedAt: new Date().toISOString(),
    ip: "127.0.0.1" // Mock client IP
  }));
  logSecurityEvent(email, "CONSENT_ACCEPTANCE", "privacyAcceptedAt", "Success");
  hideConsentModal();
  showAppDashboard();
}

function switchUserRole() {
  if (!currentUser) return;
  const newRole = currentUser.role === "admin" ? "user" : "admin";
  currentUser.role = newRole;
  currentUser.name = newRole === "admin" ? "Admin Administrator" : "Grassroots User";
  localStorage.setItem("bb_user", JSON.stringify(currentUser));
  logSecurityEvent(currentUser.email, "ROLE_SWITCH", `Switched to ${newRole}`, "Success");
  
  updateAuthUI();
  showAppDashboard();
  closeProfileDropdown();
}

// Modal and UI Toggles
function showLoginModal() {
  document.getElementById("loginModal").classList.remove("hidden");
  document.getElementById("loginModal").classList.add("flex");
  logSecurityEvent("Anonymous", "LOGIN_PAGE_VIEW", "Login Interface");
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.add("hidden");
  document.getElementById("loginModal").classList.remove("flex");
}

function showConsentModal() {
  const modal = document.getElementById("consentModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  // Disable body scroll when consent is active
  document.body.classList.add("overflow-hidden");
}

function hideConsentModal() {
  const modal = document.getElementById("consentModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("hidden");
}

function closeProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.add("hidden");
}

// UI State Updates
function updateAuthUI() {
  const loggedOutElements = document.querySelectorAll(".auth-logged-out");
  const loggedInElements = document.querySelectorAll(".auth-logged-in");
  const userNameText = document.getElementById("authUserName");
  const userEmailText = document.getElementById("authUserEmail");
  const userRoleBadge = document.getElementById("authUserRole");

  if (currentUser) {
    loggedOutElements.forEach((el) => el.classList.add("hidden"));
    loggedInElements.forEach((el) => el.classList.remove("hidden"));
    if (userNameText) userNameText.textContent = currentUser.name;
    if (userEmailText) userEmailText.textContent = currentUser.email;
    
    // Role layouts
    if (userRoleBadge) {
      userRoleBadge.textContent = currentUser.role === "admin" ? "Admin" : "User";
      if (currentUser.role === "admin") {
        userRoleBadge.className = "px-2 py-0.5 text-xs font-semibold rounded bg-amber-500 text-charcoal";
      } else {
        userRoleBadge.className = "px-2 py-0.5 text-xs font-semibold rounded bg-forest text-cream";
      }
    }
  } else {
    loggedOutElements.forEach((el) => el.classList.remove("hidden"));
    loggedInElements.forEach((el) => el.classList.add("hidden"));
    closeProfileDropdown();
  }
}

function showAppDashboard() {
  if (!currentUser) return;
  // Verify consent was signed
  const consentAccepted = localStorage.getItem(`bb_consent_${currentUser.email}`);
  if (!consentAccepted) {
    showConsentModal();
    return;
  }

  // Show standard User view dashboard / Admin panel if appropriate
  const dashboardSection = document.getElementById("dashboardSection");
  if (dashboardSection) {
    dashboardSection.classList.remove("hidden");
  }

  const adminTelemetry = document.getElementById("adminTelemetry");
  if (adminTelemetry) {
    if (currentUser.role === "admin") {
      adminTelemetry.classList.remove("hidden");
    } else {
      adminTelemetry.classList.add("hidden");
    }
  }
  
  renderAuditLogs();
}

function hideAppDashboard() {
  const dashboardSection = document.getElementById("dashboardSection");
  if (dashboardSection) {
    dashboardSection.classList.add("hidden");
  }
}

function renderAuditLogs() {
  const tbody = document.getElementById("auditLogBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (auditLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No logs recorded yet.</td></tr>`;
    return;
  }

  auditLogs.slice(0, 10).forEach((log) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-cream/40 transition duration-150";

    const timestamp = new Date(log.timestamp).toLocaleTimeString();
    const statusColor = log.status === "Success" ? "text-emerald-600" : "text-rose-500";

    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-charcoal/80 font-mono">${timestamp}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-charcoal font-medium">${log.userId}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-charcoal/80 font-mono">${log.action}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm ${statusColor} font-semibold">${log.status}</td>
    `;
    tbody.appendChild(row);
  });
}

// Mobile Nav Menu Drawer Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileMenuDrawer");
  drawer.classList.toggle("-translate-x-full");
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobileMenuDrawer");
  drawer.classList.add("-translate-x-full");
}

// Setup Page Elements on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  // Init translations
  applyTranslations();

  // Service Worker Registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker registered successfully."))
      .catch((err) => console.warn("Service Worker registration failed:", err));
  }

  // Smooth Scrolling setup
  const exploreBtn = document.getElementById("exploreEcosystemBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("pillarsGridSection");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Setup Event Listeners for Login actions
  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const roleSelect = document.getElementById("loginRole").value;

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }
      handleLogin(email, roleSelect);
    });
  }

  // Consent modal acceptance button
  const consentSubmitBtn = document.getElementById("consentSubmitBtn");
  if (consentSubmitBtn) {
    consentSubmitBtn.addEventListener("click", () => {
      const checkbox = document.getElementById("consentCheckbox");
      if (!checkbox.checked) {
        alert("You must check the box to accept the terms before proceeding.");
        return;
      }
      acceptConsent();
    });
  }

  // Click outside listener for dropdowns
  window.addEventListener("click", (e) => {
    const avatarBtn = document.getElementById("userAvatarBtn");
    const dropdown = document.getElementById("profileDropdown");
    if (avatarBtn && !avatarBtn.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
      closeProfileDropdown();
    }
  });

  // Verify auth session state
  updateAuthUI();
  if (currentUser) {
    showAppDashboard();
  }
});
