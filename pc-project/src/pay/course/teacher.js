/**
 * @file 老师信息
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var SubjectSelect = require('teacher/component/SubjectSelect');
    var AllPrice = require('common/component/AllPrice');
    var store = require('common/store');
    var validator;

    /**
     * 初始化 教学科目 和 上课方式
     *
     * @param {Object} options
     * @property {Function} options.onChange
     */
    exports.init = function (options) {

        validator = options.validator;

        var container = $('.teacher-info');

        if (container.length === 0) {
            return;
        }

        var priceBox = container.find('.price');

        var subjectSelect = new SubjectSelect({
            element: container,
            hideDefaultText: true,
            onCourseChange: function (data) {

                var courseId = data.id;
                store.set({
                    courseId: courseId,
                    courseName: data.name,
                    subjectId: data.subject
                });

                var icon = container.find('.course-group .icon-info-circle');

                if (courseId == null) {
                    icon.show();
                }
                else {
                    icon.hide();
                }

            },
            onWayChange: function (data) {

                var lessonWay = data.name;
                var price = data.price || 0;

                store.set({
                    lessonWay: lessonWay,
                    price: price
                });

                var icon = container.find('.lesson-way-group .icon-info-circle');

                if (lessonWay == null) {
                    icon.show();
                    priceBox.hide();
                }
                else {
                    icon.hide();
                    priceBox.show();
                }

                priceBox.find('.price-value').html(
                    Number(price).toFixed(2)
                );

                validator.validate([ 'course_id', 'lesson_way' ]);

                options.onChange();
            }
        });

        new AllPrice({
            element: container.find('.all-price'),
            subjectSelect: subjectSelect
        });

    };

    exports.validate = function () {
        return validator.validate(true);
    }

});
