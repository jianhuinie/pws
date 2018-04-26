/**
 * Created by xuzheng on 16/1/8.
 */
define(function (require) {
    'use strict';

    var doc = document;

    var hasSource = false;

    function init_ad() {
        if (window.gsx_ready) {
            window.gsx_ready(function (config) {
                if (hasSource) {
                    return;
                }
                var ads = null;
                try {
                    ads = config.page_data.ads;
                } catch (ex) {
                }
                if (ads) {
                    var bottomAdsNum = ads.page_bottom && ads.page_bottom.length;
                    var topAdsNum = ads.top && ads.top.length;
                    if (bottomAdsNum || topAdsNum) {
                        require(['zepto',
                            'common/page_layout',
                            'common/mvc/observer',
                            'util/dom',
                            'util/env'
                        ], function ($, page_layout, observer, util_dom, util_env) {
                            var init_ad_item = ad_creator.apply(null, arguments);
                            var index = 50;
                            var i;
                            if (ads.page_bottom) {
                                for (i = 0; i < ads.page_bottom.length; i++) {
                                    init_ad_item(ads.page_bottom[i], 'bottom_fixed', index + i);
                                }
                            }
                            if (ads.top) {
                                for (i = 0; i < ads.top.length; i++) {
                                    init_ad_item(ads.top[i], 'top', index + i);
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    var ad_creator = function ($, page_layout, observer, util_dom, util_env) {
        var css = '.page-banner-wrap:after{content:" ";position:relative;display:block;margin-top:15.625%;overflow:hidden}';
        util_dom.insertCssText(css);
        return function (adInfo, layoutName, index) {
            var layout = page_layout[layoutName];
            var $div = $('<div class="page-banner-wrap"></div>').css({
                'width': '100%',
                'font-size': 0
            });

            var $close = $('<div class="page-banner-close"></div>').css({
                'position': 'absolute',
                'width': 30,
                'left': 5,
                'z-index': 1,
                'top': 5,
                'bottom': 5
            }).appendTo($div);

            var $content = $('<div data-click="top-advertising"></div>').css({
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'top': 0,
                'left': 0,
                'z-index': 0
            }).appendTo($div);

            var $img = $('<img width="100%" height="100%" />').css({
                'position': 'absolute',
                'top': 0,
                'left': 0
            }).appendTo($content);

            $('<img />').one('load', function () {
                $img.attr('src', adInfo.material);
            }).attr('src', adInfo.material);

            $img.one('load', function () {
                observer.trigger($div[0], 'resize');
            });

            $close.tap(function () {
                layout.removeElement($div[0]);
            });
            $content.tap(function () {
                if (util_env.app) {
                    require(['common/app'], function (app) {
                        app.send('openNewWindow', {
                            url: adInfo.click
                        });
                    });
                } else {
                    location.href = adInfo.click;
                }
            });
            /*$div.click(function () {
             var googleAnalytics = window[window.GoogleAnalyticsObject];
             if (googleAnalytics) {
             googleAnalytics('send', 'event', 'download', 'click', 'ads');
             }
             });*/
            $(window).on('resize', function () {
                observer.trigger($div[0], 'resize');
            });

            layout && layout.addElement($div[0], index);
        };
    };

    function init_source() {
        if (window.gsx_ready) {
            gsx_ready(function (config) {
                if (window.top === window) {
                    if (config.source == "sogou" && window.location.protocol == 'http:') {
                        init_source_sogou();
                        hasSource = true;
                    } else if (location.search.indexOf('bd_source_light=') > 0) {
                        init_source_baidu(config.source_id);
                        hasSource = true;
                    }
                }
            });
        }
    }

    function init_source_sogou() {
        require(['common/page_layout'], function (page_layout) {
            var script = doc.createElement('script');
            script.src = "http://fuwu.wap.sogou.com/static/partner.js";
            script.setAttribute('sogouid', '046');
            doc.body.appendChild(script);

            var spaceElement = document.createElement('div');
            var elementStyle = spaceElement.style;
            elementStyle.width = '100%';
            elementStyle.height = '40px';

            page_layout.top_fixed.addElement(spaceElement);
        });
    }

    function init_source_baidu(sourceID) {
        require(['common/page_layout'], function (page_layout) {
            var method = document.dispatchEvent ? "onload" : "onreadystatechange";
            var reg_readystate = /loaded|complete|undefined/i;
            var script = document.createElement('script');
            script.setAttribute('name', 'baidu-tc-cerfication');
            script.setAttribute('data-appid', sourceID);
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script[method] = function () {
                if (reg_readystate.test(this.readyState)) {
                    window.clouda.lightInit({
                        ak: null,
                        module: ["smartBar", "geolocation"]
                    }, function () {
                        window.clouda.lego.smartBar.show();
                        //插入一个空白占位元素
                        var spaceElement = $('<div></div>').css({
                            width: '100%',
                            height: '45px'
                        });
                        page_layout.bottom_fixed.addElement(spaceElement, 999);
                    });
                }
            };
            if (window.location.protocol == 'http:') {
                script.src = "http://apps.bdimg.com/cloudaapi/lightapp.js";
            } else {
                script.src = "https://openapi.baidu.com/cloudaapi/lightapp.js";
            }
            document.body.appendChild(script);
        });
    }

    function init_bottom() {
        var bottomContainer = document.getElementById('bottom-container');
        if (bottomContainer && bottomContainer.firstChild.innerHTML && bottomContainer.firstChild.innerHTML.trim().length > 0) {
            require(['common/page_layout'], function (pageLayout) {
                pageLayout.bottom_fixed.addElement(bottomContainer.firstChild);
            });
        }
    }

    return function () {
        init_bottom();

        init_source();

        init_ad();
    };
});