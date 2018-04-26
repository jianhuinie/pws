/**
 * @file 课程科目和上课方式表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var service = require('common/service');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var VideoDialog = require('common/component/VideoDialog');

    var courseClassify = require('teacherCenter/course/courseClassify');


    /**
     * 课程科目表单
     *
     * @constructor
     * @param {Object} options
     * @property {Object} options.element
     * @property {Object} options.data 后端传来的数据
     * @property {Object} options.data.category1
     * @property {string} options.data.category1.name
     * @property {string} options.data.category1.id
     * @property {Object} options.data.category2
     * @property {string} options.data.category2.name
     * @property {string} options.data.category2.id
     * @property {Object} options.data.category3
     * @property {string} options.data.category3.name
     * @property {string} options.data.category3.id
     * @property {string} options.data.name 自定义科目
     * @property {Object} options.data.lesson_way 上课方式价格
     *                                             {
     *                                                 teacher: 10,
     *                                                 student: 10,
     *                                                 discuss: 10,
     *                                                 online: 10,
     *                                             }
     */
    function CourseForm(options) {
        $.extend(this, options);
        this.init();
    }

    CourseForm.prototype = {

        init: function () {

            var me = this;
            var element = this.element;
            var data = this.data || { };
/*
            // 一级分类
            this.cat1Select = new Select({
                element: element.find('.category1'),
                name: 'category1',
                onChange: function () {
                    getSubjectList(this.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            me.cat2Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (data.category2) {
                                me.cat2Select.setValue(
                                    data.category2.id
                                );
                            }
                        }
                    });
                }
            });

            // 二级分类
            this.cat2Select = new Select({
                element: element.find('.category2'),
                name: 'category2',
                onChange: function () {
                    getSubjectList(this.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            me.cat3Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (data.category3) {
                                me.cat3Select.setValue(
                                    data.category3.id
                                );
                            }
                        }
                    });
                }
            });

            // 三级分类
            this.cat3Select = new Select({
                element: element.find('.category3'),
                name: 'category3'
            });

            this.customInput = new Text({
                element: element.find('.custom-subject')
            });
            getSubjectList()
            .done(function (response) {
                if (response.code === 0) {
                    me.cat1Select.refresh({
                        data: convert(response.data.list)
                    });
                }
            });

            var validator = new Validator({
                element: element,
                fields: {
                    teacher_price: {
                        errors: {
                            required: '请输入老师上门的价格',
                            pattern: '请输入整数',
                            min: '价格最低为 1 元/时',
                            max: '价格最高为 999999 元/时'
                        }
                    },
                    student_price: {
                        errors: {
                            required: '请输入学生上门的价格',
                            pattern: '请输入整数',
                            min: '价格最低为 1 元/时',
                            max: '价格最高为 999999 元/时'
                        }
                    },
                    discuss_price: {
                        errors: {
                            required: '请输入协商地点的价格',
                            pattern: '请输入整数',
                            min: '价格最低为 1 元/时',
                            max: '价格最高为 999999 元/时'
                        }
                    },
                    online_price: {
                        errors: {
                            required: '请输入在线教学的价格',
                            pattern: '请输入整数',
                            min: '价格最低为 1 元/时',
                            max: '价格最高为 999999 元/时'
                        }
                    }
                }
            });


            courseClassify.init(this, 'course');
*/
            element
/*            // 授课方式的启用和置灰
            .on('click', ':checkbox', function (e) {

                var target = $(e.currentTarget);
                var group = target.closest('.form-group');

                if (target.prop('checked')) {

                    if (target.val() == 'teacher' && data.has_region == false) { // 老师上门
                        confirm({
                            content: '你还没有填写“可上门授课范围”，选择“老师上门”授课方式的学生可能无法搜索到你哦，快去补上吧！',
                            title: '温馨提示',
                            width: 398
                        })
                        .done(function () {
                            location.replace('/teacher_center/profile');
                        })
                        .fail(function () {
                            target.closest('.form-checkbox').removeClass('checked');
                        });
                    }
                    else if (target.val() == 'discuss' && data.has_region == false) { // 协商地点
                        confirm({
                            content: '你还没有填写“可上门授课范围”，选择“协商地点”授课方式的学生可能无法搜索到你哦，快去补上吧！',
                            title: '温馨提示',
                            width: 398
                        })
                        .done(function () {
                            location.replace('/teacher_center/profile');
                        })
                        .fail(function () {
                            target.closest('.form-checkbox').removeClass('checked');
                        });
                    }
                    else if (target.val() == 'student' && data.has_location == false) { // 学生上门
                        confirm({
                            content: '你还没有填写“常用地址”，选择“学生上门”授课方式的学生无法找到你哦，快去补上吧！',
                            title: '温馨提示',
                            width: 370
                        })
                        .done(function () {
                            location.replace('/tcenter/addresses/list');
                        })
                        .fail(function () {
                            target.closest('.form-checkbox').removeClass('checked');
                        });
                    }
                    else {
                        enableTeachingMethod(group);
                    }
                }
                else {
                    disableTeachingMethod(group);
                }
            })
*/
            // 在选择授课方式的下方有个在线课程指引视频弹窗link
            .on('click', '.form-wayonline-guidelink', function (e) {
                e.preventDefault();

                var element = $(this);
                var url = element.prop('href');
                var title = element.text();

                new VideoDialog({
                    url: url,
                    title: title
                });
            })
/*
            .on('click', '.btn-save', function () {

                if (!validator.validate()) {
                    return;
                }

                var formData = form.parse(element);

                var error;

                var subjectId = formData.category3;
                var teacherPrice = getPrice(element.find('[data-way="teacher"]'));
                var studentPrice = getPrice(element.find('[data-way="student"]'));
                var discussPrice = getPrice(element.find('[data-way="discuss"]'));
                var onlinePrice = getPrice(element.find('[data-way="online"]'));

                if (!subjectId) {
                    error = '请选择科目分类';
                }
                // 至少设置了一种费用
                else if (
                    teacherPrice === ''
                 && studentPrice === ''
                 && discussPrice === ''
                 && onlinePrice === ''
                ) {
                    error = '请至少设置一种授课方式及费用';
                }

                if (error) {
                    alert(error);
                    return;
                }

                service
                .editCourse({
                    id: data.id,
                    subjectId: subjectId,
                    name: formData.name,
                    teacher: teacherPrice,
                    student: studentPrice,
                    discuss: discussPrice,
                    online: onlinePrice
                })
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                });

            });
*/
        },

        /**
         * 更新成最新数据
         */
        refresh: function () {
        }

    };



    return CourseForm;
});