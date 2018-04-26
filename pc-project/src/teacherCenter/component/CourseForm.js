/**
 * @file 添加课程表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');

    /**
     * 启用授课方式
     *
     * @inner
     * @param {jQuery} 授课方式的容器元素，一般是 .form-group
     */
    function enableTeachingMethod(element) {

        var text = element.find('.form-text');
        var input = element.find(':text');

        text.removeClass('disabled');
        input.prop('disabled', false);

    }

    /**
     * 禁用授课方式
     *
     * @inner
     * @param {jQuery} 授课方式的容器元素，一般是 .form-group
     */
    function disableTeachingMethod(element) {

        var text = element.find('.form-text');
        var input = element.find(':text');

        text.addClass('disabled');
        input.prop('disabled', true);

    }


    function CourseForm(options) {
        $.extend(this, options);
        this.init();
    }

    CourseForm.prototype = {

        init: function () {

            var element = this.element;

            // 一级分类
            this.cat1Select = new Select({
                element: element.find('.category1'),
                name: 'category1'
            });

            // 二级分类
            this.cat2Select = new Select({
                element: element.find('.category2'),
                name: 'category2'
            });

            // 三级分类
            this.cat3Select = new Select({
                element: element.find('.category3'),
                name: 'category3'
            });


            // 授课方式的启用和置灰
            element.on('click', '.teach-method :checkbox', function (e) {

                var target = $(e.currentTarget);
                var group = target.closest('.form-group');

                if (target.prop('checked')) {
                    enableTeachingMethod(group);
                }
                else {
                    disableTeachingMethod(group);
                }
            });
        },

        /**
         * 填充数据
         *
         * @param {Object} data
         * @property {string} data.category1
         * @property {string} data.category2
         * @property {string} data.category3
         * @property {string} data.custom
         * @property {} [propName] [description]
         */
        fill: function (data) {

            // 课程类目
            this.cat1Select.setValue(data.category1.value);
            this.cat2Select.setValue(data.category2.value);
            this.cat3Select.setValue(data.category3.value);

            // 自定义科目
            var element = this.element;
            element.find('.custom').val(data.custom || '');

            var methods = data.methods || { };

            // 授课方式
            element
            .find('.teach-method')
            .each(function () {

                var target = $(this);
                var name = target.data('method');

                var checkbox = target.find(':checkbox');
                var input = target.find(':text');

                var value = methods[name];
                if (value != null) {
                    checkbox.prop('checked', true);
                    input.val(value);
                }
                else {
                    checkbox.prop('checked', false);
                    input.val('');
                }

            });
        }

    };

    return CourseForm;

});