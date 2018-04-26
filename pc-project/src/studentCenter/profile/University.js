/**
 * @file 大学
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var DateSelect = require('common/component/DateSelect');
    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var SchoolListDialog = require('common/component/SchoolListDialog');
    var dealSchoolList = require('common/center/dealSchoolList');
    var form = require('common/form');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.university_id 大学ID
     * @property {number} options.data.university 大学名
     * @property {number} options.data.type 学校类型，5大学
     * @property {string} options.data.year 入学年份
     * @property {Object} options.data.identity 身份
     * @property {Object} options.data.department 院系
     */
    function University(options) {
        $.extend(this, options);
        this.init();
    }

    University.prototype = {

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

            // 身份
            me.identitySelect = new Select({
                element: element.find('.identity'),
                name: 'identity'
            });

            // 院系
            me.departmentSelect = new Select({
                element: element.find('.department'),
                name: 'department'
            });

            element
            .on('click', 'input[name="university"]' , function (e) { // 获取大学列表

                var target = $(e.currentTarget);
                var universityCard = target.closest('.university-card');
                var idInput = universityCard.find('input[name="university_id"]');

                service
                .getSchoolList({
                    type: 5
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var responseData = response.data;

                        new SchoolListDialog({
                            outputSchoolInfo: function (schoolInfo) {

                                target.val(schoolInfo.name);
                                idInput.val(schoolInfo.id);

                                // 取院系信息
                                service
                                .getDepartmentList({
                                    schoolId: schoolInfo.id
                                })
                                .done(function (response) {

                                    if (response.code === 0) {

                                        var departmentData = response.data.department;
                                        var departmentList= new Array();
                                        $.each(departmentData, function (index, item) {
                                            departmentList.push({
                                                value: item.id,
                                                text: item.name
                                            });
                                        });

                                        me.departmentSelect.refresh({
                                            data: departmentList
                                        });

                                    }

                                });


                            }
                        });

                        var countryListData = responseData.countrys;
                        var provinceListData = responseData.provinces;
                        var schoolListData = responseData.schools;

                        var countryList = $('.country-list');
                        var provinceList = $('.province-list');
                        var schoolList = $('.school-list');

                        $('input[name="school_type"]').val(5);

                        if (countryListData && countryListData.length) {
                            countryList.html(dealSchoolList.getCountryList(countryListData)).show();
                        }

                        if (provinceListData && provinceListData.length) {
                            provinceList.html(dealSchoolList.getProvinceList(provinceListData)).show();
                        }

                        if (schoolListData && schoolListData.length) {
                            schoolList.html(dealSchoolList.getSchoolList(schoolListData)).show();
                        }

                        dealSchoolList.init();

                    }

                });

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
            var element = me.element;
            var formData = form.parse(me.element);

            var departmentName = element.find('.department span').text();
            if (departmentName == '请选择') {
                departmentName = '';
            }

            var data = {
                id: formData.id,
                school_id: formData.university_id,
                school_name: formData.university,
                enter_school: formData.year,
                type: 5,
                identity: formData.identity,
                department_id: formData.department,
                department_name: departmentName
            }

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
                // 院系清空
                me.departmentSelect.refresh();
            }
            else {
                data = me.data
            }

            element.find('[name="id"]').val(data.id);
            element.find('[name="university_id"]').val(data.school_id);
            element.find('[name="university"]').val(data.school_name);

            // 入学年份
            var enterSchool = {
                year: data.enter_school || ''
            };
            me.enterSchoolSelect.refresh(enterSchool);

            // 身份
            me.identitySelect.setValue(
                data.identity
            );

            // 院系这里，要根据学校请求来，再赋值
            service
            .getDepartmentList({
                schoolId: data.school_id
            })
            .done(function (response) {

                if (response.code === 0) {

                    var departmentData = response.data.department;

                    var departmentList= new Array();
                    $.each(departmentData, function (index, item) {
                        departmentList.push({
                            'value': item.id,
                            'text': item.name,
                        });
                    });

                    // 院系赋值
                    me.departmentSelect.refresh({
                        data: departmentList,
                        value: data.department_id
                    });

                }

            });

        },

        // 设置当前项索引值
        setIndex: function (index) {
            this.index = index;
            this.element.data('index', index);
        },

        getId: function () {
            return this.element.find('[name="id"]').val();
        }
    };

    return University;
});