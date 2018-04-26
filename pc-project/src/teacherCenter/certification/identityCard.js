/**
 * @file 身份认证 - 身份证认证
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

    var container = $('.identity');

    exports.init = function () {

        var me = this;
        var identityData = store.get('identityData');

        me.realnameInput = new Text({
            element: container.find('[name="realname"]')
        });

        me.idnumberInput = new Text({
            element: container.find('[name="idnumber"]')
        });

        // 图片上传 - 手持身份证
        var identityAll = container.find('.identity-all');
        var browseAll = identityAll.find('.image-browse');
        var imageUploaderAll = new ImageUploader({
            element: identityAll.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 124,
            watermark: 'photo',
            zoomable: true
        });

        // 图片上传 - 身份证正面
        var identityFront = container.find('.identity-front');
        var browseFront = identityFront.find('.image-browse');

        var imageUploaderFront = new ImageUploader({
            element: identityFront.find('.image-uploader'),
            previewWidth: 150,
            previewHeight: 124,
            watermark: 'photo',
            zoomable: true
        });

        // 验证对象
        var identityValidator = new Validator({
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
                        required: '请填写身份证号码'
                    }
                }
            }
        });

        var onlyIdentity = false;

        container
        .on('blur', 'input[name="idnumber"]', function (e) { // 身份证号去重
            var target = $(e.currentTarget);
            var number = $.trim(target.val());
            var type = container.find('input[name="type"]').val();

            // 身份证格式号码格式
            if (number == '') {

            }
            else if (isCnNewID(number) === false) {

                error('身份证号格式错误了~!', function () {
                    target.focus();
                });

                return false;
            }
            else {
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
                if (identityData.verify_status == 0) {
                    alert({
                        title: '温馨提示',
                        content: '您的身份认证正在审核中，请勿重复提交'
                    });
                    return;
                }

                if (onlyIdentity == false) { // 证件号去重

                    var number = $.trim(container.find('input[name="idnumber"]').val());

                    // 身份证格式号码格式
                    if (number == '') {
                        alert('请填写身份证号码~!');
                        return false;
                    }
                    else if (isCnNewID(number) === false) {
                        alert('身份证号格式错误了~!');
                        return false;
                    }
                    else {
                        service
                        .verifyCertNumber({
                            number: number,
                            type: 1
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

        /*
         * 保存数据
         */
        function save () {

            var formData = form.parse(container);

            if (imageUploaderAll.status === 'uploading'
             || imageUploaderFront.status === 'uploading') {
                alert('正在上传图片，请稍等..');
                return false;
            }

            if (identityValidator.validate()) {

                // 身份证格式号码格式
                if (isCnNewID(formData.idnumber) === false) {
                    alert('身份证号格式错误了~!');
                    return false;
                }

                // 收集图片数据
                if (imageUploaderAll.data) {
                    formData.storage_id = imageUploaderAll.data.id;
                }

                if (imageUploaderFront.data) { // 如果有新图片地址，则使用新图存储id
                    formData.imga_id = imageUploaderFront.data.id;
                }

                return service
                .upsertCert({
                    id: $('input[name="id"]').val(),
                    type: formData.type,
                    storageId: formData.storage_id,
                    idnumber: formData.idnumber,
                    realname: formData.realname,
                    imgaId: formData.imga_id
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
        }

        if (identityData.type == 1) {
            refresh(identityData);
        }

    };


    /**
     * 身份证认证
     *
     * @param {jQuery} form
     * @param {Object} data
     */
    function isCnNewID (cid) {
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
        var arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
        if (/^\d{17}\d|x$/i.test(cid)) {
            var sum = 0, idx;
            for (var i = 0; i < cid.length - 1; i++) {
                // 对前17位数字与权值乘积求和
                sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
            }
            // 计算模（固定算法）
            idx = sum % 11;
            // 检验第18为是否与校验码相等
            return arrValid[idx] == cid.substr(17, 1).toUpperCase();
        }
        else {
            return false;
        }
    }


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

        // 图片反显
        if (data.url) {
            var imgsAll = form.find('.identity-all .image');
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
            var imgsFront = form.find('.identity-front .image');
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

    };


});
