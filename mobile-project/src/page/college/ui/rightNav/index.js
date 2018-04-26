/**
 * @file 右侧导航
 * @author hurry
 * @date 2016/10/12
 */

define(function (require) {
    'use strict';
    var template = require('artTemplate');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var app = require('common/app');

    function initEvent() {
        $('.right-nav-wrapper')
            .on('click', function (e) {
                var me = this;
                $(me).removeClass('on');
                setTimeout(function () {
                    $(me).hide();
                }, 200);
                e.stopPropagation();
            });
        $('.right-nav-wrapper .header').on('click', function () {
            if (location.pathname != '/tcenter/gsx_college/index') {
                if (app.isApp()) {
                    app.openNewWindow(location.origin + '/tcenter/gsx_college/index');
                } else {
                    location.href = '/tcenter/gsx_college/index';
                }
            } else {
                location.reload();
            }
        });
    }

    function initDOM() {
        service.post(
            '/tcenter/gsx_college/guide',
            null,
            function (res) {
                var navRender = template.compile(require('text!./index.tpl'));
                var html = navRender({
                    items: res.data
                });
                $(document.body).append(html);
                setTimeout(function () {
                    $('.right-nav-wrapper').addClass('on');
                }, 100);
                initEvent();
            }
        );
    }

    return {
        /**
         * 初始化
         * @param  {[type]} options [description]
         */
        init: function (options) {
            var wrapper = $('.right-nav-wrapper');
            if (wrapper.length) {
                wrapper.show();
                setTimeout(function () {
                    wrapper.addClass('on');
                });
                return;
            }
            initDOM(options);
            openAppWindow.init();
        }
    };
});