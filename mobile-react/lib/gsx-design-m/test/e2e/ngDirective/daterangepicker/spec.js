/**
 * 时间范围选择的e2e测试用例
 * @author yanlingling
 * @date   2015/11/20
 */
describe('loading test', function () {
    var scope;
    var ctl;
    var $timeout;

    beforeEach(function () {
        browser.get('/demo/ngDirective/daterangepicker/demo.html');
    });
    var input = element(by.id('daterangepicker'));
    describe('date range picker test', function () {

        it('test daterange visible', function () {
            input.click();
            element(by.css('.daterangepicker')).isDisplayed().then(function (val) {
                expect(val).toEqual(true);
            });
            var confirm = element(by.buttonText('确定'));
            confirm.click();
            element(by.css('.daterangepicker')).isDisplayed().then(function (val) {
                expect(val).toEqual(false);
            });
        });


        it('range select change', function () {
            input.click().then(function () {
                var targetBegin = element(by.css('.daterangepicker-start'))
                    .all(by.css('.core'))
                    .filter(function (ele, index) {
                        return ele.getText().then(
                            function (text) {
                                return text == '20';
                            }
                        );
                    }
                );
                var targetEnd = element(by.css('.daterangepicker-end'))
                    .all(by.css('.core'))
                    .filter(function (ele, index) {
                        return ele.getText().then(
                            function (text) {
                                return text == '22';
                            }
                        );
                    }
                );

                targetBegin.get(0).click();
                targetEnd.get(0).click();
                var confirm = element(by.buttonText('确定'));
                confirm.click().then(function () {
                        element(by.model('dateRange')).getAttribute('value').then(function (val) {
                            expect(val).toEqual('2015.07.20 - 2015.07.22');
                        });

                        element(by.binding('dateRange.begin')).getText().then(function (val) {
                            expect(val).toEqual('1437321600000');
                        });
                        element(by.binding('dateRange.end')).getText().then(function (val) {
                            expect(val).toEqual('1437580799999');
                        });
                    }
                );
            });
        });
    });

});