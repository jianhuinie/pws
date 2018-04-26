/**
 * Created by xuzheng on 15/5/13.
 */
define(function (require, exports) {

    'use strict';

    var util = require('common/util');
    var sendImage = require('common/function/sendImage');

    var logEngine = "https://click.genshuixue.com/w.gif";

    var inited = false;

    var config = {};

    var touchEvts = ["touchstart", "touchmove", "touchend", "touchcancel"];
    var pointerEvts = ["pointerdown", "pointermove", "pointerup", "lostpointercapture"];
    var mspointerEvts = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSLostPointerCapture"];

    var EventNames = touchEvts;
    // hurry: 先判断是否支持touch
    if ('ontouchend' in document) {}
    else {
        if (window.PointerEvent) {
            EventNames = pointerEvts;
        } else if (window.MSPointerEvent) {
            EventNames = mspointerEvts;
        }
    }

    var fixPointerEvent = null;
    if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
        fixPointerEvent = (function () {
            var touches = {};
            return function (evt) {
                if (evt.pointerType != (evt.MSPOINTER_TYPE_TOUCH || "touch")) {
                    evt.preventDefault();
                } else {
                    if (evt.type == EventNames[2] || evt.type == EventNames[3]) {
                        delete touches[evt.pointerId];
                    } else if (evt.type == getEventName(0) ||
                        evt.type == EventNames[1] &&
                        touches[evt.pointerId]) {
                        touches[evt.pointerId] = new Point(evt.pageX, evt.pageY);
                    }
                    var changedTouches = [];
                    for (var i in touches) {
                        changedTouches.push({
                            'pageX': touches[i].x,
                            'pageY': touches[i].y,
                            'target': evt.target
                        });
                    }
                    evt.touches = {
                        item: function (pointerId) {
                            return changedTouches[pointerId]
                        },
                        length: changedTouches.length
                    };
                    evt.changedTouches = {
                        item: function () {
                            return {
                                'pageX': evt.pageX,
                                'pageY': evt.pageY,
                                'clientX': evt.clientX,
                                'clientY': evt.clientY
                            };
                        },
                        length: 1
                    };
                }
            }
        })();
    }

    function onClick(handle) {
        var currentTouchesNumber = 0;
        var maxTouchesNumber = 0;
        var isMoved = false;
        var body = document.body;

        function updateTouchesNumber(event) {
            currentTouchesNumber = event.touches.length;
            maxTouchesNumber = Math.max(currentTouchesNumber, maxTouchesNumber);
        }

        function isTriggerClick(event) {
            return !isMoved && maxTouchesNumber == 1
        }

        //touchstart
        body.addEventListener(EventNames[0], function (event) {
            if (fixPointerEvent) {
                event = fixPointerEvent(event);
            }
            updateTouchesNumber(event);
        }, true);

        //touchmove
        body.addEventListener(EventNames[1], function (event) {
            if (fixPointerEvent) {
                event = fixPointerEvent(event);
            }
            updateTouchesNumber(event);
            isMoved = true;
        }, true);

        //touchend
        body.addEventListener(EventNames[2], function (event) {
            if (fixPointerEvent) {
                event = fixPointerEvent(event);
            }
            updateTouchesNumber(event);
            if (isTriggerClick(event)) {
                handle(event);
            }
            if (currentTouchesNumber == 0) {
                maxTouchesNumber = 0;
                isMoved = false;
            }
        }, true);

        //touchcancel
        body.addEventListener(EventNames[3], function (event) {
            if (fixPointerEvent) {
                event = fixPointerEvent(event);
            }
            updateTouchesNumber(event);
            maxTouchesNumber = 0;
        }, true);

    }

    //统一设置一些通用参数
    function getDefaultParams(event) {
        var rst = {};
        //点击时间
        //rst['t'] = new Date().getTime();
        return rst;
    }

    function send(params) {
        var c_logEngine = params._postUrl ? params._postUrl : logEngine;
        delete params._postUrl;
        var url = c_logEngine + "?" + $.param(params);
        sendImage(url);
    }

    /**
     * 初始化函数，绑定全局click事件
     * 会根据dom节点上得"data-log"参数来识别logID
     * 相应的logID需要调用config接口配置回调函数
     *
     * @param {Object} param 配置参数
     *    @param.url  埋点数据上报的URL地址，不写默认使用上面那个；
     *
     * @author xuzheng
     * @date 2015.05.14
     * */
    exports.init = function (param) {
        if (param && param.url) {
            logEngine = param.url;
        }

        if (inited) {
            return;
        }
        inited = true;
        onClick(function (event) {
            var params = getDefaultParams(event);
            var $dom = $(event.target).closest('[data-log]');
            if ($dom.length > 0) {
                var handle = config[$dom.attr('data-log')];
                if (util.lang.isFunction(handle)) {
                    var obj = handle($dom[0], params);
                    if (util.lang.isObject(obj)) {
                        params = obj;
                    } else if (obj === false) {
                        params = null;
                    }
                }
                if (params && !util.object.isEmpty(params)) {
                    send(params);
                }
            }
        });
    };

    /**
     * 配置相应logID的回调函数
     *
     * @param logID {string} 自定义一个字符串，不可以重复
     * @param handle {function} 回调函数，回调参数(domElement,objDefaultParams)
     *
     * */
    exports.config = function (logID, handle) {
        if (handle) {
            if (config[logID]) {
                throw Error('重复配置clickLogID：' + logID);
            }
            config[logID] = handle;
        } else {
            delete config[logID];
        }
    };
});