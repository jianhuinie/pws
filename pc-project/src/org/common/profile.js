/**
 * @file 机构资料
 * @author jixiaohui, zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    var container = $('#org-profile');
    var orgInfo = $('#org-info');
    var newInfo = $('#new-info');
    var certMedal = $('.cert-medal');
    var goldOrgProfile = $('.goldorg-profile');
    var goldOrgNav = $('.goldorg-nav');
    var Popup = require('cobble/helper/Popup');
    var RecoverDialog = require('common/component/RecoverDialog');
    var CallingDialog = require('common/component/CallingDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');
    var AdvisoryDialog = require('common/component/AdvisoryDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');
    var starPatch = require('common/component/starPatch');
    var store = require('common/store');
    var service= require('common/service');
    var bindScroll = require('common/bindScroll');
    var instance = require('cobble/util/instance');
    var header = require('common/main/component/header');

    var favorConfirm = function () {
        confirm({
            title: '温馨提示',
            content: '已经收藏过了，快去我的收藏看看吧',
            buttons: [
                {
                    text: '确定',
                    type: 'primary',
                    handler: function () {
                        // 跳转到机构收藏页面
                        this.hide();
                        location.href = '/collection/list/org';
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
    };

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

    //收藏
    function doFavor(element, favor, orgId, hasLogin,user) {
        element
        .on('click', '.favor', function(e) {
            if(favor) {
                favorConfirm.call(this);
            }
            else {
                // 未登录事件的处理
                if (!hasLogin) {

                    new LoginDialog({
                        onSuccess: function () {

                            // 调用Aiax请求，完成收藏
                            service
                            .addFavouriteAjax({
                                number: orgId,
                                type:'org'
                            },
                            {
                                errorHandler:{
                                    110101:function (response) {
                                        favorConfirm.call(this);
                                    }
                                }
                            })
                            .done( function (response) {
                                if(response.code == 0) {
                                    success('收藏成功');
                                    setTimeout(function(){
                                        location.reload();
                                    }, 1000);
                                }
                            });
                        }
                    });
                }
                else if (user.type === 0) {
                    new SwitchRoleDialog({
                        createText: '需要开通学生身份才能收藏该机构哦~现在开通？',
                        switchText: '需要切换学生身份才能收藏该机构哦~现在切换？',
                        switchTo: 'student',
                        onSuccess: function (data) {

                             // 调用Aiax请求，完成收藏
                            service
                            .addFavouriteAjax({
                                number: orgId,
                                type:'org'
                            },
                            {
                                errorHandler:{
                                    110101: function (response) {
                                        favorConfirm.call(this);
                                    }
                                }
                            })
                            .done( function (response) {
                                if(response.code == 0) {
                                    success('收藏成功');
                                    setTimeout(function(){
                                        location.reload();
                                    }, 1000);
                                }
                            });
                        }
                    });
                }
                else {
                    // 调用后才Ajax接口，传递收藏信息
                    service
                    .addFavouriteAjax({
                        number: orgId,
                        type:'org'
                    })
                    .done( function (response) {
                        if(response.code == 0) {
                            success('收藏成功');
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
                        }
                    });
                }

            }
        });
    }

    //分享
    function doShare(element) {
        new Popup({
            element: element.find('.social-share'),
            layer: element.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });
    }

    exports.init = function () {
        header.init();
        var close = $('#org-profile');
        var orgMsg = $('#org-msg');
        var orgNav = $('.org-nav');
        // var favor = container.find('.favor').data('favor');
        // var orgId = container.find('.favor').data('id');
        var favor = store.get('isFavored');
        var orgId = store.get('orgId');
        var user = store.get('user');
        var orgNum = store.get('orgnumber');
        var extension = '4000－910－910'; // 400电话

        var hasLogin;
        if (user) {
            hasLogin = user.number;
        }
        else {
            hasLogin = false;
        }


        // 初始化收藏样式
        if(hasLogin && user.type == 2 && favor == 1 ){
            container.find('.icon-favor').addClass('icon-collect');
            container.find('.favor').find('span').text('已收藏');
            //金牌机构
            goldOrgNav.find('.favor').addClass('favored');
            goldOrgNav.find('.favor').find('span').text('已收藏');
        }

        //初始化收藏状态 修复缓存bug补丁
        starPatch.init({type: 'org', number: store.get('orgnumber')}, $('#org-profile .favor'), 'icon-collect');
        starPatch.init({type: 'org', number: store.get('orgnumber')}, $('.goldorg-nav .favor'), 'favored');

        container
        /**
         * 纠错
         */
        .on('click', '.correct', function (e) {
            new RecoverDialog({type:'org'});
        })
        //点击二维码左上X号消失
        .on('click', '.two-dim-code .close', function (e) {
            container.find('.two-dim-code').hide();
        })

        //预约试听
        .on('click', '.btn-trial', function (e) { // 预约试听

            var target = $(e.currentTarget);
            extension = target.data('mobile'); // 获取400电话
            var haslogin = store.get('user').number > 0;

            var contentType = 'yunying.org_account';

            if (haslogin) { // 已登录用户
                if (store.get('user').type === 0) { // 老师

                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能预约试听';
                            }
                            else {
                                text = '你目前是老师身份，无法预约试听，是否开通学生身份？';
                            }
                            // 变更身份
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: function () {

                                    new AdvisoryDialog({
                                        title: '预约试听',
                                        objectNumber: orgNum,
                                        contentType: contentType,
                                        onSuccess: function () {
                                            // 身份切换，刷新页面
                                            location.reload();
                                        }
                                    });

                                },
                                noskip: false
                            });
                        }
                    });

                } else { // 学生

                    new AdvisoryDialog({
                        title: '预约试听',
                        objectNumber: orgNum,
                        contentType: contentType,
                    });
                }
            }
            else { // 未登录用户

                new AdvisoryDialog({
                    title: '预约试听',
                    objectNumber: orgNum,
                    contentType: contentType
                });
            }
        });

        doFavor(container, favor, orgId, hasLogin, user);

        // 点击右侧马上交谈弹出im
        orgMsg.click(function (e) {
            container.find('.chat-label').click();
        });

        doShare(container);

        if (orgNav[0]) {
            var top = orgNav.offset().top;
            var $window = instance.window;
            bindScroll($window, function (e) {
                if ($window.scrollTop() > top) {
                    orgNav.addClass('nav-fixed');
                } else {
                    orgNav.removeClass('nav-fixed');
                }
            }, 1);
        }

        // 异步获取机构访问量
        service
        .getOrgPv(
            {number: store.get('orgnumber')}
        )
        .done(function (response) {
            if (response.code === 0) {
                var viewcount = response.data.pv;
                newInfo.find('.visit-count').html(viewcount + '人看过');
                orgInfo.find('.visit-count').html(viewcount + '人看过');
                //金牌机构
                goldOrgProfile.find('.visit-amount').html(viewcount);
            }
        });

        // 异步获取机构学生数
        service
        .getOrgStudentsCount(
            {number: store.get('orgnumber')}
        )
        .done(function (response) {
            if (response.code === 0) {
                var studentsCount = response.data.students_count;
                newInfo.find('.students-count').html(studentsCount + "学生");
                orgInfo.find('.students-count').html("累计学生：" + studentsCount);
                //金牌机构
                goldOrgProfile.find('.student-amount').html(studentsCount);
            }
        });

        //金牌机构相关事件处理函数
        goldOrgProfile
        .on('mouseover', '.certification', function () {
            certMedal.show();
        })
        .on('mouseout', '.certification', function () {
            certMedal.hide();
        });

        //收藏
        doFavor(goldOrgNav, favor, orgId, hasLogin, user);

        //分享
        doShare(goldOrgNav);

    };

});