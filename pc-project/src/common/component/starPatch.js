/**
 * @file 收藏补丁
 *       解决页面缓存导致收藏按钮状态不对的问题
 * @author zengcheng
 */

define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');

    exports.init = function (data, ele, activeCls) {

        ele = $(ele);

        activeCls = activeCls || 'hasfavored';

        var errorHandler = {

        };

        var icon = $('.icon-favor', ele);
        var text = $('span', ele);

        icon.removeClass(activeCls);
        text.text('收藏');

        // console.log(store.get('user'));
        if (store.get('user')) {
            var hasLogin = !!store.get('user').id;
        }
        else {
            var hasLogin = false;
        }

        if (!hasLogin || store.get('user').type == 0) {
            return;
        }

        if (ele.length > 0) {
            service
            .checkCollectedAjax(data, errorHandler)
            .done(function (response) {
                if (response.data.is_favored) {
                    icon.addClass(activeCls);
                    text.text('已收藏');
                }
                else {
                    icon.removeClass(activeCls);
                    text.text('收藏');
                }
            });
        }

    };

});