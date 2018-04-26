/**
 * @file 学生信息表单
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';


    var urlUtil = require('cobble/util/url');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');

    var Editor = require('common/component/Editor');
    var CodeButton = require('common/component/CodeButton');
    var LoginDialog = require('common/component/LoginDialog');
    // var AddressForm = require('teacherCenter/component/AddressForm'); // 地址薄

    var container = $('.form-student');

    var editNameClass = 'btn-edit-name';
    var saveNameClass = 'btn-save-name';

    var validator;

    function editName() {

        var userNameText = container.find('.user-name-text');
        var userNameInput = $('<input class="form-text user-name-input" type="text" />');
        userNameInput.val(userNameText.html());

        userNameText.replaceWith(userNameInput);

        var editBtn = container.find('.' + editNameClass);

        editBtn
        .removeClass(editNameClass)
        .addClass(saveNameClass)
        .html('保存');
    }

    function saveName() {

        var userNameInput = container.find('.user-name-input');
        var userNameText = $('<span class="form-static user-name-text"></span>');

        userNameText.html(userNameInput.val());

        userNameInput.replaceWith(userNameText);

        var saveBtn = container.find('.' + saveNameClass);

        saveBtn
        .addClass(editNameClass)
        .removeClass(saveNameClass)
        .html('修改');
    }

    function login() {

        var search = urlUtil.parseQuery(location.search);
        var courseId = store.get('courseId');
        var lessonWay = store.get('lessonWay');

        if (courseId) {
            search.course_id = courseId;
        }
        if (lessonWay) {
            search.lesson_way = lessonWay;
        }

        search = $.param(search);

        var url = location.pathname + (search ? ('?' + search): '');

        var input = container.find('.input-mobile');
        var dialog = new LoginDialog({
            mobile: $.trim(input.val()),
            next: url,
            wrongRoleText: '你目前是老师身份， 无法向TA约课，是否开通学生身份？',
            onSuccess: function (data) {

                success(
                    '登录成功',
                    function () {
                        location.href = url;
                    }
                );

            }
        });
    }

    /**
     * 手机号输入框失焦验证该手机是否注册
     *
     * 已注册：显示请登录
     * 未注册：发送验证码
     *
     * @inner
     */
    function initMobile() {

        var input = container.find('.input-mobile');
        var registerBtn = container.find('.btn-register');

        if (input.length === 1) {

            var codeGroup = container.find('.code');

            // 发送验证码
            var codeBtn = new CodeButton({
                element: container.find('.btn-send-code'),
                send: function () {

                    if (validator.validate('mobile')) {

                        return service
                        .getSMSCode({
                            mobile: $.trim(input.val())
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('验证码发送成功');
                            }
                        });

                    }
                }
            });

            // 输入框失焦显示逻辑
            input.blur(function () {
                if (validator.validate('mobile')) {

                    var mobile = $.trim(input.val());

                    service
                    .checkMobileRegister({
                        mobile: mobile
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            var data = response.data;
                            var loginGuide = container.find('.login-guide');

                            var registered = store.get('registered');
                            registered[mobile] = data.exist;

                            if (data.exist) {
                                codeBtn.element.hide();
                                loginGuide.show();
                                codeGroup.hide();
                                registerBtn.hide();
                            }
                            else {
                                codeBtn.element.show();
                                loginGuide.hide();
                                codeGroup.show();
                                registerBtn.show();
                            }
                        }
                    });

                }
            });

            var register = function () {

                var data = form.parse(validator.element);

                service
                .registerSimply({
                    name: data.name,
                    mobile: data.mobile,
                    code: data.code
                })
                .done(function (response) {
                    if (response.code === 0) {

                        codeGroup.remove();
                        codeBtn.element.remove();

                        codeBtn.dispose();

                        input.off();
                        input.replaceWith(
                            '<span class="form-static">'
                          +     data.mobile
                          +     '<input type="hidden" name="mobile" value="' + data.mobile + '" />'
                          + '</span>'
                        );

                        container.find('.bind-success').show();
                        registerBtn.hide();

                        store.set('hasLogin', true);

                    }
                });
            };

            container

            // 点击确定进行浅注册
            // 注册成功后显示手机号输入框变文本
            .on('click', '.btn-register', function () {

                if (validator.validate([ 'name', 'mobile', 'code' ])) {
                    register();
                }

            });
        }
    }

    exports.init = function (options) {

        /*/ 地址薄
        var addressForm = new AddressForm({
            element: container.find('.new-address')
        });*/

        validator = options.validator;

        // 已注册手机的映射表，用户填写手机号码输入框失焦后
        // 会判断该手机号是否已注册
        // 最后在提交表单时，根据手机号判断是否注册决定是否弹出登录框
        store.set('registered', {});

        if (!store.get('hasLogin')) {
            initMobile();
        }

        var editor = new Editor({
            element: container.find('.note'),
            maxLength: 200
        });

        var studentName = container.find('.student-name');

        container
        .on('click', '.' + editNameClass, editName)
        .on('click', '.' + saveNameClass, saveName)
        .on('click', '.btn-login', login);

        container
        .find('[name="self"]')
        .change(function (e) {

            if (e.target.value == 1) {
                studentName.hide();
            }
            else {
                studentName.show();
                if (studentName.hasClass('has-error')) {
                    studentName.removeClass('has-error');
                }
            }
        });
    };

    exports.validate = function (name) {
        return validator.validate(name, true);
    };

    exports.getData = function () {
        var data = form.parse(container);

        return {
            isSelf: data.self == 0 ? 0 : 1,
            areaId: data.area,
            locationAddr: data.location_addr,
            lng: data.lng,
            lat: data.lat,
            note: data.note,
            studentName: data.student_name,
            name: data.name,
            tUId: data.tUId
        };
    };

    exports.showAddress = function () {
        var addr = container.find('.student-address');
        if (addr.hasClass('has-error')) {
            addr.removeClass('has-error');
        }
        addr.show();
    };

    exports.hideAddress = function () {
        container.find('.student-address').hide();
    };

    exports.login = login;


});