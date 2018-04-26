/**
 * @file 首页文字广告和横幅广告初始化
 * @author zengcheng
 */
define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var store = require('common/store');
    var Slider = require('common/component/Slider');
    var eventEmitter = require('common/eventEmitter');

    // 横幅广告位模板
    var BANNER_TEMPLATE = ''
        + '<a href="${ad.click}" data-click-monitor="${ad.clickMonitor}" data-monitor="${ad.monitor}" target="_blank">'
        +    '<img alt="${ad.hover}" src="${ad.material}" width="1190" height="90" title="${ad.hover}"/>'
        + '</a>';

    var renderTextAd = etpl.compile($('#ad-text-template').html());
    var renderBannerAd = etpl.compile(BANNER_TEMPLATE);

    // 广告埋点数据发送
    function sendAdMonitor(url) {
        WAT.send(url);
    };

    // 广告click监控埋点
    function addClickMonitor(ele) {
        ele.on('click', 'a[data-click-monitor]', function () {
            sendAdMonitor($(this).data('click-monitor'));
        });
    }

    /**
     * 初始化文字广告内容
     */
    function initAdContent(ele, data) {
        if (!data || (data.length == 0)) return false;
        ele.html(renderTextAd({ads: data}));
        new Slider({
            element: ele,
            itemSelector: '.special-ad-item',
            duration: 150,
            isVertical: true,
            scrollOneDirection: true,
            onChange: function (event, data) {
                var currentEle = $('.special-ad-item:eq(' + (+data.to + 1) + ')', this.element);
                if (!currentEle.data('is-pv')) {
                    currentEle.data('is-pv', '1');
                    sendAdMonitor($('a', currentEle).data('monitor'));
                }
            }
        });

        addClickMonitor(ele);
    }

    /**
     * jsonp初始化文字广告
     */
    function initTextAd() {

        var ads = {};
        var ids = [];
        var tmp, adId;

        // 获取广告位信息
        $('.special-wrapper [data-ad-id]').each(function (index, ele) {
            tmp = $(ele);
            adId = tmp.data('ad-id');
            ids.push(adId);
            ads[adId] = tmp;
        });

        // 获取广告位数据
        service
        .fetchadvertisement({
            adId: ids.join(','),
            cityId: store.get('cityId')
        })
        .done(function (response) {
            var data = response.data;
            $.each(ids, function (index, item) {
                initAdContent(ads[item], data[item]);
            });
        });
    }

    /**
     * jsonp初始化banner广告
     */
    function initBannerAd() {
        var ele = $('.ad-banner-wrapper');
        var adId = ele.data('ad-id');
        // 获取广告位数据
        service
        .fetchadvertisement({
            adId: adId,
            cityId: store.get('cityId')
        })
        .done(function (response) {
            if (!response.status) {
                var data = response.data[adId];
                if (data && data[0]) {
                    ele.html(renderBannerAd({ad: data[0]}));
                    sendAdMonitor($('a', ele).data('monitor'));
                    addClickMonitor(ele);
                }
            }
            eventEmitter.emit('ad.banner.ready');
        });
    }

    /**
     * jsonp初始化轮播广告
     */
    function initSliderAd() {

        var ele = $('.main-banner-promotion');
        var ids = ['5', '6', '7', '8', '9', '10', '11'];
        service
        .fetchadvertisement({
            adId: ids.join(','),
            cityId: store.get('cityId')
        })
        .done(function (response){
            if (response && !response.status) {
                var data = response.data;
                if (!data) {
                    eventEmitter.emit('ad-promotion-data-fail');
                } else {
                    eventEmitter.emit('ad-promotion-data', data);
                }
            } else {
                eventEmitter.emit('ad-promotion-data-fail');
            }
        })
        .fail(function(response) {
            eventEmitter.emit('ad-promotion-data-fail');
        });
    }

    exports.init = function (item) {

        // 扩展模板添加过滤器
        etpl.addFilter('usehot', function (value) {
            return value.indexOf('teacher') == -1 && value.indexOf('organization') == -1;
        });

        // 初始化轮播图广告位
        initSliderAd();

        // 初始化广告
        if (item != 'sougou') {
            initBannerAd();
            initTextAd();
        }
    };
});