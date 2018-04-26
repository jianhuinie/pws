/**
 * @file 精简版弹出层
 * @author niejianhui
 *
 * usage:
 *
 * <popup></popup>
 * options.layerClass 弹出层的class
 * options.triggerClass 触发元素class
 */
define(function (require) {
    'use strict';
    // var Popup = require('cc/helper/Popup');
    angular.module('Manage.directives')
        .directive('popup', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: false,
            scope : {
                options: '='
            },
            link: function ($scope, element) {
                var options = $scope.options;
                var popupLayer = element.find(options.layerClass);
                var popupTrigger = $(options.triggerClass);
                //加个统一类方便处理样式
                popupTrigger.addClass('popup-trigger');
                popupLayer.addClass('popup-layer');
                
                popupTrigger.on('mouseenter', function () {
                    popupLayer.slideDown(200);
                });
                popupTrigger.on('mouseleave', function () {
                    popupLayer.slideUp(200);
                });
            }
        };
    }]);
});
