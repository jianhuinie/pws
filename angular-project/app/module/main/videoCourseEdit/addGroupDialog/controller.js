/**
 * @file 新建分组弹窗
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    var Validator = require('cc/form/Validator');

    function Controller($scope, videoCourseEditService, utilService , tipsService) {
        var formContainer = $('.new-group-form');
        $scope.groupName = null;

        //新建分组保存
        $scope.save  = function () {
            if (formContainer.validator.validate()) {
                if($scope.groupName !== '默认分组') {
                    videoCourseEditService
                        .saveClassGroup({
                            name: $scope.groupName
                        })
                        .then(function (response) {
                            tipsService.show({
                                type: 'success',
                                content: '保存成功'
                            });
                            $scope.dialog.dismiss(response.data.id);
                        });
                }
                else {
                    utilService
                        .showMessage({
                            title: '',
                            content: '分组名称不能为‘默认分组’',
                            okBtnText: '确定',
                            hideCancel: true
                        });
                }
            }
        };

        //取消新建
        $scope.cancel = function () {
            if ($scope.groupName) {
                utilService
                    .showMessage({
                        title: '',
                        content: '是否确定放弃新增课程分组？',
                        okBtnText: '确定',
                        cancelBtnText: '取消',
                        hideCancel: false,
                        okHandler: function () {
                            $scope.dialog.close();
                        }
                    });
            }
            else {
                $scope.dialog.close();
            }
        };

        //form校验init
        var initForm = function (container) {
            var validateOptions = {
                realtime: true,
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    name: {
                        rules: {
                            required: true,
                            maxlength: 10
                        },
                        errors: {
                            required: '请输入分组名称',
                            maxlength: '最大长度长为 10 字'
                        }
                    }
                }
            };
            // 初始化表单校验
            var validator =  new Validator(validateOptions);
            container.validator = validator;
        };

        initForm(formContainer);
    }

    Controller.$inject = [
        '$scope', 'videoCourseEditService', 'utilService', 'tipsService'
    ];
    return Controller;
});
