// Auto load specs
// Generated on Tue Dec 24 2013 18:19:36 GMT+0800 (CST)

(function() {

var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

window.DEBUG = true;

requirejs.config({
    baseUrl: '/base',

    // ask Require.js to load these files (all our tests)
    deps: tests,

    'packages': [
        
    ],

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
})();
