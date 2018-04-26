/**
 * @file 扣分申述
 * @author wangtianhua
 */
define (function(require, exports){

    'use strict';

    var ractiveDialog = require('../../../common/function/ractiveDialog');
    var service = require('../service');
    var Validator = require('custom/form/Validator');
    var MoreImageUploader = require('common/component/MoreImageUploader');

    var hashFiles = {}; // 多图上传

    return function(options) {

        var dialog = ractiveDialog({
            template: require('html!./AllegeDialog.html'),
            data: {
                style: require('text!./AllegeDialog.styl'),
                allegeillustrate: {
                    name: 'allegeillustrate',
                    value: '',
                    placeholder: '请填写申诉说明（申诉失败后，将不能再次申诉）',
                    className: '',
                    multiple: true,
                },
                deduct_id: options.id,
                deduct_reason: options.deduct_reason,
                photo_list: options.photo_list,
                status: options.status,
                result: options.result,
                problem: options.problem,
                reason: options.reason,
                uploadImage: ""
            },
            components: {
                Input: require('../../../common/component/Input')
            },
            submit: function(data) { // 提交申诉
                var me = this;
                me.validator = new Validator({
                    mainElement: $('.allege-dialog'),
                    fields: {
                        allegeillustrate: {
                            rules: {
                                required: true,
                                maxlength: 200,
                                minlength: 20
                            },
                            errors: {
                                required: '请填写申诉说明',
                                maxlength: '不可超出200字',
                                minlength: '不可少于20字'
                            }
                        }
                    }
                });

                var photoList = "";
                var showImages = $('.show-images li');
                showImages.each(function (key, item) {
                    var formGroup = $(this).find('.form-group');
                    var id = formGroup.find('input[name="id"]').val();
                    if (photoList.length == 0) {
                        photoList += id ;
                    }
                    else {
                        photoList += "," + id ;
                    }
                });

                if (me.validator.validate()) {
                    if (!photoList) {
                        var show = $('.no_pic').show();
                    }
                    else {
                        service
                        .deductAppeal({
                            deduct_id: this.get('deduct_id'),
                            reason: this.get('allegeillustrate').value,
                            photoList: photoList
                        })
                        .then(function (response) {
                            tip({
                                type: 'success',
                                content: '提交成功 稍后生效'
                            })
                            .then(
                                function () {
                                    location.reload();
                                }
                            );
                            dialog.hide();
                        })
                    }
                }
            },
            onrender: function() {
                var me = this;
                var uploader = $('.upload-pics');
                var btninfos = uploader.find('.button');
                var show = uploader.find('.show-images');

                // 多文件上传
                uploader.each(function (i, item) {
                    // hashCountFiles[i] = 0;
                    $(item).data('no', i); // 记录属于第几个表单

                    hashFiles[i] = new MoreImageUploader({
                        element: $(item),
                        watermark: 'photo',
                        previewWidth: 90,
                        previewHeight: 70,
                        maxCount: 5,
                        onUploadStart: function () {
                            // 置灰提交按钮
                            btninfos.prop('disabled', true);
                            show.show();
                        },
                        onUploadSuccess: function () {
                            // hashCountFiles[i]++;
                            var show = $('.no_pic').hide();
                        },
                        onUploadComplete: function () {
                            var count = $('.show-images li').length;
                            if (count < 5) {
                                btninfos.prop('disabled', false);
                            }
                        }
                    });
                });
            },
        });
        return dialog;
    }
})

