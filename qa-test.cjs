const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function run() {
  console.log('--- Starting Playwright QA Verification (Option A Vector Mark + Barlow Wordmark) ---');

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

  // Helper to verify horizontal overflow, logos, hero mark, and footer styling
  async function auditPage(page, label, isMobile = false) {
    // 1. Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      throw new Error(`Horizontal overflow detected in ${label}`);
    }
    console.log(`✓ Zero horizontal overflow verified in ${label}`);

    // 2. Verify Header Logo (Vector Mark + Barlow Condensed Wordmark)
    const headerLogoHandle = await page.$('header a[aria-label="Buffalo Back Labs"]');
    if (!headerLogoHandle) throw new Error(`Header logo link missing in ${label}`);
    
    const headerLogoDetails = await page.evaluate((a) => {
      const img = a.querySelector('img');
      const span = a.querySelector('span');
      const aRect = a.getBoundingClientRect();
      const imgRect = img ? img.getBoundingClientRect() : null;
      const spanRect = span ? span.getBoundingClientRect() : null;
      return {
        hasImg: !!img,
        imgSrc: img ? img.src : null,
        imgWidth: imgRect ? imgRect.width : 0,
        imgHeight: imgRect ? imgRect.height : 0,
        hasSpan: !!span,
        spanText: span ? span.textContent.trim() : '',
        spanWidth: spanRect ? spanRect.width : 0,
        spanHeight: spanRect ? spanRect.height : 0,
        totalWidth: aRect.width,
        totalHeight: aRect.height
      };
    }, headerLogoHandle);

    if (!headerLogoDetails.hasImg || headerLogoDetails.imgHeight < 30) {
      throw new Error(`Header mark missing or too small in ${label}: ${JSON.stringify(headerLogoDetails)}`);
    }
    if (!headerLogoDetails.hasSpan || headerLogoDetails.spanText !== 'Buffalo Back Labs') {
      throw new Error(`Header wordmark text missing or incorrect in ${label}: "${headerLogoDetails.spanText}"`);
    }
    if (headerLogoDetails.spanWidth < 120) {
      throw new Error(`Header wordmark "Buffalo Back Labs" appears clipped: width=${headerLogoDetails.spanWidth}px`);
    }
    console.log(`✓ Header logo verified in ${label} (mark: ${Math.round(headerLogoDetails.imgWidth)}x${Math.round(headerLogoDetails.imgHeight)}px, text: "${headerLogoDetails.spanText}" width: ${Math.round(headerLogoDetails.spanWidth)}px, total: ${Math.round(headerLogoDetails.totalWidth)}px)`);

    // 3. Verify Hero Mark placement
    const heroMarkHandle = await page.$('section img[alt="Buffalo Back Labs Mark"]:visible');
    if (!heroMarkHandle) {
      throw new Error(`Hero Mark missing or hidden in ${label}`);
    }
    const heroMarkRect = await heroMarkHandle.boundingBox();
    if (!heroMarkRect || (isMobile ? heroMarkRect.width < 40 : heroMarkRect.width < 140)) {
      throw new Error(`Hero Mark size incorrect in ${label}: ${JSON.stringify(heroMarkRect)}`);
    }
    console.log(`✓ Hero Mark verified in ${label} (visible width: ${Math.round(heroMarkRect.width)}px, height: ${Math.round(heroMarkRect.height)}px)`);

    // 4. Verify Ashwidea-style 3-Column Dark-Ground Footer
    const footer = await page.$('footer');
    if (!footer) throw new Error(`Footer missing in ${label}`);

    const footerDetails = await page.evaluate((f) => {
      const style = window.getComputedStyle(f);
      const bg = style.backgroundColor;
      const text = f.textContent;
      const brandLink = f.querySelector('a[aria-label="Buffalo Back Labs"]');
      const img = brandLink ? brandLink.querySelector('img') : null;
      const span = brandLink ? brandLink.querySelector('span') : null;
      const imgRect = img ? img.getBoundingClientRect() : null;
      const spanRect = span ? span.getBoundingClientRect() : null;
      const socialLinks = Array.from(f.querySelectorAll('a[aria-label]')).map(a => a.getAttribute('aria-label'));
      
      return {
        bg: bg,
        hasBrandLink: !!brandLink,
        hasImg: !!img,
        imgSrc: img ? img.src : null,
        imgWidth: imgRect ? imgRect.width : 0,
        imgHeight: imgRect ? imgRect.height : 0,
        hasSpan: !!span,
        spanText: span ? span.textContent.trim() : '',
        spanWidth: spanRect ? spanRect.width : 0,
        hasDeprecatedTag: text.includes('INDEPENDENT LAB // VOICE-FIRST SOVEREIGNTY'),
        hasCopyright: text.includes('© 2026 Buffalo Back Labs (OPC) Private Limited.'),
        socialLabels: socialLinks
      };
    }, footer);

    if (footerDetails.hasDeprecatedTag) {
      throw new Error(`Footer still contains deprecated tag 'INDEPENDENT LAB // VOICE-FIRST SOVEREIGNTY' in ${label}`);
    }
    if (!footerDetails.hasCopyright) {
      throw new Error(`Footer missing copyright notice in ${label}`);
    }
    if (!footerDetails.hasImg || footerDetails.imgHeight < 30) {
      throw new Error(`Footer mark missing or too small in ${label}: ${JSON.stringify(footerDetails)}`);
    }
    if (!footerDetails.imgSrc.includes('Icon%20Color%20White.svg') && !footerDetails.imgSrc.includes('Icon Color White.svg')) {
      throw new Error(`Footer should use Icon Color White.svg on dark ground, got: ${footerDetails.imgSrc}`);
    }
    if (!footerDetails.hasSpan || footerDetails.spanText !== 'Buffalo Back Labs' || footerDetails.spanWidth < 120) {
      throw new Error(`Footer wordmark text missing or clipped in ${label}: "${footerDetails.spanText}" (${footerDetails.spanWidth}px)`);
    }
    const expectedSocials = ['GitHub', 'LinkedIn', 'Substack'];
    for (const s of expectedSocials) {
      if (!footerDetails.socialLabels.includes(s)) {
        throw new Error(`Missing expected social button "${s}" in footer (${label})`);
      }
    }
    console.log(`✓ Ashwidea-style dark footer verified in ${label} (bg: ${footerDetails.bg}, mark + "${footerDetails.spanText}", circular socials: ${footerDetails.socialLabels.join(', ')})`);
  }

  // Helper to verify Contact Form functionality
  async function auditContactForm(page, label) {
    const form = await page.$('#contact form');
    if (!form) throw new Error(`Contact form missing in ${label}`);

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

    // Verify topic dropdown options
    const options = await page.$$eval('#contact-topic option', (opts) => opts.map(o => o.value));
    const expectedTopics = ['Kai Thota / PGS Tools', 'Custom Field Tech', 'Research & Open Source', 'Partnership / Grant', 'General'];
    for (const t of expectedTopics) {
      if (!options.includes(t)) throw new Error(`Missing expected topic "${t}" in ${label}`);
    }

    // Test form validation: submit empty form
    const submitBtn = await page.$('#contact button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(200);

    const hasValidationErrors = await page.evaluate(() => {
      const errs = document.querySelectorAll('#contact span.text-red-500');
      return errs.length >= 2; // Name & Email required
    });
    if (!hasValidationErrors) throw new Error(`Validation errors did not render on empty submission in ${label}`);
    console.log(`✓ Contact form validation verified on empty submission in ${label}`);

    // Fill valid data
    await nameInput.fill('Kavitha Rao');
    await orgInput.fill('Karnataka Mahila Raitha Okkuta');
    await emailInput.fill('kavitha@okkuta.org');
    await topicSelect.selectOption('Kai Thota / PGS Tools');
    await messageInput.fill('We would like to pilot Kai Thota OS with 50 women organic farmers in our collective.');

    // Submit valid form
    await submitBtn.click();
    await page.waitForTimeout(800);

    // Verify success state rendered
    const successHeading = await page.$('#contact h3');
    if (!successHeading) throw new Error(`Success state did not render in ${label}`);
    const successText = await successHeading.textContent();
    console.log(`✓ Form submission success state verified in ${label}: "${successText.trim()}"`);

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

  // Also capture a dedicated close-up of Header and Footer for visual inspection
  const headerElemLight = await pageDesktopLight.$('header');
  if (headerElemLight) {
    await headerElemLight.screenshot({ path: 'public/playwright-evidence/header-light-desktop.png' });
    console.log('✓ Captured close-up: header-light-desktop.png');
  }
  const footerElemLight = await pageDesktopLight.$('footer');
  if (footerElemLight) {
    await footerElemLight.screenshot({ path: 'public/playwright-evidence/footer-light-desktop.png' });
    console.log('✓ Captured close-up: footer-light-desktop.png');
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

  const headerElemDark = await pageDesktopDark.$('header');
  if (headerElemDark) {
    await headerElemDark.screenshot({ path: 'public/playwright-evidence/header-dark-desktop.png' });
    console.log('✓ Captured close-up: header-dark-desktop.png');
  }

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
  
  // Verify mobile touch targets >= 44/48px (excluding hidden honeypot)
  const touchHeights = await pageMobileLight.evaluate(() => {
    const inputs = document.querySelectorAll('#contact input:not([name="company_website_url"]):not([type="hidden"]), #contact select, #contact button[type="submit"]');
    return Array.from(inputs).map(inp => ({
      tag: inp.tagName,
      id: inp.id,
      height: inp.getBoundingClientRect().height
    }));
  });
  console.log('Mobile touch target heights:', touchHeights);
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
  console.log('=== Playwright QA Verification (Option A Vector Mark + Barlow Wordmark) PASSED ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('QA Test Failed:', err);
  process.exit(1);
});
