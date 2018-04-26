/**
*@file uploadFile
*@author huangshiming
*/

define(function (require) {
    'use strict';
    require('./services');

    var config = require('common/config/common');
    angular.module('Manage.uploadFile.controller', [
        'Manage.services',
        'Manage.uploadFile.services'
        ])
        .controller('UploadFileCtrl',
            ['$rootScope', '$scope', 'uploadFileService','$window',
             '$sce', 'utilService', 'dialog', 'uploaderService',
            function ($rootScope, $scope, uploadFileService, $window, $sce, utilService, dialog, uploaderService) {
                $scope.currentPath = '/personal/';
                $scope.showNewFolder = false;
                $scope.newfileName = '';
                $scope.insertIndex = 0;
                $scope.fileTypeClassMap = config.FILE_TYPE_CLASS_MAP;
                $scope.queryContent = '';
                $scope.canUploader = true;
                $scope.canNew = false;
                $scope.canUpload = false;
                var needSearch = false;

                // 获取列表
                function initView() {
                    $scope.allSelected = false;
                    $scope.showMenuButtons = false;
                    var params = {
                        dir: $scope.currentPath,
                        dir_only: false
                    };
                    if ($scope.queryContent && needSearch) {
                        params.query = $scope.queryContent;
                    }
                    uploadFileService
                        .getInfoList(params)
                        .then(function (response) {
                            $scope.getDetailInfos = response.data.list;
                            $scope.getCrumbList = response.data.crumb;
                            $scope.currentPath = response.data.current_path;
                            $scope.canNew = response.data.current_path_option.can_new;
                            $scope.canUpload = response.data.current_path_option.can_upload;
                            $scope.queryContent = '';
                            $scope.canUploader = true;
                            $scope.showNewFolder = false;
                            $.each($scope.getDetailInfos, function (index, item) {
                                item.selected = false;
                                item.showEditName = false;
                                item.isShowIcons = false;
                                item.uploadStatus = 'uploaded';
                                if (item.size) {
                                     item.size = utilService.formatFileSize(item.size);
                                }
                                if (!item.level) {
                                    item.level = 0;
                                }
                                if (!$scope.fileTypeClassMap[item.file_type] && item.type === 'file') {
                                    item.file_type = 'unknown';
                                }

                            });
                        });
                }

                // 初始化左边面包屑导航
                var getIndexList = function () {
                    uploadFileService
                        .getIndexList()
                        .then(function (response) {
                            $scope.getIndex = response.data.path_list;
                        });
                };

                // 初始化左边内存空间
                var getStorageSpace = function () {
                    uploadFileService
                        .getStorageSpace()
                        .then(function (response) {
                            $scope.usedSize = utilService.formatFileSize(response.data.used_size);
                            $scope.sizeRate = (response.data.used_size / response.data.max_size);
                            if ($scope.sizeRate > 1) {
                                $scope.sizeRate = 1;
                            }
                            $scope.maxSize = utilService.formatFileSize(response.data.max_size);
                        });
                };

                initView();
                getIndexList();
                getStorageSpace();

                // 勾选全选
                $scope.chooseAllBox = function () {
                    var flag = $scope.allSelected;
                    $scope.showMenuButtons = flag;
                    $.each($scope.getDetailInfos, function (index, item) {
                        item.selected = flag;
                    });
                };

                // 下载的相关操作
                var getDownload = function (array) {
                    uploadFileService
                        .getDownLoadUrl({
                            paths: array
                        })
                        .then(function (res) {
                            var downloadUrl = res.data.download_url;
                            $window.open(downloadUrl);
                        });
                };
                // 下载单个文件
                $scope.dowloadSingle = function (path) {
                    var pathArray = [];
                    pathArray.push(path);

                    getDownload(pathArray);
                };

                // 下载多个文件
                $scope.downloadAll = function () {
                    var downArray = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected && item.type === 'file') {
                            downArray.push(item.path);
                        }
                    });
                    if (downArray.length > 0) {
                        getDownload(downArray);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '文件夹不支持下载，请选择文件下载',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 删除操作
                var getDetele = function (arrays) {
                    utilService
                        .showMessage({
                            title: '提示',
                            content: '确认删除',
                            okBtnText: '确定',
                            cancelBtnText: '取消',
                            hideCancel: false,
                            }).then(function () {
                                uploadFileService
                                    .deleteInfo({
                                        paths: arrays
                                    })
                                    .then(function () {
                                        uploadFileService
                                            .getInfoList({
                                                dir: $scope.currentPath,
                                                dir_only: false
                                            })
                                            .then(function (response) {
                                                $scope.getDetailInfos = response.data.list;
                                                $.each($scope.getDetailInfos, function (index, item) {
                                                    item.selected = false;
                                                    item.showEditName = false;
                                                    item.isShowIcons = false;
                                                    item.uploadStatus = 'uploaded';
                                                    if (item.size) {
                                                        item.size = utilService.formatFileSize(item.size);
                                                    }
                                                    if (!item.level) {
                                                        item.level = 0;
                                                    }
                                                    if (!$scope.fileTypeClassMap[item.file_type] && item.type === 'file') {
                                                        item.file_type = 'unknown';
                                                    }

                                                });
                                                $scope.showMenuButtons = false;
                                                getStorageSpace();
                                            });
                                    });
                        });
                };

                // 删除多个（全部）
                $scope.deteleAll = function () {
                    var deleteArray = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            deleteArray.push(item.path);
                        }
                    });

                    if (deleteArray.length > 0) {
                        getDetele(deleteArray);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '请选择要删除的文件夹或文件',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 删除单个
                $scope.deleteSingle =  function (index) {
                    var deleteArray = [];
                    deleteArray.push($scope.getDetailInfos[index].path);
                    $scope.getDetailInfos[index].selected = true;
                    getDetele(deleteArray);
                };

                // 是否展示重命名
                $scope.showEditName = function (it, $event) {
                    $.each($scope.getDetailInfos, function (index, item) {
                        item.showEditName = false;
                    });
                    var currentInput = $($event.target).parent().parent().find('.file-name-edit');
                    it.showEditName = true;
                    currentInput.focus();
                    currentInput.select();
                    // it.selected = true;
                };

                // 重命名的ajax
                var renameInfoAjax = function (it) {
                    uploadFileService
                        .renameInfo({
                            path: it.path,
                            name: it.name
                        })
                        .then(function () {
                            // it.name = it.fileName;
                            it.showEditName = false;
                            // it.fileName = '';
                        });
                };

                // 失去焦点的时候重命名操作
                $scope.renameInfo = function (it) {
                    // var keycode = window.event ? e.keyCode : e.which;
                    // if (keycode === 13) {
                    //     return;
                    // }
                    //renameInfoAjax(it);
                    it.showEditName = false;
                    it.fileName = '';
                    // it.selected = true;
                };

                $scope.renameContent = function (it) {
                    renameInfoAjax(it);
                }

                //按下键盘的操作
                $scope.keyPress = function (e, it) {
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode === 13) {
                        renameInfoAjax(it);
                    }
                };

                //获取列表更新
                $scope.refreshList = function (it) {
                    $scope.currentPath = it.path;
                    needSearch = false;
                    initView();
                };

                // 移动的的弹窗
                var removeDialog = function (it) {
                    var dialogInstance = dialog.open({
                        title: '移动到',
                        controller: require('./removeDialog/controller'),
                        width: 600,
                        skinClass: 'view-remove-content',
                        templateUrl: 'app/module/main/uploadFile/removeDialog/tpl.html',
                        resolve: {
                            it: function () {
                                return it;
                            }
                        }
                    });

                    dialogInstance.then(
                        function (param) {
                            console.log(param);
                            $scope.getDetailInfos = param;
                            $.each($scope.getDetailInfos, function (index, item) {
                                item.selected = false;
                                item.showEditName = false;
                                item.isShowIcons = false;
                                item.uploadStatus = 'uploaded';
                                if (item.size) {
                                     item.size = utilService.formatFileSize(item.size);
                                }
                                if (!item.level) {
                                    item.level = 0;
                                }
                            });
                        }
                    );
                };

                // 移动单个文件
                $scope.removeInfo = function (it) {
                    var needToMovePaths = [];
                    needToMovePaths.push(it.path);
                    var param = {};
                    param.paths = needToMovePaths;
                    param.currentPath = $scope.currentPath;
                    removeDialog(param);
                };

                // 移动多个文件
                $scope.removeSomeInfo = function () {
                    var needToMovePaths = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            needToMovePaths.push(item.path);
                        }
                    });
                    var param = {};
                    param.paths = needToMovePaths;
                    param.currentPath = $scope.currentPath;
                    if (needToMovePaths.length > 0) {
                        removeDialog(param);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '请选择要移动的文件夹或文件',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 是否展示每一行的那些icons
                $scope.showIcons = function (it) {
                    it.isShowIcons = true;
                };

                // 隐藏icons
                $scope.hideIcons = function (it) {
                    it.isShowIcons = false;
                };

                // 选中单个item
                $scope.chooseSingleBox = function () {
                    $scope.showMenuButtons = false;
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            $scope.showMenuButtons = true;
                            return;
                        }
                    });
                };

                // 返回上一级
                $scope.goBack = function () {
                    var path = $scope.currentPath;
                    var pathArray = path.split('/');
                    pathArray.pop();
                    pathArray.pop();
                    pathArray.push('');
                    $scope.currentPath = pathArray.join('/');
                    if ($scope.currentPath === '/') {
                        $scope.currentPath = '/personal/';
                    }
                    needSearch = false;
                    initView();
                };

                // 新建文件夹
                $scope.makeNewFolder = function () {
                    $scope.showNewFolder = true;
                };

                // 新建文件夹失去焦点的操作
                $scope.makeNewFolderOnBlur = function () {
                    if (!$scope.newfileName) {
                        $scope.showNewFolder = false;
                        return;
                    }
                    uploadFileService
                        .createDir({
                            dir: $scope.currentPath,
                            name: $scope.newfileName
                        })
                        .then(function () {
                            $scope.newfileName = '';
                            $scope.showNewFolder = false;
                            needSearch = false;
                            initView();
                         }, function () {
                            $scope.newfileName = '';
                            $scope.showNewFolder = false;
                         });
                };

                // 新建文件夹按下回车的操作
                $scope.keyPressMakeNewFolder = function (e) {
                    //var keycode = window.event ? e.keyCode : e.which;
                    var keycode = e.keyCode;
                    if (keycode === 13) {
                        $scope.makeNewFolderOnBlur();
                    }
                };

                // 取消新建文件夹
                $scope.cancelMakeNewFolder = function () {
                    $scope.newfileName = '';
                    $scope.showNewFolder = false;
                }

                //获取插入索引
                function getInsertIndex() {
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.type === 'file') {
                            $scope.insertIndex = index;
                            return false;
                        }
                    });
                }

                // 搜索
                $scope.queryParam = function () {
                    if ($scope.queryContent) {
                        needSearch = true;
                        initView();
                    }
                };

                // 按键搜索
                $scope.keyPressQueryParam = function (e) {
                    var keycode = e.keyCode;
                    if (keycode === 13) {
                        $scope.queryParam();
                    }
                }

                // 进入下一个文件夹
                $scope.goToNextPage = function ($event, it) {
                    var dom = event.target;
                    dom = $(dom);
                    if(!dom.hasClass('selectedSingle')
                        && !dom.hasClass('icon-ic_move2')
                        && !dom.hasClass('icon-ic_down')
                        && !dom.hasClass('icon-ic_edit')
                        && !dom.hasClass('icon-ic_delete2')
                        && !dom.hasClass('file-name-edit')
                        && !dom.hasClass('icon-ic_finish')
                        && !dom.hasClass('icon-ic_cancel2')
                        && (it.type === 'dir')) {
                        $scope.currentPath = it.path;
                        needSearch = false;
                        initView();
                    }
                };

                // 上传
                $scope.upLoadFile = function () {

                    var options = {
                        isCheckType: true,
                        path: $scope.currentPath,
                    };
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

                    if ($scope.canUploader) {
                        // $scope.canUploader = false;
                        uploaderService
                            .upload(options)
                            .then(function (response) {
                                var res = utilService.JSON.parse(response.responseText);
                                if ((res.code === 0)
                                    || (res.code === 1 && res.msg === 'success') ) {

                                    if (res.code === 1 && res.msg === 'success') {
                                        uploadFileService
                                            .getVideoUploadCallBack({
                                                dir: $scope.currentPath,
                                                video_id: res.fid
                                            })
                                            .then(function () {
                                                return;
                                            });
                                    }

                                    currentItem.fid = res.fid;
                                    currentItem.selected = true;
                                    currentItem.uploadStatus = 'uploaded';
                                    getStorageSpace();
                                    setTimeout(function () {
                                        $scope.canUploader = true;
                                        needSearch = false;
                                        initView();
                                    }, 1000);
                                } else {
                                    setTimeout(function () {
                                        $scope.canUploader = true;
                                        needSearch = false;
                                        initView();
                                    }, 1000);
                                    utilService
                                        .showMessage({
                                            title: '温馨提示',
                                            content: res.message,
                                            okBtnText: '确定',
                                            hideCancel: true
                                        });
                                }

                            }, function () {
                                setTimeout(function () {
                                    $scope.canUploader = true;
                                    needSearch = false;
                                    initView();
                                }, 1000);
                                // utilService
                                //     .showMessage({
                                //         title: '温馨提示',
                                //         content: response.message,
                                //         okBtnText: '确定',
                                //         hideCancel: true
                                //     });
                                currentItem.uploadStatus = 'uploadFail';
                            });
                    }
                    options.uploader.on('uploadprogress', function (e, data) {
                        if (firstEnter) {
                            var file = data.fileItem.file;
                            newFileItem.fileItem = data.fileItem;
                            newFileItem.name = file.name;
                            newFileItem.uploadRate = data.percent;
                            newFileItem.file_type = file.type;
                            newFileItem.size = utilService.formatFileSize(file.size);
                            $rootScope.safeApply(function () {
                                 $scope.getDetailInfos.splice($scope.insertIndex, 0, newFileItem);
                            });
                            getInsertIndex();
                            currentItem = $scope.getDetailInfos[$scope.insertIndex];
                            firstEnter = false;
                        }
                        else {
                            $rootScope.safeApply(function () {
                                currentItem.uploadRate = data.percent;
                            });
                        }
                        if (data.percent === '100.00%') {
                            $rootScope.safeApply(function () {
                                currentItem.isNew = false;
                            });
                        }
                        console.log(data.percent);
                    });
                    options.uploader.on('uploadstart', function () {
                        $scope.canUploader = false;
                    })
                };
            }

        ]);
});