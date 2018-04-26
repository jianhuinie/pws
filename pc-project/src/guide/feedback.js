/**
 * @file 意见返馈
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    var captchaNum = 0;


    exports.init = function() {


        $('.btright #report').on({
            click: function() {
                var val = $(this).val();

                if (val == '有什么不爽的，告诉我们吧！')
                    $(this).val('');
            },
            blur: function() {
                if ($(this).val() == '')
                    $(this).val('有什么不爽的，告诉我们吧！');
            }
        });

        $('.btright #contact').on({
            click: function() {
                var val = $(this).val();
                if (val == 'QQ/邮箱/手机')
                    $(this).val('');
            },
            blur: function() {
                if ($(this).val() == '')
                    $(this).val('QQ/邮箱/手机');
            }
        });

        $('.btright #captcha').on({
            click: function() {
                var val = $(this).val();
                if (val == '输入右侧验证码')
                    $(this).val('');
            },
            blur: function() {
                if ($(this).val() == '')
                    $(this).val('输入右侧验证码');
            }
        });

        //腾讯qq群
        $('#joinQQ').click(function() {
            $('#qqIframe').attr('src', 'http://shang.qq.com/wpa/qunwpa?idkey=73b2bb098de36898dcb745c11b6a05f57d1062f3aaca4835a875c3cc3bd95e63');
        });

        //意见反馈
        var status = 0;
        $('#submit').click(function(e) {
            e.preventDefault();

            var content = $.trim($('#report').val());
            var contact = $.trim($('#contact').val());
            var captcha = $.trim($('#captcha').val());

            if (content == '' || content == '有什么不爽的，告诉我们吧！') {
                alert('亲，请填写你的宝贵意见(^_^)');
                $('#report').focus();
                return false;
            }

            //验证联系方式
            if (contact == '' || contact == 'QQ/邮箱/手机') {
                alert('请留下联系方式');
                $('#contact').focus();
                return false;
            } else {
                var reg1 = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,6}$/;  //邮箱
                var reg2 = /^1[1-9][0-9]\d{4,9}$/;  //手机号
                var reg3 = /^[1-9](\d){4,12}$/;  //qq

                if (!reg1.test(contact) && !reg2.test(contact) && !reg3.test(contact)) {
                    alert('请留下正确的联系方式');
                    $('#contact').focus();
                    return false;
                }
            }

            if (captcha == '' || captcha == '输入右侧验证码') {
                alert('请输入验证码');
                $('#captcha').focus();
                return false;
            }

            if (status) {
                alert("亲，请不要反复提交~");
                return false;
            }

            status = 100;
            $.ajax({
                url: '/guide/feedback',
                dataType: 'json',
                data: {"content": content, "contact_info": contact, "captcha": captcha, "captcha_name": "feedback"},
                type: 'post',
                success: function(msg) {
                    if (msg['code'] == 0) {

                        alert({
                            title: '温馨提示',
                            content: '\
<p class="reminder" >您的宝贵意见我们已经收到！</p>\n\
<p>如有需要我们会尽快与您联系，谢谢！</p>',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function() {
                                        this.hide();
                                    }
                                }
                            ]
                        });

                        $('#report').val("有什么不爽的，告诉我们吧！");
                        $('#contact').val("QQ/邮箱/手机");
                        $('#captcha').val("输入右侧验证码");
                        var src = $('#captcha-img').data('src');
                        $('#captcha-img').attr('src', src + '&n=' + (captchaNum++));

                    }
                    else if (msg.code == 1){
                        alert(msg.msg);
                    }
                    else {
                        alert('提交失败');
                    }
                    status = 0;
                }
            });
        })






    };




});