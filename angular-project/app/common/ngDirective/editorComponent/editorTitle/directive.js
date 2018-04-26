/**
 * @file 富文本标题
 * @author niejianhui
 *
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorTitle', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.placeholder
             * options.maxlength
             * options.text
             */
            scope: {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorTitle/tpl.html',
            link: function ($scope, element) {
                $scope.placeholder = $scope.options.placeholder || '编辑段落标题，最多10个字';
                $scope.maxlength = $scope.options.maxlength || 10;
                var placeholder =  element.find('.placeholder');
                $scope.setInputFocus = function () {
                    element.find('input').focus();
                };

                //监听键盘输入  显示／隐藏placeholder
                element.find('input').on('input propertychange', function (e) {
                    if ($(e.target).val().length) {
                        placeholder.addClass('set-hide');
                    }
                    else {
                        placeholder.removeClass('set-hide');
                    }
                });
            }
        };
    }]);
});
