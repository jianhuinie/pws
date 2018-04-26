/**
 * 申请贴吧管理员
 * @author zengcheng
 */
define(function (require, exports) {

    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var Validator = require('common/Validator');
    var service = require('common/service');
    var store = require('common/store');
    var rules = require('common/rules');
    var ImageUploader = require('common/component/ImageUploader');

    var renderInstruction;
    var messages = {
        name: {
            required: '请输入姓名',
            maxLen: '不能超过10个字'
        },
        number: {
            required: '请输入身份证',
            isCnNewID: '身份证格式错误'
        },
        intro: {
            required : '请输入宣言',
            maxLen: '不能超过100个字'
        },
        idImg: {
            required : '请上传图片'
        },
        hasRead: {
            required : '请同意申请条款'
        }
    };

    var getFormData = function (formContainer) {
        var storageId = formContainer.find('input[name="idImg"]').val();
        var idCardNumber = $.trim(formContainer.find('input[name="number"]').val());
        var words = $.trim(formContainer.find('textarea[name="intro"]').val());
        var realname = $.trim(formContainer.find('input[name="name"]').val());

        return {
            storageId: storageId,
            idCardNumber: idCardNumber,
            words: words,
            realname: realname
        };
    };

    exports.init = function () {

        renderInstruction = etpl.compile($('#instruction-template').html());

        var group = {name: store.get('groupName'), id: store.get('groupId')};
        var container = $('#apply-form');
        var imgHidden = container.find('input[name="idImg"]');

        // 图片上传功能
        var imageUploader = new ImageUploader({
            element: container.find('.upload-btn'),
            previewWidth: 150,
            previewHeight: 125,
            zoomable: false,
            onUploadSuccess: function () {
                imageUploader.element.addClass('has-image');
                imgHidden.val(imageUploader.data.id);
                validator.validate('idImg');
            }
        });

        var validator = new Validator({
            rules: rules,
            elements: {
                name: ['required:true', 'maxLen:10'],
                number: ['required:true', 'isCnNewID'],
                intro: ['required:true', 'maxLen:100'],
                idImg: ['required:true'],
                hasRead: [{'required': function () {
                    return container.find('input[name="hasRead"]').prop('checked');
                }}]
            },
            notifier: {
                '*': function(result, type, name) {
                    if (!result) {
                        var msg = messages[name][type];
                        $(this).siblings('.error').text(msg).show();
                    } else {
                        $(this).siblings('.error').text('').hide();
                    }
                }
            }
        }).init();

        $('.directions-link').click(function () {
            var dialog = new Dialog({
                content: renderInstruction({group: group}),
                width: 666
            });

            dialog.element.on('click', '.btn', function () {
                dialog.hide();
            });
        });

        $('.btn-apply').click(function () { // 提交申请
            validator.validate().done(function (result){
                if (result) {
                    var data = getFormData(container);
                    data.groupId = group.id;
                    service.adminApply(data).done(function (response) {
                        if (!response.code) {
                            confirm('申请已经提交，请耐心等待', '温馨提示').done(function () {
                                window.location.href = '/forum/threadBrowse/' + data.groupId;
                            });
                        }
                    });
                }
            });
        });
    }
});