/**
 * @file 百度地图对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var baiduMap = require('common/map/baidu');

    /**
     *
     * @param {Object} options
     * @property {string} options.title 对话框标题
     * @property {string} options.address 搜索的地址
     */
    function BaiduMapDialog(options) {
        $.extend(this, options);
        this.init();
    }

    BaiduMapDialog.prototype = {

        init: function () {

            var id = 'baidu-map-' + 1000 * Math.random();

            var dialog = new Dialog({

                title: this.title || '地图位置',
                content: '<div id="' + id + '"></div>',
                width: 800,
                skinClass: 'dialog-baidumap'

            });

            baiduMap.search(id, this.address);

        }

    };

    return BaiduMapDialog;

});
