/**
 * 社区小组-帖子列表
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var holder, groupId;

    exports.fresh = function (pager) {

        var typeMap = {
            all: 1,
            fine: 2
        };

        var pager = $.extend(true, {
            type: 'all',
            page: 1,
            page_size: 25,
            count: 0,
            hide_jump: true,
            forum_group_id: groupId
        }, pager);

        pager.type = typeMap[pager.type];

        service.getThreadBrowse(pager).done(function (response) {

            if (!response.code) {

                var html = Simplite.render('social-group-postList', {
                    data: response.data.list || [],
                    isAdmin: store.get('isAdmin')
                });

                if (response.data.pager) {
                    pager.count = +response.data.pager.count;
                }

                html += Simplite.render('social-common-pager', {
                    pager: pager
                });

                holder.find('.post-list').html(html);
            }
        });
    };

    exports.init = function (e, data) {

        holder = $(this);
        groupId = data.groupId;

        holder.on('click', 'a[data-page]', function () {
            var me = $(this);
            var page = me.data('page');
            var type = $('.post-list-nav .post-nav.active').data('nav');
            exports.fresh({
                page: page,
                type: type
            });
            return false;
        })
        .on('click', '.post-nav', function () {
            var me = $(this);
            if (!me.hasClass('active')) {
                type = me.data('nav');
                me.addClass('active').siblings().removeClass('active');
                exports.fresh({
                    page: 1,
                    type: type
                });
            }
            return false;
        })
        .on('click', '.set-top', function () {
            var target = $(this);
            var status = target.data('status');
            var item = target.closest('.post-item');
            status = (status == '1' ? 0 : 1);
            var data = {
                threadId: item.data('id'),
                op: status
            };
            service.setTop(data).done(function(response){
                var label = item.find('.label-top');
                if (!response.code) {
                    target.data('status', status);
                    target.text(status == '1' ? '取消置顶' : '置顶');
                    success(status == '0' ? '取消置顶成功' : '置顶成功');
                    if (status == '1') {
                        //label.css('display', 'inline-block');
                        exports.fresh({
                            page: $.trim(holder.find('.pager').find('.active').text()) || 1,
                            type: $('.post-nav.active', holder).data('nav')
                        });
                    } else {
                        label.hide();
                    }
                }
            });
        })
        .on('click', '.set-good', function () {
            var target = $(this);
            var status = target.data('status');
            var item = target.closest('.post-item');
            status = (status == '1' ? 0 : 1);
            var data = {
                threadId: item.data('id'),
                op: status
            };
            service.setGood(data).done(function(response){
                var label = item.find('.label-fine');
                if (!response.code) {
                    target.data('status', status);
                    target.text(status == '1' ? '取消加精' : '加精');
                    success(status == '0' ? '取消加精成功' : '加精成功');
                    if (status == '1') {
                        label.css('display', 'inline-block');
                    } else {
                        label.hide();
                    }
                }
            });
        })
        .on('click', '.set-ban', function () {

            var target = $(this);
            var item = target.closest('.post-item');
            var data = {
                userId: item.data('userId'),
                groupId: groupId
            };
            var dialog = new Dialog({
                    title: '封禁账号',
                    content: Simplite.render('social-common-ban'),
                    width: 535,
                    heigt: 345
                });
            dialog.element.on('click', '.btn', function () {
                data.len = dialog.element.find(':radio[name="time"]:checked').val() * 24 * 3600;
                data.reason = dialog.element.find(':radio[name="reason"]:checked').val();
                dialog.hide();
                service.setBan(data).done(function(response){
                    if (!response.code) {
                        target.removeClass('set-ban').addClass('baned').text('已禁言');
                        success('禁言成功');
                    }
                });
            }).on('click', ':radio', function () {
                var len = dialog.element.find(':radio[name="time"]:checked').val();
                var reason = dialog.element.find(':radio[name="reason"]:checked').val();
                len && reason && dialog.element.find('.btn-primary').prop('disabled', false);
            });
        })
        .on('click', '.delete', function () {
            var target = $(this);
            var item = target.closest('.post-item');
            confirm('您确定要删除该帖子么？', '温馨提示').done(function () {
                var data = {
                    threadId: item.data('id')
                };
                service.deleteThread(data).done(function(response){
                    if (!response.code) {
                        success('删除成功');
                        exports.fresh({
                            page: $.trim(holder.find('.pager').find('.active').text()) || 1,
                            type: $('.post-nav.active', holder).data('nav')
                        });
                    }
                });
            });
        });
    };
});