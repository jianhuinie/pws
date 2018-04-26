/**
 * @file 班课图片裁剪对话框
 * @author liucong
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var ImageCrop = require('imageCrop');

    /**
     * 班课图片裁剪
     *
     * @param {Object} options
     * @property {?Function} options.onUploadComplete 上传完成后触发
     */
    function ClassPhotoCropDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ClassPhotoCropDialog.prototype = {

        init: function () {

            var me = this;

            var width = 825;
            var height = 445;

            me.dialog = new Dialog({
                title: '上传封面',
                content: '<div style="width: ' + width +'px;height: ' + height + 'px;">'
                       +     '<div class="image-crop"></div>'
                       + '</div>'
            });

            var element = me.dialog.element;

            var imageCrop = me.imageCrop = new ImageCrop({
                element: element.find('.image-crop'),
                width: width,
                height: height,

                action: '/user/previewBinaryImage',

                accept: 'png,jpg,jpeg',
                minSize: 1,
                maxSize: 10 * 1024 * 1024,

                button: {
                    select: {
                        x: 560,
                        y: 380,
                        width: 80,
                        height: 30,
                        text: '选择图片'
                    },
                    upload: {
                        x: 700,
                        y: 380,
                        width: 80,
                        height: 30,
                        text: '保存图片'
                    },
                    leftRotate: {
                        x: 600,
                        y: 320,
                        width: 40,
                        height: 30,
                        text: '左转'
                    },
                    rightRotate: {
                        x: 700,
                        y: 320,
                        width: 40,
                        height: 30,
                        text: '右转'
                    }
                },

                src: {
                    x: 520,
                    y: 0,
                    width: 300,
                    height: 280
                },

                dest: [
                    {
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 280,
                        text: '500x280'
                    },
                    {
                        x: 0,
                        y: 320,
                        width: 180,
                        height: 100,
                        text: '180x100'
                    },
                    {
                        x: 200,
                        y: 365,
                        width: 100,
                        height: 56,
                        text: '100x56'
                    }
                ],

                onUploadComplete: function (data) {

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
            this.imageCrop.dispose();
            this.imageCrop = null;
        }

    };

    return ClassPhotoCropDialog;

});