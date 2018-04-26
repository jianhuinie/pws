/**
 * @file 老师会员咨询弹框
 * @author wangyujie
 */
 define(function (require, exports) {

    var ractiveDialog = require('../../../common/function/ractiveDialog');
    var service = require('./service');
    var Validator = require('custom/form/Validator');

    /**
     * @param {Object} options
     * @property {Function=} options.onsuccess
     */
    return function (options) {

        options = options || {};

        var dialog = ractiveDialog({
            template: require('html!./ConsultMemberDialog.html'),
            data: {
                style: require('text!./ConsultMemberDialog.styl'),
                addressSelectOptions: {
                    className: 'address-select',
                    province: {
                        name: 'category1',
                        className: 'province-select',
                        defaultText: '— 省 —',
                        data: null,
                        value: ''
                    },
                    city: {
                        name: 'category2',
                        className: 'city-select',
                        defaultText: '— 市 —',
                        data: null,
                        value: ''
                    }
                },
                mobileInputOptions: {
                    name: 'mobile',
                    className: 'mobile-input',
                    value: '',
                    placeholder: '请输入您的手机号码',
                    lazy: true
                },
                messageInputOptions: {
                    name: 'message',
                    className: 'message-input',
                    value: '',
                    multiple: true,
                    placeholder: '在此可输入您想咨询的任何与老师会员相关的问题'
                }
            },
            components: {
                AddressSelect: require('../../../common/component/AddressSelect'),
                Input: require('../../../common/component/Input'),
            },
            onrender: function () {
                var me = this;

                service
                .getTeacherLocationAjax()
                .done(function (response) {
                    if (response.code === 0) {
                        me.set('addressSelectOptions.province.value', response.data.province_id);
                        me.set('addressSelectOptions.city.value', response.data.city_id);
                        me.set('mobileInputOptions.value', response.data.mobile);
                    }
                });
            },
            save: function () {
                var me = this;

                me.validator = new Validator({
                    mainElement: $('.consult-member-dialog'),
                    validateOnBlur: true,
                    fields: {
                        category1: {
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您所在的省'
                            }
                        },
                        category2: {
                            before: function (data) {
                                var category1 = data.category1;
                                if (category1 && !category1.value) {
                                    return false;
                                }
                            },
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您所在的市'
                            }
                        },
                        mobile: {
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您的手机号码'
                            }
                        },
                        message: {
                            rules: {
                                maxlength: 100
                            },
                            errors: {
                                maxlength: '请将字数控制在100字以内'
                            }
                        }
                    }
                });

                if (me.validator.validate(true)) {
                    service
                    .vipTeacherRecord({
                        cityId: me.get('addressSelectOptions.city.value'),
                        mobile: me.get('mobileInputOptions.value'),
                        info: me.get('messageInputOptions.value')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            tip({
                                type: 'success',
                                content: '发送成功'
                            });
                        }
                    });
                }
            },
            close: function () {
                dialog.hide();
            }
        });

        return dialog;
    };

 });