/**
 * @file 优选一对一
 * @author niejianhui
 */
define(function (require) {
    'use strict';
    require('./services');
    var Validator = require('cc-config/form/Validator');
    //文件大小单位 M
    var M = 1024 * 1024;
    //秒的转换
    var S = 1000;

    angular.module('Manage.one2oneEdit.controller', [
            'Manage.services',
            'Manage.one2oneEdit.services'
        ])
        .controller('One2oneEditCtrl', ['$rootScope', '$scope', 'one2oneEditService', 'uploaderService',
            'utilService', 'dialog', '$sce', '$stateParams', '$state',
            function ($rootScope, $scope, one2oneEditService, uploaderService,
                utilService, dialog, $sce, $stateParams, $state) {
                //获取常用地址
                function getDefaultAddress() {
                    one2oneEditService
                        .getDefaultAddress()
                        .then(function (response) {
                            $scope.addressDefault = response.data.address_default;
                        });
                }

                //格式化dropDown数据
                function initDataSource(objArray) {
                    var dataSource = [];
                    $.each(objArray, function(index, item){
                        dataSource.push({
                            text: item.name,
                            value: item.id
                        });
                    });
                    return dataSource;
                }

                //特殊处理'全部'
                function pushSpecialCag() {
                    $scope.categories.push({
                        name: '全部',
                        selected: true,
                        isSpecial: true,
                        type: 'CUSTOM',
                        price_teacher : '',
                        price_student : '',
                        price_online : '',
                    });
                    $scope.cagCount++;
                }

                //初始化三级科目下拉菜单和课程类型
                function initCategories(obj) {
                    $scope.cagCount = 0;
                    if (obj.children.length) {
                        $scope.level3SubjectList = obj.children;
                        $scope.level3Id = +obj.children[0].id;
                        initLevel3Subject();
                        $scope.showLevel3Dropdown = true;
                        $scope.categories = [];
                        pushSpecialCag();
                        $scope.subjectId = $scope.level3Id;
                        $scope.subjectLevel = 3;
                    }
                    else if (obj.categories.length){
                        $scope.categories = obj.categories;
                        //‘全部’的索引
                        var specialCagIndex;
                        $.each($scope.categories, function (index, item) {
                            item.selected = false;
                            item.type = 'SUBJECT';
                            item.price_teacher = '';
                            item.price_student = '';
                            item.price_online = '';
                            item.subject_id = +item.id;
                            if (item.name === '全部') {
                                specialCagIndex = index;
                            }
                        });
                        //摘除全部
                        if (specialCagIndex !== undefined) {
                            $scope.categories.splice(specialCagIndex, 1);
                        }
                        //如果3级科目只有一个全部
                        if (!$scope.categories.length) {
                            pushSpecialCag();
                        }
                        $scope.showLevel3Dropdown = false;
                        $scope.subjectId = $scope.level2Id;
                        $scope.subjectLevel = 2;
                    }
                    else {
                        $scope.categories = [];
                        pushSpecialCag();
                        $scope.showLevel3Dropdown = false;
                        $scope.subjectId = $scope.level2Id;
                        $scope.subjectLevel = 2;
                    }
                }

                //初始化一级科目下拉菜单
                function initLevel1Subject() {
                    $scope.level1SubjectOptions = {
                        defaultValue: $scope.level1Id,
                        onSelected: function(data) {
                            var level1Id = data.value;
                            $scope.level1Id = level1Id;
                            $.each($scope.level1SubjectList, function(index, item) {
                                if (+item.id === level1Id) {
                                    $scope.level2SubjectList = item.children;
                                    $scope.level2Id = +item.children[0].id;
                                }
                            });
                            initLevel2Subject();

                            $.each($scope.level2SubjectList, function(index, item) {
                                if (+item.id === $scope.level2Id) {
                                    initCategories(item);
                                }
                            });

                        }
                    };
                    $scope.level1SubjectOptions.dataSource = initDataSource($scope.level1SubjectList);
                }

                //初始化二级科目下拉菜单
                function initLevel2Subject() {
                    $scope.level2SubjectOptions = {
                        defaultValue: $scope.level2Id,
                        onSelected: function(data) {
                            var level2Id = data.value;
                            $scope.level2Id = level2Id;
                            $.each($scope.level2SubjectList, function(index, item) {
                                if (+item.id === level2Id) {
                                    initCategories(item);
                                }
                            });

                        }
                    };
                    $scope.level2SubjectOptions.dataSource = initDataSource($scope.level2SubjectList);
                }

                //初始化三级科目下拉菜单
                function initLevel3Subject() {
                    $scope.level3SubjectOptions = {
                        defaultValue: $scope.level3Id,
                        onSelected: function(data) {
                            var level3Id = data.value;
                            $scope.level3Id = level3Id;
                            $scope.subjectId = level3Id;
                        }
                    };
                    $scope.categories = [];
                    $scope.cagCount = 0;
                    $scope.level3SubjectOptions.dataSource = initDataSource($scope.level3SubjectList);
                }

                //获取教学科目并初始化
                function getSubjects() {
                    one2oneEditService
                        .getSubjects()
                        .then(function (response) {
                            $scope.level1SubjectList = response.data.query_one_on_one_course_subjects;
                            var level1Subjects = $scope.level1SubjectList[0];
                            $scope.level1Id = +level1Subjects.id;
                            $scope.level2SubjectList = level1Subjects.children;
                            var level2Subjects = $scope.level2SubjectList[0];
                            $scope.level2Id = +level2Subjects.id;

                            initLevel1Subject();
                            initLevel2Subject();
                            initCategories(level2Subjects);
                        });
                }

                //初始化 清空编辑态的案例
                function initEditingCase() {
                    $scope.editingCase = {
                        title: '',
                        timeStamp: new Date().getTime(),
                        content: ''
                    };
                }

                //初始化 清空编辑态的课程类型
                function initEditingCag() {
                    $scope.cagEditFlag = false;
                    $scope.editingCag = {
                        name: '',
                        type: 'CUSTOM',
                        selected: false,
                        price_teacher: '',
                        price_student: '',
                        price_online: ''
                    };
                }

                //初始化各条编辑态
                function initEditStatus() {
                    $.each($scope.successCases, function (index, item) {
                        item.editing = false;
                    });
                }

                //初始化成功案例信息
                function initSuccessCases() {
                    $.each($scope.successCases, function (index, item) {
                        var date = item.date;
                        item.timeStamp = new Date(date).getTime();
                        item.displayDate = utilService.formatDateString(date);
                    });
                }

                //初始化上课方式信息
                function initLessonWayMap(wayArray) {
                    $.each($scope.lessonWayMap, function (index, item) {
                        if (wayArray.indexOf(item.value) > -1) {
                            item.selected = true;
                            $scope.lessonWayCount++;
                        }
                    });
                }

                //找一级科目ID
                function getLevel1Id(obj) {
                    $.each(obj, function (index, item) {
                        if (+item.id === $scope.level2Id) {
                            $scope.level1Id = +item.parent_id;
                            return false;
                        }
                    });
                }

                //找二级科目ID
                function getLevel2Id(obj) {
                    $.each(obj, function (index, item) {
                        if (+item.id === $scope.level3Id) {
                            $scope.level2Id = +item.parent_id;
                            return false;
                        }
                    });
                }

                //找一级科目名
                function getLevel1SubjectName() {
                    $.each($scope.level1SubjectList, function (index, item) {
                        if (+item.id === $scope.level1Id) {
                            $scope.level1Subject = item.name;
                            $scope.level2SubjectList = item.children;
                            return false;
                        }
                    });
                }

                //找二级科目名
                function getLevel2SubjectName() {
                    $.each($scope.level2SubjectList, function (index, item) {
                        if (+item.id === $scope.level2Id) {
                            $scope.level2Subject = item.name;
                            if (item.children.length) {
                                $scope.level3SubjectList = item.children;
                                $scope.categories = $scope.selectedCags;
                            }
                            else if (item.categories.length) {
                                $scope.categories = item.categories;
                                var specialCagIndex;
                                $.each($scope.categories, function (index, item) {
                                    //初始化某些特殊字段
                                    item.type = 'SUBJECT';
                                    item.price_teacher = '';
                                    item.price_student = '';
                                    item.price_online = '';
                                    item.subject_id = +item.id;
                                    if (item.name === '全部') {
                                        specialCagIndex = index;
                                    }
                                    $.each($scope.selectedCags, function (index1, item1) {
                                        if (+item1.subject_id === +item.id) {
                                            item.selected = true;
                                            item.price_online = item1.price_online;
                                            item.price_teacher = item1.price_teacher;
                                            item.price_student = item1.price_student;
                                            // item.type = 'SUBJECT';
                                            // item.subject_id = +item.id;
                                        }
                                    });
                                });
                                //摘除'全部'
                                if (specialCagIndex !== undefined) {
                                    $scope.categories.splice(specialCagIndex, 1);
                                }
                                //3级科目只有一个全部
                                if (!$scope.categories.length) {
                                    $scope.categories = $scope.selectedCags;
                                }
                            }
                            else {
                                $scope.categories = $scope.selectedCags;
                            }
                            return false;
                        }
                    });
                }

                //找三级科目名
                function getLevel3SubjectName() {
                    $.each($scope.level3SubjectList, function (index, item) {
                        if (+item.id === $scope.level3Id) {
                            $scope.level3Subject = item.name;
                            return false;
                        }
                    });
                }
                //初始化课程类型价格
                function initCagPrices() {
                    $.each($scope.categories, function (index, item) {
                        item.selected = item.selected || false;
                        item.price_online = item.price_online ? +item.price_online : '';
                        item.price_teacher = item.price_teacher ? +item.price_teacher : '';
                        item.price_student = item.price_student ? +item.price_student : '';
                    });
                }

                //根据后端返的末级科目ID找科目名称
                function findSubjects() {
                    one2oneEditService
                        .getSubjects()
                        .then(function (response) {
                            var level1SubjectList = response.data.query_one_on_one_course_subjects;
                            $scope.level1SubjectList = response.data.query_one_on_one_course_subjects;
                            if ($scope.subjectLevel === 2) {
                                $scope.level2Id = $scope.subjectId;
                                $.each(level1SubjectList, function (index, item) {
                                    getLevel1Id(item.children);
                                });
                                getLevel1SubjectName();
                                getLevel2SubjectName();
                            }
                            else {
                                $scope.level3Id = $scope.subjectId;
                                $.each(level1SubjectList, function (index, item) {
                                    $.each(item.children, function (index1, item1) {
                                        getLevel2Id(item1.children);
                                    });
                                });
                                $.each(level1SubjectList, function (index, item) {
                                    getLevel1Id(item.children);
                                });
                                getLevel1SubjectName();
                                getLevel2SubjectName();
                                getLevel3SubjectName();
                            }
                            initCagPrices();

                        });
                }

                //初始化后端返的课程类型 默认选中
                function initSelectedCags() {
                    $.each($scope.selectedCags, function (index, item) {
                        item.selected = true;
                    });
                }

                function initView() {
                    $scope.lessonWayArrayMap = {
                        'TEACHER': '老师上门',
                        'STUDENT': '学生上门',
                        'ONLINE': '在线授课',
                    };
                    $scope.photoParam = '@1e_244w_138h_1c_0i_1o_90Q_1x';
                    $scope.courseNumber = +$stateParams.courseNumber;
                    $scope.showUpdateAddressBtn = false;
                    $scope.savingCourse = false;
                    $scope.courseListUrl = location.origin + '/detail.html#/courseList/one2one';
                    var env = utilService.getEnvName();
                    $scope.modifyAddressUrl = 'https://' + env + '.genshuixue.com/tcenter/addresses/list';
                    $scope.caseExampleIndex = 0;
                    //初始化左侧锚点导航
                    $scope.sideNavOptions = {
                        sideMenus: [
                            {
                                text: '基础信息',
                                boxClass: 'basic-info',
                            },
                            {
                                text: '课程相关介绍',
                                boxClass: 'about-course'
                            }
                        ]
                    };
                    //初始化帮助信息
                    var priveHelpContent = ''
                                        + '<ul>'
                                        +     '<li>1.为了赢得更多生源，建议在不影响实际收入的前提下，尽量设定有吸引力的价格。</li>'
                                        +     '<li>2.根据上课的成本和便利性，建议“老师上门”的价格最高，之后是“在线授课”和“学生上门”。</li>'
                                        +     '<li>3.为了增加上课机会，建议设置多种上课方式，让学生有更多选择。</li>'
                                        + '</ul>';
                    $scope.priceHelpOptions = {
                        position: 'bottom',
                        content: priveHelpContent,
                        width: 750
                    };
                    $scope.introPicHelpOptions = {
                        position: 'bottom',
                        content: '上传课程相关的图片介绍（最多4张），仅支持 .jpg、.png、.jpeg 格式照片，图片内容清晰可见，大小不超过10M',
                        width: 750
                    };
                    $scope.honorPicHelpOptions = {
                        position: 'bottom',
                        content: '上传科目相关荣誉奖励（最多4张），仅支持 .jpg、.png、.jpeg 格式照片，图片内容清晰可见，大小不超过10M',
                        width: 750
                    };
                    $scope.videoHelpOptions = {
                        position: 'bottom',
                        content: '上传一个课程相关的视频介绍，请确保视频的清晰度，不能包含推广信息（广告、联系方式、网站链接等）',
                        width: 750
                    };
                    $scope.caseHelpOptions = {
                        position: 'bottom',
                        content: '请选择科目相关成功案例（最多3个）',
                        width: 750
                    };
                    $scope.priceArrayMap = {
                        'TEACHER': 'price_teacher',
                        'STUDENT': 'price_student',
                        'ONLINE': 'price_online',
                    };
                    //自定义课程类型
                    initEditingCag();
                    //添加成功案例
                    $scope.caseEditFlag = false;
                    //日期选择参数
                    $scope.dateTimeOptions = {
                        isDefaultSelected: true,
                        selectedDate: new Date(),
                        selectableBegin: '2014-1-1',
                        selectableEnd: new Date(),
                        onDateSelect: function () {

                        }
                    };
                    //添加案例
                    initEditingCase();
                    $scope.cagCount = 0;
                    $scope.lessonWayCount = 0;
                    //初始化上课方式
                    $scope.lessonWayMap = [
                        {
                            text: '在线授课',
                            value: 'ONLINE',
                            selected: false
                        },
                        {
                            text: '学生上门',
                            value: 'STUDENT',
                            selected: false
                        },
                        {
                            text: '老师上门',
                            value: 'TEACHER',
                            selected: false
                        }
                    ];

                    if (!$scope.courseNumber) {
                        $scope.successCases = [];
                        $scope.introPics = [];
                        $scope.honorPics = [];
                        $scope.introVideos = [];
                        // getDefaultAddress();
                        getSubjects();
                    }
                    else {
                        one2oneEditService
                            .getCourse({
                                data: {
                                    number: $scope.courseNumber
                                },
                                method: 'GET'
                            })
                            .then(function (response) {
                                var data = response.data.query_one_on_one_course_from_shadow;
                                var subject = data.subject;
                                $scope.subjectId = +subject.id;
                                $scope.subjectLevel = +subject.level;
                                $scope.selectedCags = data.categories;
                                initSelectedCags();
                                $scope.cagCount = data.categories.length;
                                if (data.address) {
                                     $scope.addressDefault = data.address;
                                }
                                else {
                                    // getDefaultAddress();
                                }
                                findSubjects();

                                $scope.successCases = data.success_cases;
                                initSuccessCases();
                                initLessonWayMap(data.lesson_ways);
                                $scope.introPics = data.photos;
                                $scope.honorPics = data.honors;
                                $scope.introVideos = data.videos;
                                $scope.verifyStatus = data.verify_status;
                                if ($scope.verifyStatus === 'FAILED') {
                                    var content = '';
                                    var verifyReasons = data.verify_outer_reasons.children;
                                    $scope.failedItems = '';
                                    $.each(verifyReasons, function (index, item) {
                                        content += '<div>' + item.name + ':</div>'
                                                +  '<ul>';
                                        $scope.failedItems += item.name + ' ';
                                        $.each(item.reasons, function (index1, item1) {
                                            content += '<li>'
                                                    +  (index1 + 1)
                                                    +  '.'
                                                    +  item1;
                                        });
                                        content += '</ul>';
                                    });
                                    $scope.verifyReasonsOpt = {
                                        position: 'bottom',
                                        content: content,
                                        width: 500
                                    };
                                }
                            });
                    }

                }

                initView();

                $scope.updateAddress = function () {
                    one2oneEditService
                        .getDefaultAddress()
                        .then(function (response) {
                            if (+$scope.addressDefault.id === +response.data.address_default.id) {
                                utilService.showMessage('您没有更新常用地址');
                            }
                            else {
                                $scope.addressDefault = response.data.address_default;
                            }
                             $scope.showUpdateAddressBtn = false;
                        });
                };
                $scope.toChangeAddress = function () {
                    $scope.showUpdateAddressBtn = true;
                };

                //选择上课方式
                $scope.selectWay = function (way) {
                    if (way.selected) {
                        $scope.lessonWayCount--;
                    }
                    else {
                        $scope.lessonWayCount++;
                        if (way.value === 'STUDENT' && !$scope.addressDefault) {
                            getDefaultAddress();
                        }
                    }
                    way.selected = !way.selected;
                };

                //自定义课程类型
                $scope.editCategory = function () {
                    $scope.cagEditFlag = true;
                };

                //选择课程类型
                $scope.selectCategory = function (cag) {
                    if (cag.name === '全部') {
                        return false;
                    }
                    if (cag.selected) {
                        $scope.cagCount--;
                    }
                    else {
                        $scope.cagCount++;
                    }
                    cag.selected = cag.selected ? false : true;
                };

                //保存课程类型编辑
                $scope.saveEditCag = function () {
                    var cagValidateOptions = {
                        mainElement: $('.category-edit-form'),
                        validateOnBlur: false,
                        fields: {
                            category: {
                                rules: {
                                    required: true,
                                    maxlength: 10
                                },
                                errors: {
                                    required: '请填写课程类型',
                                    maxlength: '最大长度为10个字'
                                }
                            }
                        }
                    };
                    var validator = new Validator(cagValidateOptions);
                    if (validator.validate()) {
                        if ($scope.categories[0].name === '全部') {
                            $scope.categories.splice(0,1);
                            $scope.cagCount--;
                        }
                        $scope.categories.push({
                            name: $scope.editingCag.name,
                            type: 'CUSTOM',
                            selected: true,
                            price_teacher: '',
                            price_student: '' ,
                            price_online: ''
                        });
                        $scope.cagCount++;
                        initEditingCag();
                    }
                };

                //取消课程类型编辑
                $scope.cancelEditCag = function () {
                    initEditingCag();
                };

                //删除一项课程类型
                $scope.deleteCategory = function (index) {
                    if ($scope.categories[index].selected) {
                        $scope.cagCount--;
                    }
                    $scope.categories.splice(index, 1);
                    if (!$scope.categories.length) {
                        pushSpecialCag();
                    }
                };

                //封装抽取的提示方法
                function doShowMessage(options) {
                    utilService.showMessage({
                        content: '请选择上传来源',
                        cancelBtnText: options.cancelBtnText || '本地上传',
                        skinClass: 'choose-source',
                        okBtnText: options.okBtnText,
                        hideCancel: false,
                        okHandler: options.okHandler,
                        cancelHandler: options.cancelHandler
                    });
                }

                //选择介绍照片
                function doSelectIntroPics() {
                    dialog.open({
                        title: '选择图片介绍',
                        controller: require('module/main/one2oneEdit/selectPicsDialog/controller'),
                        width: 835,
                        resolve: {
                            coursePicsParams: function () {
                                return $scope.introPics;
                            }
                        },
                        skinClass: 'select-pics-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectPicsDialog/tpl.html'
                    });
                }

                //选择荣誉照片
                function doSelectHonorPics() {
                    dialog.open({
                        title: '选择图片介绍',
                        controller: require('module/main/one2oneEdit/selectPicsDialog/controller'),
                        width: 835,
                        resolve: {
                            coursePicsParams: function () {
                                return $scope.honorPics;
                            }
                        },
                        skinClass: 'select-pics-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectPicsDialog/tpl.html'
                    });
                }

                //选择我的视频
                function doSelectVideo() {
                    dialog.open({
                        title: '选择视频介绍',
                        controller: require('module/main/one2oneEdit/selectVideoDialog/controller'),
                        width: 835,
                        resolve: {
                            courseVideoParams: function () {
                                return $scope.introVideos;
                            }
                        },
                        skinClass: 'select-video-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectVideoDialog/tpl.html'
                    });
                }

                //选择成功案例
                function doSelectCases() {
                    dialog.open({
                        title: '选择科目相关的成功案例',
                        controller: require('module/main/one2oneEdit/selectCasesDialog/controller'),
                        width: 835,
                        resolve: {
                            courseCasesParams: function () {
                                return $scope.successCases;
                            }
                        },
                        skinClass: 'select-cases-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectCasesDialog/tpl.html'
                    });
                }

                //上传介绍照片
                function doUploadIntroPics() {
                    var introPicUploaderOpt = {
                        type: 'pic',
                        data: {
                            watermark: 1
                        }
                    };
                    $scope.introPicUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(introPicUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.introPics.push({
                            storage_id: data.id,
                            title: '',
                            image_url: data.url
                        });
                        $scope.introPicUploading = false;

                    }, function (res) {
                        utilService.showMessage(res.message || res.msg);
                        $scope.introPicUploading = false;
                    });
                    introPicUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.introPicUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    introPicUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.introPicUploading = true;
                    });
                }

                //上传荣誉照片
                function doUploadHonorPics() {
                    var honorPicUploaderOpt = {
                        type: 'pic',
                        data: {
                            watermark: 1
                        }
                    };
                    $scope.honorPicUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(honorPicUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.honorPics.push({
                            storage_id: data.id,
                            title: '',
                            image_url: data.url
                        });
                        $scope.honorPicUploading = false;

                    }, function (res) {
                        utilService.showMessage(res.message || res.msg);
                        $scope.honorPicUploading = false;
                    });
                    honorPicUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.honorPicUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    honorPicUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.honorPicUploading = true;
                    });
                }

                //上传视频
                function doUploadVideo() {
                    var videoUploaderOpt = {
                        type: 'commonVideo'
                    };
                    $scope.videoUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(videoUploaderOpt)
                    .then(function (res) {
                        var response = JSON.parse(res.responseText);
                        var videoParams = videoUploaderOpt.uploader.videoParams;
                        $scope.introVideos.push({
                            media_id: videoParams.id,
                            title: '',
                            cover_url: videoParams.cover
                        });
                        $scope.videoUploading = false;
                    },
                    function (data) {
                        if (data && data.errorType === 'errorBeforeUpload') {
                            // 上传前检测出错误
                        }
                        else {
                            utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '视频上传失败，请重新上传',
                                okBtnText: '确定'
                            });
                        }

                        $scope.videoUploading = false;
                    });
                    videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.videoUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    videoUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.videoUploading = true;
                    });
                }

                //添加新案例
                function doAddNewCase() {
                    initEditStatus();
                    initEditingCase();
                    $scope.caseEditFlag = true;
                    $scope.successCases.push({
                        title: '',
                        date: '',
                        displayDate: '',
                        timeStamp: '',
                        content: '',
                        editing: true,
                        isNew: true
                    });
                }

                //将上课方式转换为value数组
                function convertLessonways() {
                    $scope.selectedLessonways = [];
                    $.each($scope.lessonWayMap, function (index, item) {
                        if (item.selected) {
                            $scope.selectedLessonways.push(item.value);
                        }
                    });
                }

                //获取传给后端的科目信息
                function convertSubject() {
                    return {
                        id: +$scope.subjectId,
                        level: +$scope.subjectLevel
                    };
                }
                //获取传给后端的课程类型信息
                function converCategories() {
                    $scope.selectedCags = [];
                    $.each($scope.categories, function (index, item) {
                        if (item.selected) {
                            var tempItem = {
                                name: item.name,
                                type: item.type
                            };
                            if (item.type === 'SUBJECT' && item.subject_id) {
                                tempItem.subject_id = +item.subject_id;
                            }
                            else if (item.type === 'CUSTOM' && item.id){
                                tempItem.id = +item.id;
                            }
                            // if (item.level) {
                            //     tempItem.level = item.level;
                            // }
                            $.each($scope.selectedLessonways, function (index1, item1) {
                                tempItem[$scope.priceArrayMap[item1]]
                                = item[$scope.priceArrayMap[item1]];
                            });
                            $scope.selectedCags.push(tempItem);
                        }
                    });
                }
                //检查课程价格
                function validateCagPrice() {
                    var validateFlag = true;
                    $.each($scope.selectedCags, function (idnex, item) {
                        $.each($scope.selectedLessonways, function (index1, item1) {
                            var price = item[$scope.priceArrayMap[item1]];
                            if (!price && price !== 0) {
                                $scope.cagErrorInfo = {
                                    category: item.name,
                                    lessonway: $scope.lessonWayArrayMap[item1]
                                };
                                if (price === undefined) {
                                    $scope.cagErrorInfo.errMsg = '格式有误';
                                }
                                else {
                                    $scope.cagErrorInfo.errMsg = '未填写';
                                }
                                validateFlag = false;
                                return false;
                            }
                        });
                    });
                    return validateFlag;
                }
                //检查介绍照片描述
                function validateIntroPicTitle() {
                    var validateFlag = true;
                    $.each($scope.introPics, function (index, item) {
                        if (!item.title) {
                            validateFlag = false;
                            $scope.introErrorIndex = index;
                            return false;
                        }
                    });
                    return validateFlag;
                }
                //检查荣誉照片描述
                function validateHonorPicTitle() {
                    var validateFlag = true;
                    $.each($scope.honorPics, function (index, item) {
                        if (!item.title) {
                            validateFlag = false;
                            $scope.honorErrorIndex = index;
                            return false;
                        }
                    });
                    return validateFlag;
                }

                //获取传给后端的地址信息
                function convertAddress() {
                    var obj = {
                        id: +$scope.addressDefault.id
                    };
                    return obj;
                }
                //获取传给后端的介绍照片信息
                function convertIntroPics() {
                    var arr = [];
                    if ($scope.introPics.length) {
                        $.each($scope.introPics, function (index, item) {
                            var tempItem = {
                                storage_id: +item.storage_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的荣誉照片信息
                function convertHonorPics() {
                    var arr = [];
                    if ($scope.honorPics.length) {
                        $.each($scope.honorPics, function (index, item) {
                            var tempItem = {
                                storage_id: +item.storage_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的介绍视频信息
                function convertIntroVideos() {
                    var arr = [];
                    if ($scope.introVideos.length) {
                        $.each($scope.introVideos, function (index, item) {
                            var tempItem = {
                                media_id: +item.media_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的成功案例信息
                function convertSuccessCases() {
                    var arr = [];
                    $.each($scope.successCases, function (index, item) {
                        var tempItem = {
                            title: item.title,
                            date: item.date,
                            content: item.content
                        };
                        if (item.id) {
                            tempItem.id = item.id;
                        }
                        arr.push(tempItem);
                    });
                    return arr;
                }
                //上传介绍图片
                $scope.uploadIntroPic = function () {
                    if ($scope.introPicUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectIntroPics,
                        cancelHandler: doUploadIntroPics,
                        okBtnText: '我的照片'
                    });
                };

                //删除介绍照片
                $scope.deleteIntroPic = function (index) {
                    $scope.introPics.splice(index, 1);
                };

                //上传荣誉图片
                $scope.uploadHonorPic = function () {
                    if ($scope.honorPicUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectHonorPics,
                        cancelHandler: doUploadHonorPics,
                        okBtnText: '我的照片'
                    });
                };

                //删除荣誉照片
                $scope.deleteHonorPic = function (index) {
                    $scope.honorPics.splice(index, 1);
                };

                //上传视频
                $scope.uploadVideo = function () {
                    if ($scope.videoUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectVideo,
                        cancelHandler: doUploadVideo,
                        okBtnText: '我的视频'
                    });
                };

                //删除介绍视频
                $scope.deleteIntroVideo = function (index) {
                    $scope.introVideos.splice(index, 1);
                };

                //保存案例编辑
                $scope.saveCase = function (caseItem) {
                    var caseValidateOptions = {
                        mainElement: $('.case-edit-form'),
                        validateOnBlur: false,
                        fields: {
                            caseTitle: {
                                rules: {
                                    required: true,
                                    maxlength: 30
                                },
                                errors: {
                                    required: '请填写案例标题',
                                    maxlength: '最大长度为30个字'
                                }
                            },
                            caseDate: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请选择时间'
                                }
                            },
                            caseContent: {
                                rules: {
                                    required: true,
                                    maxlength: 300,
                                    minlength: 50
                                },
                                errors: {
                                    required: '请填写背景介绍',
                                    maxlength: '最大长度为300个字',
                                    minlength: '最小长度为50个字'
                                }
                            }
                        }
                    };
                    var validator = new Validator(caseValidateOptions);
                    if (validator.validate()) {
                        var editingCase = $scope.editingCase;
                        var timeStamp = editingCase.timeStamp;
                        caseItem.title = editingCase.title;
                        caseItem.timeStamp = timeStamp;
                        caseItem.date = utilService.formatDateString(timeStamp, '-');
                        caseItem.displayDate = utilService.formatDateString(timeStamp);
                        caseItem.content = editingCase.content;
                        caseItem.editing = false;
                        caseItem.isNew = false;
                        initEditingCase();
                        $scope.caseEditFlag = false;
                        $scope.caseExampleIndex = 0;
                    }
                };

                //取消案例编辑
                $scope.cancelEditCase = function (caseItem, index) {
                    caseItem.editing = false;
                    if (caseItem.isNew) {
                        $scope.successCases.splice(index, 1);
                    }
                    initEditingCase();
                    $scope.caseEditFlag = false;
                    $scope.caseExampleIndex = 0;
                };

                //重新编辑案例
                $scope.editCase = function (caseItem) {
                    $scope.caseEditFlag = true;
                    $.each($scope.successCases, function (index, item) {
                        if (item.isNew) {
                            $scope.successCases.splice(index, 1);
                        }
                    });
                    initEditStatus();
                    caseItem.editing = true;
                    $scope.editingCase = {
                        title: caseItem.title,
                        timeStamp: caseItem.timeStamp,
                        content: caseItem.content
                    };
                };

                //删除案例
                $scope.deleteCase = function (index) {
                    $scope.successCases.splice(index, 1);
                };

                //添加成功案例
                $scope.addSuccessCases = function () {
                    doShowMessage({
                        okHandler: doSelectCases,
                        cancelHandler: doAddNewCase,
                        okBtnText: '我的成功案例',
                        cancelBtnText: '本地添加'
                    });
                };

                //更换示例案例
                $scope.switchCaseExample = function () {
                    $scope.caseExampleIndex = ($scope.caseExampleIndex + 1) % 3;
                };

                //发布课程
                function doReleaseCourse() {
                    var saveParams = {
                        subject: convertSubject(),
                        lesson_ways: $scope.selectedLessonways,
                        categories: $scope.selectedCags,
                        photos: convertIntroPics(),
                        honors: convertHonorPics(),
                        videos: convertIntroVideos(),
                        success_cases: convertSuccessCases()
                    };
                    //选择了学生上门才有常用授课地址
                    if ($scope.addressDefault) {
                        saveParams.address = convertAddress();
                    }
                    if ($scope.courseNumber) {
                        saveParams.number = +$scope.courseNumber;
                    }

                    $scope.savingCourse = true;
                    one2oneEditService
                        .saveCourse(saveParams)
                        .then(function (response) {
                            var courseNumber = response.data.mutation_save_one_on_one_course.number;
                            $state.go('Manage.releaseSuccess', {
                                courseNumber: courseNumber
                            });
                            $(window).unbind('scroll.sideNav');
                        }, function () {
                             $scope.savingCourse = false;
                        });
                }
                //校验用户填写的信息是否符合要求
                function validateSaveData() {
                    if (!$scope.cagCount) {
                        utilService.showMessage('请选择或自定义课程类型');
                        return ;
                    }
                    if (!$scope.lessonWayCount) {
                        utilService.showMessage('请选择授课方式');
                        return ;
                    }

                    convertLessonways();
                    converCategories();
                    if (!validateCagPrice()) {
                        var cagErrorInfo = $scope.cagErrorInfo;
                        utilService.showMessage(cagErrorInfo.category + cagErrorInfo.lessonway + '的价格' + cagErrorInfo.errMsg);
                        return false;
                    }

                    // if (!$scope.introPics.length) {
                    //     utilService.showMessage('请上传介绍照片');
                    //     return false;
                    // }
                    // if ($scope.introPics.length < 4) {
                    //     utilService.showMessage('请上传4张介绍照片');
                    //     return false;
                    // }
                    if ($scope.introPics.length && !validateIntroPicTitle()) {
                        utilService.showMessage('第' +  ($scope.introErrorIndex + 1) + '张介绍照片的描述未填写');
                        return false;
                    }
                    // if (!$scope.honorPics.length) {
                    //     utilService.showMessage('请上传荣誉照片');
                    //     return false;
                    // }
                    if ($scope.honorPics.length && !validateHonorPicTitle()) {
                        utilService.showMessage('第' +  ($scope.honorErrorIndex + 1) + '张荣誉照片的描述未填写');
                        return false;
                    }
                    // if (!$scope.introVideos.length) {
                    //     utilService.showMessage('请上传介绍视频');
                    //     return false;
                    // }
                    if ($scope.introVideos.length && !$scope.introVideos[0].title) {
                        utilService.showMessage('请填写介绍视频的描述');
                        return false;
                    }
                    if (!$scope.successCases.length) {
                        utilService.showMessage('请填写成功案例');
                        return false;
                    }
                    doReleaseCourse();
                }
                //发布课程时校验有无正在编辑态的内容
                $scope.releaseCourse = function() {
                    if ($scope.cagEditFlag) {
                        utilService.showMessage('您正在编辑课程类型，请完成编辑后再提交');
                        return false;
                    }
                    if ($scope.introPicUploading) {
                        utilService.showMessage('您正在上传介绍照片，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.honorPicUploading) {
                        utilService.showMessage('您正在上传荣誉照片，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.videoUploading) {
                        utilService.showMessage('您正在上传介绍视频，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.caseEditFlag) {
                        utilService.showMessage('您正在编辑优秀教学案例，请完成编辑后再提交');
                        return false;
                    }
                    validateSaveData();
                };
            }
        ]);
});