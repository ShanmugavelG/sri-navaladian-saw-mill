import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = 'C:/Users/shanm/.gemini/antigravity-ide/brain/5fa7d7c7-4d78-4e5c-ba59-feae3cf00645';

async function run() {
  console.log('🚀 Running Mobile Product Cards QA with puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // Test which port is listening
  let baseUrl = 'http://localhost:5173';
  try {
    await page.goto(baseUrl, { timeout: 2500, waitUntil: 'domcontentloaded' });
  } catch (e) {
    baseUrl = 'http://localhost:5174';
  }
  console.log(`Connected to: ${baseUrl}`);

  const viewports = [
    { width: 360, height: 780, name: '360' },
    { width: 390, height: 844, name: '390' },
    { width: 418, height: 896, name: '418' }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    
    // 1. English
    await page.goto(`${baseUrl}/#products`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    // Ensure English
    await page.evaluate(() => {
      const enBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('EN'));
      if (enBtn) enBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const cards = await page.$$('.editorial-product-group');
    if (cards.length > 0) {
      const screenshotPathEn = path.join(ARTIFACT_DIR, `product_mobile_${vp.name}_en.png`);
      await cards[0].screenshot({ path: screenshotPathEn });
      console.log(`✓ Saved ${screenshotPathEn}`);
      
      if (cards.length > 1) {
        const screenshotPathTimberEn = path.join(ARTIFACT_DIR, `product_mobile_${vp.name}_timber_en.png`);
        await cards[1].screenshot({ path: screenshotPathTimberEn });
        console.log(`✓ Saved ${screenshotPathTimberEn}`);
      }
    }

    // 2. Tamil
    await page.evaluate(() => {
      const taBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('தமிழ்'));
      if (taBtn) taBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    if (cards.length > 0) {
      const screenshotPathTa = path.join(ARTIFACT_DIR, `product_mobile_${vp.name}_ta.png`);
      await cards[0].screenshot({ path: screenshotPathTa });
      console.log(`✓ Saved ${screenshotPathTa}`);

      if (cards.length > 1) {
        const screenshotPathTimberTa = path.join(ARTIFACT_DIR, `product_mobile_${vp.name}_timber_ta.png`);
        await cards[1].screenshot({ path: screenshotPathTimberTa });
        console.log(`✓ Saved ${screenshotPathTimberTa}`);
      }
    }
  }

  // Also verify Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/#products`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));

  const desktopCard = await page.$('.editorial-product-group');
  if (desktopCard) {
    const desktopScreenshot = path.join(ARTIFACT_DIR, 'product_desktop_check.png');
    await desktopCard.screenshot({ path: desktopScreenshot });
    console.log(`✓ Saved Desktop Check: ${desktopScreenshot}`);
  }

  await browser.close();
  console.log('🎉 ALL PRODUCT CARD QA FINISHED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('QA Error:', err);
  process.exit(1);
});
