const buildName = process.env.BROWSERSTACK_BUILD_NAME;

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  updateJob: false,
  specs: [
    './test/specs/**/*.js'
  ],
  exclude: [],

  maxInstances: 5,

  commonCapabilities: {
    name: Date.now().toString(),
    build: buildName,
    project: 'BrowserStack Assessment'
  },

  capabilities: [{
    'browser': 'chrome',
    'browser_version': 'latest',
    'os': 'Windows',
    'os_version': '10'
  },{
    "os_version" : "14",
    "device" : "iPad Air 4",
    "real_mobile" : "true",
    "browserstack.local" : "false",
    "browserstack.user" : "masonhoffman_OWQoHk",
    "browserstack.key" : "ZMZ6y2dJrv8cMM7JsVCn",
    "browserName" : "iPad"
  },{
    'browser': 'safari',
    'browser_version': 'latest',
    'os': 'OS X',
    'os_version': 'Big Sur'
  },{
    "os_version" : "10.0",
    "device" : "Samsung Galaxy S20",
    "real_mobile" : "true",
    "browserstack.local" : "false",
    "browserstack.user" : "masonhoffman_OWQoHk",
    "browserstack.key" : "ZMZ6y2dJrv8cMM7JsVCn",
    "browserName" : "Android"
  },{
    "os_version" : "14",
    "device" : "iPhone 12",
    "real_mobile" : "true",
    "browserstack.local" : "false",
    "browserstack.user" : "masonhoffman_OWQoHk",
    "browserstack.key" : "ZMZ6y2dJrv8cMM7JsVCn",
    "browserName" : "iPhone"
  }],
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'https://www.mason-hoffman.com',
  waitforTimeout: 12000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd'
  },
  // Code to mark the status of test on BrowserStack based on the assertion status
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  },
}
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps, index){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
  exports.config.capabilities[index] = { ...caps, ...caps['browser'] && { browserName: caps['browser'] } };
});