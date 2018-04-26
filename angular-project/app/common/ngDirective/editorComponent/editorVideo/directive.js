/**
 * @file 富文本视频
 * @author niejianhui
 *
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorVideo', ['$rootScope', 'uploaderService', 'utilService',
        function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.videoId 视频ID
             * options.coverUrl   封面图地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorVideo/tpl.html',
            link: function ($scope) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.imgOptions = {
                    width: 240,
                    height: 136,
                    imgSrc: $scope.options.coverUrl
                };
                $scope.imgUrl = '';
                $scope.uploadVideo = function () {
                    var videoUploaderOpt = {
                        type: 'commonVideo',
                        maxSize: 250,
                    };
                    $scope.videoUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(videoUploaderOpt)
                    .then(function (res) {
                        // var response = JSON.parse(res.responseText);
                        var videoParams = videoUploaderOpt.uploader.videoParams;
                        $scope.options.videoId = videoParams.id;
                        $scope.options.coverUrl = videoParams.cover;
                        $scope.imgOptions.imgSrc = videoParams.cover;
                        $scope.videoUploading = false;
                        emitUploadingEvent(false);
                    },
                    function (data) {
                        $scope.videoUploading = false;
                        emitUploadingEvent(false);

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

                    });
                    videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.videoUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    videoUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.videoUploading = true;
                        emitUploadingEvent(true);
                    });
                };
            }
        };
    }]);
});
