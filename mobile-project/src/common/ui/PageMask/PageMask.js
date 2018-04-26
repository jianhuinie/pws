/**
 * Created by xuzheng on 15/8/22.
 */
define(function (require) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');

    var util_base = require('util/base');
    var util_function = require('util/function');

    var $ = require('zepto');

    var animateDuration = 500;


    /**
     * 页面遮罩层
     *
     * attr：
     *      backgroundColor {string} 默认'rgba(0,0,0,0.3)'
     *      zIndex {number}
     *      enableAnimate {boolean} 默认false
     *
     *
     * @extends {MVCObject}
     * */
    function PageMask(options) {

        this._element = $('<div></div>').css({
            opacity: 0
        });

        var self = this;
        this._element.on('click', function () {
            observer.trigger(self, 'click');
        });

        initMaskStyle(this._element);

        this.setValues(options);
    }

    util_base.inherits(PageMask, MVCObject);

    var p = PageMask.prototype;

    p.show = function () {
        this.set('display', true);
    };
    p.hide = function () {
        this.set('display', false);
    };
    p.enableAnimate_changed = function () {
        var enable = this.get('enableAnimate');
        this._element.css('transition', !enable ? '' : 'opacity ' + animateDuration + 'ms');
    };

    p.display_changed = function () {
        var self = this;
        var display = !!self.get('display');
        var $element = self._element;
        clearTimeout(this._hideTimer);
        clearTimeout(this._showTimer);
        if (display) {
            $element.appendTo(document.body);
            this._showTimer = setTimeout(function () {
                $element.css('opacity', 1);
            }, 0)

        } else {
            $element.css('opacity', 0);
            this._hideTimer = setTimeout(function () {
                $element.remove();
            }, 350);

            if (self._listener) {
                observer.removeListener(self._listener);
                self._listener = null;
            }
        }
    };
    p.zIndex_changed = function () {
        var zIndex = this.get('zIndex') || 0;
        if (this._element) {
            this._element.css({
                'z-index': zIndex
            });
        }
    };
    p.backgroundColor_changed = function () {
        var backgroundColor = this.get('backgroundColor') || 'rgba(0,0,0,0.3)';
        this._element.css('background-color', backgroundColor);
    };

    p.destroy = function () {
        if (this._listener) {
            observer.removeListener(this._listener);
            this._listener = null;
        }
        this._element.off('click');
        this._element.remove();
        this.unbindAll();
        this._element = null;
    };

    PageMask.getInstance = function (options) {
        var instance = util_function.singleton(PageMask);
        instance.setOptions(options);
        return instance;
    };

    function initMaskStyle(element) {
        $(element).css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'bottom': 0,
            'right': 0,
            'z-index': 700,
            'background-color': 'rgba(0,0,0,0.3)'
        });
    }

    return PageMask
});