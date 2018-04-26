/**
 * @file storageSpace
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    require('./services');
    var selfConfig = require('./config');
    var divide = require('cc/function/divide');

    
    angular.module('Manage.storageSpace.controller', [
            'Manage.services',
            'Manage.storageSpace.services'
        ])
        .controller('ManageSpaceCtrl', ['$scope', 'storageSpaceService', '$window', '$sce', 'utilService',
            function ($scope, storageSpaceService, $window, $sce, utilService) {

                function initView() {
                    $scope.showPurchase = true;
                    $scope.selectedIndex = 0;
                    $scope.payMoney = null;
                    $scope.vipStatusMap = selfConfig.VIP_STATUS_MAP;

                    storageSpaceService
                        .getUserInfo()
                        .then(function (response) {
                            $scope.vipLevel = response.data.vip_level;
                        });

                    storageSpaceService
                        .getManageInfo()
                        .then(function (response) {
                            $scope.totalSpace = utilService.formatFileSize(response.data.max_size);
                            $scope.usedSpace = utilService.formatFileSize(response.data.used_size);
                        });

                    storageSpaceService
                        .getProductList()
                        .then(function (response) {
                            $scope.beginDate = response.data.begin_date;
                            $scope.endDate = response.data.end_date;
                            $scope.productList = response.data.goods;
                        });

                    storageSpaceService
                        .gitHistoryRecord()
                        .then(function (response) {
                            $scope.historyRecords = response.data;
                        });
                }

                initView();

                $scope.buy = function (product) {
                    $scope.showPurchase = true;
                    $scope.selectedId = product.id;
                    $scope.payMoney = product.price_list[$scope.vipLevel].price;
                };

                $scope.select = function (product) {
                    $scope.selectSpace = true;
                    $scope.selectedId = product.id;
                    $scope.payMoney = product.price_list[$scope.vipLevel].price;
                };

                $scope.confirmBuy = function () {
                    storageSpaceService
                        .createOrder({
                            good_id: $scope.selectedId
                        })
                        .then(function (response) {
                            // var jumpUrl = 'api/middleware/redirect?redirect=';
                            // jumpUrl += encodeURIComponent(response.data.redirect);
                            $window.open($sce.trustAsResourceUrl(response.data.redirect));
                        });
                };
                $scope.jumpVipCenter = function () {

                    var currentUrl = location.href;
                    var url = '';

                    if (currentUrl.indexOf('ctest') > 0) {
                       url += 'test.genshuixue.com';
                    }
                    else if (currentUrl.indexOf('beta') > 0) {
                        url += 'beta.genshuixue.com';
                    }
                    else {
                        url += 'www.genshuixue.com';
                    }

                    url = 'https://' + url + '/teacher_center/vip_center';
                    $window.open($sce.trustAsResourceUrl(url));
                };

                $scope.goBack = function (product) {
                    $scope.showPurchase = true;
                };
            }
        ]);
});