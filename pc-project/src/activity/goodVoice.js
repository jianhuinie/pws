/**
 * @file 好声音
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var LoginDialog = require('common/component/LoginDialog');
    var service = require('common/service');
    var viewportHeight = require('cobble/function/viewportHeight');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var CodeButton = require('common/component/CodeButton');
    var Placeholder = require('cobble/helper/Placeholder');



    exports.init = function (){





// old
        $('.teacher-info').each(
                function() {
                    new Tab({
                        trigger: 'over',
                        navActiveClass: 'active',
                        navSelector: '.tab-nav',
                        contentSelector: '.tab-p',
                        element: $(this),
                        index: 0
                    });
                }
        );


// tab-2

        $('.comment_tab').each(
                function() {
                    new Tab({
                        trigger: 'over',
                        navActiveClass: 'active',
                        navSelector: '.tab-nav-b',
                        contentSelector: 'ul',
                        element: $(this),
                        index: 0
                    });
                }
        );


// 改-滚动
            var container = $('.comment_tab');

            function scroll_tab() {
                var box = container.find('.tab-head');
                var scroll = box.find('.wrap-b');
                var size = 136 + 10;
                var length = scroll.find('.tab-nav').length;
                var width = length * size;
                var flag = false;
                if (length < 5) {
                    return;
                }
                scroll.css({'width': width-8});

                container

                        .on('click', '.controls .icon-caret-left', function() {
                            if (flag) {
                                return;
                            }
                            var slide = box.scrollLeft() - size;
                            if (slide <= -size) {
                                return;
                            }
                            $('.controls .icon-caret-right').removeClass('icon-ban');
                            if (slide <= 0) {
                                $(this).addClass('icon-ban');
                            }
                            flag = true;
                            box.animate({scrollLeft: slide+4 + 'px'}, 'slow', function() {
                                flag = false;
                            });
                            return;
                        })

                        .on('click', '.controls .icon-caret-right', function() {
                            if (flag) {
                                return;
                            }
                            var slide = box.scrollLeft() + size -2;
                            if (slide >= width - 864 + 60) {
                                return;
                            }
                            $('.controls .icon-caret-left').removeClass('icon-ban');
                            if (slide >= width - 864 - size + 60) {
                                $(this).addClass('icon-ban');
                            }
                            flag = true;
                            box.animate({scrollLeft: slide + 'px'}, 'slow', function() {
                                flag = false;
                            });
                            return;
                        })

                        .on('mouseenter', '.icon', function() {
                            $(this).addClass('icon-hover');
                        })

                        .on('mouseleave', '.icon', function() {
                            $(this).removeClass('icon-hover');
                        });
            }
            scroll_tab();




/**
 * 获取是否有学生身份
 * @param  {Array} roles 身份数组
 * @return {Bool}  返回是否具有学生身份，默认为false
 */
