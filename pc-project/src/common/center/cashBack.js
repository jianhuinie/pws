define(function (require, exports) {

    'use strict';
    var service = require('common/service');
    var store = require('common/store');
    var Popup = require('cobble/helper/Popup');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    var userNumber;
    var userType;
    var container;

    function loadCashbackList(page) {
        service
        .getCashbackRecord({
            page: page,
            page_size: 4,
            number: userNumber,
            type: userType
        })
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                var tpl = data.tpl;

                container
                .find('.records')
                .html(tpl.cash_back_record);
            }
        });
    }

    exports.init = function () {
        container = $('#content');
/*        userNumber = store.get('userNumber');
        userType = store.get('userType');
        var url = store.get('shareLink');
        var formEl  = container.find('.form');

        //validator
        var validator = new Validator({
            element: formEl,
            fields: {
                mobile: {
                    errors: {
                        required: '请输入手机号码',
                        pattern: '请输入正确的手机号码'
                    }
                }
            }
        });

        //发送短信
        var invitBtn = container.find('.invite');

        invitBtn
        .on('click', function () {
            formEl.show();
            invitBtn.hide();
        });

        new SaveButton({
            element: container.find('#btn-submit'),
            saveText: '正在发送',
            save: function () {

                    if (validator.validate()) {
                        var data = form.parse(formEl);

                        service
                        .sendCashBackInvite(data)
                        .done(function (response) {
                            if (response.code === 0) {
                                success('邀请信息已发送');
                                formEl.hide();
                                invitBtn.show();
                            }
                        });
                    }
            }
        });

        container
        .on('click', '#btn-cancel', function () {
            formEl.hide();
            invitBtn.show();
        })*/

        //点击分页获取
        container
        .on('click', '.pager a', function (event) {
            var link = $(event.currentTarget);

            if (link.hasClass('active')) {
                return false;
            }

            var page = link.data('page');

            loadCashbackList(page);

            return false;
        });

        //分享社交
/*        new Popup({
            element: container.find('.social'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'over',
            },
            hide: {
                trigger: 'out',
                delay: 100
            }
        });

        if (window.clipboardData) {
            var copy  = container.find('.copy');
            copy.show();

            copy
            .click(function () {
                window.clipboardData.setData('Text', url);
            })
        }

        //share link
        container
        .on('click', '.link input', function (event) {
            var element = $(event.currentTarget);

            element.select();
        });*/
    }
})