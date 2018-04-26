/**
 * @file 过往经历表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var DateSelect = require('common/component/DateSelect');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

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
    function ExperienceForm(options) {
        $.extend(this, options);
        this.init();
    }

    ExperienceForm.prototype = {

        init: function () {

            var me = this;

            if (!me.data) {
                me.data = { };
            }

            var element = me.element;

            var startElement = element.find('.start-date');
            var endElement = element.find('.end-date');

            // 结束年月
            me.endSelect = new DateSelect({
                                element: endElement,
                                prefix: 'end_',
                                sofar: true,
                                onYearChange: function () {

                                    var monthSelect = this.monthSelect;

                                    if (this.yearSelect.value == -1) {
                                        monthSelect.element.hide();
                                    }
                                    else {
                                        monthSelect.element.show();
                                    }

                                }
                            });

            // 开始年月
            me.startSelect = new DateSelect({
                                element: startElement,
                                prefix: 'start_',
                                onYearChange: function () {

                                    var startYear = this.yearSelect.getValue();
                                    if (!$.isNumeric(startYear)) {
                                        startYear = me.endSelect.startYear;
                                    }

                                    var endYear = me.endSelect.endYear;
                                    var data = DateSelect.createYearData(startYear, endYear, true);

                                    me.endSelect.yearSelect.refresh({
                                        data: data,
                                        value: data[0].value
                                    });

                                }
                            });

            me.editor = new Editor({
                element: element.find('.form-editor'),
                minLength: 50,
                maxLength: 200
            });


            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    start_year: {
                        errors: {
                            required: '请选择开始年份'
                        }
                    },
                    start_month: {
                        errors: {
                            required: '请选择开始日期'
                        }
                    },
                    end_year: {
                        errors: {
                            required: '请选择结束日期'
                        }
                    },
                    end_month:{
                        errors: {
                            required: '请选择结束日期'
                        }
                    },
                    exp_content: {
                        rules: {
                            required: true,
                            minlength: 50,
                            maxlength: 200
                        },
                        errors: {
                            required: '请填写过往经历~',
                            minlength: '至少输入 50 字哦',
                            maxlength: '请不要超过 200 个字'
                        }
                    }
                }
            });

            // 保存表单
            me.save = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    // 当前正在处理的表单
                    var formElement = element.closest('.form-experience');

                    var formData = form.parse(element);

                    var startYear = formData.start_year;
                    var startMonth = formData.start_month;
                    var endYear = formData.end_year;
                    var endMonth = formData.end_month;
                    var content = $.trim(element.find('textarea').val());

                    var data = me.data; // 原数据
                    var isCreate = data.id == null;

                    var valiResult = false;
                    if (endYear == -1) { // 至今
                        valiResult = me.validator.validate(['start_month', 'exp_content']);
                    }
                    else {
                        valiResult = me.validator.validate(['start_month', 'end_month', 'exp_content']);
                    }

                    if (valiResult) {

                        if (!content) {
                            content = '';

                            alert({
                                title: '温馨提示',
                                content: '你忘记填写过往经历的描述，快去补充上吧！',
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
                        .editTeacherExperience(
                            {
                                id: data.id,
                                startYear: startYear,
                                startMonth: startMonth,
                                endYear: endYear,
                                endMonth: endMonth,
                                content: content
                            },
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        var map = {
                                            'content': '过往经历'
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
                                    start_year: startYear,
                                    start_month: startMonth,
                                    end_year: endYear,
                                    end_month: endMonth,
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

            me.startSelect.refresh({
                year: data.start_year,
                month: data.start_month
            });

            me.endSelect.refresh({
                year: data.end_year,
                month: data.end_month
            });

            // if (data.content) {
                me.editor.setValue(
                    data.content
                )
            // }


            // 审核结果反馈信息
            if (data.verify_status == 2) {

                element.find('.form-text').addClass('form-error');

                var reasons = element.find('.reasons');
                reasons.show().html('<i class="icon icon-info-circle"></i>');
                $.each(data.reasons, function(i, val){
                    reasons.append(val + '；');
                });

            }

        }

    };

    return ExperienceForm;

});


