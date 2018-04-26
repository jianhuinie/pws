/**
 * 签到头部
 * @author zengcheng
 */
define(function (require, exports) {

    var proxyService = require('social/common/proxyService');
    var holder, data;

    exports.init = function (eveEmitter, data) {

        holder = $(this);

        data = $.extend(true, {}, data);

        holder.on('click', '.sign-status', function () {
            var target = $(this);
            var sign = target.parent();
            proxyService.checkLogin().done(function (service){
                if (data.isJoin != '0' || window.joinGroup) {
                    var daysText = sign.find('.sign-days');
                    service.signCheck({
                        groupId: data.groupId
                    }).done(function(response){
                        if (!response.code) {
                            var text = daysText.text();
                            daysText.text(text.replace(/\d+/g, function(num) { return +num +1; }));
                            sign.addClass('sign-over');
                        }
                    });
                }else{
                       return alert('请先加入小组', '温馨提示');
                }
            });
        })
        .on('click', '.join-btn', function () {
            var target = $(this);
            proxyService.checkLogin().done(function (service){
                service.joinGroup({
                    groupId: data.groupId
                }).done(function (response) {
                    if (!response.code) {
                        target.removeClass('join-btn').removeClass('action').addClass('join-status').html('已加入');
                        window.joinGroup = true;
                    }
                });
            });
        })
        .on('click', '.cancel-btn', function () {
            var target = $(this);
            proxyService.checkLogin().done(function (service){
                service.quitGroup({
                    groupId: data.groupId
                }).done(function (response) {
                    if (!response.code) {
                        target.removeClass('cancel-btn').addClass('join-btn').html('<i class="icon icon-plus"></i>加入');
                    }
                });
            });
        });
    };
});