/**
 * 侧滑入的导航面板
 * Created by hanzh on 15/09/08.
 */
define(function (require, exports) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var util = require('common/util');
    var MVCArray = require('common/mvc/MVCArray');
    var appController = require('common/app');
    var lazyLoadImage = require("common/lazyLoadImage");

    var cssNevPanel = require('text!./NavPanel.styl');
    var htmlNevPanel = require('text!./NavPanel.tpl');

    var baseOrigin = location.origin;
    /* 在二级域名的网页下面调用本控件，跳转m站主域下的导航地址 */
    if (baseOrigin.indexOf('.m.genshuixue.com') > -1) {
        baseOrigin = "https://m.genshuixue.com";
    }

    /**
     * 默认链接配置
     */
    var defaultLinkItems = [{
        type: "homepage",
        name: "首页",
        url: baseOrigin
    }, {
        type: "order",
        name: "我的订单",
        url: baseOrigin + "/order/studentOrders"
    }, {
        type: "video",
        name: "我的视频课",
        url: baseOrigin + "/student_center/videoLessons"
    }, /*{
        type: "collection",
        name: "我的收藏",
        url: baseOrigin + "/student_center/my_favorite"
    }, */{
        type: "coupon",
        name: "我的优惠券",
        url: baseOrigin + "/coupon/myCoupon"
    }];

    var mainPanel = null;

    /**
     * 拼接链接item
     * @param obj {Object} 某跳的链接对象
     * @returns {string} html
     */
    function initItemHtml(obj) {
        return '<li><a href="'
            + obj.url + '" link-type="'
            + obj.type + '">'
            + obj.name + '<span class="icon-angle-right-nav"></span></a></li>';
    }

    /**
     * 组装链接条目
     * @param items {object} 用户传入的配置选项（可选）
     * @returns {string}
     */
    function initLinks(items) {
        var baseArr = [];
        if (typeof items !== 'object') {
            items = {};
        }
        for (var i = 0; i <= defaultLinkItems.length - 1; i++) {
            // 遍历默认项目，如果用户传入配置与默认配置相同，则使用用户配置
            var cItem = defaultLinkItems[i];
            if (items[cItem.type]) {
                var coption = items[cItem.type];
                if (coption.remove == true) {
                    // 如果用户选择删除，则配置删除选项；
                    cItem.remove = true;
                } else {
                    cItem.name = !!coption.name ? coption.name : cItem.name;
                    cItem.url = !!coption.url ? coption.url : cItem.url;
                }
                delete items[cItem.type];
            }
            !cItem.remove && baseArr.push(initItemHtml(cItem));
        }
        // 便利用户自定义配置的项目
        for (i in items) {
            if (items.hasOwnProperty(i)) {
                var cobj = {};
                var isLegal = true;
                cobj.type = i;
                !!items[i].name ? (cobj.name = items[i].name) : isLegal = false;
                !!items[i].url ? (cobj.url = items[i].url) : isLegal = false;
                if (isLegal) {
                    baseArr.push(initItemHtml(cobj));
                }
            }
        }
        return baseArr.join('');
    }

    function NevPanel(options) {
        options = options || {};
        mainPanel = $('.right-fixed-menu');
        if (!mainPanel.length) {
            var dom = $(htmlNevPanel);
            util.insertCssText(cssNevPanel);

            var menuItems = initLinks(options.itemConfig);
            dom.find('.MENULIST').html(menuItems);

            var userInfo = dom.find('.USERINFO');
            var userImgDom = dom.find('.USERIMG');
            window.gsx_ready(function (config) {
                var userImg = "https://imgs.genshuixue.com/0cms/d/file/content/2015/09/55ecf79513d9d.png";
                if (config.user) {

                    userImg = config.user.avatar || userImg;
                    var userName = config.user.name;
                    var userNumber = config.user.number;
                    var extUrl = location.origin + '/auth/exit?next=' + encodeURIComponent(location.href);
                    var accessUrl = "/x/" + userNumber;
                    userInfo.html('' + '<div class="u-logined">' + '<p class="u-name">' + userName + '</p>' + '<p class="u-quit"><a href="' + extUrl + '">退出</a></p></div>');
                    userImgDom.click(function () {
                        window.location.assign(accessUrl);
                    });
                } else {
                    var loginUrl = location.origin + '/static/login?next=' + encodeURIComponent(location.href);
                    userInfo.html('<div class="u-unlogin"><a href="' + loginUrl + '">登录-跟谁学</a></div>');
                }
                userImgDom.attr({'src': userImg, 'width': '100%', 'height':'auto', 'whs':1});

                if (config.source == 'baidu_zhidahao' || config.source == "baidu_app_zhidahao") {
                    dom.find('.item-download').hide();
                }
                if (config.source == 'x360life') {
                    dom.find('.u-quit').hide();
                }
                if (config.source == 'x360life') {
                    dom.find('#app-cancel').hide();
                }
            });
            if (options && options.hasSearch === false) {
                dom.find('.search-area').hide();
            }
            $('body').append(dom);
            mainPanel = dom;
            initEvents(this);
            zhiDaHaoYinCangXiaZai(dom);
        }
        if (!sessionStorage.mobile) {
            $.ajax({
                url: '/customer_tel/customerServiceTel',
                type: 'GET',
                success: function(response) {
                    var tel = response.data.tel_number.trim();
                    if (tel) {
                        $('.dynamic-phone')
                        .html(tel)
                        .attr('href', 'tel:' + tel);
                        sessionStorage.setItem('mobile', tel)
                    }
                }
            });
        }

    }

    /**
     * 手百app中直达号访问隐藏下载
     * @return {[type]} [description]
     */
    function zhiDaHaoYinCangXiaZai(dom) {
        gsx_ready(function (config) {
            if (config.source == "baidu_app_zhidahao" || config.source == 'baidu_zhidahao') {
                dom.find('.item-download').hide();
            }
        });
    }

    util.inherits(NevPanel, MVCObject);
    var p = NevPanel.prototype;
    var lazyLoadImageInited = false;

    p.display_changed = function () {
        var display = this.get('display');
        if (display) {
            mainPanel.show().width('100%');
            setTimeout(function(){
                mainPanel.addClass('on');
                if (!lazyLoadImageInited) {
                    lazyLoadImageInited = true;
                    lazyLoadImage.init();
                }

            },50);
        } else {
            mainPanel.removeClass('on').width(0);
            setTimeout(function(){
                mainPanel.hide();
            },50);

        }
    };


    p.show = function () {
        this.set('display', true);
    };
    p.hide = function () {
        this.set('display', false);
    };

    function initEvents(me) {
        mainPanel.find('.content').on('touchmove', function (e) {
            e.preventDefault();
            return false;
        });
        mainPanel.on('touchstart', function (e) {
            if ($(e.target).hasClass('content')) {
                me.hide();
                e.preventDefault();
            }
        });
    }

    return NevPanel;


});
