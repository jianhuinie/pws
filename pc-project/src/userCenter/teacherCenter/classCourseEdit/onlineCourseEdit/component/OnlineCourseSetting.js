/**
 * @file 课程设置
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Validator = require('custom/form/Validator');

    var CLASS_RULE_ANYTIME = 'anyTime';
    var CLASS_RULE_NOEXIT = 'noExit';
    var CLASS_RULE_CUSTOM = 'custom';
    var CLASS_RULE_HOUREXIT = 'hourExit';

    var CLASS_CHABAN_NO = 'nochaban';
    var CLASS_CHABAN_INSERT = 'insertchaban';
    var CLASS_CHABAN_CUSTOM = 'chabancustom';

    var CLASS_CHABAN_PRICE_ALL = 'allfullprice';
    var CLASS_CHABAN_PRICE_RESET = 'restfullprice';
    var CLASS_CHABAN_PRICE_CUSTOM = 'chabanpricecustom'

    var MIN_MEMBER_NORMAL = 'normalRule';
    var MIN_MEMBER_MIN = 'minRule';

    var SUPPORT_MATERIALS_POST = 'supportMaterialsPost';
    var NO_SUPPORT_MATERIALS_POST = 'noSupportMaterialsPost';

    /**
     * 直播课的课程设置
     *
     * @param {Object} options
     * @property {?String} options.classRule 退班规则
     * @property {?String} options.compatibleRule 插班规则
     * @property {?String} options.compatiblePrice 插班价格
     * @property {?String} options.supportMaterialsPost 是否有邮寄资料
     * @property {?String} options.minimumRule 保底开班

     * @property {?String} options.retireText 第几节课程可退
     * @property {?String} options.chabanQuota 第几节课程可以插班
     * @property {?String} options.chabanPrice 插班价格
     * @property {?String} options.minimumMember 保底开班人数

     * @property {?String} options.smsContact 允许学生通过手机联系我
     * @property {?String} options.autoReamed 报名人数快满班时自动扩班

     * @property {?String} options.fromShiziLogin 是不是从师资系统登录的
     * @property {?String} options.haveStudent 有没有学生报名

     * @property {?Function} options.canAutoReam 能不能自动扩班的计算
    **/

    return Ractive.extend({
        template: require('html!./OnlineCourseSetting.html'),
        data: function () {
            return {
                style: require('text!./OnlineCourseSetting.styl'),
                CLASS_RULE_ANYTIME: CLASS_RULE_ANYTIME,
                CLASS_RULE_NOEXIT: CLASS_RULE_NOEXIT,
                CLASS_RULE_CUSTOM: CLASS_RULE_CUSTOM,
                CLASS_RULE_HOUREXIT: CLASS_RULE_HOUREXIT,

                CLASS_CHABAN_NO: CLASS_CHABAN_NO,
                CLASS_CHABAN_INSERT: CLASS_CHABAN_INSERT,
                CLASS_CHABAN_CUSTOM: CLASS_CHABAN_CUSTOM,

                CLASS_CHABAN_PRICE_ALL: CLASS_CHABAN_PRICE_ALL,
                CLASS_CHABAN_PRICE_RESET: CLASS_CHABAN_PRICE_RESET,
                CLASS_CHABAN_PRICE_CUSTOM: CLASS_CHABAN_PRICE_CUSTOM,

                SUPPORT_MATERIALS_POST: SUPPORT_MATERIALS_POST,
                NO_SUPPORT_MATERIALS_POST: NO_SUPPORT_MATERIALS_POST,

                MIN_MEMBER_NORMAL: MIN_MEMBER_NORMAL,
                MIN_MEMBER_MIN: MIN_MEMBER_MIN,

                retireTextInputOptions: {
                    name: 'retireText',
                    value: '',
                    className: 'lesson-number',
                    disabled: false
                },
                chabanQuotaInputOptions: {
                    name: 'chabanQuota',
                    value: '',
                    className: 'lesson-number',
                    disabled: true
                },
                chabanPriceInputOptions: {
                    name: 'chabanPrice',
                    value: '',
                    className: 'lesson-number',
                    disabled: true
                },
                minimumMemberInputOptions: {
                    name: 'minMember',
                    value: '',
                    className: 'lesson-number',
                    disabled: false
                },
                classRuleDisabled: false,
                classRule: CLASS_RULE_ANYTIME,
                compatibleRule: CLASS_CHABAN_INSERT,
                compatiblePrice: CLASS_CHABAN_PRICE_ALL,
                supportMaterialsPost: SUPPORT_MATERIALS_POST,
                minimumRule: MIN_MEMBER_NORMAL,
                smsContact: true,
                autoReamed: true,
                showChabanPrice: true,
                options: {
                    classRule: '',
                    compatibleRule: '',
                    compatiblePrice: '',
                    supportMaterialsPost: '',
                    minimumRule: '',
                    retireText: '',
                    chabanQuota: '',
                    chabanPrice: '',
                    minimumMember: '',
                    smsContact: 1,
                    autoReamed: 1,
                    fromShiziLogin: false,
                    haveStudent: false,
                    isNewCourse: true
                    // canAutoReam: $.noop
                }
            };
        },
        components: {
            Input: require('userCenter/common/component/Input')
        },
        onrender: function () {
            var isFirstLoaded = true;
            var me = this;
            if (me.get('options.haveStudent')) {
                me.set({
                    'classRuleDisabled': true
                });
            }

            var smsContact = me.get('options.smsContact');
            var autoReamed = me.get('options.autoReamed');
            me.set({
                smsContact: smsContact == 1 ? true : false,
                autoReamed: autoReamed == 1 ? true : false
            });

            me.bindData({
                'retireTextInputOptions.value': 'options.retireText',
                'chabanQuotaInputOptions.value': 'options.chabanQuota',
                'chabanPriceInputOptions.value': 'options.chabanPrice',
                'minimumMemberInputOptions.value': 'options.minimumMember',
                'classRule': 'options.classRule',
                'compatibleRule': 'options.compatibleRule',
                'compatiblePrice': 'options.compatiblePrice',
                'supportMaterialsPost': 'options.supportMaterialsPost',
                'minimumRule': 'options.minimumRule'
            });
            var container = $(me.getElement());

            me.validator = new Validator({
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    retireText: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            min: 1
                        },
                        errors: {
                            required: '请输入课节',
                            pattern: '请输入数字',
                            min: '填写错误'
                        }
                    },
                    chabanQuota: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/
                        },
                        errors: {
                            required: '请输入课节',
                            pattern: '请输入数字'
                        }
                    },
                    chabanPrice: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/
                        },
                        errors: {
                            required: '请输入价格',
                            pattern: '请输入数字'
                        }
                    },
                    minMember: {
                        rules: {
                            min: 2,
                            required: true,
                            pattern: /^\d+$/
                        },
                        errors: {
                            min: '请输入大于1的数字',
                            required: '请输入保底开班人数',
                            pattern: '请输入数字'
                        }
                    }
                }
            });

            me.observe('classRule', function (rule) {
                var focus = false;
                var data = {
                    'retireTextInputOptions.focus': false,
                    'options.classRule': CLASS_RULE_CUSTOM
                };

                if (rule == CLASS_RULE_CUSTOM) {
                    data['options.classRule'] = CLASS_RULE_CUSTOM;
                    if (me.get('options.haveStudent')) {
                        data['retireTextInputOptions.disabled'] = true;
                        data['retireTextInputOptions.focus'] = false;
                    }
                    else {
                        focus = true;
                        data['retireTextInputOptions.focus'] = true;
                    }
                }
                else if (rule == CLASS_RULE_ANYTIME) {
                    data['options.classRule'] = CLASS_RULE_ANYTIME;
                }
                else if (rule == CLASS_RULE_NOEXIT) {
                    data['options.classRule'] = CLASS_RULE_NOEXIT;
                }
                else if (rule == CLASS_RULE_HOUREXIT) {
                    data['options.classRule'] = CLASS_RULE_HOUREXIT;
                }
                me.set(data)
                .then(function () {
                    if (location.hash != '#course-template-edit') {
                        me.set('retireTextInputOptions.focus', focus);
                    }
                });
            });
            me.observe('retireTextInputOptions.focus', function (focus) {
                if (focus && !me.get('options.haveStudent')) {
                    me.set('options.classRule', CLASS_RULE_CUSTOM);
                }
            });

            me.observe('compatibleRule', function (rule) {
                var data = {
                    'chabanQuotaInputOptions.disabled': true,
                    'options.compatibleRule': CLASS_CHABAN_CUSTOM,
                    'showChabanPrice': true
                };
                if (rule == CLASS_CHABAN_CUSTOM) {
                    data['chabanQuotaInputOptions.disabled'] = false;
                    data['options.compatibleRule'] = CLASS_CHABAN_CUSTOM;
                    data['showChabanPrice'] = true;
                }
                else if (rule == CLASS_CHABAN_NO) {
                    data['options.compatibleRule'] = CLASS_CHABAN_NO;
                    data['showChabanPrice'] = false;
                }
                else if (rule == CLASS_CHABAN_INSERT) {
                    data['options.compatibleRule'] = CLASS_CHABAN_INSERT;
                    data['showChabanPrice'] = true;
                }
                me.set(data);
            });

            me.observe('compatiblePrice', function (rule) {
                var data = {
                    'chabanPriceInputOptions.disabled': true,
                    'options.compatiblePrice': CLASS_CHABAN_PRICE_CUSTOM
                };
                if (rule == CLASS_CHABAN_PRICE_CUSTOM) {
                    data['chabanPriceInputOptions.disabled'] = false;
                    data['options.compatiblePrice'] = CLASS_CHABAN_PRICE_CUSTOM;
                }
                else if (rule == CLASS_CHABAN_PRICE_ALL) {
                    data['options.compatiblePrice'] = CLASS_CHABAN_PRICE_ALL;
                }
                else if (rule == CLASS_CHABAN_PRICE_RESET) {
                    data['options.compatiblePrice'] = CLASS_CHABAN_PRICE_RESET;
                }
                me.set(data);
            });

            me.observe('supportMaterialsPost', function (rule) {
                var data = {
                    'options.supportMaterialsPost': NO_SUPPORT_MATERIALS_POST
                };
                if (rule == NO_SUPPORT_MATERIALS_POST) {
                    data['options.supportMaterialsPost'] = NO_SUPPORT_MATERIALS_POST;
                }
                else if (rule == SUPPORT_MATERIALS_POST) {
                    data['options.supportMaterialsPost'] = SUPPORT_MATERIALS_POST;
                }
                me.set(data);
            });

            me.observe('minimumMemberInputOptions.value', function (val) {
                me.set('options.minimumMember', val);
            });

            me.observe('minimumRule', function (rule, oldRule) {
                var focus = false;
                var focusDelay = false;
                var focusHandler = function () {
                    me.set('minimumMemberInputOptions.focus', focus);
                };

                var data = {
                    'options.minimumRule': MIN_MEMBER_MIN
                };
                if (rule == MIN_MEMBER_MIN) {
                    if (oldRule != null) {
                        alert({
                            title: '温馨提示',
                            width: 425,
                            content: '注意：设置了保底开班后，当报名学生人数没有达到最低开班人数时，'
                                + '开班前1天将会自动关班，所有已报名学生将自动退款。请确认是否设置(仅在第一节课开始前24小时有效)',
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    action: function () {
                                        this.hide();
                                        focusHandler();
                                    }
                                }
                            ]
                        });
                        focusDelay = true;
                    }

                    focus = true;
                    data['options.minimumRule'] = MIN_MEMBER_MIN;
                }
                else if (rule == MIN_MEMBER_NORMAL){
                    data['options.minimumRule'] = MIN_MEMBER_NORMAL;
                }
                me.set(data)
                .then(function () {
                    if (!focusDelay) {
                        if (location.hash != '#course-template-edit') {
                            focusHandler();
                        }
                    }
                });
            });

            me.observe('minimumMemberInputOptions.focus', function (focus) {
                if (focus) {
                    me.set('options.minimumRule', MIN_MEMBER_MIN);
                }
            });

            me.observe('smsContact', function (smsContact) {
                me.set('options.smsContact', smsContact ? 1 : 0);
            });

            me.observe('autoReamed', function (autoReamed) {
                // if (autoReamed) {
                //     var canAutoReam = me.get('options.canAutoReam');
                //     if ($.isFunction(canAutoReam) && !canAutoReam()) {
                //         setTimeout(
                //             function () {
                //                 me.set('autoReamed', false);
                //             },
                //             200
                //         );
                //         return;
                //     }
                // }
                me.set('options.autoReamed', autoReamed ? 1 : 0);
            });

        },
        validate: function (name) {
            return this.validator.validate(name, true);
        }
    })
})
