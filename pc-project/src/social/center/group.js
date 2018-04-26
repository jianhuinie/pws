/**
 * 社区中心-我的小组
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var eventEmitter, holder;

    exports.fresh = function (pager) {

        var pager = $.extend(true, {
            page: 1,
            page_size: 6,
            count: 0,
            hide_jump: true
        }, pager);

        service.getGroup(pager).done(function (response) {
             if (!response.code) {

                var data = response.data;

                var html = Simplite.render('social-center-group', {
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

    exports.init = function (eveEmitter, data) {

        eventEmitter = eveEmitter;
        holder = $(this);

        /*监听主页模块改变*/
        eventEmitter.on('center-nav-change', function (event, data) {
            // 如果是当前模块就显示
            if (data === 'group') {
                exports.fresh();
                holder.show();
            } else {
                holder.hide();
            }
        });

        holder.on('click', '.cancel-btn', function (){
            var target = $(this);
            var item = target.closest('.group-item');
            var id = item.data('id');
            service.quitGroup({
                groupId: id
            }).done(function () {
                var page = $('.pager-block .active', holder).text();
                exports.fresh({page: page || 1});
            });
        })
        .on('click', '.pager a[data-page]', function () {
            var page = $(this).data('page');
            exports.fresh({page: page});
            return false;
        });
    };
});