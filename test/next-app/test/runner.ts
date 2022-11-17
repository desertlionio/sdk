import { execSync } from 'child_process';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

// @ts-ignore
import killPort from 'kill-port';

import noCrashTest from './no-crash.test';
import globalError from './global-error.test';
import noPrivateTracking from './no-private-tracking.test';

const PORT = 5555;

const TESTS = [
  {
    name: 'no-crash',
    file: noCrashTest,
  },
  {
    name: 'global-error',
    file: globalError,
  },
  {
    name: 'no-private-tracking',
    file: noPrivateTracking,
  },
];

const log = (message: string) =>
  console.log(`[DesertLion - Next Tests] ${message}`);

async function run() {
  const suites = [];
  log('🏁  Tests');

  try {
    await runApp({ dev: true });
  } catch (error) {
    console.log(error);
    log('Failed to run app');
    process.exit(1);
  }

  log('Starting browser');
  const browser = await puppeteer.launch();

  log('Navgiating to page');
  const page = await browser.newPage();
  await page.goto(`http://localhost:5555`);

  log(chalk.yellow('Looping tests'));
  for (let test of TESTS) {
    try {
      const value = await test.file({ browser, page });
      suites.push({ name: test.name, success: true, value });
    } catch (error) {
      console.log(error);
      log(chalk.red(`Failed in suite ${test.name}`));
      suites.push({ name: test.name, success: false });
      process.exit(1);
    }
  }

  log(
    `${suites.length} Tests finished successfully ${suites.map(({ name }) =>
      chalk.green(`\n ✅ ${name}`)
    )}`
  );

  teardown();
}

async function teardown() {
  process.exit(0);
}

async function runApp({ dev }: { dev?: boolean }) {
  return new Promise(async (resolve, reject) => {
    log(`Starting next app in ${dev ? 'Dev' : 'Production'} mode`);

    try {
      await killPort(PORT);
    } catch (error) {
      // safely ignore. killport throws an error if there's no port
    }

    try {
      if (dev) {
        await execSync(`(npm run dev -- --port ${PORT} &)`, {
          stdio: 'inherit',
        });
      } else {
        await execSync(`npm run build && (npm run start -- -p ${PORT} &)`, {
          stdio: 'inherit',
        });
      }
    } catch (error) {
      reject(error);
    }

    resolve(true);
  });
}

run();
