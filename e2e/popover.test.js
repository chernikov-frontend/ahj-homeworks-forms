import puppeteer from 'puppeteer';

describe('Popover tests', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
    });

    page = await browser.newPage();
  });

  test('Should show popover on button click', async () => {
    await page.goto('http://localhost:9000');

    const button = await page.$('.form-button');
    await button.click();

    await page.$('.popover.active');
    await page.waitForSelector('.popover.active');

    const popoverText = await page.$eval('.popover.active', (popover) => popover.textContent);
    expect(popoverText).toContain('Popover-title');
    expect(popoverText).toContain('And here\'s some amazing content. It\'s very engaging. Right?');
  });

  test('Should toggle popover visibility on multiple button clicks', async () => {
    await page.goto('http://localhost:9000');

    const button = await page.$('.form-button');
    await button.click();

    await page.$('.popover.active');
    await page.waitForSelector('.popover.active');

    await button.click();
    const isPopoverVisible = await page.$('.popover.active');
    expect(isPopoverVisible).toBeNull();
  });

  afterEach(async () => {
    await browser.close();
  });
});
