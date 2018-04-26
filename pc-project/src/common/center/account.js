/**
 * @file 账户设置
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var passwordItem = require('./account/password');
    var mobileItem = require('./account/mobile');
    var emailItem = require('./account/email');
    var payPasswordItem = require('./account/payPassword');
    var DefaultAvatarDialog = require('common/component/DefaultAvatarDialog');

    var service = require('common/service');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    var firstLoadKey = '_fdal_';

    var payMobileInput; // 支付密码 - 国际手机号

    var container = $('#content');

    /**
     * 展开表单
     *
     * @inner
     * @param {jQuery} item
     */
    function expandForm(item) {

        var body = item.find('.item-body');
        var result = item.find('.form-result');
        var form = item.find('.form');

        body.show();

        if (result.length > 0) {
            result.show();
        }
        else {
            form.show();
        }
    }

    /**
     * 折叠表单
     *
     * @inner
     * @param {jQuery} item
     */
    function foldForm(item) {

        var body = item.find('.item-body');
        // 如果有错误提示，此时要求一并消失
        body.find('.has-error').removeClass('has-error');
        item.find('.form-result').hide();
        item.find('.form').hide();

        body.hide();
    }

    function selectDefaultAvatar(callback) {

        var dialog = new DefaultAvatarDialog({
            element: $('body'),
            type: store.get('sex'),
            avatar: store.get('defAvatar')
        });

        dialog.onSelectdefaultavatar = function (event, data) {
            service.changeDefaultAvatar({
                avatar: data.avatarName
            }).done(function (response) {
                if (response.code === 0) {
                    success('保存成功', function () {
                        store.set('defAvatar', data.avatarName);
                        $('#content').find('.image-preview img').attr('src', data.avatarPath);

                        // 记录下用户设置了默认头像
                        cookie.set(firstLoadKey + store.get('user').number, true, {
                            expires: 99999999999
                        });
                        dialog.hide();
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    });
                }
            });
        };
    }

    /**
     * 初始化
     */
    exports.init = function () {

        passwordItem.init();
        mobileItem.init();
        emailItem.init();
        payPasswordItem.init();

        container
        .on('click', '.btn-toggle', function (e) {

            var target = $(e.currentTarget);
            var item = target.closest('.item');
            var isHidden = item.find('.item-body').css('display') === 'none';

            if (isHidden) {

                expandForm(item);

                // 设置支付密码 - 国际手机号
                if (container.find('#pay-mobile').length) {
                    payMobileInput = new MobileInput({
                        element: container.find('#pay-mobile'),
                    });
                }

            }
            else {
                foldForm(item);
            }
        })
        .on('click', '.privacy-name', function (e) {// 隐私模式switch - 姓名

            var target = $(e.target);
            if (!target.prop('checked')) {

                service
                .togglePrivateProtected({ bitwise: 1 })
                .done(function (response) {

                    if (response.code === 0) {
                        success('隐藏真实姓名模式已关闭', function () {
                            location.reload();
                        });
                    }

                });

            }
            else {

                if (target.data('nickname')) {
                    confirm({
                        content: '隐藏真实姓名可能会降低学生对你的信任，减少约课量，确定要开启隐藏模式吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {

                        service
                        .togglePrivateProtected({ bitwise: 1})
                        .done(function (response) {

                            if (response.code === 0) {
                                success('真实姓名已隐藏', function () {
                                    location.reload();
                                });
                            }

                        });
                    })
                    .fail(function () {
                        target.closest('.form-checkbox').removeClass('checked');
                    });
                }
                else {
                    confirm({
                        content: '隐藏真实姓名将会用昵称来代替你的真实姓名，你的个人资料还没有填写“昵称”这一项，快去补上吧！',
                        title: '温馨提示',
                        width: 370
                    })
                    .done(function () {
                        location.replace('/teacher_center/profile');
                    })
                    .fail(function () {
                        target.closest('.form-checkbox').removeClass('checked');
                    });
                }

            }
        })
        .on('click', '.privacy-avatar', function (e) {// 隐私模式switch - 头像

            var target = $(e.target);
            if (target.prop('checked')) {
                target.prop('checked', false);
                target.closest('.form-checkbox').removeClass('checked');
                if (store.get('avatarVerify') != '1') {
                    confirm({
                        title: '温馨提示',
                        content: '上传真实头像并通过审核后才能隐藏真实头像哦',
                        buttons: [
                            {
                                text: '去上传头像',
                                type: 'primary',
                                handler: function () {
                                    window.location.href = '/teacher_center/profile';
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
                } else {
                    confirm({
                        content: '隐藏真实头像可能会降低学生对你的信任，减少约课量，确定要开启隐藏模式吗？',
                        title: '温馨提示',
                        width: 335
                    })
                    .done(function () {

                        selectDefaultAvatar(function () {
                            service
                            .togglePrivateProtected({ bitwise: 2 })
                            .done(function (response) {

                                if (response.code === 0) {
                                    target.prop('checked', true);
                                    target.closest('.form-checkbox').addClass('checked');
                                    success('真实头像已隐藏', function () {
                                        location.reload();
                                    });
                                }

                            });
                        });

                    });
                }
            }
            else {
                service
                .togglePrivateProtected({ bitwise: 2 })
                .done(function (response) {

                    if (response.code === 0) {
                        success('隐藏真实头像模式已关闭', function () {
                            location.reload();
                        });
                    }

                });
            }
        })
        .on('click', '.btn-cancel', function (e) {// 取消后收起

            foldForm(
                $(e.currentTarget).closest('.item')
            );
        })
        .on('click', '.bind-account', function () {

            var target = $(this);
            var way = target.data('way');
            var userType = store.get('user').type;

            location.href = '/connect/login/' + way + '/' + userType
                          + '?next='
                          + location.pathname
                          + location.search;
        })
        .on('click', '.unbind-account', function () {

            var type = $(this).data('way');

            confirm(
                '确定取消绑定吗',
                '温馨提示'
            )
            .done(function () {
                service
                .unbindAccount({
                    type: type
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success(
                            '取消绑定成功',
                            function () {
                                location.reload()
                            }
                        );
                    }
                });
            });
        });

    };



});