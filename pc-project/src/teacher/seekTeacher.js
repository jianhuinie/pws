/**
 * @file 搜索列表页帮我找老师,落地页
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');
    var Validator = require('cobble/form/Validator');
    var AutoComplete = require('cobble/ui/AutoComplete');
    var Select = require('cobble/form/Select');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var findTeacherConfirmDialog = require('common/component/FindTeacherConfirmDialog');

    /**
     * 渲染内容
     *
     */
    function renderContent (type, data) {
        var tpl = "";
        if (type == 'less') {
            $.each(
                data,
                function (key, val) {
                    $.each(
                        val,
                        function (key, item) {
                            if (key == 3) {
                                if (item.remark_name != null) {
                                    tpl += "<div class='menu-list'>" + item.remark_name + "</div>";
                                }
                            }
                        }
                    );
                }
            );
        }
        else if (type == 'more'){
            $.each(
                data,
                function (key, val) {
                    $.each(
                        val,
                        function (key, item) {
                            $.each(
                                item,
                                function (key, value) {
                                    if (key == 3) {
                                        if (value.remark_name != null) {
                                            tpl += "<div class='menu-list'>" + value.remark_name + "</div>";
                                        }
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
        else {
            var tpl = "&nbsp;"
        }
        return tpl;
    }

    exports.init = function (teacherNum, sendToteacher, channel) {

        var me = this;
        var seekTeacher = $('#seek-teacher');
        var element = seekTeacher.find('.form');
        var name = element.find('input[name="name"]');
        var mobile = element.find('input[name="mobile"]');
        var subject = element.find('input[name="subject"]');
        var smscode = element.find('.form-get-smscode');
        var menu = element.find('.subject-suggestion');
        var verifycode = element.find('input[name="verifycode"]');
        var supportOnline = element.find('.support-online');
        var detailInfo = element.find('input[name="detail_info"]');
        var studentNumber = null;
        
        // 获取用户基本信息
        service
        .getUserBasicInfo()
        .then(function (response) {
            var data = response.data;
            if (data.display_name) {
                name.val(data.display_name);
            }
            if (data.ori_mobile) {
                mobile.val(data.ori_mobile);
                smscode.remove();
            }
            else {
                smscode.show();
                smscode.parent().find('.form-text').removeClass('mobile-input');
            }
            if (data.user_number) {
                studentNumber = data.user_number;
            }
        });


        var autoComplete =  new AutoComplete({
            element: subject,
            menu: menu,
            load: function () {}
        });

        // 期望价格
        var expPriceSelect = new Select({
            element: $('.exp-price'),
            defaultText: '- 期望的价格 -',
            name: 'exp_price'
        });

        seekTeacher
        .on('keyup', 'input[name="subject"]', function (e) {

            var keyword = $.trim(subject.val());
            if ( keyword != '') {
                service
                .courseClassify({
                    keyword: keyword
                })
                .then(function (response) {
                    element.find('.error').attr('style', '').hide();
                    menu.show();
                    menu.html(
                        renderContent(
                            response.data.type,
                            response.data.data
                        )
                    );
                    autoComplete.open();
                });
            }
        })
        .on('click', '.menu-list', function (e) {

            var target = $(this);
            subject.val(target.html());
            menu.attr('border','none').hide();
        })
        .on('click', '.list', function (e) {

            var target = $(this);
            subject.val(target.html());
            menu.attr('border','none').hide();
        })
        .on('blur', '[name="mobile"]', function (){

            if (me.validator.validate('mobile')) {
                smscode.prop('disabled', false);
            }
        })
        .on('blur', '.captcha-input', function (){

            var element = $(this);
            var parent = element.parent();
            // 如果为空
            if (!element.val()){
                parent.addClass('has-error');
            } else {
                parent.removeClass('has-error');
            }
        })
        .on('click', '.captcha-image', function () {

            $(this).prop(
                'src',
                '/captcha?captcha_name=signin&' + $.now()
            );
        })
        .on('click', '.support-online', function () {
            var target = $(this);
            if (target.hasClass('on')) {
                target.removeClass('on');
            }
            else {
                target.addClass('on');
            }
        });

        // 验证对象
        me.validator = new Validator({
            element: element,
            realtime: true,
            fields: {
                name: {
                    errors: {
                        pattern: '请填写真实姓名哦',
                        required: '请输入姓名'
                    }
                },
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '手机号格式错误'
                    }
                },
                subject: {
                    errors: {
                        required: '请输入你想学的内容',
                        pattern: '请输入正确的学习内容'
                    }
                },
                exp_price: {
                    errors: {
                        required: '请选择期望的价格'
                    }
                },
                detail_info: {
                    errors: {
                        required: '请输入对老师的详细需求'
                    }
                }
            }
        });

        // 保存表单
        me.saveButton = new SaveButton({
            element: element.find('.btn-save'),
            saveText: '正在提交...',
            save: function () {

                var url = 'http://pb0.genshuixue.com/gs.gif';
                var query = $('input[name="q"]').val();
                var params = {
                    type: 'recommend',
                    stype: '2',
                    client: 'PC',
                    page_type: leaveMessPageType,
                    track_id: cookie.get('__track_id__'),
                    _timestamp: new Date().getTime(),
                    user_number: store.get('user').number,
                    user_role: store.get('user').type,
                    location_type: leaveMessPageType+'_2',
                    tid: store.get('teacherId'),
                    cid: store.get('courseId'),
                    query: query,
                };
                WAT.send(url, params);

                // 验证后操作
                if (me.validator.validate()) {
                    var smscode = element.find('.form-get-smscode');
                    if (smscode && smscode.length) {
                        var smscode = verifycode.val();
                        if (smscode == '') {
                            alert('请输入短信验证码');
                            return false;
                        }
                    }

                    var captcha = element.find('.captcha-input');
                    var parent = captcha.parent();

                    // 如果为空
                    if (parent.hasClass('show-captcha')) {
                        if (!captcha.val()){
                            parent.addClass('has-error');
                            return;
                        } else {
                            parent.removeClass('has-error');
                        }
                    }

                    //留单至客服
                    if (!sendToteacher) {
                        service
                            .addRecommendRecord({
                                    userName: name.val(),
                                    mobile: mobile.val(),
                                    info: subject.val(),
                                    expPrice: expPriceSelect.getValue(),
                                    supportOnline: supportOnline.hasClass('on') ? '1' : '0',
                                    detailInfo: detailInfo.val(),
                                    pageType: leaveMessPageType,
                                    detailUrl: location.href,
                                    smscode: verifycode.val(),
                                    source: 'genshuixue',
                                    // captchaName: 'signin',
                                    // captcha: element.find('input[name="captcha"]').val(),
                                    teacherNum: teacherNum,
                                    channel: channel
                                },
                                {
                                    errorHandler: {
                                        '1000070': function (response) {
                                            element.find('.captcha-box').addClass('show-captcha');
                                            element.find('.captcha-image').prop(
                                                'src',
                                                '/captcha?captcha_name=signin&' + $.now()
                                            );
                                        },
                                        '1000057': function (response) {
                                            alert({
                                                title: '温馨提示',
                                                content: '您的短信验证码填写错误',
                                                buttons: [
                                                    {
                                                        text: '确定',
                                                        type: 'primary',
                                                        handler: function () {
                                                            this.hide();
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                }
                            )
                            .done(function (response) {
                                if (response.code === 0) {
                                    new findTeacherConfirmDialog();
                                }
                            });
                    }
                    //留单至老师
                    else {
                        if (!studentNumber) {
                            service
                                .loginBySms({
                                    userType: 2,
                                    mobile: mobile.val(),
                                    code: verifycode.val(),
                                    rememberMe: 'on'
                                })
                                .then(function (response) {
                                    if (response.code === 0) {
                                        var userNumber = response.data.number;
                                        service
                                            .createReservation({
                                                teacher_number: teacherNum,
                                                student_number: userNumber
                                            })
                                            .then(function (res) {
                                                if (res.code === 0) {
                                                    new findTeacherConfirmDialog({
                                                        sendToteacher: sendToteacher
                                                    });
                                                }
                                            });
                                    }
                                });
                        }
                        else {
                            service
                                .createReservation({
                                    teacher_number: teacherNum,
                                    student_number: studentNumber
                                })
                                .then(function (response) {
                                    if (response.code === 0) {
                                        new findTeacherConfirmDialog({
                                            sendToteacher: sendToteacher
                                        });
                                    }
                                });
                        }
                    }

                }

            }
        });

        // 获取验证码
        var codeButton = new CodeButton({
            element: smscode,
            send: function () {
                var mobilecode = element.find('.form-sms')
                mobilecode.show();
                return service
                .getSMSCode(
                    {
                        mobile: $.trim(mobile.val()),
                        type: 'signin',
                        captcha: element.find('input[name="captcha"]').val(),
                        captcha_name: 'signin'
                    },
                    {
                        errorHandler: {
                            '1000111': function (response) {
                                element.find('.captcha-box').addClass('show-captcha');
                                element.find('.captcha-image').prop(
                                    'src',
                                    '/captcha?captcha_name=signin&' + $.now()
                                );
                            }
                        }
                    }
                )
                .done(function (response) {
                    if (response.code == 0) {
                        var verifycode = mobilecode.find('input[name="verifycode"]');
                        verifycode.focus();
                        verifycode.parent().show();
                    }
                });
            }
        });


    };

});