/**
 * @file 页面整体布局以及账户信息的拉取渲染
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var getElement = require('./extension/getElement');
    var bindData = require('./extension/bindData');

    var Dialog = require('custom/ui/Dialog');
    var support = require('./support');
    var storage = require('./storage');
    var ui = require('./ui');

    exports.init = function () {

        support.init();
        storage.init();

        $.extend(
            Ractive.defaults.data,
            {
                compressImage: require('./filter/compressImage'),
                cutString: require('./filter/cutString'),
                divide: require('./filter/divide'),
                formatCardNumber: require('./filter/formatCardNumber'),
                formatDate: require('./filter/formatDate'),
                formatDateTime: require('./filter/formatDateTime'),
                formatMask: require('./filter/formatMask'),
                formatMobile: require('./filter/formatMobile'),
                formatMoney: require('./filter/formatMoney'),
                formatNumber: require('./filter/formatNumber'),
                formatTime: require('./filter/formatTime'),
                joinList: require('./filter/joinList'),
                minus: require('./filter/minus'),
                multiply: require('./filter/multiply'),
                plus: require('./filter/plus')
            }
        );

        Ractive.defaults.getElement = function () {
            return getElement(this);
        };

        Ractive.defaults.bindData = function (map) {
            return bindData(this, map);
        };

        // 一般这两个只会用其中一个
        // 一个触发另一个就不用触发了
        Ractive.defaults.onrender =
        Ractive.defaults.oncomplete = function () {
            var onReady = this.get('options.onReady');
            if ($.isFunction(onReady) && !this.hasReadyExecuted) {
                onReady();
                this.hasReadyExecuted = true;
            }
        };

        new Ractive({
            el: '#app',
            template: require('html!./layout.html'),
            data: {
                name: 'mc',
                menu: 'coupon'
            },
            components: {
                Nav: require('./component/Nav'),
                Footer: require('./component/Footer')
            },
            oncomplete: function () {
                ui.init();
            }
        });

    };

});