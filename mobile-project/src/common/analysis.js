/**
 * Created by xuzheng on 16/1/11.
 */
define(function (require) {
    'use strict';

    var user = require('common/user');
    var util_base = require('util/base');
    var util_function = require('util/function');
    var util_object = require('util/object');
    var cookie = require('util/cookie');

    var sender = function (url, delay) {
        var instance = sender;
        if (!url) {
            return;
        }
        var iid = 'gs_' + sender._count++;
        var img = instance._ps[iid] = new Image;
        img.iid = iid;
        img.onload = img.onerror = img.onabort = function () {
            sender._clear(img);
        };
        if (delay > 0) {
            setTimeout(function () {
                img.src = url;
            }, delay);
        } else {
            img.src = url;
        }
    };
    sender._count = 0;
    sender._ps = {};
    sender._clear = function (img) {
        var instance = sender;
        if (img) {
            instance._ps[img.iid] = img.onload = img.onerror = img.onabort = null;
            delete instance._ps[img.iid];
            instance._count--;
            img = null;
        }
    };

    var getGuid = util_function.lazyConst(function () {
        function s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        function create() {
            return [
                s4() + s4(),
                s4(),
                s4(),
                s4(),
                s4() + s4() + s4()
            ].join('-');
        }

        var key = '__guid__';
        var _guid = cookie.get(key);
        if (!_guid) {
            _guid = create();
            cookie.set(key, _guid,{
                expires: 1*24*365*100,
                domain: 'genshuixue.com'
            });
        }
    });

    function toUrl(host, path) {
        return location.protocol + '//' + host + path;
    }

    function send_pv(options) {
        var page_url = document.URL;
        var referrer = document.referrer || '';
        var guid = options.guid || getGuid();
        var userInfo = user.getUserInfo();
        var user_number = '';
        if (userInfo) {
            user_number = userInfo.number;
        }

        var data = {
            'page_url': page_url,
            'referrer': referrer,
            'user_number': user_number,
            'guid': guid
        };
        var cts = common_page_info["traffic_source"] || '';
        var cookieTS = cookie.get('traffic_source');
        if (!cts) {
            if (document.referrer && document.referrer.indexOf('.genshuixue.com') == -1) {
                /* 如果来自外站，记录外站host */
                cts = document.referrer.split('/')[2];
            }
            if (!cts && cookieTS) {
                cts = cookieTS;
            }
        }
        if (cts) {
            if (cts != cookieTS) {
                cookie.set('traffic_source', cts, {
                    domain: '.genshuixue.com',
                    expires: new Date(Date.now()+86400000)
                });
            }
            options.params.traffic_source = cts;
        }

        if (common_page_info["page_str"]) {
            options.params['page_str'] = common_page_info["page_str"];
        }
        /* 把上一个页面的page_str 作为pre_page_str字段传递 */
        function addPrePageStr(params) {
            params.pre_page_str = '';
            /* 如果存在上一个页面的page_str 且新鲜度小于两个小时，则传递过去 */
            if (localStorage['pre_page_str'] && (localStorage['pre_page_str_time'] - Date.now()) < 7200000) {
                params.pre_page_str = localStorage['pre_page_str'];
            }
            try {
                if (params['page_str']) {
                    localStorage['pre_page_str'] = params['page_str'];
                    localStorage['pre_page_str_time'] = Date.now();
                } else {
                    localStorage['pre_page_str'] = '';
                    localStorage['pre_page_str_time'] = 0;
                }
            } catch (e) {}
            return params;
        }
        addPrePageStr(options.params);

        if (options.params) {
            for (var k in options.params) {
                data[k] = options.params[k];
            }
        }


        var url = toUrl('pb0.genshuixue.com', '/pv0.gif') + '?' + util_object.toParamUrl(data, true);
        sender(url, data);
    }

    var clickLog = (function () {
        var clickLog = {};
        var logParams = {};

        function watchClick() {
            var on = function (element, eventName, fn) {
                var handle = function (evt) {
                    evt = window.event || evt;
                    var target = evt.srcElement || evt.target;
                    fn.call(target, evt);
                };
                if (element.attachEvent) {
                    element.attachEvent("on" + eventName, handle);
                } else {
                    element.addEventListener(eventName, handle, !1);
                }
            };
            var doc = document;
            on(doc, 'click', function (evt) {
                sendClick(evt);
            });
        }

        function setOptions(options) {
            options = options || {};
            var params = options.params;
            if (util_base.isObject(params)) {
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        logParams[key] = params[key];
                    }
                }
            }
        }

        function find_click_params(target) {
            var list = [];

            var locationData;
            var skuData;

            while (target && target.tagName) {
                locationData = target.getAttribute('data-click');
                if (!skuData) {
                    skuData = target.getAttribute('data-sku');
                }
                if (locationData) {
                    list.unshift(locationData);
                }
                if (target.tagName === 'BODY' || target.tagName == 'HTML') {
                    break;
                } else {
                    target = target.parentNode;
                }
            }
            var data = {};
            if (skuData) {
                skuData = skuData.split('|');
                data['item_type'] = skuData[0];
                data['item_id'] = skuData[1];
            }
            if (list.length > 0) {
                data['location'] = list.join('.');
            }
            return data;
        }

        function getPosition(event, doc, rx, ry) {
            var relativeX = rx || 0;
            var relativeY = ry || 0;
            doc = doc || document;
            event = event || window.event;
            var pos = {};
            if (event.pageX || event.pageY) {
                pos = {
                    'x': event.pageX,
                    'y': event.pageY
                };
            } else {
                var px = event.clientX +
                    Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft) -
                    doc.body.clientLeft;
                var py = event.clientY +
                    Math.max(doc.documentElement.scrollTop, doc.body.scrollTop) -
                    doc.body.clientTop;
                pos = {
                    'x': px,
                    'y': py
                };
            }
            pos.x += relativeX;
            pos.y += relativeY;
            var bodyCenterX = Math.max(
                    Math.max(
                        document.body.clientWidth,
                        document.body.offsetWidth
                    ),
                    Math.max(
                        document.body.scrollWidth,
                        document.documentElement.scrollWidth
                    )
                ) / 2;
            //计算相对于window.screen.width的位置
            pos.x = pos.x - bodyCenterX + window.screen.width / 2 - (
                    Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    ) > (
                        "undefined" == typeof window.innerHeight ?
                            document.documentElement.clientHeight :
                            window.innerHeight
                    ) ? 8.5 : 0
                );
            return pos;
        }

        function sendClick(evt, params) {
            evt = evt || window.event;
            var clickParams = find_click_params(evt.target || evt.srcElement);
            var userInfo = user.getUserInfo();
            var userNumber = '';
            if (userInfo) {
                userNumber = userInfo.number
            }

            if (!clickParams.location) {
                return;
            }
            var position = getPosition(evt);

            var data = {
                'type': logParams.type || '',
                'service': logParams.service || '',
                'user_id': userNumber,
                'x': position.x,
                'y': position.y
            };

            //location, item_type, item_id
            if (util_base.isObject(clickParams)) {
                for (var key in clickParams) {
                    if (clickParams.hasOwnProperty(key)) {
                        data[key] = clickParams[key];
                    }
                }
            }


            if (util_base.isObject(params)) {
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        data[key] = params[key];
                    }
                }
            }

            var url = toUrl('pb0.genshuixue.com', '/ctr.gif') + '?' + util_object.toParamUrl(data, true);
            sender(url, data);
        }

        clickLog.setOptions = setOptions;
        clickLog.watchClick = watchClick;
        clickLog.sendClick = sendClick;
        return clickLog;
    })();

    function send_timing() {
        /**
         * 计算渲染页面的各个时间点
         *
         * @inner
         * @return {Object}
         */
        function getTiming() {

            var performance = window.performance
                || window.msPerformance
                || window.webkitPerformance
                || window.mozPerformance
                || {};

            var timing = performance.timing;
            var result = null;

            if (timing) {
                result = {};

                for (var key in timing) {
                    result[key] = timing[key];
                }

                if (result.firstPaint == null) {

                    var chrome = window.chrome;

                    if (chrome && chrome.loadTimes) {
                        result.firstPaint = parseInt(chrome.loadTimes().firstPaintTime * 1000);
                    }
                    else if (typeof result.msFirstPaint === 'number') {
                        result.firstPaint = result.msFirstPaint;
                        delete result.msFirstPaint;
                    }
                }
            }

            return result;
        }

        var timing = getTiming();
        if (!timing) {
            return;
        }
        var data = {
            timing_navigationStart: timing.navigationStart,
            timing_fetchStart: timing.fetchStart,
            timing_domainLookupStart: timing.domainLookupStart,
            timing_domainLookupEnd: timing.domainLookupEnd,
            timing_connectStart: timing.connectStart,
            timing_connectEnd: timing.connectEnd,
            timing_requestStart: timing.requestStart,
            timing_responseStart: timing.responseStart,
            timing_responseEnd: timing.responseEnd,
            timing_domLoading: timing.domLoading,
            timing_domInteractive: timing.domInteractive,
            timing_domContentLoadedEventStart: timing.domContentLoadedEventStart,
            timing_domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
            timing_domComplete: timing.domComplete,
            timing_loadEventStart: timing.loadEventStart,
            timing_loadEventEnd: timing.loadEventEnd,
            timing_firstPaint: timing.firstPaint || window.firstPaint
        };
        var url = toUrl('click.genshuixue.com', '/performance.gif') + '?' + util_object.toParamUrl(data, true);

        sender(url, data);
    }

    function send_sku(params) {
        var userInfo = user.getUserInfo();
        var user_number = '';
        var user_role = '';
        if (userInfo) {
            user_number = userInfo.number;
            user_role = userInfo.role;
        }

        params['guid'] = params.guid || getGuid();
        params['referrer'] = document.referrer;
        params['user_number'] = user_number;
        if (user_number) {
            params['user_role'] = user_role;
        }

        var url = toUrl('pb0.genshuixue.com', '/sku.gif') + '?' + util_object.toParamUrl(params, true);
        sender(url, params);
    }

    return {
        'toUrl': toUrl,
        'pgv': function (options) {
            setTimeout(function () {
                send_pv(options);
            }, 0);
        },
        'watchClick': function (options) {
            if (!clickLog.inited) {
                clickLog.inited = true;
                clickLog.setOptions(options);
                clickLog.watchClick();
            }
        },
        'sendClick': function (evt, params) {
            clickLog.sendClick(evt, params);
        },
        'timing': function () {
            setTimeout(function () {
                send_timing();
            }, 2000);
        },
        'sku': function (params) {
            setTimeout(function () {
                send_sku(params);
            }, 2000);
        }
    };
});