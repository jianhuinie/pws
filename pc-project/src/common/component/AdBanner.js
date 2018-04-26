/**
 * @file banner广告组件
 * @author zengcheng
 */
define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    // 横幅广告位模板
    var BANNER_TEMPLATE = ''
                        + '<!-- for: ${ads} as ${ad}, ${index} -->'
                        +   '<div class="ad-wrapper">'
                        +       '<a href="${ad.clickThrough}" data-rank="${index}" style="display:block" target="_blank">'
                        +           '<img alt="${ad.hover}" src="${ad.material}" width="100%" title="${ad.hover}"/>'
                        +       '</a>'
                        +       '<div class="adBottom">'
                        +           '<center class="descrip" data-title="${ad.descript}" data-width="20em">${ad.descript}</center>'
                        +           '<center class="${ad.priceClass}">${ad.price}</center>'
                        +       '</div>'
                        +   '</div>'
                        + '<!-- /for -->';

    var renderBannerAd = etpl.compile(BANNER_TEMPLATE);

    var posIdMap = {
        'org': [
            155,
            139
        ],
        'course': [
            27,
            43
        ],
        'teacher': [
            26,
            42
        ]
    };

    // 广告埋点数据发送
    function sendAdMonitor(params) {
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    //获取页面来源
    function getPageSource() {
        var chref = location.href;
        var source;
        if ((chref.indexOf('/sc/') > -1) || (chref.indexOf('/sc-') > -1)) {
            source = "course";
        }
        else if ((chref.indexOf('/st/') > -1) || (chref.indexOf('/st-') > -1)) {
            source = "teacher";
        }
        else {
            source = "org";
        }
        return source;
    }

    // 广告click监控埋点
    function addClickMonitor(ele) {
        var source = getPageSource();
        var chref = location.href;
        $(ele).on('click', 'a[data-rank]', function () {
            sendAdMonitor({
                'type': 'recommend_click',
                'stype': 'pandora',
                'url': chref,
                'source': source,
                'rank': $(this).data('rank') + 1,
                'city_id': store.get('cityId')
            });
        });
    }

    /**
     * jsonp初始化banner广告
     */
    function initBannerAd() {
        var ele = this.ele;

        var sjs = store.get('sj');
        if (sjs) {
            var arr = sjs.split('/');
            if (arr.length > 0) {
                sjs = arr[arr.length-1];
            }
        }
        var chref = location.href;
        var hrefs = chref.split('/');
        var query = decodeURIComponent(hrefs[hrefs.length-1].split(".")[0].split("-")[1]);
        var source = getPageSource();
        var sjs = store.get('sj');
        if (sjs) {
            var arr = sjs.split('/');
            if (arr.length > 0) {
                sjs = arr[arr.length-1];
            }
        }
        //广告位数据
        var dataArr = [];
        var dealWithRes = function (response) {
            var defaultData = {
                material: 'http://img.gsxservice.com/3088413_i5i3ezw6.jpg',
                clickThrough: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15090140034&source=searchresult',
                hover: '新概念吉他教程1',
                descript : '新概念吉他教程1',
                price: '0.0',
                id: Math.random() * 100
            };
            if (response.code === 0 && response.data) {
                var result = response.data[0].items;
                dataArr.push(result[0]);
            }
            else {
                //去掉默认课程
                // dataArr.push(defaultData);
            }
        };
        var createPromise = function (index) {
            return service
                .getAdvertisement({
                    query: query || '数学',
                    cityId: store.get('cityId') || 17039360,
                    source: source,
                    sj: sjs ? sjs : 0,
                    adPosId: posIdMap[source][index],
                    limit: 1,
                    id: 10,
                    offset: 0,
                    user_number: store.get('user').number,
                    track_id: cookie.get('__track_id__')
                });
        };
        //获取广告位数据 并渲染模版
        createPromise(0)
            .done(function (response) {
                dealWithRes(response);
                createPromise(1)
                    .done(function (response) {
                        dealWithRes(response);
                        //价格处理
                        if (dataArr.length) {
                            $.each(dataArr, function (index, item) {
                                if (item.price == "0.0"){
                                    item.priceClass = "priceFree";
                                    item.price = '免费';
                                }
                                else {
                                    item.priceClass = "price";
                                    item.price = '¥ ' + item.price ;
                                }
                            });
                            $(ele).html(renderBannerAd({ads:dataArr}));
                        }
                    });
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
        addClickMonitor(this.ele);
    };

    return AdBanner;
});