/**
 * 社区中心-我的收藏
 * @author zengcheng
 */
define(function (require, exports) {

    var eventEmitter, holder;
    var service = require('common/service');

    exports.fresh = function (pager) {

        var pager = $.extend(true, {
            page: 1,
            page_size: 25,
            count: 0,
            hide_jump: true
        }, pager);

        service.getCollect(pager).done(function (response) {

            if (!response.code) {

                var data = response.data;
                var html = Simplite.render('social-center-favor', {
                    data: data.list
                });

                pager.count = data.pager.count;
                html += Simplite.render('social-common-pager', {
                    pager: pager
                });

                holder.html(html);
            }
        });
    };

    exports.init = function (eveEmitter) {

        holder = $(this);
        eventEmitter = eveEmitter;

        holder
        .on('click', '.delete-action', function () {
            var item = $(this).closest('.post-item');
            confirm('确定要删除该收藏吗?', '温馨提示').done(function () {
                service.setCollect({
                    threadId: item.data('threadId'),
                    op: 0
                }).done(function () {
                    var page = $('.pager-block .active', holder).text();
                    exports.fresh({page: page || 1});
                });
            });
        })
        .on('click', '.pager a[data-page]', function () {
            var page = $(this).data('page');
            exports.fresh({page: page});
            return false;
        });

        /*监听主页模块改变*/
        eventEmitter.on('center-nav-change', function (event, data) {
            // 如果是当前模块就显示
            if (data === 'favor') {
                exports.fresh();
                holder.show();
            } else {
                holder.hide();
            }
        });
    };
});