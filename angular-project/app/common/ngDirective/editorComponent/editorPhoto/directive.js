/**
 * @file 富文本图片
 * @author niejianhui
 *
 */
define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorPhoto', ['$rootScope', 'uploaderService', 'utilService', 
        function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.storageId 资源存储id
             * options.url   图片地址
             * options.refer_url   图片跳转地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorPhoto/tpl.html',
            link: function ($scope) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.imgOptions = {
                    width: 240,
                    height: 136,
                    imgSrc: $scope.options.url
                };
                $scope.uploadImage = function () {
                    $scope.imgUploading = false;
                    var imgUploaderOpt = {
                        type: 'pic',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.imgUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(imgUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.options.storageId = data.id;
                        $scope.options.url = data.url;
                        $scope.imgOptions.imgSrc = data.url;
                        $scope.imgUploading = false;
                        emitUploadingEvent(false);
                    }, function (res) {
                        $scope.imgUploading = false;
                        emitUploadingEvent(false);
                        utilService.showMessage(res.message || res.msg);
                    });
                    imgUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.imgUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    imgUploaderOpt.uploader.on('uploadstart', function () {
                        emitUploadingEvent(true);
                        $scope.imgUploading = true;
                    });
                };
            }
        };
    }]);
});
