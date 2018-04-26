/**
 * @file 多文件上传
 * @author zengcheng
 */

define(function (require, exports) {

    var Uploader = require('cobble/ui/Uploader');
    var formatFiles = require('../netdisk/formatFiles');

    /**
     * 验证文件大小
     * @param  {Array.{Object}} fileItems 文件对象
     * @param  {number} maxSize   文件大小上限
     *
     */
    var validateFileSize = function (fileItems, maxSize) {

        for (var i = fileItems.length - 1; i >= 0; i--) {
            if (fileItems[i].file.size > maxSize) {
                fileItems.splice(i, 1);
            }
        }

        for (i = fileItems.length - 1; i >= 0; i--) {
            fileItems[i].index = i;
        }
    };

    /**
     * 验证文件类型是否符合要求
     * @param  {Array.{Object}} fileItems 文件对象
     * @param  {Array.{string}} types   文件类型数组
     */
    var validateFileType = function (fileItems, types) {
        var typeStr = types.join('#');
        for (var i = fileItems.length - 1; i >= 0; i--) {
            if (typeStr.indexOf(fileItems[i].file.type) === -1) {
                fileItems.splice(i, 1);
            }
        }

        for (i = fileItems.length - 1; i >= 0; i--) {
            fileItems[i].index = i;
        }
    };


    /**
     *
     * 多文件上传
     * @param {Object} options 文件选项
     * @property {jQuery} options.element 绑定的对象
     * @property {string} options.action 上传文件的接口
     * @property {Object} options.data 上传文件附加的参数
     * @property {string} options.accept 文件类型
     * @property {string} options.watermark 图片水印 “photo”照片水印，“cert”认证水印，默认不加
     * @property {string} options.xhrProps xhr配置
     * @property {string} options.fileName 文件内容名称
     * @property {number} options.maxSize 单个文件的上限
     * @property {function} options.onchange 上传回调
     */

    function MultiplyFileUploader(options) {

        $.extend(this, {maxSize: 10 * 1024 * 1024, accept: ['jpg', 'png', 'jpeg']}, options);
        this.init();
    }

    MultiplyFileUploader.prototype.init = function () {

        var me = this;

        var data = me.data || { };
        if (me.watermark == 'photo') {
            data.watermark = 1;
        }
        else if (me.watermark == 'cert') {
            data.watermark = 2;
        }

        var validate = function (files, middleLength, me) {
            validateFileType(files, me.accept);
            if (files.length === 0) {
                alert('图片格式非png、jpg、jpeg将无法上传成功', '温馨提示');
                me.uploader.reset();
            } else {
                if (middleLength > files.length) {
                    alert({
                        content: '图片格式非png、jpg、jpeg将无法上传成功',
                        title: '温馨提示',
                        buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            if (typeof me.onchange === 'function') {
                                                me.onchange(formatFiles(files));
                                            }
                                            this.hide();
                                        }
                                    }
                                ]
                    });
                } else {
                    if (typeof me.onchange === 'function') {
                        me.onchange(formatFiles(files));
                    }
                }
            }
        };

        me.uploader = new Uploader({

            element: me.element,
            multiple: true,
            accept: me.accept,
            action: me.action,
            data: data,
            ignoreError: true,
            xhrProps: me.xhrProps,
            fileName: me.fileName || '',
            onFileChange: function() {

                var files = this.getFiles();
                var initLength = files.length;
                var middleLength;

                validateFileSize(files, me.maxSize);
                middleLength = files.length;

                if (middleLength === 0) {

                    alert('图片大小超过' + Math.round(me.maxSize/(1024*1024)) + 'M将无法上传成功', '温馨提示');
                    me.uploader.reset();
                } else {

                    if (initLength > middleLength) {

                        alert({
                            content: '图片大小超过' + Math.round(me.maxSize/(1024*1024)) + 'M将无法上传成功',
                            title: '温馨提示',
                            buttons: [
                                        {
                                            text: '确定',
                                            type: 'primary',
                                            handler: function () {
                                                validate(files, middleLength, me);
                                                this.hide();
                                            }
                                        }
                                     ]
                        });
                    } else {
                        validate(files, middleLength, me);
                    }
                }
            }
        });
    };

    MultiplyFileUploader.prototype.upload = function () {

        this.uploader.upload();
    };

    MultiplyFileUploader.prototype.on = function () {

        this.uploader.on.apply(this.uploader, arguments);
        return this;
    };

    MultiplyFileUploader.prototype.off = function () {

        this.uploader.off.apply(this.uploader, arguments);
        return this;
    };

    MultiplyFileUploader.prototype.dispose = function () {
        this.uploader.reset();
        this.uploader.dispose();
    };

    MultiplyFileUploader.prototype.reset = function () {
        this.uploader.reset();
    };

    return MultiplyFileUploader;
});