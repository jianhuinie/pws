/**
 * @file 添加视频弹窗 controller
 * @author niejianhui
 */
define(function (require) {
    'use strict';

    addVideoDialogCtrl.$inject = ['$rootScope', '$scope', 'cloudPlaybackService',
    'courseInfo', 'utilService', 'tipsService', 'uploaderService', 'dialog'];
    function addVideoDialogCtrl($rootScope, $scope, cloudPlaybackService,
        courseInfo, utilService, tipsService, uploaderService, dialog) {

        function initView () {
            $scope.course = courseInfo;
        }
        function doChangeVideo(params) {
            cloudPlaybackService
                .changeVideo({
                    data: {
                        fid: params.fid,
                        media_id: params.media_id,
                        file_name: params.fileName,
                        room_no: $scope.course.room_no
                    },
                    method: 'GET'
                })
                .then(function () {
                    tipsService.show({
                        type: 'success',
                        content: '更换成功'
                    })
                    .then(function () {
                        location.reload();
                    });
                });
        }
        initView();
        $scope.selectFormDisk = function () {
            $scope.dialog.dismiss();
            dialog.open({
                title: '选择视频',
                controller: require('module/detail/selectVideoDialog/controller'),
                width: 830,
                skinClass: 'select-video-fromdisk',
                templateUrl: 'app/module/detail/selectVideoDialog/tpl.html'
            })
            .then(function (data) {
                // 关联文件
                doChangeVideo({
                    fid: '',
                    media_id: data.mediaId,
                    fileName: data.name
                });
            });
        };
        $scope.localUpload = function () {
            $scope.dialog.dismiss();
            var videoUploaderOpt = {
                type: 'commonVideo',
                from_type: 5
            };
            uploaderService
            .upload(videoUploaderOpt)
            .then(function () {
                var videoParams = videoUploaderOpt.uploader.videoParams;
                $scope.course.videoUploading = false;
                doChangeVideo({
                    media_id: '',
                    fid: videoParams.fid,
                    fileName: videoParams.fileName
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
                }

                $scope.course.videoUploading = false;
                $scope.course.uploadedPercent = '';
            });
            videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                $rootScope.safeApply(function () {
                    $scope.course.uploadedPercent = data.percent;
                });
            });
            videoUploaderOpt.uploader.on('uploadstart', function () {
                $scope.course.uploadedPercent = '0%';
                $scope.course.videoUploading = true;
            });
        };
    }

    return addVideoDialogCtrl;
});
