/**
 * @file 添加视频和播放
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var VideoUploader = require('userCenter/common/biz/VideoUploader');
    var service = require('../../service');
    var VideoDialog = require('userCenter/common/biz/VideoDialog');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');

    var STATUS_NO_IMAGE = 0;
    var STATUS_IMAGE_UPLOADING = 1;
    var STATUS_IMAGE_UPLOAD_SUCCESS = 2;
    var STATUS_IMAGE_UPLOAD_FAILURE = 3;

    var maxSize = 150;
    var M_SIZE = 1024 * 1024;

    return Ractive.extend({
        template: require('html!./Video.html'),
        data: function () {
            return {
                style: require('text!./Video.styl'),
                index: '',
                progress: 0,
                sourceDir: siteData.source,

                status: STATUS_NO_IMAGE,
                STATUS_NO_IMAGE: STATUS_NO_IMAGE,
                STATUS_IMAGE_UPLOADING: STATUS_IMAGE_UPLOADING,
                STATUS_IMAGE_UPLOAD_SUCCESS: STATUS_IMAGE_UPLOAD_SUCCESS,
                STATUS_IMAGE_UPLOAD_FAILURE: STATUS_IMAGE_UPLOAD_FAILURE,

                options: {
                    video_id: '',
                    cover: '',
                    uploading: false
                }
            };
        },
        oncomplete: function () {
            var me = this;
            var container = $(me.getElement());

            if (me.get('options.video_id')) {
                me.set({
                    'status': STATUS_IMAGE_UPLOAD_SUCCESS
                });
            }

            var mainElement = container.find('input[type="file"]');

            if (mainElement.length) {
                me.uploader = new VideoUploader({
                    mainElement: mainElement,
                    name: 'file',
                    validateVideo: me.get('validateVideo'),
                    maxSize: 250 * VideoUploader.M,
                    maxSizeError: '上传的视频不能超过250M',
                    getUploadUrl: function (data) {
                        return service
                        .getVideoUploadUrl({
                            fileName: data.videoName,
                            fileSize: data.videoSize,
                            cndHost: data.cdnHost,
                        })
                        .then(function (response) {
                            var data = response.data;
                            me.set({
                                'options.video_id': data.id,
                                'options.cover': data.cover
                            });
                            return {
                                id: data.id,
                                url: data.upload_url
                            };
                        });
                    },
                    getResumeUploadUrl: function (data) {
                        return service
                        .getVideoResumeUploadUrl({
                            videoId: data.uploadId
                        })
                        .then(function (response) {
                            var data = response.data;
                            return {
                                id: data.id,
                                url: data.upload_url,
                                uploaded: data.upload_size
                            };
                        });
                    },
                    onFileChange: function () {
                        var uploader = me.uploader;
                        var currentFiles = uploader.currentFiles;
                        if (currentFiles.length !== 1) {
                            return;
                        }
                        if (!uploader.validateFile(currentFiles[0])) {
                            uploader.reset();
                            return;
                        }
                        uploader.autoUpload(currentFiles[0]);
                    },
                    onUploadStart: function (data) {
                        me.set({
                            status: STATUS_IMAGE_UPLOADING,
                            'options.uploading': true
                        });
                    },
                    onUploadProgress: function (data) {
                        me.set({
                            progress: data.percent
                        });
                    },
                    onUploadSuccess: function (data) {
                        service.uploadSuccCallback({
                            id: me.get('options.video_id')
                        });
                        me.set({
                            status: STATUS_IMAGE_UPLOAD_SUCCESS
                        });
                    },
                    onChunkUploadError: function (data) {
                        alert({
                            type: 'error',
                            content: '上传错误，请重新上传'
                        });
                    },
                    onUploadError: function (data) {
                        alert({
                            type: 'error',
                            content: '上传错误，请重新上传'
                        });
                    },
                    onUploadComplete: function () {
                        me.set('options.uploading', false);
                        me.uploader.reset();
                    }
                });
            }

        },
        onteardown: function () {
            if (this.uploader) {
                this.uploader.dispose();
            }
        },
        remove: function () {
            var me = this;
            if (me.get('options.video_id')) {
                alert({
                    title: '温馨提示',
                    content: '您确认删除吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                me.fire(
                                    'remove',
                                    {
                                        index: me.get('index')
                                    }
                                );
                                this.hide();
                            }
                        },
                        {
                            text: '取消',
                            type: '',
                            action: function () {
                                this.hide();
                            }
                        }
                    ]
                })
            }
            else {
                me.fire(
                    'remove',
                    {
                        index: me.get('index')
                    }
                );
            }
        },
        playVideo: function (data) {
            var me = this;
            var url = '/tcenter/foundation/storage/get-video-info?id=' + this.get('options.video_id')
            $.ajax({
                url: url,
                method: 'get',
                success: function(response) {
                    if (response.data.status == 70) {
                        new VideoDialog({
                            url: response.data.pc_play_url
                        });
                        me.set('options.cover', response.data.preface_url);
                    }
                    else {
                        alert({
                            type: 'error',
                            content: '视频正在转码中...'
                        });
                    }
                }
            });
        }
    });

});