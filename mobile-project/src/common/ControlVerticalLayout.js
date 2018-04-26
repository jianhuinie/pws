/**
 * Created by xuzheng on 15/9/22.
 */
define(function (require) {

    'use strict';

    var observer = require('common/mvc/observer');

    var util_function = require('util/function');
    var util_base = require('util/base');
    var util_number = require('util/number');

    /*
     * layoutMode: 二进制，8位
     *  0： 左对齐 left=0
     *  2： 垂直居中 left=(maxWidth-elementWidth)/2
     *  4： 右对齐 left=maxWidth-elementWidth
     *  8: 横向排列 left=beforeElementWidth
     *
     *  16: 上对齐 top=0
     *  32： 水平居中 top=(maxHeight-elementHeight)/2
     *  64: 下对齐 top=maxHeight-elementHeight
     *  128: 纵向排列 top=beforeElementHeight
     * */

    function ControlVerticalLayout(element, layoutMode, intervalDistance) {
        this.container = element;

        this.elements = [];

        //layoutMode
        this.mode = layoutMode;

        //控件之间的间隔距离，单位px
        this.distance = intervalDistance || 0;

        element.setAttribute("controlWidth", 0);
        element.setAttribute("controlHeight", 0);

    }

    ControlVerticalLayout.prototype.addElement = function (element, index) {
        var elements = this.elements;
        var n = elements.length;
        index = util_base.isNumber(index) ? index : n;
        var e = 0;
        while (e < n && index >= elements[e].index) {
            e++;
        }
        var listener = observer.addListener(element, "resize", util_function.bind(this.draw, this));
        elements.splice(e, 0, {
            "element": element,
            "index": index,
            "listener": listener
        });
        //absolute
        if (element.style.position !== "absolute") {
            element.style.position = "absolute";
        }
        this.container.appendChild(element);
        this.draw();
    };

    ControlVerticalLayout.prototype.removeElement = function (element, noRedraw) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
        var elements = this.elements;
        var count = 0;
        for (var i = 0, n = elements.length; i < n; i++) {
            if (element == elements[i].element) {
                observer.removeListener(elements[i].listener);
                delete elements[i].listener;
                delete elements[i].element;
                elements.splice(i--, 1);
                count++;
                break;
            }
        }
        if (count) {
            element.style.top = "auto";
            element.style.bottom = "auto";
            element.style.left = "auto";
            element.style.right = "auto";
        }
        if (!noRedraw) {
            this.draw();
        }
    };

    ControlVerticalLayout.prototype.clear = function () {
        var elements = this.elements;
        while (elements.length) {
            this.removeElement(elements[0].element, true);
        }
        this.draw();
    };

    ControlVerticalLayout.prototype.draw = function () {
        var container = this.container;
        container.style.display = "";
        var elements = this.elements;
        var maxWidth = 0;
        var maxHeight = 0;
        var elementsNum = elements.length;
        var i;
        for (i = 0; i < elementsNum; i++) {
            elements[i].width = getControlWidth(elements[i].element);
            elements[i].height = getControlHeight(elements[i].element);
            maxWidth = Math.max(elements[i].width, maxWidth);
            maxHeight = Math.max(elements[i].height, maxHeight);
        }

        var comWidth = 0;
        var comHeight = 0;
        var intervalDistance = this.distance;
        var mode = this.mode;
        var left;
        var top;

        for (i = 0; i < elementsNum; i++) {
            if (isDisplay(elements[i].element)) {
                if (i != 0) {
                    comHeight += intervalDistance;
                    comWidth += intervalDistance;
                }
                left = parseInt(mode & 8 ? comWidth : mode & 4 ? maxWidth - elements[i].width : mode & 2 ? (maxWidth - elements[i].width) / 2 : 0);
                top = parseInt(mode & 128 ? comHeight : mode & 64 ? maxHeight - elements[i].height : mode & 32 ? (maxHeight - elements[i].height) / 2 : 0);
                comHeight += elements[i].height;
                comWidth += elements[i].width;
                setLeftTop(elements[i].element, left, top);
            }
        }
        var controlWidth = mode & 8 ? comWidth : maxWidth;
        var controlHeight = mode & 128 ? comHeight : maxHeight;
        container.setAttribute("controlWidth", controlWidth);
        container.setAttribute("controlHeight", controlHeight);
        //container.style.display = (controlWidth || controlHeight) ? "" : "none";
        observer.trigger(container, "resize");
    };

    function getControlWidth(element, noUseControlWidth) {
        if (!isDisplay(element)) {
            return 0;
        }
        var $element = $(element);
        var width = !noUseControlWidth && parseFloat(element.getAttribute("controlWidth"));
        if (!util_base.isNumber(width) || isNaN(width)) {
            width = $element.width()
        } else {
            width = util_number.round(width, 2);
        }
        var marginLeft = util_number.round(parseFloat($element.css("marginLeft")), 2) || 0;
        var marginRight = util_number.round(parseFloat($element.css("marginRight")), 2) || 0;
        return width + marginLeft + marginRight;
    }

    function getControlHeight(element, noUseControlWidth) {
        if (!isDisplay(element)) {
            return 0;
        }
        var $element = $(element);
        var height = !noUseControlWidth && parseFloat(element.getAttribute("controlHeight"));
        if (!util_base.isNumber(height) || isNaN(height)) {
            height = $element.height();
        } else {
            height = util_number.round(height, 2);
        }
        var marginTop = util_number.round(parseFloat($element.css("marginTop")), 2) || 0;
        var marginBottom = util_number.round(parseFloat($element.css("marginBottom")), 2) || 0;
        return height + marginTop + marginBottom;
    }

    function isDisplay(element) {
        return $(element).css('display') != 'none';
    }

    function setLeftTop(element, left, top) {
        $(element).css({
            'left': left,
            'top': top
        });
    }

    return ControlVerticalLayout;
});