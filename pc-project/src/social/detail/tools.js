/**
 * 详情页-工具栏
 * @author zengcheng
 */
define(function (require, exports) {

    var holder, eventEmitter;

    exports.init = function (eveEmitter) {

        holder = $(this);

        eventEmitter = eveEmitter;

        holder.on('click', '.tool', function () {
            var target = $(this);
            var e = 'detail-' + target.data('tool');
            eventEmitter.emit(e);
        });
    };
});