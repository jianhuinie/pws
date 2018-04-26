/**
 * @file 个人信息 - 工作情况
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var WorkForm = require('./WorkForm');

    var container = $('#content').find('.work');
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
    }

    exports.init = function () {

        var me = this;

        form = new WorkForm({
            element: formElement,
            data: triggerElement.data('work')
        });

        container
        .on('click', '.edit', function () {
            container.trigger('edit', { name: 'work' });
        })

        .on('click', '.btn-cancel', function () {
            container.trigger('display', { name: 'work' });
        })

        .on('save', function (e, data) {

            if (data.isSuccess) {

                success('保存成功', function () {
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
