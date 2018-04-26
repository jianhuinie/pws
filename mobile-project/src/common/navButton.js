/**
 * Created by xuzheng on 15/10/9.
 */
define(function (require) {

    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');
    var controlLayout = require('common/controlLayout');
    var navPanel = require('common/navPanel');
    var util = require('common/util');

    var obj = new MVCObject();

    var $container = $('<div></div>');
    var $element = $('<div></div>');
    $element.appendTo($container);
    var $icon = $('<span class="icon-org-info"></span>');
    $icon.appendTo($element);

    $container.css({
        'width': 36,
        'height': 36,
        'margin': 5,
        'opacity': 0.8,
        'display': 'none'
    });

    $element.css({
        'position': 'absolute',
        'left': 0,
        'top': -50,
        'width': '100%',
        'height': '100%',
        'font-size': 22,
        'text-align': 'center',
        'line-height': 36,
        'border-radius': '100%',
        'background-color': 'rgb(255, 145, 0)'
    });
    util.enableGPU($element.get(0));

    $icon.css({
        'position': 'absolute',
        'color': '#ffffff',
        'left': '50%',
        'top': '50%',
        'transform': 'translate(-50%, -50%)'
    });

    function getControlTopHeight() {
        var topHeight = controlLayout.top.get('height') || 0;
        var topFixedHeight = controlLayout.top_fixed.get('height') || 0;
        return topHeight + topFixedHeight;
    }

    var currentShow = false;
    var timer = null;

    function updateDisplay() {
        var display = obj.get('display');
        var isShow = !!display;
        if (display == 'auto') {
            isShow = $(window).scrollTop() - getControlTopHeight() > 50;
        }
        if (isShow) {
            if (!currentShow) {
                currentShow = true;
                timer = setTimeout(function () {
                    timer = null;
                    $container.show();
                    observer.trigger(container, 'resize');
                    $element.animate({
                        'top': 0
                    }, {
                        duration: 200,
                        easing: 'easeOutBack'
                    });
                }, 500);
            }
        } else {
            if (currentShow) {
                clearTimeout(timer);
                currentShow = false;
                $element.animate({
                    'top': -50
                }, 200, function () {
                    $container.hide();
                    observer.trigger(container, 'resize');
                });
            }
        }
    }

    function showNavPanel() {
        navPanel.show();
    }

    observer.addListener(obj, 'display_changed', updateDisplay);
    observer.addListener(controlLayout.top, 'height_changed', updateDisplay);
    observer.addListener(controlLayout.top_fixed, 'height_changed', updateDisplay);

    observer.addDomListener(window, 'scroll', updateDisplay);

    var container = $container.get(0);

    obj.set('element', container);
    obj.set('display', false);

    controlLayout.right_top.addElement(container);

    $(document.body).on('touchstart',function(){
        obj.hide();
    });
    $(document.body).on('touchend',function(){
        obj.auto();
    });

    $element.on('touchstart', showNavPanel);

    obj.show = function () {
        obj.set('display', true);
    };
    obj.hide = function () {
        obj.set('display', false);
    };
    obj.auto = function () {
        obj.set('display', 'auto');
    };

    return obj;
});