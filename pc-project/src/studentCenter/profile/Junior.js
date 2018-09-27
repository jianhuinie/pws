/**
 * @file 初中
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
     * @property {number} options.data.junior_id 初中ID
     * @property {number} options.data.junior 初中名
     * @property {number} options.data.type 学校类型，2初中
     * @property {string} options.data.year 入学年份
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


            element
            .on('click', 'input[name="junior"]' , function (e) { // 获取初中列表

                var target = $(e.currentTarget);
                var idInput = target.next('input[name="junior_id"]');

                service
                .getSchoolList({
                    type: 2
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

                        $('input[name="school_type"]').val(2);

                        if (provinceListData && provinceListData.length) {
                            provinceList.html(dealSchoolList.getProvinceList(provinceListData)).show();
                        };

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

            var data = {
                id: formData.id,
                school_id: formData.junior_id,
                school_name: formData.junior,
                enter_school: formData.year,
                type: 2
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
            }
            else {
                data = me.data
            }

            element.find('[name="id"]').val(data.id);
            element.find('[name="junior_id"]').val(data.school_id);
            element.find('[name="junior"]').val(data.school_name);

            // 入学年份
            var enterSchool = {
                year: data.enter_school || ''
            };
            me.enterSchoolSelect.refresh(enterSchool);
        },

        // 设置当前项索引值
        setIndex: function (index) {
            this.index = index;
            this.element.data('index', index);
        }
    };

    return Senior;
});