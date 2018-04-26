/**
 * @file installment refund detail
 * @auto lijun
 */

define(function(require) {

    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require("common/lazyLoadImage");
    var ui = require('common/ui');
    var service = require('common/service');

    return function(){
        lazyLoadImage.init();

        var container = $('.sign-dialog');
        var validateAll = (function () {
            var validateConfig = {
                name: function (value) {
                    if (!value.length) {
                        return {
                            status: false,
                            msg: '姓名不能为空'
                        };
                    }
                    return {
                        status: true
                    };
                },
                mobile: function (value) {
                    if (!value.length) {
                        return {
                            status: false,
                            msg: '手机号不能为空'
                        };
                    }
                    return {
                        status: true
                    };
                },
                orgName: function (value) {
                    if (!value.length) {
                        return {
                            status: false,
                            msg: '机构名不能为空'
                        };
                    }
                    return {
                        status: true
                    };
                }
            };
            return function (container, done) {
                var error = container.find('.error');
                var status = true;

                container
                .find('input')
                .each(function (index, item) {
                    var name = item.name;
                    var value = item.value;
                    if (validateConfig[name]) {
                        var validateResult = validateConfig[name](value);
                        if (!validateResult.status) {
                            error
                            .html(validateResult.msg)
                            .addClass('visible');

                            done(false);

                            status = false;

                            return false;
                        }
                    }
                });

                if (status) {
                    error.removeClass('visible');
                }

                done(status);
            };
        })();

        var toSign = function () {
            service.get(
                '/activity/fenqiSignupAjax',
                {
                    name: $.trim(container.find('.name').val()),
                    org_name: $.trim(container.find('.org-name').val()),
                    mobile: $.trim(container.find('.mobile').val())
                },
                function (response) {
                    if (response.code == 0) {
                        ui.alert('提示报名成功，请等待工作人员联系');
                    }
                }
            );
        };

        var inputTimer = null;
        container.find('input').on(
            'keyup',
            function () {
                clearTimeout(inputTimer);
                inputTimer = setTimeout(
                    validateAll(
                        container,
                        function (status) {
                            var btn = container.find('.btn');
                            if (status) {
                                btn.addClass('btn-submit');
                            }
                            else {
                                btn.removeClass('btn-submit');
                            }
                        }
                    ),
                    200
                );
            }
        );

        container.on(
            'click',
            '.btn-submit',
            function () {
                validateAll(
                    container,
                    function (status) {
                        if (status) {
                            toSign();
                            container.hide();
                        }
                    }
                );
            }
        );

        container.find('.close').on(
            'click',
            function () {
                container.hide();
            }
        );

        $('.btn-sign').on(
            'click',
            function () {
                container.find('.error').removeClass('visible');
                container.show();
            }
        );
    };
});