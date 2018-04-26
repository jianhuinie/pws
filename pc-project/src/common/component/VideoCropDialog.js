/**
 * @file 视频课封面裁剪对话框
 * @author jixiaohui
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var ImageCrop = require('imageCrop');

    /**
     * 视频课封面裁剪
     *
     * @param {Object} options
     * @property {?Function} options.onUploadComplete 上传完成后触发
     */
    function ImageCropDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ImageCropDialog.prototype = {

        init: function () {

            var me = this;

            var width = 825;
            var height = 465;

            me.dialog = new Dialog({
                title: '上传封面',
                content: '<div style="width: ' + width +'px;height: ' + height + 'px;">'
                       +    '<div class="image-crop"></div>'
                       +    '<div class="actions">'
                       +        '<div class="rotate">'
                       +        '</div>'
                       +        '<div class="save-cancel">'
                       +            '<!--<button class="btn-default">选择图片</button>-->'
                       +        '</div>'
                       +    '</div>'
                       + '</div>'
            });

            var element = me.dialog.element;

            var imageCrop = new ImageCrop({
                element: element.find('.image-crop'),
                width: width,
                height: height,

                action: '/user/previewBinaryImage',

                accept: 'png,jpg,jpeg,gif',
                minSize: 1,
                maxSize: 5 * 1024 * 1024,

                button: {
                    select: {
                        x: 160,
                        y: 430,
                        width: 80,
                        height: 30,
                        text: '选择图片'
                    },
                    upload: {
                        x: 260,
                        y: 430,
                        width: 80,
                        height: 30,
                        text: '保存图片'
                    },
                    leftRotate: {
                        x: 0,
                        y: 430,
                        width: 40,
                        height: 30,
                        text: '左转'
                    },
                    rightRotate: {
                        x: 460,
                        y: 430,
                        width: 40,
                        height: 30,
                        text: '右转'
                    }
                },

                src: {
                    x: 0,
                    y: 0,
                    width: 500,
                    height: 400
                },

                dest: [
                    {
                        x: 520,
                        y: 0,
                        width: 300,
                        height: 200,
                        text: '300x200'
                    },
                    {
                        x: 580,
                        y: 230,
                        width: 180,
                        height: 120,
                        text: '180x120'
                    },
                    {
                        x: 620,
                        y: 380,
                        width: 100,
                        height: 66,
                        text: '100x66'
                    }
                ],

                onValidateError: function (data) {
                    //console.log(data);
                },

                onUploadComplete: function (data) {

                    // flash 封装了一层
                    var response = data.data;

                    if ($.type(response) === 'string') {
                        response = $.parseJSON(response);
                    }

                    if (response.code !== 0 && response.msg) {
                        alert(response.msg);
                    }

                    if ($.isFunction(me.onUploadComplete)) {
                        me.onUploadComplete(response);
                    }
                }
            });
        },

        hide: function () {
            this.dialog.hide();
        }

    };

    return ImageCropDialog;

});