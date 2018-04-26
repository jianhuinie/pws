/**
 * function/parseRmb.js单元测试
 * @author XiaoBin Li
 */

define(function (require) {

    'use strict';
    
    var parseRmb = require('src/function/parseRmb');

    describe('parseRmbTest', function () {

        it('大于0的货币', function () {
            expect(parseRmb(100)).toEqual('￥100.00');
        });

        it('小于0的货币', function () {
            expect(parseRmb(-100)).toEqual('￥-100.00');
        });

        it('小于0的带+号的货币', function () {
            expect(parseRmb(100, true)).toEqual('￥+100.00');
        });

        it('货币金额为null', function () {
            expect(parseRmb(null)).toEqual('-');
        });

    });
    
});
