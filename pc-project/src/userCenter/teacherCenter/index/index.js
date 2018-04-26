/**
 * @file 教师中心 - 管理总览
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var CheckinDialog = require('./CheckinDialog');
    var ScheduleDialog = require('./ScheduleDialog');
    var renderImage = require('../../common/function/renderImage');
    var VideoDialog = require('../../common/biz/VideoDialog');
    var service = require('./service');
    var Slider = require('common/component/Slider');

    exports.init = function (data) {

        // 该页面展示上报
        var params = {
            type: 't_backstage',
            stype: 'tpc_home',
            client: 'PC'
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./index.html'),
            data: {
                tpl_data: data,
                scores: data.progress_info.check_score || 0.0, // 主页完善度得分
                task_list: data.progress_info.check_item || {}, // 主页完善待完成任务
                site_data: siteData,
                user_data: userData,
                results: data.statistic.rank.results,
                baseinfo_map: {
                    realname: '真实姓名',
                    nickname: '昵称',
                    short_introduce: '一句话简介',
                    introduce: '老师介绍',
                    graduation_major: '专业',
                    graduation_school: '毕业学校',
                    avatar: '头像',
                    institution: '单位/机构/学校',
                    skills: '个人标签',
                    other_info: '其它信息',
                    private_domain: '个性域名',
                    bio: '过往经历',
                    sex: '性别',
                    edu_back: '学历',
                    school_age: '教龄',
                    regions: '可上门授课范围',
                    subject_id: '教学科目'
                },
                vip_level: {
                    0: 'novip',
                    1: 'vip',
                    2: 'gvip',
                    3: 'cvip'
                },
                org_id: 0, // 机构ID 0为个人老师
                remind_dialog: data.dialog_reminding,
                backlog: null
            },
            onrender: function () {
                var me = this;
                renderImage();

                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .then(function (response) {
                    var data = response.data;
                    // 机构老师
                    ractive.set('org_id', data.org_id);
                });
                var statistics = $('.item-info')
                var slider = new Slider({
                    element: statistics.find('.item-title'),
                    itemSelector: statistics.find('.item-link'),
                    duration: 150,
                    onChange: function (event, data) {

                    }
                });
                service
                .getBacklog()
                .then(function (response) {
                    if (response.code == 0) {
                        me.set({
                            backlog: response.data
                        })
                    }
                });
            },
            oncomplete: function () { // 通用提醒弹窗
                if (data.dialog_reminding) {
                    var dialogData = data.dialog_reminding;

                    alert({
                        title: dialogData.title || '温馨提示',
                        content: dialogData.content || '',
                        width: dialogData.width || 390,
                        type: 'dialog-reminding',
                        checkboxLabel: '不再提示',
                        buttons: [
                            {
                                text: '查看详情',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    location.href = dialogData.url;
                                }
                            }
                        ],
                        onbeforehide: function (checked) {
                            // 不再提醒
                            if (checked) {
                                service
                                .closeRemind({
                                    key: dialogData.key
                                });
                            }
                        }
                    });

                }
            },
            vipremind: function () { // 会员提醒不再展示
                service
                .ajaxVipRemind()
                .then(function (response) {
                    ractive.set('tpl_data.basic_info.vip_remind', false);
                });
            },
            checked: function () { // 去检测 & 重新检测
                this.set('tpl_data.progress_info.is_checked', 1);
                service
                .ajaxTaskList()
                .then(function (response) {
                    ractive.set('scores', '0.0'); // 为了递增效果
                    ractive.animate('scores', response.data.scores);
                    ractive.set('task_list', response.data.task_list);
                });
            },
            checkin: function () { // 签到
                // 先发ajax获取数据，再给弹窗
                service
                .getCheckinCalendar({
                    month: ''
                })
                .then(function (response) {
                    // 签到弹窗
                    var checkinDialog = new CheckinDialog({
                        data: response.data,
                        onsave: function(data) {
                            service
                            .checkin(data)
                            .then(function () {
                                // +5分
                                $('#plus').show().animate({
                                    top: '-30px',
                                    opacity: 0,
                                }, 500);

                                tip({
                                    type: 'success',
                                    content: '今日签到成功',
                                    duration: 1000
                                })
                                .then(function () {
                                    location.reload();
                                });
                            });
                        }
                    });
                    checkinDialog.show();
                });
            },
            scheduleForStudent: function () { // 为学生排课
                // 先发ajax获取数据，再给弹窗
                service
                .getCourseStudentList({
                    keyword: ''
                })
                .then(function (response) {
                    // 为学生排课弹窗
                    var scheduleDialog = new ScheduleDialog({
                        data: response.data
                    });
                    scheduleDialog.show();
                });
            },
            gsReport: function (stype) { // 上报，gs.gif
                var params = {
                    type: 't_backstage',
                    stype: stype,
                    client: 'PC'
                };
                WAT.send('http://click.genshuixue.com/gs.gif', params);
            }

            /*helpVideo: function (url) { // 帮助视频
                new VideoDialog({
                    url: url,
                    title: '老师入驻指南'
                });
            }*/
        });

        ractive
        .on('withdraw', function () { // 提现
            alert({
                title: '温馨提示',
                content: '为保证你的资金安全，请绑定你本人的储蓄卡进行提现。<br>如有疑问，请拨打客服热线4000-910-910',
                buttons: [
                    {
                        text: '绑定银行卡',
                        type: 'primary',
                        action: function () {
                            location.href = "/wallet/index";
                        }
                    }
                ]
            });
        });

    };

});