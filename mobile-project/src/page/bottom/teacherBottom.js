/*
*老师详情页底部操作都在这个js里面
*/

define(function (require) {
    var $ = require('zepto');
    var focusTeacher = require('page/bottom/focus/index');
    // var makePhoneCall = require('page/bottom/makePhoneCall/index');
    // var share = require('page/bottom/share/index');
    var tryListen = require('page/bottom/tryListen/index');
    // var zixun = require('page/bottom/zixun/index');
    var consult = require('common/courseBottom/consult/index');
    var call = require('common/courseBottom/call/index');
    var share = require('common/courseBottom/share/index');

    return function (options) {
        focusTeacher(options);
        // makePhoneCall(options);
        // share(options);
        tryListen(options);
        // zixun(options);
        consult(options);
        call(options);
        share(options);
    }
});