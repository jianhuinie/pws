/**
 * 帖子详情页-小组信息
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var holder;

    exports.init = function (eventEmitter, data) {

        holder = $(this);

        holder.on('click', '.join-btn', function (){
            var target = $(this);
            service.joinGroup({
                groupId: data.groupId
            }).done(function (response) {
                if (!response.code) {
                    target.removeClass('join-btn').addClass('join-status').html('已加入');
                }
            });
        });
    };
});