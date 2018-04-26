/**
 * @file 图片上传
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Uploader = require('cobble/ui/Uploader');
    var compressImage = require('../function/compressImage');
    var Zoom = require('cobble/ui/Zoom');

    /**
     * 图片上传
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {?string} options.action，默认为 /user/previewImage
     * @property {?number} options.maxSize 文件大小上限，单位为 M，默认为 5
     * @property {?boolean} options.watermark 添加水印，“photo”照片水印，“cert”认证水印，默认不加
     * @property {?number} options.previewWidth
     * @property {?number} options.previewHeight
     * @property {?boolean} options.zoomable 放大镜功能
     * @property {?Function} options.onUploadStart
     * @property {?Function} options.onUploadProgress
     * @property {?Function} options.onUploadSuccess
     * @property {?Function} options.onUploadError
     * @property {?Function} options.onUploadComplete
     */
    function ImageUploader(options) {
        $.extend(this, ImageUploader.defaultOptions, options);
        this.init();
    }

    ImageUploader.prototype = {

        constructor: ImageUploader,

        init: function () {

            var me = this;
            var element = me.element;
            var maxSize = me.maxSize;

            var browseBtn = element.find('.image-browse');
            var fileInput = $('<input type="file" />');
            browseBtn.append(fileInput);

            var image = element.find('.image');
            var progressBar = element.find('.progress-bar');

            var data = { };
            if (me.watermark == 'photo') {
                data.watermark = 1;
            }
            else if (me.watermark == 'cert') {
                data.watermark = 2;
            }

            me.status = 'waiting';

            me.uploader = new Uploader({
                element: fileInput,
                accept: [ 'jpg', 'png', 'jpeg' ],
                action: me.action,
                data: data,
                fileName: 'attachment',
                onFileChange: function () {
                    var fileItem = this.getFiles()[0];
                    if (fileItem) {

                        var file = fileItem.file;

                        var index = $.inArray(file.type, this.accept);
                        if (index === -1) {
                            alert('文件格式错误，请上传 ' + this.accept.join('、') + ' 等格式的图片');
                            return;
                        }

                        if (maxSize && file.size / M_SIZE > maxSize) {
                            alert('请不要上传超过 ' + maxSize + 'M 的图片');
                            return;
                        }

                        this.upload();

                    }
                },
                onUploadStart: function () {

                    me.status = 'uploading';

                    browseBtn.prop('disabled', true);

                    if ($.isFunction(me.onUploadStart)) {
                        me.onUploadStart();
                    }
                },
                onUploadProgress: function (e, data) {

                    var total = data.total;
                    var percent = total > 0
                                ? (data.uploaded / total)
                                : 1;

                    progressBar.width(percent * 100 + '%');

                    if ($.isFunction(me.onUploadProgress)) {
                        me.onUploadProgress();
                    }
                },
                onUploadSuccess: function (e, data) {

                    me.status = 'success';

                    if (data.responseText) {
                        var response = $.parseJSON(data.responseText);
                        if (response.code === 0) {

                            image.find('img').remove();

                            var url = response.data.url;
                            var img = $(
                                        '<img src="'
                                      + compressImage({
                                            url: url,
                                            width: me.previewWidth,
                                            height: me.previewHeight
                                        })
                                      + '" />'
                                    );

                            image.append(img);

                            if (me.zoomable) {
                                new Zoom({
                                    element: img,
                                    finder: element.find('.image-finder'),
                                    viewport: element.find('.image-viewport'),
                                    url: url
                                });
                            }

                            me.data = response.data;
                        }
                    }

                    if ($.isFunction(me.onUploadSuccess)) {
                        me.onUploadSuccess();
                    }
                },
                onUploadError: function () {

                    me.status = 'error';

                    error('预览失败');
                    me.data = null;

                    if ($.isFunction(me.onUploadError)) {
                        me.onUploadError();
                    }
                },
                onUploadComplete: function () {

                    me.status = 'waiting';

                    browseBtn.prop('disabled', false);
                    progressBar.width(0);

                    this.reset();

                    if ($.isFunction(me.onUploadComplete)) {
                        me.onUploadComplete();
                    }
                }
            });
        }
    };

    ImageUploader.defaultOptions = {
        maxSize: 5,
        action: '/user/previewImage'
    };

    /**
     * 1M 字节数
     *
     * @const
     * @type {number}
     */
    var M_SIZE = 1024 * 1024;

    return ImageUploader;

});