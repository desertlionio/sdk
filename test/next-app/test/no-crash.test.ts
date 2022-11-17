import assert from 'assert';
import { Browser, Page } from 'puppeteer';

async function testNoCrash({
  browser,
  page,
}: {
  browser: Browser;
  page: Page;
}) {
  await page.waitForSelector('#desertlion');
  const text = await page.$eval('#desertlion', element => {
    return element.innerHTML;
  });

  assert(
    text === 'Desert Lion Runs Suceesfully!',
    'Desert Lion loaded message is not on page'
  );

  return true;
}

export default testNoCrash;
