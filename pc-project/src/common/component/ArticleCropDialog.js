/**
 * @file 文章封面裁剪对话框
 * @author jixiaohui
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var ImageCrop = require('imageCrop');

    /**
     * 文章封面裁剪
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

            var width = 685;
            var height = 385;

            me.dialog = new Dialog({
                title: '上传封面',
                content: '<div style="width: ' + width +'px;height: ' + height + 'px;">'
                       +    '<div class="image-crop"></div>'
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
                        x: 110,
                        y: 350,
                        width: 80,
                        height: 30,
                        text: '选择图片'
                    },
                    upload: {
                        x: 260,
                        y: 350,
                        width: 80,
                        height: 30,
                        text: '保存图片'
                    },
                    leftRotate: {
                        x: 0,
                        y: 350,
                        width: 40,
                        height: 30,
                        text: '左转'
                    },
                    rightRotate: {
                        x: 410,
                        y: 350,
                        width: 40,
                        height: 30,
                        text: '右转'
                    }
                },

                src: {
                    x: 0,
                    y: 0,
                    width: 450,
                    height: 330
                },

                dest: [
                    {
                        x: 480,
                        y: 0,
                        width: 200,
                        height: 112,
                        text: '200x112'
                    },
                    {
                        x: 494,
                        y: 180,
                        width: 172,
                        height: 96,
                        text: '172x96'
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
            this.dialog.dispose();
        }

    };

    return ImageCropDialog;

});