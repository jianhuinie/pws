/**
 * @file 添加语音和播放
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Uploader = require('custom/ui/Uploader');
    var AudioPlayer = require('audioPlayer');

    var maxSize = 5;
    var M_SIZE = 1024 * 1024;
    var accept = ['mp3'];

    var STATUS_NO_IMAGE = 0;
    var STATUS_IMAGE_UPLOADING = 1;
    var STATUS_IMAGE_UPLOAD_SUCCESS = 2;
    var STATUS_IMAGE_UPLOAD_FAILURE = -1;

    return Ractive.extend({
        template: require('html!./Audio.html'),
        data: function () {
            return {
                style: require('text!./Audio.styl'),
                index: '',
                progress: 0,

                status: STATUS_NO_IMAGE,
                STATUS_NO_IMAGE: STATUS_NO_IMAGE,
                STATUS_IMAGE_UPLOADING: STATUS_IMAGE_UPLOADING,
                STATUS_IMAGE_UPLOAD_SUCCESS: STATUS_IMAGE_UPLOAD_SUCCESS,
                STATUS_IMAGE_UPLOAD_FAILURE: STATUS_IMAGE_UPLOAD_FAILURE,

                options: {
                    url: '',
                    playing: false,
                    uploading: false,
                    storage_id: ''
                }
            };
        },
        onrender: function () {

            var me = this;
            var element = $(me.getElement()).find('input[type="file"]');

            if (me.get('options.url')) {
                me.set({
                    'status': STATUS_IMAGE_UPLOAD_SUCCESS
                });
            }

            var container = $(me.getElement());
            me.audioPlayer = new AudioPlayer({
                element: container.find('.view-audio-wrapper'),
                onPlayComplete: function (data) {
                    me.audioPlayer.stop();
                    me.set('options.playing', false);
                }
            });

            me.uploader = new Uploader({
                mainElement: element,
                multiple: false,
                ignoreError: true,
                action: '/tcenter/foundation/storage/upload-audio',
                data: '',
                fileName: 'attachment',
                onfilechange: function () {
                    var files = me.uploader.getFiles();
                    if (files.length !== 1) {
                        return;
                    }

                    me.set('status', STATUS_IMAGE_UPLOADING);
                    var fileItem = files[0];

                    var file = fileItem.file;
                    var error;

                    var index = $.inArray(file.type, accept);
                    if (index < 0) {
                        error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的音频';
                    }
                    else if (file.size > maxSize * M_SIZE) {
                        error = '请不要上传超过' + maxSize + 'M的内容';
                    }
                    if (error) {
                        me.set('status', STATUS_IMAGE_UPLOAD_FAILURE);
                        alert({
                            title: '温馨提示',
                            content: error,
                            type: 'error'
                        });
                        return;
                    }
                    me.uploader.upload(0);
                },
                onuploadstart: function () {
                    me.set('options.uploading', true);
                },
                onuploadprogress: function (e, data) {
                    me.set('progress', data.percent);
                },
                onuploadsuccess: function (e, data) {
                    if (data.responseText) {
                        var response = $.parseJSON(data.responseText);
                        if (response.code === 0) {
                            var url = response.data.url;
                            var id = response.data.id;
                            me.set({
                                'options.url': url,
                                'options.storage_id': id,
                                'status': STATUS_IMAGE_UPLOAD_SUCCESS
                            });
                        }
                    }
                },
                onuploaderror: function () {
                    me.set('status', STATUS_IMAGE_UPLOAD_FAILURE);
                    alert({
                        title: '温馨提示',
                        content: '上传错误，请重新上传',
                        type: 'error'
                    });
                },
                onuploadcomplete: function () {
                    me.set('options.uploading', false);
                }
            });

        },
        onteardown: function () {
            this.uploader.dispose();
            this.audioPlayer.dispose();
        },
        remove: function () {
            var me = this;
            if (me.get('options.storage_id')) {
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
        playAudio: function () {
            var me = this;
            var url = me.get('options.url');
            if (me.get('options.playing')) {
                me.audioPlayer.stop();
                me.set('options.playing', false);
            }
            else {
                me.audioPlayer.play(url);
                me.set('options.playing', true);
            }
        }
    });

});