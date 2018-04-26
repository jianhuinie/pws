/**
 * @file 基本信息编辑
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var Popup = require('custom/helper/Popup');
    var Validator = require('custom/form/Validator');
    var AddressDialog = require('../../../courseEdit/AddressDialog');

    function filterAddressData(initDate) {
        var list = [];
        $.each(
            initDate,
            function (index, val) {
                var obj = {
                    text: val.regular_address.location_addr,
                    value: val.id
                }
                list.push(obj)
            }
        )
        return list;
    }

    /**
     * 线下班课的基本信息
     *
     * @param {Object} options
     * @property {?String} options.courseName 课程名称
     * @property {?String} options.memberNumber 人数
     * @property {?String} options.originPrice 原价
     * @property {?String} options.price 现价
     * @property {?Object} options.address 地址
     * @property {?Object} options.subject 课程类目
    **/
    return Ractive.extend({
        template: require('html!./OfflineBasicInfo.html'),
        data: function (data) {
            return {
                style: require('text!./OfflineBasicInfo.styl'),
                subjectRecommend: '请选择科目',
                showMore: false,
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
                addressSelectOptions: {
                    id: '',
                    location_addr: ''
                },
                subjectSelectOptions: {
                    id: '',
                    path_crumbs: '',
                    path_array: []
                },
                options: {
                    courseName: '',
                    memberNumber: '',
                    originPrice: '',
                    price: '',
                    address: {
                        id: '',
                        location_addr: ''
                    },
                    subject: {
                        id: '',
                        path_crumbs: '',
                        path_array: []
                    }
                }
            };
        },
        components: {
            Input: require('../../../../common/component/Input'),
            SubjectSelector: require('../common/SubjectSelector'),
            AddressSelector: require('../common/AddressSelector')
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
                if (data.id) {
                    me.set('options.subject.id', data.id);
                }
                me.popupSubject.close();
            });
            me.bindData({
                'courseNameInputOptions.value': 'options.courseName',
                'memberInputOptions.value': 'options.memberNumber',
                'originPriceInputOptions.value': 'options.originPrice',
                'priceInputOptions.value': 'options.price',
                'addressSelectOptions.id': 'options.address.id',
                'addressSelectOptions.location_addr': 'options.address.location_addr',
                'subjectSelectOptions.id': 'options.subject.id',
                'subjectSelectOptions.path_crumbs': 'options.subject.path_crumbs',
                'subjectSelectOptions.path_array': 'options.subject.path_array',
                'subjectRecommend': 'subjectSelectOptions.path_crumbs'
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
                    address: {
                        rules: {
                            required: true
                        },
                        errors: {
                            required: '请填写地址'
                        }
                    },
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
        },
        validate: function () {
            return this.validator.validate(true);
        },
        addAddress: function () {
            var me = this;
            me.addressDialog = new AddressDialog({
                onsuccess: function (address) {
                    var selector = me.findComponent('AddressSelector');
                    selector.setAddress({
                        id: address.data.id,
                        location_addr: address.data.location_addr
                    });
                }
            });
            me.addressDialog.show();
        },
        onteardown: function () {
            var me = this;
            me.popupSubject.dispose();
            me.addressDialog.dispose();
        },
        getData: function () {
            var me = this;
            var data = { };
            data.name = me.get('options.courseName');
            data.subject = {};
            data.address = {};
            data.student_amount = {};
            data.subject.id = me.get('options.subject.id');
            data.address.id = me.get('options.address.id');
            data.prices = {
                now: me.get('options.price'),
                original: me.get('options.originPrice')
            };
            data.student_amount.max = me.get('options.memberNumber');
            data.student_amount.min = 1;
            return data;
        }
    });

});
