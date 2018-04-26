/**
 * 风云老师大赛 2016
 * @author wangyujie
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');
    var VideoDialog = require('common/component/VideoDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var store = require('common/store');
    var service = require('common/service');
    var user, userNum;

     /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarouse() {
        return new Slider({
            element: $('.promotion-slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150
        });
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

    exports.init = function () {

        user = store.get('user');
        userNum = user.number;

        initCarouse();

        $('.promotion-slider-container')
        .on('click', '.promotion-slideritem', function () { // 视频幻灯
            var target = $(this);
            new VideoDialog({
                title: target.data('videoTitle'),
                url: target.data('video')
            });
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
    };

});