/**
 * @file 班课列表 组件
 * @author wangyujie, liucong
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var org_id = '';

    exports.init = function (container) {

        var element = $('#class-course-list');

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        function deleteCourse(number, course) {
            service.delClassCourse({
                number: number
            })
            .done(function (response) {
                if (response.code === 0) {
                    success('成功删除', function () {
                        container.trigger('reload');
                    });
                }
            });
        }

        function confirmDelete(content, width, number, course, callback) {
            confirm({
                content: content,
                title: '温馨提示',
                width: width
            })
            .done(function () {
                if (callback) {
                    callback(number, course);
                }
            })
        }

        element
        .on('click', '[data-action="edit"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');
            var displayStatusSearch = course.data('display-status-search');
            var verifyStatus = course.data('verify-status');
            var number = course.data('number');
            var totalPay = course.data('total-pay');

            if (displayStatusSearch == 8 && verifyStatus != 2 ) { // 审核中状态且未被拒绝时

                confirm({
                    content: '你首先需要撤回审核才能编辑班课信息，是否要撤回审核？',
                    title: '温馨提示',
                    width: 335,
                    buttons: [
                        {
                            text: '撤回审核',
                            type: 'primary',
                            handler: function () {

                                // 先隐藏了对话框
                                this.hide();

                                // 撤回审核
                                service
                                .classCourseRevokeAudit({
                                    number: number
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        success('撤回审核', function () {
                                            // 撤回审核之后，直接进入编辑页面
                                            location.href = '/class_course/upsert_form?type=edit&number=' + number;
                                        });
                                    }
                                });

                            }
                        },
                        {
                            text: '返回',
                            handler: function () {
                                this.hide();
                            }
                        }

                    ]
                });
            }
            else {
                // 直接进入编辑页
                location.href = '/class_course/upsert_form?type=edit&number=' + number;
            }
        })

        .on('click', '[data-action="delete"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');
            var totalPay = course.data('total-pay');
            var courseNum = course.data('number');
            var statusSearch = course.data('display-status-search');

            switch (statusSearch) {
                case 1: // 待编辑完整
                case 2: // 待提交审核
                case 9: // 审核被拒
                    confirmDelete(
                        '删除班课操作不能撤销，确认要删除吗？',
                        330,
                        courseNum,
                        course,
                        deleteCourse
                    );
                    break;
                case 3: // 正在招生
                case 4: // 暂停招生
                    if (totalPay > 0) {
                        alert({
                            title: '温馨提示',
                            content: '当前班课已有学生报名，如需删除请联系学生取消订单',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    } else {
                        service.isSingleCourse({}).done(function (response) {
                            if (response.code === 0) {
                                var content = '删除班课不能撤销，学生将无法在您的主页找到该课程<br />确认要删除吗？';
                                if (response.data) {
                                    content = '由于该班课是你的唯一生效课程，删除后你将不能被搜索到<br />确认要删除吗？';
                                }
                                confirmDelete(
                                    content,
                                    408,
                                    courseNum,
                                    course,
                                    deleteCourse
                                );
                            }
                        });
                    }
                    break;
                case 5: // 已满班
                case 6: // 上课中
                    if (totalPay > 0) {
                        alert({
                            title: '温馨提示',
                            content: '当前班课已有学生报名，如需删除请联系学生取消订单',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    } else {
                        service.isSingleCourse({}).done(function (response) {
                            if (response.code === 0) {
                                var content = '删除班课不能撤销，学生将无法在您的主页找到该课程<br />确认要删除吗？';
                                if (response.data) {
                                    content = '由于该班课是你的唯一生效课程，删除后你将不能被搜索到<br />确认要删除吗？';
                                }
                                confirmDelete(
                                    content,
                                    408,
                                    courseNum,
                                    course,
                                    deleteCourse
                                );
                            }
                        });
                    }
                    break;
                case 7: // 已完成
                case 11: // 无人报名结束
                    service.isSingleCourse({}).done(function (response) {
                        if (response.code === 0) {
                            var content = '删除班课不能撤销，学生将无法在您的主页找到该课程<br />确认要删除吗？';
                            if (response.data) {
                                content = '由于该班课是你的唯一生效课程，删除后你将不能被搜索到<br />确认要删除吗？';
                            }
                            confirmDelete(
                                content,
                                408,
                                courseNum,
                                course,
                                deleteCourse
                            );
                        }
                    });
                    break;
                case 8: // 审核中
                    alert({
                        title: '温馨提示',
                        content: '班课正在审核中，暂时无法删除',
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                    break;
                case 10: // 手动关班
                    service.isSingleCourse({}).done(function (response) {
                        if (response.code === 0) {
                            var content = '删除班课不能撤销，确认要删除吗？';
                            if (response.data) {
                                content = '由于该班课是你的唯一生效课程，删除后你将不能被搜索到<br />确认要删除吗？';
                            }
                            confirmDelete(
                                content,
                                408,
                                courseNum,
                                course,
                                deleteCourse
                            );
                        }
                    });
                    break;

            }

        })

        .on('click', '[data-action="check"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');
            var totalPay = course.data('total-pay');
            // 当前时间
            var d = new Date();
            var nowTimestamp = d.getTime() / 1000;
            // 课程开始时间
            var startTime = course.data('start-time');
            if (totalPay == 0 && nowTimestamp > startTime) {
                alert('老师，现在已经过了你设置的开课时间，快去检查一下教学计划吧！');
            } else {
                // 提交审核
                service
                .classCourseAudit(
                        {
                            number: course.data('number')
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
                                                handler: function () {
                                                    this.hide();
                                                    location.href = "/class_course/upsert_form?type=edit&number=" + course.data('number');
                                                }
                                            },
                                            {
                                                text: '返回',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            }
                                        ]
                                    })
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
                                        content += '仍未完善<br />'
                                        content += '完善后班课才会自动开始审核';

                                    alert({
                                        content: content,
                                        title: '温馨提示',
                                        buttons: [
                                            {
                                                text: '我知道了',
                                                type: 'primary',
                                                handler: function () {
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
                        success('提交审核', function () {
                            location.reload();
                        });
                    }
                });
            }
        })

        .on('click', '[data-action="revoke"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');

            // 撤回审核
            confirm({
                content: '确定要撤回本次审核吗？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .classCourseRevokeAudit({
                    number: course.data('number')
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('撤回审核', function () {
                            location.reload();
                        });
                    }
                });

            })

        })

        .on('click', '[data-action="stop"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');

            confirm({
                content: '老师，停止招生后，学生将无法继续报名该班课，仍然要停止招生吗？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .statusClassCourse({
                    number: course.data('number'),
                    op: 'stop'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('停止招生', function () {
                            location.reload();
                        });
                    }
                });

            })

        })

        .on('click', '[data-action="continue"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');
            var totalPay = course.data('total-pay');
            var maxStudent = course.data('max-student');

            if (totalPay >= maxStudent) { //学生已满，继续招生

                // 调用修改人数对话框
                new CourseMaxStudentDialog({
                    number: course.data('number'),
                    nowStudent: totalPay
                });

            }
            else { // 继续招生

                confirm({
                    content: '老师，班课继续招生后，学生将可以继续报名该课程，确认要继续招生吗？',
                    title: '温馨提示',
                    width: 335
                })
                .done(function () {

                    service
                    .statusClassCourse({
                        number: course.data('number'),
                        op: 'goon'
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('继续招生', function () {
                                location.reload();
                            });
                        }
                    });

                });

            }

        })

        .on('click', '[data-action="again"] span', function (e) {

            var target = $(e.currentTarget);
            var course = target.closest('.course-item');

            service
            .copyClassCourse({
                number: course.data('number')
            })
            .done(function (response) {
                if (response.code === 0) {
                    // 跳到新的班课编辑页
                    location.href = "/class_course/upsert_form?type=edit&number=" + response.data.number;

                }
            });

        })

        .on('click', '.goto-roster', function (e) {
            var target = $(e.currentTarget);
            var price = target.data('price');
            var way = target.data('way');
            if (way == 2) {
                if(price == 0) {
                    if(store.get('vip_level') == 0) {
                        if( org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦。',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=seeRoster";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
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
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        return false;
                    }
                    else if(store.get('vip_level') == 1) {
                        if( org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有高级会员才能查看，高级会员还可享有优先推荐获得更多生源哦。',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=seeRoster";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
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
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        return false;
                    }
                }
            }

        });

    };

});
