/**
 * 首页-热门帖子
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var holder;

    exports.fresh = function (pager) {

        var pager = $.extend(true, {
            page: 1,
            page_size: 25,
            count: 0,
            hide_jump: true
        }, pager);


        service.getHotPosts(pager).done(function (response) {

            if (!response.code) {

                var data = response.data;
                var html = Simplite.render('social-index-post', {
                    data: data.list
                });

                pager.count = data.pager.count;
                html += Simplite.render('social-common-pager', {
                    pager: pager
                });

                holder.find('.post-list-wrapper').html(html);
            }
        });
    };

    exports.init = function () {

        holder = $(this);

        holder.on('click', 'a[data-page]', function () {

            var me = $(this);

            var page = me.data('page');
            exports.fresh({page: page});
            return false;
        });
    }
});