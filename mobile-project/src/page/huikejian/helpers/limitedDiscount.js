/**
 * 限时折扣
 *
 * 做了三件事，限时状态的话术，价格，按钮文字
 */

;define(function (require, exports) {

    'use strict';

    var CountDownTime = require('common/mvc-component/CountDownTime');
    var observer = require('common/mvc/observer');
    var store = require('common/store');

    var ONE_DAY = 24 * 60 * 60 * 1000;
    var STATUS_1 = 3 * ONE_DAY;
    var STATUS_2 = ONE_DAY;

    var DISCOUNT_CONTAINER_CLASS = 'limited-discount-container';
    var PRICE_CONTAINER_CLASS = 'limited-price-container';
    //var LIMITED_BTN_CLASS = 'limited-btn';

    /**
     * 初始化
     *
     * @param  {Object} options
     * @property {Object} options.element
     * @property {string=} options.discountClass
     * @property {string=} options.priceClass
     * @property {string=} options.limitedBtnClass
     */
    exports.init = function (options) {

        options.element.each(function (index, item) {
            var element = $(item);
            var option = element.data('option');

            if (option) {
                var data = option;//JSON.parse(option);
                initItem(element, data, options || {});
            }
        });
    }

    function initItem(element, data, options) {
        var discountClass = options.discountClass || DISCOUNT_CONTAINER_CLASS;
        var priceClass = options.priceClass || PRICE_CONTAINER_CLASS;
        //var limitedBtnClass = options.limitedBtnClass || LIMITED_BTN_CLASS;
        var discountContainer = element.find('.' + discountClass);
        var priceContainer = element.find('.' + priceClass);
        //var limitedBtn = element.find('.' + limitedBtnClass);

        var now = +store.get('serverTime');
        var startTime = data.start_time * 1000;
        var endTime = data.end_time * 1000;
        var className;

        //initLimitedBtn(limitedBtn);

        if (now < startTime - STATUS_1 || now > endTime ) {
            // 开始前三天或已结束
            className= '.status-0';
        }
        else if (now >= startTime - STATUS_1 && now < startTime - STATUS_2) {
            className = '.status-1';
        }
        else if (now >= startTime - STATUS_2 && now < startTime) {
            className = '.status-2';
            initDownCount({
                target: startTime,
                className: className,
                element: element,
                data: data
            });
        }
        else {
            className = '.status-3';
            initDownCount({
                target: endTime,
                className: className,
                element: element,
                data: data
            });
            //limitedBtn.html(data.btn_name);
        }

        discountContainer.find('.status').hide();
        priceContainer.find('.status').hide();
        discountContainer.find(className).show();
        priceContainer.find(className).show();

    }

    /**
     * 初始化btn，记住原有名称
     * @param  {[type]} element [description]
     */
    function initLimitedBtn(element) {
        if (!element.data('btnText')) {
            element.data('btnText', element.html());
        }

        element.html(element.data('btnText'));
    }

    /**
     * 初始化倒计时
     * @param  {number} target 目标时间
     */
    function initDownCount(options) {
        var container = options.element.find(options.className);
        var countDownTime = new CountDownTime({
            "current": +store.get('serverTime'),
            "target": options.target,
            "format": [
                CountDownTime.HOUR,
                CountDownTime.MINUTES,
                CountDownTime.SECONDS
            ]
        });

        observer.addListener(countDownTime, 'update_hour', function (data) {
            container.find('.hours').html(data.str.join(''));
        });
        observer.addListener(countDownTime, 'update_minutes', function (data) {
            container.find('.minutes').html(data.str.join(''));
        });
        observer.addListener(countDownTime, 'update_seconds', function (data) {
            container.find('.seconds').html(data.str.join(''));
        });
        observer.addListener(countDownTime, 'time_up', function () {
            // 时间到了，重新初始化一次
            initItem(options.element, options.data, options);
        });
        countDownTime.start();
    }
});