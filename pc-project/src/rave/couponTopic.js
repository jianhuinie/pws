/**
 * @file 优惠劵专题页
 * @author zengcheng
 */

define(function (require, exports) {

    var orgcoupon = require('./orgcoupon');

    exports.init = function () {
        //初始化机构优惠
        orgcoupon.init();
    };
});