function getHasStudentRole(roles) {
    var studentRoleCode = "2";
    var length = roles.length;
    var hasStudentRole = false;

    if (length > 0) {
        for(var i = 0; i < length; i++) {
           if (roles[i] === studentRoleCode) {
                hasStudentRole = true;
                break;
            }
        }
    }

    return hasStudentRole;
}

    $('#main')
    // 领取优惠券
    .on('mouseover', '.coupon-w', function (e) {
        var target = $(e.currentTarget);
        target.find('.coupon').show();
    })
    .on('mouseout', '.coupon-w', function (e) {
        var target = $(e.currentTarget);
        target.find('.coupon').hide();
    })
    .on('click', '.coupon-color', function (e) {
        var target = $(e.currentTarget);
        var serialNum = target.data('num');
        var haslogin = store.get('user').id;
        var orgStatus = target.data('org');

        //机构使用
        var serial_num = target.data('serial_num');
        var source_user_id = target.data('source_user_id');


        var me = $(this);

        if (haslogin) {
            if (store.get('user').type === 0) {

                service
                .getUserType()
                .done(function (response) {
                    if (response.code === 0) {
                        var roles = response.data.roles;
                        var hasStudentRole = getHasStudentRole(roles);
                        var text = '';

                        if (hasStudentRole) {
                            text = '你目前是老师身份，需要切换到学生身份才能领取优惠券';
                        }
                        else {
                            text = '你目前是老师身份，无法领取优惠券，是否开通学生身份？';
                        }
                        // 变更身份
                        new BanLessonDialog({
                            text: text,
                            hasStudentRole: hasStudentRole,
                            next: '0',
                            onSuccess: function () {
                                location.reload();
                            },
                            noskip: false
                        });
                    }
                });
            } else {

////领机构优惠券
//            if(orgStatus){
//                service
//                    .getOrgCoupon({
//                        couponId: serial_num,
//                        sourceId: source_user_id
//                    })
//                    .done(function(response){
//                    if (response.code === 0) {
////                            success('领取成功');
//                        var orgurl = me.data('url');
//                        var su_text = success_f(orgurl);
//                        dia(su_text);
//
//
//                    }else if(response.code === 5){
//
//                        dia_remove();
//                        var orgurl = me.data('url');
//                        var su_text = success_f(orgurl);
//                        dia(su_text);
//
//                    }else{
//                        dia_remove();
//                        var orgurl = me.data('url');
//                        var su_text = fail_f(orgurl);
//                        dia(su_text);
//
//                    }
//                });
//
//
//
//            }else {

//领老师优惠券
                service
                .receiveCoupon({
                    serialNum: serialNum
                })
                .done(function (response) {
                    if (response.code === 0) {
//                            success('领取成功');
                        var orgurl = me.data('url');
                        var su_text = success_f(orgurl);
                        dia(su_text);


                    }else if(response.code === 5){

                        dia_remove();
                        var orgurl = me.data('url');
                        var su_text = success_f(orgurl);
                        dia(su_text);

                    }else{
                        dia_remove();
                        var orgurl = me.data('url');
                        var su_text = fail_f(orgurl);
                        dia(su_text);

                    }
                });

//            }






            }
        }
        else {
            new LoginDialog({
                wrongRoleText: '你目前是老师身份，无法领取优惠券，是否开通学生身份？',
                onSuccess: function () {
                    location.reload();
                },
                failNext: '0'
            });
        }

    });


//抽奖逻辑

function onAterHide(reload){
    var reloading = $(this)[0].reloading;
    if(reloading == 2){
      location.reload();
    }
    return true;
}


//弹窗
function dia(a_text, width, reload){
    var width = width || 365;
    var aa = new Dialog({
        title: '',
        content: a_text,
        reloading: reload,
        width: width,
        skinClass: '#fff',
        closeSelector: '.apply-close',
        onAfterHide: onAterHide
    });

    $('.dialog-close').click(function(){
        aa.hide();
    });

}

function dia_remove(){
    $('.dialog-mask').remove();
    $('.dialog').remove();
}



//  弹窗--领优惠券成功后
function success_f(href){
    var success =
            '<div class="success-dailog">\n\
            <img src="http://img.gsxservice.com/0cms/d/file/content/2015/07/55b23752ad075.jpg" />\n\
            <p class="title-su">恭喜您领取成功</p>\n\
            <p class="su_desc">优惠券已放入您的钱包管理“优惠券”中</p>\n\
            <div>\n\
            <a href="'+href+'" class="apply">马上去用</a>\n\
            <span class="apply-close">一会儿再说</span>\n\
            </div>\n\
            </div>';
    return success;
}


//  弹窗--领优惠券失败后
function fail_f(){
    var success =
            '<div class="success-dailog">\n\
            <img src="http://img.gsxservice.com/0cms/d/file/content/2015/07/55b237531373a.jpg" />\n\
            <p class="title-su">抱歉您来晚了</p>\n\
            <p class="su_desc">一定有其他优惠券更适合你~快去看看吧！</p>\n\
            <div>\n\
            <span class="apply-close fail-f">再去逛逛</span>\n\
            </div>\n\
            </div>';
    return success;
}


//  优惠券弹窗
function coupon_f(balance, cond_threshold, kind, href, display_status, discount){
    var threshold;
    if ( cond_threshold == 0 || cond_threshold == null ){
        threshold = '不限';
    } else {
        threshold = '满'+cond_threshold+'使用';
    }

    var pin_tai;
    if(display_status != 3){
        pin_tai = '<a href="'+href+'" class="apply">马上去用</a>\n\
                   <span class="apply-close">一会儿再说</span>';
    }else{
        pin_tai = '<a class="apply apply-close status3">马上去用</a>';
    }

    var pin_discount;
    if(discount){
        pin_discount = '<em>'+9.5+'</em>折';
    }else {
        pin_discount = '￥<em>'+balance+'</em>';
    }

    var success =
            '<div class="success-dailog coupon-f">\n\
            <p class="title-su">恭喜您中奖！</p>\n\
            <ul class="coupon-list">\n\
            <li class="coupon-color">\n\
            <div class="coupon-info">\n\
            <div class="balance">\n\
            '+pin_discount+'\n\
            </div>\n\
            <div class="threshold">'+threshold+'\n\
            </div>\n\
            </div>\n\
            <div class="status">优惠券</div>\n\
            </li>\n\
            </ul>\n\
            <p>'+kind+'优惠券1张</p>\n\
            <p class="su_desc">优惠券已放入您的钱包管理“优惠券”中</p>\n\
            <div>'+pin_tai+'\n\
            </div>\n\
            </div>';
    return success;
}


