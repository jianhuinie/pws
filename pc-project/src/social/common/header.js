/**
 * 社区头部
 */
define(function (require, exports) {

    var backTop = require('./backTop');
    var store = require('common/store');
    var service = require('common/service');

    exports.init = function () {
        var user = store.get('user')
        backTop.init();

        if ($('.city-trigger').length) {

            $('.city-trigger a').click(function () {
                location.href = '/changecity/init?next=' + encodeURIComponent(window.location.href);
                return false;
            });

            $('#header').find('.notify').click(function () {
                var user = store.get('user');
                if (user && user.type == '0') {
                    window.open('/teacher_center/message', '_blank');
                } else {
                    window.open('/student_center/message', '_blank');
                }
            });

            if (user && user.id) {
                var notifyNum = $('#header').find('.notify-num');
                service.getUnreadMessage().done(function (response) {
                    if (!response.code && response.data && +response.data.forum) {
                        notifyNum.text(response.data.forum).show();
                    }
                });
            }
        }
    };

});