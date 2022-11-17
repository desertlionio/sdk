import assert from 'assert';
import { Browser, Page } from 'puppeteer';

async function testNoCrash({
  browser,
  page,
}: {
  browser: Browser;
  page: Page;
}) {
  const client = page._client();

  client.on('Network.webSocketCreated', ({ requestId, url }) => {
    console.log('Network.webSocketCreated', requestId, url);
  });

  client.on('Network.webSocketClosed', ({ requestId, timestamp }) => {
    console.log('Network.webSocketClosed', requestId, timestamp);
  });

  client.on(
    'Network.webSocketFrameSent',
    ({ requestId, timestamp, response }) => {
      console.log(
        'Network.webSocketFrameSent',
        requestId,
        timestamp,
        response.payloadData
      );
    }
  );

  client.on(
    'Network.webSocketFrameReceived',
    ({ requestId, timestamp, response }) => {
      console.log(
        'Network.webSocketFrameReceived',
        requestId,
        timestamp,
        response.payloadData
      );
    }
  );

  client.on(
    'Network.webSocketFrameSent',
    ({ requestId, timestamp, response }) => {
      console.log(
        'Network.webSocketFrameSent',
        requestId,
        timestamp,
        response.payloadData
      );
    }
  );

  await page.goto(`http://localhost:5555/error`);

  assert(true);
}

export default testNoCrash;
