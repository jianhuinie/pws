/**
 * @file 基本信息编辑
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Popup = require('custom/helper/Popup');
    var Validator = require('custom/form/Validator');
    var service = require('../../offlineCourseEdit/service');
    var org_id = '';

    // var NO_APPOINTMENT = 0;
    // var IS_APPOINTMENT = 1;

    function showDialog (courseInfor) {
        if (org_id == 0) {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 300,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '立即开通',
                        type: 'primary',
                        action: function () {
                            location.href = '/teacher_center/vip_center';
                            this.hide();
                        }
                    },
                    {
                        text: '了解详情',
                        type: 'default',
                        action: function () {
                            location.href = '/teacher_center/vip_detail?type=freeLive';
                            this.hide();
                        }
                    }
                ]
            });
        }
        else {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 300,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '我知道了',
                        type: 'primary',
                        action: function () {
                            this.hide();
                        }
                    }
                ]
            });
        }
        return false;
    }

    /**
     * 直播课的基本信息
     *
     * @param {Object} options
     * @property {?String} options.courseName 课程名称
     * @property {?String} options.memberNumber 人数
     * @property {?String} options.originPrice 原价
     * @property {?String} options.price 现价
     * // @property {?String} options.auditionFlag 是否需要试听
     * // @property {?String} options.auditionTime 试听时间
     * @property {?Object} options.subject 课程类目
    **/
    return Ractive.extend({
        template: require('html!./OnlineBasicInfo.html'),
        data: function (data) {
            return {
                style: require('text!./OnlineBasicInfo.styl'),
                subjectRecommend: '请选择科目',
                courseNameInputOptions: {
                    name: 'courseName',
                    value: '',
                    placeholder: '请输入20字以内',
                    className: 'course-name-input fluid'
                },
                priceInputOptions: {
                    name: 'price',
                    value: '',
                    placeholder: '请输入现价',
                    className: 'price-input'
                },
                originPriceInputOptions: {
                    name: 'originPrice',
                    value: '',
                    placeholder: '',
                    className: 'price-input'
                },
                memberInputOptions: {
                    name: 'memberNumber',
                    value: '',
                    placeholder: '请输入人数',
                    className: 'member-input fluid'
                },
                subjectSelectOptions: {
                    id: '',
                    path_crumbs: '',
                    path_array: [],
                    hidden: true
                },
                /*
                auditionInputOptions: {
                    name: 'auditionTime',
                    value: 0,
                    placeholder: '请输入试听时长',
                    className: 'audition-input'
                },
                */
                // NO_APPOINTMENT: NO_APPOINTMENT,
                // IS_APPOINTMENT: IS_APPOINTMENT,
                appointmentDisabled: false,
                options: {
                    courseName: '',
                    memberNumber: '',
                    originPrice: '',
                    price: '',
                    // auditionFlag: '',
                    // auditionTime: '',
                    subject: {
                        id: '',
                        path_crumbs: '',
                        path_array: []
                    }
                }
            };
        },
        computed: {
            /*
            isAppointment: {
                get: function () {
                    return this.get('appointmentDisabled')
                        ? NO_APPOINTMENT
                        : IS_APPOINTMENT;
                },
                set: function (checked) {
                    var me = this;
                    var data = { };
                    if (checked) {
                        if (!me.get('options.auditionTime')) {
                            data['auditionInputOptions.value'] = 5;
                            data['auditionInputOptions.focus'] = true;
                        }
                        data['auditionInputOptions.disabled'] = false;
                        data['appointmentDisabled'] = false;
                    }
                    else {
                        data['auditionInputOptions.value'] = '';
                        data['auditionInputOptions.disabled'] = true;
                        data['appointmentDisabled'] = true;
                    }
                    me.set(data)
                    .then(function () {
                        if (me.validator) {
                            me.validator.validate('auditionTime');
                        }
                    })
                }
            }
            */
        },
        components: {
            Input: require('../../../../common/component/Input'),
            SubjectSelector: require('../../offlineCourseEdit/common/SubjectSelector')
        },
        onrender: function () {

            var me = this;
            var container = $(me.getElement());
            me.popupSubject = new Popup({
                triggerElement: container.find('.button-subject-recommend'),
                layerElement: container.find('.subject-wrapper'),
                showLayerTrigger: 'click',
                hideLayerTrigger: 'click',
                watch: {
                    opened: function (opened) {
                        me.set('subjectSelectOptions.hidden', !opened);
                        if (opened) {
                            me.set('showMore', true);
                        }
                        else {
                            me.set('showMore', false);
                        }
                    }
                }
            });

            me.on('*.selectSubject', function (data) {
                me.set('subjectRecommend', data.subject);
                me.popupSubject.close();
            });

            me.bindData({
                'courseNameInputOptions.value': 'options.courseName',
                'memberInputOptions.value': 'options.memberNumber',
                'originPriceInputOptions.value': 'options.originPrice',
                'priceInputOptions.value': 'options.price',
                'subjectSelectOptions.id': 'options.subject.id',
                'subjectSelectOptions.path_array': 'options.subject.path_array',
                'subjectRecommend': 'options.subject.path_crumbs',
                // 'auditionInputOptions.value': 'options.auditionTime',
                // 'isAppointment': 'options.auditionFlag'
            });

            var container = $(me.getElement());
            me.validator = new Validator({
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    courseName: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '班课名称不能为空'
                        }
                    },
                    price: {
                        rules: {
                            required: true,
                            pattern: /^(\d)+(\.)?(\d)?(\d)?$/,
                            min: 0,
                            max: 999999
                        },
                        errors: {
                            required: '请输入价格',
                            pattern: '仅支持1-999999的两位小数哦',
                            min: '最低 0 元',
                            max: '最高 999999 元'
                        }
                    },
                    memberNumber: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            min: 1,
                            max: 999999
                        },
                        errors: {
                            required: '请填写人数',
                            pattern: '请输入1-999999的整数',
                            min: '请输入1-999999之间的整数',
                            max: '请输入1-999999之间的整数'
                        }
                    },
                    /*
                    auditionTime: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            min: 1,
                            max: 60
                        },
                        errors: {
                            required: '请填写试听时长',
                            pattern: '请输入1-60的整数',
                            min: '请输入1-60之间的整数',
                            max: '请输入1-60之间的整数'
                        }
                    },
                    */
                    subject: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '科目不能为空'
                        }
                    }
                }
            });

            me.observe('memberInputOptions.blur', function (blur) {
                if (blur) {
                    me.judgeMember();
                }
            });
            /*
            me.observe('auditionInputOptions.focus', function (focus) {
                if (focus) {
                    var value = me.get('auditionInputOptions.value');
                    var data = {};
                    if (value == null) {
                        data['auditionInputOptions.value'] = 5;
                    }
                    // data['isAppointment'] = 1;
                    me.set(data)
                    .then(function () {
                        me.validator.validate('auditionTime');
                    });
                }
            });
            */
        },
        validate: function () {
            return this.validator.validate(true);
        },
        onteardown: function () {
            var me = this;
            me.popupSubject.dispose();
        },
        judgeMember: function () {
            var me = this;
            if (me.get('priceInputOptions.value') == 0) {
                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .then(function (response) {
                    org_id = response.data.org_id;
                });

                var vipLevel = userData.vip_level;
                var number = me.get('memberInputOptions.value');
                var content = '';
                if (vipLevel == 0 && number > 500) {
                    if (org_id == 0) {
                        content = '非会员用户免费直播课最高上限500人，开通会员获得更高上限'
                    }
                    else {
                        content = '非会员用户免费直播课最高上限500人，联系机构开通会员获得更高上限'
                    }
                    showDialog({ content: content });
                }
                else if (vipLevel == 1 && number > 1000) {
                    if (org_id == 0) {
                        content = '普通会员用户免费直播课最高上限1000人，开通会员获得更高上限'
                    }
                    else {
                        content = '普通会员用户免费直播课最高上限1000人，联系机构开通更高级别会员获得更高上限'
                    }
                    showDialog({ content: content });
                }
                else if (vipLevel == 2 && number > 3000) {
                    if (org_id == 0) {
                        content = '高级会员用户免费直播课最高上限3000人，开通超级会员获得更高上限'
                    }
                    else {
                        content = '高级会员用户免费直播课最高上限3000人，联系机构开通更高级别会员获得更高上限'
                    }
                    showDialog({ content: content });
                }
            }
        },
        getData: function () {
            var me = this;
            var data = { };
            data.name = me.get('options.courseName');
            data.subject = {};
            data.student_amount = {};
            data.subject.id = me.get('options.subject.id');
            data.prices = {
                now: me.get('options.price'),
                original: me.get('options.originPrice'),
            };
            /*
            if (me.get('options.auditionFlag')) {
                data.trial_minutes = me.get('options.auditionTime');
            }*/
            data.student_amount.max = me.get('options.memberNumber');
            data.student_amount.min = 1;
            return data;
        }
    });

});