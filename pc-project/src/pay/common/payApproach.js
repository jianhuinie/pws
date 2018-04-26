/**
 * @file 支付方式
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var container = $('.pay-approach');
    var activeClass = 'checked';


    // 使用的付款方式
    var approach;

    // 银行代号（网银和信用卡需要银行代码）
    var bankNum;

    function select(target) {

        bankNum = target.val();

        var platform = container.find('.platform')[0];
        var bank = container.find('.bank')[0];

        if (platform && $.contains(platform, target[0])) {
            approach = 'platform';
        }
        else if (bank && $.contains(bank, target[0])) {
            approach = 'bank';
        }
        else {
            approach = 'creditCard';
        }

        target.prop('checked', true);

        container
        .find('.' + activeClass)
        .removeClass(activeClass);

        target
        .closest('.form-radio')
        .addClass(activeClass);
    }

    exports.init = function () {

        select(
            container.find(':radio').first()
        );

        container.on('click', ':radio', function () {
            select($(this));
        });
    };

    exports.getData = function () {
        return {
            approach: approach,
            bankNum: bankNum
        };
    };

});
