/**
 * @file 我的照片表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var Text = require('cobble/form/Text');
    var ImageUploader = require('common/component/ImageUploader');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var Text = require('cobble/form/Text');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     */
    function PhotoForm(options) {
        $.extend(this, options);
        this.init();
    }

    PhotoForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            // 图片上传
            me.uploader = new ImageUploader({
                element: element.find('.image-uploader'),
                watermark: 'photo',
                previewWidth: 150,
                previewHeight: 150,
                onUploadSuccess: function () {
                    element.find('.btn-save').removeAttr('disabled');
                }
            });

            // 表单验证
            me.validator = new Validator({
                element: element,
                fields: {
                    title: {
                        errors: {
                            required: '请输入照片名称',
                            maxlength: '图片名称请不要超过 12 个字符'
                        }
                    }
                }
            });

            // 保存表单
            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    if (me.validator.validate()) {

                        var data = me.uploader.data || { };

                        if (!data.url) {
                            alert('请上传照片');
                            return;
                        }

                        var title = form.parse(me.element).title;

                        return service
                        .editTeacherPhoto({
                            attachmentId: data.id,
                            title: title
                        })
                        .done(function (response) {

                            var isSuccess = response.code === 0;

                            if (isSuccess) {
                                me.data = response.data;
                            }

                            element.trigger(
                                'save',
                                {
                                    data: me.data,
                                    isSuccess: isSuccess
                                    // isNew: oldData == null
                                }
                            );

                            return response;

                        });
                    }
                }
            });

            me.titleInput = new Text({
                element: element.find('[name="title"]')
            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;

            me.data =
            me.uploader.data = null;

            element.find('.image-preview img').remove();
            me.titleInput.setValue('');
        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }

    };

    return PhotoForm;

});