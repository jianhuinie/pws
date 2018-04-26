/**
 * @file storageSpace
 * @author niejianhui
 */

define(function () {
    'use strict';
    angular.module('Manage.storageSpace.services', ['Manage.services'])
        .factory('storageSpaceService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取用户信息
                    getUserInfo: function (params) {
                        return ajaxService.send('/api/user/basicInfo', params || {});
                    },
                    //获取用户存储空间信息
                    getManageInfo: function (params) {
                        return ajaxService.send('/api/storage/usage', params || {});
                    },
                    //获取存储空间商品列表
                    getProductList: function (params) {
                        return ajaxService.send('/api/goods/list', params || {});
                    },
                    //创建订单
                    createOrder: function (params) {
                        return ajaxService.send('/api/payment/create-order', params || {});
                    },
                    //获取购买历史纪录
                    gitHistoryRecord: function (params) {
                        return ajaxService.send('/api/payment/history', params || {});
                    }
                };
            }
        ]);
});