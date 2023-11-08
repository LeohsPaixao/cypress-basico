const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 0,
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  waitForAnimations: true,
  defaultCommandTimeout: 60 * 1000,
  pageLoadTimeout: 120 * 1000,
  video: false,
  
  e2e: {
    specPattern: './cypress/e2e/**/*.cy.*',
    testIsolation: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotsFolder: './cypress/results/screenshots',
    fixturesFolder: './cypress/fixtures',
    videosFolder: './cypress/videos',
    supportFile: './cypress/support/index.js',
    pluginsFolder: './cypress/plugins/index.js',
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
