/**
 * @file 视频课编辑
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var toString = require('cc/function/toString');
    var toNumber = require('cc/function/toNumber');
    var instanceUtil = require('cc/util/instance');

    var constant = require('./constant');
    var service = require('./service');
    var courseInfoFields = require('./courseInfoFields');

    var validate = require('../../common/function/validate');
    var getListTextByValue = require('../../common/function/getListTextByValue');
    var LanguageSelect = require('../../common/component/LanguageSelect');

    var isInt = require('../../common/validator/isInt');
    var isPositiveNumber = require('../../common/validator/isPositiveNumber');

    var UPLOAD_EDITING = 0;
    var UPLOAD_UPLOADING = 1;
    var UPLOAD_SUCCESS = 2;

    function getSubjects(subjects) {
        if (!subjects) {
            return [ ];
        }
        var terms = subjects.split(',');
        if (terms.length !== 6) {
            return [ ];
        }
        var values = terms.slice(0, 3);
        var texts = terms.slice(3, 6);
        return $.map(values, function (value, index) {
            return {
                value: value,
                text: texts[index]
            };
        });
    }

    function getLanguage(languageId) {
        var text = getListTextByValue(LanguageSelect.data, languageId);
        if (text) {
            return {
                value: languageId,
                text: text
            };
        }
        else {
            return LanguageSelect.data[0];
        }
    }

    function getTags(tags) {
        return tags ? tags.split(',') : [ ];
    }

    function getAuditMessage(array, prefix) {
        if ($.isArray(array) && array.length > 0) {
            return (prefix || '')
                + array.join('；')
                + '。<br />';
        }
        return '';
    }

    function saveFailHandler(response) {
        if (response.code === 100061) {

            var map = {
                title: '课程标题',
                introduce: '课程简介',
                label_ids: '课程标签',
                brief: '课程详情'
            };

            var errors = [ ];

            $.each(response.data, function (index, item) {

                if (item.length) {

                    var html = ''
                        + '<span class="sensitive">在<em>'
                        +     map[index]
                        + '</em>中输入的内容包含';

                    $.each(item, function (i, word) {
                        html += '“<em>' + word + '</em>”';
                    });

                    html += '；</span>';

                    errors.push(html);
                }

            });

            if (!errors.length) {
                return;
            }

            var content = ''
                + '<div class="alert-sensitive">'
                +    '你'
                +    errors.join('<br />')
                +    '<br />请删除后重新输入'
                + '</div>'

            alert({
                title: '温馨提示',
                content: content,
                width: 450,
            });

        }
    }

    function redirect(url) {
        instanceUtil.window.off('beforeunload');
        location.href = url;
    }

    exports.init = function (data) {

        var COURSE_DETAIL_MAX_LENGTH = 5000;
        var canAddCourseSection = !data.is_cloud_playback;

        var getAuditErrorMessage = function (name) {
            var fields = data.verify_faild_fields;
            if (fields) {
                return getAuditMessage(fields[name]);
            }
            return '';
        };

        var courseInfoAuditFail = [
            getAuditErrorMessage('portrait'),
            getAuditErrorMessage('title'),
            getAuditErrorMessage('price'),
            getAuditErrorMessage('price_ios'),
            getAuditErrorMessage('expire_time'),
            getAuditErrorMessage('introduce'),
            getAuditErrorMessage('subject_id'),
            getAuditErrorMessage('label_ids')
        ].join('') ? true : false;

        var courseSectionAuditFail = false;
        var courseSectionCheckFail = false;
        var courseSectionList = $.isArray(data.video_list)
            ? data.video_list.map(
                function (item) {
                    var auditResult = item.verify_msg || {};
                    var auditMessage = ''
                        + getAuditMessage(auditResult.title, '课节标题：')
                        + getAuditMessage(auditResult.content, '课节内容：');

                    if (auditMessage) {
                        courseSectionAuditFail = true;
                    }

                    var checkFail = item.video_status == constant.VIDEO_STATUS_CHECK_FAILURE;
                    if (checkFail) {
                        courseSectionCheckFail = true;
                    }

                    return {
                        sectionId: item.id,
                        sectionName: item.title,

                        videoId: item.video_id,
                        videoName: item.file_name,

                        payStatus: item.type == constant.COURSE_SECTION_PAY_STATUS_FREE
                            ? constant.COURSE_SECTION_PAY_STATUS_CHARGE
                            : item.type,

                        canEditSectionName: item.can_edit,
                        canDeleteSection: item.section_can_del,
                        canDeleteVideo: item.video_can_del,
                        canChangePayStatus: item.can_change,
                        hasError: checkFail || auditMessage,
                        error: checkFail ? '' : auditMessage
                    };
                }
            )
            : [ ];

        var getCourseInfoAudioErrorMessage = function (name) {
            var map = {
                cover: 'portrait',
                iosPrice: 'price_ios',
                expireDay: 'expire_time',
                intro: 'introduce',
                subjects: 'subject_id',
                language: 'language',
                tags: 'label_ids'
            };
            return getAuditErrorMessage(
                map[name] || name
            );
        };

        var courseInfo = {
            cover: data.portrait,
            title: toString(data.title, ''),
            price: data.price,
            iosPrice: data.price_ios,
            isFree: data.price == 0,
            expireDay: data.expire_time,
            isForever: data.expire_time == 0,
            intro: toString(data.introduce, ''),
            subjects: getSubjects(data.subject_id),
            language: getLanguage(data.language),
            tags: getTags(data.label_ids),
            getAuditErrorMessage: getCourseInfoAudioErrorMessage
        };
        var courseInfoEditing = data.number ? (data.edit_info == 1) : true;
        var courseSectionEditing = data.number ? (data.edit_video == 1) : true;
        var courseDetailEditing = data.number ? false : true;

        var instance = new Ractive({
            el: '#container',
            template: require('text!./videoCourseEdit.html'),
            data: {

                courseNumber: data.number,
                isSelling: data.is_onsale == 1,
                showModifyReason: data.show_modify_reason,

                courseInfoEditing: courseInfoEditing,
                courseInfoAuditFail: courseInfoAuditFail,
                courseInfoOptions: courseInfo,

                courseInfoFormOptions: $.extend(
                    {
                        canEditSubjects: true,
                        canEditLanguage: true
                    },
                    courseInfo
                ),

                courseSectionEditing: courseSectionEditing,
                courseSectionAuditFail: courseSectionAuditFail,
                courseSectionCheckFail: courseSectionCheckFail,
                courseSectionListOptions: {
                    list: courseSectionList,
                    canAddCourseSection: canAddCourseSection
                },

                courseDetail: toString(data.brief, ''),
                courseDetailEditing: courseDetailEditing,
                courseDetailEditingEditorOptions: {
                    content: '',
                    initHeight: 400,
                    length: 0,
                    error: '',
                    maxImageWidth: 760,
                    maxLength: COURSE_DETAIL_MAX_LENGTH
                },

                modifyReasonInputOptions: {
                    name: 'modifyReason',
                    value: '',
                    multiple: true,
                    className: 'fluid'
                },

                getAuditErrorMessage: getAuditErrorMessage,

                updateStatus: UPLOAD_EDITING
            },
            components: {
                CourseSectionFormList: require('./component/CourseSectionFormList'),
                CourseSection: require('./component/CourseSection'),
                CourseInfo: require('./component/CourseInfo'),
                CourseInfoForm: require('./component/CourseInfoForm'),
                Input: require('../../common/component/Input'),
                RichTextEditor: require('../../common/component/RichTextEditor'),
            },
            oncomplete: function () {
                var me = this;

                me.on('CourseSectionFormList.add', function () {
                    me.addCourseSection();
                });
                me.observe(
                    'courseDetailEditingEditorOptions.error',
                    function (error) {
                        if (error) {
                            tip({
                                type: 'error',
                                content: error,
                                duration: 8000
                            });
                        }
                    }
                );

                // 价格变化会影响课节
                me.observe(
                    'courseInfoOptions.price',
                    function (price) {
                        var isFreeCourse = price == 0;
                        $.each(
                            me.get('courseSectionListOptions.list'),
                            function (index, item) {
                                var isFreeSection = item.payStatus
                                    == constant.COURSE_SECTION_PAY_STATUS_FREE;

                                if (isFreeCourse !== isFreeSection) {
                                    var payStatus = isFreeCourse
                                        ? constant.COURSE_SECTION_PAY_STATUS_FREE
                                        : constant.COURSE_SECTION_PAY_STATUS_CHARGE;

                                    if (item.sectionId
                                        && !me.get('courseSectionEditing')
                                    ) {
                                        service
                                        .saveSection({
                                            number: me.get('courseNumber'),
                                            sectionIndex: index + 1,
                                            sectionId: item.sectionId,
                                            sectionName: item.sectionName,
                                            videoId: item.videoId,
                                            videoName: item.videoName,
                                            payStatus: payStatus,
                                            action: constant.COURSE_SECTION_ACTION_EDIT
                                        })
                                        .then(function () {
                                            me.set(
                                                'courseSectionListOptions.list.' + index + '.payStatus',
                                                payStatus
                                            );
                                        });
                                    }
                                    else {
                                        me.set(
                                            'courseSectionListOptions.list.' + index + '.payStatus',
                                            payStatus
                                        );
                                    }
                                }

                            }
                        );
                    }
                );

                me.confirmOnLeave();

            },

            confirmOnLeave: function () {
                instanceUtil.window.on(
                    'beforeunload',
                    function () {
                        if (!instance.validateCourseInfo(true)
                            || !instance.validateCourseSection(true)
                            || !instance.validateCourseDetail(true)
                        ) {
                            return '老师，你还有课程信息未保存，“离开此页” 将导致未保存的信息丢失哦！';
                        }
                        return '';
                    }
                );
            },

            editCourseInfo: function () {
                instance.set({
                    courseInfoEditing: true,
                    updateStatus: UPLOAD_EDITING
                });
            },
            saveCourseInfo: function () {

                var formData = instance.get('courseInfoFormOptions');
                if (formData.isFree) {
                    formData.price = 0;
                }
                else {
                    formData.price = toNumber(formData.price, 0);
                }
                if (formData.isForever) {
                    formData.expireDay = 0;
                }
                else {
                    formData.expireDay = toNumber(formData.expireDay, 0);
                }

                var rules = $.extend(
                    { },
                    courseInfoFields,
                    {
                        price: {
                            rules: {
                                required: function () {
                                    if (formData.isFree) {
                                        return true;
                                    }
                                    return formData.price > 0;
                                },
                                max: 999999
                            },
                            errors: {
                                required: '请设置课程价格',
                                max: '课程价格请不要超过 999999 元'
                            }
                        },
                        expireDay: {
                            rules: {
                                required: function () {
                                    if (formData.isForever
                                      || formData.isFree
                                    ) {
                                        return true;
                                    }
                                    return formData.expireDay > 0;
                                },
                                max: function () {
                                    if (formData.price > 0) {
                                        return formData.expireDay <= 365;
                                    }
                                    return true;
                                },
                                pattern: function () {
                                    if (formData.isFree) {
                                        return true;
                                    }
                                    return isInt(formData.expireDay)
                                        && isPositiveNumber(formData.expireDay);
                                }
                            },
                            errors: {
                                required: '请设置课程观看期限',
                                max: '付费课程的观看期限最多不能超过 365 天',
                                pattern: '观看期限只能输入正整数'
                            }
                        },
                        subjects: {
                            rules: {
                                required: function () {
                                    return formData.subjects.length === 3;
                                }
                            },
                            errors: {
                                required: '请完善课程分类'
                            }
                        }
                    }
                );

                // 如果是付费课程，有效期不能大于 365 天
                if (validate(formData, rules)) {

                    formData.number = instance.get('courseNumber');

                    if (!instance.get('updateStatus')) {
                        instance.set('updateStatus', UPLOAD_UPLOADING)
                        service
                        .saveCourseInfo(formData)
                        .then(
                            function (response) {
                                instance.set('updateStatus', UPLOAD_SUCCESS)
                                .then(function () {
                                    var data = response.data;
                                    if (data.number) {
                                        instance.set('courseNumber', data.number);
                                    }

                                    instance.set({
                                        courseInfoEditing: false,
                                        'courseInfoOptions.cover': formData.cover,
                                        'courseInfoOptions.title': formData.title,
                                        'courseInfoOptions.intro': formData.intro,
                                        'courseInfoOptions.price': formData.price,
                                        'courseInfoOptions.iosPrice': formData.iosPrice,
                                        'courseInfoOptions.isFree': formData.isFree,
                                        'courseInfoOptions.expireDay': formData.expireDay,
                                        'courseInfoOptions.isForever': formData.isForever,
                                        'courseInfoOptions.subjects': formData.subjects,
                                        'courseInfoOptions.language': formData.language,
                                        'courseInfoOptions.tags': formData.tags
                                    });
                                    tip({
                                        type: 'success',
                                        content: '保存成功'
                                    });
                                });
                            },
                            saveFailHandler
                        );
                    }

                }
            },
            restoreCourseInfo: function () {
                instance.set({
                    courseInfoEditing: false,
                    updateStatus: UPLOAD_SUCCESS
                });
            },


            editCourseSection: function () {
                instance.set({
                    courseSectionEditing: true
                });
            },
            addCourseSection: function () {
                var courseNumber = instance.get('courseNumber');
                var list = instance.get('courseSectionListOptions.list');

                var error;
                if (!courseNumber) {
                    error = '请先保存第一步';
                }
                else if (list.length === 999) {
                    error = '视频课最多允许添加 999 个课节';
                }

                if (error) {
                    tip({
                        type: 'error',
                        content: error
                    });
                    return;
                }

                var isFree = instance.get('courseInfoOptions.isFree');
                list.push({
                    sectionId: '',
                    sectionName: '',
                    videoId: '',
                    videoName: '',
                    payStatus: isFree
                        ? constant.COURSE_SECTION_PAY_STATUS_FREE
                        : constant.COURSE_SECTION_PAY_STATUS_CHARGE,
                    canEditSectionName: true,
                    canDeleteSection: true,
                    canDeleteVideo: true,
                    canChangePayStatus: true
                });
                instance.set({
                    'courseSectionListOptions.list': list,
                    courseSectionEditing: true
                });
            },
            saveCourseSection: function () {

                if (!this.validateCourseInfo()) {
                    return;
                }

                var error;
                var sectionIds = [ ];

                var list = instance.get('courseSectionListOptions.list');

                for (var i = 0, len = list.length; i < len; i++) {
                    var sectionId = list[i].sectionId;

                    if (!list[i].sectionName) {
                        error = '第' + (i + 1) + '课节缺少课节标题';
                    }
                    else if (!list[i].videoId) {
                        error = '第' + (i + 1) + '课节缺少视频';
                    }
                    else if (!sectionId) {
                        error = '第' + (i + 1) + '课节未保存到服务器';
                    }

                    if (error) {
                        break;
                    }
                    sectionIds.push(sectionId);
                }


                if (!error && !sectionIds.length) {
                    error = '请设置至少一门视频课';
                }

                if (error) {
                    tip({
                        type: 'error',
                        content: error
                    });
                    return;
                }

                service
                .saveVideoOrder({
                    number: instance.get('courseNumber'),
                    sectionIds: sectionIds
                })
                .then(function () {
                    instance.set({
                        courseSectionEditing: false
                    });
                    tip({
                        type: 'success',
                        content: '保存成功'
                    });
                });

            },


            editCourseDetail: function () {
                instance.set({
                    'courseDetailEditingEditorOptions.content': instance.get('courseDetail'),
                    courseDetailEditing: true
                });
            },
            saveCourseDetail: function () {

                if (!this.validateCourseInfo() || !this.validateCourseSection()) {
                    return;
                }

                var error;

                var length = instance.get('courseDetailEditingEditorOptions.length');
                if (length > COURSE_DETAIL_MAX_LENGTH) {
                    error = '课程详情不能超过' + COURSE_DETAIL_MAX_LENGTH + '个字';
                }
                else {
                    error = instance.get('courseDetailEditingEditorOptions.error');
                }

                if (error) {
                    tip({
                        type: 'error',
                        content: error
                    });
                    return;
                }

                var courseDetail = instance.get('courseDetailEditingEditorOptions.content');

                service
                .saveCourseDetail({
                    number: instance.get('courseNumber'),
                    brief: courseDetail
                })
                .then(
                    function () {
                        instance.set({
                            courseDetailEditing: false,
                            courseDetail: courseDetail
                        });
                        tip({
                            type: 'success',
                            content: '保存成功'
                        });
                    },
                    saveFailHandler
                );

            },
            restoreCourseDetail: function () {
                confirm({
                    type: 'primary',
                    title: '温馨提示',
                    content: '你所更新的信息都将丢失，确认不保存？'
                })
                .then(function () {
                    instance.set(
                        'courseDetailEditing',
                        false
                    );
                });
            },

            validateCourseInfo: function (silent) {

                var error;
                var courseNumber = instance.get('courseNumber');
                var courseInfoEditing = instance.get('courseInfoEditing');

                if (!courseNumber || courseInfoEditing) {
                    error = '请保存第一步';
                }

                if (error) {
                    if (!silent) {
                        tip({
                            type: 'error',
                            content: error
                        });
                    }
                    return;
                }

                return true;

            },

            validateCourseSection: function (silent) {

                var error;

                var courseSectionEditing = instance.get('courseSectionEditing');
                var courseSectionList = instance.get('courseSectionListOptions.list');

                if (courseSectionEditing) {
                    error = '请保存第二步';
                }
                else if (!courseSectionList.length) {
                    error = '请添加至少一门视频课';
                }

                if (error) {
                    if (!silent) {
                        tip({
                            type: 'error',
                            content: error
                        });
                    }
                    return;
                }

                return true;

            },

            validateCourseDetail: function (silent) {

                var error;

                var courseDetailEditing = instance.get('courseDetailEditing');
                var courseDetail = instance.get('courseDetail');

                if (courseDetailEditing) {
                    error = '请保存第三步';
                }
                else if (!courseDetail) {
                    error = '请填写课程详情';
                }
                else {
                    error = instance.get('courseDetailEditingEditorOptions.error');
                }

                if (error) {
                    if (!silent) {
                        tip({
                            type: 'error',
                            content: error
                        });
                    }
                    return;
                }

                return true;

            },

            validateModifyReason: function (silent) {
                var showModifyReason = instance.get('showModifyReason');
                if (showModifyReason) {
                    var modifyReason = instance.get('modifyReasonInputOptions.value');
                    if (!modifyReason && !silent) {
                        tip({
                            type: 'error',
                            content: '请填写修改原因'
                        });
                        return;
                    }
                }
                return true;
            },

            publishCourse: function () {
                if (instance.validateCourseInfo()
                    && instance.validateCourseSection()
                    && instance.validateCourseDetail()
                    && instance.validateModifyReason()
                ) {
                    service.saveCourse({
                        number: instance.get('courseNumber'),
                        status: constant.COURSE_STATUS_PUBLISH,
                        modifyReason: instance.get('modifyReasonInputOptions.value')
                    })
                    .then(function () {
                        tip({
                            type: 'success',
                            content: '发布成功',
                            modal: true
                        })
                        .then(function () {
                            redirect(
                                '/video_course/getcourselist?type=1&page=1&page_size=10'
                            );
                        });
                    });
                }
            },
            saveToQueue: function () {
                if (instance.validateCourseInfo()
                    && instance.validateCourseSection()
                    && instance.validateCourseDetail()
                    && instance.validateModifyReason()
                ) {
                    service.saveCourse({
                        number: instance.get('courseNumber'),
                        status: constant.COURSE_STATUS_WAITING_PUBLISH,
                        modifyReason: instance.get('modifyReasonInputOptions.value')
                    })
                    .then(function () {
                        tip({
                            type: 'success',
                            content: '保存成功',
                            modal: true
                        })
                        .then(function () {
                            redirect(
                                '/video_course/getcourselist?type=1&page=1&page_size=10'
                            );
                        });
                    });
                }
            }

        })
    };

});