/**
 * @file 课程设置
 * @author zhujialu, wangyujie
 */
define(function(require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var floatHelp = require('teacherCenter/component/floatHelp');

    var org_id = '';
    function _showDialog(content) {
        if (org_id == 0) {
            alert({
                title: '温馨提示',
                content: content,
                width: 300,
                skinClass: 'vip-dialog',
                buttons: [{
                    text: '确定',
                    type: 'primary',
                    handler: function() {
                        location.href = "/teacher_center/vip_center";
                        this.hide();
                    }
                }, {
                    text: '取消',
                    type: 'default',
                    handler: function() {
                        this.hide();
                    }
                }]
            });
        }
        else {
            alert({
                title: '温馨提示',
                content: content,
                width: 300,
                skinClass: 'vip-dialog',
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
    }

    /**
     * 初始化
     */

    exports.init = function() {

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        //控制优选1对1tab的显示
        service
        .overviewAudit()
        .then(function (response) {
            if (response.data.manager_one_on_one_course_permission) {
                $('.tab-nav-info').find('.one2one-best').show();
            }
        });

        var container = $('#content');
        var vipLevel = store.get('vip_level');
        container
        // 删除课程
        .on('click', '.btn-del', function(e) {

            var currtTr = $(e.currentTarget).closest('tr');
            var id = currtTr.data('id');

            confirm('确认删除该课程吗？', '温馨提示')
                .done(function() {

                    service
                        .deleteCourse({
                            id: id
                        })
                        .done(function(response) {
                            if (response.code === 0) {
                                currtTr.remove();
                                location.reload();
                            }
                        });

                });
        })
        .on('click', '.create-course', function(e) {
            var courseLength = container.find('tbody tr').length;
            if (org_id == 0) {
                if (vipLevel == 0 && courseLength >= 10) {
                    _showDialog('目前只能开设10门1对1课程，想要开设更多，赶快去升级会员吧。');
                }
                else if (vipLevel == 1 && courseLength >= 12) {
                    _showDialog('目前只能开设12门1对1课程，想要开设更多，赶快去升级会员吧。');
                }
                else if (vipLevel == 2 && courseLength >= 15) {
                    _showDialog('目前只能开设15门1对1课程，想要开设更多，赶快去升级会员吧。');
                }
                else if (vipLevel == 3 && courseLength >= 20) {
                    alert({
                        title: '温馨提示',
                        content: '抱歉老师，目前最多只能开设20门1对1课程哦。',
                        width: 300,
                        skinClass: 'vip-dialog',
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
                }
                else {
                    location.href = '/teacher_course/edit_form'
                }
            }
            else {
                if (vipLevel == 0 && courseLength >= 10) {
                    _showDialog('目前只能开设10门1对1课程，想要开设更多，请联系机构开通会员。');
                }
                else if (vipLevel == 1 && courseLength >= 12) {
                    _showDialog('目前只能开设12门1对1课程，想要开设更多，请联系机构开通会员。');
                }
                else if (vipLevel == 2 && courseLength >= 15) {
                    _showDialog('目前只能开设15门1对1课程，想要开设更多，请联系机构开通会员。');
                }
                else if (vipLevel == 3 && courseLength >= 20) {
                    _showDialog('抱歉老师，目前最多只能开设20门1对1课程哦。');
                }
                else {
                    location.href = '/teacher_course/edit_form'
                }
            }

        });
        floatHelp.init();
    };

});