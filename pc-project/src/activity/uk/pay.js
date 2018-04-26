/**
 * @file 中英交流大使-支付回调监听
 * @author wx
 */



define(function(require, exports) {

    'use strict';


    exports.init = function (){

        var backUrl = 'http://' + location.host + '/uk/profile';

        $(window).on('message', function (e) {
            var data = e.originalEvent.data;
            if (typeof data === 'string') {
                try {
                    data = $.parseJSON(data);
                }
                catch (e) {}
            }
            if (data && data.source === 'pay' && data.status === 'success') {
                alert({
                    content: '支付成功！<br/><span class="pay-timer">5</span>秒后返回个人中心',
                    onBeforeHide: function () {
                        location.href = backUrl;
                    }
                });

                setInterval(function () {
                    var timer = $('.pay-timer');
                    var current = parseInt(timer.text());
                    if (current == 1) {
                        location.href = backUrl;
                        return;
                    }
                    timer.text(current - 1);
                }, 1000);
            }
        });

    };


});