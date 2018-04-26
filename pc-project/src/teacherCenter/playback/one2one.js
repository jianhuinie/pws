/**
 * @file 老师用户中心 课程管理 直播回放 - 一对一
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var form = require('common/form');
    var Calendar = require('cobble/form/Date');
    var Validator = require('cobble/form/Validator');
    var store = require('common/store');
    var service = require('common/service');
    var etpl = require('cobble/util/etpl');
    var Tooltip = require('cobble/ui/Tooltip');

    var SetPlaybackExpireDialog = require('common/component/SetPlaybackExpireDialog');

    var container = $('#onevone');
    var formElement = container.find('.form-query');
    var validator;

    /**
     * 课程模板
     * @courseList {object} 课程列表
     */
    var courseListRender = etpl.compile(
        '<ul class="live-list">'
            + '<li class="list-header">'
                + '<div class="schedule-no">课程信息</div>'
                + '<div class="schedule-time">课节时间</div>'
                + '<div class="schedule-status">状态</div>'
                + '<div class="schedule-expire">回放截止时间</div>'
                + '<div class="schedule-actions">操作</div>'
            + '</li>'

            + '<!-- for: ${course_list} as ${item}, ${index} -->'
                + '<li class="list-item">'

                    + '<div class="course-info" data-cnumber="${item.number}">'
                        + '<div class="course-name">'
                            + '${item.name|raw}'
                        + '</div>'
                        + '<div class="course-expire" data-expireday="${item.playback_expire_day}">'
                            + '<!-- if: ${item.playback_expire_day} == 0 -->'
                                + '<span>始终有效</span>'
                            + '<!-- else -->'
                                + '回放有效期<span>${item.playback_expire_day}天</span>'
                            + '<!-- /if -->'
                            + '<span class="edit">编辑</span>'
                        + '</div>'
                        + '<div class="course-switch">'
                            + '<i class="icon icon-caret-down"></i>'
                            + '<i class="icon icon-caret-up"></i>'
                        + '</div>'
                    + '</div>'

                    + '<ul class="schedule-list">'
                        + '<!-- for: ${item.schedule_list} as ${sItem} -->'
                            + '<li class="schedule-item" data-sid="${sItem.schedule_id}" data-playbackid="${sItem.playback_id}">'

                                + '<div class="schedule-no">${sItem.schedule_name}</div>'

                                + '<div class="schedule-time">${sItem.begin_time}</div>'

                                + '<div class="schedule-status">'
                                    + '<!-- if: ${sItem.media_status} == 20 -->'
                                        + '<span>上传中</span>'
                                    + '<!-- elif: ${sItem.media_status} == 30 -->'
                                        + '<span class="text-primary">转换中</span>'
                                    + '<!-- elif: ${sItem.media_status} == 50 -->'
                                        + '<span class="text-error" data-width="19em" data-title="转码失败…正在尝试再次转码，如有疑问请拨打客服热线4000-910-910">转换失败</span>'
                                    + '<!-- elif: ${sItem.media_status} == 70 -->'
                                        + '<span class="text-success">回放中</span>'
                                    + '<!-- elif: ${sItem.media_status} == 90 -->'
                                        + '<span>已结束回放</span>'
                                    + '<!-- /if -->'
                                + '</div>'

                                + '<div class="schedule-expire">${sItem.media_expire}</div>'

                                + '<div class="schedule-actions">'
                                    + '<!-- if: ${sItem.media_status} == 70 || ${sItem.media_status} == 90 -->'
                                        + '<a href="${sItem.cloud_playback_url}" target="_blank">'
                                            + '预览'
                                        + '</a>'
                                        + '<span class="delete">删除</span>'
                                    + '<!-- else -->'
                                        + '<span class="disable">预览</span>'
                                        + '<!-- if: ${sItem.media_status} == 50 || ${sItem.media_status} == 30 -->'
                                            + '<span class="delete">删除</span>'
                                        + '<!-- else -->'
                                            + '<span class="disable">删除</span>'
                                        + '<!-- /if -->'
                                    + '<!-- /if -->'
                                + '</div>'

                            + '</li>'
                        + '<!-- /for -->'
                    + '</ul>'

                + '</li>'
            + '<!-- /for -->'
        + '</ul>'
    );

    /*
     * 查询某一时间段内课程
     *
     * @param {string} start 开始日期 2016-02-21
     * @param {string} end 结束日期 2016-03-21
     */
    function getCourseList (start, end) {
        if (start && end) {
            return service
            .getPlaybackList(
                {
                    startDate: start,
                    endDate: end,
                    courseType: 1
                }
            )
            .done(function (response) {
                if (response.code === 0) {
                    var data = response.data;
                    var one2oneContain = container.find('#onevone-list');
                    if (data.course_list) {
                        one2oneContain.html(courseListRender(data));
                        Tooltip.init($('[data-title]'));
                        // 默认打开第一个课程的课节信息
                        one2oneContain.find('.list-item:first').addClass('open');
                    }
                    else {
                        one2oneContain.html('<div class="no-live"><p class="bgImg"></p><p>暂无可用直播回放</p></div>');
                    }

                }
            });
        }
    }

    /*
     * 前往售卖
     *
     * @param {number} sid 课节id
     */
    function toSale (sid) {
        return service
        .copyToVideoCourse(
            {
                scheduleId: sid
            },
            {
                errorHandler: {
                    '991109': function (response) { // 班课录播回放转视频课状态错误

                        var data = response.data;

                        if (data.video_section_id) {
                            error('课节已存在，无需重复添加哦～');
                            return;
                        }

                        if (data.state == 6) { // 已存在视频课，需下架
                            confirm({
                                title: '温馨提示',
                                content: '添加该课节需要将视频课下架，提交审核成功后即可再次发布，是否确认添加？',
                                width: 335,
                                buttons: [
                                    {
                                        text: '确认',
                                        type: 'primary',
                                        handler: function () {
                                            var me = this;
                                            // 调用下架接口
                                            service
                                            .saveVideoCourse({
                                                userNumber: store.get("userNumber"),
                                                number: data.video_course_number,
                                                type: 3
                                            })
                                            .done(function (response) {
                                                me.hide();
                                                if (response.code === 0) {
                                                    // 再次调用“前往售卖”接口
                                                    toSale(sid);
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: '取消',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else if (data.state == 3) { // 已存在视频课，审核中
                            confirm({
                                title: '温馨提示',
                                content: '添加该课节需要将视频课撤销审核，提交审核成功后即可再次发布，是否确认添加？',
                                width: 335,
                                buttons: [
                                    {
                                        text: '确认',
                                        type: 'primary',
                                        handler: function () {
                                            var me = this;
                                            // 撤销视频课发布
                                            service
                                            .cancelvideocourse({
                                                number: data.video_course_number
                                            })
                                            .done(function (response) {
                                                me.hide();
                                                if (response.code === 0) {
                                                    // 再次调用“前往售卖”接口
                                                    toSale(sid);
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: '取消',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                    }
                }
            }
        )
        .done(function (response) {
            if (response.code === 0) {
                if (response.data.new_course) {
                    location.href = '/video_course/getcourseeditdetail?number=' + response.data.video_course_number
                                  + '&user_number=' + store.get("userNumber")
                                  + '&status=2&&edit_info=1'; // 新建课程，打开信息板
                }
                else {
                    location.href = '/video_course/getcourseeditdetail?number=' + response.data.video_course_number
                                  + '&user_number=' + store.get("userNumber")
                                  + '&status=2&&edit_video=1'; // 已有课程，打开视频板
                }

            }
        });
    }

    exports.init = function () {

        // 时间段默认取最近30天
        var d = new Date();
        var year = d.getFullYear();
        var preMonth = d.getMonth();
        var month = preMonth + 1;
        var preYear = year;
        if (preMonth === 0) {
            preMonth = 12;
            preYear -= 1;
        }
        if (preMonth < 10) {
            preMonth = '0' + preMonth;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var date = d.getDate();
        if (date < 10) {
            date = '0' + date;
        }
        var preToday = preYear + '-' + preMonth + '-' + date;
        var today = year + '-' + month + '-' + date;

        // 时间段
        var startDateCalendar = new Calendar({
            element: formElement.find('input[name="start_date"]'),
            disablePast: false
        });
        startDateCalendar.setValue(preToday);

        var endDateCalendar = new Calendar({
            element: formElement.find('input[name="end_date"]'),
            disablePast: false
        });
        endDateCalendar.setValue(today);

        // 验证对象
        validator = new Validator({
            element: formElement,
            realtime: true,
            fields: {
                start_date: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择有效期开始日期'
                    }
                },
                end_date: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择有效期结束日期'
                    }
                }
            }
        });
        getCourseList(startDateCalendar.getValue(), endDateCalendar.getValue());
        container
        .on('click', '.btn-query', function (e) { // 按时间段查询回放视频
            var formData = form.parse(formElement);
            if (validator.validate()) {
                getCourseList(startDateCalendar.getValue(), endDateCalendar.getValue());
            }
        })

        .on('click', '.list-item .icon-caret-down', function (e) { // 查看某课程下课节列表
            var target = $(e.currentTarget);
            var currCourse = target.closest('li');
            var currUl = target.closest('ul');

            if (currCourse.hasClass('open')) {
                return;
            }

            currUl.find('.open').removeClass('open');
            currCourse.addClass('open');
        })

        .on('click', '.icon-caret-up', function (e) { // 关闭当前课程
            var target = $(e.currentTarget);
            var currCourse = target.closest('li');

            currCourse.removeClass('open');
        })

        .on('click', '.course-expire .edit', function (e) { // 修改回放有效期
            var target = $(e.currentTarget);
            var courseExpire = target.closest('.course-expire');
            var expireDay = courseExpire.data('expireday');
            var courseNum = target.closest('.course-info').data('cnumber');

            // 弹窗
            new SetPlaybackExpireDialog({
                courseNum: courseNum,
                courseType: 1,
                expireDay: expireDay
            });
        })

        .on('click', '.delete', function (e) { // 删除课节
            var target = $(e.currentTarget);
            var currSchedule = target.closest('li.schedule-item');
            var playbackId = currSchedule.data('playbackid');

            // 不可操作
            if (target.hasClass('disable')) {
                return;
            }

            confirm({
                title: '温馨提示',
                content: '仅删除回放，不会删除资料库中的视频文件',
                buttons: [
                    {
                        text: '确认删除',
                        type: 'primary',
                        handler: function () {
                            var me = this;
                            service
                            .deleteCloudPlayback({
                                playbackId: playbackId
                            })
                            .done(function (response) {
                                me.hide();
                                if (response.code === 0) {
                                    success('当前课节删除成功', function () {
                                        currSchedule.remove();
                                    });
                                }
                            });
                        }
                    },
                    {
                        text: '取消',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        });

    };


});