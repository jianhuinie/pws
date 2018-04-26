/**
 * @file 高中
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var DateSelect = require('common/component/DateSelect');
    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var service = require('common/service');
    var SchoolListDialog = require('common/component/SchoolListDialog');
    var dealSchoolList = require('common/center/dealSchoolList');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');


    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.senior_id 高中ID
     * @property {number} options.data.senior 高中名
     * @property {number} options.data.type 学校类型，4高中
     * @property {string} options.data.year 入学年份
     * @property {Object} options.data.grade 班级 [1,2,3]
     */
    function Senior(options) {
        $.extend(this, options);
        this.init();
    }

    Senior.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            if (!me.data) {
                me.data = { };
            }

            // 索引
            me.setIndex(me.index);

            // 入学年份
            me.enterSchoolSelect = new DateSelect({
                element: element.find('.enter-school'),
                year: me.data.enter_school,
                defaultYearText: '- 入学年份 -'
            });

            // 高中
            me.gradeOneInput = new Text({
                element: element.find('input[name="grade_one"]')
            });

            me.gradeTwoInput = new Text({
                element: element.find('input[name="grade_two"]')
            });

            me.gradeThreeInput = new Text({
                element: element.find('input[name="grade_three"]')
            });

            element
            .on('click', 'input[name="senior"]' , function (e) { // 获取高中列表

                var target = $(e.currentTarget);
                var idInput = target.next('input[name="senior_id"]');

                service
                .getSchoolList({
                    type: 4
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var responseData = response.data;

                        new SchoolListDialog({
                            outputSchoolInfo: function (schoolInfo) {
                                target.val(schoolInfo.name);
                                idInput.val(schoolInfo.id);
                            }
                        });

                        var provinceListData = responseData.provinces;
                        var cityListData = responseData.citys;
                        var areaListData = responseData.areas;
                        var schoolListData = responseData.schools;

                        var provinceList = $('.province-list');
                        var cityList = $('.city-list');
                        var areaList = $('.area-list');
                        var schoolList = $('.school-list');

                        $('input[name="school_type"]').val(4);

                        if (provinceListData && provinceListData.length) {
                            provinceList.html(dealSchoolList.getProvinceList(provinceListData)).show();
                        }

                        if (cityListData && cityListData.length) {
                            cityList.html(dealSchoolList.getCityList(cityListData)).show();
                        }

                        if (areaListData && areaListData.length) {
                            areaList.html(dealSchoolList.getAreaList(areaListData)).show();
                        }

                        if (schoolListData && schoolListData.length) {
                            schoolList.html(dealSchoolList.getSchoolList(schoolListData)).show();
                        }

                        dealSchoolList.init();

                    }

                });

            });


            me.validator = new Validator({
                element: element,
                realtime: false,
                fields: {
                    grade_one: {
                        errors: {
                            maxlength: '请将字数控制在 30 字以内哦'
                        }
                    },
                    grade_two: {
                        errors: {
                            maxlength: '请将字数控制在 30 字以内哦'
                        }
                    },
                    grade_three: {
                        errors: {
                            maxlength: '请将字数控制在 30 字以内哦'
                        }
                    }
                }
            });

            if ($.isNumeric(me.data.id)) {
                me.refresh();
            }

        },

        /**
         * 获取数据
         * @return {object}  data: {}
         */
        getData: function () {

            var me = this;
            var formData = form.parse(me.element);
            var seniorGrade = [];
            seniorGrade[1] = formData.grade_one;
            seniorGrade[2] = formData.grade_two;
            seniorGrade[3] = formData.grade_three;

            var data = {
                id: formData.id,
                school_id: formData.senior_id,
                school_name: formData.senior,
                enter_school: formData.year,
                type: 4,
                class: seniorGrade
            };

            return {
                data: data
            };


        },

        refresh: function (clear) {

            var me = this;
            var element = me.element;
            var data;
            if (clear) {
                data = ''; // 清空
            }
            else {
                data = me.data
            }

            element.find('[name="id"]').val(data.id);
            element.find('[name="senior_id"]').val(data.school_id);
            element.find('[name="senior"]').val(data.school_name);

            // 入学年份
            var enterSchool = {
                year: data.enter_school || ''
            };
            me.enterSchoolSelect.refresh(enterSchool);

            // 班级 - 或清空
            if (data.grade) {
                me.gradeOneInput.setValue(
                    data.grade[1] || ''
                );

                me.gradeTwoInput.setValue(
                    data.grade[2] || ''
                );

                me.gradeThreeInput.setValue(
                    data.grade[3] || ''
                );
            }
            else {
                me.gradeOneInput.setValue('');
                me.gradeTwoInput.setValue('');
                me.gradeThreeInput.setValue('');
            }

        },

        // 设置当前项索引值
        setIndex: function (index) {
            this.index = index;
            this.element.data('index', index);
        }
    };

    return Senior;
});