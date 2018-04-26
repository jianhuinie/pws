/**
 * @file 相关案例表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var DateSelect = require('common/component/DateSelect');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');

    var Editor = require('common/component/Editor');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.startYear 开始年份
     * @property {number} options.data.startMonth 开始月份
     * @property {number} options.data.endYear 结束年份
     * @property {number} options.data.endMonth 结束月份
     * @property {string} options.data.content 过往经历内容
     */
    function SuccessForm(options) {
        $.extend(this, options);
        this.init();
    }

    SuccessForm.prototype = {

        init: function () {

            var me = this;

            if (!me.data) {
                me.data = { };
            }

            var element = me.element;

            me.select = new DateSelect({
                            element: element.find('.success-date'),
                        });

            me.editor = new Editor({
                element: element.find('.form-editor'),
                minLength: 50,
                maxLength: 300
            });

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    title: {
                        errors: {
                            required: '请输入案例名称',
                            maxlength: '案例名称请不要输入超过 30 个字'
                        }
                    },
                    year: {
                        errors: {
                            required: '请选择日期'
                        }
                    },
                    month: {
                        errors: {
                            required: '请选择日期'
                        }
                    },
                    content: {
                        rules: {
                            required: true,
                            minlength: 50,
                            maxlength: 300
                        },
                        errors: {
                            required: '请填写案例内容~',
                            minlength: '至少输入 50 字哦',
                            maxlength: '请不要超过 300 个字'
                        }
                    }
                }
            });

            // 保存表单
            me.save = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    // 当前正在处理的表单
                    var formElement = element.closest('.form-success');

                    var formData = form.parse(element);

                    var year = formData.year;
                    var month = formData.month;
                    var title = formData.title;
                    var content = element.find('textarea').val();

                    var data = me.data;
                    var isCreate = data.id == null;

                    if (me.validator.validate(['title', 'month', 'content'])) {

                        if (!content) {
                            content = '';
                            alert({
                                title: '温馨提示',
                                content: '你忘记填写相关案例的描述，快去补充上吧！',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }

                                ]
                            });
                            return;
                        }

                        return service
                        .editTeacherSuccess(
                            {
                                id: data.id,
                                year: year,
                                month: month,
                                title: title,
                                content: content
                            },
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        var map = {
                                            'title': '案例名称',
                                            'content': '案例描述'
                                        };

                                        var errorMsg = response.data;
                                        var content = '你';  // 你

                                        $.each(errorMsg, function (index, item) {

                                            if (item.length) {
                                                content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                                $.each(item, function (i, j) {
                                                    content += '“<em>' + j + '</em>”';
                                                });
                                                content += '；</span><br />';
                                            }

                                        });

                                        content += '请删除后重新输入';

                                        alert({
                                            title: '温馨提示',
                                            content: content,
                                            width: 450,
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        });

                                    }
                                }
                            }
                        )
                        .done(function (response) {

                            var isSuccess = response.code === 0;

                            if (isSuccess) {

                                var id = response.data.id;

                                var newData = {
                                    year: year,
                                    month: month,
                                    title: title,
                                    content: content
                                };

                                if (isCreate) {
                                    newData.id = id;
                                    me.newData = newData;
                                }
                                else {
                                    me.newData = $.extend(data, newData);
                                }

                            }

                            element.trigger(
                                'save',
                                {
                                    data: me.newData,
                                    form: me,
                                    isSuccess: isSuccess
                                }
                            );

                            return response;
                        });

                    }

                }
            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data;

            element.find('[name="title"]').val(data.title);

            me.select.refresh({
                year: data.year,
                month: data.month
            });

            // if (data.content) {
                me.editor.setValue(
                    data.content
                )
            // }

            // 审核结果反馈信息
            if (data.verify_status == 2) {

                var reasons = element.find('.reasons');
                reasons.show().html('<i class="icon icon-info-circle"></i>');
                $.each(data.reasons, function(i, val){
                    reasons.append(val + '；');
                });

            }

        }

    };

    return SuccessForm;

});