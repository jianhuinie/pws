/**
 * 社区中心-我的帖子
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

        service.getOwner(pager).done(function (response) {

            if (!response.code) {

                var data = response.data;

                var html = Simplite.render('social-center-post', {
                    data: data.list || []
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
            var id = item.data('postId');
            confirm('确定要删除该帖子吗?', '温馨提示').done(function () {
                var data = {
                    threadId: id
                };
                service.deleteThread(data).done(function(response){
                    if (!response.code) {
                        var page = $('.pager-block .active', holder).text();
                        success('删除成功');
                        exports.fresh({page: page || 1});
                    } else {
                        error('删除失败');
                    }
                });
            });
        })
        .on('click', '.edit-action', function () {
            var item = $(this).closest('.post-item');
            var id = item.data('postId');
            window.open('/forum/modifyThread?thread_id=' + id, '_blank');
        })
        .on('click', '.pager a[data-page]', function () {
            var page = $(this).data('page');
            exports.fresh({page: page});
            return false;
        });

        /*监听主页模块改变*/
        eventEmitter.on('center-nav-change', function (event, data) {
            // 如果是当前模块就显示
            if (data === 'post') {
                exports.fresh();
                holder.show();
            } else {
                holder.hide();
            }
        });
    };
});