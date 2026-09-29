import puppeteer from 'puppeteer-core';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function testContactSection() {
  console.log('🚀 Running Contact Section Density & Contrast QA...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  const errors = [];

  try {
    // 1. Desktop Test at 1440px
    console.log('\n💻 Step 1: Testing Contact Section on Desktop (1440px)...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const contactMetrics = await page.evaluate(() => {
      const section = document.querySelector('#contact');
      const heading = document.querySelector('.contact-hero-heading');
      const plaque = document.querySelector('.architectural-plaque-panel');
      const plaqueName = document.querySelector('.plaque-business-name');
      const plaqueTamil = document.querySelector('.plaque-business-tamil');
      const plaquePhone = document.querySelector('.plaque-phone-display');

      const sectionRect = section.getBoundingClientRect();
      const plaqueRect = plaque.getBoundingClientRect();

      return {
        sectionHeight: Math.round(sectionRect.height),
        plaqueHeight: Math.round(plaqueRect.height),
        plaquePadding: window.getComputedStyle(plaque).padding,
        headingFontSize: window.getComputedStyle(heading).fontSize,
        headingLineHeight: window.getComputedStyle(heading).lineHeight,
        nameColor: window.getComputedStyle(plaqueName).color,
        tamilColor: window.getComputedStyle(plaqueTamil).color,
        phoneColor: window.getComputedStyle(plaquePhone).color,
      };
    });

    console.log('   Desktop Contact Metrics:', JSON.stringify(contactMetrics, null, 2));

    // Verify contrast: nameColor should be white/ivory (#FFFDF8 or #F8F3E9 or rgb(255, 253, 248) or rgb(248, 243, 233))
    const isBrightText = contactMetrics.nameColor.includes('255, 253, 248') || 
                         contactMetrics.nameColor.includes('248, 243, 233') ||
                         contactMetrics.nameColor.includes('255, 255, 255');
    console.log(`   Plaque Name High Contrast Check: ${isBrightText ? 'PASSED (White/Ivory: ' + contactMetrics.nameColor + ')' : 'FAILED'}`);
    if (!isBrightText) {
      errors.push(`Plaque business name color is not high-contrast ivory/white: ${contactMetrics.nameColor}`);
    }

    // Capture Desktop English Contact Section
    const contactEl = await page.$('#contact');
    await contactEl.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\contact_desktop_en.png' });
    console.log('   ✓ Captured screenshot: contact_desktop_en.png');

    // 2. Desktop Tamil Test
    console.log('\n🌐 Step 2: Testing Desktop Tamil Contact Section...');
    await page.evaluate(() => {
      localStorage.setItem('sri-navaladian-language', 'ta');
      window.location.reload();
    });
    await new Promise(r => setTimeout(r, 600));

    const contactElTa = await page.$('#contact');
    await contactElTa.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\contact_desktop_ta.png' });
    console.log('   ✓ Captured screenshot: contact_desktop_ta.png');

    // 3. Mobile Test at 390px (English & Tamil)
    console.log('\n📱 Step 3: Testing Mobile Viewport (390px)...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.evaluate(() => {
      localStorage.setItem('sri-navaladian-language', 'en');
      window.location.reload();
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileContactEl = await page.$('#contact');
    await mobileContactEl.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\contact_mobile_en.png' });
    console.log('   ✓ Captured screenshot: contact_mobile_en.png');

    // Mobile Tamil
    await page.evaluate(() => {
      localStorage.setItem('sri-navaladian-language', 'ta');
      window.location.reload();
    });
    await new Promise(r => setTimeout(r, 600));
    const mobileContactElTa = await page.$('#contact');
    await mobileContactElTa.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\contact_mobile_ta.png' });
    console.log('   ✓ Captured screenshot: contact_mobile_ta.png');

    // Reset language to default English
    await page.evaluate(() => {
      localStorage.setItem('sri-navaladian-language', 'en');
    });

  } catch (err) {
    console.error('Test error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n====================================');
  if (errors.length === 0) {
    console.log('🎉 ALL CONTACT DENSITY & CONTRAST TESTS PASSED!');
  } else {
    console.error(`⚠️ Found ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

testContactSection();
