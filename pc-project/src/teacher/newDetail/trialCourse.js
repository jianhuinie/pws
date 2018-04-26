/**
 * @file 老师详情页 - 试听课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Editor = require('common/component/Editor');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');

    var container = $('#trial-course');

    exports.init = function () {

        var noteEditor = new Editor({
            element: container.find('.form-editor'),
            maxLength: 200
        });

        // 验证
        var validator = new Validator({
            element: container.find('.form'),
            fields: {
                price: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择试听方式'
                    }
                },
                note: {
                    rules: {
                        required: true,
                        maxlength: 200
                    },
                    errors: {
                        required: '请填写试听留言',
                        maxlength: '请将字数控制在 200 字以内'
                    }
                }
            }
        });

        container
        .on('click', '.lesson-way', function (e) {
            var target = $(e.currentTarget);
            var formControls = target.closest('.form-controls');
            var lessonWay = formControls.find('input[name="lesson_way"]');
            var price = formControls.find('input[name="price"]');

            if (target.hasClass('active')) {
                target.removeClass('active');
                lessonWay.val('');
                price.val('');

            } else {
                formControls
                .find('.lesson-way')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');
                lessonWay.val(target.data('way'));
                price.val(target.data('price'));
                target.closest('.form-group').removeClass('has-error');
            }
        })

        .on('click', '.btn-trial', function (e) { // 预约试听
            if (validator.validate()) {
                var trialStatus = store.get('trialStatus');
                if (trialStatus == 4) { // 4:预约后但还没支付
                    confirm({
                        content: '您之前已经预约试听，但是未成功支付<br />是否马上去完成支付？',
                        title: '温馨提示',
                        width: 330,
                        buttons: [
                            {
                                text: '立即支付',
                                type: 'primary',
                                handler: function () {
                                    location.href = '/pay/payProductPurchase?purchase_id=' + store.get('trialPurchaseId');  // 跳到支付页
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
                else if (trialStatus == 1 || trialStatus == 2) { // 1+2进行中
                    confirm({
                        content: '您已经成功预约试听，无需重复预约<br />请前往订单页面查看详情',
                        title: '温馨提示',
                        width: 330,
                        buttons: [
                            {
                                text: '查看订单',
                                type: 'primary',
                                handler: function () {
                                    location.href = '/order/studentOrderDetail?purchase_id=' + store.get('trialPurchaseId');  // 跳到订单详情页
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
                else {
                    // 试听课，type＝5
                    var url = '/pay/productDetail?'
                            + 'tUId=' + store.get('teacherId')
                            + '&lesson_way=' + container.find('input[name="lesson_way"]').val()
                            + '&note=' + container.find('textarea[name="note"]').val()
                            + '&type=5';
                    if (url) {
                        // 判断用户身份
                        reserveCourseCheck(url);
                    }
                }
            }
        })

        .on('click', '.person-phone', function (e) { // 拨打电话联系老师
            var target = $(e.currentTarget);
            new MakePhoneCallDialog({
                from: store.get('user').number,
                to: target.data('number'),
                mobile: store.get('user').mobile,
                name: target.data('name')
            });
        });

    };

    /*
     * 约课检查
     */
    function reserveCourseCheck(url) {
        // 如果是自己看自己页面点击约课弹出如下内容
        if (store.get('teacherNum') == store.get('user').number) {
            alert({ title: '温馨提示',
                    content: '您不能购买自己的课哦~',
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
                        next: url,
                        noskip: false
                    });
                }
            });

        }
        else {
            location.href = url;
        }
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

});