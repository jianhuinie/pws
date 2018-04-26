/**
 * @file 个人信息-背景资料
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var BackgroundForm = require('./BackgroundForm');
    var store = require('common/store');
    var container = $('#content .background');
    var triggerElement = container.find('.form-trigger');
    var formElement = container.find('.form');
    var form;
    var status = 'display';

    function display() {
        triggerElement.show();
        formElement.hide();
    }

    function edit() {
        triggerElement.hide();
        form.refresh();
        formElement.show();
    }

    exports.init = function () {

        var me = this;

        form = new BackgroundForm({
            element: formElement,
            data: triggerElement.data('background')
        });

        container

        .on('click', '.edit', function () {
            container.trigger('edit', { name: 'background' });
        })

        .on('click', '.btn-cancel', function () {
            container.trigger('display', { name: 'background' });
        })

        .on('save', function (e, data) {

            if (data.isSuccess) {
                success('保存成功', function(){
                    location.reload();
                });
                /*
                success('保存成功');

                if (data.isNew) {
                    var element = $(container.find('script').html());
                    triggerElement.replaceWith(element);
                    triggerElement = element;
                }

                triggerElement.find('.school-age strong').html(
                    data.data.school_age > 0 ? (data.data.school_age + ' 年') : '30 年以上'
                );
                triggerElement.find('.institution').html(data.data.institution);
                triggerElement.find('.tags').html(data.data.tags);

                triggerElement.show();
                formElement.hide();
                */
            }

        })

        .on('click', '.background-audit', function (e) { // 查看拒绝原因
            var audit = store.get('audits');
            var array = [];

            function joinObj(obj) {
                var arr = [];
                for( var p in obj) {
                    arr.push(obj[p]);
                }
                return arr.join(';');
            }
            if (audit) {
                if (audit.school_age && audit.school_age.verify_status == 2) {
                    array.push('教龄：<span style="color:#f95710;">'+joinObj(audit.school_age.reasons)+'</span><br/>');
                }
                if (audit.institution && audit.institution.verify_status == 2) {
                    array.push('单位/机构/学校：<span style="color:#f95710;">'+joinObj(audit.institution.reasons)+'</span><br/>');
                }
                if (audit.skills && audit.skills.verify_status == 2) {
                    array.push('个人标签：<span style="color:#f95710;">'+joinObj(audit.skills.reasons)+'</span><br/>');
                }
                if (audit.subject_id && audit.subject_id.verify_status == 2) {
                    array.push('教学科目：<span style="color:#f95710;">'+joinObj(audit.subject_id.reasons)+'</span><br/>');
                }
                if (array.length > 0) {
                    array.unshift('<div style="text-align:left;margin:0 20px 10px;">');
                    array.push('</div>');
                    array.unshift('<h3 style="font-size:16px;margin-bottom:10px;text-align:left;margin-left:20px;">您的背景资料审核被拒原因为：</h3>');
                    alert({
                        title: '温馨提示',
                        content: array.join(''),
                        width: 400,
                        buttons: [
                            {
                                text: '去修改',
                                type: 'primary',
                                handler: function () {
                                    edit();
                                    this.hide();
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            }
        })

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
