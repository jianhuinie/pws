/**
 * @file 左侧滑动锚点导航
 * @author niejianhui
 *
 * usage:
 *
 * <side-nav></side-nav>
 * options.sideMenus 对象数组 [{text: '', boxClass: ''},{}]
 * options.safeDistance  有时候由于某些DOM没加载出来 所以需要减去安全距离  默认不需配置
 * text  子menu对应的文案  boxClass  子menu锚点对应容器的class
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('sideNav', ['$rootScope',  function ($rootScope) {
        return {
            restrict: 'E',
            replace: false,
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/sideNav/tpl.html',
            link: function ($scope, element) {
                var safeDistance = $scope.options.safeDistance || 0;
                var sideNav = element.find('.side-nav');
                var setFixedHeight = sideNav.offset().top;
                // var availHeight = window.screen.availHeight;

                function getOffsetTop(boxClass) {
                    //减去安全距离
                    return $('.' + boxClass).offset().top;
                }

                function initOptions() {
                    $.each($scope.options.sideMenus, function (index, item) {
                        item.active = !index;
                    });
                }

                function initScroll() {
                    var doScroll = function () {
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > setFixedHeight + safeDistance) {
                            sideNav.css({
                                position: 'fixed',
                                top: '0'
                            });
                            $scope.sideNavFixed = true;
                        }
                        else {
                            sideNav.css({
                                position: '',
                                left: '',
                                top: ''
                            });
                            $scope.sideNavFixed = false;
                        }

                        $.each($scope.options.sideMenus, function (index, item) {

                            var sideMenus = $scope.options.sideMenus;
                            var menuLength = sideMenus.length;
                            if ((index === menuLength - 1 && scrollTop >= getOffsetTop(item.boxClass))
                                || 
                                (index < menuLength - 1
                                && scrollTop >= getOffsetTop(item.boxClass)
                                && scrollTop < getOffsetTop(sideMenus[index + 1].boxClass))
                                ) {

                                $rootScope.safeApply(function () {
                                    item.active = true;
                                });
                            }
                            else {
                                $rootScope.safeApply(function () {
                                    item.active = false;
                                });
                            }
                        });
                        
                        //没滚动到第一个 默认选中第一个
                        var activeCount = 0;
                        $.each($scope.options.sideMenus, function (index, item) {
                            if (item.active) {
                                activeCount++;
                            }
                        });
                        if (!activeCount) {
                            $rootScope.safeApply(function () {
                                $scope.options.sideMenus[0].active = true;
                            });
                        }
                    };

                    $(window).bind('scroll.sideNav', doScroll);
                }

                function initView() {
                    initOptions();
                    initScroll();
                }

                initView();

                $scope.scrollToItem = function (boxClass) {
                    var height = $('.' + boxClass).offset().top;
                    $('html,body').animate({scrollTop: height + 'px'}, 200);
                };
            }
        };
    }]);
});
