import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 418, height: 768 });
  await page.goto('http://localhost:5173/');

  const btn = await page.$('.mobile-menu-toggle');
  await btn.click();
  await new Promise(r => setTimeout(r, 400));

  const info = await page.evaluate(() => {
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const sheet = document.querySelector('.mobile-nav-sheet');
    const header = document.querySelector('.site-header');
    return {
      headerZIndex: window.getComputedStyle(header).zIndex,
      headerOverflow: window.getComputedStyle(header).overflow,
      backdropClasses: backdrop ? backdrop.className : null,
      backdropStyle: backdrop ? {
        display: window.getComputedStyle(backdrop).display,
        visibility: window.getComputedStyle(backdrop).visibility,
        opacity: window.getComputedStyle(backdrop).opacity,
        zIndex: window.getComputedStyle(backdrop).zIndex,
        top: window.getComputedStyle(backdrop).top,
        position: window.getComputedStyle(backdrop).position,
        width: window.getComputedStyle(backdrop).width,
        height: window.getComputedStyle(backdrop).height,
      } : null,
      sheetStyle: sheet ? {
        display: window.getComputedStyle(sheet).display,
        visibility: window.getComputedStyle(sheet).visibility,
        transform: window.getComputedStyle(sheet).transform,
        width: window.getComputedStyle(sheet).width,
        height: window.getComputedStyle(sheet).height,
        rect: sheet.getBoundingClientRect(),
      } : null,
    };
  });
  console.log('Inspection:', JSON.stringify(info, null, 2));
  await page.screenshot({ path: 'd:\\Navaladian_Saw_mill\\frontend\\debug_menu_open.png' });
  await browser.close();
}

test();
