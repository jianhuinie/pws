/**
 * @fileOverview protractor configuration
 * @author XiaoBin li
 */

exports.config = {
    allScriptsTimeout: 110000,

    specs: [
        'e2e/**/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    chromeOnly: true,

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    }
};
