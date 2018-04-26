/**
 * @file 6.16秒杀预热场
 * @author zengcheng
 *
 */
define(function (require, exports) {
    var seckill = require('./seckill');

    exports.init = function () {

        //初始化秒杀活动区
        seckill.init();
    };
});