//跟谁学问仔弹窗
function wenzi_f(){
    var success =
            '<div class="success-dailog">\n\
            <p class="title-su">恭喜您中奖！</p>\n\
            <img src="http://img.gsxservice.com/0cms/d/file/content/2015/07/55b237527f41c.jpg" />\n\
            <p>跟谁学吉祥物问仔1个</p>\n\
            <p class="su_desc">请您保证您的电话通畅，我们会尽快与您发送实物奖励~</p>\n\
            </div>';
    return success;
}


//未登录情况--浅注册
function reg_f(){
    var success =
            '<div class="success-dailog">\n\
            <p class="title-su">恭喜您中奖！</p>\n\
            <img src="http://img.gsxservice.com/0cms/d/file/content/2015/07/55b237527f41c.jpg" />\n\
            <p>跟谁学吉祥物问仔1个</p>\n\
            <p class="su_desc">请您保证您的电话通畅，我们会尽快与您发送实物奖励~</p>\n\
            </div>';
    return success;
}



//表单验证
        var main = $('html, body');

        var validator = new Validator({
                realtime: true,
                element: main,
                fields: {
                    mobile: {
                        errors: {
                            required: '请输入联系方式',
                            pattern: '请输入正确的手机号码'
                        }
                    },
                    verifycode: {
                        errors: {
                            required: '请输入验证码',
                            pattern: '请输入正确的验证码'
                        }
                    }
                }
            });





//        验证码
        var element = $('.form');
        var codeInput = element.find('.form-text[name=mobile]'); //手机
        var smsGroup = element.find('.form-sms[name=verifycode]'); //验证码
        var codeBtn = element.find('.codeBtn');
        var  mobile;
        var invite_code;

        new CodeButton({
                   element: codeBtn,
                   send: function () {

                        var value_mobile = $('input[type=mobile]').val();
                        var reg = /^1[3-9]\d{9}$/;
                        var tf = reg.test(value_mobile);

                       if(tf){
                            return service
                            .getSMSCode({
                                mobile: value_mobile
                            })
                            .done(function () {
                                codeInput.focus();
                            });
                       }else{
                           validator.validate();
                       }

                   },
                   onTextChange: function () {
                   }
               });




//
////        location.reload();
//        var apply_sub = $('.apply');
//        apply_sub.click(function(){
////           alert('fds');
//        });



//保存表单
        new SaveButton({
            element: element.find('.apply'),
            form: element,
            saveText: '请稍等...',
            save: function () {

                if(validator.validate()){

                    mobile = codeInput.val();
                    invite_code = smsGroup.val();

                        $.
                             ajax({
                                 url: '/activity/goodvoice_record',
                                 method: 'post',
                                 data: {
                                     'mobile': mobile,
                                     'code': invite_code
                                 },
                                 dataType: 'json',
                                 success: function(msg) {

                                     if (msg.data.display_status == 1) {
                                         var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url);
                                         dia_remove();
                                         dia(text, 437, 2);

                                     } else if (msg.data.display_status == 2) {
                                         dia_remove();
                                         var text = wenzi_f();
                                         dia(text, 437, 2);

                                     } else if (msg.data.display_status == 3 && msg.data.discount > 0) {

                                        var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url, 3, 1);
                                        dia(text, 437, 0);

                                     } else if (msg.data.display_status == 3) {

                                         var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url, 3);
                                         dia_remove();
                                         dia(text, 437, 2);

                                     } else {
                                         alert(msg.msg);
                                     }

                                 }
                             });

                }else {
                    validator.validate();
                }



            }
        });





//  Placeholder
Placeholder.init(
    $('input').find('[placeholder]')
);





