/**
 * @file 富文本正文
 * @author niejianhui
 *
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorBody', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * ptions.placeholder
             * options.text
             * options.fontWeight 'normal' 'bold'
             * options.fontSize  '15px' '17px
             * options.textAlign 'left' 'center'
             * options.color 详见编辑器中的7种颜色 '#000000' 6位RGB色
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorBody/tpl.html',
            link: function ($scope, element) {
                $scope.placeholder = $scope.options.placeholder || '编辑正文';
                var placeholder = element.find('.placeholder');
                //首次进入有文本就下拉
                $scope.originalText = $scope.options.text;
                var $textarea = element.find('textarea');
                var colorClassMap = {
                    '#000000': 'black',
                    '#999999': 'grey',
                    '#FC5C5A': 'pink',
                    '#FF9100': 'yellow',
                    '#0F86E8': 'blue',
                    '#43B244': 'green',
                    '#3D618A': 'brown',
                    '#9900CC': 'purple',
                };
                $scope.colorClassMap = colorClassMap;
                //获得焦点
                $scope.setInputFocus = function () {
                    element.find('textarea').addClass('show').focus();
                };

                //获得焦点时展开
                element.find('textarea')
                    .on('focus', function () {
                        element.find('.style-toolbar').addClass('show');
                    })
                    .on('input propertychange', function (e) {
                        if ($(e.target).val().length) {
                            placeholder.addClass('set-hide');
                        }
                        else {
                            placeholder.removeClass('set-hide');
                        }
                    });

                //变换字体粗细
                $scope.toggleFontWeight = function () {
                    if ($scope.options.fontWeight === 'normal') {
                        $scope.options.fontWeight = 'bold';
                        $textarea.addClass('font-bold');
                    }
                    else {
                        $scope.options.fontWeight = 'normal';
                        $textarea.removeClass('font-bold');
                    }
                };
                //变换字体大小
                $scope.toggleFontSize = function () {
                    if ($scope.options.fontSize === '15px') {
                        $scope.options.fontSize = '17px';
                        $textarea.addClass('font-big');
                    }
                    else {
                        $scope.options.fontSize = '15px';
                        $textarea.removeClass('font-big');
                    }
                };
                //切换左对齐 居中对齐
                $scope.toggleTextAlign = function (type) {
                    if ($scope.options.textAlign !== type) {
                        $scope.options.textAlign = type;
                        if (type === 'center') {
                            $textarea.addClass('align-center');
                        }
                        else {
                            $textarea.removeClass('align-center');
                        }
                    }
                    
                };
                //切换颜色
                $scope.toggleColor = function (color) {
                    if ($scope.options.color !== color) {
                        $textarea.removeClass(colorClassMap[$scope.options.color]);
                        $scope.options.color = color;
                        $textarea.addClass(colorClassMap[color]);
                    }
                };
            }
        };
    }]);
});
