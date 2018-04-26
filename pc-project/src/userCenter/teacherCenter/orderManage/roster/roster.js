/**
 * @file 教师中心 - 管理总览
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('./service');
    var renderImage = require('../../../common/function/renderImage');
    var toNumber = require('cc/function/toNumber');

    exports.init = function (tplData) {

        var ractive;
        var today = new Date();
        var currentYear = today.getFullYear();
        var lastYear = +currentYear - 1;
        var lastTwoYear = lastYear - 1;
        ractive = new Ractive({
            el: '#container',
            template: require('html!./roster.html'),
            data: {
                tplData: tplData,
                siteData: siteData,
                userData: userData,
                orgID: 0,
                schooltimeOptions: {
                    multiple: true,
                    name: 'schooltime',
                    value: '',
                    data: [
                        {
                            value: currentYear,
                            text: '今年',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: lastYear,
                            text: lastYear + '年',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: lastTwoYear,
                            text: lastTwoYear + '年',
                            disabled: false,
                            readonly: false
                        }
                    ]
                },
                payModelOptions: {
                    multiple: true,
                    name: 'payModel',
                    value: '',
                    data: [
                        {
                            value: '1',
                            text: '免费',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: '2',
                            text: '付费',
                            disabled: false,
                            readonly: false
                        }
                    ]
                },
                courseTypeOptions: {
                    multiple: true,
                    name: 'courseType',
                    value: '',
                    data: [
                        {
                            value: '1',
                            text: '一对一',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: '8',
                            text: '直播课',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: '2',
                            text: '线下班课',
                            disabled: false,
                            readonly: false
                        },
                        {
                            value: '3',
                            text: '视频课',
                            disabled: false,
                            readonly: false
                        }
                    ]
                },
                courseCount: 0,
                hasRosterPermission: false,
                shiziLogin: false,
                ajaxCourseList: {},
                pagerOptions: {
                    page: 1,
                    count: 1
                }
            },
            components: {
                BoxGroup: require('../../../common/component/BoxGroup'),
                Pager: require('../../../common/component/Pager')
            },
            onrender: function() {
                var me = this;
                me.searchCourseList();

                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .done(function (response) {
                    if (response.code === 0) {
                        me.set('orgID', response.data.org_id);
                    }
                });
            },
            oncomplete: function() {

                var me = this;

                // 监听设课时间
                me.observe('schooltimeOptions.value', function (value) {
                    me.searchCourseList();
                });

                // 监听课程付费
                me.observe('payModelOptions.value', function (value) {
                    me.searchCourseList();
                });

                // 监听课程种类
                me.observe('courseTypeOptions.value', function (value) {
                    me.searchCourseList();
                });

                // 监听翻页
                me.observe('pagerOptions.page', function (page) {
                    me.nextPage(page);
                });
            },
            searchCourseList: function(page) { // 搜索课程列表

                var me = this;

                service
                .getRosterListAjax({
                    beginTime: me.get('schooltimeOptions.value') == -1 ? '' : me.get('schooltimeOptions.value'),
                    priceType: me.get('payModelOptions.value') == -1 ? '' : me.get('payModelOptions.value'),
                    courseType: me.get('courseTypeOptions.value') == -1 ? '' : me.get('courseTypeOptions.value'),
                    page: page
                })
                .then(function (response) {
                    me.set('courseCount', response.data.roster_list.pager.count);
                    me.set('hasRosterPermission', response.data.has_roster);
                    me.set('shiziLogin', response.data.shizi_login);
                    me.set('ajaxCourseList', response.data.roster_list.list);

                    me.set('pagerOptions.page', toNumber(response.data.roster_list.pager.page));
                    me.set('pagerOptions.count', Math.ceil(response.data.roster_list.pager.count / response.data.roster_list.pager.page_size));

                    renderImage();
                });
            },
            toRosterPage: function(data) { // 查看花名册

                var me = this;
                var vip_level = me.get('userData').vip_level;
                var org_id = me.get('orgID');

                if (data.course_type == 1) { // 一对一
                    // 不限制
                }
                else if (data.course_type == 2) { // 线下班课
                    // 不限制
                }
                else if (data.course_type == 3) { // 视频课
                    if (data.price == 0) {
                        if (vip_level == 0) {
                            if (org_id == 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费视频课的花名册只有超级会员才能查看，超级会员还可享有优先推荐获得更多生源哦~',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '立即开通',
                                            type: 'error',
                                            action: function () {
                                                location.href = '/teacher_center/vip_center';
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '了解详情',
                                            type: 'default',
                                            action: function () {
                                                location.href = '/teacher_center/vip_detail?type=seeRoster';
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费视频课的花名册只有超级会员才能查看，请联系机构开通超级会员',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            return false;
                        }
                        else if (vip_level == 1 || vip_level == 2) {
                            if (org_id == 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费视频课的花名册只有超级会员才能查看，超级会员还可享有优先推荐获得更多生源哦~',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '立即开通',
                                            type: 'error',
                                            action: function () {
                                                location.href = '/teacher_center/vip_center';
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '了解详情',
                                            type: 'default',
                                            action: function () {
                                                location.href = '/teacher_center/vip_detail?type=seeRoster';
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费视频课的花名册只有超级会员才能查看，请联系机构开通超级会员',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            return false;
                        }
                    }
                    else {
                        if (vip_level == 0) {
                            if (org_id == 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '视频课的花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦~',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '立即开通',
                                            type: 'error',
                                            action: function () {
                                                location.href = '/teacher_center/vip_center';
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '了解详情',
                                            type: 'default',
                                            action: function () {
                                                location.href = '/teacher_center/vip_detail?type=seeRoster';
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '视频课的花名册只有会员才能查看，请联系机构开通会员',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            return false;
                        }
                    }
                }
                else if (data.course_type == 8) { // 直播课／在线班课
                    if (data.price == 0) {
                        if (vip_level == 0) {
                            if (org_id == 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦~',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '立即开通',
                                            type: 'error',
                                            action: function () {
                                                location.href = '/teacher_center/vip_center';
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '了解详情',
                                            type: 'default',
                                            action: function () {
                                                location.href = '/teacher_center/vip_detail?type=seeRoster';
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有会员才能查看，请联系机构开通会员',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            return false;
                        }
                        else if (vip_level == 1) {
                            if (org_id == 0) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有高级会员才能查看，高级会员还可享有优先推荐获得更多生源哦~',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '立即开通',
                                            type: 'error',
                                            action: function () {
                                                location.href = '/teacher_center/vip_center';
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '了解详情',
                                            type: 'default',
                                            action: function () {
                                                location.href = '/teacher_center/vip_detail?type=seeRoster';
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有高级会员才能查看，请联系机构开通会员',
                                    width: 382,
                                    skinClass: 'vip-dialog',
                                    buttons: [
                                        {
                                            text: '我知道了',
                                            type: 'primary',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }
                            return false;
                        }
                    }
                }

                window.open(data.roster_url);
            },
            nextPage: function (page) {
                var me = this;
                me.searchCourseList(page)
            }
        });

    };

});