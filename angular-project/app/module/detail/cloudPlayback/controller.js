/**
 * @file cloudPlayback
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./service');
    var config = require('common/config/common');

    angular.module('detail.cloudPlayback.controller', [
            'Manage.services',
            'detail.cloudPlayback.service'
        ])
        .controller('CloudPlaybackCtrl', ['$rootScope','$scope', 'cloudPlaybackService', 
            'utilService', 'dialog', 'tipsService',
            function ($rootScope, $scope, cloudPlaybackService, 
                utilService, dialog, tipsService) {
                var params = {};
                //获取直播回放列表
                function getCourseList() {
                    $scope.isLoading = true;
                    cloudPlaybackService
                        .getCourseList({
                            data: params,
                            method: 'GET'
                        })
                        .then(function (response) {
                            var data = response.data;
                            $scope.isLoading = false;
                            $scope.courseList = data.courses;
                            $.each($scope.courseList, function (index, item) {
                                item.showSubList = false;
                                if (item.name.length > 10) {
                                    item.displayName = item.name.substr(0, 9) + '...';
                                }
                                //展示时间格式化
                                if (item.begin_time && item.end_time) {
                                    item.beginTime = item.begin_time.split(' ')[0];
                                    item.endTime = item.end_time.split(' ')[0];
                                }

                                $.each(item.schedules, function (index1, item1) {
                                    var verifyReasons = item1.verify_outer_reasons;
                                    if (verifyReasons && verifyReasons.reasons.length) {
                                        var content = '';
                                        content += '<ul>';
                                        $.each(verifyReasons.reasons, function (index2, item2) {
                                            content += '<li>'
                                                    +  (index2 + 1)
                                                    +  '.'
                                                    +  item2;
                                        });
                                        content += '</ul>';
                                        item1.verifyReasonsOpt = {
                                            position: 'bottom',
                                            content: content,
                                            width: 400
                                        };
                                    }
                                    var beginTimeArr = item1.begin_time.split(' ');
                                    var endTimeArr = item1.end_time.split(' ');
                                    item1.displayCourseTime = beginTimeArr[0] + ' ' + beginTimeArr[1] + '-' + endTimeArr[1];
                                });  
                            });
                            var pager = data.pager;
                            $scope.totalCount = pager.total;
                            $scope.currentPage = pager.current_page;
                            $scope.pageSize = pager.page_size;
                        });
                }
                function initView() {
                    $scope.courseType = 2;
                    params = {
                        course_type: 2,
                        page: 1
                    };
                    $scope.statusMap = {
                        '20': '上传中',
                        '30': '转换中',
                        '50': '转码失败',
                        '70': '回放中',
                        '90': '已结束回放'
                    };
                    $scope.verifyStatusMap = {
                        '0': '审核中',
                        '2': '审核失败',
                        '3': '审核失败',
                        '4': '审核失败',
                        '5': '审核中',
                        '6': '审核失败'
                    };
                    getCourseList();
                    $scope.isChangingVideo = false;
                    $scope.operationRemind = {
                        width: 380,
                        position: 'bottom',
                        content: '更换回放视频功能说明：'
                                 + '</br>1、在回放视频有问题或者您对回放视频不满意时，您可使用该功能替换回放视频；'
                                 + '</br>2、替换成功之后，将不可再恢复成之前的云端回放视频，请老师谨慎操作；'
                                 + '</br>3、请保证替换使用的视频跟直播回放的视频是同一节课的录制视频；'
                                 + '</br>4、已经转为视频课的直播回放，替换直播回放的视频，不会影响到视频课中的视频内容；'
                                 +  '</br>未转为视频课的直播回放，在替换直播回放后，再转为视频课，则视频课中对应的视频为最新的替换后的视频；（注：每节直播回放只有一次转为视频课的机会，请仔细查阅回放视频）'
                                 + '</br>5、替换后的视频需审核通过之后（审核时间需1个工作日），学生才可查看；'
                                 + '</br>6、替换回放视频的操作不可恢复，但可以替换多次。'
                    };
                }
                //删除回放课节
                // function doDeleteCourse(subCourse) {
                //     utilService.showMessage({
                //         okBtnPosition: 'left',
                //         hideCancel: false,
                //         title: '温馨提示',
                //         content: '仅删除回放，不会删除资料库和视频课中的视频文件',
                //         okBtnText: '确认删除',
                //         okHandler: function () {
                //             cloudPlaybackService
                //                 .deletePlayback({
                //                     data: {
                //                         playback_id: +subCourse.playback_id
                //                     },
                //                     method: 'GET'
                //                 })
                //                 .then(function () {
                //                     getCourseList();
                //                 });
                //         }
                //     });
                // };
                //转换成功处理函数
                function convertSuccessHandler(data) {
                    var env = utilService.getEnvName();
                    var newHref;
                    var str = 'b.genshuixue.com/main.html#/videoCourseEdit/' +  data.video_course_number;
                    if (env === 'www') {
                        newHref = 'https://' + str;
                    }
                    else {
                        newHref = 'https://' + env + '-' + str;
                    }
                    location.href = newHref; 
                }
                //下架视频课
                function offVideoCourse(data, subCourse) {
                    utilService.showMessage({
                        title: '温馨提示',
                        hideCancel: false,
                        content: '添加该课节需要将视频课下架，提交审核成功后即可再次发布，是否确认添加？',
                        okHandler: function () {
                            cloudPlaybackService
                                .setCourseStatus({
                                    data: {
                                        number: data.video_course_number,
                                        status: 3
                                    },
                                    method: 'GET'
                                })
                                .then(function (res) {
                                    convertToVideoCourse(subCourse);
                                });
                        }
                    });
                }
                //删除视频课
                function cancelVideoCourse(data, subCourse) {
                    utilService.showMessage({
                        title: '温馨提示',
                        hideCancel: false,
                        content: '添加该课节需要将视频课撤销审核，提交审核成功后即可再次发布，是否确认添加？',
                        okHandler: function () {
                            cloudPlaybackService
                                .cancelVideoCourse({
                                    data: {
                                        number: data.video_course_number
                                    },
                                    method: 'GET'
                                })
                                .then(function (res) {
                                    convertToVideoCourse(subCourse);
                                });
                        }
                    });
                }
                //转换失败处理函数
                function convertErrorHandler(data, subCourse) {
                    if (data.video_section_id) {
                        tipsService.show({
                            content: '课节已存在，无需重复添加哦～',
                            type: 'error'
                        });
                        return;
                    }
                    if (data.state === 6) { // 已存在视频课，需下架
                        offVideoCourse(data, subCourse);
                    }
                    if (data.state === 3) { // 已存在视频课，审核中
                        cancelVideoCourse(data, subCourse);
                    }
                }
                //转为视频课
                function convertToVideoCourse(subCourse) {
                    if (hasUploadingCourse()) {
                        utilService.showMessage('您有正在上传中的视频，请稍候');
                    }
                    else {
                        cloudPlaybackService
                            .convertToVideoCourse({
                                data: {
                                    schedule_id: +subCourse.schedule_id
                                },
                                userDefineErrors: {
                                    otherCodes : [
                                        {
                                            code: 991109,
                                            handler: function (response) {
                                                convertErrorHandler(response.data, subCourse);
                                            }
                                        }
                                    ]
                                },
                                method: 'GET'
                            })
                            .then(function (response) {
                                convertSuccessHandler(response.data);
                            });
                    }
                }
                //检查有无回放正在上传视频
                function hasUploadingCourse() {
                    var flag = false;
                    $.each($scope.courseList, function (index, item) {
                        if (flag) {
                            return false;
                        }
                        $.each(item.schedules, function (index1, item1) {
                            if (item1.uploadedPercent) {
                                flag = true;
                                return false;
                            }
                        });
                    });
                    return flag;
                }
                //更换视频
                function doReplaceVideo(subCourse) {
                    if (hasUploadingCourse()) {
                        utilService.showMessage('您有正在上传中的视频，请稍候');
                    }
                    else {
                        utilService.showMessage({
                            title: '温馨提示',
                            content: '<i class="icon icon-warning" style="margin-right:10px;font-size:18px"></i>回放视频一旦更换成功将不能撤销操作，请谨慎处理',
                            okBtnPosition: 'left',
                            width: 400,
                            skinClass: 'replace-remind-dialog',
                            textClass: 'danger',
                            hideCancel: false,
                            okBtnText: '确定更换',
                            okHandler: function () {
                                dialog.open({
                                    title: '温馨提示',
                                    skinClass: 'add-video-dialog',
                                    resolve: {
                                        courseInfo: function () {
                                            return subCourse;
                                        }
                                    },
                                    controller: require('module/detail/cloudPlayback/addVideoDialog/controller'),
                                    templateUrl: 'app/module/detail/cloudPlayback/addVideoDialog/tpl.html'
                                });
                            }
                        });
                    }
                }

                initView();
                $scope.setCourseType = function (type) {
                    if (type !== params.course_type && !$scope.isLoading) {
                        $scope.courseType = type;
                        params.course_type = type;
                        params.page = 1;
                        getCourseList();
                    }
                };  
                
                $scope.toggleFlag = function (course, type) {
                    if (type === 1) {
                        $.each($scope.courseList, function (index, item) {
                            item.showSubList = false;
                        });
                    }
                    course.showSubList = !course.showSubList;
                };
                $scope.changePage = function (page) {
                    if (page !== params.page) {
                        params.page = page;
                        getCourseList();
                    }
                };
                $scope.editExpireDate = function (course) {
                    dialog.open({
                        title: '回放视频有效期',
                        controller: require('module/detail/cloudPlayback/editExpireDateDialog/controller'),
                        resolve: {
                            courseInfo: function () {
                                return {
                                    course: course,
                                    courseType: $scope.courseType
                                };
                            }
                        },
                        skinClass: 'edit-expiredate-dialog',
                        templateUrl: 'app/module/detail/cloudPlayback/editExpireDateDialog/tpl.html'
                    })
                    .then(function () {
                        tipsService
                            .show({
                                content: '设置成功',
                                type: 'success'
                            })
                            .then(function () {
                                getCourseList();
                            });
                    });
                };
                $scope.doAction = function (course, subCourse, action) {
                    switch (action.action) {
                        // case 'DELETE':
                        //     doDeleteCourse(subCourse);
                        //     break;
                        case 'PREVIEW': 
                            window.open(subCourse.cloud_playback_url);
                            break;
                        case 'VIEW_VIDEO': 
                            if (!action.disable) {
                                window.open(subCourse.video_course_url);
                            }
                            break;
                        case 'CONVERT_VIDEO': 
                            convertToVideoCourse(subCourse);
                            break;
                        case 'REPLACE_VIDEO': 
                        case 'SUPPLY_VIDEO': 
                            doReplaceVideo(subCourse);
                            break;
                        default:
                            return ;
                    }
                };

                $scope.closePlayback = function (course, index) {
                    if (hasUploadingCourse()) {
                        utilService.showMessage('您有正在上传中的视频，请稍候');
                    }
                    else {
                        dialog.open({
                            title: '温馨提示',
                            width: 420,
                            skinClass: 'close-playback-dialog',
                            resolve: {
                                courseInfo: function () {
                                    return {
                                        course: course,
                                        courseType: $scope.courseType
                                    };
                                }
                            },
                            controller: require('module/detail/cloudPlayback/closePlaybackDialog/controller'),
                            templateUrl: 'app/module/detail/cloudPlayback/closePlaybackDialog/tpl.html'
                        })
                        .then(function () {
                            tipsService
                                .show({
                                    type: 'success',
                                    content: '删除成功'
                                });
                            $scope.courseList.splice(index, 1);
                        });
                    }
                };
            }
        ]);
});