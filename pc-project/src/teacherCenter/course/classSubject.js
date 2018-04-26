/**
 * @file 班课设置 - 课程信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var ClassSubjectForm = require('./ClassSubjectForm');
    var store = require('common/store');

    var container = $('#content').find('.subject');
    var form;
    var status = 'display';
    var triggerElement = container.find('.form-trigger');
    var formElement = container.find('.form');

    function display() {
        formElement.hide();
        triggerElement.show();
    }

    function edit() {
        triggerElement.hide();
        formElement.show();
        form.refresh();
    }

    exports.init = function () {


        var triggerElement = container.find('.form-trigger');
        var formElement = container.find('.form');

        if (container.find('.class-subject.no-data').length > 0) {
            status = 'edit';
        }

        form = new ClassSubjectForm({
            element: formElement,
            data: store.get('data')
        });

        container
        .on('click', '.edit', function (e) {

            container.trigger('edit', { name: 'subject' });

        })

        .on('click', '.btn-cancel', function (e) {

            container.trigger('display', { name: 'subject' });

        })

        .on('save', function (e, data) {

            if (data.isSuccess) {

                success('保存成功', function(){
                    location.href = '/class_course/upsert_form?type=edit&number=' + data.number;
                });

            }
        });

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
    }

    exports.save = function () {
        form.save();
    };

    exports.cancel = function () {
        form.cancel();
    };

    exports.edit = edit;

});

