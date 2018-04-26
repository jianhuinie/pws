/**
 * loading的e2e测试用例
 * @author hanrui
 * @date   2015/11/04
 */
describe('loading test', function () {
	var scope;
	var ctl;
	var $timeout;

	beforeEach(function () {
		browser.get('/demo/ngDirective/loading/loading.html');
	});

	describe('isLoading', function() {
		it('show', function(){
			element(by.css('.modal-loading')).getAttribute('class').then(function (txt) {
				expect(txt).not.toContain('ng-hide');
			});
		});

		// it('hidden', function(){
		// 	element(by.css('.modal-loading')).getAttribute('class').then(function (txt) {
		// 		expect(txt).toContain('ng-hide');
		// 	});
		// });
	});

	describe('isFullScreen', function() {
		it('true', function(){
			var source = element(by.css('.modal-loading'));
			source.getSize().then(function (modalSize) {
				element(by.tagName('body')).getSize().then(function (bodySize) {
					expect(modalSize.width).toBe(bodySize.width);
				});
			});
			console.log(source);
		});
		// it('false', function(){
		// 	element(by.css('.modal-loading')).getSize().then(function (modalSize) {
		// 		// console.log(txt);
		// 		element(by.css('.parent')).getSize().then(function (parentSize) {
		// 			expect(modalSize.width).toBeLessThan(parentSize.width);
		// 		});
		// 		// expect(txt).toContain('ng-hide');
		// 	});
		// });
	});

	describe('imgUrl', function() {
		it('true', function(){
			expect(element.all(by.tagName('img')).count()).toBe(1);
			element(by.tagName('img')).getAttribute('src').then(function (url) {
				expect(url).toBe('http://www.d1net.com/statics/images/icon/loading_more.gif');
			});
		});
		// it('false', function(){
		// 	expect(element.all(by.tagName('img')).count()).toBe(0);
		// });
	});

	describe('zIndex', function() {
		// it('true', function(){
		// 	element(by.css('.modal-loading-backdrop')).getAttribute('style').then(function (txt) {
		// 		// console.log(txt);
		// 		expect(txt).toContain('z-index: 20');
		// 	});
		// });

		it('false', function(){
			element(by.css('.modal-loading-backdrop')).getAttribute('style').then(function (txt) {
				// console.log(txt);
				expect(txt).toContain('z-index: 1060');
			});
		});
	});
});