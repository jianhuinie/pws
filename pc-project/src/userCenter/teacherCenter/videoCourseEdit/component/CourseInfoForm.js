/**
 * @file 课程信息
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var toNumber = require('cc/function/toNumber');

    var formatMoney = require('../../../common/filter/formatMoney');
    var getListTextByValue = require('../../../common/function/getListTextByValue');

    var Validator = require('custom/form/Validator');

    var constant = require('../constant');
    var validateFields = require('../courseInfoFields');
    var createVideoCropDialog = require('./VideoCropDialog');

    var COURSE_TYPE_FREE = 'free';
    var COURSE_EXPIRE_FOREVER = 'forever';

    var TAG_MAX_COUNT = 8;
    var TAG_MAX_LENGTH = 8;

    return Ractive.extend({
        template: require('html!./CourseInfoForm.html'),
        data: function () {
            var me = this;
            return {
                TITLE_MAX_LENGTH: validateFields.title.rules.maxlength,
                INTRO_MAX_LENGTH: validateFields.intro.rules.maxlength,

                COURSE_TYPE_FREE: COURSE_TYPE_FREE,
                COURSE_EXPIRE_FOREVER: COURSE_EXPIRE_FOREVER,
                courseExpire: '',
                courseExpireDisabled: false,

                titleInputOptions: {
                    name: 'title',
                    value: '',
                    className: 'title-input'
                },
                priceInputOptions: {
                    name: 'price',
                    value: '',
                    className: 'price-input',
                    focus: false,
                },
                expireDayInputOptions: {
                    name: 'expireDay',
                    value: '',
                    className: 'expire-day-input',
                    disabled: false,
                },
                introInputOptions: {
                    name: 'intro',
                    value: '',
                    className: 'intro-input',
                    multiple: true
                },

                subjectSelectOptions: {
                    className: 'subjects',

                    subject1: {
                        name: 'subject1',
                        value: '',
                        data: null,
                        defaultText: '请选择'
                    },

                    subject2: {
                        name: 'subject2',
                        value: '',
                        data: null,
                        defaultText: '请选择'
                    },

                    subject3: {
                        name: 'subject3',
                        value: '',
                        data: null,
                        defaultText: '请选择'
                    }
                },

                languageSelectOptions: {
                    name: 'language',
                    value: 1,
                    defaultText: '请选择'
                },

                tagInputOptions: {
                    name: 'tags',
                    value: '',
                    max: TAG_MAX_COUNT,
                    validate: function (text) {
                        var error;
                        if (me.get('options.tags').length >= TAG_MAX_COUNT) {
                            error = '标签不能超过' + TAG_MAX_COUNT + '个';
                        }
                        else if (text.length > TAG_MAX_LENGTH) {
                            error = '标签不能超过' + TAG_MAX_LENGTH + '个字';
                        }
                        else if (!/^[\w\u4e00-\u9fa5]+$/.test(text)) {
                            error = '标签请不要输入特殊字符';
                        }

                        if (error) {
                            tip({
                                type: 'error',
                                content: error
                            });
                            return false;
                        }
                        return true;
                    }
                },

                options: {
                    cover: '',
                    title: '',
                    price: '',
                    iosPrice: '',
                    isFree: false,
                    expireDay: 0,
                    isForever: false,
                    intro: '',
                    subjects: [
                        {
                            text: '',
                            value: ''
                        }
                    ],
                    language: {
                        text: '',
                        value: ''
                    },
                    tags: [],
                    canEditSubjects: false,
                    canEditLanguage: false,
                    getAuditErrorMessage: $.noop
                }
            };
        },
        components: {
            Input: require('../../../common/component/Input'),
            TagInput: require('../../../common/component/TagInput'),
            SubjectSelect: require('../../../common/component/SubjectSelect'),
            LanguageSelect: require('../../../common/component/LanguageSelect')
        },
        onrender: function () {

            var me = this;
            var options = me.get('options');

            me.set('titleInputOptions.value', options.title);

            if (options.price) {
                me.set('priceInputOptions.value', options.price);
            }

            if (options.expireDay) {
                me.set('expireDayInputOptions.value', options.expireDay);
            }

            me.set('introInputOptions.value', options.intro);

            if (options.subjects.length === 3) {
                me.set(
                    'subjectSelectOptions.subject1.value',
                    options.subjects[0].value
                );
                me.set(
                    'subjectSelectOptions.subject2.value',
                    options.subjects[1].value
                );
                me.set(
                    'subjectSelectOptions.subject3.value',
                    options.subjects[2].value
                );
            }

            if (options.language) {
                me.set(
                    'languageSelectOptions.value',
                    options.language.value
                );
            }

            me.set('tagInputOptions.value', options.tags);


            me.observe('options.isFree', function (isFree) {
                var data = { };
                if (isFree) {
                    data['priceInputOptions.value'] =
                    data['expireDayInputOptions.value'] = '';
                    data['courseExpireDisabled'] =
                    data['expireDayInputOptions.disabled'] = true;
                    data['options.isForever'] = false;
                }
                else {
                    data['courseExpireDisabled'] =
                    data['expireDayInputOptions.disabled'] = false;
                }
                me.set(data);
            });
            me.observe('options.isForever', function (isForever) {
                if (isForever) {
                    me.set('expireDayInputOptions.value', '');
                }
            });

            me.observe('titleInputOptions.value', function (value) {
                me.set('options.title', value);
            });
            me.observe('priceInputOptions.value', function (value) {
                var price = toNumber(value, '');
                var data = {
                    'options.price': price
                };
                if (price > 0) {
                    data['options.isFree'] = false;
                    data['options.isForever'] = false;
                }
                me.set(data);
            });
            me.observe('expireDayInputOptions.value', function (value) {
                var expireDay = toNumber(value, '');
                var data = {
                    'options.expireDay': expireDay
                };
                if (expireDay > 0) {
                    me.set('options.isForever', false);
                }
                me.set(data);
            });
            me.observe('introInputOptions.value', function (value) {
                me.set('options.intro', value);
            });
            me.observe('priceInputOptions.blur', function (blur) {
                if (blur === true) {
                    var price = me.get('priceInputOptions.value');
                    me.set('priceInputOptions.value', formatMoney(price, false, ''));
                }
            });
            me.observe('subjectSelectOptions.subject1.value', function (value) {
                if (value) {
                    var data = me.get('subjectSelectOptions.subject1.data');
                    if (data) {
                        var text = getListTextByValue(data, value);
                        me.set('options.subjects', [
                            {
                                text: text,
                                value: value
                            }
                        ]);
                    }
                }
                else {
                    me.set('options.subjects', []);
                }
            });
            me.observe('subjectSelectOptions.subject2.value', function (value) {
                var subject1 = me.get('options.subjects.0');
                if (value) {
                    var data = me.get('subjectSelectOptions.subject2.data');
                    if (data) {
                        var text = getListTextByValue(data, value);
                        me.set('options.subjects', [
                            subject1,
                            {
                                text: text,
                                value: value
                            }
                        ]);
                    }
                }
                else {
                    me.set('options.subjects', [
                        subject1
                    ]);
                }
            });
            me.observe('subjectSelectOptions.subject3.value', function (value) {
                var subject1 = me.get('options.subjects.0');
                var subject2 = me.get('options.subjects.1');
                if (value) {
                    var data = me.get('subjectSelectOptions.subject3.data');
                    if (data) {
                        var text = getListTextByValue(data, value);
                        me.set('options.subjects', [
                            subject1,
                            subject2,
                            {
                                text: text,
                                value: value
                            }
                        ]);
                    }
                }
                else {
                    me.set('options.subjects', [
                        subject1,
                        subject2,
                    ]);
                }
            });
            me.observe('languageSelectOptions.value', function (value) {
                if (value) {
                    var data = me.get('languageSelectOptions.data');
                    if (data) {
                        var text = getListTextByValue(data, value);
                        me.set('options.language', {
                            text: text,
                            value: value
                        });
                    }
                }
            });

            me.observe('tagInputOptions.value', function (tags) {
                me.set('options.tags', tags);
            });

            var container = $(me.getElement());
            me.validator = new Validator({
                mainElement: container,
                fields: validateFields,
                validateOnBlur: true
            });

        },
        onteardown: function () {
            this.validator.dispose();
        },
        selectCover: function () {
            var me = this;
            var dialog = createVideoCropDialog({
                onUploadComplete: function (response) {
                    if (!response.code) {
                        var url = response.data.url;
                        me.set('options.cover', url);
                        dialog.hide();
                    }
                }
            });
            dialog.show();
        }
    });

});