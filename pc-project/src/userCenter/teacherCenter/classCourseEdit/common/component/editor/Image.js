/**
 * @file 添加图片
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Uploader = require('custom/ui/Uploader');
    var compressImage = require('userCenter/common/function/compressImage');

    var maxSize = 5;
    var M_SIZE = 1024 * 1024;
    var accept = [ 'jpg', 'png', 'jpeg' ];

    var STATUS_NO_IMAGE = 0;
    var STATUS_IMAGE_UPLOADING = 1;
    var STATUS_IMAGE_UPLOAD_SUCCESS = 2;
    var STATUS_IMAGE_UPLOAD_FAILURE = -1;

    return Ractive.extend({
        template: require('html!./Image.html'),
        data: function () {
            return {
                style: require('text!./Image.styl'),
                index: '',
                progress: 0,

                status: STATUS_NO_IMAGE,
                STATUS_NO_IMAGE: STATUS_NO_IMAGE,
                STATUS_IMAGE_UPLOADING: STATUS_IMAGE_UPLOADING,
                STATUS_IMAGE_UPLOAD_SUCCESS: STATUS_IMAGE_UPLOAD_SUCCESS,
                STATUS_IMAGE_UPLOAD_FAILURE: STATUS_IMAGE_UPLOAD_FAILURE,

                options: {
                    url: '',
                    width: '',
                    height: '',
                    size: '',
                    watermark: '',
                    storage_id: '',
                    uploading: false
                }
            };
        },
        onrender: function () {

            var me = this;
            var element = $(me.getElement()).find('input[type="file"]');

            if (me.get('options.url')) {
                me.set({
                    status: STATUS_IMAGE_UPLOAD_SUCCESS
                });
            }

            //水印参数  “photo”照片水印，“cert”认证水印，默认不加
            var data = { };
            if (me.get('options.watermark') === 'photo') {
                data.watermark = 1;
            }
            else if (me.get('options.watermark') === 'cert') {
                data.watermark = 2;
            }
            
            me.uploader = new Uploader({
                mainElement: element,
                multiple: false,
                ignoreError: true,
                action: '/tcenter/foundation/storage/upload-image',
                data: data,
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
                        error = '文件格式错误，请上传 ' + accept.join('、') + ' 等格式的图片';
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
                            me.set({
                                'options.url': url,
                                'options.storage_id': response.data.id,
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
        }
    });

});