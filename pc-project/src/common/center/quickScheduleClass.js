/**
 * @file  一对一订单排课弹窗
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var Tooltip = require('cobble/ui/Tooltip');
    var Placeholder = require('cobble/helper/Placeholder');

    exports.init = function () {

        var container = $('.quick-schedule-class');
        var userType = store.get('user').type;

        Placeholder.init(
            container.find('[placeholder]')
        );

        container
        .on('click', '.p-list .student-item', function (e) { // 获取某学生的一对一订单

            var target = $(e.currentTarget);
            var userNumber = target.data('number');
            var displayName = target.find('.display-name').text();

            service
            .getStudentVIPOrderList({
                userNumber: userNumber,
                displayName: displayName
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    container.find('.order-list').html(exports.getPersonOrderList(responseData));
                    Tooltip.init(container.find('[data-title]'));

                }

            });

        })

        .on('click', '.p-list .teacher-item', function (e) { // 获取某老师的一对一订单

            var target = $(e.currentTarget);
            var userNumber = target.data('number');
            var displayName = target.find('.display-name').text();

            service
            .getTeacherVIPOrderList({
                userNumber: userNumber,
                displayName: displayName
            })
            .done(function (response) {

                if (response.code === 0) {

                    var responseData = response.data;

                    container.find('.order-list').html(exports.getPersonOrderList(responseData));
                    Tooltip.init(container.find('[data-title]'));

                }

            });

        })

        .on('click', '.teacher-item .qreserve-sign', function (e) { // 闪电约课

            var target = $(e.currentTarget);
            var userNumber = target.closest('.teacher-item').data('number');
            var displayName = target.prev('.display-name').text();
            var iconLightning = target.find('.icon');

            if (target.find('.icon-lightning-o').length) { // 开启

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                service
                .quickLesson({
                    qreserveSign: 1,
                    teacherNum: userNumber
                })
                .done(function (response) {

                    var hint = '你为' + displayName + '开启了闪电约课，TA向你约课及时间修改系统将会自动确认，如需取消请点击闪电标识';

                    if (response.code === 0) {
                        success('闪电约课开启', function () {
                            iconLightning.removeClass('icon-lightning-o').addClass('icon-lightning-circle');
                            iconLightning.data('title', hint);
                        });
                    }
                });

            }
            else if (target.find('.icon-lightning-circle').length) { // 取消

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
                        teacherNum: userNumber
                    })
                    .done(function (response) {

                        var hint = '点击开启闪电' + displayName + '向你发起的约课及时间修改系统将会自动确认';

                        if (response.code === 0) {
                            success('闪电约课关闭', function () {
                                iconLightning.removeClass('icon-lightning-circle').addClass('icon-lightning-o');
                                iconLightning.data('title', hint);
                            });
                        }
                    });

                });

            }

        })

        .on('click', '.order-list .order-item', function (e) { // 从订单跳转至约课页面

            var target = $(e.currentTarget);
            location.href = target.data('url');

        })

        .on('click', '.btn-search-all', function () { // 搜索 - 查看全部

            if (userType == 0) { // 老师

                service
                .getCourseStudentList({
                    keyword: ''
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var responseData = response.data;
                        var studentList = responseData.student_list;

                        container.find('ul.p-list').html(exports.getStudentList(studentList));
                        Tooltip.init(container.find('[data-title]'));

                        container.find('.btn-search-all').hide();
                        // 订单列表 - 重置
                        container.find('.order-list').html(exports.resetOrderList());

                    }

                });
            }
            else if (userType == 2) { // 学生

                service
                .getCourseTeacherList({
                    keyword: ''
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var responseData = response.data;
                        var teacherList = responseData.teacher_list;

                        container.find('ul.p-list').html(exports.getTeacherList(teacherList));
                        Tooltip.init(container.find('[data-title]'));

                        container.find('.btn-search-all').hide();

                        // 订单列表 - 重置
                        container.find('.order-list').html(exports.resetOrderList());

                    }

                });
            }

        })

        .on('click', '.chat-label', function (e) { // 马上交谈，关闭弹窗
            var target = $(e.currentTarget);
            var theDialog = target.closest('.schedule-class-dialog');
            var theDialogMask = theDialog.prev('.dialog-mask');

            theDialogMask.hide();
            theDialog.hide();

        });

        // 搜索 - 关键词
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
        });

    };

    /*
     * 获取学生列表 - 模板 wyj
     */
    exports.getStudentList = function (data) {

        var studentList = '';

        for (var key = 0; key < data.length ; key++) {

            var sex;
            if (data[key].sex == 0) {
                sex = '<i class="icon icon-user text-error"></i>';
            }
            else if (data[key].sex == 1) {
                sex = '<i class="icon icon-user text-info"></i>';
            }
            else {
                sex = '<i class="icon icon-user-o"></i>';
            }

            var qreserveSign;
            if (data[key].qreserve_sign == 1) {
                qreserveSign = '<i class="icon icon-lightning-circle" data-title="' + data[key].display_name + '为你开启了闪电约课，你向该学生约课将被自动确认。课程结束后系统会自动支付课酬。" data-width="20em"></i>';
            }
            else if (data[key].qreserve_sign == 0) {
                qreserveSign = '<i class="icon icon-lightning-o" data-title="闪电约课未开启。学生为你开启闪电约课后，你发起的约课会被系统自动确认。" data-width="20em"></i>';
            }

            var displayName;
            if (data[key].display_name == data[key].sub_display_name) {
                displayName = '<span class="display-name">' + data[key].display_name + '</span>';
            }
            else {
                displayName = '<span class="display-name" data-title="' + data[key].display_name + '">'
                            +     data[key].sub_display_name
                            + '</span>';
            }

            var subjectName;
            if (data[key].subject_name == data[key].sub_subject_name) {
                subjectName = '<span>' + data[key].subject_name + '</span>';
            }
            else {
                subjectName = '<span data-title="' + data[key].subject_name + '">'
                            +     data[key].sub_subject_name
                            + '</span>';
            }

            var remainTime;
            if (data[key].remain_time == 0) {
                remainTime = '<span class="remain-time">暂无</span>';
            }
            else {
                remainTime = '<span class="remain-time"><strong>' + data[key].remain_time + '</strong>小时</span>';
            }

            studentList += '<li class="item student-item" data-number="' + data[key].user_number + '">'

                        +     '<div class="student-info">'
                        +         '<span class="sex">' + sex + '</span>'
                        +         displayName
                        +     '</div>'

                        +     '<div class="subject-name">'
                        +         '<span class="qreserve-sign">' + qreserveSign + '</span>'
                        +          '<i class="icon icon-book-o"></i>'
                        +          subjectName
                        +      '</div>'

                        +     '<div class="remain-time">'
                        +          remainTime
                        +      '</div>'

                        +  '</li>';

        }
        return studentList;
    }

    /*
     * 获取老师列表 - 模板 wyj
     */
    exports.getTeacherList = function (data) {

        var teacherList = '';

        for (var key = 0; key < data.length ; key++) {

            var sex;
            if (data[key].sex == 0) {
                sex = '<i class="icon icon-user text-error"></i>';
            }
            else if (data[key].sex == 1) {
                sex = '<i class="icon icon-user text-info"></i>';
            }
            else {
                sex = '<i class="icon icon-user-o"></i>';
            }

            var qreserveSign;
            if (data[key].qreserve_sign == 1) {
                qreserveSign = '<i class="icon icon-lightning-circle" data-title="你为' + data[key].display_name + '开启了闪电约课，TA向你约课及时间修改系统将会自动确认，如需取消请点击闪电标识" data-width="20em"></i>';
            }
            else if (data[key].qreserve_sign == 0) {
                qreserveSign = '<i class="icon icon-lightning-o" data-title="点击开启闪电约课，' + data[key].display_name + '向你发起的约课及时间修改系统将会自动确认" data-width="20em"></i>';
            }

            var displayName;
            if (data[key].display_name == data[key].sub_display_name) {
                displayName = '<span class="display-name">' + data[key].display_name + '</span>';
            }
            else {
                displayName = '<span class="display-name" data-title="' + data[key].display_name + '">'
                            +     data[key].sub_display_name
                            + '</span>';
            }

            var remainTime;
            if (data[key].remain_time == 0) {
                remainTime = '<span class="remain-time">暂无可约课时</span>';
            }
            else {
                remainTime = '<span class="remain-time">可约：' + data[key].remain_time + '小时</span>';
            }

            var subjectName;
            if (data[key].subject_name == data[key].sub_subject_name) {
                subjectName = '<span>' + data[key].subject_name + '</span>';
            }
            else {
                subjectName = '<span data-title="' + data[key].subject_name + '">'
                            +     data[key].sub_subject_name
                            + '</span>';
            }

            teacherList += '<li class="item teacher-item" data-number="' + data[key].user_number + '">'

                        +     '<a class="avatar-small" href="' + data[key].domain + '" target="_blank">'
                        +          '<img src="' + data[key].avatar + '" alt="头像" />'
                        +     '</a>'

                        +     '<div class="teacher-info">'
                        +          '<span class="sex">' + sex + '</span>'
                        +          displayName
                        +          '<span class="qreserve-sign">' + qreserveSign + '</span>'
                        +          remainTime
                        +     '</div>'

                        +     '<div class="subject-name">'
                        +          '<i class="icon icon-book-o"></i>'
                        +          subjectName
                        +     '</div>'

                        +  '</li>';

        }
        return teacherList;
    }

    /*
     * 获取学生、老师一对一订单列表 - 模板 wyj
     */
    exports.getPersonOrderList = function (data) {

        var orderListData = data.order_list; // 订单信息
        var userInfoData = data.user_info; // 用户信息

        var personOrderList = '';
        var userType = store.get('user').type;
        var orderList = $('.order-list');

        var noDataHint;
        var userChatIdentity;

        if (orderListData.length == 0) {
            if (userType == 0) {
                //这个现在已经不用了 迁移到userCenter/teacherCenter对应目录下
                noDataHint = '<p>' + userInfoData.display_name + '没有剩余课时了<br />快去联系ta继续购买课时吧</p>';
                userChatIdentity = 'student';
                personOrderList += '<div class="no-data">'

                             +     '<img src="' + window.require.toUrl('../../img/center/piezui.png') + '" alt="" class="piezui" />'
                             +     noDataHint

                             +     '<div class="user-contact">'
                             +         '<b class="avatar-small">'
                             +             '<img src="' + userInfoData.avatar + '" alt="用户头像" />'
                             +         '</b>'
                             +         '<span class="user-name">' + userInfoData.display_name + '</span>'
                             +         '<span class="chat-label" data-user-type="' + userChatIdentity + '" data-user-number="' + userInfoData.user_number + '">'
                             +             '<i class="icon icon-chat"></i>'
                             +             '<b>马上交谈</b>'
                             +         '</span>'
                             +         '<span class="user-mobile">联系方式：' + userInfoData.mobile + '</span>';
            }
            else if (userType == 2) {
                noDataHint = '<p>该老师没有可约课订单了<br />快去购买课时吧</p>';
                userChatIdentity = 'teacher';
                personOrderList += '<div class="no-data">'

                             +     '<img src="' + window.require.toUrl('../../img/center/piezui.png') + '" alt="" class="piezui" />'
                             +     noDataHint

                             +     '<div class="user-contact">'
                             +         '<b class="avatar-small">'
                             +             '<img src="' + userInfoData.avatar + '" alt="用户头像" />'
                             +         '</b>'
                             +         '<span class="user-name">' + userInfoData.display_name + '</span>';
                if (userInfoData.im_online_status == 0) {
                    personOrderList += '<div class="chat-wrapper">'
                                     +     '<span class="chat-label offline tiny" data-user-type="' + userChatIdentity + '" data-user-number="' + userInfoData.user_number + '">'
                                     +          '<i class="icon icon-chat"></i>'
                                     +          '<b>离线留言</b>'
                                     +     '</span>'
                                     + '</div>';
                }
                else {
                    personOrderList += '<div class="chat-wrapper">'
                                     +     '<span class="chat-label online tiny" data-user-type="' + userChatIdentity + '" data-user-number="' + userInfoData.user_number + '">'
                                     +          '<i class="icon icon-chat"></i>'
                                     +          '<b>在线咨询</b>'
                                     +     '</span>'
                                     + '</div>';
                }

                personOrderList += '<span class="user-mobile">联系方式：' + userInfoData.mobile + '</span>'
                                +  '<a href="' + userInfoData.domain + '">继续购买课程&gt;&gt;</a>';
            }
            
            personOrderList +=      '</div>'
                             +  '</div>';

            return personOrderList;

        }

        for (var key in orderListData) {

            var lessonWay;
            switch (orderListData[key].lesson_way) {
                case 1:
                    lessonWay = '双方协商'; break;
                case 2:
                    lessonWay = '在线授课'; break;
                case 4:
                    lessonWay = '学生上门'; break;
                case 8:
                    lessonWay = '老师上门'; break;
            }

            '<span>上课人：' + orderListData[key].real_student + '</span>'

            var realStudent;
            if (orderListData[key].real_student == orderListData[key].sub_real_student) {
                realStudent = '<span>上课人：' + orderListData[key].real_student + '</span>';
            }
            else {
                realStudent = '<span data-title="' + orderListData[key].real_student + '">上课人：'
                            +     orderListData[key].sub_real_student
                            + '</span>';
            }

            var subjectName;
            if (orderListData[key].subject_name == orderListData[key].sub_subject_name) {
                subjectName = '<span class="course-name">' + orderListData[key].subject_name + '</span>';
            }
            else {
                subjectName = '<span  class="course-name" data-title="' + orderListData[key].subject_name + '">'
                            +     orderListData[key].sub_subject_name
                            + '</span>';
            }

            personOrderList += '<div class="order-item" data-url="' + orderListData[key].url + '">'

                             +     '<div class="order-header">'
                             +         '<span class="order-id">订单号：' + orderListData[key].purchase_id + '</span>'
                             +         '<span class="order-date">' + orderListData[key].created_at + '</span>'
                             +     '</div>'

                             +     '<table class="order-body"><tbody><tr>'

                             +         '<td class="course-info">'
                             +             subjectName
                             +             '<div>'
                             +                 '<span class="label-default tiny">' + lessonWay + '</span>';

            if (orderListData[key].real_student) {
                personOrderList +=            realStudent;
            }

            personOrderList +=             '</div>'
                             +         '</td>'

                             +         '<td class="order-time">'
                             +             '<div class="remain-time">'
                             +                 '可约：<span class="text-primary">' + orderListData[key].remain_time + '</span>小时'
                             +             '</div>'
                             +             '<div class="total-time">'
                             +                 '总时长：<span class="text-primary">' + orderListData[key].total + '</span>小时'
                             +             '</div>'
                             +         '</td>'

                             +     '</tr></tbody></table>'

                             +  '</div>';
        }

        return personOrderList;
    }

    /*
     * 订单列表重归至初登录状态 - 模板 wyj
     */
    exports.resetOrderList = function (data) {

        var resetOrderListCont = '';
        var userType = store.get('user').type;

        var hint;
        if (userType == 0) {
            hint = '<p>请在左侧选择你要排课的学生</p>';
        }
        else if (userType == 2) {
            hint = '<p>请在左侧选择你要约课的老师</p>';
        }

        resetOrderListCont += '<div class="not-choice-person">'
                           +     '<img src="' + window.require.toUrl('../../img/center/tiaopi.png') + '" alt="" class="tiaopi" />'
                           +      hint
                           +  '</div>';

        return resetOrderListCont;
    };

});