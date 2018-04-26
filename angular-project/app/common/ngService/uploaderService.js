/**
 * @file uploader service
 * @author hurry
 */
define(function (require) {
    'use strict';
    var Uploader = require('cc/ui/Uploader');
    var fileTypes = 'mp4/.avi/.wmv/.rm/.rmvb/.mov/.flv/.mpg/.mpeg/.mkv/.3gp';
    var M_SIZE = 1024 * 1024;

    /**
     * 这里为了兼容后端接口  配置了 3个 上传视频的URL  和后端沟通好了 以后统一走 commonVideo
     */
    var actions = {
        pic: '/api/tcenter/foundation/storage/upload-image',
        video: '/api/disk/get-upload-info',
        commonVideo: '/api/tcenter/foundation/storage/get-upload-video-url',
        localVideo: '/api/video_course/getUploadUrl',
        audio: '/api/tcenter/foundation/storage/upload-audio'
    };
    var acceptType = {
        pic: 'image/png,image/jpeg',
        video: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        commonVideo: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        localVideo: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        audio: 'audio/mp3'
    };
    var className = {
        pic: 'upload-file-pic',
        video: 'upload-file-video',
        commonVideo: 'upload-file-video',
        localVideo: 'upload-file-video',
        audio: 'upload-file-audio'
    };
    var M = 1024 * 1024;
    angular
        .module('Manage.services')
        .factory('uploaderService', ['$q', 'ajaxService', 'utilService', 'storageInfo', 
        function ($q, ajaxService, utilService, storageInfo) {
            var getUploadUrl = function (uploader, fileItem, opts) {
                var params = fileItem.file;
                var url = '/api/disk/get-upload-info';
                var uploadType = opts.type;
                if (uploadType) {
                    url = actions[uploadType];
                }
                //参数做处理  两个后端接口定的字段名不一样。。。
                if (uploadType && uploadType === 'commonVideo') {
                    var file = fileItem.file;
                    var paramsData = {
                        filename: file.name,
                        total_size: file.size,
                        from_type: opts.from_type || 9
                    };
                    params = {
                        data: paramsData,
                        method: 'GET'
                    };
                }
                //post请求
                else {
                    if (opts.path) {
                        params = $.extend({}, params,
                            {
                            path: opts.path
                        });
                    }
                    if (opts.authToken) {
                        params = $.extend({}, params,
                            {
                                auth_token: opts.authToken
                            });
                    }
                }

                ajaxService.send(url, params)
                    .then(function (res) {
                        var data = res.data;
                        uploader.set({
                            'action': data.upload_url,
                            'useChunk': true,
                            'chunkSize': 5 * M
                        });
                        uploader.videoParams = {
                            id: data.id,
                            cover: data.cover,
                            fid: data.fid,
                            fileName: fileItem.file.name
                        };
                        uploader.upload(0);
                    });
            };

            var uploader;

            return {
                /**
                 * 使用 HTML5 ajax 上传
                 *
                 * @param {Object} options
                 * @property {string} options.action 上传地址
                 * @property {boolean=} options.multiple 是否支持多文件上传
                 * @property {string} options.type 类型: 'pic/video/audio'
                 * @property {Object=} options.data 上传的其他数据
                 * @property {Object=} options.header 请求头
                 * @property {Array.<string>=} options.accept 可上传的文件类型，如
                 *                                            [ 'jpg', 'png' ]
                 * @property {boolean=} options.useChunk 是否使用分片上传
                 * @property {number=} options.chunkSize 分片大小
                 * @property {boolean=} options.isCheckType 是否区分类型  默认是false
                 * @property {number=} options.from_type 视频上传类型
                 * @property {string=} options.path 上传路径
                 * @property {string=} options.authToken auth_token
                 * @property {string=} options.maxSize 上传文件的大小限制  单位M
                 * @property {function=} options.validateFile 上传文件之前校验函数  不满足条件终值上传 返回值true  false
                 * @property {boolean=} options.checkStorageSpace 上传文件之前校验存储空间 默认false
                 *
                 */
                upload: function (options) {
                    var deferred = $q.defer();
                    var inputFile = $('.' + className[options.type]);
                    inputFile.remove();
                    // if (!inputFile.length) {
                        var file = ''
                            + '<input type="file" name="file" '
                            +   'accept="'
                            +       acceptType[options.type]
                            +   '" style="display:none"'
                            +   ' class="' + className[options.type] + '"/>';
                        inputFile = $(file);
                        $(document.body).append(inputFile);
                    // }
                    // hurry: 成功统一处理函数
                    function successHandler(e, data) {
                        //如果上传的是视频文件 上传视频接口成功返回的是1.。。
                        var nativeFile = data.fileItem.nativeFile;
                        if (nativeFile && nativeFile.type.indexOf('video') > -1) {
                            var response = JSON.parse(data.responseText);
                            if (+response.code === 1) {
                                deferred.resolve(data);
                            }
                            else {
                                deferred.reject(data);
                            }
                        }
                        else {
                                deferred.resolve(data);
                        }
                    }
                    var defaultOptions = {
                        header: {
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        fileName: 'attachment',
                        mainElement: inputFile,
                        action: actions[options.type],
                        onuploadsuccess: function (e, data) {
                            successHandler(e, data);
                        },
                        onchunkuploadsuccess: function (e, data) {
                            // 视频分片上传部分失败
                            var nativeFile = data.fileItem.nativeFile;
                            if (nativeFile && nativeFile.type.indexOf('video') > -1) {
                                var response = JSON.parse(data.responseText);
                                if (+response.code === 1) {
                                    // deferred.resolve(data);
                                }
                                else {
                                    e.isDefaultPrevented = function () {
                                        return true;
                                    };
                                    // uploader.stop(0);
                                    deferred.reject(data);
                                }
                            }
                        },
                        onuploaderror: function (e, data) {
                            deferred.reject(data);
                        },
                        // onuploadprogress: function (e, data) {
                        //    console.log(data)
                        // },
                        onuploadcomplete: function () {
                            uploader.dispose();
                        }
                    };
                    var opts = $.extend({}, defaultOptions, options);
                    uploader = new Uploader(opts);
                    options.uploader = uploader;
                    uploader.on('filechange', function () {
                        var error;
                        var maxSize = options.maxSize || '';
                        var fileItem = uploader.getFiles(0)[0];
                        var file = fileItem.file;
                        var name = file.name;

                        if (name.length > 40 || name.indexOf('/') > 0) {
                            error = '文件名称太长或名称含有特殊字符';
                        }
                        else if (maxSize && file.size > maxSize * M_SIZE) {
                            error = '请不要上传超过' + maxSize + 'M的内容';
                        }

                        if (error) {
                            utilService
                                .showMessage({
                                    title: '温馨提示',
                                    content: error,
                                    okBtnText: '确定',
                                    cancelBtnText: '取消',
                                    hideCancel: true
                                })
                                .then(function () {
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                }, function () {
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                });
                            return false;
                        }

                        //上传前对文件的校验函数
                        if (options.validateFile && $.isFunction(options.validateFile) && !options.validateFile(file)) {
                            return false;
                        }

                        //继续上传处理
                        var continueUploadAction = function () {
                            if (options.type === 'video'
                                || options.type === 'localVideo'
                                || options.type === 'commonVideo'
                            ) {
                                getUploadUrl(uploader, fileItem, opts);
                            }
                            else if (options.isCheckType) {
                                uploader.set('action', '/api/disk/upload');
                                var type = fileItem.file.type;

                                if (fileTypes.indexOf(type) >= 0) {
                                    getUploadUrl(uploader, fileItem, opts);
                                }
                                else {
                                    uploader.upload(0);
                                }
                            }
                            else {
                                uploader.upload(0);
                            }
                        };

                        //校验存储空间是否够
                        if (options.checkStorageSpace) {
                            storageInfo().then(function (response) {
                                var data = response.data;
                                var remainStorageSpace = data.max_size - data.used_size;
                                if (remainStorageSpace < file.size) {
                                    utilService
                                        .showMessage({
                                            title: '温馨提示',
                                            content: '您的存储空间不足，请购买存储空间后上传',
                                            hideCancel: false,
                                            okBtnText: '购买存储空间',
                                            okHandler: function () {
                                                var skipUrl = 'https://www.genshuixue.com/teacher_center/storage_space';
                                                if (data.user_role === 6) {
                                                    skipUrl = 'https://ziliao.genshuixue.com/main.html#/storageSpace';
                                                }
                                                window.open(skipUrl);
                                            }
                                        });
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                    return false;
                                }
                                else {
                                    continueUploadAction();
                                }
                            });
                        }
                        else {
                            continueUploadAction();
                        }
                    });
                    inputFile.click();
                    return deferred.promise;
                },
                stop: function (uploader) {
                    uploader.stop(0);
                }
            };
        }]);
});