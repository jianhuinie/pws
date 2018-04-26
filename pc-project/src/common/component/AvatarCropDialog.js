/**
 * @file 头像裁剪对话框
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var ImageCrop = require('imageCrop');
    var support = require('cc/util/support');

    /**
     * 头像裁剪
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


            var width = 700;
            var height = 410;

            var content = '';
            if (support.flash()) {
                content = '<div style="width: ' + width +'px;height: ' + height + 'px;">'
                        +     '<div class="image-crop"></div>'
                        + '</div>'
                        + '<div class="hint" style="font-size: 13px; color: #6d6d6e;">'
                        +     '<p class="text-primary" style="margin: 10px auto;">'
                        +         '<i class="icon icon-info-circle"></i>&nbsp;美观、清晰的头像能够提高36%的访问量哦！'
                        +     '</p>'
                        +     '<p>1. 请选择适合圆形和方形两种裁剪方式的头像图片，以保证头像正常展示</p>'
                        +     '<p>2. 保证五官清晰可见，给学生留下良好的印象</p>'
                        +     '<p>3. 使用真实的照片，是通过审核的必要条件</p>'
                        + '</div>';
            }
            else {
                content = '<div style="width: ' + width +'px;height: ' + height + 'px;">'
                        +     '<div class="image-crop"></div>'
                        + '</div>'
                        + '<div class="hint" style="font-size: 13px; color: #6d6d6e;">'
                        +     '<p class="text-primary" style="margin: 10px auto;">'
                        +         '<a style="float: right;" href="http://jingyan.baidu.com/article/148a1921bb9dc04d71c3b1dd.html" target="_blank" class="text-error">'
                        +             '点击查看《Flash插件安装指南》'
                        +         '</a>'
                        +         '<i class="icon icon-info-circle"></i>&nbsp;美观、清晰的头像能够提高36%的访问量哦！'
                        +     '</p>'
                        +     '<p>1. 请选择适合圆形和方形两种裁剪方式的头像图片，以保证头像正常展示</p>'
                        +     '<p>2. 保证五官清晰可见，给学生留下良好的印象</p>'
                        +     '<p>3. 使用真实的照片，是通过审核的必要条件</p>'
                        + '</div>';
            }


            me.dialog = new Dialog({
                title: '上传头像',
                content: content
            });

            var element = me.dialog.element;

            var imageCrop = new ImageCrop({
                element: element.find('.image-crop'),
                adaptive: true,
                width: width,
                height: height,
                action: '/user/previewBinaryImage',
                accept: 'png,jpg,jpeg,gif',
                minSize: 1,
                maxSize: 10 * 1024 * 1024,
                button: {
                    select: {
                        x: 180,
                        y: 370,
                        width: 80,
                        height: 36,
                        text: '选择图片'
                    },
                    upload: {
                        x: 270,
                        y: 370,
                        width: 80,
                        height: 36,
                        text: '确认使用'
                    },
                    rightRotate: {
                        x: 0,
                        y: 370,
                        width: 88,
                        height: 36,
                        text: '调整方向 ↻'
                    }
                },
                src: {
                    x: 0,
                    y: 0,
                    width: 350,
                    height: 350
                },
                dest: [
                    {
                        x: 400,
                        y: 0,
                        width: 150,
                        height: 150,
                        text: '方形 150X150'
                    },
                    {
                        x: 590,
                        y: 70,
                        width: 80,
                        height: 80,
                        text: '方形 80X80'
                    },
                    {
                        x: 400,
                        y: 183,
                        radius: 75,
                        text: '圆形 150X150'
                    },
                    {
                        x: 590,
                        y: 253,
                        radius: 40,
                        text: '圆形 80X80'
                    }
                ],
                onValidateError: function (data) {
                    console.log(data);
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