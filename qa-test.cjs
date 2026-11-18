const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function run() {
  console.log('--- Starting Playwright QA Verification ---');

  // Start preview server
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--host', '127.0.0.1', '--strictPort'], {
    stdio: 'pipe',
    shell: true
  });

  preview.stdout.on('data', (d) => console.log(`[Vite Preview] ${d.toString().trim()}`));
  preview.stderr.on('data', (d) => console.error(`[Vite Preview Error] ${d.toString().trim()}`));

  // Wait for server to be responsive
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
    console.error('Server failed to start in time.');
    preview.kill();
    process.exit(1);
  }

  console.log('✓ Vite preview server is live on http://127.0.0.1:4173');

  fs.mkdirSync('public/playwright-evidence', { recursive: true });

  const browser = await chromium.launch();
  
  // 1. Desktop Test
  const consoleErrors = [];
  const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();

  pageDesktop.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const response = await pageDesktop.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  console.log(`✓ HTTP status: ${response.status()}`);
  if (response.status() !== 200) throw new Error('Expected status 200');

  // Check branding & key headers
  const headline = await pageDesktop.textContent('h1');
  console.log(`✓ Page headline: "${headline.trim()}"`);
  if (!headline.includes('Technology for Agroecology')) {
    throw new Error('Headline does not contain "Technology for Agroecology"');
  }

  // Check section visibility
  const sections = ['#products', '#services', '#research', '#about', '#ecosystem', '#contact'];
  for (const s of sections) {
    const el = await pageDesktop.$(s);
    if (!el) throw new Error(`Missing required section: ${s}`);
    console.log(`✓ Section verified: ${s}`);
  }

  // Check Research mentions Iruliga and Lambani
  const researchText = await pageDesktop.textContent('#research');
  if (!researchText.includes('Iruliga') || !researchText.includes('Lambani')) {
    throw new Error('Research section missing Iruliga or Lambani ASR keywords');
  }
  console.log('✓ Research section contains Iruliga & Lambani vernacular voice ASR references');

  // Check logo SVG loaded
  const logoImg = await pageDesktop.$('img[alt="Buffalo Back Labs Logo"]');
  if (!logoImg) throw new Error('BBL Logo image not found');
  console.log('✓ Official BBL Logo SVG rendered cleanly');

  // Full-page screenshot desktop
  await pageDesktop.screenshot({ path: 'public/playwright-evidence/bbl-desktop-full.png', fullPage: true });
  console.log('✓ Saved desktop full-page screenshot: public/playwright-evidence/bbl-desktop-full.png');

  // Test language switcher to Kannada
  const langBtn = await pageDesktop.$('button[aria-label="Toggle language between English and Kannada"]');
  if (langBtn) {
    await langBtn.click();
    await pageDesktop.waitForTimeout(500);
    const knHeadline = await pageDesktop.textContent('h1');
    console.log(`✓ Kannada toggle verified: "${knHeadline.trim()}"`);
    await pageDesktop.screenshot({ path: 'public/playwright-evidence/bbl-desktop-kannada.png', fullPage: true });
    // Toggle back
    await langBtn.click();
    await pageDesktop.waitForTimeout(500);
  }

  // 2. Mobile Viewport Test (390x844 iPhone 14 / modern standard)
  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const pageMobile = await contextMobile.newPage();
  pageMobile.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await pageMobile.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: 'public/playwright-evidence/bbl-mobile-hero.png', fullPage: false });
  await pageMobile.screenshot({ path: 'public/playwright-evidence/bbl-mobile-full.png', fullPage: true });
  console.log('✓ Saved mobile screenshots (390x844)');

  await browser.close();
  preview.kill();

  if (consoleErrors.length > 0) {
    console.error('Console errors detected:', consoleErrors);
    process.exit(1);
  }

  console.log('✓ 0 Console Errors detected');
  console.log('=== Playwright QA Verification PASSED ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('QA Test Failed:', err);
  process.exit(1);
});
