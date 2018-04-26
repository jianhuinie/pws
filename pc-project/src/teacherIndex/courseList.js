define(function (require, exports) {

    'use strict';
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var service = require('common/service');
    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');
    var header = require('./header');
    var comment = require('./teacherComment');

    var container = $('#content').find('.teacher-course-list');

    /*
     * 倒计时
     */
    function dateFormat(time) {

        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
            (hour > 9 ? hour : '0' + hour) + '时'+
            (minute > 9 ? minute : '0' + minute) +'分' +
            (second > 9 ? second : '0' + second) + '秒';

        return time_txt;
    }

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

    exports.init = function () {

        if (store.get('initHeader')) {
            header.init();
            store.set('initHeader',false);
            comment.init();
        }

        // 初始化倒计时
        var priceTip = container.find('.limit-discount');
        if (priceTip.length > 0) {

            priceTip.each(function(i, item){
                var element = $(item);
                var cur = null,
                    begin = null,
                    end = null,
                    left = null,
                    time = element.find('.time');

                if (element.hasClass('price-tip-begin')) {
                    cur = element.data('cur');
                    begin = element.data('start');
                    left = begin - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }

                if (element.hasClass('price-tip-end')) {
                    cur = element.data('cur');
                    end = element.data('end');
                    left = end - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }
            })
        }

        container
        .on('mouseover', '.get-coupon', function () { // 领取优惠券
            container.find('.coupon').show();
        })
        .on('mouseout', '.get-coupon', function (e) {
            var target = $(e.currentTarget);
            target.find('.coupon').hide();
        })
        .on('click', '.coupon-color', function (e) {
            var target = $(e.currentTarget);
            var serialNum = target.data('num');
            var haslogin = store.get('haslogin');

            if (haslogin) {
                if (store.get('user').type === 0) {

                    service
                        .getUserType()
                        .done(function (response) {
                            if (response.code === 0) {
                                var roles = response.data.roles;
                                var hasStudentRole = getHasStudentRole(roles);
                                var text = '';

                                if (hasStudentRole) {
                                    text = '你目前是老师身份，需要切换到学生身份才能领取优惠券';
                                }
                                else {
                                    text = '你目前是老师身份，无法领取优惠券，是否开通学生身份？';
                                }
                                // 变更身份
                                new BanLessonDialog({
                                    text: text,
                                    hasStudentRole: hasStudentRole,
                                    next: '0',
                                    onSuccess: function () {
                                        location.reload();
                                    },
                                    noskip: false
                                });
                            }
                        });
                } else {

                    service
                        .receiveCoupon({
                            serialNum: serialNum
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('领取成功');
                            }
                        });

                }
            }
            else {
                new LoginDialog({
                    wrongRoleText: '你目前是老师身份，无法领取优惠券，是否开通学生身份？',
                    onSuccess: function () {
                        location.reload();
                    },
                    failNext: '0'
                });
            }
        })
        .on('click', '.course-tag span', function () { // 课程标签ajax
            var target = $(this);

            if (target.hasClass('active')) {
                return false;
            }
            else {
                target.addClass('active').siblings().removeClass('active');

                // 存储当前课程tag
                store.set('courseTag', target.data('id'));

                service
                .getCourseAjax({
                    number: store.get('teacherNum'),
                    type: store.get('courseType'),
                    tagId: store.get('courseTag'),
                    page: 1
                })
                .done(function (response) {
                    if (response.code === 0) {

                        container
                        .find('#course-list')
                        .html(response.data.tpl.course_list);

                        Tooltip.init(container.find('[data-title]'));

                    }
                });
            }
        })
        .on('click', '.pager [data-page]', function (e) { // 翻页ajax
            var target = $(this);

            service
            .getCourseAjax({
                number: store.get('teacherNum'),
                type: store.get('courseType'),
                tagId: store.get('courseTag'),
                page: target.data('page')
            })
            .done(function (response) {
                if (response.code === 0) {

                    container
                    .find('#course-list')
                    .html(response.data.tpl.course_list);

                    Tooltip.init(container.find('[data-title]'));
                }
            });

            e.preventDefault();
        });


    };
});