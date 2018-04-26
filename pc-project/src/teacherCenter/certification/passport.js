/**
 * @file 身份认证 - 护照认证
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Text = require('cobble/form/Text');
    var ImageUploader = require('common/component/ImageUploader');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');
    var compressImage = require('common/function/compressImage');
    var store = require('common/store');
    var Zoom = require('cobble/ui/Zoom');

    var container = $('.passport');

    exports.init = function () {

        var me = this;
        var passportData = store.get('identityData');

        me.realnameInput = new Text({
            element: container.find('[name="realname"]')
        });

        me.idnumberInput = new Text({
            element: container.find('[name="idnumber"]')
        });

        // 图片上传 - 手持护照
        var passportAll = container.find('.passport-all');
        var browseAll = passportAll.find('.image-browse');
        var imageUploaderAll = new ImageUploader({
            element: passportAll.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 124,
            watermark: 'photo',
            zoomable: true
        });


        // 图片上传 - 护照信息页
        var passportFront = container.find('.passport-front');
        var browseFront = passportFront.find('.image-browse');

        var imageUploaderFront = new ImageUploader({
            element: passportFront.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 124,
            watermark: 'photo',
            zoomable: true
        });


        // 图片上传 - 护照签证页
        var passportBack = container.find('.passport-back');
        var browseBack = passportBack.find('.image-browse');

        var imageUploaderBack = new ImageUploader({
            element: passportBack.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 124,
            watermark: 'photo',
            zoomable: true
        });

        // 验证对象
        var passportValidator = new Validator({
            element: container,
            autoScroll: true,
            fields: {
                realname: {
                    errors: {
                        required: '姓名不能为空',
                        minlength: '请将字数控制在2-50个字以内',
                        maxlength: '请将字数控制在2-50个字以内',
                        pattern: '支持中文、字母、空格、“.”和“·”'
                    }
                },
                idnumber: {
                    errors: {
                        required: '请填写护照号码'
                    }
                }
            }
        });

        var onlyIdentity = false;

        container
        .on('blur', 'input[name="idnumber"]', function (e) { // 护照号码去重
            var target = $(e.currentTarget);
            var number = target.val();
            var type = container.find('input[name="type"]').val();

            if (number == '') {
                return false;
            } else {
                return service
                .verifyCertNumber({
                    number: number,
                    type: type
                })
                .done(function (response) {

                    if (response.code === 0) {
                        onlyIdentity = true;
                    }
                    else {
                        alert('该证件号已存在！<br />如有疑问，请拨打 4000-910-910');
                    }

                });
            }

        });

        // 身份认证 - saveBtn
        var identitySaveBtn = new SaveButton({
            element: container.find('.btn-save'),
            save: function () {

                // 审核中不可再提交审核
                if (passportData.verify_status == 0) {
                    alert({
                        title: '温馨提示',
                        content: '您的身份认证正在审核中，请勿重复提交'
                    });
                    return;
                }

                if (onlyIdentity == false) { // 证件号去重
                    var number = container.find('input[name="idnumber"]').val();
                    if (number == '') {
                        alert('护照不能为空哦～！');
                        return false;
                    } else {
                        service
                        .verifyCertNumber({
                            number: number,
                            type: 6
                        })
                        .done(function (response) {

                            if (response.code === 0) {
                                onlyIdentity = true;
                                save();
                            }
                            else {
                                alert('该证件号已存在！<br />如有疑问，请拨打 4000-910-910');
                                return;
                            }

                        });
                    }
                }
                else {
                    save();
                }

            }
        });

        /**
         * 保存数据
         */
        function save () {

            var formData = form.parse(container);

            if (imageUploaderAll.status === 'uploading'
             || imageUploaderFront.status === 'uploading'
             || imageUploaderBack.status === 'uploading') {
                alert('正在上传图片，请稍等..');
                return false;
            }

            if (passportValidator.validate()) {

                // 收集图片数据
                if (imageUploaderAll.data) {
                    formData.storage_id = imageUploaderAll.data.id;
                }

                if (imageUploaderFront.data) { // 如果有新图片地址，则使用新图存储id
                    formData.imga_id = imageUploaderFront.data.id;
                }

                if (imageUploaderBack.data) {
                    formData.imgb_id = imageUploaderBack.data.id;
                }

                return service
                .upsertCert({
                    id: $('input[name="id"]').val(),
                    type: formData.type,
                    storageId: formData.storage_id,
                    idnumber: formData.idnumber,
                    realname: formData.realname,
                    imgaId: formData.imga_id,
                    imgbId: formData.imgb_id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // 操作完成提示
                        success('上传成功，请等待审核', function () {
                            location.href = "/user_cert/list";
                        });
                    }
                });

            }

        };

        if (passportData.type == 6) {
            refresh(passportData);
        }

    };




    /**
     * 填充表单数据
     *
     * @param {jQuery} form
     * @param {Object} data
     */
    function refresh (data) {

        var form = container.find('.form');

        form.find('input[name="realname"]').val(data.name);
        form.find('input[name="idnumber"]').val(data.idnumber);
        form.find('input[name="type"]').val(data.type);
        form.find('input[name="storage_id"]').val(data.storage_id);
        form.find('input[name="imga_id"]').val(data.additional_imga_id);
        form.find('input[name="imgb_id"]').val(data.additional_imgb_id);

        // 图片反显
        if (data.url) {
            var imgsAll = form.find('.passport-all .image');
            var urlAll = compressImage({
                url: data.url,
                width: 150,
                height: 124,
                noCrop: true
            });
            var imgAll = '<img src="' + urlAll + '" alt="" />';
            imgsAll.find('img').remove();
            imgsAll.append(imgAll);
            var zoomAll = new Zoom({
                element: imgsAll.find('img'),
                finder: imgsAll.find('.image-finder'),
                viewport: imgsAll.find('.image-viewport'),
                url: data.url
            });
        }

        if (data.additional_imga_url) {
            var imgsFront = form.find('.passport-front .image');
            var urlFront = compressImage({
                url: data.additional_imga_url,
                width: 150,
                height: 124,
                noCrop: true
            });
            var imgFront = '<img src="' + urlFront + '" alt="" />';
            imgsFront.find('img').remove();
            imgsFront.append(imgFront);
            var zoomFront = new Zoom({
                element: imgsFront.find('img'),
                finder: imgsFront.find('.image-finder'),
                viewport: imgsFront.find('.image-viewport'),
                url: data.additional_imga_url
            });
        }

        if (data.additional_imgb_url) {
            var imgsBack = form.find('.passport-back .image');
            var urlBack = compressImage({
                url: data.additional_imgb_url,
                width: 150,
                height: 124,
                noCrop: true
            });
            var imgBack = '<img src="' + urlBack + '" alt="" />';
            imgsBack.find('img').remove();
            imgsBack.append(imgBack);
            var zoomBack = new Zoom({
                element: imgsBack.find('img'),
                finder: imgsBack.find('.image-finder'),
                viewport: imgsBack.find('.image-viewport'),
                url: data.additional_imgb_url
            });
        }


    };


});
