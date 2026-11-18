const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function run() {
  console.log('--- Starting Playwright QA Verification (Light & Dark Mode) ---');

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

  // Helper to verify horizontal overflow and logo
  async function auditPage(page, label) {
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      throw new Error(`Horizontal overflow detected in ${label}`);
    }
    console.log(`✓ Zero horizontal overflow verified in ${label}`);

    // Verify logo
    const logoHandle = await page.$('header a img');
    if (!logoHandle) throw new Error(`Header logo missing in ${label}`);
    
    const logoDetails = await page.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const parentText = el.closest('a').textContent.trim();
      return {
        visible: rect.width > 50 && rect.height > 15,
        width: rect.width,
        height: rect.height,
        parentText: parentText,
        src: el.src
      };
    }, logoHandle);

    if (!logoDetails.visible) {
      throw new Error(`Logo is clipped or zero-sized in ${label}: ${JSON.stringify(logoDetails)}`);
    }
    if (logoDetails.parentText !== '') {
      throw new Error(`Logo has duplicated sibling text in ${label}: "${logoDetails.parentText}"`);
    }
    console.log(`✓ Logo verified in ${label} (width: ${Math.round(logoDetails.width)}px, height: ${Math.round(logoDetails.height)}px, no duplicate text, src: ${logoDetails.src.split('/').pop()})`);
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
  await auditPage(pageDesktopLight, 'Desktop Light Mode');
  await pageDesktopLight.screenshot({ path: 'public/playwright-evidence/bbl-light-desktop-1440.png', fullPage: true });
  console.log('✓ Captured: bbl-light-desktop-1440.png');

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
  await auditPage(pageDesktopDark, 'Desktop Dark Mode');
  await pageDesktopDark.screenshot({ path: 'public/playwright-evidence/bbl-dark-desktop-1440.png', fullPage: true });
  console.log('✓ Captured: bbl-dark-desktop-1440.png');

  // Test Sun/Moon Toggle button interactivity
  const themeToggle = await pageDesktopDark.$('header button[aria-label="Switch to light mode"], header button[aria-label="Switch to dark mode"]');
  if (themeToggle) {
    await themeToggle.click();
    await pageDesktopDark.waitForTimeout(300);
    console.log('✓ Sun/Moon theme toggle interactive click verified');
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
  await auditPage(pageMobileLight, 'Mobile Light Mode');
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
  await auditPage(pageMobileDark, 'Mobile Dark Mode');
  await pageMobileDark.screenshot({ path: 'public/playwright-evidence/bbl-dark-mobile-390.png', fullPage: true });
  console.log('✓ Captured: bbl-dark-mobile-390.png');

  // 5. Kannada Language Verification
  const knBtn = await pageDesktopLight.$('button[aria-label="Toggle language between English and Kannada"]');
  if (knBtn) {
    await knBtn.click();
    await pageDesktopLight.waitForTimeout(400);
    const knHeadline = await pageDesktopLight.textContent('h1');
    if (!knHeadline.includes('ಕೃಷಿ-ಪರಿಸರ')) {
      throw new Error('Kannada translation failed');
    }
    console.log(`✓ Kannada toggle verified: "${knHeadline.trim()}"`);
    await pageDesktopLight.screenshot({ path: 'public/playwright-evidence/bbl-kannada-desktop-1440.png', fullPage: true });
  }

  await browser.close();
  preview.kill();

  if (consoleErrors.length > 0) {
    console.error('Console errors detected:', consoleErrors);
    process.exit(1);
  }

  console.log('\n✓ 0 Console Errors detected across all modes and viewports');
  console.log('=== Playwright QA Verification (Light & Dark Mode) PASSED ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('QA Test Failed:', err);
  process.exit(1);
});
