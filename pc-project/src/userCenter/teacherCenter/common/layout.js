/**
 * @file 页面整体布局以及账户信息的拉取渲染
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Dialog = require('custom/ui/Dialog');
    var support = require('../../common/support');
    var storage = require('../../common/storage');
    var im = require('im/entrance');
    var store = require('common/store');
    var ui = require('../../common/ui');
    var isIframe = require('../../common/function/isIframe');

    var getElement = require('../../common/extension/getElement');
    var bindData = require('../../common/extension/bindData');

    var contains = require('cc/function/contains');
    var viewportWidth = require('cc/function/viewportWidth');
    var viewportHeight = require('cc/function/viewportHeight');

    var config = require('./config');

    function getBreadcrumb(sideMenu) {

        return $.merge(
            [
                {
                    text: '首页'
                }
            ],
            config.search(config.sideMenus, sideMenu)
        );
    }

    /*
     * 重定位“常见问题”
     */
    function setFloat() {
        $('#float-help').css({
            left: 1000 + (viewportWidth() - 1000) / 2 + 20,
            bottom: viewportHeight() / 2 - 180
        });
    }

    exports.init = function (data) {

        data = data || { };

        support.init();
        storage.init();

        $.extend(
            Ractive.defaults.data,
            {
                compressImage: require('../../common/filter/compressImage'),
                cutString: require('../../common/filter/cutString'),
                divide: require('../../common/filter/divide'),
                formatCardNumber: require('../../common/filter/formatCardNumber'),
                formatDate: require('../../common/filter/formatDate'),
                formatDateTime: require('../../common/filter/formatDateTime'),
                formatMask: require('../../common/filter/formatMask'),
                formatMobile: require('../../common/filter/formatMobile'),
                formatMoney: require('../../common/filter/formatMoney'),
                formatNumber: require('../../common/filter/formatNumber'),
                formatTime: require('../../common/filter/formatTime'),
                joinList: require('../../common/filter/joinList'),
                minus: require('../../common/filter/minus'),
                multiply: require('../../common/filter/multiply'),
                plus: require('../../common/filter/plus'),
                replaceLineBreak: require('../../common/filter/replaceLineBreak')
            }
        );

        Ractive.defaults.getElement = function () {
            return getElement(this);
        };

        Ractive.defaults.bindData = function (map) {
            return bindData(this, map);
        };

        // 一般这两个只会用其中一个
        // 一个触发另一个就不用触发了
        Ractive.defaults.onrender =
        Ractive.defaults.oncomplete = function () {
            var onReady = this.get('options.onReady');
            if ($.isFunction(onReady) && !this.hasReadyExecuted) {
                onReady();
                this.hasReadyExecuted = true;
            }
        };


        var instance = new Ractive({
            el: '#app',
            template: require('html!./layout.html'),
            data: {
                breadcrumb: [],
                topMenus: config.topMenus,
                sideMenus: [],
                topMenu: data.topMenu,
                sideMenu: data.sideMenu,
                isHuikeTeacher: data.isHuikeTeacher,
                floatHelpClose: true,
                siteData: siteData,
                isIframe: isIframe()
            },
            components: {
                Nav: require('../../common/component/Nav'),
                Footer: require('../../common/component/Footer')
            },
            oninit: function () {
                if (!isIframe()) {
                    var breadcrumb = getBreadcrumb(data.sideMenu);
                    if ($.isPlainObject(data.appendBreadcrumb)) {
                        breadcrumb.push(data.appendBreadcrumb);
                    }

                    config
                    .init()
                    .then(function () {

                        instance.set({
                            breadcrumb: breadcrumb,
                            sideMenus:  data.other ? [] : config.sideMenus
                        });

                    });
                }

            },
            oncomplete: function () {
                if (siteData.needIm) {
                    store.set('user', userData);
                    store.set('notInitWindowEvent', true)
                    im.init();
                    $('body').on('click', '.chat-label', function (event) {
                        var element = $(this);
                        if(store.get('user').type != -1){
                            im.chatTo(element.data());
                        }
                    });
                }
                ui.init();
                setFloat();
            },
            openFloatHelp: function () {
                this.set('floatHelpClose', false);
            },
            closeFloatHelp: function () {
                this.set('floatHelpClose', true);
            }
        });

        $(window).resize(function() {
            setFloat();
        });
        $('body')
            .on('click','.bykefu',function(event){
                var element = $(this);
                im.chatTo(element.data());
            });
    };

});