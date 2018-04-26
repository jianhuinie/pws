/**
 * @file 教师以及学生的课表中心
 * @author peilonghui@baidu.com
 */

define(function(require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var courseMap = require('common/map/baidu');

    var Calendar = require('common/component/CourseMonthCalendar');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var CancelOrderPromptDialog = require('common/component/CancelOrderPromptDialog');
    var userInfoTooltip = require('common/component/userInfoTooltip');
    var JudgeDialog = require('common/component/JudgeDialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var EditReservedLessonDialog = require('common/component/EditReservedLessonDialog');
    var EditTrialCourseTimeDialog = require('common/component/EditTrialCourseTimeDialog');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');

    var store = require('common/store');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var OnlineCourseDialog = require('common/component/OnlineCourseDialog');
    var onlineCourse = require('common/center/onlineCourse');
    // 快速约课
    var ScheduleNotDataDialog = require('common/component/ScheduleNotDataDialog');
    var ScheduleClassDialog = require('common/component/ScheduleClassDialog');
    var quickScheduleClass = require('common/center/quickScheduleClass');
    var VideoDialog = require('common/component/VideoDialog');
    var IpadRemindDialog = require('common/center/component/IpadRemindDialog');

    var mapHash = {};

    /**
     * 绑定确认约课的弹窗事件
     *
     * @return
     */
    var bindConfirmOrder = function (container) {
        container
            .on(
                'click',
                '.action-accept_request',
                function(e) {

                    e.preventDefault();

                    var $this = $(this);
                    var lessonId = $this.data('json').lesson_id;

                    var role = store.get('user').type === 0 ? 'teacher' : 'student';

                    service
                    [role + 'ConfirmScheduleCheck']({
                        lessonId: lessonId
                    })
                    .done(function (response) {

                        var confirmText = ''
                                + '<p style="width:400px;text-align:center;">'
                                +   '是否确认该次约课？'
                                +   '<div class="dialog-tip">请在开课前进入教室，否则会被记为迟到哦</div>'
                                + '</p>';

                        var code = response.code;
                        var data = response.data;

                        if (data.conflicted) {
                            confirmText = ''
                                + '<p style="width:400px;text-align:center;">'
                                +   data.message
                                + '</p>';
                        }

                        if (code === 0) {
                            confirm(
                                confirmText,
                                '确认约课'
                            )
                            .done(function() {

                                service
                                [role + 'ConfirmSchedule']({
                                    lessonId: lessonId
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        success(
                                            '确认约课成功！',
                                            function () {
                                                location.reload();
                                            }
                                        );
                                    }
                                    else {
                                        error(response.data || '确认约课失败，请稍后重试～');
                                    }
                                })
                            });
                        }
                        else {
                           error(
                                '获取课程预约信息失败，请稍后重试～'
                            );
                        }

                    });


                }
            );
    };

    /**
     * 绑定确认支付的动作
     *
     * @return
     */
    var bindConfirmPay = function (container) {
        container
            .on(
                'click',
                '.action-pay',
                function(e) {

                    e.preventDefault();

                    var $this = $(this);
                    var noUsePlatEnsure = typeof $this.data('usePlatEnsure') === 'number' && $this.data('usePlatEnsure') === 0;
                    var url = $this.data('url');
                    var lessonId = $this.data('json').lesson_id;
                    var orderId = $this.data('orderId');

                    var confirmContent = '是否确认支付本次课程？';
                    var confirmTitle = '确认支付本次课程';
                    if (noUsePlatEnsure) {
                        confirmContent = '是否确认本次上课';
                        confirmTitle = '确认本次上课'
                    }

                    confirm(''
                            + '<p style="width:400px;text-align:center;">'
                            +   confirmContent
                            + '</p>',
                            confirmTitle
                        )
                        .done(function() {
                            service.confirmPaySchedule({
                                url: url,
                                lessonId: lessonId
                            })
                            .done(function(response) {
                                if (response.code === 0) {
                                    var data = response.data;

                                    if (data.extra && data.extra.comment_prize_flag == '1') { // data.is_last &&
                                        var message = data.extra.comment_prize_content;

                                        confirm(
                                            message,
                                            '温馨提示'
                                        )
                                        .done(function () {
                                            location.href = '/comment/purchaseInfo?purchase_id=' + orderId + '&serial_number=' + lessonId;
                                        })
                                        .fail(function () {
                                            location.reload();
                                        });
                                    }
                                    else {
                                        createJudgeDialog(lessonId, orderId);
                                    }
                                }
                                else {
                                    alert('支付失败，请稍后重试');
                                }
                            });
                        });

                }
            );
    };

    /**
     * 创建一个评价弹窗
     *
     * @param  {string} lessonId 课程id
     * @param  {string} teacherId 老师id
     * @param  {string} orderId 订单id
     *
     * @return {JudgeDialog}  新建的评价弹窗实例
     */
    var createJudgeDialog  = function (lessonId, orderId) {

        var okFunc = function (val) {

            if (!val) {
                error('请打一个分数')
            }

            service.ratingSchedule({
                lessonId: lessonId,
                rating: val
            })
            .done(function (response) {

                if (response && !response.code) {

                    var data = response.data;
                    // if (data.is_last) {
                        var message = '该课节已结束，是否要对该老师进行详细评价？';

                        confirm(
                            message,
                            '温馨提示'
                        )
                        .done(function () {
                            location.href = '/comment/purchaseInfo?purchase_id=' + orderId + '&serial_number=' + lessonId;
                        })
                        .fail(function () {
                            location.reload();
                        });

                    /*}
                    else {
                        success('多谢评价～');
                        location.reload();
                    }*/

                }
                else {
                    alert('提交评价信息失败，请稍后重试');
                }
            });
        };

        var cancelFunc = function () {
            location.reload();
        };

        return new JudgeDialog({
            title: '支付成功',
            content: '<p>支付成功，顺便给老师点个赞吧！</p>',
            stars: 3,
            data: {
                lesson_id: lessonId
            },
            okFunc: okFunc,
            cancelFunc: cancelFunc
        });
    };

    var store = require('common/store');

    /**
     * 初始化课程日历组件
     *
     * @param  {jQueryElement} container 需要初始化的元素，其需要有自定义属性data-timestampe时间戳
     * @return
     */
    var initCalendar = function (container) {

        var calContainer = container.find('.schedule-calendar');

        if (!calContainer.length) {
            return;
        }

        var today = new Date(store.get('today'));
        var date = today.getDate();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;

        var url = (location.href.split('?'))[0];
        var calendar = new Calendar({
            element: calContainer,
            today: today,
            date: today,
            value: ''
                    + today.getFullYear()
                    + '-'
                    + ((month < 10) ? ('0' + month) : month)
                    + '-'
                    + ((date < 10 ) ? ('0' + date) : date),
            onChange: function () {
                var value = this.value;

                service
                .getScheduleList({
                    day: value,
                    url: url
                })
                .done(function (response) {

                    if (response && response.code === 0) {

                        var scheduleList = $('.schedule-list');

                        scheduleList.html(response.data.tpl.lessons);
                        userInfoTooltip.repaint(container, '.thumbnail');

                        Tooltip.init(scheduleList.find('[data-title]'));

                    }
                    else {
                        alert('加载当天课表失败，请稍后重试');
                    }

                });
            }
        });
        return calendar;
    };

    /**
     * 绑定我要申诉或者是取消课程的事件
     *
     * @return
     */
    var bindCancelOrAppealDialog = function (container) {
        container
            .on(
                'click',
                ''
                + '.action-appeal,'
                + '.action-cancel_classroom',
                function (e) {


                    var target = $(e.target);
                    var parent = $(this).closest('td');

                    var options = {};
                    options.type = 'lesson';
                    options.userType = store.get('user').type === 0
                                     ? 'teacher'
                                     : 'student';

                    options.url = target.data('url');
                    options.cancelType = 'schedule';

                    if (target.hasClass('action-appeal')) {
                        options.type = 'appeal';
                    }

                    options.postData = {
                        lesson_id: target.data('json').lesson_id
                    };

                    var status = parent.data('course-status');

                    if (store.get('user').type === 2 && options.type === 'appeal' && status != "81") {
                        options.status = status;
                        options.teacherNumber = parent.data('teacher-number');
                        new CancelOrderPromptDialog(options);
                    }
                    else {
                        new CancelOrderDialog(options);
                    }
                }
            );
    };



    /**
     * 绑定进入课堂
     */
    function bindEnterClassroom(container) {
        container
        .on('click', '.action-enter_classroom', function (e) {

            var parent = $(this).closest('td');

            var data = parent.data();

            var ua = navigator.userAgent;
            //iPad Safari 浏览器弹窗
            if (ua.indexOf('iPad') > -1 && ua.indexOf('Safari') > -1) {
                new IpadRemindDialog();
            }
            else {
                new EnterClassroomDialog({
                    data: data.online
                });
            }
        });
    }

    function bindModifyTime(container) {
        container
        .on('click', '.action-modify_time', function (e) {
            var target = $(e.currentTarget);
            var data = $(this).data('json');

            if (target.closest('.schedule-item').data('istrial')) {
                new EditTrialCourseTimeDialog({
                    lessonInfo: data
                });
            }
            else {
                new EditReservedLessonDialog({
                    lessonInfo: data
                });
            }

        });
    }

    /**
     * 绑定地图
     */
    function bindAddressMap(container) {
        container
        .on('click', '[data-address]', function (e) {

            var target = $(e.currentTarget);
            var index = target.data('index');

            if (mapHash[index]) {
                mapHash[index].show();
            } else {
                // var address = target.data('address');
                var offline = target.data('offline');
                var map = '<div id="course-map-'+index+'" style="height:400px;"></div>';
                mapHash[index] = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onAfterShow: function(){
                        courseMap.modifiedAddress('course-map-'+index, offline.lng, offline.lat);
                    }
                });
            }

            return;
        });
    }

    return {
        /**
         * 课表中心的入口方法
         *
         * @return
         */
        init: function (data) {

            var container = $('#content');
            if (store.get('user').type == 0) {
                service
                .getSchedule()
                .then(function (response) {
                    if (response.code == 0) {
                        container.find('.nav-item')
                        .each(function(index, value) {
                            if (response.data.stat[index]) {
                                $(value).find('.text-primary').html(response.data.stat[index]);
                            }
                        });
                    }
                });
            }

            userInfoTooltip.init(container, '.thumbnail');

            bindConfirmOrder(container);
            bindConfirmPay(container);
            initCalendar(container);

            bindCancelOrAppealDialog(container);
            bindEnterClassroom(container);
            bindModifyTime(container);
            bindAddressMap(container);

            // 学生 - 快速约课
            if (container.find('.schedule-class').length) {
                var scheduleClass = new SaveButton({
                    element: container.find('.schedule-class'),
                    save: function () {

                        service
                        .getCourseTeacherList({
                            keyword: ''
                        })
                        .done(function (response) {

                            if (response.code === 0) {

                                var responseData = response.data;
                                var teacherList = responseData.teacher_list;

                                if (teacherList.length == 0) {
                                    new ScheduleNotDataDialog();
                                }
                                else {
                                    // 马上交谈，可能会隐藏上一次的弹窗，先删掉
                                    container.find('.dialog-mask').remove();
                                    container.find('.schedule-class-dialog').remove();

                                    new ScheduleClassDialog();
                                    var personList = $('.person-list');
                                    personList.find('ul.p-list').html(quickScheduleClass.getTeacherList(teacherList));
                                    Tooltip.init(personList.find('[data-title]'));
                                    quickScheduleClass.init();
                                }

                            }

                        });

                    }
                });
            }

            container
            .on('click', '.open-qreserve', function (e) {

                var target = $(e.currentTarget);

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                if (remind == 1) {
                    new QuickLessonDialog({
                        teacher_num: target.data('user-num')
                    });
                }
                else if (remind == 0) {

                    service
                    .quickLesson({
                        qreserveSign: 1,
                        teacherNum: target.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课开启', function () {
                                location.reload();
                            });
                        }
                    });
                }
            })

            .on('click', '.close-qreserve', function (e) {

                var target = $(e.currentTarget);

                confirm({
                    content: '关闭闪电约课后，该老师向你发起的约课以及时间修改需要手动确认，是否确定要关闭？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {

                    // 取消闪电约课
                    service
                    .quickLesson({
                        qreserveSign: 0,
                        teacherNum: target.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课关闭', function () {
                                location.reload();
                            });
                        }
                    });

                });
            })

            .on('click', '.online-classroom' ,function (e) { // 进入在线教室

                var user = store.get('user');
                var quickSearch;
                user.type = 2;
                if (user.type == 0) {
                    quickSearch = service.onlineTeacherCourse;
                }
                else {
                    quickSearch = service.onlineStudentCourse;
                }

                quickSearch({
                    username: $.trim(user.name),
                })
                .done(function (response) {
                    if (response.code === 0) {
                        var responseData = response.data;
                        var course = responseData.course_list;

                        new OnlineCourseDialog();
                        var timeline = $('.timeline');
                        timeline.find('.course-list-con .course-list-inner').html(onlineCourse.makeCourse(course));

                        timeline.show();
                        Tooltip.init(timeline.find('[data-title]'));

                        onlineCourse.init();
                    }
                    else {

                    }
                });
            })

            .on('click', '.privacy-tip', function (e) {
                cookie.set('privacyTipFlag', true);
                container.find('.privacy-tip').hide();
            })

            .on('click', '.playback', function (e) { // 观看回放视频
                var element = $(this);
                service
                .playBackCheckVideoCourse(
                    {
                        courseNumber: element.data('coursenumber'),
                        scheduleId: element.data('scheduleid')
                    }
                )
                .done(function (response) {
                    if (response.code === 0) {
                        var data = response.data;
                        new VideoDialog({
                            url: data.url
                        });
                    } else {
                        alert('播放失败！');
                    }
                })
            });

        },

        bindConfirmPay: bindConfirmPay,
        bindConfirmOrder: bindConfirmOrder,
        bindCancelOrAppealDialog: bindCancelOrAppealDialog,
        bindEnterClassroom: bindEnterClassroom
    }

});

