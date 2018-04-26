/**
 * @file 班课设置
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var classSubject = require('./course/classSubject');
    var classPhoto = require('./course/classPhoto');
    var classInfo = require('./course/classInfo');
    var classTeachingPlan = require('./course/classTeachingPlan');

    var store = require('common/store');

    var moduleMap = {
        'subject': classSubject,
        'photo': classPhoto,
        'info': classInfo,
        'teachingPlan': classTeachingPlan
    }

    var curEditModule;

    /*
     * @param {string} module 用户当前点击的模块
     *
     * 返回true代表应该保存
     * false代表不用保存，可以继续执行
     */
    function shouldSave(msg, module) {
        if (curEditModule) { //如果当前有edit状态的module, 先提示保存
            confirm({
                title: '温馨提示',
                content: msg,
                buttons: [
                    {
                        text: '保存',
                        type: 'primary',
                        handler: function () {
                            this.hide(); //刷新页面
                            curEditModule.save();
                        }
                    },
                    {
                        text: '不保存',
                        handler: function () {
                            this.hide();
                            // 添加班课时，课程信息不可取消
                            if (curEditModule == classSubject && store.get('urlType')=='add') {
                                return true;
                            }
                            else {
                                curEditModule.cancel(); // 关闭当前模块
                                curEditModule = module;
                                module.status('edit');
                            }
                        }
                    }
                ]
            });
            return true;
        }
        else {
            return false;
        }
    }


    /**
     * 初始化
     */
    exports.init = function () {

        

        var container = $('#content');

        classSubject.init();
        classPhoto.init();
        classTeachingPlan.init();
        classInfo.init();

        if (classSubject.status() == 'edit') {
            curEditModule = classSubject;
            classSubject.edit();
        }
        else if (classTeachingPlan.status() == 'edit') {
            curEditModule = classTeachingPlan;
            classTeachingPlan.edit();
        }

        var action = container.find('.card-body > .action');

        action
        //提交审核
        .on('click', '.submit-audit', function (e) {

            if (shouldSave('刚刚填写的信息是否要保存后再提交审核？')) return;

            var teachingPlan = container.find('.teaching-plan');

            // 当前时间
            var d = new Date();
            var nowTimestamp = d.getTime() / 1000;
            // 课程开始时间

            var startTime = teachingPlan.data('begin-time') || 0;

            if (nowTimestamp < startTime) {
                // 提交审核
                confirm({
                    content: '班课审核通过后将会自动开始招生，是否确定提交审核？<div class="dialog-tip">请在开课前进入教室，否则会被记为迟到哦</div>',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {

                    service
                    .classCourseAudit({
                            number: store.get('data').number
                        },
                        {
                            errorHandler: {
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

                })

            }
            else {
                alert('老师，现在已经过了你设置的开课时间，快去检查一下教学计划吧！');
            }
        })
        //继续招生
        .on('click', '.goon', function (e) {

            confirm({
                content: '老师，班课继续招生后，学生将可以继续报名该课程，确认要继续招生吗？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .statusClassCourse({
                    number: store.get('data').number,
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
        })
        //暂停招生
        .on('click', '.stop', function (e) {

            confirm({
                content: '老师，停止招生后，学生将无法继续报名该班课，仍然要停止招生吗？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .statusClassCourse({
                    number: store.get('data').number,
                    op: 'stop'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('停止招生', function () {
                            location.reload();
                        });
                    }
                });

            });
        })
        //撤回审核
        .on('click', '.revoke-audit', function (e) {

            confirm({
                content: '确定要撤回本次审核吗？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .classCourseRevokeAudit({
                    number: store.get('data').number
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('撤回审核', function () {
                            location.reload();
                        });
                    }
                });

            });
        });


        //只能有一个module处于edit状态。在这里统一接收各个module触发的状态变更event。
        container
        .on('display', function (e, data) {

            var name = data.name;
            var module = moduleMap[name];

            module.status('display');
            curEditModule = null;
        });

        container
        .on('edit', function (e, data) {

            var name = data.name;
            var module = moduleMap[name];

            if (shouldSave('你有资料还没有保存，需要小秘书帮你保存吗？', module)) {
                return;
            }
            else {
                curEditModule = module;
                module.status('edit');
            }

        });

    };

});