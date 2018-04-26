/**
 * @file 提交订单 - 联报优惠课程订单
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var multiply = require('cobble/function/multiply');
    var minus = require('cobble/function/minus');
    var Validator = require('cobble/form/Validator');

    var student = require('./order/student');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');

    var SaveButton = require('common/component/SaveButton');
    var container = $('#main');

    var validator = new Validator({
        element: container,
        fields: {
            name: {
                errors: {
                    required: '请填写姓名',
                    minlength: '请输入最少2个字符',
                    maxlength: '请将字数控制在2-30个字以内',
                    pattern: '请输入汉字、字母、空格、点号等格式的姓名'
                }
            },
            mobile: {
                errors: {
                    required: '请输入手机号',
                    pattern: '手机号码错误'
                }
            },
            code: {
                errors: {
                    required: '请输入验证码'
                }
            },
            student_name: {
                errors: {
                    required: '请输入上课人姓名'
                }
            },
            password: {
                errors: {
                    required: '请输入支付密码'
                }
            }
        }
    });

    function createUnionPurchase(data) {

        var formData = student.getData();

        var isSelf = formData.self == 1;

        var teacherNumber = store.get('teacherNumber');
        var payAmount = data.payAmount;

        return service
        .createUnionPurchase(
            data,
            {
                errorHandler: {
                    '100014': function (response) {

                        var text = store.get('user').number == teacherNumber
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
                            content: '来晚了一步！<br />目前班课已经报满，你可以联系老师增加名额。',
                            buttons: [
                                {
                                    text: '返回老师主页',
                                    type: 'primary',
                                    handler: function () {
                                        location.href = '/t/' + store.get('teacherNumber');
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

                if (payAmount == 0) {
                    success('提交成功', function () {
                        location.href = '/pay/result?purchase_id=' + data.purchase_id;
                    });
                }
                else {
                    location.href = '/pay/payProductPurchase?purchase_id=' + data.purchase_id;
                }
            }

        });
    }

    exports.init = function () {

        student.init({
            validator: validator
        });

        var saveBtn = new SaveButton({
            element: $('#btn-submit'),
            saveText: '正在提交...',
            save: function () {

                if (!student.validate(['name'])) {
                    return;
                }

                var data = {};
                data.courseNumbers = store.get('courseNumbers');
                data.activityId = store.get('activityId');

                // 3810 二次确认弹窗
                confirm({
                    title: '温馨提示',
                    content: '支付成功后课酬将直接支付给机构，无法通过跟谁学平台申请退款。',
                    width: 200,
                    buttons: [
                        {
                            text: '确认提交订单',
                            type: 'primary',
                            handler: function () {
                                $.extend(data, student.getData());
                                return createUnionPurchase(data);
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
        });

    };

});