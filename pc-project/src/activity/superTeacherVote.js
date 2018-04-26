/**
 * @file 风云老师大赛 2016 - 老师排行榜
 * @author wangyujie
 */
define(function(require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var store = require('common/store');
    var service = require('common/service');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var Popup = require('cobble/helper/Popup');
    var Dialog = require('cobble/ui/Dialog');
    var etpl = require('cobble/util/etpl');
    var URL = require('cobble/util/url');

    var content = $('.content');
    var user;

    /*
     * 投票成功后～弹窗
     *
     * me, 投票按钮
     * data, 后端返回数据
     */
    function Dialogs(me, data) {

        if (data.coupon) { //  领取优惠券
            var couponType = '';
            if (data.coupon.detail.type == 'general') {
                couponType = '老师的所有课程均可使用';
            }
            else if (data.coupon.detail.count > 1) {
                couponType = '可用于《' + data.coupon.detail.name + '》等' + data.coupon.detail.count + '门课程';
            }
            else if (data.coupon.detail.type == 'class') {
                couponType = '可用于班课《' + data.coupon.detail.name + '》';
            }
            else if (data.coupon.detail.type == 'video') {
                couponType = '可用于视频课《' + data.coupon.detail.name + '》';
            }
            var content =  '<div class="coupon-price">'
                        +      '¥<span class="price">' + data.coupon.amount + '</span>'
                        +      '<span class="hint">优惠券</span>'
                        +  '</div>'
                        +  '<div class="coupon-intro">'
                        +      '<div class="coupon-code">优惠码：' + data.coupon.code + '</div>'
                        +      '<div class="coupon-desc">'
                        +          '购买老师课程时，输入优惠码立享优惠！'
                        +          '<span>' + couponType + '</span>'
                        +      '</div>'
                        +      '<div class="coupon-desc">明天投票还有机会领奖哦～</div>'
                        +  '</div>'
                        +  '<div class="actions">'
                        +      '<button class="btn note-down">记下了</button>'
                        +      '<button class="btn save-count">存入账户</button>'
                        +  '</div>';

            var dia = new Dialog({
                content: content,
                width: 528,
                height: 525,
                skinClass: 'get-coupon'
            });

            $('.get-coupon')
            .on('click', '.note-down', function () {
                dia.hide();
            })
            .on('click', '.save-count', function () {
                service
                .superTeacherBindCoupon({
                    code: data.coupon.code,
                    checkCode: data.coupon.coupon_check_code
                })
                .done(function (response) {
                    dia.hide();
                    success('保存成功');
                });
            });
        }
        else { // 没有优惠券了～
            if (user.type == 0) {
                alert('投票成功！<br>切换为学生身份投票可获得优惠券哦～');
            }
            else {
                alert('投票成功！<br>明天还可以为老师投票哦～');
            }
        }

        // 票数加1
        me
        .closest('.vote-result')
        .find('.vote-acount span')
        .text(me.data('acount'));
    }

    /*
     * 报名
     */
    function joinSuperTeacher () {

        var content = '<h1>恭喜您报名成功！</h1>'
                    + '<p>快进入跟谁学PC网站 - 老师后台 - 我的视频，上传您的比赛视频！<br>上传视频时必须选择“2016互联网风云老师”分类哦～</p>'
                    + '<p>拉票小秘籍：参赛后，投票学生均可领取您<span class="text-primary">发布在主页的优惠券</span>。<br>快去PC老师后台发布你的优惠券吧！</p>';

        service
        .joinSuperTeacher(
            {

            },
            {
                errorHandler: {
                    '110000': function (response) { // 已经报过名了
                        alert({
                            title: '温馨提示',
                            content: '您已经报过名了',
                            width: 350,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        window.location.reload();
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
                confirm({
                    title: '温馨提示',
                    content: content,
                    skinClass: 'join-success',
                    width: 505,
                    buttons: [
                        {
                            text: '上传视频',
                            type: 'info',
                            handler: function () {
                                window.location.href = '/teacher_center/video';
                            }
                        },
                        {
                            text: '我的参赛主页',
                            type: 'primary',
                            handler: function () {
                                window.location.href = '/activity/superTeacherPersonal?number=' + response.data.user_number;
                            }
                        }
                    ],
                    onAfterHide: function () {
                        this.hide();
                        window.location.reload();
                    }
                });
            }
        });
    }

    exports.init = function() {

        etpl.addFilter('truncate', function (value, length) {
            if (value.length > length) {
                return value.substring(0, length-1) + '...'
            } else {
                return value.substring(0, length);
            }
        });

        var height = $('body').height();

        // var teacherListRender = etpl.compile($('#teacher_template').html());

        user = store.get('user');
        var hasLogin = user.id;
        var url = location.href;
        var count = store.get('count');
        var share = content.find('.icon-share');

        var flag = url.substr(1).match('search_name');

        if (count == 0 && flag != null) {
            $(window).scrollTop(500);
            success("没有符合该选手的相关信息！");
        }

        // 分享学生投票链接
        share.each(function(index, item){
            new Popup({
                element: $(item),
                layer: $(item).find('.baidu-share'),
                show: {
                    trigger: 'over',
                    delay: 20
                },
                hide: {
                    trigger: 'out',
                    delay: 200
                }
            });
        });

        content
        .on('click', '#student-search', function () { // 搜索

            var searchName = $(this).prev('input').val();

            // 模糊搜索投票用户信息
            location.href = '/activity/superTeacherVote?search=' + searchName;
        })
        .on('click', '.btn-vote', function (e) { // 投票

            // 投票功能下线
            alert({
                title: '投票已关闭',
                content: '大众投票阶段已结束，感谢您的支持！',
                width: 400
            });

            /*
            var me = $(this);

            // 未登录事件的处理
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
                return;
            }

            service
            .superVoteAjax({
                number: me.data('number')
            })
            .done(function (response) {
                if (response.code === 0) {
                    if (response.data.status == 1) { // 第一次投票
                        Dialogs(me, response.data);
                    }
                    else { // 已经投过票
                        alert({
                            title: '温馨提示',
                            content: '您今天已经给这位老师投过票了，<br>去看看其他老师吧～',
                            width: 400,
                            buttons: [
                                {
                                    text: '好的',
                                    type: 'primary',
                                    handler: function () {
                                        // me.prop('disabled', false);
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                }
            });

            */
        });

        $('.join-btn')
        .click(function () { // 我要报名
            var loginDialog,
                btn = $(this);

            if (user.number) { // 已登陆
                if (user.type == 2) { // 学生
                    confirm({
                        title: '温馨提示',
                        content: '只有老师可以报名，是否切换为老师账户？',
                        buttons: [
                            {
                                text: '切换为老师账户',
                                type: 'primary',
                                handler: function () {
                                    window.location.href = '/user/switch_role?target_role=0&next=' + encodeURIComponent('/activity/superTeacher');
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
                }
                else { // 老师
                    if (btn.data('status') == '1') { // 1:用户已报名，2:用户未报名
                        window.location.href = '/activity/superTeacherPersonal?number=' + userNum;
                    }
                    else {
                        joinSuperTeacher();
                    }
                }
            }
            else { // 未登陆
                loginDialog = new LoginDialog({
                                onSuccess: function () {
                                    joinSuperTeacher();
                                }
                            });
            }
        });

        var bottom = $('.main');
        var backup = bottom.find('.backup');

        backup.click(
            function (e) {
                $('html,body').animate(
                    {
                        scrollTop: 0
                    },
                    1000,
                    'easeOutCirc'
                );

            }
        );

    };


});
