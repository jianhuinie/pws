/**
 * @file 个人信息-其他信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var OtherForm = require('./OtherForm');
    var store = require('common/store');
    var container = $('#content .other');
    var triggerElement = container.find('.form-trigger');
    var formElement = container.find('.form');
    var form;
    var status = 'display';

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

        form = new OtherForm({
            element: formElement,
            content: store.get('other')
        });

        container

        .on('click', '.edit', function (e) {
            container.trigger('edit', { name: 'other' });
        })

        .on('click', '.btn-cancel', function (e) {
            container.trigger('display', { name: 'other' });
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

                formElement.hide();
                triggerElement.show();

                triggerElement
                .find('.content')
                .html(
                    data.content
                );*/

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

