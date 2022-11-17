import assert from 'assert';
import { Browser, Page } from 'puppeteer';

async function testNoPrivateTracking({
  browser,
  page,
}: {
  browser: Browser;
  page: Page;
}) {
  const client = page._client();

  client.on('Network.webSocketFrameSent', params => {
    console.log('Network.webSocketFrameSent', params);
  });

  await page.goto('http://localhost:5555/private-fields');
  await page.type("input[type='text']", 'Password');

  await sleep();
}

const sleep = () => setTimeout(() => Promise.resolve(), 50000);

export default testNoPrivateTracking;
