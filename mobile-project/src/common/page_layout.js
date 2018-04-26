/**
 * Created by xuzheng on 15/9/22.
 */
define(function (require, exports) {

    'use strict';

    require("zepto");

    var ControlVerticalLayout = require('common/ControlVerticalLayout');
    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');

    var util_number = require('util/number');
    var util_base = require('util/base');
    var util_math = require('util/math');

    function initInterfaceObject(mvcObject, container, controlLayout) {

        observer.forward(container, 'resize', mvcObject);

        observer.addListener(container, 'resize', function () {
            var width = parseInt(container.getAttribute('controlWidth') || 0, 10);
            var height = parseInt(container.getAttribute('controlHeight') || 0, 10);
            var currentWidth = mvcObject.get('width');
            var currentHeight = mvcObject.get('height');
            if (!util_number.equals(width, currentWidth)) {
                mvcObject.set('width', width);
            }
            if (!util_number.equals(height, currentHeight)) {
                mvcObject.set('height', height);
            }
        });

        mvcObject.addElement = function (element, index) {
            if (util_base.isZepto(element)) {
                element = element.get(0);
            }
            index = util_math.clamp(index || 0, 0, 1000);
            if (element) {
                return controlLayout.addElement(element, index);
            }
        };
        mvcObject.removeElement = function (element) {
            if (util_base.isZepto(element)) {
                element = element.get(0);
            }
            return controlLayout.removeElement(element);
        };
        mvcObject.clear = function () {
            return controlLayout.clear();
        };
        mvcObject.set('container', container);
        mvcObject.set('width', 0);
        mvcObject.set('height', 0);
    }


    function init_bottom(obj) {
        var $container = $('<div></div>');
        $container.css({
            'position': 'fixed',
            'left': 0,
            'bottom': 0,
            'width': '100%',
            'height': 0,
            'zIndex': 150
        });
        var container = $container.get(0);

        $container.appendTo(document.body);

        var bottomLayout = new ControlVerticalLayout(container, 130);

        initInterfaceObject(obj, container, bottomLayout);

        observer.addListener(obj, 'height_changed', function () {
            var containerHeight = obj.get('height') || 0;
            container.style.bottom = containerHeight + 'px';
        });

        return obj;
    }

    function init_top_fixed(obj) {
        var $container = $topFixedContainer;
        $container.css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'width': '100%',
            'height': 0,
            'zIndex': 150
        });

        var container = $container.get(0);

        $container.insertBefore($(document.body).children().eq(0));

        var topFixedLayout = new ControlVerticalLayout(container, 130);

        initInterfaceObject(obj, container, topFixedLayout);

        return obj;
    }

    function init_top(obj) {
        var $container = $topContainer;
        $container.css({
            'position': 'relative',
            'left': 0,
            'top': 0,
            'width': '100%',
            'height': 0,
            'zIndex': 149
        });

        var container = $container.get(0);

        $container.insertBefore($(document.body).children().eq(0));

        var topLayout = new ControlVerticalLayout(container, 130);

        initInterfaceObject(obj, container, topLayout);

        var updateTop = function () {
            var topFixedControlHeight = topFixedObj.get('height');
            $container.css('margin-top', topFixedControlHeight);
        };

        observer.addListener(topFixedObj, 'height_changed', updateTop);
        updateTop();

        var updateHeight = function () {
            var height = this.get('height');
            $container.css('height', height);
        };

        observer.addListener(obj, 'height_changed', updateHeight);

        return obj;
    }

    function init_right_top(obj) {
        var $container = $('<div name="right_top"></div>');
        $container.css({
            'position': 'fixed',
            'right': 0,
            'top': 0,
            'width': 0,
            'height': 0,
            'zIndex': 150
        });

        var container = $container.get(0);

        $container.insertBefore($(document.body).children().eq(0));

        var rightTopLayout = new ControlVerticalLayout(container, 132, 5);

        initInterfaceObject(obj, container, rightTopLayout);

        function updateTop() {
            var topFixedHeight = topFixedObj.get('height');
            $container.css('top', topFixedHeight);
        }

        observer.addListener(topFixedObj, 'height_changed', updateTop);
        observer.addListener(topObj, 'height_changed', updateTop);
        updateTop();

        function updateRight() {
            var width = obj.get('width');
            $container.css('right', width);
        }

        observer.addListener(obj, 'width_changed', updateRight);
        updateRight();

        return obj;
    }

    function init_right_bottom(obj) {
        var $container = $('<div name="right_bottom"></div>');
        $container.css({
            'position': 'fixed',
            'right': 0,
            'bottom': 0,
            'width': 0,
            'height': 0,
            'zIndex': 150
        });

        var container = $container.get(0);

        $container.insertBefore($(document.body).children().eq(0));

        var rightBottomLayout = new ControlVerticalLayout(container, 130, 5);

        initInterfaceObject(obj, container, rightBottomLayout);

        function updateBottom() {
            var bottomHeight = bottomObj.get('height');
            var controlHeight = obj.get('height');
            $container.css('bottom', bottomHeight + controlHeight);
        }

        observer.addListener(bottomObj, 'height_changed', updateBottom);
        observer.addListener(obj, 'height_changed', updateBottom);
        updateBottom();

        function updateRight() {
            var width = obj.get('width');
            $container.css('right', width);
        }

        observer.addListener(obj, 'width_changed', updateRight);
        updateRight();

        return obj;
    }

    var $topContainer = $('<div name="control_top"></div>');
    var $topFixedContainer = $('<div name="control_top_fixed"></div>');

    $topContainer.insertBefore($(document.body).children().eq(0));
    $topFixedContainer.insertBefore($(document.body).children().eq(0));


    var bottomObj = new MVCObject();
    var topObj = new MVCObject();
    var topFixedObj = new MVCObject();
    var rightTopObj = new MVCObject();
    var rightBottomObj = new MVCObject();

    var $pageMainElement = $('#page_main');
    if ($pageMainElement.length > 0) {
        observer.addListener(topFixedObj, 'height_changed', function () {
            var height = topFixedObj.get('height');
            $(topObj.get('container')).css('margin-top', height);
        });
        observer.addListener(bottomObj, 'height_changed', function () {
            var height = bottomObj.get('height');
            $pageMainElement.css('margin-bottom', height);
        });
    }

    /**
     * element {DIVElement|JQueryElement}
     * */
    exports.bottom_fixed = init_bottom(bottomObj);
    exports.top = init_top(topObj);
    exports.top_fixed = init_top_fixed(topFixedObj);
    exports.right_top = init_right_top(rightTopObj);
    exports.right_bottom = init_right_bottom(rightBottomObj);
});

/**
 * 登记指定组件的index, 取值范围[0,1000)
 * top_fixed:
 *      0 搜狗生活navBar
 *
 * bottom_fixed:
 *      1000 百度直达号底部导航条
 *
 * */