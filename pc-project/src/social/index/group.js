/**
 * 首页-兴趣小组
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var proxyService = require('../common/proxyService');

    exports.init = function () {

        var holder = $(this);

        holder
        .on('click', '.join-btn', function (){
            var target = $(this);
            var item = target.closest('.group-item');
            var id = item.data('id');
            proxyService.checkLogin().done(function (service) {
                service.joinGroup({
                    groupId: id
                }).done(function (response) {
                    if (!response.code) {
                        target.removeClass('join-btn').addClass('joined-btn');
                        target.html('已加入');
                    }
                });
            });
        })
        .on('click', '.cancel-btn', function (){
            var target = $(this);
            var item = target.closest('.group-item');
            var id = item.data('id');
            service.quitGroup({
                groupId: id
            }).done(function (response) {
                if (!response.code) {
                    target.removeClass('cancel-btn').addClass('join-btn');
                    target.html('<i class="icon icon-plus"></i>加入');
                }
            });
        });
        holder.find('.group-pager-list').find('.group-pager').hover(function () {
            var me = $(this);
            if (!me.hasClass('active')) {
                var index = me.data('index');
                me.siblings().removeClass('active');
                me.addClass('active');
                $('.group-list[data-index="' + index + '"]', holder).show().siblings('.group-list').hide();
            }
        });
    };
});