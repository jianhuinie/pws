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
define(function (require) {
    'use strict';

    var $ = require('zepto');
    var MVCObject = require('../../util/mvc/MVCObject');
    var observer = require('../../util/mvc/observer');
    var DomSize = require('../DomSize/index');
    var IdleControl = require('../../util/mvc/IdleControl');
    var utilBase = require('../../util/base');
    var utilString = require('../../util/string');
    var utilMath = require('../../util/math');
    var isScale = require('../../util/isScale');

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
        display: false,
        position: defaultPosition,
        unit: defaultUnit,
        width: defaultWidth,
        height: defaultHeight,
        offsetX: defaultOffsetX,
        offsetY: defaultOffsetY,
        align: defaultAlign,
        enableAutoCenter: true,
        zIndex: defaultZIndex
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
            autoResize: true,
            duration: 100,
            attrName: 'inner'
        });
        this._evts = [];

        var resizeIdle = new IdleControl(500);
        this._resizeIdle = resizeIdle;

        var lis1 = observer.addListener(resizeIdle, 'idle', function () {
            updateMaxSize(self);
        });
        this._evts.push(lis1);

        resizeIdle.bindTo('input', this._fullSize, 'size');

        document.body.appendChild(this._element);

        this.setValues($.extend({}, defaultOptions, options));
    }

    utilBase.inherits(BasePopupDiv, MVCObject);

    var p = BasePopupDiv.prototype;

    // 静态属性，只读
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
                updateSize(this, key);
                break;
            case 'maxWidth':
            case 'maxHeight':
                updateMaxSize(this);
                break;
            case 'offsetX':
                updateOffset(this, 'x');
                break;
            case 'offsetY':
                updateOffset(this, 'y');
                break;
            case 'position':
                updatePosition(this);
                break;
            case 'unit':
                updateSize(this, 'width');
                updateSize(this, 'height');
                break;
            case 'align':
                updateAlign(this);
                break;
        }
    };
    p.resize = function () {
        updateSize(this);
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
            updateSize(this);
            updateOffset(this);
            updatePosition(this);
        }
    };
    p.enableAutoCenter_changed = function () {
        var enable = this.get('enableAutoCenter');
        if (enable) {
            updateOffset(this);
        }
    };
    p.zIndex_changed = function () {
        if (this._element) {
            var zIndex = this.get('zIndex');
            if (!utilBase.isNumber(zIndex)) {
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

    function updateOffset(instance, name, isAnimate) {
        if (!name) {
            updateOffset(instance, 'x', isAnimate);
            updateOffset(instance, 'y', isAnimate);
            return;
        }
        var display = instance.get('display');
        if (!display) {
            return;
        }
        var dataNumber = instance.get('offset' + utilString.initcap(name));
        if (!utilBase.isNumber(dataNumber)) {
            dataNumber = 0;
        }
        var cssName = utilString.initcap(name === 'x' ? 'left' : 'top');
        var scrollNumber = 0;
        if (instance.get('position') == 'absolute') {
            scrollNumber = name === 'x' ? $(window).scrollLeft() : $(window).scrollTop();
        }
        if (isAnimate) {
            var obj = {};
            obj['margin' + cssName] = parseUnitNumber(instance, dataNumber + scrollNumber);
            $(instance._element).animate(obj, 300, 'easeOutQuart');
        } else {
            instance._element.style['margin' + cssName] = parseUnitNumber(instance, dataNumber + scrollNumber);
        }
    }

    function updatePosition(instance) {
        var display = instance.get('display');
        if (!display) {
            return;
        }
        var position = parsePosition(instance);

        if (position === 'absolute') {
            if (!instance._scrollEvt) {
                var scrollIdle = new IdleControl(300);
                var lis = observer.addListener(scrollIdle, 'idle', function () {
                    if (instance.get('enableAutoCenter')) {
                        updateOffset(instance, null, true);
                    }
                });
                instance._evts.push(lis);
                instance._scrollEvt = observer.addDomListener(window, 'scroll', function () {
                    scrollIdle.set('input', 1);
                });
            }
        } else if (instance._scrollEvt) {
            observer.removeDomListener(instance._scrollEvt);
            instance._scrollEvt = null;
        }

        setStyle(instance, 'position', position);
        updateOffset(instance, 'y');
    }

    var alignNums = ['', '0', '50%', '-50%', '100%', '-100%'];

    function updateAlign(instance) {
        var align = instance.get('align') || defaultAlign;
        var top = 0;
        var left = 0;
        var translateX = 1;
        var translateY = 1;
        switch (align + '') {
            // top + left
            case '1':
                top = 1;
                left = 1;
                break;
            // top
            case '2': 
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

    function updateSize(instance, name) {
        if (!name) {
            updateSize(instance, 'width');
            updateSize(instance, 'height');
            return;
        }
        var rstNum = parseSizeNumber(instance, name);
        var maxSizeNumber = parseMaxSizeNumber(instance, name);
        if (utilBase.isNumber(rstNum)) {
            rstNum = utilMath.clamp(rstNum, 0, maxSizeNumber);
        } else {
            if (name === 'width') {
                // var scale = window.dpr || 1;
                var scale = isInScale ? window.devicePixelRatio : 1;
                var autoWidth = instance._fullSize.get('size')[name] - (defaultMarginX * 2 * scale);
                rstNum = Math.min(maxSizeNumber, autoWidth);
            } else {
                rstNum = 'auto';
            }
        }
        var rst = rstNum;
        if (utilBase.isNumber(rst)) {
            rst = parseUnitNumber(instance, rst);
        }
        setStyle(instance, name, rst, rstNum);
    }

    function updateMaxSize(instance) {
        updateSize(instance);
    }

    function parsePosition(instance) {
        return instance.get('position') || defaultPosition;
    }

    function parseUnit(instance) {
        return instance.get('unit') || defaultUnit;
    }

    function parseSizeNumber(instance, name) {
        return instance.get(name) || (name === 'width' ? defaultWidth : defaultHeight);
    }

    function parseMaxSizeNumber(instance, name) {
        var maxName = 'max' + utilString.initcap(name);
        var dataMaxNumber = instance.get(maxName);
        var bodyMaxNumber = instance._fullSize.get('size')[name];
        if (utilBase.isNumber(dataMaxNumber)) {
            // var scale = window.dpr || 1;
            var scale = isInScale ? window.devicePixelRatio : 1;
            return utilMath.clamp(dataMaxNumber * scale, 0, bodyMaxNumber);
        }
        return bodyMaxNumber;
    }

    /**
     * 像素转rem
     *
     * @param {number} numPx 像素数
     * @param {boolean} [isBasePixel] 是否是UE图上取出的像素值
     * */
    function px2rem(numPx, isBasePixel) {
        return utilBase.px2rem(numPx, isBasePixel);
    }

    function parseUnitNumber(instance, num) {
        if (parseUnit(instance) === 'rem') {
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
        if (utilBase.isNumber(numValue)) {
            cache[name + '_num'] = numValue;
        }
        instance._element.style[name] = value;
    }

    return BasePopupDiv;
});