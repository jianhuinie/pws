/**
 * @file videoCourseEdit controller
 * @author niejianhui
 * @date 2017/08/15
 */

define(function (require) {
    'use strict';
    require('./service');
    var Validator = require('cc-config/form/Validator');
    var localStorage = require('cc/util/localStorage');

    angular.module('Manage.videoCourseEdit.controller', [
            'Manage.services',
            'Manage.videoCourseEdit.service'
        ])
        .controller('VideoCourseEditCtrl', ['$rootScope', '$scope', 'videoCourseEditService',
        'utilService', '$stateParams', 'dialog', 'uploaderService', '$interval', 'userInfo',
            function ($rootScope, $scope, videoCourseEditService,
                utilService, $stateParams, dialog, uploaderService, $interval, userInfo) {
                // if (location.host.indexOf('8108') < 0) {
                //     document.domain = 'genshuixue.com';
                // }

                var validator;
                var cacheCourseKey = 'editVideoCourse';
                //是否第一次切换课程模式
                var isFirstToggleMode = true;
                //前一次的模式 防止重复触发事件
                var preMode = '';
                //监听删除草稿的postMessage
                window.addEventListener('message', function (event) {
                    if ((event.origin.indexOf('genshuixue.com') < 0)
                        && (event.origin.indexOf('baijiahulian.com') < 0)
                        && (event.origin.indexOf('8108') < 0)) {
                        return;
                    }
                    var data = JSON.parse(event.data);
                    if (data && data.action === 'deleteCacheCourse') {
                        localStorage.remove(cacheCourseKey);
                    }
                    else if (data && data.action === 'getCacheCourse') {
                        var cacheVideoCourse = localStorage.get(cacheCourseKey);
                        window.parent.postMessage(cacheVideoCourse || '', '*');
                    }
                });

                // 获取视频课列表页的url
                function getVideoCourseListUrl() {
                    var env = utilService.getEnvName();
                    var orgUrlStr = '.genshuixue.com/main.html#/courses/videoCourseList';
                    var skipUrl;
                    if (+$scope.user.user_role === 6) {
                        if (env === 'www') {
                            skipUrl = 'http://i' + orgUrlStr;
                        }
                        else if (env === 'beta') {
                            skipUrl = 'http://beta-i' + orgUrlStr;
                        }
                        else {
                            skipUrl = 'http://test-i.ctest' + orgUrlStr;
                        }
                    }
                    else {
                        skipUrl = '/detail.html#/courseList/videocourse';
                    }
                    return skipUrl;
                }

                // 获取自动保存时间字符串
                function getAutoSaveTimeStr() {
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    $scope.autoSaveTime = hours + ':' + minutes;
                }

                // 上报函数
                function doReport(params) {
                    var typeArryMap = {
                        'chapter': 'course_video_chapter_mode',
                        'multiple': 'course_video_section_mode'
                    };
                    var defaultParams = {
                        user_number: $scope.user.user_number,
                        course_number: $scope.courseNumber || '',
                        type: typeArryMap[$scope.courseMode]
                    };
                    var data = $.extend({}, defaultParams, params);
                    WAT.send('https://click.genshuixue.com/gs.gif', data);
                }

                // 初始化左侧锚点导航
                function initSideNav() {
                    $scope.sideNavOptions = {
                        sideMenus: [
                            {
                                text: '基础信息',
                                boxClass: 'basic-info',
                            },
                            {
                                text: '课程封面',
                                boxClass: 'photo-upload'
                            },
                            {
                                text: '图文详情',
                                boxClass: 'detail-intro'
                            },
                            {
                                text: '视频上传',
                                boxClass: 'videos-upload'
                            }
                        ],
                        safeDistance: 70
                    };
                }

                // 初始化表单验证
                function initValidator() {
                    var validateOptions = {
                        mainElement: $('.info-box'),
                        validateOnBlur: true,
                        fields: {
                            courseName: {
                                rules: {
                                    required: true,
                                    maxlength: 26
                                },
                                errors: {
                                    required: '请填写课程名称',
                                    maxlength: '最大长度为26个字'
                                }
                            },
                            courseSubject: {
                                validateOnBlur: false,
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请选择课程所属科目',
                                }
                            },
                            coursePrice: {
                                rules: {
                                    required: true,
                                    // pattern: /^(\d)+(\.)?(\d)?(\d)?$/,
                                    pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
                                    min: 0,
                                    max: 999999.99
                                },
                                errors: {
                                    required: '请填写课程价格',
                                    pattern: '仅支持0-999999的两位小数哦',
                                    min: '最低 0 元',
                                    max: '最高 999999 元'
                                }
                            },
                            expireDays: {
                                rules: {
                                    required: true,
                                    pattern: /(^[1-9])[0-9]*$/,
                                    // min: 1,
                                    max: 730,
                                },
                                errors: {
                                    required: '请填写视频观看期限',
                                    pattern: '请输入1-730的有效的数字',
                                    // min: '有效期最短为1天',
                                    max: '有效期最长为730天',

                                }
                            },
                            definedNumber: {
                                rules: {
                                    pattern: /^[a-zA-Z\d]*$/
                                },
                                errors: {
                                    pattern: '编码只支持字母和数字'
                                }
                            }
                        }
                    };
                    validator = new Validator(validateOptions);
                }

                // 添加标题项
                function addTitleItem(item) {
                    var titleItem = {
                        type: 'title',
                        options: {
                            text: item.text
                        }
                    };
                    $scope.richEditorOptions.editorList.push(titleItem);
                }

                // 添加正文项
                function addBodyItem(item) {
                    var bodyItem = {
                        type: 'body',
                        options: {
                            text: item.text,
                            fontWeight: item.font_weight,
                            fontSize: item.font_size,
                            textAlign: item.text_align,
                            color: item.color,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(bodyItem);
                }

                // 添加图片
                function addPhotoItem(item) {
                    var photoItem = {
                        type: item.type,
                        options: {
                            storageId: item.storage_id,
                            url: item.url,
                            refer_url: item.refer_url || ''
                        }
                    };
                    $scope.richEditorOptions.editorList.push(photoItem);
                }
                // 添加音频
                function addAudioItem(item) {
                    var audioItem = {
                        type: item.type,
                        options: {
                            storageId: item.storage_id,
                            url: item.url,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(audioItem);
                }

                // 添加视频项
                function addVideoItem(item) {
                    var videoItem = {
                        type: 'video',
                        options: {
                            videoId: item.video_id,
                            coverUrl: item.cover_url,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(videoItem);
                }

                // 初始化富文本编辑器信息
                function initRichEditorOpts(intro) {
                    $scope.richEditorOptions.style = intro.style;
                    $scope.richEditorOptions.editorList = [];
                    $.each(intro.items, function (index, item) {
                        switch(item.type) {
                            case 'title':
                                addTitleItem(item);
                                break;
                            case 'body':
                                addBodyItem(item);
                                break;
                            case 'video':
                                addVideoItem(item);
                                break;
                            case 'photo':
                                addPhotoItem(item);
                                break;
                            case 'audio':
                                addAudioItem(item);
                                break;
                        }
                    });
                }

                // 初始化课节
                function initSectionList(sectionList) {
                    var sectionListArr = [];
                    $.each(sectionList, function (index, item) {
                        var sectionItem = {
                            isEditing: false,
                            selected: false,
                            name: item.name,
                            videoName: item.video_name,
                            enableTrial: item.enable_trial ? 'enable' : 'disable',
                            trialMinutes: item.trial_minutes,
                            sectionId: item.section_id,
                            videoId: item.video_id,
                            encoding_status: item.encoding_status
                        };
                        sectionListArr.push(sectionItem);
                    });
                    return sectionListArr;
                }

                // 初始化章节
                function initChapterSections(chapterSections) {
                    $.each(chapterSections, function (index, chapter) {
                        var chapterItem = {
                            isEditing: false,
                            selected: false,
                            name: chapter.name,
                            chapterIndex: index,
                            chapterId: chapter.chapter_id,
                            sectionList: initSectionList(chapter.section_list)
                        };
                        $scope.chapterSections.push(chapterItem);
                    });
                }

                // 初始化视频课信息
                function initVideoCourses(data) {
                    if (data.course.course_mode === 'multiple') {
                        var chapter0 = data.chapter_sections[0];
                        if (chapter0 && chapter0.section_list.length) {
                            $scope.sectionList = initSectionList(chapter0.section_list);
                            $scope.chapter0Name = chapter0.name;
                            $scope.chapter0Id = chapter0.chapter_id;
                        }
                    }
                    else if (data.chapter_sections.length) {
                        initChapterSections(data.chapter_sections);
                    }
                }

                // 初始化帮助信息
                function initHelpInfo() {
                     //基础信息提示信息
                     $scope.baseInfoHelpOptions = {
                        content: '1. 课程名称：准确的课程标题可以让学生迅速了解您的课程。比如 “水彩画零基础速成” 比 “画画” 更容易吸引学员<br/>'
                                  + '2. 科目：使用搜索功能可以帮你更快地找到目标科目，建议选择主营科目，更好的发挥个人优势<br/>'
                                  + '3. 课程价格：指的是课程售价，适当的价格可以促进课程的销售。免费课请直接设置价格为0元<br/>'
                                  + '4. 授课语言：您授课所使用的语言，便于给学生提供参考',
                        width: 760,
                        position: 'bottom'
                    };
                    //图片介绍提示信息
                    $scope.introPicHelpOptions = {
                        content: '1. 您可以上传展示教学场地、作品或其他能体现课程特色的高质量照片，这有助于给学生留下良好印象<br/>'
                                  + '2. 精美的封面图片会获得包括聚惠学在内的更多展示机会<br/>'
                                  + '3. 请上传不超过5M、格式为jpg、jpeg、png的图片，最多上传12张封面，注意不能出现广告信息和水印哦<br/>'
                                  + '<div>参考示例</div>'
                                  + '<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/578c45f5b34e0.png@1e_173w_98h_1c_0i_1o_90Q_1x.jpeg">'
                                  + '<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/578c45f5d834a.png@1e_173w_98h_1c_0i_1o_90Q_1x.jpeg">',
                        width: 760,
                        position: 'bottom'
                    };
                    //视频上传提示信息
                    $scope.videoUploadHelpOptions = {
                        content: '1. 课程模式：请根据实际课程需要选择课节模式或章节模式<br/>'
                                  + '2. 视频上传：请上传清晰度较好的视频，大小不要超过2G<br/>'
                                  + '3. 课节名称：清晰明了的课节名称可以帮助学生更好的了解课程结构<br/>'
                                  + '4. 试听选择：收费课程可根据实际情况选择1到2节试听课，帮助您吸引更多学生上课',
                        width: 760,
                        position: 'bottom'
                    };
                    //图文详情提示信息
                    $scope.detailIntroHelpOptions = {
                        content: '1. 您可以简要地描述课程的适学人群、课程规划及特点等。适当的使用短视频、图片、音频将使课程详情更加富有吸引力，提高学生对教学质量的信任程度<br/>'
                                  + '2. 仅支持5M以内的jpg、png、jpeg格式图片，宽度最好不要超过760像素<br/>'
                                  + '3. 视频最大支持250MB，上传后需要最多3个小时左右进行转码，请您耐心等待<br/>'
                                  + '4. 请不要在内容中出现电话、QQ和个人网址哦',
                        width: 760,
                        position: 'bottom'
                    };
                }

                // 初始化授课语言下拉框
                function initLanguageDropdown(defaultValue) {
                    $scope.languageOptions = {
                        defaultValue: defaultValue,
                        onSelected: function (value) {
                            $scope.baseInfo.language = value;
                        }
                    };
                }

                // 格式化老师下拉框数据
                function formatOrgTeachers(orgTeachers) {
                    var arr = [];
                    $.each(orgTeachers, function(index, item) {
                        arr.push({
                            text: item.realname,
                            value: item.id
                        });
                    });
                    return arr;
                }

                // 初始化基础信息
                function initBaseInfo(course) {
                    $scope.baseInfo = {
                        courseName: course.name || '',
                        coursePrice: course.price || '',
                        expireDays: course.expire_days || 365,
                        language: course.language || 1,
                        teacherName: course.teacher_name || '',
                        teacherId: course.teacher_id || '',
                        groupName: course.group_name || '',
                        groupId: course.group_id || '',
                        definedNumber: course.defined_number || '',
                        modifyReasons: course.modify_reasons || ''
                    };
                }

                // 初始化老师选择下拉框
                function initTeacherSelectorOptions(defaultValue, orgTeachers) {
                    $scope.teacherSelectorOptions = {
                        defaultValue: defaultValue,
                        dataSource: formatOrgTeachers(orgTeachers),
                        onSelected: function (data) {
                            $scope.baseInfo.teacherId = data.value;
                            $scope.baseInfo.teacherName = data.text;
                        }
                    };
                }

                // 创建缓存课程的数据
                function createCacheData() {
                    var cacheCourse = {
                        baseInfo: $scope.baseInfo,
                        selectSubjectOpts: $scope.selectSubjectOpts,
                        chapterSections: $scope.chapterSections,
                        sectionList: $scope.sectionList,
                        richEditorOptions: $scope.richEditorOptions,
                        courseMode: $scope.courseMode,
                        covers: $scope.covers,
                        pathMark: $scope.pathMark
                    };
                    return cacheCourse;
                }

                // 每隔一分钟保存本地草稿
                function autoSaveCourse() {
                    var cacheData  = JSON.stringify(createCacheData());
                    localStorage.set(cacheCourseKey, cacheData);
                    getAutoSaveTimeStr();
                }

                // 初始化科目选择参数
                function initSelectSubjectOpts(subject) {
                    $scope.selectSubjectOpts.subjectId = subject.id || '';
                    $scope.selectSubjectOpts.subjectName = subject.name || '';
                    $scope.selectSubjectOpts.pathCrumbs = subject.path_crumbs || '';
                }

                // 初始化视频课节审核信息
                function initVideoCourseVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item.name + ':<br/>';
                        $.each(item.reasons, function (index1, item1) {
                            str +=  item1 + '<br/>';
                        });
                    });
                    $scope.videoCourseVerifyReasons = str;
                }

                // 初始化视频课图文详情的审核信息
                function initCourseDetailVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item + '<br/>';
                    });
                    $scope.courseDetailVerifyReasons = str;
                }

                // 初始化视频封面的审核信息
                function initCoverVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item + '<br/>';
                    });
                    $scope.coverVerifyReasons = str;
                }

                // 初始化视频课其他信息的审核信息
                function initCourseInfoVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        if (item.id === 1709) {
                            initCourseDetailVerifyReasons(item.reasons);
                        }
                        else if (item.id === 1701) {
                            initCoverVerifyReasons(item.reasons);
                        }
                        else {
                            str +=  item.name + ':<br/>';
                            $.each(item.reasons, function (index1, item1) {
                                str +=  item1 + '<br/>';
                            });
                        }
                    });
                    $scope.courseInfoVerifyReasons = str;
                }


                // 初始化审核信息
                function  initVerifyReasons(verifyReasons) {
                    $.each(verifyReasons, function (index, item) {
                        switch(item.id) {
                            case 1710:
                                initVideoCourseVerifyReasons(item.children[0].children);
                                break;
                            case 1701:
                                initCourseInfoVerifyReasons(item.children);
                                break;
                        }
                    });
                }

                //初始化视频转码失败提示信息
                function initEncodeInfo(encodeInfo) {
                    $scope.encodeInfo = encodeInfo[0];
                    if (encodeInfo.length > 1) {
                        var str = '';
                        $.each(encodeInfo, function (index, item) {
                            str +=  item + ':<br/>';
                        });
                        $scope.encodeInfoToolTipOpt = {
                            content: str,
                            position: 'bottom',
                            width: 300
                        }
                    }
                }

                // 用后端数据初始化课程信息
                function initCourseInfoFromBackend() {
                    //富文本编辑器组件先初始化  故要先定义这个参数
                    $scope.richEditorOptions = {};
                    $scope.courseDetails = {
                        value: ''
                    };

                    videoCourseEditService
                        .getCourseInfo({
                            data: {
                                number: $scope.courseNumber
                            },
                            method: 'GET'
                        })
                        .then(function (response){
                            var data = response.data;
                            var course = data.course;
                            var subject = course.subject;
                            var orgTeachers = course.org_teachers;
                            var verifyReasons = data.verify_reasons;
                            var encodeInfo = data.encode_info;
                            $scope.verifyPassed = course.verify_passed;
                            $scope.displayStatus = course.display_status;
                            $scope.isNewCourse = course.is_new_course;
                            $scope.isPlaybackCourse = course.is_playback_course;
                            $scope.pathMark = subject.path_mark;

                            initBaseInfo(course);
                            initTeacherSelectorOptions(course.teacher_id, orgTeachers);

                            $scope.languageOptions.defaultValue = course.language;
                            $scope.covers = {
                                storage_id: course.cover.storage_id || '',
                                url: course.cover.url || ''
                            };
                            initSelectSubjectOpts(subject);
                            $scope.courseMode = preMode = course.course_mode;
                            isFirstToggleMode = false;
                            $scope.sectionList = [];
                            $scope.chapterSections = [];
                            if ($scope.isNewCourse) {
                                initRichEditorOpts(data.intro);
                            }
                            else {
                                $scope.courseDetails.value = course.detail || '';
                                $scope.$broadcast('umeditorcontentchange', course.detail || '');
                            }
                            initVideoCourses(data);
                            if (verifyReasons && verifyReasons.detail && verifyReasons.detail.children) {
                                initVerifyReasons(verifyReasons.detail.children);
                            }
                            if (encodeInfo.length > 0) {
                                initEncodeInfo(encodeInfo);
                            }
                        });
                }

                // 用后端数据初始化老师选下拉框
                function initTeacherselectFromBackend(teacherId) {
                    userInfo().then(function (response) {
                        if (+response.data.user_role === 6 ) {
                            //不传参数 这个接口只返回机构老师
                            videoCourseEditService
                                .getCourseInfo({
                                    data: {
                                        number: $scope.courseNumber
                                    },
                                    method: 'GET'
                                })
                                .then(function (response){
                                    var orgTeachers = response.data.course.org_teachers;
                                    initTeacherSelectorOptions(teacherId, orgTeachers);
                                });
                        }
                    });
                }

                // 用缓存草稿初始化课程信息
                function initCourseInfoFromCache(cacheVideoCourse) {
                    $scope.baseInfo = cacheVideoCourse.baseInfo;
                    var subjectOpts = cacheVideoCourse.selectSubjectOpts;
                    var obj = {
                        id: subjectOpts.subjectId,
                        name: subjectOpts.subjectName,
                        path_crumbs: subjectOpts.pathCrumbs,
                    };
                    initSelectSubjectOpts(obj);
                    $scope.covers = cacheVideoCourse.covers;
                    $scope.richEditorOptions = cacheVideoCourse.richEditorOptions;
                    $scope.courseMode = cacheVideoCourse.courseMode;
                    $scope.sectionList = cacheVideoCourse.sectionList;
                    $scope.chapterSections = cacheVideoCourse.chapterSections;
                    $scope.pathMark = cacheVideoCourse.pathMark;
                    initTeacherselectFromBackend($scope.baseInfo.teacherId);

                    if ($scope.courseMode ) {
                        preMode = $scope.course_mode;
                        isFirstToggleMode = false;
                    }
                }

                // 始化课程信息
                function initCourseInfo() {
                    initBaseInfo({});
                    initSelectSubjectOpts({});
                    initTeacherselectFromBackend('');
                    $scope.covers = {};
                    $scope.richEditorOptions = {
                        style: '',
                        editorList: []
                    };
                    $scope.courseMode = '';
                    $scope.sectionList = [];
                    $scope.chapterSections = [];
                    $scope.pathMark = '';
                }

                // 初始化一些参数
                function initView() {
                    $scope.courseNumber = $stateParams.courseNumber;
                    //是否有正在编辑的项
                    $scope.hasEditingItem = false;
                    //是否展示科目下拉
                    $scope.showSubjectMenu = false;
                    $scope.isNewCourse = true;
                    //是否是回放转视频课
                    $scope.isPlaybackCourse = false;
                    initSideNav();
                    initHelpInfo();
                    initLanguageDropdown(1);
                    // 正在上传的视频列表 - 为多视频上传准备
                    $scope.uploadingFiles = [];

                    //加载指令  故要先定义
                    $scope.selectSubjectOpts = {
                        onSelected: function (data) {
                            var pathCrumbs = data.pathCrumbs;
                            var name = pathCrumbs.split('>')[2];
                            $scope.selectSubjectOpts.subjectId = data.id;
                            $scope.selectSubjectOpts.pathCrumbs = pathCrumbs;
                            $scope.selectSubjectOpts.subjectName = name;
                            $scope.pathMark = data.pathMark;
                            $scope.showSubjectMenu = false;
                            // $scope.$broadcast(data.eventName, data);
                        }
                    };

                    //有课程number  请求后端数据 1是为了机构跨域访问localStorage加的特殊参数
                    if ($scope.courseNumber && +$scope.courseNumber !== 1) {
                        initCourseInfoFromBackend();
                    }
                    //没有课程number 初始化数据
                    else {
                        //如果有草稿 取草稿
                        var cacheVideoCourse = localStorage.get(cacheCourseKey);
                        if (cacheVideoCourse) {
                            initCourseInfoFromCache(JSON.parse(cacheVideoCourse));
                        }
                        else {
                            initCourseInfo();
                        }
                        $interval(autoSaveCourse, 60 * 1000);
                    }
                    initValidator();
                }

                initView();

                // 跳到列表页
                $scope.goToListPage = function () {
                    utilService.showMessage({
                        title: '温馨提示',
                        content: '您确定离开当前编辑页面吗?',
                        hideCancel: false,
                        okHandler: function () {
                            location.href = getVideoCourseListUrl();
                        }
                    });
                };

                // 选择课程分组
                $scope.chooseCourseGroup = function () {
                    dialog.open({
                        title: '将课程移动到以下分组：',
                        controller: require('module/main/videoCourseEdit/chooseGroupDialog/controller'),
                        width: 390,
                        resolve: {
                            groupId: function () {
                                return $scope.baseInfo.groupId;
                            }
                        },
                        skinClass: 'choose-group-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/chooseGroupDialog/tpl.html'
                    })
                    .then(function (param) {
                        $scope.baseInfo.groupId = param.groupId;
                        $scope.baseInfo.groupName = param.name;
                    });
                };

                // 上传课程封面
                $scope.uploadCourseCover = function () {
                    $scope.coverUploading = false;
                    var coverUploaderOpt = {
                        type: 'pic',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.coverUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(coverUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.covers.storage_id = data.id;
                        $scope.covers.url = data.url;
                        $scope.coverUploading = false;
                    }, function (res) {
                        $scope.coverUploading = false;
                        utilService.showMessage(res.message || res.msg);
                    });
                    coverUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.coverUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    coverUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.coverUploading = true;
                    });
                };

                // 确认切换课程模式
                function confirmToogleCourseMode(mode) {
                    var content, okHandler, cancelHandler;
                    if (mode === 'multiple') {
                        content = '从章节模式切换为多节模式，默认会将所有章下的课节按顺序转为单课节。确认切换为多节模式？';
                        cancelHandler = function () {
                            $scope.courseMode = 'chapter';
                        };
                        okHandler = function () {
                            preMode = 'multiple';
                            //将章下的所有课节挪出来 清空章
                            $.each($scope.chapterSections, function (index, chapter) {
                                $.each(chapter.sectionList, function (index1, section) {
                                    $scope.sectionList.push(section);
                                });
                            });
                            $scope.chapterSections = [];
                        };
                    }
                    else {
                        content = '从多节模式切换为章节模式，默认会将已编辑的课节全部放在第一章下。确认切换为章节模式？';
                        cancelHandler = function () {
                            $scope.courseMode = 'multiple';
                        };
                        okHandler = function () {
                            preMode = 'chapter';
                            //将所有课节放到第一章下面 清空节
                            $scope.addNewChapter($scope.sectionList);
                            $scope.sectionList = [];
                        };
                    }
                    utilService
                        .showMessage({
                            title: '温馨提示 ',
                            skinClass: 'toggle-coursemode-dialog',
                            content: content,
                            hideCancel: false,
                            okBtnPosition: 'left',
                            okBtnText: '取消',
                            cancelBtnText: '确定',
                            cancelHandler: okHandler,
                            okHandler: cancelHandler
                        });
                }

                // 切换展示／隐藏科目下拉
                $scope.toggleShowSubjectMenu = function (e) {
                    $scope.showSubjectMenu = !$scope.showSubjectMenu;
                    e.stopPropagation();
                };
                // 点击其他区域隐藏
                $('body').click(function () {
                    if ($scope.showSubjectMenu) {
                        $rootScope.safeApply(function () {
                            $scope.showSubjectMenu = false;
                        });
                    }
                });

                // 更新章的索引
                function refreshChapterIndex() {
                    $.each($scope.chapterSections, function (index, item) {
                        item.chapterIndex = index;
                    });
                }

                // 切换课程模式
                $scope.swtichCourseMode = function (mode) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请保存后再切换课程模式');
                        $scope.courseMode = preMode;
                        return false;
                    }
                    if (!isFirstToggleMode && preMode !== mode) {
                        confirmToogleCourseMode(mode);
                    }
                    else if (isFirstToggleMode) {
                        preMode = mode;
                        //首次选择课程模式初始化
                        if (mode === 'multiple') {
                            $scope.addNewSection();
                        }
                        else {
                            $scope.addNewChapter();
                        }
                    }
                    isFirstToggleMode = false;
                };

                // 编辑课节
                $scope.editSection = function (section) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请完成编辑后再操作');
                        return;
                    }
                    section.isEditing = true;
                    $scope.hasEditingItem = true;
                };

                // 是否有正在编辑的课节
                function hasEditingSection(sectionList) {
                    var hasEditingItem = false;
                    $.each(sectionList, function (index, section) {
                        if (section.isEditing) {
                            hasEditingItem = true;
                            return false;
                        }
                    });
                    return hasEditingItem;
                }

                // 章下面是否有正在编辑的课节
                function hasEDitingChapterSection() {
                    var hasEditingItem = false;
                    $.each($scope.chapterSections, function (index, chapter) {
                        if (hasEditingSection(chapter.sectionList)) {
                            hasEditingItem = true;
                            return false;
                        }
                    });
                    return hasEditingItem;
                }

                // 监听是否展示添加新课节按钮的事件
                $scope.$on('hasEditingItemChange', function (e, data) {
                    //新增章下会有一个编辑态的课节
                    if (data.chapterIndex !== undefined) {
                        var sectionList = $scope.chapterSections[data.chapterIndex].sectionList;
                        $scope.hasEditingItem = hasEditingSection(sectionList);
                    }
                    else {
                        $scope.hasEditingItem = data.hasEditingItem;
                    }
                });

                // 监听是否有富文本编辑项在上传的事件
                $scope.$on('uploadingStatusChange', function (e, data) {
                    $scope.hasUploadingEditorItem = data;
                });

                // 删除单课节
                $scope.deleteSection = function (index, chapterIndex) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: '您确认删除该课节吗？',
                            hideCancel: false,
                            okBtnText: '确定',
                            cancelBtnText: '取消',
                            okHandler: function () {
                                if (chapterIndex !== undefined) {
                                    $scope.chapterSections[chapterIndex].sectionList.splice(index, 1);
                                }
                                else {
                                    $scope.sectionList.splice(index, 1);
                                }
                            }
                        });
                };

                // 增加新课节
                $scope.addNewSection = function (chapterIndex) {
                    var sectionItem = {
                        isEditing: true,
                        selected: false,
                        name: '',
                        videoName: '',
                        enableTrial: 'disable',
                        trialMinutes: -1,
                        videoId: '',
                        sectionId: ''
                    };
                    if (chapterIndex !== undefined) {
                        $scope.chapterSections[chapterIndex].sectionList.push(sectionItem);
                    }
                    else {
                        $scope.sectionList.push(sectionItem);
                    }
                    $scope.hasEditingItem = true;
                };

                // 显示/隐藏 章下的节
                $scope.toggleShowList = function (chapter) {
                    chapter.showSectionList = !chapter.showSectionList;
                };

                // 编辑章
                $scope.editChapter = function (chapter) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请完成编辑后再操作');
                        return;
                    }
                    chapter.showSectionList = false;
                    chapter.isEditing = true;
                    $scope.hasEditingItem = true;
                };

                // 添加章
                $scope.addNewChapter = function (sectionList) {
                    // 默认课节
                    var sectionItem = {
                        isEditing: true,
                        selected: false,
                        name: '',
                        videoName: '',
                        enableTrial: 'disable',
                        trialMinutes: -1,
                        videoId: '',
                        sectionId: ''
                    };
                    var chapterItem = {
                        chapterId: '',
                        selected: false,
                        showSectionList: false,
                        chapterIndex: $scope.chapterSections.length,
                        name: '',
                        isEditing: true,
                        sectionList: sectionList || [sectionItem]
                    };
                    $scope.chapterSections.push(chapterItem);
                    $scope.hasEditingItem = true;
                };

                // 删除章
                $scope.deleteChapter = function (chapterIndex) {
                    utilService
                    .showMessage({
                        title: '温馨提示',
                        content: '确定删除本章节及其所有课节？',
                        hideCancel: false,
                        okBtnText: '确定',
                        cancelBtnText: '取消',
                        okHandler: function () {
                            $scope.chapterSections.splice(chapterIndex, 1);
                            refreshChapterIndex();
                            $scope.hasEditingItem = hasEDitingChapterSection();
                        }
                    });
                };

                // 处理弹窗返回的结果
                function dealDialogDismissData(newList) {
                    if ($scope.courseMode === 'multiple') {
                        $scope.sectionList = newList;
                    }
                    else {
                        $scope.chapterSections = newList;
                        refreshChapterIndex();
                    }
                }

                // 选择删除
                $scope.selectDelete = function () {
                    doReport({stype: 'batch_delete'});
                    dialog.open({
                        title: '选择删除课节',
                        controller: require('module/main/videoCourseEdit/selectDeleteDialog/controller'),
                        width: 607,
                        resolve: {
                            params: function () {
                                return {
                                    courseMode: $scope.courseMode,
                                    courseNumber: $scope.courseNumber,
                                    chapterSections: $scope.chapterSections,
                                    sectionList: $scope.sectionList
                                };
                            }
                        },
                        skinClass: 'select-delete-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/selectDeleteDialog/tpl.html'
                    })
                    .then(function (newList) {
                        dealDialogDismissData(newList);
                    });
                };

                 // 整体排序
                 $scope.sortAll = function () {
                    doReport({stype: 'batch_sort'});

                    dialog.open({
                        draggable: false,
                        title: '调整课节顺序',
                        controller: require('module/main/videoCourseEdit/sortAllDialog/controller'),
                        width: 607,
                        resolve: {
                            params: function () {
                                return {
                                    courseMode: $scope.courseMode,
                                    courseNumber: $scope.courseNumber,
                                    chapterSections: $scope.chapterSections,
                                    sectionList: $scope.sectionList
                                };
                            }
                        },
                        skinClass: 'sortall-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/sortAllDialog/tpl.html'
                    })
                    .then(function (newList) {
                        dealDialogDismissData(newList);
                    });
                };

                //展示提示信息
                function showRemindInfo(remindInfo) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: remindInfo
                        });
                }

                //校验富文本编辑模块
                function validateRichEditor() {
                    var isValidate = true;
                    $.each($scope.richEditorOptions.editorList, function (index, item) {
                        var opts = item.options;
                        switch(item.type) {
                            case 'title':
                            case 'body':
                                if (!opts.text) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                            case 'video':
                                if (!opts.videoId) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                            case 'photo':
                            case 'audio':
                                if (!opts.storageId) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                        }
                    });
                    return isValidate;
                }

                //校验多节模式
                function validateSectionList(sectionList) {
                    var validateInfo = {};
                    var list = sectionList || $scope.sectionList;
                    $.each(list, function (index, item) {
                        if (!item.name) {
                            validateInfo.text =  '第' + (index + 1) + '节标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (item.videoId === '') {
                            validateInfo.text =  '第' + (index + 1) + '节视频文件';
                            validateInfo.action = '上传';
                            return false;
                        }
                        if (!item.videoName) {
                            validateInfo.text =  '第' + (index + 1) + '节视频标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (!item.enableTrial || (item.enableTrial === 'enable' && item.trialMinutes === '')) {
                            validateInfo.text =  '第' + (index + 1) + '节视频试听时长';
                            validateInfo.action = '选择';
                            return false;
                        }
                    });
                    return validateInfo;
                }

                //校验章节模式
                function validateChaptersections() {
                    var validateInfo = {};
                    $.each($scope.chapterSections, function (index, chapter) {
                        if (!chapter.name) {
                            validateInfo.text =  '第' + (index + 1) + '章标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (!chapter.sectionList.length) {
                            validateInfo.text =  '第' + (index + 1) + '章下面';
                            validateInfo.action = '至少上传1节视频到';
                            return false;
                        }
                        var sectionValidateInfo = validateSectionList(chapter.sectionList);
                        if (sectionValidateInfo.text) {
                            validateInfo.text =  '第' + (index + 1) + '章' + sectionValidateInfo.text;
                            validateInfo.action = sectionValidateInfo.action;
                            return false;
                        }
                    });

                    return validateInfo;
                }

                //校验视频课节
                function validateVideoCourse() {
                    var isValidate;
                    if ($scope.courseMode === 'chapter') {
                        isValidate = validateChaptersections();
                    }
                    else {
                        isValidate = validateSectionList();
                    }
                    return isValidate;
                }
                //校验图文详情转向链接url
                function validatePhotoReferUrl() {
                    var list = $scope.richEditorOptions.editorList;
                    var indexFlag = 0;
                    var validateInfo = {};
                    $.each(list, function (index, item) {
                        if (item.type === 'photo') {
                            indexFlag++;
                            var referUrl = item.options.refer_url;
                            if (referUrl && (referUrl.indexOf('genshuixue.com') === -1)) {
                                validateInfo.indexFlag = indexFlag;
                                return false;
                            }
                        }
                    });
                    return validateInfo;
                }

                //给后端格式化基础信息
                function formatBeseInfo() {
                    var baseInfo = $scope.baseInfo;
                    var selectSubjectOpts = $scope.selectSubjectOpts;
                    var course = {
                        name: baseInfo.courseName,
                        number: $scope.courseNumber || '',
                        language: baseInfo.language,
                        price: +baseInfo.coursePrice,
                        expire_days: +baseInfo.expireDays,
                        cover: $scope.covers,
                        course_mode: $scope.courseMode,
                        is_new_course: $scope.isNewCourse,
                        subject: {
                            id: selectSubjectOpts.subjectId,
                            path_crumbs: selectSubjectOpts.pathCrumbs,
                            name: selectSubjectOpts.subjectName,
                            path_mark: $scope.pathMark
                        }
                    };

                    //只有机构课程才有这些参数
                    if (+$scope.user.user_role === 6) {
                        course.teacher_name = baseInfo.teacherName || '';
                        course.teacher_id = baseInfo.teacherId || '';
                        course.group_name = baseInfo.groupName || '';
                        course.group_id = baseInfo.groupId || '';
                        course.defined_number = baseInfo.definedNumber || '';
                    }

                    if ($scope.verifyPassed) {
                        course.modify_reasons = baseInfo.modifyReasons;
                    }
                    if (!$scope.isNewCourse) {
                        course.detail = $scope.courseDetails.value;
                    }

                    return course;
                }

                //处理富文本列表
                function formatEditorList(editorList) {
                    var arr = [];
                    $.each(editorList, function (index, item) {
                        var opts = item.options;
                        switch(item.type) {
                            case 'title':
                                arr.push({
                                    type: item.type,
                                    text: opts.text
                                });
                                break;
                            case 'body':
                                arr.push({
                                    type: item.type,
                                    text: opts.text,
                                    font_weight: opts.fontWeight,
                                    font_size: opts.fontSize,
                                    text_align: opts.textAlign,
                                    color: opts.color
                                });
                                break;
                            case 'video':
                                arr.push({
                                    type: item.type,
                                    video_id: opts.videoId,
                                    cover_url: opts.coverUrl
                                });
                                break;
                            case 'photo':
                                arr.push({
                                    type: item.type,
                                    storage_id: opts.storageId,
                                    url: opts.url,
                                    refer_url: opts.refer_url || ''
                                });
                                break;
                            case 'audio':
                                arr.push({
                                    type: item.type,
                                    storage_id: opts.storageId,
                                    url: opts.url
                                });
                                break;
                        }
                    });
                    return arr;
                }

                //给后端格式化图文详情
                function formatIntro() {
                    var editorOptions = $scope.richEditorOptions;
                    var introList = editorOptions.editorList;
                    var intro = {
                        style: editorOptions.style || 'white',
                        items: formatEditorList(introList)
                    };
                    return intro;
                }

                //给后端格式化多课节
                function formatSectionList(sectionList) {
                    var arr = [];
                    var list = sectionList || $scope.sectionList;
                    $.each(list, function (index, item) {
                        arr.push({
                            index: ++index,
                            name : item.name,
                            video_name: item.videoName,
                            enable_trial: item.enableTrial === 'enable' ? true : false,
                            trial_minutes: item.trialMinutes,
                            video_id: item.videoId,
                            section_id: item.sectionId
                        });
                    });
                    return arr;
                }

                //给后端格式化章节
                function formatChapterSections() {
                    var arr = [];
                    $.each($scope.chapterSections, function (index, chapter) {
                        arr.push({
                            index: ++index,
                            name : chapter.name,
                            chapter_id : chapter.chapterId,
                            section_list: formatSectionList(chapter.sectionList)
                        });
                    });
                    return arr;
                }

                function validateSectionEncode(sectionList, chapterIndex) {
                    var arr = [];
                    var chapterText = '';
                    if (chapterIndex) {
                        chapterText = '第' + chapterIndex + '章';
                    }
                    $.each(sectionList, function (index, item) {
                        var encodingStatus = item.encoding_status;
                        if (encodingStatus && encodingStatus === 50) {
                            var arrItem = '第' + (index + 1) + '节';
                            if (chapterText) {
                                arrItem = chapterText + arrItem;
                            }
                            arr.push(arrItem);
                        }
                    });
                    return arr;
                }
                //课节转码状态校验
                function validateEncodeInfo() {
                    var encodeInfo = [];
                    if ($scope.courseMode === 'multiple') {
                        encodeInfo = validateSectionEncode($scope.sectionList);
                    }
                    else {
                        $.each($scope.chapterSections, function (index, chapter) {
                            var chapterEncodeInfo = validateSectionEncode(chapter.sectionList, ++index);
                            encodeInfo = encodeInfo.concat(chapterEncodeInfo);
                        });
                    }
                    return encodeInfo;
                }

                //发布课程
                function doReleaseCourse() {
                    $scope.savingCourse = true;
                    var saveParams = {};
                    saveParams.course = formatBeseInfo();
                    if ($scope.isNewCourse) {
                        saveParams.intro = formatIntro();
                    }
                    if ($scope.courseMode === 'chapter') {
                        saveParams.chapter_sections = formatChapterSections();
                    }
                    else {
                        saveParams.chapter_sections = [{
                            index: 1,
                            name: $scope.chapter0Name || '',
                            chapter_id: $scope.chapter0Id || 0,
                            section_list: formatSectionList()
                        }];
                    }
                    videoCourseEditService
                        .saveVideoCourse({
                            data_info: saveParams
                        })
                        .then(function () {
                            $scope.savingCourse = false;
                            localStorage.remove(cacheCourseKey);
                            location.href = getVideoCourseListUrl();
                        }, function () {
                            $scope.savingCourse = false;
                        });
                }

                //发布课程前校验
                $scope.releaseCourse = function () {

                    if (!validator.validate()) {
                        showRemindInfo('请完善基础信息');
                        return false;
                    }

                    if (!$scope.covers.url) {
                        showRemindInfo('请设置课程封面');
                        return false;
                    }

                    if ($scope.isNewCourse && !$scope.richEditorOptions.editorList.length) {
                        showRemindInfo('请编辑课程图文详情');
                        return false;
                    }

                    if ($scope.isNewCourse && !validateRichEditor()) {
                        showRemindInfo('有未填写的图文详情模块');
                        return false;
                    }
                    if (!$scope.isNewCourse && $scope.courseDetails.value === '') {
                        showRemindInfo('请编辑课程图文详情');
                        return false;
                    }
                    var validatePhotoReferUrlInfo = validatePhotoReferUrl();
                    if (validatePhotoReferUrlInfo.indexFlag) {
                        showRemindInfo('第' + validatePhotoReferUrlInfo.indexFlag + '张图片的转向链接不是跟谁学内部链接');
                        return false;
                    }

                    if (!$scope.sectionList.length && !$scope.chapterSections.length) {
                        showRemindInfo('请至少上传一节视频');
                        return false;
                    }

                    var validateInfo = validateVideoCourse();
                    if (validateInfo.text) {
                        showRemindInfo('请' + validateInfo.action + validateInfo.text);
                        return false;
                    }

                    //转码状态校验
                    var validateArr = validateEncodeInfo();
                    if (validateArr.length) {
                        var str = '';
                        str += validateArr.join('，');
                        str += '视频状态异常，请重新上传';
                        showRemindInfo(str);
                        return false;
                    }

                    if ($scope.verifyPassed && !$scope.baseInfo.modifyReasons) {
                        showRemindInfo('请填写修改原因');
                        return false;
                    }
                    doReleaseCourse();
                };

            }
        ]);
});