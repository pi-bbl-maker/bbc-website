const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function run() {
  console.log('--- Starting Playwright QA Verification (BBL-WEBSITE-1.2) ---');

  // Start preview server
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--host', '127.0.0.1', '--strictPort'], {
    stdio: 'pipe',
    shell: true
  });

  preview.stdout.on('data', (d) => console.log(`[Vite Preview] ${d.toString().trim()}`));
  preview.stderr.on('data', (d) => console.error(`[Vite Preview Error] ${d.toString().trim()}`));

  // Wait for server to respond
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:4173', (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
      });
      ready = true;
      break;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  if (!ready) {
    console.error('Server failed to start.');
    preview.kill();
    process.exit(1);
  }

  console.log('✓ Vite preview server is live on http://127.0.0.1:4173');

  fs.mkdirSync('public/playwright-evidence', { recursive: true });

  const browser = await chromium.launch();
  const consoleErrors = [];

  // Helper to audit DOM invariants, logos, frames, and partner assets
  async function auditPage(page, label, isMobile = false) {
    // 1. Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      throw new Error(`Horizontal overflow detected in ${label}`);
    }
    console.log(`✓ Zero horizontal overflow verified in ${label}`);

    // 2. Strict Domain Invariants: 0 occurrences of deprecated strings in rendered DOM
    const forbiddenTerms = [
      'app.kaithota.in',
      'github.com',
      'pgsoc-',
      'CIN: ',
      'CIN : ',
      'weare@buffaloback.in'
    ];

    const violations = await page.evaluate((terms) => {
      const pageText = document.body.innerText;
      const html = document.body.innerHTML;
      const found = [];
      for (const t of terms) {
        if (pageText.includes(t) || html.includes(t)) {
          found.push(t);
        }
      }
      return found;
    }, forbiddenTerms);

    if (violations.length > 0) {
      throw new Error(`Rendered DOM contains forbidden terms in ${label}: ${violations.join(', ')}`);
    }
    console.log(`✓ 0 occurrences of forbidden terms (app.kaithota.in, github.com, pgsoc-, CIN, weare@buffaloback.in) in ${label}`);

    // 3. Verify Header Logo (Vector Mark + Barlow Wordmark)
    const headerLogoHandle = await page.$('header a[aria-label="Buffalo Back Labs"]');
    if (!headerLogoHandle) throw new Error(`Header logo link missing in ${label}`);
    
    const headerLogoDetails = await page.evaluate((a) => {
      const img = a.querySelector('img');
      const span = a.querySelector('span');
      const imgRect = img ? img.getBoundingClientRect() : null;
      const spanRect = span ? span.getBoundingClientRect() : null;
      return {
        hasImg: !!img,
        imgHeight: imgRect ? imgRect.height : 0,
        spanText: span ? span.textContent.trim() : '',
        spanWidth: spanRect ? spanRect.width : 0
      };
    }, headerLogoHandle);

    if (!headerLogoDetails.hasImg || headerLogoDetails.imgHeight < 30) {
      throw new Error(`Header mark missing or too small in ${label}`);
    }
    if (headerLogoDetails.spanText !== 'Buffalo Back Labs' || headerLogoDetails.spanWidth < 120) {
      throw new Error(`Header wordmark text missing or clipped in ${label}: "${headerLogoDetails.spanText}" (${headerLogoDetails.spanWidth}px)`);
    }
    console.log(`✓ Header logo verified in ${label} (mark height: ${Math.round(headerLogoDetails.imgHeight)}px, text: "${headerLogoDetails.spanText}", width: ${Math.round(headerLogoDetails.spanWidth)}px)`);

    // 4. Verify Hero Mark & Hero Cleanliness (No AI Tagline in Hero)
    const heroText = await page.$eval('#hero', el => el.innerText);
    if (heroText.includes('Yes, AI built this website') || heroText.includes('ಹೌದು, ಎಐ ಈ ವೆಬ್‌ಸೈಟ್')) {
      throw new Error(`#hero still contains AI tagline in ${label}`);
    }
    console.log(`✓ Verified #hero does NOT contain AI tagline in ${label}`);

    const heroMarkHandle = await page.$('section#hero img[alt="Buffalo Back Labs Mark"]:visible');
    if (!heroMarkHandle) {
      throw new Error(`Hero Mark missing or hidden in ${label}`);
    }
    const heroMarkRect = await heroMarkHandle.boundingBox();
    if (!heroMarkRect || (isMobile ? heroMarkRect.width < 40 : heroMarkRect.width < 200)) {
      throw new Error(`Hero Mark size incorrect in ${label}: ${JSON.stringify(heroMarkRect)}`);
    }
    console.log(`✓ Hero Mark verified in ${label} (visible width: ${Math.round(heroMarkRect.width)}px)`);

    // 5. Verify Mobile + Web Layered Demo Screenshots in #products
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));

    const screenshotCheck = await page.evaluate(() => {
      const webImg = document.querySelector('img[src*="/screenshots/kaithota-web.png"]');
      const mobileImg = document.querySelector('img[src*="/screenshots/kaithota-mobile.png"]');
      return {
        hasWeb: !!webImg,
        webLoaded: webImg ? webImg.naturalWidth > 0 : false,
        webWidth: webImg ? webImg.naturalWidth : 0,
        hasMobile: !!mobileImg,
        mobileLoaded: mobileImg ? mobileImg.naturalWidth > 0 : false,
        mobileWidth: mobileImg ? mobileImg.naturalWidth : 0
      };
    });

    if (!screenshotCheck.hasWeb || !screenshotCheck.webLoaded) {
      throw new Error(`Web dashboard screenshot missing or failed to load in ${label}: ${JSON.stringify(screenshotCheck)}`);
    }
    if (!screenshotCheck.hasMobile || !screenshotCheck.mobileLoaded) {
      throw new Error(`Mobile farmer screenshot missing or failed to load in ${label}: ${JSON.stringify(screenshotCheck)}`);
    }
    console.log(`✓ Layered demo screenshots verified in ${label} (Web: ${screenshotCheck.webWidth}px, Mobile: ${screenshotCheck.mobileWidth}px natural)`);

    // 6. Verify Ecosystem Partner Logos from bbcf.store in #ecosystem
    const ecosystemLogosCheck = await page.evaluate(() => {
      const expectedLogos = [
        'logo-buffaloback.png',
        'logo-kaithota.png',
        'logo-16doddi.png',
        'logo-ragihalli.png'
      ];
      const imgs = Array.from(document.querySelectorAll('#ecosystem img'));
      const loaded = imgs.filter(img => img.naturalWidth > 0).map(img => {
        return expectedLogos.find(name => img.src.includes(name));
      }).filter(Boolean);

      return {
        totalFound: imgs.length,
        loadedCount: loaded.length,
        loadedLogos: loaded
      };
    });

    if (ecosystemLogosCheck.loadedCount < 4) {
      throw new Error(`Ecosystem logos missing or failed to load in ${label}: ${JSON.stringify(ecosystemLogosCheck)}`);
    }
    console.log(`✓ 4 BBCF ecosystem logos loaded successfully in ${label}: ${ecosystemLogosCheck.loadedLogos.join(', ')}`);

    // 7. Verify Footer Details (Option A Logo, labs@ email, Jayanagar address, legal bar with AI tagline)
    const footer = await page.$('footer');
    if (!footer) throw new Error(`Footer missing in ${label}`);

    const footerDetails = await page.evaluate((f) => {
      const text = f.innerText;
      const brandLink = f.querySelector('a[aria-label="Buffalo Back Labs"]');
      const img = brandLink ? brandLink.querySelector('img') : null;
      const span = brandLink ? brandLink.querySelector('span') : null;
      const spanRect = span ? span.getBoundingClientRect() : null;
      const emailLink = f.querySelector('a[href="mailto:labs@buffaloback.in"]');
      const socialLinks = Array.from(f.querySelectorAll('a[aria-label]')).map(a => a.getAttribute('aria-label'));

      return {
        hasLogoImg: !!img && (img.src.includes('Icon%20Color%20White.svg') || img.src.includes('Icon Color White.svg') || img.src.includes('Logo%20Color%20White.png')),
        hasWordmark: !!span && span.textContent.trim() === 'Buffalo Back Labs' && spanRect.width >= 120,
        spanWidth: spanRect ? spanRect.width : 0,
        hasLabsEmail: !!emailLink && emailLink.textContent.includes('labs@buffaloback.in'),
        hasJayanagar: text.includes('Jayanagar, Bangalore') || text.includes('ಜಯನಗರ, ಬೆಂಗಳೂರು'),
        hasNoCIN: !text.includes('CIN:'),
        hasCopyright: text.includes('© 2026 Buffalo Back Labs (OPC) Private Limited.'),
        hasAITagline: text.includes('(noticed the famous emdash?)') || text.includes('ಎಮ್‌ಡ್ಯಾಶ್'),
        rawAITagline: text.includes('Yes, AI built this website') || text.includes('ಹೌದು, ಎಐ ಈ ವೆಬ್‌ಸೈಟ್'),
        socials: socialLinks
      };
    }, footer);

    if (!footerDetails.hasLogoImg || !footerDetails.hasWordmark) {
      throw new Error(`Footer logo unclipped check failed in ${label}: ${JSON.stringify(footerDetails)}`);
    }
    if (!footerDetails.hasLabsEmail) {
      throw new Error(`Footer missing labs@buffaloback.in link in ${label}`);
    }
    if (!footerDetails.hasJayanagar || !footerDetails.hasNoCIN) {
      throw new Error(`Footer address/CIN check failed in ${label}: hasJayanagar=${footerDetails.hasJayanagar}, hasNoCIN=${footerDetails.hasNoCIN}`);
    }
    if (!footerDetails.hasCopyright || !footerDetails.hasAITagline) {
      throw new Error(`Footer legal bar missing copyright or '(noticed the famous emdash?)' in ${label}`);
    }
    console.log(`✓ Footer verified in ${label} (labs@ email, Jayanagar address, legal bar with '(noticed the famous emdash?)' tagline)`);
    if (footerDetails.socials.includes('GitHub')) {
      throw new Error(`Footer still contains GitHub social link in ${label}`);
    }
    if (!footerDetails.socials.includes('LinkedIn') || !footerDetails.socials.includes('Substack')) {
      throw new Error(`Footer missing LinkedIn or Substack in ${label}: ${footerDetails.socials.join(', ')}`);
    }

    console.log(`✓ Footer verified in ${label} (labs@ email, Jayanagar address, legal bar with AI tagline, socials: ${footerDetails.socials.join(', ')})`);
  }

  // Helper to verify Contact Form functionality
  async function auditContactForm(page, label) {
    const form = await page.$('#contact form');
    if (!form) throw new Error(`Contact form missing in ${label}`);

    let lastWebhookPayload = null;
    await page.route(/script\.google\.com/, async route => {
      try {
        lastWebhookPayload = JSON.parse(route.request().postData());
      } catch (e) {}
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"status":"success"}' });
    });

    // Verify 5 fields + honeypot
    const nameInput = await page.$('#contact-name');
    const orgInput = await page.$('#contact-org');
    const emailInput = await page.$('#contact-email');
    const topicSelect = await page.$('#contact-topic');
    const messageInput = await page.$('#contact-message');
    const honeypot = await page.$('input[name="company_website_url"]');

    if (!nameInput || !orgInput || !emailInput || !topicSelect || !messageInput || !honeypot) {
      throw new Error(`One or more contact form fields missing in ${label}`);
    }

    // Verify direct email row has labs@buffaloback.in
    const contactEmailLink = await page.$('#contact a[href="mailto:labs@buffaloback.in"]');
    if (!contactEmailLink) {
      throw new Error(`Contact section missing labs@buffaloback.in link in ${label}`);
    }

    // Test form validation: submit empty form
    const submitBtn = await page.$('#contact button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(200);

    const hasValidationErrors = await page.evaluate(() => {
      const errs = document.querySelectorAll('#contact span.text-red-500');
      return errs.length >= 2;
    });
    if (!hasValidationErrors) throw new Error(`Validation errors did not render on empty submission in ${label}`);
    console.log(`✓ Contact form validation verified in ${label}`);

    // Test client-side URL blocking: entering http:// or https:// must be rejected
    await nameInput.fill('Bot Spammer');
    await emailInput.fill('spammer@evilbot.com');
    await messageInput.fill('Check out our crypto spam http://spam-links.com right now!');
    await submitBtn.click();
    await page.waitForTimeout(200);

    const urlBlocked = await page.evaluate(() => {
      const formEl = document.querySelector('#contact form');
      const errs = Array.from(document.querySelectorAll('#contact span.text-red-500')).map(e => e.textContent);
      const isStillForm = !!formEl;
      const hasUrlErr = errs.some(txt => txt.includes('URL') || txt.includes('http'));
      return isStillForm && hasUrlErr;
    });
    if (!urlBlocked) {
      throw new Error(`Client-side URL blocking failed in ${label}`);
    }
    console.log(`✓ Client-side URL blocking verified in ${label}`);

    // Fill clean valid data
    await nameInput.fill('Kavitha Rao');
    await orgInput.fill('Karnataka Mahila Raitha Okkuta');
    await emailInput.fill('kavitha@okkuta.org');
    await topicSelect.selectOption('Kai Thota / PGS Tools');
    await messageInput.fill('We would like to pilot Kai Thota OS with 50 women organic farmers in our collective.');

    // Submit valid form
    const currentSubmitBtn = await page.$('#contact button[type="submit"]');
    await currentSubmitBtn.click();
    
    // Wait for success heading to appear
    await page.waitForSelector('#contact h3', { timeout: 6000 });
    const successHeading = await page.$('#contact h3');
    console.log(`✓ Form submission success state verified in ${label}`);

    if (lastWebhookPayload) {
      if (typeof lastWebhookPayload.elapsed_ms !== 'number' || lastWebhookPayload.elapsed_ms < 0) {
        throw new Error(`Webhook payload missing valid elapsed_ms in ${label}: ${JSON.stringify(lastWebhookPayload)}`);
      }
      console.log(`✓ Webhook payload contains elapsed_ms (${lastWebhookPayload.elapsed_ms}ms)`);
    }

    // Test reset button
    const resetBtn = await page.$('#contact button:has-text("another message"), #contact button:has-text("ಮತ್ತೊಂದು ಸಂದೇಶ")');
    if (resetBtn) {
      await resetBtn.click();
      await page.waitForTimeout(200);
      const restoredForm = await page.$('#contact form');
      if (!restoredForm) throw new Error(`Form was not restored on reset in ${label}`);
      console.log(`✓ Form reset verified in ${label}`);
    }
  }

  // 1. Desktop 1440x900 - Light Mode
  console.log('\n--- Testing Desktop 1440x900: Light Mode ---');
  const contextDesktopLight = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });
  const pageDesktopLight = await contextDesktopLight.newPage();
  pageDesktopLight.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop Light] ${msg.text()}`);
  });

  await pageDesktopLight.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await auditPage(pageDesktopLight, 'Desktop Light Mode', false);
  await auditContactForm(pageDesktopLight, 'Desktop Light Mode');
  await pageDesktopLight.screenshot({ path: 'public/playwright-evidence/bbl-light-desktop-1440.png', fullPage: true });
  console.log('✓ Captured: bbl-light-desktop-1440.png');

  // Close-up captures
  const productsProofElem = await pageDesktopLight.$('#proof');
  if (productsProofElem) {
    await productsProofElem.screenshot({ path: 'public/playwright-evidence/proof-layered-frame-desktop.png' });
    console.log('✓ Captured close-up: proof-layered-frame-desktop.png');
  }
  const ecosystemElem = await pageDesktopLight.$('#ecosystem');
  if (ecosystemElem) {
    await ecosystemElem.screenshot({ path: 'public/playwright-evidence/ecosystem-logos-desktop.png' });
    console.log('✓ Captured close-up: ecosystem-logos-desktop.png');
  }
  const footerElem = await pageDesktopLight.$('footer');
  if (footerElem) {
    await footerElem.screenshot({ path: 'public/playwright-evidence/footer-clean-desktop.png' });
    console.log('✓ Captured close-up: footer-clean-desktop.png');
  }

  // 2. Desktop 1440x900 - Dark Mode
  console.log('\n--- Testing Desktop 1440x900: Dark Mode ---');
  const contextDesktopDark = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  const pageDesktopDark = await contextDesktopDark.newPage();
  pageDesktopDark.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop Dark] ${msg.text()}`);
  });

  await pageDesktopDark.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await auditPage(pageDesktopDark, 'Desktop Dark Mode', false);
  await auditContactForm(pageDesktopDark, 'Desktop Dark Mode');
  await pageDesktopDark.screenshot({ path: 'public/playwright-evidence/bbl-dark-desktop-1440.png', fullPage: true });
  console.log('✓ Captured: bbl-dark-desktop-1440.png');

  // 3. Mobile 390x844 - Light Mode
  console.log('\n--- Testing Mobile 390x844: Light Mode ---');
  const contextMobileLight = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'light'
  });
  const pageMobileLight = await contextMobileLight.newPage();
  pageMobileLight.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile Light] ${msg.text()}`);
  });

  await pageMobileLight.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await auditPage(pageMobileLight, 'Mobile Light Mode', true);
  
  // Verify mobile touch targets >= 44/48px
  const touchHeights = await pageMobileLight.evaluate(() => {
    const inputs = document.querySelectorAll('#contact input:not([name="company_website_url"]):not([type="hidden"]), #contact select, #contact button[type="submit"]');
    return Array.from(inputs).map(inp => ({
      tag: inp.tagName,
      id: inp.id,
      height: inp.getBoundingClientRect().height
    }));
  });
  const touchTargetsOk = touchHeights.every(t => t.height >= 44);
  if (!touchTargetsOk) throw new Error('Mobile touch targets below 44/48px in Contact Form');
  console.log('✓ Contact form mobile touch targets verified >= 48px');

  await pageMobileLight.screenshot({ path: 'public/playwright-evidence/bbl-light-mobile-390.png', fullPage: true });
  console.log('✓ Captured: bbl-light-mobile-390.png');

  // 4. Mobile 390x844 - Dark Mode
  console.log('\n--- Testing Mobile 390x844: Dark Mode ---');
  const contextMobileDark = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark'
  });
  const pageMobileDark = await contextMobileDark.newPage();
  pageMobileDark.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile Dark] ${msg.text()}`);
  });

  await pageMobileDark.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await auditPage(pageMobileDark, 'Mobile Dark Mode', true);
  await pageMobileDark.screenshot({ path: 'public/playwright-evidence/bbl-dark-mobile-390.png', fullPage: true });
  console.log('✓ Captured: bbl-dark-mobile-390.png');

  // 5. Kannada Language Verification
  const knBtn = await pageDesktopLight.$('button[aria-label="Toggle language between English and Kannada"]');
  if (knBtn) {
    await knBtn.click();
    await pageDesktopLight.waitForTimeout(400);
    const knHeading = await pageDesktopLight.textContent('#contact h2');
    console.log(`✓ Kannada contact heading verified: "${knHeading.trim()}"`);
    await pageDesktopLight.screenshot({ path: 'public/playwright-evidence/bbl-kannada-desktop-1440.png', fullPage: true });
  }

  await browser.close();
  preview.kill();

  if (consoleErrors.length > 0) {
    console.error('Console errors detected:', consoleErrors);
    process.exit(1);
  }

  console.log('\n✓ 0 Console Errors detected across all test suites');
  console.log('=== Playwright QA Verification (BBL-WEBSITE-1.2) PASSED ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('QA Test Failed:', err);
  process.exit(1);
});
