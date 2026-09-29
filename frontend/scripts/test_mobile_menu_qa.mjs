import puppeteer from 'puppeteer-core';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function testMobileMenu() {
  console.log('🚀 Running Comprehensive Mobile Menu QA & Visual Verification...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Console error:', msg.text());
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  try {
    // 1. Open at 418 × 768
    console.log('\n📱 Step 1: Open website at 418px × 768px...');
    await page.setViewport({ width: 418, height: 768, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    // 2. Click Hamburger
    console.log('📱 Step 2: Click mobile hamburger button...');
    const hamburger = await page.$('.mobile-menu-toggle');
    if (!hamburger) throw new Error('Mobile hamburger button not found at 418px!');
    await hamburger.click();
    await new Promise(r => setTimeout(r, 450));

    // 3. Verify Menu Completely Covers the Page
    console.log('🔍 Step 3: Verifying full-screen coverage and styling...');
    const menuState = await page.evaluate(() => {
      const portal = document.querySelector('.mobile-nav-portal');
      const style = window.getComputedStyle(portal);
      const rect = portal.getBoundingClientRect();
      const bodyOverflow = document.body.style.overflow;
      return {
        isOpen: portal.classList.contains('is-open'),
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        width: rect.width,
        height: rect.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        bodyOverflow: bodyOverflow,
      };
    });

    console.log('   Menu state:', JSON.stringify(menuState, null, 2));

    if (!menuState.isOpen || menuState.visibility !== 'visible' || menuState.opacity !== '1') {
      errors.push('Mobile menu failed to become visible on hamburger click');
    }
    if (menuState.height < menuState.viewportHeight - 2) {
      errors.push(`Mobile menu height (${menuState.height}) does not cover full viewport height (${menuState.viewportHeight})`);
    }
    if (menuState.bodyOverflow !== 'hidden') {
      errors.push(`Body overflow is not locked to 'hidden' (got '${menuState.bodyOverflow}')`);
    }

    // 4. Verify all 4 navigation links appear
    console.log('🔍 Step 4: Verifying exactly 4 editorial navigation links...');
    const links = await page.$$eval('.mobile-menu-link', els => els.map(el => ({
      idx: el.querySelector('.mobile-menu-link-idx')?.innerText.trim(),
      label: el.querySelector('.mobile-menu-link-label')?.innerText.trim(),
      href: el.getAttribute('href')
    })));

    console.log('   Rendered nav links:', links);
    if (links.length !== 4) {
      errors.push(`Expected exactly 4 navigation links, got ${links.length}`);
    }
    const expectedEnLabels = ['Home', 'About', 'Products', 'Contact Us'];
    links.forEach((l, i) => {
      if (l.label !== expectedEnLabels[i]) {
        errors.push(`Link ${i + 1} expected label '${expectedEnLabels[i]}', got '${l.label}'`);
      }
    });

    // 5. Verify EN | தமிழ் appears
    console.log('🔍 Step 5: Verifying language switcher inside menu...');
    const langBtns = await page.$$eval('.mobile-lang-btn', els => els.map(e => e.innerText.trim()));
    console.log('   Mobile language buttons:', langBtns);
    if (!langBtns.includes('EN') || !langBtns.includes('தமிழ்')) {
      errors.push('Mobile language switcher missing EN or தமிழ்');
    }

    // 6. Verify WhatsApp CTA appears
    console.log('🔍 Step 6: Verifying WhatsApp CTA button in menu...');
    const whatsappText = await page.$eval('.mobile-menu-whatsapp-btn', el => el.innerText.trim());
    console.log(`   WhatsApp CTA text: "${whatsappText}"`);
    if (!whatsappText.includes('WHATSAPP')) {
      errors.push(`Expected WhatsApp CTA button to contain 'WHATSAPP', got '${whatsappText}'`);
    }

    // Capture screenshot of opened mobile menu in English
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\mobile_menu_open_en.png' });
    console.log('   ✓ Captured screenshot: mobile_menu_open_en.png');

    // 7. Click a navigation link & 8. Verify menu closes
    console.log('\n📱 Step 7 & 8: Clicking Products link and verifying menu closes...');
    const productsLink = (await page.$$('.mobile-menu-link'))[2];
    await productsLink.click();
    await new Promise(r => setTimeout(r, 450));

    let isClosed = await page.$eval('.mobile-nav-portal', el => !el.classList.contains('is-open'));
    let bodyOverflowAfter = await page.evaluate(() => document.body.style.overflow);
    console.log(`   Menu closed: ${isClosed ? 'YES' : 'NO'}`);
    console.log(`   Body overflow restored: "${bodyOverflowAfter}"`);
    if (!isClosed) errors.push('Menu failed to close after clicking a navigation link');
    if (bodyOverflowAfter !== '') errors.push(`Body overflow not restored after menu close (got '${bodyOverflowAfter}')`);

    // 9 & 10. Reopen menu and verify
    console.log('\n📱 Step 9 & 10: Reopening menu via hamburger...');
    await page.click('.mobile-menu-toggle');
    await new Promise(r => setTimeout(r, 450));
    let isReopened = await page.$eval('.mobile-nav-portal', el => el.classList.contains('is-open'));
    console.log(`   Menu reopened successfully: ${isReopened ? 'YES' : 'NO'}`);
    if (!isReopened) errors.push('Failed to reopen menu on second hamburger click');

    // 11. Switch to Tamil
    console.log('\n🌐 Step 11: Switching to Tamil inside the open mobile menu...');
    const taBtn = await page.$('.mobile-lang-btn:nth-child(3)'); // தமிழ் button
    await taBtn.click();
    await new Promise(r => setTimeout(r, 500));

    // 12 & 13 & 14. Verify all labels are Tamil and no English remains
    console.log('🔍 Step 12, 13 & 14: Verifying Tamil menu labels and zero raw English leakage...');
    const linksTa = await page.$$eval('.mobile-menu-link', els => els.map(el => ({
      idx: el.querySelector('.mobile-menu-link-idx')?.innerText.trim(),
      label: el.querySelector('.mobile-menu-link-label')?.innerText.trim(),
      href: el.getAttribute('href')
    })));

    console.log('   Tamil nav links:', linksTa);
    const expectedTaLabels = ['முகப்பு', 'எங்களைப் பற்றி', 'தயாரிப்புகள்', 'தொடர்பு கொள்ள'];
    linksTa.forEach((l, i) => {
      if (l.label !== expectedTaLabels[i]) {
        errors.push(`Tamil Link ${i + 1} expected '${expectedTaLabels[i]}', got '${l.label}'`);
      }
    });

    const whatsappTa = await page.$eval('.mobile-menu-whatsapp-btn', el => el.innerText.trim());
    console.log(`   Tamil WhatsApp CTA: "${whatsappTa}"`);
    if (!whatsappTa.includes('வாட்ஸ்அப்')) {
      errors.push(`Tamil WhatsApp CTA expected to contain 'வாட்ஸ்அப்', got '${whatsappTa}'`);
    }

    // Capture screenshot of opened mobile menu in Tamil
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\mobile_menu_open_ta.png' });
    console.log('   ✓ Captured screenshot: mobile_menu_open_ta.png');

    // Close menu by clicking X button
    console.log('\n📱 Closing menu via X button...');
    await page.click('.mobile-menu-close-btn');
    await new Promise(r => setTimeout(r, 450));
    isClosed = await page.$eval('.mobile-nav-portal', el => !el.classList.contains('is-open'));
    console.log(`   Menu closed via X button: ${isClosed ? 'YES' : 'NO'}`);
    if (!isClosed) errors.push('Failed to close menu using X button');

    // Capture Tamil Mobile Hero after menu closed to inspect Tamil heading wrapping
    await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\mobile_hero_ta_closed.png' });
    console.log('   ✓ Captured screenshot of Tamil Mobile Hero after menu closed');

    // 15. Test at other widths: 390px, 375px, 360px, 320px
    const widths = [390, 375, 360, 320];
    for (const w of widths) {
      console.log(`\n📱 Step 15: Testing mobile width ${w}px...`);
      await page.setViewport({ width: w, height: 750, deviceScaleFactor: 2 });
      await new Promise(r => setTimeout(r, 300));

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      console.log(`   Horizontal overflow at ${w}px: ${overflow ? 'FAILED' : 'PASSED (0 overflow)'}`);
      if (overflow) errors.push(`Horizontal overflow detected at ${w}px`);

      // Open menu at this width
      await page.click('.mobile-menu-toggle');
      await new Promise(r => setTimeout(r, 350));
      const openAtW = await page.$eval('.mobile-nav-portal', el => el.classList.contains('is-open'));
      console.log(`   Menu open at ${w}px: ${openAtW ? 'PASSED' : 'FAILED'}`);
      if (!openAtW) errors.push(`Menu failed to open at ${w}px`);

      await page.click('.mobile-menu-close-btn');
      await new Promise(r => setTimeout(r, 350));
    }

    // 16. Test Desktop Viewport (> 768px)
    console.log('\n💻 Step 16: Testing Desktop (1440px) to verify desktop layout remains intact...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 300));

    const desktopState = await page.evaluate(() => {
      const desktopNav = document.querySelector('.header-nav-desktop');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      return {
        desktopNavDisplay: window.getComputedStyle(desktopNav).display,
        mobileToggleDisplay: window.getComputedStyle(mobileToggle).display,
      };
    });
    console.log('   Desktop state:', desktopState);
    if (desktopState.desktopNavDisplay === 'none') {
      errors.push('Desktop navigation is unexpectedly hidden at 1440px');
    }
    if (desktopState.mobileToggleDisplay !== 'none') {
      errors.push('Mobile toggle button is unexpectedly visible at 1440px');
    }

  } catch (err) {
    console.error('Test execution error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n====================================');
  if (errors.length === 0) {
    console.log('🎉 ALL MOBILE MENU QA TESTS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`⚠️ Found ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

testMobileMenu();
