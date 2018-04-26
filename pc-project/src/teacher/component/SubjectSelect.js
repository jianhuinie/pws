/**
 * @file 教学科目选择器（会联动选择上课方式）
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var etpl = require('cobble/util/etpl');

    var wayRender = etpl.compile(

      '<!-- for: ${list} as ${item} -->'
    + '<li data-value="${item.value}" data-price="${item.price}">${item.text}</li>'
    + '<!-- /for -->'

    );

    // 模板位于 view/teacher/common/subject-select.html

    /**
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 容器元素，从它往下找 .subject 和 .approach
     * @property {boolean=} options.hideDefaultText 是否不显示默认提示问题，默认为 false
     * @property {Function=} options.onCourseChange
     * @property {Function=} options.onWayChange
     */
    function SubjectSelect(options) {
        $.extend(this, options);
        this.init();
    }

    SubjectSelect.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var courseElement = element.find('.course');
            var wayElement = element.find('.lesson-way');

            var courseDefaultText = '&nbsp;';
            var lessonWayDefaultText = '&nbsp;';

            if (!me.hideDefaultText) {
                courseDefaultText = '请选择教学科目';
                lessonWayDefaultText = '请选择上课方式';
            }

            var courseSelect =
            me.courseSelect = new Select({
                element: courseElement,
                defaultText: courseDefaultText,
                name: 'course_id',
                onChange: function (e, data) {

                    var json = data.json;
                    if (json) {

                        var datasource = [ ];

                        $.each(
                            json,
                            function (key, value) {
                                if ($.isNumeric(value) && value > 0) {
                                    datasource.push({
                                        text: wayMap[key],
                                        value: key,
                                        price: value
                                    });
                                }
                            }
                        );

                        if (datasource.length > 0) {

                            var value = datasource.length === 1
                                      ? datasource[0].value
                                      : null;

                            waySelect.refresh({
                                data: datasource,
                                value: value
                            });
                        }
                    }

                    if ($.isFunction(me.onCourseChange)) {
                        me.onCourseChange({
                            name: data.text,
                            id: data.value,
                            subject: data.subject
                        });
                    }

                }
            });

            var waySelect =
            me.waySelect = new Select({
                element: wayElement,
                defaultText: lessonWayDefaultText,
                name: 'lesson_way',
                renderTemplate: function (data) {
                    return wayRender({
                        list: data
                    });
                },
                onChange: function (e, data) {

                    if ($.isFunction(me.onWayChange)) {

                        me.onWayChange({
                            name: data.value,
                            price: data.price
                        });
                    }

                }
            });

            var courseValue = courseElement.data('value');
            if (courseValue != null && courseValue !== '') {
                courseSelect.setValue(courseValue);
            }
            else {
                // 如果只有一门课程，默认选中
                var target = courseElement.find('[data-value]');
                if (target.length === 1) {
                    courseSelect.setValue(target.data('value'));
                }
            }

            var wayValue = wayElement.data('value');
            if (wayValue != null && wayValue !== '') {
                waySelect.setValue(wayValue);
            }
        }

    };

    var wayMap = {
        'teacher': '老师上门',
        'student': '学生上门',
        'discuss': '协商地点',
        'online': '在线授课'
    };


    return SubjectSelect;

});