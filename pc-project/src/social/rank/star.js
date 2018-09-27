/**
 * 社区排行榜-达人榜
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var store = require('common/store');
    var holder, eventEmitter;
    var groupId;

    var initMeRank = function () {
        service.meRank({
            groupId: groupId,
            type: 2
        }).done(function (response) {
            eventEmitter.emit('rank-get-star', {rank: response.data.rank});
        });
    };

    exports.fresh = function (pager) {

        var pager = $.extend(true, {
            page: 1,
            pageSize: 50,
            groupId: groupId
        }, pager);

        service.getRankStar(pager).done(function (response) {

            var data = response.data.pager;

            var html = Simplite.render('social-rank-star', {
                data: data ? data.list : []
            });
            if (data && data.list.length) {
                holder.html(html);
            } else {
                holder.find('.no-data').show();
            }
        });
    };

    exports.init = function (evtEmitter, data) {

        var user = store.get('user');

        eventEmitter = evtEmitter;
        groupId = data.groupId;
        holder = $(this);

        setTimeout(function() {
            exports.fresh();
        }, 0);
        if (user && user.id) {
            setTimeout(function() {
                initMeRank();
            }, 0);
        }
    };
});