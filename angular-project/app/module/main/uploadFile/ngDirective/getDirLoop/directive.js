/**
 * @file 获取子文件夹
 * @author huangshiming
 *
 * usage:
 *
 * <dir-loop></dir-loop>
 *
 */
define(function (require) {
    'use strict';
    var config = require('common/config/common');
    var Validator = require('cc/form/Validator');

    angular.module('Manage.uploadFile.directives')
        .directive('dirLoop',
            ['uploadFileService',
            function (uploadFileService) {
                return {
                    restrict: 'E',
                    replace: false,
                    scope: {
                        options: '=options'
                    },
                    templateUrl: 'app/module/main/uploadFile/ngDirective/getDirLoop/tpl.html',
                    link: function ($scope) {
                        $scope.isExpend = {};
                        $scope.levelArray = {};
                        var currentPath = '/personal/';
                        var currentItem = {};

                        // 获取列表
                        var getList = function (item) {
                            uploadFileService
                                .getInfoList({
                                    dir: item.path,
                                    dir_only: true
                                })
                                .then(function (res) {
                                    item.list = res.data.list;
                                    currentPath = item.path;
                                    currentItem = item;
                                    $scope.options.moveToPath = currentPath;
                                    if (item.level > 0) {
                                        $scope.options.showCreateFolderButton = true;
                                    }
                                    $scope.isExpend[item.did] = true;
                                    $scope.levelArray[item.did] = item.level;
                                });
                        }

                        // 点击展示
                        $scope.itemExpended = function (item) {
                            if (!$scope.isExpend[item.did]) {

                                $.each($scope.isExpend, function (index, it) {
                                    if ($scope.levelArray[index] >= item.level) {
                                        $scope.isExpend[index] = false;
                                    }
                                });

                                getList(item);
                            } else {
                                $scope.isExpend[item.did] = false;
                                $scope.options.moveToPath = currentPath;
                            }
                        }
                    }
                };
            }
        ]);
});
