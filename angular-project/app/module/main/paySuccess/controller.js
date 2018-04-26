/**
 * @file paySuccess
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    
    angular.module('Manage.paySuccess.controller', [
            'Manage.services'
        ])
        .controller('PaySuccessCtrl', ['$scope', '$window', '$sce',
            function ($scope, $window, $sce) {

                $scope.jumpNetdisk = function () {

                    var currentUrl = location.href;
                    var url = '';

                    if (currentUrl.indexOf('test') > 0) {
                       url += 'test-ziliao.genshuixue.com';
                    }
                    else if (currentUrl.indexOf('beta') > 0) {
                        url += 'beta-ziao.genshuixue.com';
                    }
                    else {
                        url += 'ziliao.genshuixue.com';
                    }

                    url = 'https://' + url + '/main.html#/uploadFile';
                    $window.open($sce.trustAsResourceUrl(url));
                };
            }
        ]);
});