/**
 * 时间选择的e2e测试用例
 * @author yanlingling
 * @date   2015/11/20
 */
describe('loading test', function () {
    beforeEach(function () {
        browser.get('/demo/ngDirective/datetimepicker/demo.html');
    });
    var input = element(by.id('datetimepicker'));
    describe('date time picker test', function () {
        it('test visible', function () {
            element(by.css('.calendar')).isDisplayed().then(function (val) {
                expect(val).toEqual(false);
            });
            input.click();
            element(by.css('.calendar')).isDisplayed().then(function (val) {
                expect(val).toEqual(true);
            });
            var target = element.all(by.css('.calendar .core')).get(10);
            target.click();
            element(by.css('.calendar')).isDisplayed().then(function (val) {
                expect(val).toEqual(false);
            });
        });


        it('date select change', function () {
            input.click().then(function () {
                var target = element(by.css('.calendar'))
                    .all(by.css('.core'))
                    .filter(function (ele, index) {
                        return ele.getText().then(
                            function (text) {
                                return text == '20';
                            }
                        );
                    }
                );

                target.get(0).click();
                element(by.model('dateSelected')).getAttribute('value').then(function (val) {
                    expect(val).toEqual('2014-06-20');
                });

                element(by.binding('dateSelected')).getText().then(function (val) {
                    expect(val).toEqual('1403193600000');
                });
            });
        });
    });

});