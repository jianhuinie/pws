/**
 * @file 个人信息-基本信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var BaseInfoForm = require('./BaseInfoForm');

    var container = $('#content').find('.baseinfo');
    var form;
    var status = 'display';
    var triggerElement = container.find('.form-trigger');
    var formElement = container.find('.form');
    var AddressForm = require('teacherCenter/component/StudentAddressForm');
    var store = require('common/store');

    var addressForm; // 地图

    function display() {
        formElement.hide();
        triggerElement.show();
    }

    function edit() {
        triggerElement.hide();
        formElement.show();

        // 所在地 - 刷新
        var formData = formElement.data('baseinfo');

        if (addressForm && formData.address) {
            addressForm.refresh(formData.address);
        }
    }

    exports.init = function () {

        if (container.find('.baseinfo.no-data').length > 0) {
            status = 'edit';
        }

        form = new BaseInfoForm({
            element: formElement,
            data: formElement.data('baseinfo')
        });

        // 初始化 - 地图
        addressForm = new AddressForm({
            element: formElement.find('.form-address')
        });
        store.set('addressForm', addressForm);

        container
        .on('click', '.edit', function (e) {
            container.trigger('edit', { name: 'baseInfo' });
        })

        .on('click', '.btn-cancel', function (e) {
            container.trigger('display', { name: 'baseInfo' });
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

