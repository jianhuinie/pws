'use strict';

// var browser = require('browser');
describe('ngAnimation-viewSlideIn', function() {

    it('打开demo/viewSlideIn.html hash应该是/', function() {
        browser.get('/demo/ngAnimation/viewSlideIn.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/t1');
        });
        // expect('/t1').toEqual('/t1');
    });

});