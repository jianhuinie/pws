/**
 * @file 搜狗导航页-轮播图
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Carousel = require('cobble/ui/Carousel');
    var Switchable = require('cobble/helper/Switchable');
    var ScrollBar = require('cobble/ui/ScrollBar');

    var service = require('common/service');
    var store = require('common/store');

    var Slider = require('common/component/Slider');
    var getAdMonitorUrl = require('common/function/getAdMonitorUrl');
    var urlUtil = require('cobble/util/url');
    var ad = require('main/mods/ad');
    var etpl = require('cobble/util/etpl');
    var ClickMonitor = require('common/component/ClickMonitor');

    var eventEmitter = require('common/eventEmitter');
    var container;

    // 需要声明用于打包
    require('main/mods/special');
    require('main/mods/hotLive');
    require('main/mods/floor');
    require('main/mods/recommendTeacher');
    require('main/mods/preferentialCourse');

    var renderAd5 = etpl.compile($('#ad-5-template').html());
    var renderAd10 = etpl.compile($('#ad-10-template').html());
    var renderAd6To9 = etpl.compile($('#ad-6-to-9-template').html());

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarouse5(data) {
        // 默认配置
        var adDefault = {
            material: window.require.toUrl('../../img/main/slider_top_default.jpg'),
            click: 'http://ju.genshuixue.com',
            monitor: '',
            clickMonitor: '',
            hover: '聚惠学'
        };

        var container = $('.promotion-slider-container');
        var tmp;

        if (!data || !data.length) {
            data = [adDefault];
        }

        // 没有物料的替换成默认的
        for (var i = data.length - 1; i >= 0; i--) {
            tmp = data[i];
            if (!tmp.material) {
                data[i] = adDefault;
            } else if (!tmp.click){
                tmp.click = 'javascript:void(0);';
            }
        };

        // 初始化轮播
        container.html(renderAd5({promotionList: data}));

        new Slider({
            element: $('.promotion-slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            delay: 8000,
            onChange: function (e, data) {

                reportCarouseAd(container.find('.promotion-slideritem'), data.to);
            }
        });
    };

    function initAd10(data) {
        // 默认配置
        var adDefault = {
            material: window.require.toUrl('../../img/main/banner_top_default.jpg'),
            click: 'http://www.genshuixue.com/static/windows',
            monitor: '',
            clickMonitor: '',
            hover: '在线课堂'
        };

        var container = $('.promotion-right-banner');

        if (!data || !data.length || !data[0].material) {
            data = adDefault;
        }

        if (data[0] && data[0].material) {
            data = data[0];
            if (!data.click) {
                data.click = 'javascript:void(0);';
            }
        }



        container.html(renderAd10({data: data}));
    }

    function initAd11(data) {

        // 默认配置
        var adDefault = {
            material: window.require.toUrl('../../img/main/city/guding/shipin.png'),
            click: 'http://www.genshuixue.com/activity/center?id=43?source=gsx_shipinke2_pc',
            monitor: '',
            clickMonitor: '',
            hover: '视频课'
        };

        var container = $('.bottom-right-banner');

        if (!data || !data.length || !data[0].material) {
            data = adDefault;
        }

        if (data && data[0] && data[0].material) {
            data = data[0];
            if (!data.click) {
                data.click = 'javascript:void(0);';
            }
        }

        container.html(renderAd10({data: data}));
    }
    /**
     * 初始化轮播图2
     *
     * @return
     */
    function initCarouse6(data) {

        var container = $('.bottom-slider-container');

        var fixedEmpty = function (data, maxLength, defaultData, always) {
            var tmp;
            if ((data && data.length) || always) {
                for (var i = data.length; i < maxLength; i++) {
                    data.push(defaultData);
                }
                for (i = maxLength - data.length - 1; i >= 0; i--) {
                    tmp = data[i];
                    tmp.cls = defaultData.cls;
                    !tmp.click && (tmp.click = 'javascript:void(0);')
                    !tmp.material && (data[i] = defaultData)

                }
            }
            return data;
        };

        var isEmpty = function (data) {
            var result = true;
            if (data && data.length) {
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].material) {
                        return false;
                    }
                }
            }
            return result;
        };

        // 默认配置
        var adDefault = {
            '6': {
                material: window.require.toUrl('../../img/main/city/guding/banner_Henry-yeh_130x180.jpg'),
                click: 'http://www.genshuixue.com/teacher/classCourseDetail?number=150417549130',
                monitor: '',
                clickMonitor: '',
                hover: '',
                cls: 'style1'
            },
            '7': {
                material: window.require.toUrl('../../img/main/city/guding/shoudan300.jpg'),
                click: 'http://ju.genshuixue.com/',
                monitor: '',
                clickMonitor: '',
                hover: '聚惠学',
                cls: 'style2'
            },
            '8': {
                material: window.require.toUrl('../../img/main/city/guding/shoudan300.jpg'),
                click: 'http://ju.genshuixue.com/',
                monitor: '',
                clickMonitor: '',
                hover: '聚惠学',
                cls: 'style2'
            },
            '9': {
                material: window.require.toUrl('../../img/main/city/beijing/banner_logos_huanyuhongze_130x60.jpg'),
                click: 'http://gicorg.genshuixue.com/',
                monitor: '',
                clickMonitor: '',
                hover: '',
                cls: 'style3'
            }
        };

        var tmp;

        // 过滤广告位
        var finalData = [];
        if(!isEmpty(tmp = data['6'])) {
            finalData.push(fixedEmpty(tmp, 4, adDefault['6']));

        }

        if(!isEmpty(tmp = data['7'])) {
            finalData.push(fixedEmpty(tmp, 2, adDefault['7']));
        }

        if(!isEmpty(tmp = data['8'])) {
            finalData.push(fixedEmpty(tmp, 2, adDefault['8']));
        }

        if (!isEmpty(tmp = data['9'])) {
            finalData.push(fixedEmpty(tmp, 12, adDefault['9'], true));
        }

        // 初始化轮播
        container.html(renderAd6To9({sliderList: finalData}));

        return new Slider({
            element: $('.bottom-slider-container'),
            itemSelector: '.bottom-slideritem',
            iconSelector: '.bottom-slider-navitem',
            prevSelector: '.bottom-slider-left',
            nextSelector: '.bottom-slider-right',
            duration: 150,
            delay: 8000,
            onChange: function (e, data) {
                reportCarouseAd(container.find('.bottom-slideritem'), data.to);
            }
        });
    };

    function initClickMonitor() {

        var user = store.get('user') || {};
        var data = store.get();
        var defaultParams = {
            user_number: user.number || '',
            user_role: user.type || '',
            city_id: data.cityId
        };

        var interceptor = function (ele) {

            var params = {};
            var keyFlag = 'monitor';
            var allData = ele.data();
            var tempKey;
            for (var key in allData){
                if (key.indexOf(keyFlag) === 0) {
                    tempKey = key.substring(keyFlag.length).toLowerCase();
                    if (tempKey) {
                        params[tempKey] = allData[key];
                    }
                }
            }
            params._timestamp = new Date().getTime();
            return params;
        };

        return new ClickMonitor({
            selector: '.click-monitor',
            monitorUrl: '//pb0.genshuixue.com/gs.gif',
            defaultParams: defaultParams,
            useDataHref: false,
            isSend: store.get('env') === 'www',
            interceptor: interceptor
        });
    };

    /**
     * 绑定广告点击发送曝光
     * @return {[type]} [description]
     */
    function initAdClick() {
        container
        .on('click', '.main-banner [data-click-monitor]', function (e) {
            var monitor = $(this).data('click-monitor');

            sendToMonitor(monitor, true);
            return true;
        });
    }

    function reportCarouseAd(items, index) {

        var target = items.filter('[data-index="' + index + '"]');
        var images = target.find('img');

        if (target.data('reported')) {

            images.each(function (index, img) {
                sendToMonitor($(img).data('monitor'));
            });

        }
        else {

            if (target.data('combine')) { //一些广告需要合并上送曝光地址

                var monitor;

                var combined = $.map(images, function (item, index) {
                    var m = $(item).data('monitor');

                    if (m) {
                        monitor = m;
                        var query = m.indexOf('?') != -1 ? m.substring(m.indexOf('?')) : '';
                        var param = urlUtil.parseQuery(query);

                        return param.c;
                    }
                });

                sendToMonitor(monitor, true, combined);
            }
            else {

                images.each(function (index, img) {
                    sendToMonitor($(img).data('monitor'), true);
                });
            }

            target.data('reported', true);
        }
    }

    var imageListForMonitor = [];

    function sendToMonitor(url, isFirst, combined) {

        if (!url) return;

        var monitor = url.replace(/^http:\/\//, '//'); //替换为当前协议


        if (!isFirst) {
            return; //暂不重复上送
        }

        //上送统计
        if (monitor) {

            monitor = getAdMonitorUrl(monitor, true, combined);

            var img = new Image();
            // 保持引用
            var index = imageListForMonitor.push(img) - 1;

            img.onload =
            img.onerror = function () {
                // 清除引用
                img =
                img.onload =
                img.onerror = null;
                delete imageListForMonitor[index];
            };

            img.src = monitor;
        }
    }

    exports.init = function () {
        container = $('#main');
        // 初始化广告位
        eventEmitter.on('ad-promotion-data', function (event, data) {

            // 初始化轮播组件
            initCarouse5(data['5']);
            initAd10(data['10']);
            initCarouse6(data);
            initAd11(data['11']);

            //initBannerVideo();
            initAdClick();
            initClickMonitor();

            $('.main-banner-promotion.loading').removeClass('loading');
        });
        // 初始化广告
        ad.init('sougou');
    };

});