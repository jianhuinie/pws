/**
 * @file 班课设置 - 课程照片表单
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var Editor = require('common/component/Editor');
    var Text = require('cobble/form/Text');
    var ClassPhotoCropDialog = require('./ClassPhotoCropDialog');

    var store = require('common/store');

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
            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            element
            .on('click', '.image-uploader .image-browse', function () {
                var imagePreview = $(this).closest('.image-preview');
                var cropDialog = new ClassPhotoCropDialog({
                    onUploadComplete: function (response) {
                        var data = response.data;
                        var url = data.url;

                        var img = imagePreview.find('img');

                        if (img.length > 0) {
                            img.prop('src', url);
                        }
                        else {
                            $('<img src="' + url + '" />').appendTo(imagePreview);
                        }

                        store.set('photoId', data.id);
                        element.find('.btn-save').removeAttr('disabled');

                        cropDialog.hide();

                    }
                })
            });


            // 班课number
            me.number = new Text({
                element: element.find('[name="number"]')
            });

            me.number.setValue(
                data.number || ''
            );

            // 保存表单
            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    var number = form.parse(me.element).number;
                    if (number == '') {
                        alert('请先完成课程信息');
                        return;
                    }

                    var photoId = store.get('photoId');
                    if (!photoId) {
                        alert('请上传照片');
                        return;
                    }

                    return service
                    .upsertClassCoursePhoto({
                        storage_id: photoId,
                        courseNumber: number
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
                            }
                        );

                        return response;

                    });
                }

            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;

            element.find('.image-preview img').remove();

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