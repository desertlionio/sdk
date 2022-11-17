const PORT = 14568;

module.exports = {
  launch: {
    headless: process.env.CI === 'true',
    userDataDir: '/Users/eyal/Desktop/data',
  },
  browserContext: process.env.INCOGNITO ? 'incognito' : 'default',
  server: {
    command: `yarn run dev --port ${PORT}`,
    port: PORT,
    launchTimeout: 10000,
  },
};
x