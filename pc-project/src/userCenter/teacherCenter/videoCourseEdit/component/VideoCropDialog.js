/**
 * @file 视频课封面裁剪对话框
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var ractiveDialog = require('../../../common/function/ractiveDialog');
    var ImageCrop = require('imageCrop');

    /**
     * 视频课封面裁剪
     *
     * @param {Object} options
     * @property {?Function} options.onUploadComplete 上传完成后触发
     */
    return function (options) {

        var width = 825;
        var height = 445;

        var dialog = ractiveDialog({
            template: require('html!./VideoCropDialog.html'),
            data: {
                width: width,
                height: height
            },
            onrender: function () {

                var container = $(this.el);

                this.imageCrop = new ImageCrop({
                    element: container.find('.image-crop'),
                    width: width,
                    height: height,

                    action: '/user/previewBinaryImage',

                    accept: 'png,jpg,jpeg',
                    minSize: 1,
                    maxSize: 5 * 1024,

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

                    onValidateError: function (data) {
                        // console.log(data);
                        if (data.type == 'size') {
                            alert({
                                title: '温馨提示',
                                content: '不要上传大于 5M 的图片哦'
                            })
                        }
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

                        var onUploadComplete = options && options.onUploadComplete;
                        if ($.isFunction(onUploadComplete)) {
                            onUploadComplete(response);
                        }

                    }
                });

            }
        });

        return dialog;

    };

});