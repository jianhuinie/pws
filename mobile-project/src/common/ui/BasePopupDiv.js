/**
 * Created by xuzheng on 15/6/25.
 */
define(function (require) {

    'use strict';
    var $ = require("zepto");
    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');

    var DomSize = require('common/mvc-tools/DomSize');
    var IdleControl = require('common/mvc-tools/IdleControl');

    var util_base = require('util/base');
    var util_string = require('util/string');
    var util_math = require('util/math');
    var isScale = require('util/isScale');
    var isInScale = isScale.init();
    var defaultPosition = 'absolute';
    var defaultUnit = 'px';
    var defaultWidth = 'auto';
    var defaultHeight = 'auto';
    var defaultMarginX = 40;
    var defaultOffsetX = 0;
    var defaultOffsetY = 0;
    var defaultAlign = 5;
    var defaultZIndex = 300;

    var defaultOptions = {
        'display': false,
        'position': defaultPosition,
        'unit': defaultUnit,
        'width': defaultWidth,
        'height': defaultHeight,
        'offsetX': defaultOffsetX,
        'offsetY': defaultOffsetY,
        'align': defaultAlign,
        'enableAutoCenter': true,
        'zIndex': defaultZIndex
    };


    /**
     * 弹出层DIV基础类
     *
     * @extends {MVCObject}
     *
     * attributes:
     *      width {number} 宽度，单位px,设置"auto"时根据屏幕宽度自适应，默认为"auto"
     *      height {number} 高度，单位px，设置"auto"时根据屏幕高度自适应, 默认为"auto"
     *      maxWidth {number} 最大宽度，单位px，默认为屏幕宽度的减去2x20的边距
     *      maxHeight {number} 最大高度，同上
     *      offsetX 水平偏移, 单位px
     *      offsetY 垂直偏移, 单位px
     *      position {string} "absolute"或"fixed"，默认fixed
     *      align {string} 对齐方式，默认是5
     *          1 | 2 | 3
     *         -----------
     *          4 | 5 | 6
     *         -----------
     *          7 | 8 | 9
     *      content {string|HTMLElement} 内容
     *      display {boolean} 是否显示 默认false
     *      enableAutoCenter {boolean} absolute定位时是否自动居中，默认true
     *      zIndex {number} 默认300
     * */
    function BasePopupDiv(options) {
        var self = this;
        this._element = document.createElement('div');
        this._cache = {};
        this._fullSize = new DomSize(window, {
            'autoResize': true,
            'duration': 100,
            'attrName': 'inner'
        });
        this._evts = [];

        var resizeIdle = this._resizeIdle = new IdleControl(500);

        var lis1 = observer.addListener(resizeIdle, 'idle', function () {
            update_maxSize(self);
        });
        this._evts.push(lis1);

        resizeIdle.bindTo('input', this._fullSize, 'size');

        document.body.appendChild(this._element);

        this.setValues($.extend({}, defaultOptions, options));
    }

    util_base.inherits(BasePopupDiv, MVCObject);

    var p = BasePopupDiv.prototype;

    //静态属性，只读
    BasePopupDiv.DEAFULT_OPTIONS = $.extend({}, defaultOptions);

    p.getElement = function () {
        return this._element;
    };
    p.changed = function (key) {
        if (!this._element) {
            return;
        }
        switch (key) {
            case 'width':
            case 'height':
                update_size(this, key);
                break;
            case 'maxWidth':
            case 'maxHeight':
                update_maxSize(this);
                break;
            case 'offsetX':
                update_offset(this, 'x');
                break;
            case 'offsetY':
                update_offset(this, 'y');
                break;
            case 'position':
                update_position(this);
                break;
            case 'unit':
                update_size(this, 'width');
                update_size(this, 'height');
                break;
            case 'align':
                update_align(this);
                break;
        }
    };
    p.resize = function () {
        update_size(this);
    };
    p.content_changed = function () {
        if (!this._element) {
            return;
        }
        var content = this.get('content');
        $(this._element).html(content);
    };
    p.display_changed = function () {
        if (!this._element) {
            return;
        }
        var display = !!this.get('display');
        this._element.style.display = display ? '' : 'none';
        if (display) {
            update_size(this);
            update_offset(this);
            update_position(this);
        }
    };
    p.enableAutoCenter_changed = function () {
        var enable = this.get('enableAutoCenter');
        if (enable) {
            update_offset(this);
        }
    };
    p.zIndex_changed = function () {
        if (this._element) {
            var zIndex = this.get('zIndex');
            if (!util_base.isNumber(zIndex)) {
                zIndex = defaultZIndex;
            }
            this._element.style.zIndex = zIndex;
        }
    };

    p.destroy = function () {
        var element = this._element;
        if (element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            this._element = null;
        }
        if (this._resizeIdle) {
            this._resizeIdle.unbind('input', true);
            this._resizeIdle = null;
        }
        if (this._evts) {
            for (var i = 0, n = this._evts.length; i < n; i++) {
                observer.removeListener(this._evts[i]);
            }
            this._evts.length = 0;
        }
        if (this._scrollEvt) {
            observer.removeDomListener(this._scrollEvt);
            this._scrollEvt = null;
        }
        this.unbindAll();
        observer.clearInstanceListeners(this);
    };

    function update_offset(instance, name, isAnimate) {
        if (!name) {
            update_offset(instance, 'x', isAnimate);
            update_offset(instance, 'y', isAnimate);
            return;
        }
        var display = instance.get('display');
        if (!display) {
            return;
        }
        var dataNumber = instance.get('offset' + util_string.initcap(name));
        if (!util_base.isNumber(dataNumber)) {
            dataNumber = 0;
        }
        var cssName = util_string.initcap(name == 'x' ? 'left' : 'top');
        var scrollNumber = 0;
        if (instance.get('position') == 'absolute') {
            scrollNumber = name == 'x' ? $(window).scrollLeft() : $(window).scrollTop();
        }
        if (isAnimate) {
            var obj = {};
            obj['margin' + cssName] = parse_unitNumber(instance, dataNumber + scrollNumber);
            $(instance._element).animate(obj, 300, 'easeOutQuart');
        } else {
            instance._element.style['margin' + cssName] = parse_unitNumber(instance, dataNumber + scrollNumber);
        }
    }

    function update_position(instance) {
        var display = instance.get('display');
        if (!display) {
            return;
        }
        var position = parse_position(instance);

        if (position == 'absolute') {
            if (!instance._scrollEvt) {
                var scrollIdle = new IdleControl(300);
                var lis = observer.addListener(scrollIdle, 'idle', function () {
                    if (instance.get('enableAutoCenter')) {
                        update_offset(instance, null, true);
                    }
                });
                instance._evts.push(lis);
                instance._scrollEvt = observer.addDomListener(window, 'scroll', function () {
                    scrollIdle.set('input', 1);
                });
            }
        } else {
            if (instance._scrollEvt) {
                observer.removeDomListener(instance._scrollEvt);
                instance._scrollEvt = null;
            }
        }

        setStyle(instance, 'position', position);
        update_offset(instance, 'y');
    }

    var alignNums = ['', '0', '50%', '-50%', '100%', '-100%'];

    function update_align(instance) {
        var align = instance.get('align') || defaultAlign;
        var top = 0;
        var left = 0;
        var translateX = 1;
        var translateY = 1;
        switch (align + '') {
            case '1': //top+left
                top = 1;
                left = 1;
                break;
            case '2': //top
                top = 1;
                left = 2;
                translateX = 3;
                break;
            case '3':
                top = 1;
                left = 4;
                translateX = 5;
                break;
            case '4':
                top = 2;
                translateY = 3;
                left = 1;
                break;
            case '5':
                top = 2;
                translateY = 3;
                left = 2;
                translateX = 3;
                break;
            case '6':
                top = 2;
                translateY = 3;
                left = 4;
                translateX = 5;
                break;
            case '7':
                top = 4;
                translateY = 5;
                left = 1;
                break;
            case '8':
                top = 4;
                translateY = 5;
                left = 2;
                translateX = 3;
                break;
            case '9':
                top = 4;
                translateY = 5;
                left = 4;
                translateX = 5;
                break;
            default:
                throw Error('BasePopupDiv align parse error:' + align);
        }
        var style = instance._element.style;
        style.left = alignNums[left];
        style.top = alignNums[top];
        style.webkitTransform = 'translate(' + alignNums[translateX] + ',' + alignNums[translateY] + ')';
    }

    function update_size(instance, name) {
        if (!name) {
            update_size(instance, 'width');
            update_size(instance, 'height');
            return;
        }
        var rstNum = parse_sizeNumber(instance, name);
        var maxSizeNumber = parse_maxSizeNumber(instance, name);
        if (util_base.isNumber(rstNum)) {
            rstNum = util_math.clamp(rstNum, 0, maxSizeNumber);
        } else {
            if (name == 'width') {
                // var scale = window.dpr || 1;
                var scale = isInScale ? window.devicePixelRatio : 1;
                var autoWidth = instance._fullSize.get('size')[name] - (defaultMarginX * 2 * scale);
                rstNum = Math.min(maxSizeNumber, autoWidth);
            } else {
                rstNum = 'auto';
            }
        }
        var rst = rstNum;
        if (util_base.isNumber(rst)) {
            rst = parse_unitNumber(instance, rst);
        }
        setStyle(instance, name, rst, rstNum);
    }

    function update_maxSize(instance) {
        update_size(instance);
    }

    function parse_position(instance) {
        return instance.get('position') || defaultPosition;
    }

    function parse_unit(instance) {
        return instance.get('unit') || defaultUnit;
    }

    function parse_sizeNumber(instance, name) {
        return instance.get(name) || (name == 'width' ? defaultWidth : defaultHeight);
    }

    function parse_maxSizeNumber(instance, name) {
        var maxName = 'max' + util_string.initcap(name);
        var dataMaxNumber = instance.get(maxName);
        var bodyMaxNumber = instance._fullSize.get('size')[name];
        if (util_base.isNumber(dataMaxNumber)) {
            // var scale = window.dpr || 1;
            var scale = isInScale ? window.devicePixelRatio : 1;
            return util_math.clamp(dataMaxNumber * scale, 0, bodyMaxNumber);
        } else {
            return bodyMaxNumber;
        }
    }

    /**
     * 像素转rem
     *
     * @param {number} numPx 像素数
     * @param {boolean} [isBasePixel] 是否是UE图上取出的像素值
     * */
    function px2rem(numPx, isBasePixel) {
        if (window.rem) {
            //var width = document.documentElement.getBoundingClientRect().width;
            //return numPx / width * 20 + 'rem';
            var rst = numPx / window.rem;
            if (isBasePixel) {
                rst *= window.rem / 16;
            }
            return rst + 'rem';
        } else {
            return numPx / 16 + 'rem';
        }
    }

    function parse_unitNumber(instance, num) {
        if (parse_unit(instance) == 'rem') {
            num = px2rem(num);
        } else {
            num += 'px';
        }
        return num;
    }

    function setStyle(instance, name, value, numValue) {
        var cache = instance._cache;
        if (cache.hasOwnProperty(name) && cache[name] == value) {
            return;
        }
        cache[name] = value;
        if (util_base.isNumber(numValue)) {
            cache[name + '_num'] = numValue;
        }
        instance._element.style[name] = value;
    }

    return BasePopupDiv;
});