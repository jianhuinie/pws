/**
 * @file 全流程体验官
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');
    exports.init = function() {

        var id_apply = $('#apply');
        var login = id_apply.data('login');
        function Dialogs() {
            new Dialog({
                content: '\
<p class="success" >恭喜你报名成功！</p>\n\
<p class="reminder" >如被选中，将有工作人员与你联系。</p>\n\
<button class="apply btn btn-primary" >分享</button>',
                width: 670,
                height: 332
            });
            id_apply.addClass('faile').text('报名成功').css('cursor', 'default');
//            $('.baidu-share').appendTo('.dialog-body').show();
            id_apply.off('click');
        }


//成功后跳回来
        var su = id_apply.data('su');
        if (su === 'back002' && login) {

            service.checkexApply()
                    .done(function(msg) {

                        if (msg.code === 0 && msg.data.is_join !== 1) {

                            service.userexApply()
                                    .done(function(msg) {
                                        if (msg.code === 0) {

                                            Dialogs();
                                            clicked();
                                        }
                                    });

                        }
                        else if (msg.data.is_join === 1) {

                            id_apply.addClass('faile').text('报名成功').css('cursor', 'default');
                            //
                        }
                    });
            return false;
            //            Dialogs();
            //            clicked();
            //            return false;
        }


//登录状态且已经抽奖--置灰
        if (login) {


            service.checkexApply()
                    .done(function(msg) {
                        if (msg.data.is_join === 1) {

                            id_apply.addClass('faile').text('报名成功').css('cursor', 'default');
                            id_apply.off('click');
                            return false;
                        }
                    });
        }



//页面点击抽奖：

        $('#apply').click(function() {

            if (login) {


                service.userexApply()
                        .done(function(msg) {

                            if (msg.code === 0) {

                                Dialogs();
                            } else {
                                alert(msg.msg);
                            }

                        });

            } else {


                new Dialog({
                    content: '\
<p class="reminder" >你需要注册或登录来完成报名过程</p>\n\
<button class="apply btn btn-primary" >继续报名</button>',
                    width: 670,
                    height: 332
                });
            }


            clicked();
            return false;
        });
//点击弹出窗里面的分享按钮：
        function clicked() {
            var container = $(document);
            var apply = $(document);
            apply.delegate('.apply', 'click', function() {


                if (login) {
                    var popup = new Popup({
                        element: container.find('.apply'),
                        layer: container.find('.baidu-share'),
                        show: {
                            trigger: 'over',
                            delay: 100
                        },
                        hide: {
                            trigger: 'out',
                            delay: 200
                        }
                    });
                    $('.baidu-share').appendTo('.dialog-body').show();
                } else {

                    var compaign_id = $('#apply').data('compaign');
                    if (compaign_id == 'pc001') {

                        window.location.href = '/static/register?user_type=2?next=/activity/experience?su=back002';
                    }
                    else {

                        window.location.href = '/static/register?user_type=2?next=/activity/experience?su=back002';
                    }
                }





            });
        }








    };
});