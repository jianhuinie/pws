/**
 * @file 选择课程分组弹窗
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    function Controller($scope, videoCourseEditService,
                        utilService, dialog, tipsService, groupId) {

        $scope.groupInfo = {
            groupId: groupId || null,
            groupList: null,
            defaultGroupId: null //默认分组id
        };

        //获取班级分组列表
        var getGroups = function () {
            videoCourseEditService
                .getClassGroup()
                .then (function (response) {
                    $scope.groupInfo.groupList = response.data;
                    $scope.groupInfo.defaultGroupId = response.data[0].id;
                    $scope.groupInfo.groupId = $scope.groupInfo.groupId || response.data[0].id;
                });
        };

        //根据id获取分组详情
        var getGroup = function (id) {
            videoCourseEditService
                .getClassGroupById({
                    id: id
                })
                .then (function (response) {
                    passGroupInfo($scope.groupInfo.groupId, response.data.name);
                });
        };

        //删除分组
        $scope.deleteGroup = function (id) {
            utilService
                .showMessage({
                    title: '',
                    content: '确定删除此分组吗？',
                    okBtnText: '删除',
                    cancelBtnText: '取消',
                    hideCancel: false,
                    okHandler: function () {
                        videoCourseEditService
                            .deleteClassGroup({
                                id: id
                            })
                            .then (function () {
                                getGroups();
                                tipsService.show({
                                    type: 'success',
                                    content: '删除成功'
                                });
                            });
                    }
                });
        };

        //新建分组
        $scope.addGroup = function () {
            dialog.open({
                title: '请输入新的分组名称',
                controller: require('module/main/videoCourseEdit/addGroupDialog/controller'),
                width: 313,
                skinClass: 'add-group-dialog',
                templateUrl: 'app/module/main/videoCourseEdit/addGroupDialog/tpl.html'
            })
            .then(function (newGroupId) {
                getGroups();
                $scope.groupInfo.groupId = newGroupId;
            });
        };

        //往父亲传分组id和name
        var passGroupInfo = function (id, name) {
            var param = {
                groupId: id,
                name: name
            };
            $scope.dialog.dismiss(param);
        };

        //取消分组
        $scope.cancel = function () {
            $scope.dialog.close();
        };

        //完成分组选择
        $scope.done = function () {
            getGroup($scope.groupInfo.groupId);
        };
        getGroups();
    }

    Controller.$inject = [
        '$scope', 'videoCourseEditService', 'utilService',
        'dialog', 'tipsService', 'groupId'
    ];
    return Controller;
});
