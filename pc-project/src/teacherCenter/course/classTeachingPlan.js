/**
 * @file 班课设置 - 教学计划
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var ClassTeachingPlanForm = require('./ClassTeachingPlanForm');
    var service = require('common/service');
    var jsonUtil = require('cobble/util/json');
    var store = require('common/store');
    var status = 'display';
    var form;
    var trigger;
    var body;
    var hasData;

    function display() {
        trigger.show();
        if (hasData) {
            body.show();
        }
        form.hide();
    }

    function edit() {
        trigger.hide();
        if (hasData) {
            body.hide();
        }

        form.show();
    }

    // js获取url传递的参数
    function GetRequest() {

        var url = location.search; // 获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    exports.init = function () {

        var container = $('#content .teaching-plan');

        var me = this;

        var needEdit = store.get('showPlan');

        if (needEdit == '1') {
            status = 'edit';
        }

        // 数量
        var count = container.find('.plan-item').length;

        // 存储机构老师列表信息
        store.set('isorg', container.data('isorg'));

        var formData = store.get('data');

        form = new ClassTeachingPlanForm({
            element: container.find('.form'),
            data: formData
        });

        hasData = container.find('.has-data').length > 0;
        trigger =  container.find('.form-trigger');
        body = container.find('.info-body');

        container
        .on('click', '.edit', function (e) {
            container.trigger('edit', { name: 'teachingPlan' });
        })

        .on('click', '.btn-cancel', function (e) {

            container.trigger('display', { name: 'teachingPlan' });

        })
        .on('save', function (e, data) {

            if (data.isSuccess) {

                if (data.errorCode === 991104) { // 一对一冲突

                    confirm({
                        content: '老师，该班课时间你已经确认约课，仍然要设置该班课吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {

                        service
                        .scheduleClassCourse({
                            op: 'upsert',
                            flag: 1,
                            schedule: data.schedule

                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('保存成功', function(){
                                    // 获取url值
                                    var Request = new Object();
                                    Request = GetRequest();
                                    if (Request.from == 'onemore') {
                                        location.href = '/teacher_center/classCourse?type=edit&number=' + Request.number;
                                    }
                                    else {
                                        location.reload();
                                    }
                                });
                            }
                        });
                    })

                }
                else if (data.errorCode == 991105) { // 班课冲突

                    confirm({
                        content: '老师，该班课时间你已经有班课正在招生，仍然要设置该班课吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {

                        service
                        .scheduleClassCourse({
                            op: 'upsert',
                            flag: 1,
                            schedule: data.schedule
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('保存成功', function(){
                                    // 获取url值
                                    var Request = new Object();
                                    Request = GetRequest();
                                    if (Request.from == 'onemore') {
                                        location.href = '/teacher_center/classCourse?type=edit&number=' + Request.number;
                                    }
                                    else {
                                        location.reload();
                                    }
                                });
                            }
                        });
                    })

                }
                else {

                    success('保存成功', function(){
                        // 获取url值
                        var Request = new Object();
                        Request = GetRequest();
                        if (Request.from == 'onemore') {
                            location.href = '/teacher_center/classCourse?type=edit&number=' + Request.number;
                        }
                        else {
                            location.reload();
                        }
                    });

                }

            }

        });

        // 获取url值
        var Request = new Object();
        Request = GetRequest();

    };

    exports.status = function (value) {
        if (value !== undefined) {
            status = value;
            if (status == 'display') {
                display();
            }
            else if (status == 'edit') {
                edit();
            }
        }
        else {
            return status;
        }
    };

    exports.save = function () {
        form.save();
    };

    exports.cancel = function () {
        form.cancel();
    };

    exports.edit = edit;
});


