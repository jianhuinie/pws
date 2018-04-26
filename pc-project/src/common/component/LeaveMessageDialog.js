/**
 * @file 帮我找老师弹框
 * @author wangtianhua
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');
    var seekTeacher = require('teacher/seekTeacher');
    var findTeacher = require('teacher/findTeacher');
    var store = require('common/store');

    var is_teacherIndex = '' ;
    var teacherNum = 0, channel = '';
    var sendToteacher = false;
    var channel;
    var oneOnOneTeacherMobile;

    /**
     * 帮我找老师
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 成功后的回调
     * @property {string=} options.serialNum 优惠券识别码
     * @property {string=} options.teacher 优惠券识别码
     * @property {string=} options.sendToTeacher 把留单数据展示给老师 不发送给客服
     */
    function LeaveMessageDialog(options) {

        $.extend(this, LeaveMessageDialog.defaultOptions, options);
        if (options.teacher) {
            is_teacherIndex = options.teacher;
        }

        if (options.teacherNum) {
            teacherNum = options.teacherNum;
        }

        if (options.channel) {
            channel = options.channel;
        }

        if (options.sendToteacher) {
            sendToteacher = options.sendToteacher;
        }

        channel = options.channel;

        
        oneOnOneTeacherMobile = options.oneOnOneTeacherMobile || '';

        this.init();
    }

    var user_Info = {};

    // 获取用户基本信息
    service
    .getUserBasicInfo()
    .then(function (response) {
        var data = response.data;
        user_Info.mobile = data.ori_mobile;
        user_Info.name = data.display_name;
    });

    LeaveMessageDialog.prototype = {

        init: function () {

            var me = this;
            if (user_Info.name) {
                var valueName = "value='" + user_Info.name + "'";
            }
            if (user_Info.mobile) {
                var valueMobile = "value='" + user_Info.mobile+ "'";
            }

            var tpl;
            if(user_Info.mobile || user_Info.name) {
                tpl = ''
                    +    ' class="form-text" pattern="^1[34578](\\d){9}$" required/>'
                    +         '<span class="error"></span>'
                    +     '</div>'
            }
            else {
                tpl =     ''
                    +    ' class="form-text mobile-input" pattern="^1[34578](\\d){9}$" required/>'
                    +    '<button class="btn btn-info form-get-smscode" disabled>'
                    +    '获取验证码'
                    +    '</button>'
                    +         '<span class="error"></span>'
                    +    '</div>'
                    +    '<div class="form-group form-sms">'
                    +    '<input class="form-text sms" name="verifycode" placeholder="短信验证码" required pattern="^\\d*$" />'
                    +    '<span class="error" ></span>'
                    +    '</div>'
            }

            var expPriceMap = {
                '0': '双方协商',
                '1': '¥100-¥200',
                '2': '¥200-¥300',
                '3': '¥300-¥500',
                '4': '¥500以上'
            };

            var expPriceText = '';
            for (var i in expPriceMap) {
                if (expPriceMap[i] === '¥100-¥200') {
                    // 避免顺序变化，所以判断值
                    expPriceText += ''
                        + '<div>'
                        +   '<li data-value="' + expPriceMap[i] + '">'
                        +       expPriceMap[i]
                        +   '</li>'
                        +   '<span class="suggestion">建议</span>'
                        + '</div>';
                }
                else {
                    expPriceText += '<li data-value="' + expPriceMap[i] + '">' + expPriceMap[i] + '</li>';
                }
            };

            // 首页的帮我找老师
            var content = ''
                + '<div class="close"></div>'
                + '<div id="find-teacher">'
                +   '<div class="form">'

                +       '<div class="form-group">'
                +          '<input type="text" placeholder="想学什么" name="subject" class="form-text"  pattern="^[\\u4d00-\\u9fa5a-zA-Z3\.][\\u4d00-\\u9fa5a-zA-Z\-\*\\s\\.·]*,*[\\u4d00-\\u9fa5a-zA-Z\+\#\\s\\.·]*$" required/>'
                +          '<div class="subject-suggestion"></div>'
                +          '<span class="error"></span>'
                +       '</div>'

                +       '<div class="form-group">'
                +             '<input type="text" placeholder="姓名" '
                +         valueName
                +            ' name="name" class="form-text" pattern="^[\\u4d00-\\u9fa5a-zA-Z][\\u4d00-\\u9fa5a-zA-Z\\s\\.·]{1,}$"  required/>'
                +            '<span class="error"></span>'
                +        '</div>'

                +        '<div class="form-group">'
                +             '<input type="text" placeholder="手机号码" name="mobile"'
                +               valueMobile
                +               tpl

                +        '<div class="form-group captcha-box">'
                +             '<input class="captcha-input form-text" type="text" name="captcha" required="" minlength="4" maxlength="4" placeholder="请输入图中的文字">'
                +             '<span class="input-group-addon">'
                +               '<img class="captcha-image" src="/captcha?captcha_name=signin&amp;1452326775555">'
                +             '</span>'
                +             '<span class="error" style="position: absolute; width: 119px; left: 213px; top: -19px;"><i class="icon icon-times-circle"></i>&nbsp;请输入验证码</span>'
                +        '</div>'

                // +       '<div class="form-group exp-price-group">'
                // +          '<div class="dropdown exp-price" required>'
                // +               '<button class="btn-default">'
                // +                   '<i class="caret"></i>'
                // +                   '<span>期望的价格</span>'
                // +               '</button>'
                // +               '<ul class="dropdown-menu">'
                // +                    expPriceText
                // +               '</ul>'
                // +          '</div>'
                // +          '<div class="support-online on">'
                // +              '接受线上授课'
                // +          '</div>'
                // +          '<span class="error"></span>'
                // +       '</div>'

                // +       '<div class="form-group">'
                // +          '<input type="text" placeholder="请描述一下对老师的详细需求" name="detail_info" class="form-text" required />'
                // +          '<span class="error"></span>'
                // +       '</div>'

                +       '<button class="btn-save btn-primary">预约名师试听</button>'
                +   '</div>';

            // 预约咨询
            var Teachercontent = ''
                + '<div id="seek-teacher">'
                + '<div class="subtitle">留下您的联系方式，我们会在15分钟内联系您</div>'
                +   '<div class="form">'
                +       '<div class="form-group">'
                +             '<label class="form-label">姓名：</label>'
                +               '<input type="text" placeholder="您的姓名" '
                +                   valueName
                +                ' name="name" class="form-text" pattern="^[\\u4d00-\\u9fa5a-zA-Z][\\u4d00-\\u9fa5a-zA-Z\\s\\.·]{1,}$" required/>'
                +            '<span class="error"></span>'
                +       '</div>'
                +        '<div class="form-group">'
                +             '<label class="form-label">手机号：</label>'
                +             '<input type="text" placeholder="您的电话" name="mobile"'
                +               valueMobile
                +               tpl
                +       '<div class="form-group">'
                +          '<label class="form-label">想学什么：</label>'
                +          '<input type="text" placeholder="您想学什么" name="subject" class="form-text" pattern="^[\\u4d00-\\u9fa5a-zA-Z][\\u4d00-\\u9fa5a-zA-Z\\s\\.·]*,*[\\u4d00-\\u9fa5a-zA-Z\\s\\.·]*$" required/>'
                +          '<div class="subject-suggestion"></div>'
                +          '<span class="error"></span>'
                +       '</div>'
                +        '<div class="form-group captcha-box">'
                +             '<input class="captcha-input form-text" type="text" name="captcha" required="" minlength="4" maxlength="4" placeholder="请输入图中的文字">'
                +             '<span class="input-group-addon">'
                +              '<img class="captcha-image" src="/captcha?captcha_name=signin&amp;1452326775555">'
                +          '</span>'
                +          '<span class="error" style="position: absolute; width: 119px; left: 213px; top: -19px;"><i class="icon icon-times-circle"></i>&nbsp;请输入验证码</span>'
                +        '</div>'
                +       '<button class="btn-save btn-primary">' + me.title + '</button>'
                +       '<span class="hint">咨询电话：';
                if (oneOnOneTeacherMobile) {
                    Teachercontent += oneOnOneTeacherMobile;
                }
                else {
                    Teachercontent += '4000-910-910，010-86448910';
                }
                Teachercontent +=  
                        '</span>'
                +   '</div>';

            if (is_teacherIndex == 'teacher') {
                me.dialog = new Dialog({
                    title: me.title,
                    content: Teachercontent,
                    width: me.width,
                    skinClass: me.skinClass
                });
            }
            else {
                me.dialog = new Dialog({
                    content: content,
                    width: me.width,
                    skinClass: me.skinClass
                });
            }

            var element = me.dialog.element;
            if (user_Info.mobile) {
                var btn = element.find('.form-get-smscode');
                btn.prop('disabled', false);
            }
            // 一个页面不能出现两处验证码
            if (is_teacherIndex == 'teacher') {
                seekTeacher.init(teacherNum, sendToteacher, channel);
                // 老师主页，一对一，班课 ，视频课 使用三级目录做想学什么
                if (store.get('crumb')) {
                    var subject = $('#seek-teacher').find('input[name = "subject"]');
                    subject.val(store.get('crumb'));
                    subject.closest('.form-group').hide();
                }
            }
            else {
                findTeacher.init(me.dialog);
            }

            element
            .on('click', '.close', function () {
                me.dialog.hide();
            })
        }

    };

    LeaveMessageDialog.defaultOptions = {
        title: '预约试听',
        width: 694,
        height: 660,
        onSuccess: $.noop,
        skinClass: 'leave-message-dialog'
    };

    return LeaveMessageDialog;
});