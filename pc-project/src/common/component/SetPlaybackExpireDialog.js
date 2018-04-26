/**
 * @file 设置回放视频有效期
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    /**
     * 设置回放视频有效期
     *
     * @param {Object} options 配置信息
     * @property {string=} options.courseNum 直播课number
     * @property {string=} options.expireDay 当前有效期
     */
    function SetPlaybackExpireDialog(options) {
        $.extend(this, SetPlaybackExpireDialog.defaultOptions, options);
        this.init();
    }

    SetPlaybackExpireDialog.prototype = {

        init: function () {

            var me = this;
            var expireDay = me.expireDay;

            var content = ''
                        + '<div class="form form-group">'
                        +    '<div class="form-controls">'

                        +        '<label class="form-radio">'
                        +           '回放有效期'
                        +        '</label>'

                        +        '<i class="icon icon-subtract-o"></i>'
                        +        '<input type="text" class="form-text" required pattern="^\\d+$" min="1" max="365" name="expire_day" />天'
                        +        '<i class="icon icon-plus-o"></i>'
                        +        '<i class="icon icon-question-circle text-info" data-title="回放截止时间＝课节时间＋回放有效期"></i>'
                        +        '<br />'
                        +        '<span class="error"></span>'
                        +    '</div>'
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
            var expireDayInput = element.find('input[name="expire_day"]');

            // 初始化提示
            Tooltip.init(element.find('[data-title]'));

            // 反显数据
            expireDayInput.val(expireDay);

            // 验证对象
            me.validator = new Validator({
                element: element,
                realtime: true,
                fields: {
                    expire_day: {
                        errors: {
                            min: '至少设置一天哦',
                            max: '最多可设置365天',
                            pattern: '请输入整数',
                            required: '请输入有效期'
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

                        var data = form.parse(element);
                        return service
                        .setPlaybackExpireDay({
                            number: me.courseNum,
                            courseType: me.courseType,
                            expireDay: data.expire_day
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('设置成功', function() {
                                    location.reload();
                                });
                            }
                        });

                    }

                }
            });

            var canEditExpire = true;

            element
            .on('click', '.icon-subtract-o', function () { // 减
                var expireDayTemp = expireDayInput.val();

                if (expireDayTemp > 1 && canEditExpire) {
                    expireDayInput.val(--expireDayTemp);
                }
            })

            .on('click', '.icon-plus-o', function () { // 加
                var expireDayTemp = expireDayInput.val();

                if (expireDayTemp < 365 && canEditExpire) {
                    expireDayInput.val(++expireDayTemp);
                }
            })

            .on('blur', 'input[name="expire_day"]', function (e) { // 天数，失焦验证
                if (!me.validator.validate()) {
                    canEditExpire = false;
                }
                else {
                    canEditExpire = true;
                }
            })

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

    SetPlaybackExpireDialog.defaultOptions = {
        title: '回放视频有效期',
        width: 250,
        onSuccess: $.noop,
        skinClass: 'set-expire-dialog'
    };

    return SetPlaybackExpireDialog;
});