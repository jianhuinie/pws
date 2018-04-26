/**
 * @file 线下班课编辑
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('./service');
    var Timer = require('cc/util/Timer');
    var urlUtil = require('cc/util/url');
    var localStorage = require('cc/util/localStorage');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var formatDateTime = require('userCenter/common/filter/formatDateTime');
    var bindScroll = require('common/bindScroll');

    var LOCAL_KEY = 'editClassCourese';

    var STATUS_EDITING = 0;
    var STATUS_UPLOADING = 1;
    var STATUS_UPLOAD_SUCCESS = 2;
    var STATUS_UPLOAD_FAILURE = 3;

    var SAVE_DURATION = 1 * 60 * 1000;
    // 设置的时间和课程时间冲突的标识 等于 1 时 可以提交
    var IgnoreConflict = 0;

    var ONE_DAY = 60 * 60 * 24 * 1000;
    var planLength = 0;

    function convertToOfflineBasicInfo(backendData) {
        var course = backendData && backendData.course;
        var price = course.prices ? course.prices.now : '';
        var originPrice = course.prices ? course.prices.original : '';
        var memberNumber = course.student_amount ? course.student_amount.max : '';
        var address = course.address ? course.address: '';
        var subject = course.subject ? course.subject: '';
        return {
            courseName: course.display_name ? course.display_name : '',
            price: price,
            originPrice: originPrice,
            memberNumber: memberNumber,
            address: address,
            subject: subject
        };
    }

    function convertToOfflineCoverEdit(backendData) {
        var course = backendData && backendData.course;
        if (!course) {
            return '';
        }
        if (course.covers) {
            return {
                list: $.map(
                    course.covers,
                    function (item) {
                        return {
                            url: item.url,
                            id: item.storage_id
                        };
                    }
                )
            };
        }
    }

    function isBold(fontWeight) {
        return fontWeight == 'bold' ? true : false;
    }

    function isBig(fontSize) {
        return fontSize == '17px' ? true : false;
    }

    function isCenter(textAlign) {
        return textAlign == 'center' ? true : false;
    }

    function formatData(backendData) {
        if (backendData) {
            var style = backendData.style;
            var list = backendData.list;
            if (!list) {
                return;
            }
            var newList = [];
            $.each (
                list,
                function (index, value) {
                    if (value.type == 'title') {
                        newList.push({
                            type: value.type,
                            options: {
                                text: value.text
                            }
                        });
                    }
                    else if (value.type == 'body') {
                        var text = value.text.replace(/<br \/>/g, '\n');
                        newList.push({
                            type: value.type,
                            options: {
                                text: text,
                                color: value.color,
                                isBold: isBold(value.font_weight),
                                isBig: isBig(value.font_size),
                                isCenter: isCenter(value.text_align),
                                isEditing: true
                            }
                        });
                    }
                    else if (value.type == 'image') {
                        newList.push({
                            type: value.type,
                            options: {
                                url: value.url,
                                storage_id: value.storage_id
                            }
                        });
                    }
                    else if (value.type == 'video') {
                        newList.push({
                            type: value.type,
                            options: {
                                video_id: value.video_id,
                                cover: value.cover
                            }
                        });
                    }
                    else if (value.type == 'audio') {
                        newList.push({
                            type: value.type,
                            options: {
                                storage_id: value.storage_id,
                                url: value.url
                            }
                        });
                    }
                }
            );
            return {
                style: style,
                list: newList
            };
        }
    }

    function convertToOfflineDetailEdit(backendData) {
        var course = backendData && backendData.course;
        if (course && course.intro) {
            return formatData({
                style: course.intro.style,
                list: course.intro.items
            });
        }
        else {
            return {
                style: 'white',
                list: []
            };
        }
    }

    function convertToOfflineCourseSetting(backendData) {
        var haveStudent = backendData.have_student;

        var fromShiziLogin = false;
        if (backendData.from_shizi_login) {
            fromShiziLogin = true;
        }

        var course = backendData && backendData.course;
        var classRule = '';
        var compatibleRule = '';
        var compatiblePrice = '';
        var minimumRule = '';
        var smsContact = '';

        var retireFlag;
        var retireText;
        if (course.retire) {
            retireFlag = course.retire.flag;
            retireText = course.retire.length;
        }
        var compatibleRule, compatiblePrice, chabanQuota, chabanPrice;
        if (course.chaban) {
            compatibleRule = course.chaban.flag;
            compatiblePrice = course.chaban.price_flag;
            chabanQuota = course.chaban.quota;
            chabanPrice = course.chaban.price;
        }

        var minimumRule, minimumMember;
        if (course.student_amount) {
            var min = course.student_amount.min;
            minimumRule = min;
            if (min > 1) {
                minimumMember = course.student_amount.min;
            }
        }

        if (retireFlag == 1) {
            classRule = 'hourExit';
        }
        else if (retireFlag == 2) {
            classRule = 'custom';
        }
        else if (retireFlag == 100) {
            classRule = 'noExit';
        }
        else {
            classRule = 'anyTime';
        }

        if (compatibleRule == 1) {
            compatibleRule = 'nochaban';
        }
        else if (compatibleRule == 2) {
            compatibleRule = 'chabancustom';
        }
        else {
            compatibleRule = 'insertchaban';
        }

        if (compatiblePrice == 2) {
            compatiblePrice = 'chabanpricecustom';
        }
        else if (compatiblePrice == 3) {
            compatiblePrice = 'allfullprice';
        }
        else {
            compatiblePrice = 'restfullprice';
        }

        if (minimumMember > 1) {
            minimumRule = 'minRule'
        }
        else {
            minimumRule = 'normalRule'
        }

        if (course.mobile_visible == undefined) {
            smsContact = 1;
        }
        else {
            smsContact = course.mobile_visible;
        }

        return {
            classRule: classRule,
            compatibleRule: compatibleRule,
            compatiblePrice: compatiblePrice,
            minimumRule: minimumRule,
            retireText: retireText,
            chabanQuota: chabanQuota,
            chabanPrice: chabanPrice,
            minimumMember: minimumMember,
            smsContact: smsContact,
            fromShiziLogin: fromShiziLogin,
            haveStudent: haveStudent
        };
    }

    function convertToOfflinePlanEdit(backendData) {
        var haveStudent = backendData.have_student;
        var orgTeachers = backendData.org_teachers;
        var course = backendData && backendData.course;
        if (course && course.org_teachers) {
            orgTeachers = course.org_teachers;
        }
        var schedules = [];
        if (course.schedules) {
            planLength = course.schedules.length;
            $.each(
                course.schedules,
                function (index, value) {
                    schedules.push({
                        id: value.id,
                        beginTime: value.began_at,
                        endTime: value.ended_at,
                        content: value.content,
                        readonly: haveStudent,
                        teacherId: value.teacher_id
                    });
                }
            );
        }

        var schedulesTimeChangeTimes = backendData.rest_schedules_time_change_times;

        return {
            schedules: schedules,
            haveStudent: haveStudent,
            orgTeachers: orgTeachers,
            planLength: planLength,
            schedulesTimeChangeTimes: schedulesTimeChangeTimes
        };
    }

    function convertToOfflineCourseTemplate(backendData) {
        var templatePc = backendData.templates.pc;
        var templateM = backendData.templates.m;
        var templateCheckedPc, templateCheckedM;
        var course = backendData && backendData.course;
        if (course && course.templates) {
            templateCheckedPc = course.templates.pc;
            templateCheckedM = course.templates.m;
        }

        return {
            templatePc: templatePc,
            templateM: templateM,
            templateCheckedPc: templateCheckedPc,
            templateCheckedM: templateCheckedM
        };
    }

    function convertToOfflineRelatedCourses(backendData) {
        var course = backendData && backendData.course;
        return {
            relatedCourse: course.recommend_courses
        };
    }

    var timer;

    // 设置草稿
    function setData(basicInfo, coverUrls, detail, schedules, setting, relatedCourse, template, basicInfor) {
        var data = {};
        data.templatePc = template.templatePc;
        data.templateM = template.templateM;
        data.org_teachers = schedules.orgTeachers;
        // 基本信息
        data.display_name = basicInfo.courseName;
        data.subject = {};
        data.address = {};
        data.student_amount = {};
        data.subject = basicInfo.subject;
        data.address = basicInfo.address;
        data.prices = {
            now: basicInfo.price,
            original: basicInfo.originPrice
        };
        data.student_amount.max = basicInfo.memberNumber;
        data.student_amount.min = 1;

        // 课程封面
        data.covers = [];
        data.cover_storage_ids = [];

        $.each (
            coverUrls.list,
            function (index, item) {
                data.covers.push({
                    storage_id: item.id,
                    url: item.url
                });
                data.cover_storage_ids.push(item.id);
            }
        );

        // 图文详情
        data.intro = {};
        data.intro.style = detail.style ? detail.style : 'white';
        var introList = [];
        $.each(
            detail.list,
            function (index, item) {
                var type = item.type;
                if (type == 'title') {
                    introList.push({
                        type: type,
                        text: item.options.text
                    });
                }
                else if (type == 'body') {
                    introList.push({
                        type: type,
                        text: item.options.text,
                        font_weight: item.options.isBold ? 'bold' : 'normal',
                        font_size: item.options.isBig ? '17px': '15px',
                        text_align: item.options.isCenter ? 'center': 'left',
                        color: item.options.color
                    });
                }
                else if (type == 'image') {
                    introList.push({
                        type: type,
                        storage_id: item.options.storage_id,
                        url: item.options.url
                    });
                }
                else if (type == 'video') {
                    introList.push({
                        type: type,
                        cover: item.options.cover,
                        video_id: item.options.video_id
                    });
                }
                else if (type == 'audio') {
                    introList.push({
                        type: type,
                        url: item.options.url,
                        storage_id: item.options.storage_id,
                    });
                }
            }
        );
        data.intro.items = introList;

        // 课程计划
        data.schedules = [];
        $.each (
            schedules.schedules,
            function (index, item) {
                data.schedules.push({
                    id: item.id,
                    began_at: item.beginTime,
                    ended_at: item.endTime,
                    content: item.content,
                    teacher_id: item.teacherId
                });
            }
        );

        // 课程设置
        data.chaban = {};
        data.retire = {};

        if (setting.classRule == 'anyTime') {
            data.retire.flag = 0;
            data.retire.length = setting.retireText;
        }
        else if (setting.classRule == 'custom') {
            data.retire.flag = 2;
            data.retire.length = setting.retireText;
        }
        else if (setting.classRule == 'noExit') {
            data.retire.flag = 100;
            data.retire.length = setting.retireText;
        }

        if (setting.compatibleRule == 'nochaban') {
            data.chaban.flag = 1;
            data.chaban.quota = '';
        }
        else if (setting.compatibleRule == 'insertchaban') {
            data.chaban.flag = 3;
            data.chaban.quota = '';
        }

        if (setting.compatiblePrice == 'allfullprice') {
            data.chaban.price_flag = 3;
            data.chaban.price = '';
        }
        else if (setting.compatiblePrice == 'restfullprice') {
            data.chaban.price_flag = 1;
            data.chaban.price = '';
        }

        if (setting.minimumRule == 'normalRule') {
            data.student_amount.min = 1;
        }
        else {
            var minMember = setting.minimumMember;
            data.student_amount.min = minMember;
        }

        data.mobile_visible = setting.smsContact;
        data.from_shizi_login = setting.fromShiziLogin;

        // 相关课程
        data.recommend_courses = relatedCourse.relatedCourse;

        // 课程模板
        data.templates = {};
        data.templates.pc = template.templateCheckedPc || 'default';
        data.templates.m = template.templateCheckedM || 'default';

        data.lesson_way = 4;

        return data;
    }

    exports.init = function (data) {

        var query = urlUtil.parseQuery(location.search);

        var offlinePlanEditOptions = convertToOfflinePlanEdit(data);
        var needCaogao = true;
        var courseNumber = data.course.number;
        var showOldEditor = data.course.introduction ? true : false;

        var offlineCourseSettingOptions = convertToOfflineCourseSetting(data);
        if (query.action === 'copyCourse') {
            // offlinePlanEditOptions.schedules = [];
            offlinePlanEditOptions.copyCourse = true;
            offlinePlanEditOptions.haveStudent = false;
            offlineCourseSettingOptions.haveStudent = false;
            if (offlineCourseSettingOptions.classRule == 'hourExit') {
                offlineCourseSettingOptions.classRule = 'anyTime';
            }
            if (offlineCourseSettingOptions.compatibleRule == 'chabancustom') {
                offlineCourseSettingOptions.compatibleRule = 'insertchaban';
                offlineCourseSettingOptions.chabanQuota = undefined;
            }
            if (offlineCourseSettingOptions.compatiblePrice == 'chabanpricecustom') {
                offlineCourseSettingOptions.compatiblePrice = 'restfullprice'
                offlineCourseSettingOptions.chabanPrice = undefined;
            }
            needCaogao = false;
            courseNumber = '';
            showOldEditor = false;
        }

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./offlineCourseEdit.html'),
            data: {
                offlineBasicInfoOptions: convertToOfflineBasicInfo(data),
                offlineCoverEditOptions: convertToOfflineCoverEdit(data),
                offlineDetailEditOptions: convertToOfflineDetailEdit(data),
                offlinePlanEditOptions: offlinePlanEditOptions,
                offlineCourseSettingOptions: offlineCourseSettingOptions,
                offlineCourseTemplateOptions: convertToOfflineCourseTemplate(data),
                offlineRelatedCoursesOptions: convertToOfflineRelatedCourses(data),
                isShowMore: false,
                checkedIndex: 0,
                STATUS_EDITING: STATUS_EDITING,
                STATUS_UPLOADING: STATUS_UPLOADING,
                STATUS_UPLOAD_SUCCESS: STATUS_UPLOAD_SUCCESS,
                STATUS_UPLOAD_FAILURE: STATUS_UPLOAD_FAILURE,
                saveStatus: STATUS_EDITING,
                saveTime: formatDateTime(new Date().getTime(), 'HH:mm'),
                courseNumber: courseNumber,
                needCaogao: needCaogao,
                showOldEditor: showOldEditor,
                richTextEditorOptions: {
                    content: data.course.introduction,
                    initHeight: 400,
                    initWidth: 785,
                    maxLength: 1000,
                    maxImageWidth: 760,
                    error: '',
                    length: 0
                },
                options: {}
            },
            components: {
                OfflineBasicInfo: require('./component/OfflineBasicInfo'),
                OfflineCoverEdit: require('./component/OfflineCoverEdit'),
                OfflineDetailEdit: require('./component/OfflineDetailEdit'),
                OfflinePlanEdit: require('./component/OfflinePlanEdit'),
                OfflineCourseSetting: require('./component/OfflineCourseSetting'),
                OfflineRelatedCourses: require('./component/OfflineRelatedCourses'),
                OfflineCourseTemplate: require('./component/OfflineCourseTemplate'),
                RichTextEditor: require('userCenter/common/component/RichTextEditor')
            },
            onrender: function () {
                var me = this;

                if (!me.get('courseNumber') && me.get('needCaogao')) {
                    var cheche = localStorage.get(LOCAL_KEY + userData.id);
                    if (cheche && cheche != 'undefined') {
                        var data = {};
                        data.course = JSON.parse(cheche);
                        me.set({
                            offlineBasicInfoOptions: convertToOfflineBasicInfo(data),
                            offlineCoverEditOptions: convertToOfflineCoverEdit(data),
                            offlineDetailEditOptions: convertToOfflineDetailEdit(data),
                            offlinePlanEditOptions: convertToOfflinePlanEdit(data),
                            offlineCourseSettingOptions: convertToOfflineCourseSetting(data),
                            offlineRelatedCoursesOptions: convertToOfflineRelatedCourses(data),
                        });
                    }
                    timer = new Timer({
                        task: function () {
                            var basicInfo = me.get('offlineBasicInfoOptions');
                            var coverUrls = me.get('offlineCoverEditOptions');
                            var detail = me.get('offlineDetailEditOptions');
                            var schedules = me.get('offlinePlanEditOptions');
                            var setting = me.get('offlineCourseSettingOptions');
                            var relatedCourse = me.get('offlineRelatedCoursesOptions');
                            var template = me.get('offlineCourseTemplateOptions');
                            var basicInfor = me.findComponent('OfflineBasicInfo');
                            var data = setData(basicInfo, coverUrls, detail, schedules, setting, relatedCourse, template, basicInfor);
                            localStorage.set(
                                LOCAL_KEY + userData.id,
                                JSON.stringify(data)
                            );
                            me.set('saveTime', formatDateTime(new Date().getTime(), 'HH:mm'));
                        },
                        interval: SAVE_DURATION
                    });

                    timer.start();
                }
                else {
                    me.set('needCaogao', false);
                }

                // 课程模板定位
                if (location.hash == '#course-template-edit') {
                    me.set('isShowMore', true)
                    .then(function () {
                        location.href = '#course-template-edit';
                    });
                }

                // 吸顶
                var initFixedNav = function () {
                    var navNode = $('.side-card');
                    var container = $('.content-wrapper');
                    var top = navNode.offset().top;
                    var children = container.children();
                    var navChildren = navNode.children();

                    var activeNode = function (pageTop) {
                        var hasActived = false;
                        children.each(function (idx) {
                            var $node = $(this);
                            var $item = $(navChildren[idx]);
                            if (!hasActived && ($node.offset().top + $node.height() + 20) > pageTop) {
                                hasActived = true;
                                $item.addClass('checked');
                            } else {
                                $item.removeClass('checked');
                            }
                        });
                    };

                    var fixedNavHandler = function () {
                        var pageTop = pageScrollTop();
                        if (pageTop > top) {
                            navNode.addClass('fixed');
                        } else {
                            navNode.removeClass('fixed');
                        }
                        activeNode(pageTop);
                    };

                    bindScroll(window, fixedNavHandler, 1);

                    fixedNavHandler();
                };
                initFixedNav();
            },
            onteardown: function () {
                timer.dispose();
            },
            goBack: function () {
                alert({
                    title: '温馨提示',
                    content: '班课信息未保存，确认要返回班课列表吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                location.href = '/tcenter/courses/class-courses/list-html?lesson_way=4';
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
            },
            submit: function () {
                var me = this;
                var basicInfo = me.get('offlineBasicInfoOptions');
                var coverUrls = me.get('offlineCoverEditOptions');
                var detail = me.get('offlineDetailEditOptions');
                var schedules = me.get('offlinePlanEditOptions');
                var setting = me.get('offlineCourseSettingOptions');
                var relatedCourse = me.get('offlineRelatedCoursesOptions');
                var template = me.get('offlineCourseTemplateOptions');
                var detailEdit = me.findComponent('OfflineDetailEdit');
                var basicInfor = me.findComponent('OfflineBasicInfo');
                var coverEdit = me.findComponent('OfflineCoverEdit');
                var planEdit = me.findComponent('OfflinePlanEdit');
                var courseSetting = me.findComponent('OfflineCourseSetting');
                var templatesValidate = me.findComponent('OfflineCourseTemplate');
                var data = {};

                if (basicInfor.validate()) {
                    if (me.get('courseNumber') != '') {
                        data.number = me.get('courseNumber');
                    }
                    // 判断是不是老的编辑器
                    if (!me.get('showOldEditor')) {
                        if (detail.list.length == 0) {
                            alert({
                                title: '温馨提示',
                                content: '请编辑课程详情'
                            });
                            location.href = '#course-detail-edit';
                            return;
                        }

                        var errorContent = detailEdit.validate();
                        if (errorContent) {
                            location.href = '#course-detail-edit';
                            return;
                        }
                        $.extend(data, detailEdit.getData());
                    }
                    else {
                        data.introduction = me.get('richTextEditorOptions.content');
                    }
                    // 判断课节
                    var schedulesLength = schedules.schedules.length;
                    if (schedulesLength == 0) {
                        alert({
                            title: '温馨提示',
                            content: '请编辑课节'
                        });
                        location.href = '#course-plan-edit';
                        return;
                    }
                    if (planLength < 500 && schedulesLength > 500) {
                        alert({
                            title: '温馨提示',
                            content: '课节最多不能超过 500 节'
                        });
                        location.href = '#course-plan-edit';
                        return;
                    }

                    $.extend(
                        data,
                        basicInfor.getData(),
                        coverEdit.getData(),
                        planEdit.getData()
                    );

                    // 课程设置
                    data.chaban = {};
                    data.retire = {};
                    $.extend(
                        data,
                        me.getSettingData()
                    );
                    /*
                    if (setting.classRule == 'noExit' && schedulesLength <= 1) {
                        var content = '单课节仅支持随时退';
                        alert({
                            title: '温馨提示',
                            content: content
                        });
                        return;
                    }
                    */
                    if (setting.classRule == 'custom') {
                        if (schedulesLength <= setting.retireText) {
                            var content;
                            if (schedulesLength == 1) {
                                content = '抱歉，当您的课节总数为1时，不可设置“课前可退”，还请修改后提交';
                            }
                            else {
                                content = '退班规则最大可输入' + (schedulesLength - 1);
                            }
                            alert({
                                title: '温馨提示',
                                content: content
                            });
                            return;
                        }
                        if (me.get('isShowMore')) {
                            if (courseSetting && courseSetting.validate('retireText')) {
                                data.retire.length = setting.retireText;
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '请编辑退班规则'
                                });
                                return;
                            }
                        }
                        else {
                            data.retire.length = setting.retireText;
                        }
                    }

                    if (setting.compatibleRule == 'chabancustom') {
                        if (!me.get('isShowMore')) {
                            data.chaban.quota = setting.chabanQuota;
                        }
                        else {
                            if (courseSetting && courseSetting.validate('chabanQuota')) {
                                data.chaban.quota = setting.chabanQuota;
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '请编辑插班规则'
                                });
                                return;
                            }
                        }
                    }

                    if (setting.compatiblePrice == 'chabanpricecustom') {
                        if (!me.get('isShowMore')) {
                            data.chaban.price = setting.chabanPrice;
                        }
                        else {
                            if (courseSetting && courseSetting.validate('chabanPrice')) {
                                data.chaban.price = setting.chabanPrice;
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '请编辑插班价格'
                                });
                                return;
                            }
                        }
                    }

                    if (setting.minimumRule == 'normalRule') {
                        data.student_amount.min = 1;
                    }
                    else {
                        if (!me.get('isShowMore')) {
                            var minMember = +setting.minimumMember;
                            data.student_amount.min = minMember;
                        }
                        else {
                            if (courseSetting && courseSetting.validate('minMember')) {
                                var minMember = +setting.minimumMember;
                                if (minMember - basicInfo.memberNumber > 0) {
                                    alert({
                                        title: '温馨提示',
                                        content: '保底开班人数必须小于班级人数'
                                    });
                                    return;
                                }
                                else {
                                    data.student_amount.min = minMember;
                                }
                            }
                            else {
                                return;
                            }
                        }
                    }

                    data.mobile_visible = setting.smsContact;

                    data.recommend_courses = relatedCourse.relatedCourse;

                    data.templates = {};
                    data.templates.pc = template.templateCheckedPc || 'default';
                    data.templates.m = template.templateCheckedM || 'default';

                    if (me.get('isShowMore') && !templatesValidate.validate()) {
                        return;
                    }

                    data.lesson_way = 4;
                    if (IgnoreConflict) {
                        data.ignore_schedule_conflict = 1;
                    }

                }
                else {
                    return;
                };

                var stringDate = JSON.stringify(data);
                if (!me.get('saveStatus')) {
                    me.set('saveStatus', STATUS_UPLOADING)
                    .then(function () {
                        var localkey = LOCAL_KEY + userData.id;
                        service
                        .saveOfflineCourse({
                            data: stringDate
                        })
                        .then(function (response) {
                            if (response.code == 0) {
                                localStorage.remove(localkey);
                                location.href = '/class_course/success?number=' + response.data.number;
                                me.set('saveStatus', STATUS_UPLOAD_SUCCESS);
                            }
                        }, function (response) {
                            if (response.code === 991105) {
                                me.set('saveStatus', STATUS_UPLOAD_FAILURE)
                                .then(function () {
                                    alert({
                                        title: '温馨提示',
                                        content: response.msg,
                                        width: 450,
                                        onbeforehide: function () {
                                            me.set('saveStatus', STATUS_EDITING);
                                        },
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'primary',
                                                action: function () {
                                                    IgnoreConflict = 1;
                                                    me.set('saveStatus', STATUS_EDITING)
                                                    .then(function () {
                                                        me.submit();
                                                    });
                                                    this.hide();
                                                }
                                            },
                                            {
                                                text: '取消',
                                                type: '',
                                                action: function () {
                                                    me.set('saveStatus', STATUS_EDITING);
                                                    this.hide()
                                                }
                                            }
                                        ]
                                    });
                                });
                            }
                            else {
                                me.set('saveStatus', STATUS_UPLOAD_FAILURE)
                                .then(function () {
                                    alert({
                                        title: '温馨提示',
                                        content: response.msg,
                                        width: 450,
                                        onbeforehide: function () {
                                            me.set('saveStatus', STATUS_EDITING);
                                        },
                                        buttons: [{
                                            text: '确定',
                                            type: 'primary',
                                            action: function () {
                                                me.set('saveStatus', STATUS_EDITING);
                                                this.hide();
                                            }
                                        }]
                                    });
                                });
                            }
                        });
                    });
                }
            },
            getSettingData: function () {
                var me = this;
                var setting = me.get('offlineCourseSettingOptions');
                var data = { };
                data.chaban = {};
                data.retire = {};

                if (setting.classRule == 'hourExit') {
                    data.retire.flag = 1;
                    data.retire.length = setting.retireText;
                }
                else if (setting.classRule == 'anyTime') {
                    data.retire.flag = 0;
                    data.retire.length = setting.retireText;
                }
                else if (setting.classRule == 'noExit') {
                    data.retire.flag = 100;
                    data.retire.length = setting.retireText;
                }
                else if (setting.classRule == 'custom') {
                    data.retire.flag = 2;
                }

                if (setting.compatibleRule == 'nochaban') {
                    data.chaban.flag = 1;
                    data.chaban.quota = '';
                }
                else if (setting.compatibleRule == 'insertchaban') {
                    data.chaban.flag = 3;
                    data.chaban.quota = '';
                }
                else if (setting.compatibleRule == 'chabancustom') {
                    data.chaban.flag = 2;
                }

                if (setting.compatiblePrice == 'allfullprice') {
                    data.chaban.price_flag = 3;
                    data.chaban.price = '';
                }
                else if (setting.compatiblePrice == 'restfullprice') {
                    data.chaban.price_flag = 1;
                    data.chaban.price = '';
                }
                else if (setting.compatiblePrice == 'chabanpricecustom') {
                    data.chaban.price_flag = 2;
                }
                return data;
            }
        });
    };

});