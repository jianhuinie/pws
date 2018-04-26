/**
 * @file 班课设置 - 课程简介
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var ClassInfoForm = require('./ClassInfoForm');
    var store = require('common/store');
    var service = require('common/service');

    var status = 'display';
    var form;
    var container = $('#content .class-info');
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

        var data = store.get('data');

        form = new ClassInfoForm({
            element: formElement,
            data: data
        });

        container
        .on('click', '.edit', function (e) {

            container.trigger('edit', { name: 'info' });
        })

        .on('click', '.btn-cancel', function (e) {

            container.trigger('display', { name: 'info' });

        })

        .on('save', function (e, data) {

            if (data.isSuccess) {

                success('保存成功', function(){
                    location.reload();
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
    };

    exports.save = function () {
        form.save();
    };

    exports.cancel = function () {
        form.cancel();
    };

    exports.edit = edit;

});

