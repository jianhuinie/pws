/**
 * @file 班课开通权限进度 对话框 [废弃]
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {Array} options.course
     */
    function ClassCourseProgressDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ClassCourseProgressDialog.prototype = {

        init: function () {

            var me = this;
            var progress = me.progress;

            var content = '<ul class="dialog-progress">';

            if (progress.area) {
                var content = content
                            +  '<li>'
                            +      '<div class="content text-gray">'
                            +          '设置常用地址'
                            +      '</div>'
                            +      '<div class="status text-success">'
                            +          '<i class="icon icon-check-circle"></i>已完成'
                            +      '</div>'
                            +  '</li>'
            }
            else if (progress.area == false ) {
                var content = content
                            +  '<li>'
                            +      '<div class="content">'
                            +          '<a class="text-info" href="/tcenter/addresses/list" target="_self">设置常用地址</a>'
                            +      '</div>'
                            +      '<div class="status text-error">'
                            +          '<i class="icon icon-info-circle"></i>待完善'
                            +      '</div>'
                            +  '</li>'
            }

            if (progress.bio) {
                var content = content
                            +  '<li>'
                            +      '<div class="content text-gray">'
                            +          '过往经历至少50字并通过审核'
                            +      '</div>'
                            +      '<div class="status text-success">'
                            +          '<i class="icon icon-check-circle"></i>已完成'
                            +      '</div>'
                            +  '</li>'
            }
            else if (progress.bio == false ) {
                var content = content
                            +  '<li>'
                            +      '<div class="content">'
                            +          '<a class="text-info" href="/teacher_center/profile#experience" target="_self">过往经历至少50字并通过审核</a>'
                            +      '</div>'
                            +      '<div class="status text-error">'
                            +          '<i class="icon icon-info-circle"></i>待完善'
                            +      '</div>'
                            +  '</li>'
            }

            if (progress['case']) {
                var content = content
                            +  '<li>'
                            +      '<div class="content text-gray">'
                            +          '相关案例至少50字并通过审核'
                            +      '</div>'
                            +      '<div class="status text-success">'
                            +          '<i class="icon icon-check-circle"></i>已完成'
                            +      '</div>'
                            +  '</li>'
            }
            else if (progress['case'] == false ) {
                var content = content
                            +  '<li>'
                            +      '<div class="content">'
                            +          '<a class="text-info" href="/teacher_center/profile#success" target="_self">相关案例至少50字并通过审核</a>'
                            +      '</div>'
                            +      '<div class="status text-error">'
                            +          '<i class="icon icon-info-circle"></i>待完善'
                            +      '</div>'
                            +  '</li>'
            }

            if (progress.photo) {
                var content = content
                            +  '<li>'
                            +       '<div class="content text-gray">'
                            +           '至少上传2张照片'
                            +       '</div>'
                            +       '<div class="status text-success">'
                            +           '<i class="icon icon-check-circle"></i>已完成'
                            +       '</div>'
                            +  '</li>'
            }
            else if (progress.photo == false ) {
                var content = content
                            +  '<li>'
                            +      '<div class="content">'
                            +          '<a class="text-info" href="/teacher_center/profile#photo" target="_self">至少上传2张照片</a>'
                            +      '</div>'
                            +      '<div class="status text-error">'
                            +          '<i class="icon icon-info-circle"></i>待完善'
                            +      '</div>'
                            +  '</li>'
            }

            if (progress.login_app) {
                var content = content
                            +  '<li>'
                            +      '<div class="content text-gray">'
                            +          '用自己的手机下载并登录过老师版APP'
                            +      '</div>'
                            +      '<div class="status text-success">'
                            +          '<i class="icon icon-check-circle"></i>已完成'
                            +      '</div>'
                            +  '</li>'
            }
            else if (progress.login_app == false ) {
                var content = content
                            +  '<li>'
                            +      '<div class="content">'
                            +          '<a class="text-info" href="/static/app" target="_self">用自己的手机下载并登录过老师版APP</a>'
                            +      '</div>'
                            +      '<div class="status text-error">'
                            +          '<i class="icon icon-info-circle"></i>待完善'
                            +      '</div>'
                            +  '</li>'
            }

            var content = content + '</ul>';

            var dialog = new Dialog({
                title: '完成以下的所有任务就可以开通权限哦~',
                skinClass: 'consult-dialog',
                content: content,
                width: 410
            });

            var element = dialog.element;

        }

    }

    return ClassCourseProgressDialog;

});