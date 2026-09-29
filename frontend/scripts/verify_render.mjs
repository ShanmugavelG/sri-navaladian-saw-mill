import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function runVerification() {
  console.log('🚀 Starting browser verification with Edge...');
  
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  const errors = [];

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Browser console error:', msg.text());
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.error('Browser page error:', err.message);
    errors.push(`Page error: ${err.message}`);
  });

  try {
    // 1. Desktop English Test
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    console.log('✓ Page loaded successfully at 1440x900');

    // Verify initial lang is en
    let lang = await page.evaluate(() => document.documentElement.lang);
    console.log(`✓ Initial document lang: "${lang}"`);
    if (lang !== 'en') errors.push(`Expected initial lang to be 'en', got '${lang}'`);

    // Verify Title
    let title = await page.title();
    console.log(`✓ Page title: "${title}"`);

    // Verify Hero Heading
    const heroH1 = await page.$eval('.hero-editorial-headline', el => el.innerText.trim());
    console.log(`✓ Hero Headline (EN):\n${heroH1}`);

    // Check for any untranslated raw keys like "hero." or "products."
    const bodyText = await page.$eval('body', el => el.innerText);
    const untranslatedMatches = bodyText.match(/\b(hero|products|nav|trust|treeCutting|about|contact|footer)\.[a-zA-Z0-9]+\b/g);
    if (untranslatedMatches) {
      console.error('❌ Found untranslated keys:', untranslatedMatches);
      errors.push(`Untranslated keys found: ${untranslatedMatches.join(', ')}`);
    } else {
      console.log('✓ Zero raw translation keys detected in English');
    }

    // Capture English Desktop Screenshot
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\test_desktop_en.png', fullPage: true });
    console.log('✓ Captured full-page desktop English screenshot');

    // 2. Switch to Tamil
    console.log('\n🌐 Clicking Tamil language switcher...');
    const taButton = await page.$('.desktop-lang-switcher button[title="தமிழ்"]');
    if (!taButton) {
      throw new Error('Tamil language switcher button not found!');
    }
    await taButton.click();
    await new Promise(r => setTimeout(r, 600));

    // Verify lang attribute changed to ta
    lang = await page.evaluate(() => document.documentElement.lang);
    console.log(`✓ Document lang after switch: "${lang}"`);
    if (lang !== 'ta') errors.push(`Expected lang to be 'ta', got '${lang}'`);

    // Verify Tamil Page Title
    title = await page.title();
    console.log(`✓ Tamil Page title: "${title}"`);

    // Verify Tamil Hero Heading
    const heroH1Ta = await page.$eval('.hero-editorial-headline', el => el.innerText.trim());
    console.log(`✓ Hero Headline (Tamil):\n${heroH1Ta}`);

    // Verify Tamil Nav Links
    const navTextTa = await page.$$eval('.nav-item-link', els => els.map(e => e.innerText.trim()));
    console.log(`✓ Tamil Nav Links: [${navTextTa.join(', ')}]`);

    // Check untranslated keys in Tamil
    const bodyTextTa = await page.$eval('body', el => el.innerText);
    const untranslatedMatchesTa = bodyTextTa.match(/\b(hero|products|nav|trust|treeCutting|about|contact|footer)\.[a-zA-Z0-9]+\b/g);
    if (untranslatedMatchesTa) {
      console.error('❌ Found untranslated keys in Tamil:', untranslatedMatchesTa);
      errors.push(`Untranslated keys found in Tamil: ${untranslatedMatchesTa.join(', ')}`);
    } else {
      console.log('✓ Zero raw translation keys detected in Tamil');
    }

    // Capture Tamil Desktop Screenshot
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\test_desktop_ta.png', fullPage: true });
    console.log('✓ Captured full-page desktop Tamil screenshot');

    // 3. Test Persistence across Reload
    console.log('\n🔄 Testing language persistence across page reload...');
    await page.reload({ waitUntil: 'networkidle0' });
    lang = await page.evaluate(() => document.documentElement.lang);
    console.log(`✓ Document lang after reload: "${lang}"`);
    if (lang !== 'ta') errors.push(`Language persistence failed: expected 'ta', got '${lang}'`);

    // 4. Test Mobile Responsive Viewports
    const mobileViewports = [
      { name: '375px (iPhone SE)', width: 375, height: 667 },
      { name: '414px (Mobile Plus)', width: 414, height: 896 },
      { name: '768px (Tablet Portrait)', width: 768, height: 1024 },
    ];

    for (const vp of mobileViewports) {
      console.log(`\n📱 Testing viewport: ${vp.name}...`);
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await new Promise(r => setTimeout(r, 400));

      // Check horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      console.log(`  Horizontal overflow: ${hasHorizontalScroll ? 'FAILED (has overflow)' : 'PASSED (no overflow)'}`);
      if (hasHorizontalScroll) {
        errors.push(`Horizontal overflow detected at ${vp.name}`);
      }

      // Check mobile drawer opens
      const hamburger = await page.$('.mobile-menu-toggle');
      if (hamburger && (await hamburger.isIntersectingViewport())) {
        await hamburger.click();
        await new Promise(r => setTimeout(r, 300));
        const isOpen = await page.$eval('.mobile-nav-sheet', el => el.classList.contains('is-open'));
        console.log(`  Mobile drawer opened: ${isOpen ? 'YES' : 'NO'}`);
        
        // Close menu
        const closeBtn = await page.$('.sheet-close-btn');
        if (closeBtn) await closeBtn.click();
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // Capture Mobile Tamil Screenshot
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\test_mobile_ta.png' });
    console.log('✓ Captured mobile Tamil screenshot (375px)');

    // Switch back to English in mobile and capture
    await page.evaluate(() => {
      localStorage.setItem('sri-navaladian-language', 'en');
      window.location.reload();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\test_mobile_en.png' });
    console.log('✓ Captured mobile English screenshot (375px)');

  } catch (err) {
    console.error('Test execution error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n====================================');
  if (errors.length === 0) {
    console.log('🎉 ALL VERIFICATION TESTS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`⚠️ Found ${errors.length} issue(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

runVerification();
