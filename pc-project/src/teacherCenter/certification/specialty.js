/**
 * @file 认证设置-专业资质认证
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var ImageUploader = require('common/component/ImageUploader');
    var compressImage = require('common/function/compressImage');

    var container = $('.specialty');

    exports.init = function () {

        // 图片上传功能
        var imageUploader = new ImageUploader({
            element: container.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 150,
            watermark: 'photo',
            zoomable: true
        });

        // 保存表单数据
        var specialtySaveBtn = new SaveButton({
            element: container.find('.btn-save'),
            save: function () {

                var target = this.element;
                var formElement = target.closest('.uploader-form');
                var showInfo = formElement.prev('.show');
                var cardTitle = container.find('.card-title');

                var url = '/teacher_center/upsertCert';

                if (imageUploader.data) {

                    // 收集表单数据
                    var formData = {
                        id: formElement.find('input[name="id"]').val(),
                        type: '5',
                        storage_id: imageUploader.data.id,
                        url: imageUploader.data.url
                    };

                    return service
                    .upsertCert({
                        id: formData.id,
                        type: formData.type,
                        storageId: formData.storage_id
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 操作完成提示
                            success('上传成功，请等待审核', function () {
                                location.reload();
                            });

                        }

                    });

                }
                else if (imageUploader.status === 'uploading') {
                    alert('正在上传图片，请稍等...');
                }
                else {
                    alert('请先上传图片再保存');
                }
            }
        });



    };


    /**
     * 填充表单数据
     *
     * @param {jQuery} form
     * @param {Object} data
     */
    exports.fill = function (data) {

        var form = container.find('.uploader-form');

        form.find("input[name='id']").val(data.id);
        form.find("input[name='type']").val(data.type);
        form.find("input[name='storage_id']").val(data.storage_id);

        // 图片反显
        var url = compressImage({
            url: data.url,
            width: 240,
            height: 170,
            noCrop: true
        });
        var img = "<img src='" + url + "' alt='' />";
        form.find('.image').append(img);

    };




});
