/**
 * @file 增发优惠券弹出层
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    /**
     * 增发优惠券
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 成功后的回调
     * @property {string=} options.serialNum 优惠券识别码
     */
    function AddCouponsDialog(options) {

        $.extend(this, AddCouponsDialog.defaultOptions, options);

        this.init();
    }

    AddCouponsDialog.prototype = {

        init: function () {

            var me = this;

            var content = ''
                        + '<div class="form form-group">'
                        +     '<label class="form-label">'
                        +         '请输入优惠券张数'
                        +         '<span class="hint">（最多1000张）</span>'
                        +     '</label>'
                        +     '<input type="text" name="nums" class="form-text" pattern="^\\d+$" min="1" max="1000" />'
                        +     '<span class="error"></span>'
                        + '</div>'

                        + '<div class="form-action">'
                        +     '<button class="btn-primary btn-save">确定</button>'
                        +     '<button class="btn-default btn-cancel">取消</button>'
                        + '</div>';

            me.dialog = new Dialog({
                title: me.title,
                content: content,
                width: me.width,
                skinClass: me.skinClass
            });


            var element = me.dialog.element;

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    nums: {
                        errors: {
                            min: '至少1张',
                            max: '最多1000张',
                            pattern: '请输入张数'
                        }
                    }
                }
            });

            // 保存表单
            me.saveButton = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    // 验证后操作
                   if (me.validator.validate()) {

                        return service
                        .raiseCouponTotalCount({
                            serialNum: me.serialNum,
                            addCount: element.find('input[name="nums"]').val()
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('增发成功', function() {
                                    location.reload();
                                });
                            }
                        });

                    }

                }
            });

            element
            .on('click', '.btn-cancel', function () { // 取消
                me.dialog.hide();
            });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    AddCouponsDialog.defaultOptions = {
        title: '增发优惠券',
        width: 355,
        onSuccess: $.noop,
        skinClass: 'add-coupon-dialog'
    };

    return AddCouponsDialog;
});