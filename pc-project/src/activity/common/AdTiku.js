/**
 * @file banner广告组件
 * @author zengcheng tangrongyan
 */
define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var store = require('common/store');

    // 横幅广告位模板
    var BANNER_TEMPLATE = '<div class="ad-wrapper">'
        + '<a rel="nofollow" href="${ad.clickThrough}" style="display:block" target="_blank">'
        +    '<img alt="${ad.hover}" src="${ad.material}" width="100%" title="${ad.hover}"/>'
        +    '</a><div class="adBottom"><center class="descrip" data-title="${ad.descript}" data-width="20em">${ad.descript}</center><center class="${ad.priceClass}">${ad.price}</center></div>'
        + '</div>';

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
        var query = this.query;
        var source ,limit=6,type = 'st'

        var sjs = 0;
        var defaultData = {
            material: 'http://img.gsxservice.com/3088413_i5i3ezw6.jpg',
            click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15090140034&source=searchresult',
            hover: '新概念吉他教程1',
            descript : '新概念吉他教程1',
            price:'¥ 1.11',
            priceClass : 'price'
        };
        if(type === "sc"){
            source = "13_1";
        }else if (type == "st"){
            source = "13_1";
        }else{
            source = "13_1";
        }

        // 获取广告位数据
        service
        .getAdvertisementTiku({
            query: query,
            cityId: store.get('cityId'),
            source: source,
            sj: sjs ? sjs : 0,
            limit: limit
        })
        .done(function (response) {
            var dataArr = response.data[0].items;
            var data, html='';
            if (!response.code  && dataArr.length !=0) {
                for (var i = 0;i < dataArr.length; i++) {
                    data = dataArr[i];
                    if (data) {
                        if(data.price == "0.0"){
                            data.priceClass = "priceFree";
                            data.price = '免费';
                        }else {
                            data.priceClass = "price";
                            data.price = '¥ '+data.price ;
                        }
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
    function AdBanner(options) {

        $.extend(this, AdBanner.defaultOptions, options);
        this.init();
    }

    AdBanner.defaultOptions = {
        adIdProp: 'ad-id'
    };

    // 初始化banner广告位
    AdBanner.prototype.init = function () {

        initBannerAd.call(this);
    };

    return AdBanner;
});