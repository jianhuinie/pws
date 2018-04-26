/**
 * Created by xuzheng on 15/9/6.
 */
define(function (require, exports) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var BasePopupDiv = require('common/ui/BasePopupDiv');
    var PageMask = require('common/ui/PageMask/PageMask');
    var publish = require('common/mvc/publish');

    var util_dom = require('util/dom');
    var util_base = require('util/base');

    var css = require('text!./TextTip.styl');

    util_dom.insertCssText(css);

    var html = '<div class="GSX_TextTip"></div>';

    var defaultZIndex = 1100;

    var defaultOptions = {
        'enableMask': false,
        'zIndex': defaultZIndex
    };


    /**
     * 弹出文本提示
     *
     * attr:
     *      text {string} 文本内容
     *
     * inner_attr:
     *      enableMask {boolean} 是否开启遮罩层, 默认为false
     *      zIndex {number} 默认1100
     *
     * events:
     *
     * */
    function TextTip(options) {
        this._element = $(html);

        this.setValues($.extend({}, defaultOptions, options));
    }

    util_base.inherits(TextTip, MVCObject);

    TextTip.prototype.show = function () {
        if (this._element && !this.get('display')) {
            this._element.css({
                'margin-top': 20,
                'opacity': 0
            });
            this.set('display', true);
            var styles = {
                'margin-top': 0,
                'opacity': 1
            };
            var options = {
                duration: 200,
                easing: 'easeOutQuart',
                queue: true
            };
            this._element.animate(styles, options);
        }
    };

    TextTip.prototype.hide = function (noAnim) {
        var self = this;
        if (this._element && this.get('display')) {
            if (!noAnim) {
                var styles = {
                    'margin-top': -20,
                    'opacity': 0
                };
                var options = {
                    speed: 300,
                    easing: 'easeOutQuart',
                    queue: true,
                    complete: function () {
                        self.set('display', false);
                    }
                };
                this._element.animate(styles, options);
            } else {
                self.set('display', false);
            }
        }
    };

    /**
     * @private
     * */
    TextTip.prototype.enableMask_changed = function () {
        var enable = this.get('enableMask') !== false;
        if (enable) {
            if (!this._mask) {
                this._mask = new PageMask();
                this._mask.bindTo('display', this);
            }
        } else {
            if (this._mask) {
                this._mask.unbindAll();
                this._mask.destroy();
                this._mask = null;
            }
        }
    };

    /**
     * @private
     * */
    TextTip.prototype.text_changed = function () {
        var text = this.get('text') || '';
        this._element.html(text);
    };

    /**
     * @private
     * */
    TextTip.prototype.display_changed = function () {
        var display = this.get('display');
        if (this._element) {
            if (display) {
                this._element.show();
                this._element.appendTo(document.body);
            } else {
                this._element.hide();
                this._element.remove();
            }
        }
    };

    TextTip.prototype.zIndex_changed = function () {
        if (this._element) {
            var zIndex = this.get('zIndex');
            if (!util_base.isNumber(zIndex)) {
                zIndex = defaultZIndex;
            }
            this._element.css('zIndex', zIndex);
        }
    };

    TextTip.prototype.destroy = function () {
        this._element.remove();
        this._element = null;
        this.unbindAll();
        observer.clearInstanceListeners(this);
    };

    var util_lang = util_base;
    publish(TextTip, {
        'text': util_lang.union(
            util_lang.isString,
            util_lang.isNull
        ),
        'display': util_lang.isBoolean
    });


    return TextTip;
});