/**
 * @file 对外导航banner广告组件
 * @author jixiaohui
 */
define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var service = require('common/service');
    var store = require('common/store');


    var BANNER_TEMPLATE = '<!-- if: ${activitys.index} == 4 -->'
        +       '<!-- var: style = "last" -->'
        +   '<!-- else -->'
        +       '<!-- var: style = "" -->'
        +   '<!-- /if -->'
        +   '<li class="item ${style}">'
        +       '<a class="cover" href="${activitys.click}" target="_blank">'
        +           '<img alt="${activitys.hover}" src="${activitys.material}" title="${activitys.hover}" />'
        +       '</a>'
        +   '</li>';

    var BANNER_TEMPLATE2 = '<ul class="promotion-slider">'
        + '<!-- for: ${promotionList} as ${item}, ${index} -->'
        +    '<li class="promotion-slideritem" data-index="${index}">'
        +       '<a target="_blank" href="${item.click}" title="${item.hover}" data-click-monitor="${item.clickMonitor}">'
        +           '<img src="${item.material}" width="720" height="270" alt="${item.hover}" data-monitor="${item.monitor}"/>'
        +       '</a>'
        +    '</li>'
        + '<!-- /for -->'
        + '</ul>'
        + '<!-- if: ${promotionList.length} > 1 -->'
        +     '<ul class="promotion-slider-nav">'
        +         '<!-- for: ${promotionList} as ${item}, ${index} -->'
        +             '<li>'
        +                 '<span class="promotion-slider-navitem">'
        +                     '${index}'
        +                 '</span>'
        +             '</li>'
        +         '<!-- /for -->'
        +     '</ul>'
        + '<a href="javascript:;" class="promotion-slider-left" title="上一张">'
        +     '<i class="icon icon-chevron-left"></i>'
        + '</a>'
        + '<a href="javascript:;" class="promotion-slider-right" title="下一张">'
        +     '<i class="icon icon-chevron-right"></i>'
        + '</a>'
        + '<!-- /if -->';

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
        var adIds = this.adIds;
        var tpl = this.tpl;
        var page_type = this.page_type;
        var renderBannerAd = '';
        var cb = this.callback;
        var _html = '';

        if (tpl == 'activity') {
            renderBannerAd = etpl.compile(BANNER_TEMPLATE);
            _html = '<span class="category">热门活动</span><ul class="list">';
        } else {
            renderBannerAd = etpl.compile(BANNER_TEMPLATE2);
        }

        var defaultData = {
            "zxx": {
                "activitys": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/1.jpg',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15090439670&zn=zn_15090439670_sogou',
                        hover: '胡灿奎',
                        index: 1
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/2.jpg',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15071135898&zn=zn_15071135898_sogou',
                        hover: '郭新超',
                        index: 2
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/3.jpg',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15081235786&user_number=&zn=zn_15081235786_sogou',
                        hover: '沈玉状',
                        index: 3
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/4.jpg',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15091948020&user_number=&zn=zn_15091948020_sogou',
                        hover: '邱晓玫',
                        index: 4
                    }
                ],
                "promotionList": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/0.jpg',
                        click: 'http://www.genshuixue.com/activity/model1/www_all_gqk12?zn=zn_gqk12_sogou',
                        hover: 'K12专题'
                    }
                ]
            },
            "cglx": {
                "activitys": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/1.jpg',
                        click: 'http://www.genshuixue.com/video_course/play?course_number=15062443688&zn=zn_15062443688_sogou',
                        hover: '包子姐姐陪你学雅思',
                        index: 1
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/2.jpg',
                        click: 'http://www.genshuixue.com/video_course/play?course_number=15090172442&zn=zn_15090172442_sogou',
                        hover: '商科申请职业规划',
                        index: 2
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/3.jpg',
                        click: 'http://www.genshuixue.com/video_course/play?course_number=15101334765&zn=zn_15101334765_sogou',
                        hover: '托福100分策略',
                        index: 3
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/4.jpg',
                        click: 'http://www.genshuixue.com/video_course/play?course_number=15050467692&zn=zn_15050467692_sogou',
                        hover: '斯坦福前招生官讲座',
                        index: 4
                    }
                ],
                "promotionList": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/0.jpg',
                        click: 'http://www.genshuixue.com/activity/schoolMain?zn=zn_schoolMain_sogou',
                        hover: '2元定制世界名校路'
                    }
                ]
            },
            "ytxq": {
                "activitys": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/1.png',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15021175680&zn=zn_15021175680_sogou',
                        hover: '15天快速瘦身',
                        index: 1
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/2.png',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15021134848&zn=zn_15021134848_sogou',
                        hover: '时尚盘发',
                        index: 2
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/3.png',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15071668654&zn=zn_15071668654_sogou',
                        hover: '淡奶油司康',
                        index: 3
                    },
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/4.png',
                        click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15071643774&zn=zn_15071643774_sogou',
                        hover: '木吉他弹唱速成班',
                        index: 4
                    }
                ],
                "promotionList": [
                    {
                        material: 'http://cdn.gsxservice.com/asset/img/navigation/sougou/zxx/0.jpg',
                        click: 'http://www.genshuixue.com/activity/model4/all_donghang5?zn=zn_donghang5_sogou',
                        hover: '懂行第五期'
                    }
                ]
            }
        };

        // 获取广告位数据
        service
        .getNavigationAd({
            cityId: store.get('cityId'),
            adId: adIds.join(',')
        })
        .done(function (response) {
            var dataArr = null;
            var data;

            if (!response.code) {

                /*for (var i = dataArr.length - 1; i >= 0; i--) {
                    data = dataArr[i];
                    if (data) {
                        data.index = i+1 ;
                        html+=renderBannerAd({ad: data});
                    }
                }
                ele.html(html);*/
                if (tpl == 'activity') {
                    for ( var i = 0 ; i < adIds.length; i++) {
                        dataArr = response.data[adIds[i]];
                        dataArr[0].index = i+1;
                        _html += renderBannerAd({activitys: dataArr[0]});
                    }
                    _html += '</ul>';
                } else {
                    dataArr = response.data[adIds[0]];
                    _html = renderBannerAd({promotionList: dataArr});
                }
                ele.html(_html);
                //执行回调
                if (cb) {
                    cb();
                }
            }else{
                //$(ele).html(renderBannerAd({ad:defaultData}));
                // 打底广告
                if (tpl == 'activity') {
                    for ( var i = 0 ; i < defaultData[page_type].activitys.length; i++) {
                        _html += renderBannerAd({activitys: defaultData[page_type].activitys[i]});
                    }
                    _html += '</ul>';
                } else {
                    _html = renderBannerAd({promotionList: defaultData[page_type].promotionList});
                }
                ele.html(_html);
            }

        }).fail(function(){
                //$(ele).html(renderBannerAd({ad:defaultData}));
                //打底广告
                if (tpl == 'activity') {
                    for ( var i = 0 ; i < defaultData[page_type].activitys.length; i++) {
                        _html += renderBannerAd({activitys: defaultData[page_type].activitys[i]});
                    }
                    _html += '</ul>';
                } else {
                    _html = renderBannerAd({promotionList: defaultData[page_type].promotionList});
                }
                ele.html(_html);
        });
    }

    /**
     * banner 广告位
     * @param {object} options 广告位参数
     * @property {jQuery} options.ele 投放广告位的元素
     * @property {string} options.adIdProp 广告位对应的id所绑定的元素属性
     */
    function NavigationAd(options) {

        $.extend(this, NavigationAd.defaultOptions, options);
        this.init();
    }

    NavigationAd.defaultOptions = {
        adIdProp: 'ad-id'
    };

    // 初始化banner广告位
    NavigationAd.prototype.init = function () {

        initBannerAd.call(this);
    };

    return NavigationAd;
});