/**
 * @file 格式化银行卡号显示
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (cardNumber, sep) {
        if ($.type(cardNumber) !== 'string') {
            cardNumber = '' + cardNumber;
        }
        var list = cardNumber.match(/.{4}/g);
        if (list) {
            list.push(
                cardNumber.substr(list.join('').length)
            );
            return list.join(sep || ' ');
        }
        return cardNumber;
    };

});