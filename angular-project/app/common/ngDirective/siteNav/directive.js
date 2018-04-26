/**
 * @file 网站头部导航
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <site-nav></site-nav>
 */

define(function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('siteNav', ['$rootScope', 'userInfo', 'utilService',
         function ($rootScope, userInfo, utilService) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/siteNav/tpl.html',
                link: function($scope) {
                    //获取用户信息
                    // userInfo()
                    //     .then(function (response) {
                    //         $scope.user = response.data;
                    //     });
                    $scope.user = $rootScope.user;
                    var env = utilService.getEnvName();
                    $scope.logoutUrl = 'https://' + env + '.genshuixue.com/auth/logout?next=/static/login';

                    //平台电话弹窗
                    $scope.showTelephone = function () {
                        utilService.showMessage({
                            skinClass: 'show-telephone-dialog',
                            title: '跟谁学官方客服电话',
                            okBtnText: '好，我知道了',
                            content: ''
                                    + '<div class="phone">'
                                    +       '<i class="icon icon-phone-o"></i>'
                                    +       '<span>4000-910-910</span>'
                                    + '</div>'
                                    + '<div class="text">'
                                    + '无论您是老师、学生还是家长，只要您有问题都可以致电跟谁学，'
                                    + '我们的客服人员将尽快为您解答疑惑~感谢您对跟谁学的支持！'
                                    + '</div>'
                        });
                    };
                }
                
                
            };
        }]);
});
