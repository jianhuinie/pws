/**
 * 引导页
 * @author zengcheng
 */
define(function (require, exports) {

    var AvatarCropDialog = require('common/component/AvatarCropDialog');
    var compressImage = require('common/function/compressImage');
    var Validator = require('common/Validator');
    var service = require('common/service');
    var rules = require('common/rules');

    exports.init = function () {

        var container = $('#user-form');

        var uploadGroup = container.find('.upload-group');

        var errorMsg = {
            nickname: {
                required: "昵称不能为空",
                maxLen: "昵称不能超过10个字符",
                only: "昵称不能重复"
            },
            idImg: {
                required: "请上传头像"
            }
        };

        var validator = new Validator({
            rules: $.extend(rules, { only: function () {
                var data = {};
                var deffer = $.Deferred();
                data.nickname = this.value + '';
                service.checkNickname(data).done(function (response) {
                    deffer.resolve(response.data && response.data.is_repeat_nickname == 0);
                });
                return deffer.promise();
            } }),
            elements: {
                nickname: ['required:true', 'maxLen:10', 'only'],
                idImg: ['required:true']
            },
            notifier: {
                '*': function(result, type, name) {
                    if (!result) {
                        var msg = errorMsg[name][type];
                        if (msg) {
                            $(this).siblings('.error-tip').text(msg);
                        }
                    } else {
                        $(this).siblings('.error-tip').text('');
                    }
                }
            }
        }).init();

        container
            .on('click', '.image-browse', function (e) {

                var dialog = new AvatarCropDialog({
                    onUploadComplete: function (response) {

                        if (response.code === 0) {
                            var data = response.data;
                            var preview = uploadGroup.find('.image-wrapper');
                            uploadGroup.find('input[name="idImg"]').val(data.id);
                            uploadGroup.find('.upload-btn').addClass('has-image');
                            preview.find('img').attr('src', compressImage({
                                url: data.url,
                                width: 150,
                                height: 125
                            }));
                            dialog.hide();
                        }
                    }
                });
            })
            .on('click', '.save-btn', function () {
                var data = {
                    avatar: container.find('input[name="idImg"]').val(),
                    nickname: $.trim(container.find('input[name="nickname"]').val())
                }
                validator.validate().done(function (result) {
                    if (result) {
                        service.updateSocialProfile(data).done(function () {
                            window.location.href = '/forum/index';
                        });
                    }
                });
            });
    }
});