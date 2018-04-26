/**
*@file removeFile
*@author huangshiming
*/

define(function () {
    'use strict';

    function Controller($scope, uploadFileService, it, $rootScope) {
        $scope.newfileName = '';
        $scope.currentPath = '/personal/';
        $scope.personlExpand = false;

        // 展示第一个文件夹
        $scope.expendFirstDir = function () {
            $scope.personlExpand = !$scope.personlExpand;
            initView();
        };

        // 初始化列表
        function initView() {
            $scope.getDetailInfos = {};
            $scope.getDetailInfos.moveToPath = '/personal/';
            $scope.getDetailInfos.showCreateFolderButton = false;
            uploadFileService
                .getInfoList({
                    dir: $scope.currentPath,
                    dir_only: true
                })
                .then(function (response) {
                    $scope.getDetailInfos.list = response.data.list;
                    $scope.currentPath = response.data.current_path;
                    $.each($scope.getDetailInfos.list, function (index, item) {
                        if (!item.level) {
                            item.level = 0;
                        }
                    });
                });
        }

        // 取消新建文件夹
        $scope.cancelNewFolder = function () {
            $scope.newfileName = '';
            $scope.showeEdit = false;
        };

        // 是否展示新建文件夹
        $scope.showCreateFolder = function () {
            $scope.showeEdit = true;
        };

        // 关闭弹窗
        $scope.closeDialog = function () {
            $scope.dialog.close();
        };

        // 选择完路径以后
        $scope.sendPath = function () {
            uploadFileService
                .moveInfo({
                    paths: it.paths,
                    move_to: $scope.getDetailInfos.moveToPath
                })
                .then(function () {
                    //$scope.dialog.close();
                    $scope.currentPath = it.currentPath;
                    // 成功以后刷新页面
                    uploadFileService
                        .getInfoList({
                            dir: $scope.currentPath,
                            dir_only: false
                        })
                        .then(function (response) {
                            $scope.dialog.dismiss(response.data.list);
                        });

                });
        };

        // 多叉树遍历
        var parseDirList =  function (treeNodes, currentList) {
            if(!treeNodes || !treeNodes.length) {
                return;
            }
            for(var i = 0 , len = treeNodes.length; i < len; i++) {
                var list = treeNodes[i].list;
                if (treeNodes[i].path === $scope.getDetailInfos.moveToPath) {
                    $rootScope.safeApply(function () {
                        treeNodes[i].list = currentList;
                    });
                    return;
                }
                if (list && list.length) {
                    parseDirList(list, currentList);
                }
            }
        };

        // 确定新建文件夹
        $scope.confirmNewFolder = function () {
            if (!$scope.newfileName) {
                return;
            }

            uploadFileService
                .createDir({
                    dir: $scope.getDetailInfos.moveToPath,
                    name: $scope.newfileName
                })
                .then(function () {
                    uploadFileService
                        .getInfoList({
                            dir: $scope.getDetailInfos.moveToPath,
                            dir_only: true
                        })
                        .then(function (response) {
                            var currentList = {};
                            currentList = response.data.list;
                            parseDirList($scope.getDetailInfos.list, currentList);
                            $scope.newfileName = '';
                            $scope.showeEdit = false;
                        });
                });
        };
    }

    Controller.$inject = [
        '$scope', 'uploadFileService', 'it', '$rootScope'
    ];
    return Controller;
});