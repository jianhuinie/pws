/**
 * @file  选择学校弹窗js
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    // var SaveButton = require('common/component/SaveButton');
    var Tooltip = require('cobble/ui/Tooltip');

    exports.init = function () {

        var container = $('.school-list-dialog');
        var schoolType = $('input[name="school_type"]').val(); // 学校类型值

        container
        .on('click', '.country-item', function (e) { // 点击国家

            var target = $(e.currentTarget);
            var pid = target.data('id');

            service
            .getSchoolList({
                pid: pid,
                type: schoolType
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    var provinceListData = responseData.provinces;
                    var cityListData = responseData.citys;
                    var areaListData = responseData.areas;
                    var schoolListData = responseData.schools;

                    var provinceList = $('.province-list');
                    var cityList = $('.city-list');
                    var areaList = $('.area-list');
                    var schoolList = $('.school-list');

                    if (provinceListData && provinceListData.length) {
                        provinceList.html(exports.getProvinceList(provinceListData)).show();
                    }
                    else {
                        provinceList.html('').hide();
                    }

                    if (cityListData && cityListData.length) {
                        cityList.html(exports.getCityList(cityListData)).show();
                    }
                    else {
                        cityList.html('').hide();
                    }

                    if (areaListData && areaListData.length) {
                        areaList.html(exports.getAreaList(areaListData)).show();
                    }
                    else {
                        areaList.html('').hide();
                    }

                    if (schoolListData && schoolListData.length) {
                        schoolList.html(exports.getSchoolList(schoolListData)).show();
                    }
                    else {
                        schoolList.html('').show();
                    }

                    var countryList = $('.country-list');
                    countryList
                    .find('.country-item')
                    .each(function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            return;
                        }
                    });
                    target.addClass('active');

                }

            });

        })

        .on('click', '.province-item', function (e) {

            var target = $(e.currentTarget);
            var pid = target.data('id');

            service
            .getSchoolList({
                pid: pid,
                type: schoolType
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    var cityListData = responseData.citys;
                    var areaListData = responseData.areas;
                    var schoolListData = responseData.schools;

                    var cityList = $('.city-list');
                    var areaList = $('.area-list');
                    var schoolList = $('.school-list');

                    if (cityListData && cityListData.length) {
                        cityList.html(exports.getCityList(cityListData)).show();
                    }
                    else {
                        cityList.html('').hide();
                    }

                    if (areaListData && areaListData.length) {
                        areaList.html(exports.getAreaList(areaListData)).show();
                    }
                    else {
                        areaList.html('').hide();
                    }

                    if (schoolListData && schoolListData.length) {
                        schoolList.html(exports.getSchoolList(schoolListData)).show();
                    }
                    else {
                        schoolList.html('').show();
                    }

                    var provinceList = $('.province-list');
                    provinceList
                    .find('.province-item')
                    .each(function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            return;
                        }
                    });
                    target.addClass('active');

                }

            });

        })

        .on('click', '.city-item', function (e) {

            var target = $(e.currentTarget);
            var pid = target.data('id');

            service
            .getSchoolList({
                pid: pid,
                type: schoolType
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    var areaListData = responseData.areas;
                    var schoolListData = responseData.schools;

                    var areaList = $('.area-list');
                    var schoolList = $('.school-list');

                    if (areaListData && areaListData.length) {
                        areaList.html(exports.getAreaList(areaListData)).show();
                    }
                    else {
                        areaList.html('').hide();
                    }

                    if (schoolListData && schoolListData.length) {
                        schoolList.html(exports.getSchoolList(schoolListData)).show();
                    }
                    else {
                        schoolList.html('').show();
                    }

                    var cityList = $('.city-list');
                    cityList
                    .find('.city-item')
                    .each(function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            return;
                        }
                    });
                    target.addClass('active');

                }

            });

        })

        .on('click', '.area-item', function (e) {

            var target = $(e.currentTarget);
            var pid = target.data('id');

            service
            .getSchoolList({
                pid: pid,
                type: schoolType
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    var schoolListData = responseData.schools;
                    var schoolList = $('.school-list');

                    if (schoolListData && schoolListData.length) {
                        schoolList.html(exports.getSchoolList(schoolListData)).show();
                    }
                    else {
                        schoolList.html('').show();
                    }

                    var areaList = $('.area-list');
                    areaList
                    .find('.area-item')
                    .each(function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            return;
                        }
                    });
                    target.addClass('active');

                }

            });

        });

        /*/ 搜索
        var searchKeyword = new SaveButton({
            element: container.find('.btn-search'),
            save: function () {

                var keyword = $.trim(container.find('.search-input').val());

                if (keyword == '') {
                    return;
                }

                if (userType == 0) { // 老师

                    service
                    .getCourseStudentList({
                        keyword: keyword
                    })
                    .done(function (response) {

                        if (response.code === 0) {

                            var responseData = response.data;
                            var studentList = responseData.student_list;

                            if (studentList.length) {
                                container.find('ul.p-list').html(exports.getStudentList(studentList));
                                Tooltip.init(container.find('[data-title]'));
                                container.find('.btn-search-all').show();
                            }
                            else {
                                var hint = '<p class="no-result">'
                                         +     '抱歉，没有找到符合搜索条件的学生<br />'
                                         +     '你可以更换关键词重新搜索或者'
                                         +     '<a class="btn-link btn-search-all">查看全部学生</a>'
                                         + '</p>';
                                container.find('ul.p-list').html(hint);
                            }

                            // 订单列表 - 重置
                            container.find('.order-list').html(exports.resetOrderList());

                        }

                    });
                }
                else if (userType == 2) { // 学生

                    service
                    .getCourseTeacherList({
                        keyword: keyword
                    })
                    .done(function (response) {

                        if (response.code === 0) {

                            var responseData = response.data;
                            var teacherList = responseData.teacher_list;

                            if (teacherList.length) {
                                container.find('ul.p-list').html(exports.getTeacherList(teacherList));
                                Tooltip.init(container.find('[data-title]'));
                                container.find('.btn-search-all').show();
                            }
                            else {
                                var hint = '<p class="no-result">'
                                         +     '抱歉，没有找到符合搜索条件的老师<br />'
                                         +     '你可以更换关键词重新搜索或者'
                                         +     '<a class="btn-link btn-search-all">查看全部老师</a>'
                                         + '</p>';
                                container.find('ul.p-list').html(hint);
                            }

                            // 订单列表 - 重置
                            container.find('.order-list').html(exports.resetOrderList());

                        }

                    });
                }

            }
        });*/

    };

    /*
     * 获取国家列表
     */
    exports.getCountryList = function (data) {

        var countryList = '';

        for (var key = 0; key < data.length ; key++) {

            countryList += '<li class="item country-item" data-id="' + data[key].id + '">'
                        +     '<span>' + data[key].name + '</span>'
                        +  '</li>';

        }

        return countryList;
    }

    /*
     * 获取省列表
     */
    exports.getProvinceList = function (data) {

        var provinceList = '';

        for (var key = 0; key < data.length ; key++) {

            provinceList += '<li class="item province-item" data-id="' + data[key].id + '">'
                        +     '<span>' + data[key].name + '</span>'
                        +  '</li>';

        }

        return provinceList;
    }

    /*
     * 获取市列表
     */
    exports.getCityList = function (data) {

        var cityList = '';

        for (var key = 0; key < data.length ; key++) {

            cityList += '<li class="item city-item" data-id="' + data[key].id + '">'
                        +     '<span>' + data[key].name + '</span>'
                        +  '</li>';

        }

        return cityList;
    }

    /*
     * 获取区列表
     */
    exports.getAreaList = function (data) {

        var areaList = '';

        for (var key = 0; key < data.length ; key++) {

            areaList += '<li class="item area-item" data-id="' + data[key].id + '">'
                        +     '<span>' + data[key].name + '</span>'
                        +  '</li>';

        }

        return areaList;
    }

    /*
     * 获取学校列表
     */
    exports.getSchoolList = function (data) {

        var schoolList = '';

        for (var key = 0; key < data.length ; key++) {

            schoolList += '<li class="item school-item" data-id="' + data[key].id + '">'
                        +     '<span>' + data[key].name + '</span>'
                        +  '</li>';

        }

        return schoolList;
    }



});