/**
 * @file 课程设置 - 班课列表 - 搜索表单
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var Select = require('cobble/form/Select');
    var form = require('common/form');

    var container = $('#class-course-search');
    var Validator = require('cobble/form/Validator');

    var studentBegin = container.find('[name="student_begin"]');
    var studentEnd = container.find('[name="student_end"]');

    var priceBegin = container.find('[name="price_begin"]');
    var priceEnd = container.find('[name="price_end"]');

    exports.init = function () {

        var me = this;

        var subjectSelect = new Select({
            element: container.find('.subject'),
            name: 'subject'
        });

        subjectSelect.setValue('-1'); //默认选中全部类目

        var statusSelect = new Select({
            element: container.find('.display-status'),
            name: 'search_status',
            onChange: function (e, data) {
                if (data.value == '7' || data.value == '11') {
                    container.find('[name="is_incomplete"]').prop('checked', false);
                }
            }
        });

        statusSelect.setValue('-1');  //默认选中全部状态

        container
        .on('click', '.form-action button', function () {

            if (!me.validator.validate(['price_begin']) || !me.validator.validate(['price_end'])) {
                return false;
            }

            if (!me.validator.validate(['student_begin']) || !me.validator.validate(['student_end'])) {
                return false;
            }

            if (me.validator.validate(['name', 'number'])) {
                container.trigger('search', getData());
            }
        })
        .on('click', '.clear', function () {

            container.find('input[type=text], input[type=int]').val('');
            container.find('input[type=checkbox]').prop('checked', false);
            statusSelect.setValue('-1');
            subjectSelect.setValue('-1');
        })
        .on('change', '[name="is_incomplete"]', function() {

            if (this.checked && (container.find('[name="search_status"]').val() == '7' || container.find('[name="search_status"]').val() == '11')) {
                statusSelect.setValue('-1');
            }
        })

        me.validator = new Validator({
            realtime: false,
            element: container,
            fields: {
                name: {
                    errors: {
                        max: '请输入最大30个字符'
                    }
                },
                number: {
                    errors: {
                        pattern: '请输入最大20个数字'
                    }
                },
                price_begin: {
                    errors: {
                        pattern: '请输入最多两位小数的价格'
                    }
                },
                price_end: {
                    errors: {
                        pattern: '请输入最多两位小数的价格'
                    }
                },
                student_begin: {
                    errors: {
                        pattern: '请输入正整数'
                    }
                },
                student_end: {
                    errors: {
                        pattern: '请输入正整数'
                    }
                }
            }
        });

    }

    function getData() {

        var data = form.parse(container);

        if ($.isNumeric(data.student_begin) && $.isNumeric(data.student_end)) {
            if (Number(data.student_begin) > Number(data.student_end)) {

                studentBegin.val(data.student_end);
                studentEnd.val(data.student_begin);

                data.student_begin = studentBegin.val();
                data.student_end = studentEnd.val();
            }
        }

        if ($.isNumeric(data.price_begin) && $.isNumeric(data.price_end)) {
            if (Number(data.price_begin) > Number(data.price_end)) {

                priceBegin.val(data.price_end);
                priceEnd.val(data.price_begin);

                data.price_begin = priceBegin.val();
                data.price_end = priceEnd.val();
            }
        }

        return data;
    }
});