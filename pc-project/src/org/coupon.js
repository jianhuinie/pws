/**
 * @file 提交
 * @author zhengjunxin
 */

 define(function (require) {
    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var LoginDialog = require('common/component/LoginDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');

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


    return {
        init: function () {

            var serialNum = store.get('serial_num');

            $('.btn-receive')
            .click(function (e) {

                var target = $(e.currentTarget);
                var haslogin = target.data('haslogin');

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
                            serialNum: serialNum,
                            ch: store.get('ch')
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                confirm({
                                    content: '恭喜你领取成功！',
                                    title: '温馨提示',
                                    width: 320,
                                    buttons: [
                                        {
                                            text: '马上去用',
                                            type: 'primary',
                                            handler: function () {
                                                // 老师个人主页
                                                window.location.href = response.data.url;
                                            }
                                        },
                                        {
                                            text: '查看优惠券',
                                            handler: function () {
                                                this.hide();
                                                // 学生用户中心
                                                window.location.href = '/student_center/coupon';
                                            }
                                        }
                                    ]
                                });
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


            });

        }
    }
});