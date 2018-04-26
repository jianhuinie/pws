/**
 * @file 考研专区打包课/组合课 - 提交订单
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');
    var form = require('common/form');
    var store = require('common/store');

    var container = $('#main');

    // 表单验证全项
    var validator = new Validator({
        element: container,
        fields: {
            student_name: {
                errors: {
                    required: '请输入上课人姓名'
                }
            }
        }
    });

    exports.init = function () {

        // 给老师留言
        var editor = new Editor({
            element: container.find('.note'),
            maxLength: 200
        });

        container
        .on('change', 'input[name="self"]', function (e) { // 是否本人上课
            var target = $(e.currentTarget);
            var studentName = container.find('.student-name');

            if (target.val() == 1) {
                studentName.hide();
            }
            else {
                studentName.show();
                if (studentName.hasClass('has-error')) {
                    studentName.removeClass('has-error');
                }
            }
        });

        // 提交订单
        var saveBtn = new SaveButton({
            element: container.find('#btn-submit'),
            saveText: '正在提交...',
            save: function () {
                var formData = form.parse(container.find('.form'));
                var data = {};
                data.courseNumber = store.get('courseNumber');
                data.isSelf = formData.self;
                data.studentName = formData.student_name;
                data.note = formData.note;

                // 非本人上课，上课人必填
                if (!data.isSelf && !validator.validate('student_name')) {
                    return;
                }

                var url = '';
                if (store.get('courseType') == 7) { // 组合课
                    url = 'https://' + location.host + '/pay/createPackageProductPurchase';
                }
                else { // 考研－打包课
                    url = 'https://' + location.host + '/pay/createUnionProductPurchase';
                }

                return service
                .createPackagePurchase(
                    url,
                    data,
                    {
                        errorHandler: {
                            '100014': function (response) {

                                var text = store.get('user').id == teacherId
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
                                                location.href = 'http://' + store.get('env') + '.genshuixue.com/order/studentOrders';
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
                                    '已经开课，不能再提交订单',
                                    '温馨提示'
                                );
                            },
                            '100051': function (response) {
                                alert({
                                    title: '温馨提示',
                                    content: '当前课程无法购买',
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
                                    content: '来晚了一步！<br />目前课程已经报满，你可以联系老师增加名额。',
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

                        if (data.err_code && data.err_code == '66') {
                            alert({
                                title: '温馨提示',
                                content: '该课程订单已经存在，是否查看？',
                                buttons: [
                                    {
                                        text: '取消',
                                        handler: function () {
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '查看订单',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                            location.href = data.order_url;
                                        }
                                    }

                                ]
                            });
                            return;
                        }

                        var envMap = {
                            'test-kaoyan': 'test',
                            'test': 'test',
                            'beta-kaoyan': 'beta',
                            'beta': 'beta',
                            'kaoyan': 'www',
                            'www': 'www'
                        };

                        if (store.get('price') === "0.00") {
                            success('提交成功', function () {
                                location.href = 'https://' + envMap[store.get('env')] + '.genshuixue.com/pay/result?purchase_id=' + data.purchase_id;
                            });
                        }
                        else {
                            location.href = 'https://' + envMap[store.get('env')] + '.genshuixue.com/pay/payProductPurchase?purchase_id=' + data.purchase_id;
                        }
                    }
                });

            }
        });

    }

});