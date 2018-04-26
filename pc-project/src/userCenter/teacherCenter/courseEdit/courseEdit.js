/**
 * @file 一对一课程设置
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var CourseInfoDialog = require('./CourseInfoDialog');
    var AddressDialog = require('./AddressDialog');
    var renderImage = require('../../common/function/renderImage');
    var Validator = require('custom/form/Validator');
    var service = require('./service');

    var Popup = require('custom/helper/Popup');
    var browser = require('cc/util/browser');
    var underscore = require('underscore');
    var m_url; //h5页面的所有url

    exports.init = function (data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./courseEdit.html'),
            data: {
                courseNameInputOptions: {
                    name: 'course_name',
                    value: '',
                    placeholder: '请填写20字以内的课程标题',
                    className: 'course-name-input'
                },
                subjectSelectOptions: {
                    className: 'subject-select',
                    subject1: {
                        name: 'category1',
                        className: 'subject1-select',
                        defaultText: '请选择',
                        data: null,
                        value: ''
                    },
                    subject2: {
                        name: 'category2',
                        className: 'subject2-select',
                        defaultText: '请选择',
                        data: null,
                        value: ''
                    },
                    subject3: {
                        name: 'category3',
                        className: 'subject3-select',
                        defaultText: '请选择',
                        data: null,
                        value: ''
                    },
                },
                courseInfoInputOptions: {
                    name: 'courseInfo',
                    value: '',
                    placeholder: '详细清晰的课程信息有助于体现课程价值，建议从课程的适学人群、学习目标、 教学内容或方法、目标的学习时长等方面填写',
                    className: 'course-info',
                    multiple: true
                },
                checkout1Options: {
                    name: 'lesson_way',
                    value: 'teacher',
                    checked: false,
                    text: '老师上门',
                    priceInputOptions: {
                        name: 'teacher_price',
                        value: '',
                        className: '',
                        disabled: true,
                        focus: false
                    }
                },
                checkout2Options: {
                    name: 'lesson_way',
                    value: 'discuss',
                    checked: false,
                    text: '协商地点',
                    priceInputOptions: {
                        name: 'discuss_price',
                        value: '',
                        className: '',
                        disabled: true,
                        focus: false
                    }
                },
                checkout3Options: {
                    name: 'lesson_way',
                    value: 'student',
                    checked: false,
                    text: '学生上门',
                    priceInputOptions: {
                        name: 'student_price',
                        value: '',
                        className: '',
                        disabled: true,
                        focus: false
                    }
                },
                checkout4Options: {
                    name: 'lesson_way',
                    value: 'online',
                    checked: false,
                    text: '在线教学',
                    priceInputOptions: {
                        name: 'online_price',
                        value: '',
                        className: '',
                        disabled: true,
                        focus: false
                    }
                },
                courseClassifyList: {},
                courseClassifyOptions: {
                    name: 'classify',
                    value: '',
                    placeholder: '输入关键词快速查找分类',
                    className: 'course-classify'
                },
                templates_m: data.templates_m, //app的模板
                templates: data.templates,
                templatesLength: underscore.keys(data.templates_m).length,
                templateActive: data.template_m,
                templatePCActive: data.template_pc,
                templateVip: data.template_m_level, //模版的会员等级
                templatePCVip: data.template_pc_level,
                hasLocation: data.has_location,
                courseId: data.id,
                name: data.name,
                remark: data.remark,
                subject_path: data.subject_path,
                lesson_way: data.lesson_way,
                price_discuss: data.price_discuss,
                price_online: data.price_online,
                price_student: data.price_student,
                price_teacher: data.price_teacher,
                saved: false,
                savedId: '',
                is_chrome: browser.chrome, // 当前浏览器是否为chrome
                is_preview: false,
                preview_temp_no: 0, // 当前预览的第几组模板
                preview_image: '', // 当前预览模板的图片
                preview_url: '' ,// 当前预览模板的H5地址
                org_id: '',
                checked_tab_index: 0, //默认显示网页模板
                template_index: '',
                setTrial: false,
                issubmiting: false
            },
            components: {
                Input: require('../../common/component/Input'),
                Select: require('../../common/component/Select'),
                SubjectSelect: require('../../common/component/SubjectSelect'),
                AutoComplete: require('../../common/component/AutoComplete'),
                Checkout: require('./Checkout'),
            },
            chooseTemplate: function (value, vip, index) {
                this.set('templateActive',value);
                this.set('templateVip', vip);
                this.set('template_index', index);
            },
            choosePCTemplate: function (value, vip, index) {
                this.set('templatePCActive',value);
                this.set('templatePCVip', vip);
            },
            prevPreview: function (num) { // 上一个模板
                var me = this;
                me.set('preview_temp_no', num);
                me.set('preview_image', me.get('templates_m[' + num + '].preview_image'));
                me.set('preview_url', m_url[num]);
            },
            nextPreview: function (num) { // 下一个模板
                var me = this;
                me.set('preview_temp_no', num);
                me.set('preview_image', me.get('templates_m[' + num + '].preview_image'));
                me.set('preview_url', m_url[num]);
            },
            exit: function () { // 退出预览
                this.set('is_preview', false);
                this.set('preview_temp_no', 0);
            },
            onrender: function () {

                var ractive = this;

                renderImage();

                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .then(function (response) {
                    var data = response.data;
                    // 机构老师
                    ractive.set('org_id', data.org_id);
                });

                if(this.get('name')) {
                    this.set('courseNameInputOptions.value',this.get('name'))
                }
                if(this.get('remark')) {
                    this.set('courseInfoInputOptions.value',this.get('remark'))
                }
                if(this.get('subject_path')) {
                    var subject = this.get('subject_path');
                    if (subject.length === 3) {
                        this.set('subjectSelectOptions.subject1.value',subject[0].id);
                        this.set('subjectSelectOptions.subject2.value',subject[1].id);
                        this.set('subjectSelectOptions.subject3.value',subject[2].id);
                    }
                }

                if (this.get('price_discuss') !== null && this.get('price_discuss') !== undefined) {
                    this.set('checkout2Options.checked',true);
                    this.set('checkout2Options.priceInputOptions.value',this.get('price_discuss'));
                    this.set(
                        'checkout2Options.priceInputOptions.focus',
                        !this.get('checkout2Options.priceInputOptions.focus')
                    );
                }
                if (this.get('price_online') !== null && this.get('price_online') !== undefined) {
                    this.set('checkout4Options.checked',true);
                    this.set('checkout4Options.priceInputOptions.value',this.get('price_online'));
                    this.set(
                        'checkout4Options.priceInputOptions.focus',
                        !this.get('checkout4Options.priceInputOptions.focus')
                    );
                }
                if (this.get('price_student') !== null && this.get('price_student') !== undefined) {
                    this.set('checkout3Options.checked',true);
                    this.set('checkout3Options.priceInputOptions.value',this.get('price_student'));
                    this.set(
                        'checkout3Options.priceInputOptions.focus',
                        !this.get('checkout3Options.priceInputOptions.focus')
                    );
                }
                if (this.get('price_teacher') !== null && this.get('price_teacher') !== undefined) {
                    this.set('checkout1Options.checked',true);
                    this.set('checkout1Options.priceInputOptions.value',this.get('price_teacher'));
                    this.set(
                        'checkout1Options.priceInputOptions.focus',
                        !this.get('checkout1Options.priceInputOptions.focus')
                    );
                }

                var container = $(this.getElement());

                this.popup = new Popup({
                    layerElement: container.find('.suggestion > .menu'),
                    showLayerTrigger: null,
                    hideLayerTrigger: 'click'
                });

                this.validator = new Validator({
                    mainElement: $('#container'),
                    fields: {
                        course_name: {
                            rules: {
                                required: true,
                                maxlength: 20
                            },
                            errors: {
                                required: '课程标题不能为空',
                                maxlength: '请将字数控制在 20 字以内'
                            }
                        },
                        courseInfo: {
                            rules: {
                                required: true,
                                maxlength: 200
                            },
                            errors: {
                                required: '课程信息不能为空',
                                maxlength: '请将字数控制在 200 字以内'
                            }
                        },
                        teacher_price: {
                            rules: {
                                required: true,
                                pattern: /^\d+$/,
                                min: 1,
                                max: 999999
                            },
                            errors: {
                                required: '请输入老师上门的价格',
                                pattern: '请输入整数',
                                min: '价格最低为 1 元/时',
                                max: '价格最高为 999999 元/时'
                            }
                        },
                        discuss_price: {
                            rules: {
                                required: true,
                                pattern: /^\d+$/,
                                min: 1,
                                max: 999999
                            },
                            errors: {
                                required: '请输入协商地点的价格',
                                pattern: '请输入整数',
                                min: '价格最低为 1 元/时',
                                max: '价格最高为 999999 元/时'
                            }
                        },
                        student_price: {
                            rules: {
                                required: true,
                                pattern: /^\d+$/,
                                min: 1,
                                max: 999999
                            },
                            errors: {
                                required: '请输入学生上门的价格',
                                pattern: '请输入整数',
                                min: '价格最低为 1 元/时',
                                max: '价格最高为 999999 元/时'
                            }

                        },
                        online_price: {
                            rules: {
                                required: true,
                                pattern: /^\d+$/,
                                min: 1,
                                max: 999999
                            },
                            errors: {
                                required: '请输入在线教学的价格',
                                pattern: '请输入整数',
                                min: '价格最低为 1 元/时',
                                max: '价格最高为 999999 元/时'
                            }
                        },
                        category3 : {
                            before: function (data) {
                                var category2 = data.category2;
                                if (category2 && !category2.value) {
                                    return false;
                                }
                            },

                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请选择科目分类'
                            }
                        },
                        category2 : {
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
                                required: '请选择科目分类'
                            }
                        },
                        category1 : {
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请选择科目分类'
                            }
                        }
                    }
                });
            },
            submit: function () {
                var me = this;
                var submiting = me.get('issubmiting');
                if (!submiting) {
                    var vipLevel = userData.vip_level;
                    var templateVip = me.get('templateVip');
                    var templatePCVip = me.get('templatePCVip');
                    if(me.get('templateActive') == '' || me.get('templateActive') == null) {
                        me.set('templateActive', 'default')
                    }
                    if(me.get('templatePCActive') == '' || me.get('templatePCActive') == null) {
                        me.set('templatePCActive', 'default')
                    }
                    if(vipLevel < templateVip) {

                        if (me.get('org_id') == '0') {
                            var content = '';
                            if (templateVip == '1') {
                                content = '您选择的手机模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            else if (templateVip == '2') {
                                content = '您选择的手机模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            else if (templateVip == '3') {
                                content = '您选择的手机模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 382,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        action: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        action: function () {
                                            location.href = "/teacher_center/vip_detail?type=pageDress";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            var content = '';
                            if (templateVip == '1') {
                                content = '您选择的手机模板为会员模板，请联系机构开通会员。';
                            }
                            else if (templateVip == '2') {
                                content = '您选择的手机模板为高级会员模板，请联系机构开通高级会员。';
                            }
                            else if (templateVip == '3') {
                                content = '您选择的手机模板为超级会员模板，请联系机构开通超级会员。';
                            }
                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 382,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'error',
                                        action: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                    }
                    else if (vipLevel < templatePCVip) {
                        if (me.get('org_id') == '0') {
                            var content = '';
                            if (templatePCVip == '1') {
                                content = '您选择的网页模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            else if (templatePCVip == '2') {
                                content = '您选择的网页模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            else if (templatePCVip == '3') {
                                content = '您选择的网页模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                            }
                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 382,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        action: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        action: function () {
                                            location.href = "/teacher_center/vip_detail?type=pageDress";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            var content = '';
                            if (templatePCVip == '1') {
                                content = '您选择的网页模板为会员模板，请联系机构开通会员。';
                            }
                            else if (templatePCVip == '2') {
                                content = '您选择的网页模板为高级会员模板，请联系机构开通高级会员。';
                            }
                            else if (templatePCVip == '3') {
                                content = '您选择的网页模板为超级会员模板，请联系机构开通超级会员。';
                            }
                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 382,
                                skinClass: 'vip-dialog',
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'error',
                                        action: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                    }
                    else {
                        if (me.get('hasLocation') == false) {
                            if (me.get('checkout1Options.priceInputOptions.value') !== ''
                                || me.get('checkout2Options.priceInputOptions.value') !== ''
                                || me.get('checkout3Options.priceInputOptions.value') !==''
                            ) {
                                confirm({
                                    title: '温馨提示',
                                    content: '由于您选择了线下授课，为方便学生找到您，<br>请设置一个常用地址，后续您可以在<span class="primary">地址管理</span>中增添修改',
                                    buttons: [
                                                {
                                                    text: '设置地址',
                                                    type: 'primary',
                                                    action: function () {
                                                        this.hide();
                                                        var dialog = new AddressDialog({
                                                            onsuccess: function (data) {
                                                                me.set('hasLocation',true);
                                                            }
                                                        });
                                                        dialog.show();
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    action: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                });
                                return;
                            }
                        }

                        if (me.validate() && me.validator.validate(true)) {

                            var checkout1Checked = me.get('checkout1Options.checked');
                            var checkout2Checked = me.get('checkout2Options.checked');
                            var checkout3Checked = me.get('checkout3Options.checked');
                            var checkout4Checked = me.get('checkout4Options.checked');

                            if (!checkout1Checked
                                && !checkout2Checked
                                && !checkout3Checked
                                && !checkout4Checked
                            ) {
                                tip({
                                    type: 'error',
                                    content: '请选择一个课程价格'
                                });
                                return;
                            }
                            var id = '';

                            if(me.get('savedId') !== ''){
                                id = me.get('savedId');
                            }
                            else {
                                id = me.get('courseId');
                            }

                            me.set('issubmiting', true);
                            service
                            .upsertCourse({
                                id: id,
                                subjectId: me.get('subjectSelectOptions.subject3.value'),//三级类目的id
                                courseName: me.get('courseNameInputOptions.value'),
                                courseRemark: me.get('courseInfoInputOptions.value'),
                                teacher: me.get('checkout1Options.priceInputOptions.value'),
                                discuss: me.get('checkout2Options.priceInputOptions.value'),
                                student: me.get('checkout3Options.priceInputOptions.value'),
                                online: me.get('checkout4Options.priceInputOptions.value'),
                                labelIds: '',
                                template_m: me.get('templateActive'),
                                template_pc: me.get('templatePCActive')
                            })
                            .then(function (response) {
                                ractive.set('savedId',response.data.id);
                                tip({
                                    type: 'success',
                                    content: '修改成功 稍后生效'
                                })
                                .then(
                                    function () {
                                        location.href = '/teacher_course/list_admin';
                                    }
                                );
                            });
                        }
                    }

                }
            },
            search: function() {

                var me = this;
                var keyword = me.get('courseClassifyOptions.value');

                service
                .courseClassify({
                    keyword: keyword
                })
                .then(function (response) {
                    me.set({
                        courseClassifyList: response.data
                    });
                    me.popup.open();
                });
            },

            selectSubject: function (data) {

                var subject1Id = data[1].id;
                var subject2Id = data[2] ? data[2].id : null;
                var subject3Id = data[3] ? data[3].id : null;

                this.set('subjectSelectOptions.subject1.value', subject1Id);
                this.set('subjectSelectOptions.subject2.value', subject2Id);
                this.set('subjectSelectOptions.subject3.value', subject3Id);

                this.popup.close();
            },
            editGuide: function () {
                var dialog = new CourseInfoDialog({
                    onsave: function (data) {
                        ractive.set(
                            'courseInfoInputOptions.value',
                            data.courseInfo
                        );
                    }
                });
                dialog.show();
            },
            preview: function () {
                var me = this;
                var num = me.get('template_index');

                if (me.get('checked_tab_index') == 1) {
                    var me = this;
                    if ( me.validator.validate(true)) {

                        var checkout1Checked = me.get('checkout1Options.checked');
                        var checkout2Checked = me.get('checkout2Options.checked');
                        var checkout3Checked = me.get('checkout3Options.checked');
                        var checkout4Checked = me.get('checkout4Options.checked');

                        if (!checkout1Checked
                            && !checkout2Checked
                            && !checkout3Checked
                            && !checkout4Checked
                        ) {
                            tip({
                                type: 'error',
                                content: '请选择一个课程价格'
                            });
                            return;
                        }
                        var id = '';
                        if(me.get('savedId') !== ''){
                            id = me.get('savedId');
                        }
                        else {
                            id = me.get('courseId');
                        }

                        service
                        .upsertCourse({
                            id: id,
                            subjectId: me.get('subjectSelectOptions.subject3.value'),//三级类目的id
                            courseName: me.get('courseNameInputOptions.value'),
                            courseRemark: me.get('courseInfoInputOptions.value'),
                            teacher: me.get('checkout1Options.priceInputOptions.value'),
                            student: me.get('checkout2Options.priceInputOptions.value'),
                            discuss: me.get('checkout3Options.priceInputOptions.value'),
                            online: me.get('checkout4Options.priceInputOptions.value'),
                            labelIds: '',
                            template_m: me.get('templateActive'),
                            is_preview: 1
                        })
                        .then(function (response) {
                            ractive.set('savedId',response.data.id);
                            me.set('is_preview', true);
                            me.set('preview_temp_no', num);

                            me.set('preview_image', me.get('templates_m[' + num + '].preview_image'));
                            m_url = response.data.preview_url_m;
                            me.set('preview_url', m_url[num]);
                        });
                    }
                }
                else if (me.get('checked_tab_index') == 0) {
                    if(me.get('templatePCActive') == '' || me.get('templatePCActive') == null) {
                        me.set('templatePCActive','default')
                    }
                    if (me.validate() && me.validator.validate()) {

                        var checkout1Checked = me.get('checkout1Options.checked');
                        var checkout2Checked = me.get('checkout2Options.checked');
                        var checkout3Checked = me.get('checkout3Options.checked');
                        var checkout4Checked = me.get('checkout4Options.checked');

                        if (!checkout1Checked
                            && !checkout2Checked
                            && !checkout3Checked
                            && !checkout4Checked
                        ) {
                            tip({
                                type: 'error',
                                content: '请选择一个课程价格'
                            });
                            return;
                        }

                        if (me.get('savedId')) {

                            var id = '';
                            if(me.get('savedId') !== ''){
                                id = me.get('savedId');
                            }
                            else {
                                id = me.get('courseId');
                            }
                            service
                            .upsertCourse({
                                id: id,
                                subjectId: me.get('subjectSelectOptions.subject3.value'),//三级类目的id
                                courseName: me.get('courseNameInputOptions').value,
                                courseRemark: me.get('courseInfoInputOptions').value,
                                teacher: me.get('checkout1Options.priceInputOptions').value,
                                discuss: me.get('checkout2Options.priceInputOptions').value,
                                student: me.get('checkout3Options.priceInputOptions').value,
                                online: me.get('checkout4Options.priceInputOptions').value,
                                labelIds: '',
                                template_pc: me.get('templatePCActive'),
                                is_preview: 1
                            },{
                                sync: true
                            })
                            .then(function (response) {
                                me.set('savedId',response.data.id);
                                window.open(response.data.preview_url);

                            });
                        }
                        else {
                            confirm({
                                content: '您当前还没有保存课程信息哦，是否保存？',
                                type: 'primary',
                                title: '温馨提示',
                                width: 370
                            })
                            .done(function () {

                                if (me.validator.validate()) {

                                    var checkout1Checked = me.get('checkout1Options.checked');
                                    var checkout2Checked = me.get('checkout2Options.checked');
                                    var checkout3Checked = me.get('checkout3Options.checked');
                                    var checkout4Checked = me.get('checkout4Options.checked');

                                    if (!checkout1Checked
                                        && !checkout2Checked
                                        && !checkout3Checked
                                        && !checkout4Checked
                                    ) {
                                        tip({
                                            type: 'error',
                                            content: '请选择一个课程价格'
                                        });
                                        return;
                                    }
                                }

                                var id = '';
                                if(me.get('savedId') !== ''){
                                    id = me.get('savedId');
                                }
                                else {
                                    id = me.get('courseId');
                                }
                                service
                                .upsertCourse({
                                    id: id,
                                    subjectId: me.get('subjectSelectOptions.subject3.value'),//三级类目的id
                                    courseName: me.get('courseNameInputOptions').value,
                                    courseRemark: me.get('courseInfoInputOptions').value,
                                    teacher: me.get('checkout1Options.priceInputOptions').value,
                                    discuss: me.get('checkout2Options.priceInputOptions').value,
                                    student: me.get('checkout3Options.priceInputOptions').value,
                                    online: me.get('checkout4Options.priceInputOptions').value,
                                    labelIds: '',
                                    template_pc: me.get('templatePCActive'),
                                    is_preview: 1
                                },{
                                    sync: true
                                })
                                .then(function (response) {
                                    me.set('savedId',response.data.id);
                                    window.open(response.data.preview_url)
                                });
                            })
                            .fail(function () {
                                $('.dialog').hide();
                            });
                        }
                    }

                }
            },
            validate: function () {

                    var teacherPrice = this.get('checkout1Options.priceInputOptions.value');
                    var discussPrice = this.get('checkout2Options.priceInputOptions.value');
                    var studentPrice = this.get('checkout3Options.priceInputOptions.value');
                    var onlinePrice = this.get('checkout4Options.priceInputOptions.value');
                    //判断输入的价格是否大于10

                    var teacherPrice2 = teacherPrice == ''? 100 : teacherPrice;
                    var studentPrice2 = studentPrice == ''? 100 : studentPrice;
                    var onlinePrice2 = onlinePrice == ''? 100 : onlinePrice;
                    var discussPrice2 = discussPrice == ''? 100 : discussPrice;

                    var lowerPrice = function(){
                        if(onlinePrice2 < 10 || studentPrice2 < 10 || discussPrice2 < 10 || teacherPrice2 < 10) {
                            return true;
                        } else {
                          return false;
                        }
                    };
                    function getMinPriceClass() {
                        var text="";
                        if (teacherPrice2 <= studentPrice2){
                            if(teacherPrice2 <= onlinePrice2){
                                if(teacherPrice2 <= discussPrice2){
                                    text="?teacherPrice="+teacherPrice2;
                                }else{
                                    text="?discussPrice="+discussPrice2;
                                }
                            }
                            else {
                                if(onlinePrice2 <= discussPrice2){
                                    text="?onlinePrice="+onlinePrice2;
                                }
                                else {
                                    text="?discussPrice="+discussPrice2;
                                }
                            }
                        }
                        else{
                            if(studentPrice2 <= onlinePrice2){
                                if(studentPrice2 <= discussPrice2){
                                    text="?studentPrice="+studentPrice2;
                                }
                                else{
                                    text="?discussPrice="+discussPrice2;
                                }
                            }else{
                                if(onlinePrice2 <= discussPrice2){
                                    text="?onlinePrice="+onlinePrice2;
                                }
                                else{
                                    text="?discussPrice="+discussPrice2;
                                }
                            }
                        }
                        return text;
                    }
                    //判断是否是白名单用户
                    var whiteUser = function(){
                        return window.whiteTrialFlag == 1;
                    };

                    // 判断是否已经开启了试听课,开启返回true，否则返回false
                    var offAuditioned = function(){
                        return window.SiteTrialFlag == 1;
                    };

                    if(lowerPrice() && whiteUser() && !offAuditioned()){
                        if (!ractive.get("setTrial")) {
                            ractive.set("setTrial",false);
                            confirm({
                                title: '温馨提示',
                                content: '您设置的一对一课程价格较低，小秘书建议您设置试听课哦<br>试听课设置只需一步，是否马上设置？',
                                buttons: [
                                    {
                                        text: '设置试听',
                                        type: 'primary',
                                        action: function () {
                                            this.hide();
                                            var text = getMinPriceClass();
                                            window.location.href="/teacher_center/upsertTrialCourse"+text;
                                        }
                                    },
                                    {
                                        text: '暂不设置',
                                        action: function () {
                                            this.hide();
                                            ractive.set("setTrial",true);
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
            }

        });

        ractive.on('searchByEnter', function () {
            ractive.search();
        });

    };

});