/**
 * @file banner广告组件
 * @author yanglei
 */
define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var store = require('common/store');

    // 横幅广告位模板
    var BANNER_TEMPLATE = '<div class="h-ad-wrappers">'
        + '<a href="${ad.clickThrough}" style="display:block" class="ads" target="_blank">'
        +    '<img alt="${ad.hover}" src="${ad.material}" width="100%" title="${ad.hover}"/>'
        + '</a>';

    var renderBannerAd = etpl.compile(BANNER_TEMPLATE);

    // 广告埋点数据发送
    function sendAdMonitor(url) {
        WAT.send(url);
    }

    // 广告click监控埋点
    function addClickMonitor(ele) {
        $(ele).on('click', 'a[data-click-monitor]', function () {
            sendAdMonitor($(this).data('click-monitor'));
        });
    }

    /**
     * jsonp初始化banner广告
     */
    function initBannerAd() {
        var ele = this.ele;
        var limit=3;

        var defaultData = {
            material: 'http://img.gsxservice.com/3088413_i5i3ezw6.jpg',
            click: 'http://www.genshuixue.com/activity/model5/hz_yixi',
        };

        // 获取广告位数据

        service.getAd({
            id: 22,
            source: "22_0",
            adPosId: "123",
            tagList: "",
            cityId: store.get('cityId'),
            limit: limit
        })
        .done(function (response) {
            var dataArr = response.data[0].items;
            var data, html='';
            if (!response.code  && dataArr.length !=0) {
                for (var i = 0;i < dataArr.length; i++) {
                    data = dataArr[i];
                    if (data) {
                        html+=renderBannerAd({ad: data});
                    }
                }
                ele.html(html);
            }else{
                $(ele).html(renderBannerAd({ad:defaultData}));
            }

        }).fail(function(){
                $(ele).html(renderBannerAd({ad:defaultData}));
            });
    }

    /**
     * banner 广告位
     * @param {object} options 广告位参数
     * @property {jQuery} options.ele 投放广告位的元素
     * @property {string} options.adIdProp 广告位对应的id所绑定的元素属性
     */
    function AdBannerTop(options) {

        $.extend(this, AdBannerTop.defaultOptions, options);
        this.init();
    }

    AdBannerTop.defaultOptions = {
        adIdProp: 'ad-id'
    };

    // 初始化banner广告位
    AdBannerTop.prototype.init = function () {

        initBannerAd.call(this);
    };

    return AdBannerTop;
});