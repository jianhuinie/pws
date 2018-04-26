/**
 * @file 线下班课列表页
 * @author niejianhui
 */
define(function(require, exports) {

    'use strict';

    var service = require("../common/service");
    var localStorage = require('cc/util/localStorage');

    var lessonWay = 4; //4 为线下班课
    //默认参数
    var params = {
        lesson_way: lessonWay,
        keyword: '',
        state: 'all',
        page: 1,
        order_by_column: 'update_time',
        order_by_pattern: 'desc'
    };

    //重置请求参数
    function resetParams() {
        params = {
            lesson_way: lessonWay,
            keyword: '',
            state: 'all',
            page: 1,
            order_by_column: 'update_time',
            order_by_pattern: 'desc'
        };
    }

    //调用AJAX接口获取课程列表数据 渲染前端页面
    function loadListData(params,ractive) {
        service
        .getCourseList(
            params
        )
        .then(function (response) {
            if (response.code === 0) {
                var pagerCount = Math.ceil(response.data.pager.total/10) ? Math.ceil(response.data.pager.total/10) : 1;
                ractive.set({
                    'courseList': response.data.courses,
                    'isLoaded': true,
                    'hasRoster': response.data.has_roster,
                    'shiziLogin': response.data.from_shizi_login,
                    'jigouLogin': response.data.from_jigou_login,
                    'isOrgTeacher': response.data.is_org_teacher,
                    'vipLevel': response.data.vip_level,
                    'pagerOptions.page': response.data.pager.current_page,
                    'pagerOptions.count': pagerCount
                });
            }
        }, function () {
            ractive.set('isLoaded', true);
        })
    }

    function toggleDirection(direction) {
        return direction ? 0 : 1;
    }

    function deleteCourse(number) {
        service.doCourseActions({
            number: number,
            action: 'deleteCourse'
        })
        .done(function (response) {
            if (response.code === 0) {
                tip({
                    type: 'success',
                    content: '删除课程'
                })
                .done(function () {
                    location.reload();
                })
            }
        });
    }

    function confirmDelete(content, width, number, callback) {
        confirm({
            content: content,
            title: '温馨提示',
            width: width
        })
        .done(function () {
            if (callback) {
                callback(number);
            }
        })
    }

    exports.init = function (data){
        //初始化课程状态下拉菜单
        var statusDataList = [
            {
                text: '全部状态',
                value: 'all'
            },
            {
                text: '审核中',
                value: 'verifying'
            },
            {
                text: '正在招生',
                value: 'enroll_started'
            },
            {
                text: '审核被拒',
                value: 'verify_failed'
            },
            {
                text: '上课中',
                value: 'teaching'
            },
            {
                text: '已完成',
                value: 'finished'
            }
        ];

        var cacheCourse = {};
        var cache = localStorage.get('editClassCourese' + userData.id);
        if (cache && cache != 'undefined') {
            cache = JSON.parse(cache);
            var len = cache.schedules.length;
            if (len) {
                cacheCourse.began_at = cache.schedules[0].began_at;
                cacheCourse.ended_at = cache.schedules[len - 1].ended_at;
            }
            if (cache.covers.length) {
                cacheCourse.cover_url = cache.covers[0].url;
            }
            if (cache.chaban) {
                cacheCourse.chaban_flag = cache.chaban.flag;
            }
            if (cache.retire) {
                cacheCourse.retire_flag = cache.retire.flag;
            }
            if (cache.display_name) {
                cacheCourse.display_name = cache.display_name;
            }
            if (cache.prices) {
                cacheCourse.price = cache.prices.now;
            }
            if (cache.student_amount) {
                cacheCourse.max_student = cache.student_amount.max;
            }
        }
        else {
            cacheCourse = null;
        }

        new Ractive({
            el: '#container',
            template: require('html!./classCourseList.html'),
            data:{
                sourceDir: siteData.source,
                courseNameInputOptions: {
                    name: 'courseName',
                    value: '',
                    className: 'course-name',
                    placeholder: '请输入班课名称或编号',
                    autofocus: false
                },
                courseStatusSelectOptions: {
                    name: 'courseStatus',
                    className: 'course-status',
                    value: 'all',
                    defaultText: '全部状态',
                    data: statusDataList
                },
                pagerOptions: {
                    page: 1,
                    count: 1,
                    size: ''
                },
                showCloseIcon: 1,
                courseList: '',
                priceArrowActive: 0,
                enrolledArrowActive: 0,
                timeArrowActive: 0,
                priceArrowDirection: 0, //0 向上 1 向下
                enrolledArrowDirection: 1,
                timeArrowDirection: 1,
                isSearchResult: 0,
                isLoaded: false,
                shiziLogin: false,
                jigouLogin: false,
                isOrgTeacher: false,
                vipLevel: 0,
                cacheCourse: cacheCourse,
                showOne2oneBest: 0,
                one2oneBestUrl: 'http://' + siteData.env + '-b.genshuixue.com/detail.html#/courseList/one2one'
            },
            components: {
                Input: require('../../common/component/Input'),
                Select: require('../../common/component/Select'),
                Pager: require('../../common/component/Pager')
            },
            clearAll: function () {
                this.set({
                    'courseStatusSelectOptions.value': 'all',
                    'courseNameInputOptions.value': '',
                    'showCloseIcon': 0
                });
            },
            clearInput: function () {
                this.set({
                    'courseNameInputOptions.value': '',
                    'courseNameInputOptions.autofocus': true,
                    'showCloseIcon': 0
                });
            },
            searchCourse: function () {
                resetParams();
                params.keyword = this.get('courseNameInputOptions.value');
                params.state = this.get('courseStatusSelectOptions.value');
                this.set({
                    'isSearchResult': 1,
                    'priceArrowActive': 0,
                    'enrolledArrowActive': 0,
                    'timeArrowActive': 0,
                    'priceArrowDirection': 0,
                    'enrolledArrowDirection': 1,
                    'timeArrowDirection': 1
                });
                // this.set('isLoaded', false);
                loadListData(params,this);
            },
            sortByPrice: function () {
                if (this.get('priceArrowActive') == 1) {
                    this.set('priceArrowDirection', toggleDirection(this.get('priceArrowDirection')));
                }
                else {
                    this.set('priceArrowActive', 1);
                }
                this.set('enrolledArrowActive', 0);
                this.set('timeArrowActive', 0);
                params.page = 1;
                var direction = this.get('priceArrowDirection');
                params.order_by_pattern = direction ? 'desc' : 'asc';
                params.order_by_column = 'price';
                // this.set('isLoaded', false);
                loadListData(params, this);
            },
            sortByEnrolled: function () {
                if (this.get('enrolledArrowActive') == 1) {
                    this.set('enrolledArrowDirection', toggleDirection(this.get('enrolledArrowDirection')));
                }
                else {
                    this.set('enrolledArrowActive', 1);
                }
                this.set('priceArrowActive', 0);
                this.set('timeArrowActive', 0);
                params.page = 1;
                var direction = this.get('enrolledArrowDirection');
                params.order_by_pattern = direction ? 'desc' : 'asc';
                params.order_by_column = 'total_pay_success';
                // this.set('isLoaded', false);
                loadListData(params, this);
            },
            sortByTime: function () {
                if (this.get('timeArrowActive') == 1) {
                    this.set('timeArrowDirection', toggleDirection(this.get('timeArrowDirection')));
                }
                else {
                    this.set('timeArrowActive', 1);
                }
                this.set('enrolledArrowActive', 0);
                this.set('priceArrowActive', 0);
                params.page = 1;
                var direction = this.get('timeArrowDirection');
                params.order_by_pattern = direction ? 'desc' : 'asc';
                params.order_by_column = 'update_time';
                // this.set('isLoaded', false);
                loadListData(params, this);
            },
            deleteCacheCourse: function () {
                alert({
                    title: '温馨提示',
                    content: '确认要删除草稿吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                localStorage.remove('editClassCourese' + userData.id);
                                this.hide();
                                location.reload();
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
            viewRoster: function (data, e) {
                var isOrgTeacher = this.get('isOrgTeacher');
                var vipLevel = this.get('vipLevel');
                var price = data.prices.now;
                var lessonWay = 4;
                if (lessonWay == 2) {
                    if(price == 0) {
                        if(vipLevel == 0) {
                            if(!isOrgTeacher) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦。',
                                    width: 382,
                                    skinClass: "vip_dialog",
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
                                                location.href = "/teacher_center/vip_detail?type=seeRoster";
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                                e.original.preventDefault();
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有会员才能查看，请联系机构开通会员',
                                    width: 382,
                                    skinClass: "vip_dialog",
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
                                e.original.preventDefault();
                            }
                        }
                        else if(vipLevel == 1) {
                            if(!isOrgTeacher) {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有高级会员才能查看，高级会员还可享有优先推荐获得更多生源哦。',
                                    width: 382,
                                    skinClass: "vip_dialog",
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
                                                location.href = "/teacher_center/vip_detail?type=seeRoster";
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                                e.original.preventDefault();
                            }
                            else {
                                alert({
                                    title: '温馨提示',
                                    content: '免费课花名册只有高级会员才能查看，请联系机构开通会员',
                                    width: 382,
                                    skinClass: "vip_dialog",
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
                                e.original.preventDefault();
                            }
                        }
                    }
                }

            },
            oncomplete: function () {
                var me = this;

                loadListData(params,me);

                me.observe('courseNameInputOptions.value',function () {
                    if (me.get('courseNameInputOptions.value') !== '') {
                        me.set('showCloseIcon',1);
                    }
                    else {
                        me.set('showCloseIcon',0);
                    }
                });

                //翻页请求数据
                me.observe('pagerOptions.page',function () {
                    if (params.page !== this.get('pagerOptions.page')) {
                        params.page = this.get('pagerOptions.page');
                        // me.set('isLoaded', false);
                        loadListData(params,me);
                    }
                });

                //编辑课程
                me.on('toEdit', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    location.href = '/tcenter/courses/class-courses/form?lesson_way=' + lessonWay + '&number=' + number;
                });

                //再开一班
                me.on('copyCourse', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    location.href = '/tcenter/courses/class-courses/form?lesson_way=' + lessonWay + '&number=' + number + '&action=copyCourse';
                });

                me.on('shareFiles', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    location.href = '/tcenter/courses/files/list?number=' + number + '&type=2';
                });

                //删除课程
                me.on('deleteCourse', function (event) {
                    var target = $(event.node);
                    var course = target.closest('.course-item');
                    var totalPay = course.data('total-pay');
                    var number = course.data('number');
                    confirmDelete(
                        '删除班课操作不能撤销，确认要删除吗？',
                        330,
                        number,
                        deleteCourse
                    );
                });

                //停止招生
                me.on('stopEnroll', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    confirm({
                        content: '老师，停止招生后，学生将无法继续报名该班课，仍然要停止招生吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {
                        service
                        .doCourseActions({
                            number: number,
                            action: 'stopEnroll'
                        })
                        .then(function (response) {
                            if (response.code === 0) {
                                tip({
                                    type: 'success',
                                    content: '停止招生'
                                })
                                .done(function () {
                                    location.reload();
                                })
                            }
                        });

                    })
                });

                //撤回审核
                me.on('revokeVerify', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    confirm({
                        content: '确定要撤回本次审核吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {
                        service
                        .doCourseActions({
                            number: number,
                            action: 'revokeVerify'
                        })
                        .then(function (response) {
                            if (response.code === 0) {
                                tip({
                                    type: 'success',
                                    content: '撤回审核'
                                })
                                .done(function () {
                                    location.reload();
                                })
                            }
                        });

                    })
                });

                //修改课程模版
                me.on('changeTemplate', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    location.href = '/tcenter/courses/class-courses/form?lesson_way=' + lessonWay + '&number=' + number + '#course-template-edit';
                });

                //关闭班课
                me.on('closeCourse', function (event) {
                    var number = $(event.node).closest('.course-item').data('number');
                    alert({
                        title: '关闭班课',
                        width: 335,
                        content: '关闭班课后，我们将取消之前所有学生支付过的订单，该操作不可撤销！',
                        buttons: [
                            {
                                text: '我知道了',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    service
                                    .doCourseActions({
                                        number: number,
                                        action: 'closeCourse'
                                    })
                                    .then(function (response) {
                                        if (response.code === 0) {
                                            tip({
                                                type: 'success',
                                                content: '关闭班课'
                                            })
                                            .done(function () {
                                                location.reload();
                                            })
                                        }
                                    })
                                }
                            },
                            {
                                text: '我再想想',
                                action: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                });

                //提交审核
                me.on('submitVerify', function (event) {
                    var target = $(event.node);
                    var course = target.closest('.course-item');
                    var totalPay = course.data('total-pay');
                    var number = course.data('number');
                    // 当前时间
                    var now = new Date();
                    var nowTimestamp = now.getTime();
                    // 课程开始时间
                    var startTime = new Date(course.data('start-time'));
                    var startTimestamp = startTime.getTime();
                    if (totalPay == 0 && nowTimestamp > startTime) {
                        alert('老师，现在已经过了你设置的开课时间，快去检查一下教学计划吧！');
                    }
                    else {
                        // 提交审核
                        service
                        .doCourseActions(
                                {
                                    number: number,
                                    action: 'submitVerify'
                                },
                                {
                                    errorHandler: {
                                        '991107': function (response) {
                                            alert({
                                                title: '温馨提示',
                                                content: '请先修改违规内容后再提交审核',
                                                buttons: [
                                                    {
                                                        text: '马上修改',
                                                        type: 'primary',
                                                        action: function () {
                                                            this.hide();
                                                            location.href = '/tcenter/courses/class-courses/form?lesson_way=' + lessonWay + '&number=' + number;
                                                        }
                                                    },
                                                    {
                                                        text: '返回',
                                                        action: function () {
                                                            this.hide();
                                                        }
                                                    }
                                                ]
                                            });
                                        },
                                        '230101': function (response) { // 审核顺序

                                            var content = '恭喜你，班课已提交审核<br />'
                                                        + '但是小秘书发现您的';
                                            if (response.data.cert == false) {
                                                content += '<span class="text-info">身份认证&nbsp;</span>';
                                            }

                                            if (response.data.profile == false) {
                                                content += '<span class="text-info">资料设置&nbsp;</span>';
                                            }
                                                content += '仍未完善<br />';
                                                content += '完善后班课才会自动开始审核';

                                            alert({
                                                content: content,
                                                title: '温馨提示',
                                                buttons: [
                                                    {
                                                        text: '我知道了',
                                                        type: 'primary',
                                                        action: function () {
                                                            this.hide();
                                                            location.reload();
                                                        }
                                                    }
                                                ]
                                            });

                                        }
                                    }
                                }
                        )
                        .done(function (response) {
                            if (response.code === 0) {
                                tip({
                                    type: 'success',
                                    content: '提交审核'
                                })
                                .done(function () {
                                    location.reload();
                                })
                            }
                        });
                    }
                });

                //继续招生
                me.on('startEnroll', function (event) {

                    var target = $(event.node);
                    var course = target.closest('.course-item');
                    // var totalPay = course.data('total-pay');
                    // var maxStudent = course.data('max-student');
                    var number = course.data('number');

                    confirm({
                        content: '老师，班课继续招生后，学生将可以继续报名该课程，确认要继续招生吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {

                        service
                        .doCourseActions({
                            number: number,
                            action: 'startEnroll'
                        })
                        .then(function (response) {
                            if (response.code === 0) {
                                tip({
                                    type: 'success',
                                    content: '继续招生'
                                })
                                .done(function () {
                                    location.reload();
                                })
                            }
                        });
                    });
                })

                if (siteData.env === 'www') {
                    me.set('one2oneBestUrl', 'http://b.genshuixue.com/detail.html#/courseList/one2one')
                }
                //优选1对1tab
                service
                .overviewAudit()
                .then(function (response) {
                    if (response.data.manager_one_on_one_course_permission) {
                         me.set('showOne2oneBest', 1);
                    }
                });
            }
        });
    }

});