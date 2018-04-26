/**
 * @file 富文本音频
 * @author niejianhui
 *
 */
define(function (require) {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorAudio', ['$rootScope', 'uploaderService', 'utilService',
         function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.storageId 资源存储id
             * options.url 音频资源地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorAudio/tpl.html',
            link: function ($scope, element) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.uploadAudio = function () {
                    $scope.audioUploading = false;
                    var audioUploadParam = {
                        type: 'audio',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.audioUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                        .upload(audioUploadParam)
                        .then(function (response) {
                            var res = utilService.JSON.parse(response.responseText);
                            var data = res.data;
                            $scope.options.storageId = data.id;
                            $scope.options.url = data.url;
                            $scope.audioUploading = false;
                            emitUploadingEvent(false);
                        }, function (res) {
                            $scope.audioUploading = false;
                            emitUploadingEvent(false);
                            utilService.showMessage(res.message || res.msg);
                        });
                    audioUploadParam.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.audioUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    audioUploadParam.uploader.on('uploadstart', function () {
                        emitUploadingEvent(true);
                        $scope.audioUploading = true;
                    });
                };
            }
        };
    }]);
});
