import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3000/saved', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const nav = document.querySelectorAll('nav')[2];
  const row = nav.firstElementChild;
  const rowStyle = getComputedStyle(row);
  const children = Array.from(row.children).map((el) => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: el.className,
      width: el.getBoundingClientRect().width,
      boxSizing: cs.boxSizing,
      borderLeft: cs.borderLeftWidth,
      borderRight: cs.borderRightWidth,
      flexBasis: cs.flexBasis,
      flexGrow: cs.flexGrow,
      flexShrink: cs.flexShrink,
      minWidth: cs.minWidth,
      position: cs.position,
    };
  });
  return { rowWidth: row.getBoundingClientRect().width, rowGap: rowStyle.columnGap, children };
});
console.log(JSON.stringify(info, null, 2));

await browser.close();
