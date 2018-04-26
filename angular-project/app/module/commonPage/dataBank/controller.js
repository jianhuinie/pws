/**
 * @file 添加资料
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    require('./service');
    
    var config = require('common/config/common');
    var selfConfig = require('./config');

    var typesArrayMap = selfConfig.FILE_TYPE_ARRAY_MAP;
    var typesTextMap = selfConfig.FILE_TYPE_TEXT_MAP;
    var options = {};

    
    angular.module('commonPage.dataBank.controller', [
            'Manage.services',
            'commonPage.dataBank.service'
        ])
        .controller('DataBankCtrl', ['$rootScope', '$scope', 'dataBankService', 'uploaderService', 'utilService',
            function ($rootScope, $scope, dataBankService, uploaderService, utilService) {
                function initView() {
                    $scope.fileTypeClassMap = config.FILE_TYPE_CLASS_MAP;
                    $scope.allowDownload = false;
                    $scope.publicData = false;
                    $scope.insertIndex = 0;
                    $scope.hasOtherType = false;
                }

                //解析url后面的参数
                function parseQueryParams (queryString) {
                    var queryString = queryString.slice(1);
                    var queryArray = queryString.split('&');

                    var result = {};

                    $.each(queryArray, function (index, item) {
                        item = item.split('=');
                        result[item[0]] = decodeURIComponent(item[1]);
                    });

                    return result;
                }
                //将传递对参数转为bool型
                function convertToBool(str) {
                    if (str && str === 'true') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                //获取其它父页面传的参数  并分别处理
                function getQueryParams() {
                    var search = location.search;
                    var queryObj = parseQueryParams(search);
                    $scope.hideUpload = convertToBool(queryObj.hideUpload);
                    $scope.noMultiple = convertToBool(queryObj.noMultiple);
                    $scope.hideSettings = convertToBool(queryObj.hideSettings);
                    $scope.fileType = queryObj.fileType || '';
                    $scope.fileTypeText = typesTextMap[queryObj.fileType] || '';
                    $scope.authToken = queryObj.auth_token || '';
                }

                //格式化文件大小
                function formatedSize(fileList) {
                    $.each(fileList, function (index, item) {
                        if (item.size) {
                            item.size = utilService.formatFileSize(+item.size);
                        }
                    });
                }

                //获取插入索引
                function getInsertIndex(fileList) {
                    $.each(fileList, function (index, item) {
                        if (item.type === 'file') {
                            $scope.insertIndex = index;
                            return false;
                        }
                    });
                }

                //获取批量操作时的文件id数组
                function getSelectedFiles (key) {
                    var arr = [];
                    $.each($scope.dataList, function (index, item) {
                        if (item.selected) {
                            arr.push(item[key] || '');
                        }
                    });
                    return arr;
                }

                //获取批量操作时的文件名数组
                function getSelectedFileNames () {
                    var arr = [];
                    $.each($scope.dataList, function (index, item) {
                        if (item.selected) {
                            arr.push(item.name);
                        }
                    });
                    return arr;
                }

                //获取批量操作时的文件type数组
                function getSelectedFileTypes () {
                    var arr = [];
                    $.each($scope.dataList, function (index, item) {
                        if (item.selected) {
                            arr.push(item.file_type);
                        }
                    });
                    return arr;
                }

                //判断选中的文件类型是否有非指定文件
                function judgeSelectedType (type) {
                    var typesArray = typesArrayMap[type];
                    $.each($scope.dataList, function (index, item) {
                        if (item.selected && typesArray.indexOf(item.file_type) === -1) {
                            $scope.hasOtherType = true;
                            return false;
                        }
                    });
                }

                function renderDataBank(path, dirOnly) {
                    dataBankService
                        .getDataBank({
                            auth_token: $scope.authToken,
                            dir: path,
                            dir_only: dirOnly || false
                        })
                        .then(function (response) {
                            $scope.crumbs = response.data.crumb;
                            $scope.dataList = response.data.list;
                            formatedSize($scope.dataList);
                            getInsertIndex($scope.dataList);
                            $scope.currentPath = response.data.current_path;
                            options.path = $scope.currentPath;
                            $.each($scope.dataList, function (index, item) {
                                if(!$scope.fileTypeClassMap[item.file_type]) {
                                    item.file_type = 'unknown';
                                }
                            });
                        });
                }


                initView();
                getQueryParams();
                renderDataBank('/personal/');

                //面包屑导航
                $scope.goToDir = function (obj) {
                    if ((obj.type === 'dir') 
                        || (!obj.type && obj.path !== $scope.currentPath)) {
                        renderDataBank(obj.path);
                    }
                    else if (obj.type){
                        obj.selected = obj.selected ? false : true;
                    }
                };

                //本地上传
                $scope.uploadFile = function () {

                    if ($scope.currentPath === '/personal/') {
                        utilService.showMessage('该目录不支持上传操作');
                    }
                    else {
                        var newFileItem = {
                            type: 'file',
                            file_type: null,
                            name: null,
                            fid: null,
                            size: 0,
                            path: $scope.currentPath,
                            time: null,
                            uploadStatus: 'uploading',
                            fileItem: null
                        };
                        var firstEnter = true;
                        var currentItem;
                        options.isCheckType = true;
                        options.authToken = $scope.authToken;

                        uploaderService
                            .upload(options)
                            .then(function (response) {
                                var res = utilService.JSON.parse(response.responseText);
                                if ((res.code === 0 && res.message === '请求成功') 
                                    || (res.code === 1 && res.msg === 'success')) {

                                    var fileId = res.fid || res.data.fid;
                                    currentItem.fid = fileId;
                                    currentItem.selected = true;
                                    currentItem.uploadStatus = 'uploaded';
                                    if (typesArrayMap.video.indexOf(currentItem.file_type) > -1) {
                                        dataBankService
                                            .uploadVideoCallBack({
                                                auth_token: $scope.authToken,
                                                dir: $scope.currentPath,
                                                video_id: fileId
                                            });
                                    }
                                }
                                else {
                                    currentItem.uploadStatus = 'uploadFail';
                                    utilService
                                        .showMessage(res.message || res.msg)
                                        .then(function () {
                                            $scope.dataList.splice($scope.insertIndex, 1);
                                        });
                                }
                                
                            }, function () {
                                currentItem.uploadStatus = 'uploadFail';
                                utilService
                                    .showMessage(response.message || response.msg)
                                    .then(function () {
                                        $scope.dataList.splice($scope.insertIndex, 1);
                                    });
                            });

                        options.uploader.on('uploadprogress', function (e, data) {
                            if (firstEnter) {
                                var file = data.fileItem.file;
                                newFileItem.fileItem = data.fileItem;
                                newFileItem.name = file.name;
                                newFileItem.uploadRate = data.percent;
                                newFileItem.file_type = file.type;
                                newFileItem.size = utilService.formatFileSize(+file.size);
                                $rootScope.safeApply(function () {
                                    $scope.dataList.splice($scope.insertIndex, 0, newFileItem);
                                });
                                currentItem = $scope.dataList[$scope.insertIndex];
                                firstEnter = false;
                            }
                            else {
                                $rootScope.safeApply(function () {
                                    currentItem.uploadRate = data.percent;
                                });
                            }
                        });
                    }
                };

                //完成
                $scope.confirmSelect = function () {
                    var idArray = getSelectedFiles('id');
                    var mediaIdArray = getSelectedFiles('media_id');
                    var nameArray = getSelectedFileNames();
                    var typeArray = getSelectedFileTypes();

                    if (idArray.length) {

                        //针对传参做特殊处理
                        if ($scope.fileType) {
                            $scope.hasOtherType = false;
                            judgeSelectedType($scope.fileType);
                            if ($scope.hasOtherType) {
                                utilService.showMessage('只能选择' + $scope.fileTypeText +'格式的文件');
                                return false;
                            }
                        }

                        if ($scope.noMultiple && idArray.length > 1) {
                            utilService.showMessage('只能选择一个视频');
                            return false;
                        }

                        var params = {
                            idList: idArray,
                            mediaIdList: mediaIdArray,
                            nameList: nameArray,
                            typeList: typeArray,
                            allowDownload: $scope.allowDownload,
                            publicData: $scope.publicData
                        };
                        window.parent.postMessage(utilService.JSON.stringify(params), '*');
                    }
                    else {
                        utilService.showMessage('请选择文件');
                    }
                };

                //重新上传
                $scope.uploadAgain = function (file) {
                    options.uploader.upload(file.fileItem);
                };

            }
        ]);
});