//未登录情况--浅注册 弹窗
function reg_fu(){
    var success ='<div class="reg-log"><form class="form input-group" novalidate="novalidate"><div class="form-group form-password" id="login-mobile"><label class="phone">手机号：</label><div class="form-controls"><input class="form-text" type="mobile" name="mobile" placeholder="请输入手机号" required="" autocomplete="off"><span class="error"></span></div></div><div class="form-group form-sms"><div class="form-controls"><label class="ma">验证码：</label><input maxlength="6" class="form-text sms form-sms" type="text" name="verifycode" placeholder="请输入验证码" required="" pattern="^\d*$"><button type="button" class="btn-info form-get-smscode codeBtn">获取验证码</button><span class="error" autocomplete="off"></span></div></div><button class="apply">领取礼物</button></form></div>';
    return success;
}

var reg_log = $('.reg-log');
function reg_log_ff(){
    $('body').append(reg_log);
    reg_log.hide();
}

 //抽奖
      var haslogin;
      if(store.get('user').id){
          haslogin = true;
      }

        $('.prize-bottom').click(function(){

            if(haslogin){


                if (store.get('user').type === 0) {

                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能参与抽奖';
                            }
                            else {
                                text = '你目前是老师身份，无法参与抽奖，是否开通学生身份？';
                            }
                            // 变更身份
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: function () {
                                    location.reload();
                                },
                                noskip: false
                            });
                        }
                    });
                }else{
                    $.
                         ajax({
                             url: '/activity/goodvoice_record',
                             method: 'post',
                             data: {
    //                             'mobile': mobile,
    //                             'code': invite_code
                             },
                             dataType: 'json',
                             success: function(msg) {


                                if (msg.data.display_status == 1) {
                                    var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url);
                                    dia(text, 437, 0);

                                } else if (msg.data.display_status == 2) {
                                    var text = wenzi_f();
                                    dia(text, 437, 0);

                                } else if (msg.data.display_status == 3 && msg.data.discount > 0) {

                                    var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url, 3, 1);
                                    dia(text, 437, 0);

                                } else if (msg.data.display_status == 3) {

                                    var text = coupon_f(msg.data.value, msg.data.cond_threshold, msg.data.display_name, msg.data.url, 3);
                                    dia(text, 437, 0);

                                } else {
                                    alert(msg.msg);
                                }





                             }
                         });

                }


                }else {
//                    浅注册
                reg_log.show();
                new Dialog({
                    title: '',
                    content: reg_log,
                    skinClass: '#fff',
                    onAfterHide: reg_log_ff
                });





                }

            });






//文章跳转
        var container = $('html, body');

        container.delegate(".pre","click",function(){

            var prev = item.filter('.active');
            var next_o = prev.prev();
            var a_index = prev.index();
            if (a_index === 0) {
                prev.removeClass('active');
                item.last().addClass('active');

            } else {
                prev.removeClass('active');
                next_o.addClass('active');

            }


        });

        container.delegate(".next","click",function(){

            var prev = item.filter('.active');
            var next_o = prev.next();
            var a_index = prev.index();
            if (a_index === item.length - 1) {
                prev.removeClass('active');
                item.first().addClass('active');

            } else {
                prev.removeClass('active');
                next_o.addClass('active');

            }

        });



// .comment_tab
        var item = $('div .news-item');
        var pre = $('.pre');
        var next = $('.next');

        var comment_tab = $('.comment_tab');

        var text_ = comment_tab.find('.text');

        var all_ch = $('.channel');
        function ff(){
            $('body').append(all_ch);
            all_ch.hide();
        }

        text_.click(function(){
            var index = $(this).data('index');
                item.filter('.active').removeClass('active');
                item.eq(index).addClass('active');
                all_ch.show();
                new Dialog({
                    title: '',
                    content: all_ch,
                    skinClass: '#fff',
                    onAfterHide: ff
                });



        });





//固定：
        var prize_banner = $('.prize-bottom');

        var fixedHeader = function() {
            prize_banner.addClass('fixed');
        };
        var staticHeader = function() {
            prize_banner.removeClass('fixed');
        };
        var scrollHeight = $(document).height();

        var apply = function() {
            var scroll = pageScrollTop();
            if (scroll < scrollHeight - viewportHeight() && scroll > 500) {
                    fixedHeader();

            }
            else {
                staticHeader();
            }
        };
        apply();
        $(window).scroll(apply);






    };

});