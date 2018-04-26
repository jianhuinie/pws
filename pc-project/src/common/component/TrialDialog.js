/**
 * @file 预约试听
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var Editor = require('common/component/Editor');
    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');

    /**
     * 预约试听对话框
     *
     * @param {Object} options
     * @property {Object} options.data 用户预约试听详情
     */
    function TrialDialog(options) {
        $.extend(this, options);
        this.init();
    }

    TrialDialog.prototype = {

        init: function () {

            var me = this;
            var data= me.data;

            var dialog = new Dialog({
                title: '预约试听',
                content: tpl(data),
                width: 609,
                skinClass: ''
            });
            var element = dialog.element;

            me.noteEditor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 200
            });

            // 预约试听表单验证
            me.validator = new Validator({
                element: element,
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

            element
            .on('click', '.btn-cancel', function () { // 取消
                me.dialog.hide();
            })

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
            });

            // 预约试听
            me.saveBtn = new SaveButton({
                element: element.find('.btn-trial'),
                save: function () {
                    if (me.validator.validate()) {
                    var trialStatus = store.get('trial').status;
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

                                        location.href = '/pay/payProductPurchase?purchase_id=' + store.get('trial').data.purchase_id;  // 跳到支付页

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

                                        location.href = '/order/studentOrderDetail?purchase_id=' + store.get('trial').data.purchase_id;  // 跳到订单详情页

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
                            + '&lesson_way=' + element.find('input[name="lesson_way"]').val()
                            + '&note=' + element.find('textarea[name="note"]').val()
                            + '&type=5';
                        location.href = url;
                    }
                }

                }
            });

        }
    }

    var tpl = etpl.compile(''
            + '<div id="trial-course">'
            +    '<div class="trial-body">'
            +       ' <div class="trial-content">'
            +           ' <div class="course-length">'
            +               '试听课'
            +               '<span class="text-primary">'
            +                   '${length}'
            +               '</span>'
            +               '小时'
            +           '</div>'
            +            '<div class="form">'
            +               '<div class="form-group">'
            +                   '<label class="form-label">'
            +                       '试听方式及价格：'
            +                   '</label>'
            +                   '<div class="form-controls">'
            +                       '<input type="hidden" name="lesson_way" />'
            +                       '<input type="hidden" name="price" required />'
            +                       '<!-- if: ${price_online} -->'
            +                       '<span class="lesson-way" data-way="online" data-price="${price_online}">'
            +                           '在线试听'
            +                           '<em class="text-primary">'
            +                               '<!-- if: ${price_online} == "0" -->'
            +                                   '免费'
            +                               '<!-- else -->'
            +                                   '¥ ${price_online}'
            +                               '<!-- /if -->'
            +                           '</em>'
            +                       '</span>'
            +                       '<!-- /if -->'
            +                       '<!-- if: ${price_offline} -->'
            +                       '<span class="lesson-way" data-way="offline" data-price="${price_offline}">'
            +                           '线下试听'
            +                           '<em class="text-primary">'
            +                               '<!-- if: ${price_offline} == "0"-->'
            +                                   '免费'
            +                               '<!-- else -->'
            +                                   '¥ ${price_offline}'
            +                               '<!-- /if -->'
            +                           '</em>'
            +                        '</span>'
            +                       '<!-- /if -->'
            +                       '<span class="error"></span>'
            +                   '</div>'
            +               '</div>'
            +               '<div class="form-group">'
            +                   '<label class="form-label">'
            +                       '给老师留言：'
            +                   '</label>'
            +                   '<div class="form-controls">'
            +                       '<div class="form-editor">'
            +                           '<textarea class="form-text" name="note" required placeholder="XXX老师好！我想预约您在线试听。预约时间为13号上午10:00，想试听三角函数"></textarea>'
            +                           '<div class="form-hint">'
            +                               '还可以输入 <strong>200</strong> 个字'
            +                           '</div>'
            +                       '</div>'
            +                       '<span class="error words-error"></span>'
            +                   '</div>'
            +               '</div>'

            +               '<div class="form-action">'
            +                   '<button class="btn-primary btn-trial">'
            +                       '预约试听'
            +                   '</button>'
            +               '</div>'

            +           '</div>'
            +       '</div>'
            +   '</div>'
            + '</div>'
    );

    return TrialDialog;

});