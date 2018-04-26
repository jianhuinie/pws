/**
 * @file 中英交流大使-资料编辑
 * @author wx
 */
define(function(require, exports) {

    'use strict';

    var ukCommon = require('./common');
    var store = require('common/store');
    var service = require('common/service');

    var compressImage = require('common/function/compressImage');

    var Validator = require('cobble/form/Validator');

    var AvatarCropDialog = require('common/component/AvatarCropDialog');

    var validator;

    exports.init = function (){

        ukCommon.init();

        validator = new Validator({
            realtime: true,
            element: $('#edit-form'),
            fields: {
                name: {
                    errors: {
                        required: '请输入姓名',
                        minlength: '请输入真实姓名',
                        maxlength: '请输入真实姓名',
                    }
                },
                email: {
                    type: 'email',
                    errors: {
                        required: '请输入电子邮箱',
                        pattern: '请输入正确的邮箱地址'
                    }
                },
                phone: {
                    errors: {
                        required: '请输入联系电话',
                        pattern: '请输入正确的手机号码'
                    }
                },
                district_id: {
                    errors: {
                        required: '请选择地址'
                    }
                },
                school: {
                    errors: {
                        required: '请输入真实学校名称'
                    }
                },
                grade_id: {
                    errors: {
                        required: '请选择年级分组'
                    }
                },
                subject_id: {
                    errors: {
                        required: '请选择才艺类型'
                    }
                },
                talent: {
                    errors: {
                        required: '请输入才艺名称',
                        maxlength: '最多15个字'
                    }
                },
                describe: {
                    errors: {
                        required: '请输入个人描述',
                        maxlength: '字数超过限制，最多200个字'
                    }
                },
                invite_id: {
                    errors: {
                        pattern: '请输入正确的邀请编号'
                    }
                }
            }
        });

        $('#field-province').on('change', function () {
            var provinceId = $(this).val();
            loadArea(provinceId, $('#field-city'));
            $('#field-district').children('option[value!=""]').remove();
        });

        $('#field-city').on('change', function () {
            var id = $(this).val();
            loadArea(id, $('#field-district'));
        });
        var info = store.get('info');
        var address = info.address;

        $('#field-province').val(address.province.id);

        if (address.province.id) {
            // 加载市
            loadArea(address.province.id, $('#field-city')).then(function () {
                $('#field-city').val(address.city.id);
            });
        }

        if (address.city.id) {
            // 加载区县
            loadArea(address.city.id, $('#field-district')).then(function () {
                $('#field-district').val(address.district.id);
            });
        }

        // 设置分组
        $('#field-grade').val(info.grade.id);

        $('#field-subject').val(info.subject.id);

        // 绑定保存
        $('#save-btn').on('click', function () {
            saveEdit();
        });

        // 绑定保存
        $('#cancel-btn').on('click', function () {
            confirm('确定取消编辑吗？').then(function () {
                location.href = '/uk/profile#uk-nav';
            });
        });

        // 编辑头像
        $('.photo-box').on('click', function () {

            var dialog = new AvatarCropDialog({
                onUploadComplete: function (response) {

                    if (response.code === 0) {

                        var data = response.data;

                        $('#field-avatar').val(data.url);

                        var url = compressImage({
                            url: data.url,
                            width: 160,
                            height: 160
                        });

                        $('#user-photo').attr('src', url).show();

                        $('.btn-upload').removeClass('upload-empty');

                        dialog.dialog.dispose();

                    }
                }
            });
        });
    };

    /**
     * 加载市、县
     * @param id
     * @param targetSelect
     */
    function loadArea(id, targetSelect) {
        if (!id) {
            targetSelect.children('option[value!=""]').remove();
            return;
        }
        return service.getRegionList({
            id: id
        }).then(function (data) {
            // 构造
            targetSelect.children('option[value!=""]').remove();
            targetSelect.val('');
            $.each(data, function (index, item) {
                targetSelect.append('<option value="' + item.id + '">' + item.name + '</option>');
            });
        });
    }

    function saveEdit() {

        if (!validator.validate(true)) {
            return;
        }

        if ($('#field-avatar').val() == '') {
            alert('请上传照片');
            return;
        }

        var arr = $('#edit-form').serializeArray();
        var data = {};

        $.each(arr, function () {
            data[this.name] = this.value;
        });

        var hasPay = store.get('has_pay');

        service.post(
            '/uk/insert',
            data
        ).then(function (response) {
            var data = response.data;
            if (data.status == 0) {
                if (hasPay == 0) {
                    // 报名成功
                    alert({
                        title: '您已经成功报名！',
                        content: '请在' + data.start_date + '前上传才艺视频，否则无法参加初赛！',
                        onBeforeHide: function () {
                            location.href = '/uk/profile';
                        }
                    });
                }
                else {
                    // 修改成功
                    alert({
                        content: '保存成功！',
                        onBeforeHide: function () {
                            location.href = '/uk/profile';
                        }
                    });
                }
            }
            else if (data.status == 1) {
                alert('请输入正确的邀请编号！');
            }
            else {
                alert('修改失败！');
            }
        });
    }

});