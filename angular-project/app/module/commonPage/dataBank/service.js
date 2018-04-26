/**
 * @file 资料库添加资料
 * @author niejianhui
 */

define(function () {
    'use strict';
    angular.module('commonPage.dataBank.service', ['Manage.services'])
        .factory('dataBankService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取资料库信息
                    getDataBank: function (params) {
                        return ajaxService.send('/api/disk/browse', params || {});
                    },
                    //视频成功上传回调
                    uploadVideoCallBack: function (params) {
                        return ajaxService.send('/api/disk/video-upload-callback', params || {});
                    }
                };
            }
        ]);
});