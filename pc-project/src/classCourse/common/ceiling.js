define(function (require,exports) {
    'use strict';
    var store = require('common/store');
    var service = require('common/service');
    var Dialog = require('cobble/ui/Dialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var AdvisoryDialog = require('common/component/AdvisoryDialog');
    var kfAdvisoryDialog = require('common/component/kfAdvisoryDialog');
    var container = $('#ceiling');
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
     * 尝试报名
     *
     * 这里约束身份条件
     * 1.不能自己约自己
     * 2.老师身份要切换到学生身份
     */
    function tryToEnroll() {

        var enrollUrl = store.get('enrollUrl');

        // 适用用户登录的情况
        if (store.get('teacherNum') == store.get('user').number) {
            alert({
                title: '温馨提示',
                content: '您不能购买自己的课哦',
                buttons: [{
                    text: '我知道了',
                    type: 'primary',
                    handler: function(){
                        this.hide();
                    }
                }]
            });
            return ;
        }

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
                                enroll();
                            },
                            next: location.href,
                            noskip: false
                        });
                    }
                });
        } else {
            enroll();
        }
    }

    /**
     * 报名
     */
    function enroll() {
        var enrollUrl = store.get('enrollUrl');
        if (store.get('hasEnrolled')) {
            if (!store.get('hasPaid')) {
                confirm({
                    title: '温馨提示',
                    content: ''
                    +   '<div>'
                    +       '<p>您已经报名该班课但是还未完成支付，请前往支付。</p>'
                    +       '<p>如需取消报名，请前往<a href="/order/studentOrders" class="text-primary">我的订单</a>完成</p>'
                    +   '</div>',
                    buttons: [
                        {
                            text: '前往支付',
                            type: 'primary',
                            handler: function () {
                                location.href = ('/pay/payProductPurchase?purchase_id=' + store.get('purchaseId'));
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
        else {
            location.href = enrollUrl;
        }
    }

    exports.init = function () {
        var courseNum = store.get('courseNum');
        var courseType = store.get('courseType');

        window.onscroll = function () {
            var screenTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (screenTop > 530) {
                $('#ceiling').show().css('position','fixed').css('top','0');
            }
            else {
                $('#ceiling').hide();
            }
        };
    }
});