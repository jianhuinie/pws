/*
 * @file 为学生排课弹窗
 * @author wangyujie
 */

define(function (require, exports) {

    'use strict';

    var ractiveDialog = require('../../common/function/ractiveDialog');
    var service = require('./service');
    var renderImage = require('../../common/function/renderImage');


    /**
     * @param {Object} options
     * @property {Object} options.data ajax数据
     * @property {Function=} options.onsave
     * @property {Function=} options.oncancel
     */
    return function (options) {

        options = options || {};

        var scheduleDialog = ractiveDialog({
            template: require('html!./ScheduleDialog.html'),
            data: {
                style: require('text!./ScheduleDialog.styl'),
                site_data: siteData,
                keywordInputOptions: {
                    name: 'keyword',
                    value: '',
                    placeholder: '<i class="icon icon-search"></i>在这里搜索你的学生名称、ID或者科目吧',
                    className: 'search-input'
                },
                fromKeyword: false, // 搜索部分学生
                studentList: options.data.student_list, // 学生列表
                orderList: ''
            },
            components: {
                Input: require('../../common/component/Input')
            },
            onrender: function () {
                // renderImage();
            },
            searchByKeyword: function () { // 关键词搜索
                var me = this;
                var keyword = me.get('keywordInputOptions.value');
                if (keyword == '') {
                    return;
                }
                service
                .getCourseStudentList({
                    keyword: keyword
                })
                .then(function (response) {
                    me.set('studentList', response.data.student_list);
                    me.set('fromKeyword', true);
                });
            },
            searchAll: function () {
                var me = this;
                service
                .getCourseStudentList({
                    keyword: ''
                })
                .then(function (response) {
                    me.set('studentList', response.data.student_list);
                    me.set('fromKeyword', false);
                });
            },
            oncancel: function () { // 关闭弹窗
                scheduleDialog.hide();
            },
            getStudentOrder: function (userNumber, displayName) { // 获取某学生的一对一订单
                var dialog = this;
                service
                .getStudentVIPOrderList({
                    userNumber: userNumber,
                    displayName: displayName
                })
                .done(function (response) {
                    dialog.set('orderList', response.data);
                    renderImage();
                });
            },
            gotoReserveLesson: function (url) { // 去排课
                location.href = url;
            },
            checkinAction: function () {
                var mood = this.get('emotionValue');
                var text = this.get('moodInputOptions.value');

                // 表情必选
                if (mood == '') {
                    this.set('noValue', true);
                    return;
                } else {
                    this.set('noValue', false);
                }

                // 心情最多140字，非必填
                if (text > 140) {
                    this.set('tooLong', true);
                    return;
                } else {
                    this.set('tooLong', false);
                }

                if ($.isFunction(options.onsave)) {
                    options.onsave({
                        mood: mood,
                        text: text
                    });
                    scheduleDialog.hide();
                }
            }
        });

        return scheduleDialog;

    };

});