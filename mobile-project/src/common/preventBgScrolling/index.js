/**
 * Created by chenmo on 16/2/17.
 */
define(function (require) {
    'use strict';

    var $ = require("zepto");

    var _win = window;
    var _doc = document;
    var _body = _doc.querySelector('body');
    var _bodyPos = 0;

    // 阻止以下情况：
    // 父子两个容器都可以scroll时，当子容器scroll到最底部时，继续划屏幕，父容器开始scroll。
    // 因为这种现象多数时候会给人以交互超出边界的感受。
    function mainMethod (allEles, viewEles, mask) {
        if(!allEles || !viewEles || !mask) {
            return;
        }

        var totalHeight = allEles.offsetHeight;
        var viewHeight = viewEles.offsetHeight;

        var lastTouchPos = 0;
        var curTouchPos = 0;
        var THRESHOLD = 5;

        mask.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });

        viewEles.addEventListener('touchstart', function (e) {
            var _touch = e.targetTouches[0];

            lastTouchPos = _touch.pageY;
        });

        viewEles.addEventListener('touchmove', function (e) {
            var _touch = e.targetTouches[0];

            curTouchPos = _touch.pageY;

            var curPos = viewEles.scrollTop;

            var direction = 'none';

            if ((curTouchPos - lastTouchPos) > THRESHOLD) {
                direction = 'down';
            } else if ((curTouchPos - lastTouchPos) < -THRESHOLD) {
                direction = 'up';
            }

            if (direction === 'none' || (direction === 'down' && curPos < THRESHOLD) || (direction === 'up' && (totalHeight - viewHeight) - curPos < THRESHOLD)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    function recommendedMethod (allowed) {
        if(!allowed) {
            return;
        }

        var touchStartPos = 0;
        var startTime = 0;
        var lastTouchPos = 0;
        var curTouchPos = 0;
        var THRESHOLD = 0;

        var allowedPos = 0;

        // allowed.style.transition = 'transform 0.3s';

        allowed.addEventListener('touchstart', function (e) {
            var _touch = e.targetTouches[0];

            touchStartPos = lastTouchPos = _touch.pageY;
            startTime = Date.now();
        });

        allowed.addEventListener('touchmove', function (e) {

            var _touch = e.targetTouches[0];

            curTouchPos = _touch.pageY;

            if (Math.abs(curTouchPos - lastTouchPos) < THRESHOLD) {
                return;
            }

            lastTouchPos = curTouchPos;

            // console.log(allowedPos, curTouchPos - touchStartPos);

            allowed.style['-webkit-transform'] = 'translateY(' + (allowedPos + curTouchPos - touchStartPos) + 'px)';
            allowed.style.transform = 'translateY(' + (allowedPos + curTouchPos - touchStartPos) + 'px)';
        }, false);

        allowed.addEventListener('touchend', function (e) {
            var _touch = e.changedTouches[0];

            curTouchPos = _touch.pageY;

            var totalHeight = allowed.offsetHeight;
            var viewHeight = allowed.parentElement.offsetHeight;

            allowedPos += curTouchPos - touchStartPos;

            if (allowedPos > 0) {
                allowedPos = 0;
            } else if (allowedPos < (viewHeight - totalHeight)) {
                allowedPos = viewHeight - totalHeight;
            }

            allowed.style['-webkit-transform'] = 'translateY(' + allowedPos + 'px)';
            allowed.style.transform = 'translateY(' + allowedPos + 'px)';
        });
    }

    function _f(e) {
        e.preventDefault();
    }

    function preventBody() {
        _body.addEventListener('touchmove', _f, false);
    }

    function enableBody() {
        _body.removeEventListener('touchmove', _f, false);
    }

    function _callback() {
        _win.scrollTo(0, _bodyPos);
    }

    //hack for some Android browsers
    var remedy = {
        enable: function () {
            _bodyPos = _body.scrollTop;

            _win.addEventListener('scroll', _callback);
        },
        disable: function () {
            _win.removeEventListener('scroll', _callback);
        }
    };

    return {
        mainMethod: mainMethod,
        remedy: remedy,
        recommendedMethod: recommendedMethod,
        disableBody: preventBody,
        enableBody: enableBody
    }
});
