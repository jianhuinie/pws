/**
 * @file 编辑单节视频课
 * @author niejianhui
 *
 * usage:
 *
 * <single-videocourse></single-videocourse>
 *
 */
define(function (require) {
    'use strict';

    angular.module('Manage.videoCourseEdit.directives')
        .directive('singleVideocourse',
            ['$rootScope', 'uploaderService', 'dialog', 'utilService', 'videoCourseEditService',
            function ($rootScope, uploaderService, dialog, utilService, videoCourseEditService) {
                return {
                    restrict: 'E',
                    replace: true,
                    /**
                     * index  第几节
                     * options.name   名称
                     * options.videoName  视频名
                     * options.videoId    视频id
                     * options.enableTrial  是否可试听
                     * options.trialMinutes 试听时长  和后端约定好了 0代表整节试听
                     * options.isEditing  是否是编辑态
                     * courseMode 课程模式
                     * courseNumber 课程number  上报用
                     * courseSchedule 视频课节／章节列表
                     * chapterIndex  章节模式时所属的章索引
                     * isPlaybackcourse  是否是回放转视频课
                     * uploadingFiles 正在上传的视频列表 - 为多视频上传准备
                     */
                    scope: {
                        options: '=',
                        index: '=',
                        courseMode: '@',
                        courseNumber: '@',
                        courseSchedule: '=',
                        chapterIndex: '=',
                        isPlaybackcourse: '=',
                        uploadingFiles: '='
                    },
                    templateUrl: 'app/module/main/videoCourseEdit/ngDirective/singleVideoCourse/tpl.html',
                    link: function ($scope) {

                        // 触发状态改变事件
                        function emitShowAddSectionBtnEvent(data) {
                            $scope.$emit('hasEditingItemChange', data);
                        }

                        //上报函数
                        function reportUploadVideo() {
                            var typeArryMap = {
                                'chapter': 'course_video_chapter_mode',
                                'multiple': 'course_video_section_mode'
                            };
                            var defaultParams = {
                                user_number: $rootScope.user.user_number,
                                course_number: $scope.courseNumber || '',
                                type: typeArryMap[$scope.courseMode],
                                stype: 'course_video_upload'
                            };
                            WAT.send('https://click.genshuixue.com/gs.gif', defaultParams);
                        }

                        //用名称检查课节 checkIndex  是否需要检查索引 多节模式下一定要 章节模式下如果章的索引不一样就不需要
                        function checkSectionListByName(sectionList, name, type, checkIndex) {
                            var checkInfo = '';
                            // 与已有课程对比
                            $.each(sectionList, function (index, item) {

                                if (type === 'name') { // 课节名
                                    if ((checkIndex && item['name'] === name && index !== $scope.index)
                                        || (!checkIndex && item['name'] === name)) {

                                        checkInfo = '第' + (index + 1) + '节同名，请修改!';
                                        return false;
                                    }
                                }
                                else if (type === 'videoName') { // 视频名 & 上传中视频名
                                    if ((checkIndex && (item['videoName'] === name || item['uploadingVideoName'] === name ) && index !== $scope.index)
                                        || (!checkIndex && item['videoName'] === name)) {

                                        checkInfo = '第' + (index + 1) + '节视频重复，请修改!';
                                        return false;
                                    }
                                }

                            });

                            return checkInfo;
                        }

                        //用名称检查章节
                        function checkChapterSectionsByName(name, type) {
                            var checkInfo = '';
                            // 与已有课程对比
                            $.each($scope.courseSchedule, function (index, item) {

                                var sectionCheckInfo1 = checkSectionListByName(item.sectionList, name, type, false);
                                var sectionCheckInfo2 = checkSectionListByName(item.sectionList, name, type, true);

                                if ((item.chapterIndex !== $scope.chapterIndex && sectionCheckInfo1)
                                    || (item.chapterIndex === $scope.chapterIndex && sectionCheckInfo2)) {

                                    checkInfo += '第' + (index + 1) + '章';

                                    if (item.chapterIndex !== $scope.chapterIndex) {
                                        checkInfo += sectionCheckInfo1;
                                    }
                                    else {
                                        checkInfo += sectionCheckInfo2;
                                    }
                                    return false;
                                }
                            });

                            return checkInfo;
                        }

                        //判断是否有重名/重视频的课节  type 取值 name/videoName
                        function hasRepeatedNameItem(name, type) {
                            var checkInfo = '';
                            if ($scope.courseMode === 'multiple') {
                                checkInfo = checkSectionListByName($scope.courseSchedule, name, type, true);
                            }
                            else {
                                checkInfo = checkChapterSectionsByName(name, type);
                            }
                            return checkInfo;
                        }

                        $scope.showChoiceMenu = false;
                        $scope.opts = $.extend({}, $scope.options);

                        //试听时常下拉框配置
                        $scope.trialMinutesOptions = {
                            defaultValue: $scope.opts.trialMinutes,
                            onSelected: function(data) {
                                $scope.opts.trialMinutes = data.value;
                            },
                            dataSource: [
                                {
                                    text: '整节试听',
                                    value: -1
                                }
                                // {
                                //     text: '试听前5分钟',
                                //     value: 5
                                // },
                                // {
                                //     text: '试听前10分钟',
                                //     value: 10
                                // }
                            ]
                        };

                        //视频来源选择菜单
                        $scope.toggleChoiceMenu = function () {
                            $scope.showChoiceMenu = !$scope.showChoiceMenu;
                        };

                        //保存
                        $scope.saveChange = function () {
                            var backupOpts = $scope.opts;
                            var enableTrial = backupOpts.enableTrial;
                            var videoId = backupOpts.videoId;
                            if (!backupOpts.name) {
                                utilService.showMessage('请填写课节名称');
                                return;
                            }
                            if (!enableTrial || (enableTrial === 'enable' && backupOpts.trialMinutes === '')) {
                                utilService.showMessage('请选择试听时长');
                                return;
                            }
                            var nameRemindInfo = hasRepeatedNameItem(backupOpts.name, 'name');
                            if (nameRemindInfo) {
                                utilService.showMessage('与' + nameRemindInfo);
                                return;
                            }
                            if (videoId !== '' && +videoId === 0) {
                                utilService.showMessage('视频id不能为0');
                                return;
                            }
                            $scope.options.name = backupOpts.name;
                            $scope.options.enableTrial = enableTrial;
                            $scope.options.trialMinutes = backupOpts.trialMinutes;
                            $scope.options.isEditing = false;
                            emitShowAddSectionBtnEvent({hasEditingItem:false});
                        };
                        //取消
                        $scope.cancelChange = function () {
                            $scope.options.isEditing = false;
                            emitShowAddSectionBtnEvent({hasEditingItem:false});
                        };

                        //从资料库选视频
                        $scope.selectVideoFromDisk = function () {
                            $scope.showChoiceMenu = false;
                            dialog.open({
                                title: '选择视频',
                                controller: require('module/main/selectFileFromDiskDialog/controller'),
                                width: 830,
                                skinClass: 'select-video-dialog',
                                resolve: {
                                    fileType: function () {
                                        return 'video';
                                    }
                                },
                                templateUrl: 'app/module/main/selectFileFromDiskDialog/tpl.html'
                            })
                            .then(function (data) {
                                var videoNameRemindInfo = hasRepeatedNameItem(data.name, 'videoName');
                                if (videoNameRemindInfo) {
                                    utilService.showMessage('与' + videoNameRemindInfo);
                                    return;
                                }

                                $scope.options.videoId = data.mediaId;
                                $scope.options.videoName = data.name;
                            });
                        };

                        //本地上传
                        $scope.uploadLocalVideo = function () {
                            reportUploadVideo();
                            $scope.showChoiceMenu = false;
                            var videoUploaderOpt = {
                                type: 'commonVideo',
                                from_type: 2,
                                checkStorageSpace: true,
                                validateFile: function (file) {
                                    var videoNameRemindInfo = hasRepeatedNameItem(file.name, 'videoName');
                                    //文件重名校验
                                    if (videoNameRemindInfo) {
                                        utilService
                                            .showMessage('与' + videoNameRemindInfo)
                                            .then(function () {
                                                $scope.options.videoUploading = false;
                                            }, function () {
                                                $scope.options.videoUploading = false;
                                            });
                                        return false;
                                    }
                                    else {
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = file.name;
                                    }
                                    return true;
                                }
                            };
                            /*
                            $scope.videoUploadParam = {
                                uploadedPercent: '0%'
                            };
                            */
                            $scope.options.videoUploadParam = {
                                uploadedPercent: '0%'
                            };

                            uploaderService
                            .upload(videoUploaderOpt)
                            .then(function (res) {

                                var videoParams = videoUploaderOpt.uploader.videoParams;
                                var videoId = videoParams.id;

                                videoCourseEditService
                                    .uploadVideoCallback({
                                        id: videoId
                                    })
                                    .then(function () {
                                        $scope.options.videoUploading = false;
                                        $scope.options.videoId = videoId;
                                        $scope.options.videoName = res.fileItem.file.name;
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = '';
                                    }, function () {
                                        $scope.options.videoUploading = false;
                                        $scope.options.videoUploadFailure = true;
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = '';
                                    });
                            },
                            function (data) {

                                if (data && data.errorType === 'errorBeforeUpload') {
                                    // 上传前检测出错误
                                }
                                else {

                                    utilService
                                    .showMessage({
                                        title: '温馨提示',
                                        content: '视频上传失败，请重新上传',
                                        okBtnText: '确定'
                                    });

                                    $scope.options.videoUploadFailure = true;
                                }

                                $scope.options.videoUploading = false;
                                // 正在上传中的视频文件名
                                $scope.options.uploadingVideoName = '';
                            });

                            videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                                $rootScope.safeApply(function () {
                                    $scope.options.videoUploadParam.uploadedPercent = data.percent;
                                    $scope.options.uploadedPercent = data.percent;
                                });
                            });


                            videoUploaderOpt.uploader.on('filechange', function () {
                                $scope.options.videoUploading = true;
                                $scope.options.videoUploadFailure = false;
                            });


                            // videoUploaderOpt.uploader.on('uploadstart', function () {
                            //     // $scope.videoUploading = true;
                            //     $scope.options.videoUploading = true;
                            // });
                        };
                    }
                };
            }
        ]);
});
