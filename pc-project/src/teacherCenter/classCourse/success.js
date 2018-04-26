/**
 * @file 班课设置 - 发布成功页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var TextClipboard = require('TextClipboard');

    /**
     * 初始化
     */
    exports.init = function () {

        var container = $('#main');

        // 点击`复制到剪贴板`按钮
        new TextClipboard({
            element: $('#empty'),
            text: container.find('input[name="url"]').val(),
            onClick: function() {
                success('复制成功');
                this.copy(this.text);
            }
        });

    };

});