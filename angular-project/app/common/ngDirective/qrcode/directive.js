/**
 * @file 生成二维码
 * @author niejianhui
 *
 * usage:
 * @options
 * @options.url 生成二维码的链接
 * @options.width 生成二维码的宽度
 * @options.height 生成二维码的高度
 * <qrcode></qrcode>
 */
define(function (require) {
    'use strict';
    var Qrcode = require('common/Qrcode/qrcode');
    angular.module('Manage.directives')
        .directive('qrcode', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: false,
            scope : {
                options: '='
            },
            link: function ($scope, element) {
                
                function initView() {
                    var options = $scope.options;
                    var supportCavans = document.createElement('canvas').getContext;
                    var ele = $(element);
                    var qrcode = new Qrcode({
                        element: ele,
                        text: options.url,
                        width: options.width || 80,
                        height:  options.height || 80,
                        render: supportCavans ? 'canvas' : 'table'
                    });
                }

                initView();
            }
        };
    }]);
});
