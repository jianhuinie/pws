/**
 * @file 分享对话框
 * @author zhuijalu
 */
define(function (require, exports, module) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var urlUtil = require('cobble/util/url');

    var share = require('../function/share');
    var qrcode = require('../function/qrcode');

    /**
     * @param {Object} options
     * @property {Object} options.config
     * @property {Object} options.config.tsina
     * @property {Object} options.config.qzone
     * @property {Object} options.config.qq
     * @property {Object} options.config.tieba
     * @property {Object} options.config.renren
     * @property {Object} options.config.douban
     */
    function ShareDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ShareDialog.prototype = {

        init: function () {

            var config = this.config;

            var dialog = new Dialog({
                skinClass: 'share-dialog',
                width: 260,
                title: '分享',
                content: render({
                    config: config
                })
            });

            var element = dialog.element;

            share({
                config: config,
                buttonSelector: '.platform',
                element: element
            });

            var wechat = config.wechat;
            if (wechat) {
                qrcode({
                    text: wechat.url || document.URL,
                    element: element.find('.qrcode'),
                    width: 100,
                    height: 100
                });
            }
        }

    };

    var style = ''
        + '.share-dialog .platform { line-height: 27px; cursor: pointer; }'
        + '.share-dialog .icon { margin-right: 5px; font-size: 22px; vertical-align: top; }'
        + '.share-dialog .wechat-qrcode { float: left; margin-right: 15px; padding-right: 15px; border-right: 1px solid #ddd; }'
        + '.share-dialog .icon-wechat { color: #00c853 }'
        + '.share-dialog .icon-weibo { color: #d82a24 }'
        + '.share-dialog .icon-qzone { color: #f7c530 }'
        + '.share-dialog .icon-qq { color: #4a93d2 }'
        + '.share-dialog .icon-tieba { color: #4998f3 }'
        + '.share-dialog .icon-douban { color: #448a4d }'
        + '.share-dialog .qrcode-container { margin-top: 2px; }'
        + '.share-dialog .wechat-qrcode .platform { cursor: text; text-align: center; }'


    var render = etpl.compile(

          '<!-- if: ${config.wechat} -->'
        + '<div class="wechat-qrcode">'
        +     '<div class="platform">'
        +         '<i class="icon icon-wechat"></i>微信扫码'
        +     '</div>'
        +     '<div class="qrcode-container">'
        +         '<div class="qrcode"></div>'
        +     '</div>'
        + '</div>'
        + '<!-- /if -->'

        + '<ul class="share-list">'

        +     '<!-- if: ${config.tsina} -->'
        +     '<li class="platform" data-name="tsina">'
        +         '<i class="icon icon-weibo"></i>新浪微博'
        +     '</li>'
        +     '<!-- /if -->'

        +     '<!-- if: ${config.qq} -->'
        +     '<li class="platform" data-name="qq">'
        +         '<i class="icon icon-qq"></i>QQ好友'
        +     '</li>'
        +     '<!-- /if -->'

        +     '<!-- if: ${config.qzone} -->'
        +     '<li class="platform" data-name="qzone">'
        +         '<i class="icon icon-qzone"></i>QQ空间'
        +     '</li>'
        +     '<!-- /if -->'

        +     '<!-- if: ${config.tieba} -->'
        +     '<li class="platform" data-name="tieba">'
        +         '<i class="icon icon-tieba"></i>贴吧'
        +     '</li>'
        +     '<!-- /if -->'

        +     '<!-- if: ${config.douban} -->'
        +     '<li class="platform" data-name="douban">'
        +         '<i class="icon icon-douban"></i>豆瓣'
        +     '</li>'
        +     '<!-- /if -->'

        +     '<style>'
        +         style
        +     '</style>'
        + '</ul>'
    );

    /**
     * 提供一个快捷方法
     */
    ShareDialog.init = function (element) {

        var share = function (target, data) {

            var extend = target.data('query');

            if ($.isPlainObject(extend)) {
                var urlData = urlUtil.parse(data.url);
                var url = urlData.origin + urlData.pathname;
                var query;
                if (urlData.search) {
                    query = urlUtil.parseQuery(urlData.search);
                }
                else {
                    query = { };
                }
                $.extend(query, extend);
                data.url = url + '?' + $.param(query);
            }

            new ShareDialog({
                config: {
                    tsina: data,
                    qzone: data,
                    qq: data,
                    tieba: data,
                    douban: data,
                    wechat: data
                }
            });

        };

        element
        .on('click', '[data-share]', function () {

            var target = $(this);

            // 用 attr 读才能保证每次读都一样
            var json = target.attr('data-share');
            if (json) {
                var data = $.parseJSON(json);
                if (data) {
                    share(target, data);
                }
            }

        })
        .on('click', '[data-share-title]', function () {
            var target = $(this);
            var data = {
                title: target.attr('data-share-title'),
                content: target.attr('data-share-content'),
                url: target.attr('data-share-url'),
                img: target.attr('data-share-img'),
            };
            share(target, data);
        });

    };

    return ShareDialog;

});