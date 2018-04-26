/**
 * @file 编辑回放有效期 controller
 * @author niejianhui
 */
define(function () {
    'use strict';
    var Validator = require('cc-config/form/Validator');
    Controller.$inject = ['$scope', 'cloudPlaybackService', 
    'courseInfo', 'utilService', 'tipsService'];
    function Controller($scope, cloudPlaybackService, 
        courseInfo, utilService, tipsService) {
        var validateOptions, validator;
        function initView () {
            $scope.expireDate = courseInfo.course.playback_expire_day;
            validateOptions = {
                mainElement: $('.edit-form'),
                validateOnBlur: true,
                fields: {
                    expiredate: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            max: 365,
                            min: 1
                           
                        },
                        errors: {
                            required: '请输入有效期',
                            pattern: ' 请输入整数',
                            max: '最多可设置365天',
                            min: '至少设置一天哦'
                            
                        }
                    }
                }
            };
            validator = new Validator(validateOptions);
            $scope.remindOption = {
                position: 'bottom',
                content: '回放结束时间 ＝ 最后一节课结束时间 ＋ 回放有效期',
                width: 300
            };
        }

        initView();
        $scope.confirmUpdate = function  () {
            if (validator.validate()) {
                if (+courseInfo.course.playback_expire_day !== +$scope.expireDate) {
                    if (+courseInfo.course.playback_expire_day > +$scope.expireDate) {
                        utilService.showMessage('当前已有学生报名，您不能缩短回放时间，请重新调整');
                        return false;
                    }
                    cloudPlaybackService
                        .setExpireDay({
                            playback_course_number: +courseInfo.course.playback_course_number,
                            playback_expire_day: +$scope.expireDate
                        })
                        .then(function () {
                            $scope.dialog.dismiss(); 
                        }); 
                }
            }
        };
        $scope.cancelUpdate = function () {
            setTimeout(function () {
                $scope.dialog.close();
            }, 200);
        };
        $scope.addExpireDate = function (value) {
            $scope.expireDate = +$scope.expireDate + value;
            if ($scope.expireDate <= 0) {
                $scope.expireDate = 1;
            }
            else if ($scope.expireDate > 365) {
                $scope.expireDate = 365;
            }
        };

    }

    return Controller;
});
