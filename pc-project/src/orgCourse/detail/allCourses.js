define(function (require,exports) {

    'use strict';

    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var service = require('common/service');

    var container = $('#all-courses');
    var lessonWayMap = {
        2: 'online',
        4: 'student'
    };

    /**
     * 获取是否有学生身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
                if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }

    /**
     * 尝试报名 - 一对一
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     *
     * XX @param buyWay 售卖方式，1按课时卖 2按期卖(只能是此种情况)
     * @param courseNum
     * @param lessonWay
     */
    function tryToEnroll(courseNum, lessonWay) {

        // 适用用户登录的情况
        if (store.get('user').type === 0) {
            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasStudentRole = getHasStudentRole(roles);
                    var text = '';

                    if (hasStudentRole) {
                        text = '你目前是老师身份，需要切换到学生身份才能向TA约课';
                    }
                    else {
                        text = '你目前是老师身份，无法向TA约课，是否开通学生身份？';
                    }
                    //约课 变更身份后需要刷新当前页面
                    new BanLessonDialog({
                        text: text,
                        hasStudentRole: hasStudentRole,
                        onSuccess: function(){
                            enroll(courseNum, lessonWay)
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        }
        else {
            enroll(courseNum, lessonWay)
        }
    }

    /**
     * 报名 - 一对一
     *
     * XX @param buyWay 售卖方式，1按课时卖 2按期卖(只能是此种情况)
     * @param courseNum
     * @param lessonWay
     */
    function enroll(courseNum, lessonWay) {

        // 按课时卖，默认必须从详情页下单，父课型理论不会出现这种情况
        // 一对一按期卖，默认时长取1
        var hours = 1;

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: 11,
            lesson_way: lessonWayMap[lessonWay],
            hours: hours
        };

        var search = $.param(params);
        enrollUrl += '?' + search;

        location.href = enrollUrl;
    }

    /**
     * 尝试报名 - 班课
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnrollTwo(courseNum, lessonWay, price) {

        // 适用用户登录的情况
        if (store.get('user').type === 0) {
            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasStudentRole = getHasStudentRole(roles);
                    var text = '';

                    if (hasStudentRole) {
                        text = '你目前是老师身份，需要切换到学生身份才能向TA约课';
                    }
                    else {
                        text = '你目前是老师身份，无法向TA约课，是否开通学生身份？';
                    }
                    //约课 变更身份后需要刷新当前页面
                    new BanLessonDialog({
                        text: text,
                        hasStudentRole: hasStudentRole,
                        onSuccess: function(){
                            if (lessonWay == 2 && price == 0) {
                                freerollTwo(courseNum);
                            }
                            else {
                                enrollTwo(courseNum)
                            }
                        },
                        next: location.href,
                        noskip: false
                    });
                }
            });
        }
        else {
            if (lessonWay == 2 && price == 0) {
                freerollTwo(courseNum);
            }
            else {
                enrollTwo(courseNum)
            }
        }
    }

    /**
     * 报名 - 班课
     */
    function enrollTwo(courseNum) {

        // 报名url
        var enrollUrl = '/pay/productDetail';
        var params = {
            course_number: courseNum,
            type: 12
        };
        var search = $.param(params);
        enrollUrl += '?' + search;

        location.href = enrollUrl;
    }

    /**
     * 免费课报名 - 班课
     */
    function freerollTwo(courseNum) {

        // 忽略每个课程，老师自己约自己课的逻辑
        var teacherNumber = store.get('teacherNumber');

        var data = {};
        data.type = 12;
        data.courseNumber = courseNum;
        data.studentName = store.get('name');
        data.name = store.get('name');
        data.pay_money = 0;
        data.isSelf = 1; // 是否自己上课
        data.usePlatEnsure = 1; // 是否平台保障
        data.isSms = 0; // 是否接收短信

        return service
        .createfreePurchase(
            data,
            {
                errorHandler: {
                    '100014': function (response) {
                        var text = store.get('user').user_number == teacherNumber
                                 ? '你不能约自己的课'
                                 : '权限错误';

                        alert(text, '温馨提示');
                    },
                    '6': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '不好意思，同一节课不能重复报名哦~<br />'
                                   + '如果你之前提交过订单未支付，请去 <span class="text-primary">我的订单'
                                   + ' &gt; 待支付</span> 完成支付',
                            buttons: [
                                {
                                    text: '查看我的订单',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        location.href = '/order/studentOrders';
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
                    },
                    '100039': function (response) {
                        alert(
                            '班课已经开课，不能再提交订单',
                            '温馨提示'
                        );
                    },
                    '100051': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '当前班课无法购买',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    },
                    '100040': function (response) {
                        alert({
                            title: '温馨提示',
                            content: '来晚了一步！<br />目前课程已报满，你可以联系机构增加名额',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        )
        .done(function (response) {

            if (response.code === 0) {
                var data = response.data;

                if (data.err_code && data.err_code == '66') {

                    confirm({
                        title: '温馨提示',
                        content: '该课程订单已经存在，是否查看？',
                        buttons: [
                            {
                                text: '查看订单',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                    location.href = data.order_url;
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
                    return;
                }

                success('提交成功', function () {
                    location.reload();
                });
            }
        });
    }

    exports.init = function () {

        container
        .on('click', '.reserve-course', function () { // 报名课程

            var me = $(this);
            var courseNum = me.data('number');
            var lessonWay = me.data('lessonway');
            var price = me.data('price');

            if (store.get('courseType') == 11) { // 机构X课 - 一对一

                // 如果用户没登陆,弹出登陆框
                if (!store.get('user').number) {
                    new LoginDialog({
                        onSuccess: function () {
                            tryToEnroll(courseNum, lessonWay);
                        }
                    });
                    return;
                }

                tryToEnroll(courseNum, lessonWay);
            }
            else if (store.get('courseType') == 12) { // 机构X课 - 班课

                // 如果用户没登陆,弹出登陆框
                if (!store.get('user').number) {
                    new LoginDialog({
                        onSuccess: function () {
                            tryToEnrollTwo(courseNum, lessonWay, price);
                        }
                    });
                    return;
                }

                tryToEnrollTwo(courseNum, lessonWay, price);
            }
        })
    }

});