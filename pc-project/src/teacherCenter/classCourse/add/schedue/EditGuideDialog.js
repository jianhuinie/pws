
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');

    /**
     * 构造函数
     * @param {Function=} options.onSuccess 成功后的回调
     * @param {Function=} options.onCancel 取消后回调
     */
    function EditGuideDialog(options) {
        $.extend(this, options);
        this.init();
    }

    EditGuideDialog.prototype = {
        init: function () {

            var me = this;
            var tpl = require('html!./EditGuideDialog.html');


            var dialog = new Dialog({
                title: '课程信息',
                content: tpl,
                width: 500,
                skinClass: 'courseInfo-dialog'
            });

            var element = $('.courseInfo-dialog');

            var validator = new Validator({
                element: element,
                fields: {
                    adaptedInput: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请填写适合学生'
                        }
                    },
                    questionInput: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请填写教学内容或方法'
                        }
                    },
                    targetInput: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请填写学习目标'
                        }
                    }
                }
            });
            var preview = element.find('.output');
            var value = "";

            var clearHandler = function () {

            };
            var previewHandler = function () {
                var adaptedInput = element.find('input[name="adaptedInput"]').val();
                var questionInput = element.find('input[name="questionInput"]').val();
                var targetInput = element.find('input[name="targetInput"]').val();

                value = '';

                if (adaptedInput) {
                    value += '<span class="muted">课程面向</span>'
                      + adaptedInput
                      + '<span class="muted">，</span>';
                }
                if (questionInput) {
                    value += '<span class="muted">通过</span>'
                      + questionInput
                      + '<span class="muted">，</span>';
                }
                if (targetInput) {
                    value += '<span class="muted">达到</span>'
                      + targetInput
                      + '<span class="muted">的学习目标。</span>';
                }
                preview.html(value);
            };

            element
            .on('blur','input[name="adaptedInput"]', previewHandler)
            .on('focus','input[name="adaptedInput"]', clearHandler)
            .on('blur','input[name="questionInput"]', previewHandler)
            .on('focus','input[name="questionInput"]', clearHandler)
            .on('blur','input[name="targetInput"]', previewHandler)
            .on('focus','input[name="targetInput"]', clearHandler)
            .on('click','.btn-publish',function(){
                if (validator.validate(true)) {
                    var courseInfo = element.find('.output').text();
                    if(element.find('.output').text().length < 200) {
                        if ($.isFunction(me.onSuccess)) {
                            me.onSuccess({
                                courseInfo: courseInfo
                            });
                        }
                        dialog.hide();
                    }
                    else {
                        alert({
                            type: 'error',
                            content: '请填写不超过200个字'
                        });
                    }
                }
            });
        }
    }

    return EditGuideDialog;
});