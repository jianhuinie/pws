/**
* @file ziliaoku
* @author huangshiming
*/

define(function () {
    'use strict';
    angular.module('Manage.uploadFile.services', ['Manage.services'])
        .factory('uploadFileService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取资料库文件夹列表
                    getInfoList: function (params) {
                        return ajaxService.send('/api/disk/browse', params || {});
                    },
                    // 获取下载的地址
                    getDownLoadUrl: function (params) {
                        return ajaxService.send('/api/disk/download', params || {});
                    },
                    // 删除操作
                    deleteInfo: function (params) {
                        return ajaxService.send('/api/disk/delete', params || {});
                    },

                    // 重命名
                    renameInfo: function (params) {
                        return ajaxService.send('/api/disk/rename', params || {});
                    },

                    // 移动
                    moveInfo: function (params) {
                        return ajaxService.send('/api/disk/move', params || {});
                    },

                    // 创建文件夹
                    createDir: function (params) {
                        return ajaxService.send('/api/disk/create-dir', params || {});
                    },

                    // 获取左边面包屑
                    getIndexList: function (params) {
                        return ajaxService.send('/api/disk/index', params || {});
                    },

                    // 获取内存空间
                    getStorageSpace: function (params) {
                        return ajaxService.send('/api/storage/usage', params || {});
                    },

                    // 视频上传成功以后给后端的回调
                    getVideoUploadCallBack: function (params) {
                        return ajaxService.send('/api/disk/video-upload-callback', params || {});
                    },

                    // 检查按钮状态
                    getOptionCheck: function (params) {
                        return ajaxService.send('/api/disk/optionCheck', params || {});
                    }
                };
            }
        ]);
});