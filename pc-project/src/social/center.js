/**
 * 社区中心
 * @author zengcheng
 */
define(function (require, exports) {

    var eventEmitter = require('common/eventEmitter');
    var myPost = require('./center/post');
    var myFavor = require('./center/favor');
    var myGroup = require('./center/group');

    require('tpl!social/common/pager.tpl');
    require('tpl!social/center.tpl');

    exports.init = function () {

        var container = $('#main .content');

        container.find('.post-nav-wrapper').on('click', '.post-nav-item', function () {
            var me = $(this);

            if(!me.hasClass('active')) {
                me.siblings().removeClass('active');
                me.addClass('active');
                eventEmitter.emit('center-nav-change', me.data('nav'));
            }
        });
    }

});