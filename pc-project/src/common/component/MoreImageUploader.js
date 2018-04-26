/**
 * @file 多图片上传
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Uploader = require('cobble/ui/Uploader');
    var compressImage = require('../function/compressImage');
    var Zoom = require('cobble/ui/Zoom');
    var service = require('common/service');
    var stringUtil = require('cobble/util/string');

    /**
     * 图片上传
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {?string} options.action，默认为 /user/previewImage
     * @property {?number} options.maxCount 文件个数上线
     * @property {?number} options.maxSize 文件大小上限，单位为 M，默认为 5
     * @property {?boolean} options.watermark 添加水印，“photo”照片水印，“cert”认证水印，默认不加
     * @property {?number} options.previewWidth
     * @property {?number} options.previewHeight
     * @property {?boolean} options.zoomable
     * @property {?Function} options.onUploadStart
     * @property {?Function} options.onUploadProgress
     * @property {?Function} options.onUploadSuccess
     * @property {?Function} options.onUploadError
     * @property {?Function} options.onUploadComplete
     */
    function MoreImageUploader(options) {
        $.extend(this, MoreImageUploader.defaultOptions, options);
        this.init();
    }

    MoreImageUploader.prototype = {

        constructor: MoreImageUploader,

        init: function () {

            var me = this;
            var element = me.element;
            var maxSize = me.maxSize;

            var browseBtn = element.find('.btn-upload'); // 晒照片按钮
            var fileInput = $('<input type="file" />');
            browseBtn.append(fileInput);

            var image = element.find('.show-images'); // 反显上传图片
            var progressBar;

            var data = { };
            if (me.watermark == 'photo') {
                data.watermark = 1;
            }
            else if (me.watermark == 'cert') {
                data.watermark = 2;
            }

            me.status = 'waiting';


            var counter = 0; // 上传队列中有几张图片
            var countFile = 0; // 已成功上传展示出来的图片统计

            me.uploader = new Uploader({
                element: fileInput,
                multiple: true,
                ignoreError: true,
                accept: [ 'jpg', 'png', 'jpeg' ],
                action: me.action,
                data: data,
                fileName: 'attachment',
                onFileChange: function () {

                    var nei = this;

                    var files = this.getFiles();
                    var uploadFiles = []; // 验证之后图片上传

                    $.each(files, function (key, fileItem) {

                        if (fileItem) {
                            var file = fileItem.file;

                            var index = $.inArray(file.type, nei.accept);
                            if (index === -1) {
                                me.uploader.reset();
                                alert({
                                    title: '温馨提示',
                                    content: '文件格式错误，请上传 ' + nei.accept.join('、') + ' 等格式的图片',
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                                return;
                            }

                            if (maxSize && file.size / M_SIZE > maxSize) {
                                me.uploader.reset();
                                alert({
                                    title: '温馨提示',
                                    content: '请不要上传超过 ' + maxSize + 'M 的图片',
                                    buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                                return;
                            }

                            uploadFiles.push(fileItem);

                        }

                    });

                    if (countFile >= me.maxCount) { // 目前文件数目大于允许上传数目
                        files = '';
                        alert({
                            title: '温馨提示',
                            content: '最多只可上传5张照片哦~',
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    action: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else { // 还允许上传

                        var yu = me.maxCount - countFile; // 还允许上传文件数目

                        if (uploadFiles.length > yu) {
                            files = uploadFiles.slice(0, yu);
                        }
                        else {
                            files = uploadFiles;
                        }

                    }

                    nei.fileQueue.files = files;

                    counter = files.length;
                    nei.upload();
                },
                onUploadStart: function () {

                    this.disable();

                    me.status = 'uploading';

                    var progressGroup = $('<li data-no="">'
                                        +     '<span class="status">正在上传</span>'
                                        +     '<span class="progress">'
                                        +         '<span class="progress-bar"></span>'
                                        +     '</span>'
                                        + '</li>');
                    image.append(progressGroup);  // 试着为每张图片添加进度条

                    if ($.isFunction(me.onUploadStart)) {
                        me.onUploadStart();
                    }
                },
                onUploadProgress: function (e, data) {

                    var total = data.total;
                    var percent = total > 0
                                ? (data.uploaded / total)
                                : 1;

                    progressBar = image.find('.progress-bar').last();
                    progressBar.width(percent * 100 + '%');

                    if ($.isFunction(me.onUploadProgress)) {
                        me.onUploadProgress();
                    }
                },
                onUploadSuccess: function (e, data) {

                    me.status = 'success';

                    progressBar.width(0);
                    var progress = progressBar.closest('.progress');
                    progress.prev('.status').remove();
                    progress.remove();

                    if (data.responseText) {
                        var response = $.parseJSON(data.responseText);
                        var lastLi = image.find('li:last-child');

                        if (response.code === 0) {

                            var url = response.data.url;
                            var img = $(
                                '<div class="mask"></div><img src="'
                              + compressImage({
                                    url: url,
                                    width: me.previewWidth,
                                    height: me.previewHeight
                                })
                              + '" />'
                            );

                            var picAction = '<div class="action">'
                                          +      '<span class="rename">'
                                          +          '<i class="icon icon-edit-o"></i>'
                                          +      '</span>'
                                          +      '<span class="del">'
                                          +          '<i class="icon icon-close"></i>'
                                          +      '</span>'
                                          +  '</div>';

                            var nameInput = '<div class="form-group">'
                                          +      '<input type="hidden" name="id" value="' + response.data.id + '">'
                                          +      '<input class="form-text caption-input" type="text" name="caption" maxlength="14" placeholder="点击输入标题">'
                                          +      '<span class="error"></span>'
                                          +  '</div>';

                            lastLi.append(img).append(picAction).append(nameInput);

                            if (me.zoomable) {
                                new Zoom({
                                    element: img,
                                    finder: element.find('.image-finder'),
                                    viewport: element.find('.image-viewport'),
                                    url: url
                                });
                            }

                            me.data = response.data;

                            // 上传队列中的图片们
                            counter--;

                            if (counter === 0) {
                                this.enable();  // 当前上传队列中所有图片上传成功，才可打开晒照片按钮
                            }

                            // 已展示出来的图片们
                            countFile++;
                            if (countFile >= 5) {
                                this.disable();
                                browseBtn.removeClass('btn-primary').addClass('btn-gray');
                            }
                        }
                        else {
                            error('该张图片上传失败，重新选择上传');
                            lastLi.remove();
                            // 上传队列中的图片们
                            counter--;
                            if (counter === 0) {
                                this.enable();  // 当前上传队列中所有图片上传成功，才可打开晒照片按钮
                            }
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

                    this.reset();
                    if ($.isFunction(me.onUploadComplete)) {
                        me.onUploadComplete();
                    }
                }
            });

            if (browseBtn.find('input[type="file"]').length === 0) {
                browseBtn.find('.supload').remove(); // object上传，暂不支持
            }
            else if (browseBtn.find('input[type="file"]').length > 1) {
                browseBtn.find('form').eq(0).remove();
            }

            element
            .on('click', '.btn-upload', function (e) {
                var target = $(e.currentTarget);
                if (target.find('input[type="file"]').length === 0) {
                    alert({
                        title: '温馨提示',
                        content: '该功能暂不支持低版本浏览器',
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            })

            .on('mouseenter', '.show-images li', function (e) {
                var element = $(this);
                var action = element.find('.action');
                action.show();
            })

            .on('mouseleave', '.show-images li', function (e) {
                var element = $(this);
                var action = element.find('.action');
                action.hide();
            })

            .on('click', '.rename', function (e) {
                var target = $(e.currentTarget);
                var action = target.closest('.action');
                var captionGroup = action.next('.form-group');
                var captionElement = captionGroup.find('.caption');
                var caption = captionElement.html();
                var input = captionGroup.find('.caption-input');

                if (captionElement.length) {
                    captionElement.hide();
                    input.show();
                    input.val(caption);
                }

                input.focus();

            })

            .on('focusout', '.caption-input', function () {
                var input = $(this);
                var captionGroup = input.closest('.form-group');
                var captionElement = captionGroup.find('.caption');

                var value = $.trim(input.val());

                if (captionElement.length == 0) {
                    if (value) {
                        captionElement = $('<span class="caption"></span>');
                        captionGroup.prepend(captionElement);
                        captionElement.text(value);
                        input.hide();
                    }
                }
                else {
                    captionElement.text(value);
                    captionElement.show();
                    input.hide();
                }

            })

            .on('click', '.del', function (e) {
                var target = $(e.currentTarget);
                var action = target.closest('.action');
                var captionGroup = action.next('.form-group');
                var id = captionGroup.find('input[name="id"]').val();

                if (counter == 0) { // 队列中没有图片
                    service
                    .delCommentImg({
                        storageId: id
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            target.closest('.upload-pics').find('.button').prop('disabled',false);
                            target.closest('li').remove();
                            countFile = image.find('li').length;
                            if (countFile < 5) { // 且已上传图片少于5张
                                browseBtn.removeClass('btn-gray').addClass('btn-primary');
                                me.uploader.enable();
                            }
                        }
                    });

                }
            });


        }
    };

    MoreImageUploader.defaultOptions = {
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

    return MoreImageUploader;

});