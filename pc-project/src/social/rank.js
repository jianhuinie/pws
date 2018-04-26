/**
 * 社区中心排行榜
 * @author zengcheng
 */
define(function (require, exports) {

    var eventEmitter = require('common/eventEmitter');
    var store = require('common/store');

    require('social/common/signHeader');
    require('social/rank/star');
    require('social/rank/teacher');

    require('tpl!social/rank.tpl');

    exports.init = function () {

        var navTab = $('.wrapper .content .rank-nav');
        var user = store.get('user');

        navTab.on('click', '.rank-nav-item', function () {

            var me = $(this);
            var content = me.data('content');
            if (!me.hasClass('active')) {
                var contentHolder = $('.rank-content[data-content="' + content + '"]');
                me.addClass('active').siblings().removeClass('active');
                contentHolder.addClass('show').siblings().removeClass('show');
                $('.rank-tip .' + content).show().siblings().hide();
            }
        });

        eventEmitter.on('rank-get-star', function (event, data) {
            $('.rank-tip .star .light').text(data.rank);
        });

        eventEmitter.on('rank-get-teacher', function (event, data) {
            $('.rank-tip .teacher .light').text(data.rank);
        });

        if (user && user.id) {
            $('.content .rank-tip').show();
        }
    };
});