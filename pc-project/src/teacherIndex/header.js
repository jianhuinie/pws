define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var LoginDialog = require('common/component/LoginDialog');
    var RecoverDialog = require('common/component/RecoverDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var BanLessonDialog = require('common/component/BanLessonDialog');

    var TrialDialog = require('common/component/TrialDialog');
    var orgAdvisoryDialog = require('common/component/AdvisoryDialog');
    var leaveMessageDialog = require('common/component/LeaveMessageDialog');

    var ShareDialog = require('common/component/ShareDialog');
    var qrcode = require('common/component/qrcode');
    var store = require('common/store');
    var service = require('common/service');
    var bindScroll = require('common/bindScroll');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var instance = require('cobble/util/instance');
    var cookie = require('cobble/util/cookie');
    require('./search');
    var $window = instance.window;

    var container = $('#content');
    var teacherHeader = $('#content').find('.teacher-header');

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
    function teacherTabFixed(){
        var height = container.find('.teacher-header .teacher-link').offset().top + 40;

        var done = function(){
            if(pageScrollTop() > height){
                $('#teacher-info-scroll').show();
            }else{
                $('#teacher-info-scroll').hide();
            }
        };
        done();
        bindScroll($window, done ,1);
    }

    exports.init = function () {

        teacherTabFixed();

        qrcode({
            text: location.href,
            element: container.find('.qrcode'),
            width: 87,
            height: 87
        });

        // 获取用户登录信息
        service
        .getUserBasicInfo(null)
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;

                if (data.user_number) {
                    store.set('haslogin', true);
                    var favor = container.find('#favor');
                    favor.data('haslogin', true);

                    // 如果是老师自己登录
                    if (data.user_number == store.get('teacherNum') && data.user_type == 0) {
                        // 显示编辑按钮
                        //teacherProfile.find('.edit').show();
                        // 显示收藏
                        if (store.get('isFavored') && data.user_type == 2) {
                            favor.find('.icon-favor').addClass('hasfavored');
                            favor.find('span').html('已收藏');
                        }
                    }

                } else {
                    store.set('haslogin', false);
                }
            } else {
                store.set('haslogin', false);
            }
        });

        service
        .getTeacherViewAjax({
            number: store.get('teacherNum')
        })
        .done(function (response) {
            if (response.code === 0) {
                var viewcount = response.data.view_count;
                container.find('.visit-count').html('（'+viewcount+'人看过）');
            }
        });

        ShareDialog.init(teacherHeader)

        container
        .on('mouseover','.teacher-info-button-more', function (e) {
            $('.teacher-info-button-more-content').show();
        })
        .on('mouseout','.teacher-info-button-more', function (e) {
            $('.teacher-info-button-more-content').hide();
        })
        .on('click','.teacher-info-button-listen',function () { // 预约试听

            var haslogin = store.get('haslogin');
            var trialCourseStatus = store.get('trialCourseStatus');
            var isOrgTeacher = store.get('org_id'); // 为0即非机构老师
            var teacherNum = store.get('teacherNum');

            var isOneOnOneTeacher = store.get('is_one_on_one_teacher'); //是否是一对一老师
            var isSendToteacher = true;  //留单至老师
            var channelValue = '';
            if (isOneOnOneTeacher) { //如果是一对一老师，则留单至客服, 则channelValue为'youxuan_teacher_pc'
                isSendToteacher = false;
                channelValue = 'youxuan_teacher_pc';
            }

            if (trialCourseStatus != -1) {// 老师有试听课 － 购买逻辑
                if(haslogin){
                    /*
                    if (store.get('teacherNum') == store.get('user').number) {
                        alert({ title: '温馨提示',
                            content: '您不能购买自己的课哦~',
                            buttons: [{
                                text: '我知道了',
                                type: 'primary',
                                handler: function(){
                                    this.hide();
                                }
                            }]
                        });
                        return ;
                    }
                    */
                    if (store.get('user').type !== 2) {
                        service
                        .getUserType()
                        .done(function (response) {
                            if (response.code === 0) {
                                var roles = response.data.roles;
                                var hasStudentRole = getHasStudentRole(roles);
                                var text = '';

                                if (hasStudentRole) {
                                    text = '你目前是老师身份，需要切换到学生身份才能向TA约课';
                                }
                                else {
                                    text = '你目前是老师身份，无法向TA约课，是否开通学生身份？';
                                }

                                //约课 变更身份后需要刷新当前页面
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
                    }
                    else {
                        new TrialDialog({
                            data: {
                                length: store.get('trial').data.length/60,
                                lesson_way: store.get('trial').data.lesson_way,
                                price_online: store.get('trial').data.price_online,
                                price_offline: store.get('trial').data.price_offline,
                            }
                        });
                    }
                }
                else{
                    new LoginDialog({
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                    return;
                }
            }
            else { // 老师未设置试听课 － 留单逻辑
                if (haslogin && store.get('user').type == 0) { // 已登录老师身份
                    service
                    .getUserType()
                    .done(function (response) {
                        if (response.code === 0) {
                            var roles = response.data.roles;
                            var hasStudentRole = getHasStudentRole(roles);
                            var text = '';

                            if (hasStudentRole) {
                                text = '你目前是老师身份，需要切换到学生身份才能' + '预约';
                            }
                            else {
                                text = '你目前是老师身份，无法' + '预约' + '，是否开通学生身份？';
                            }
                            // 变更身份
                            new BanLessonDialog({
                                text: text,
                                hasStudentRole: hasStudentRole,
                                next: '0',
                                onSuccess: function () {
                                    if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师
                                        new orgAdvisoryDialog({
                                            title: '预约',
                                            objectNumber: teacherNum,
                                            contentType: 'cdb.teacher',
                                            onSuccess: function () {
                                                // 身份切换，刷新页面
                                                location.reload();
                                            }
                                        });
                                    }
                                    else { // 预约试听 － 个体老师
                                        new leaveMessageDialog({ 
                                            teacher: 'teacher',
                                            teacherNum: store.get('teacherNum'),
                                            sendToteacher: isSendToteacher,
                                            skinClass: 'leave-message-detail',
                                            channel: channelValue,
                                            oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                                            onSuccess: function () {
                                                // 身份切换，刷新页面
                                                location.reload();
                                            }
                                        });
                                    }
                                },
                                noskip: false
                            });
                        }
                    });
                }
                else { // 未登录用户 及 学生身份用户
                    if (isOrgTeacher && !isOneOnOneTeacher) { // 预约试听 － 是机构老师并且不是一对一老师
                        new orgAdvisoryDialog({
                            title: '预约',
                            objectNumber: teacherNum,
                            contentType: 'cdb.teacher',
                            onSuccess: function () {
                                // 身份切换，刷新页面
                                location.reload();
                            }
                        });
                    }
                    else { // 预约试听 － 个体老师
                        new leaveMessageDialog({ 
                            teacher: 'teacher',
                            teacherNum: store.get('teacherNum'),
                            sendToteacher: isSendToteacher,
                            skinClass: 'leave-message-detail',
                            channel: channelValue,
                            oneOnOneTeacherMobile: store.get('one_on_one_teacher_mobile'),
                            onSuccess: function () {
                                // 身份切换，刷新页面
                                location.reload();
                            }
                        });
                    }
                }
            }

        });

        //上报函数
        function report() {
            var params = {
                teacher_number:store.get('teacherNum'),
                user_id:store.get('userId') || "",
                track_id: cookie.get('__track_id__'),
                comment_type:store.get('type')|| '1',
                //comment_tag:'',
                comment_tag:store.get('commentTag_name')|| "",
                comment_tag_num:store.get('commentTag_count')|| "",
                dsp:'1',
                city_id:cookie.get('CITY_ID'),
                source: '2',
                type: 'comment',
                page: store.get('page'),
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        }

        teacherHeader
        .on('click', '.teacher-link-item-comment', function (e) {

          report();
            //alert(1);
         })
        .on('click', '.teacher-info-use-model', function (e){// 使用此模板
            if(store.get('haslogin')){
                //是会员
                if(store.get('user').vip_level){
                    if(store.get('user').vip_level >= store.get('templateLevel')) {
                        confirm({
                            title: '使用此模板',
                            content: '确定要使用该会员模板吗？',
                            skinClass: 'user-model-dialog',
                            width: '300px',
                            buttons: [
                                {
                                    text: '去设置',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        location.href = '/teacher_center/index_decorate';
                                    }
                                },
                                {
                                    text: '取消',
                                    type: 'default',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }else{
                        //等级不足
                        var content= '<div class="vip-content"> <div class="content">此模板需更高等级会员用户才能使用</div><div class="buttons"><a class="btn-primary" href="/teacher_center/vip_center" target="_blank">开通会员</a><a class="btn-default">我知道了</a></div></div>';
                        var dialog = new Dialog({
                            title: '使用此模板',
                            content: content,
                            skinClass:'use-model-dialog'
                        });
                        dialog.element
                            .on('click','.btn-primary',function(){
                                dialog.hide();
                            })
                            .on('click','.btn-default', function(){
                                dialog.hide();
                            })
                    }
                }else{
                    var content= '<div class="vip-content"> <div class="content">此模板仅会员用户可用</div><div class="buttons"><a class="btn-primary" href="/teacher_center/vip_center" target="_blank">开通会员</a><a class="btn-default" href="/teacher_center/vip_center" target="_blank">了解详情</a></div></div>';
                    var dialog = new Dialog({
                        title: '使用此模板',
                        content: content,
                        skinClass:'use-model-dialog'
                    });
                    dialog.element
                        .on('click','.btn-primary',function(){
                            dialog.hide();
                        })
                        .on('click','.btn-default', function(){
                            dialog.hide();
                        })
                }
            }else{
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            }
        })

        .on('click', '.button-correct', function (e) {// 纠错
            new RecoverDialog();
        })
        .on('mouseover','.mobile-see',function (e){// 用手机看
            container.find('.qrcode-container').show();
        })
        .on('mouseout','.mobile-see',function(){
            container.find('.qrcode-container').hide();
        })
        .on('click' , '#favor' , function (e) {// 添加,取消收藏老师
            var element = $(this);
            var teacherid = element.data('teacherid');
            var haslogin = store.get('haslogin');
            var text = element.text();
            //登录或身份变更成功后 需要发收藏请求 并刷新当前页面

            if(text.trim() == "收藏") {

                if (haslogin) {

                    if (store.get('user').type === 0) {
                        new SwitchRoleDialog({
                            createText: '需要开通学生身份才能收藏该老师哦~现在开通？',
                            switchText: '需要切换学生身份才能收藏该老师哦~现在切换？',
                            switchTo: 'student',
                            onSuccess: function (data) {
                                if (teacherid) {
                                    service
                                        .addFavouriteTeacher(
                                        teacherid,
                                        {
                                            errorHandler:{
                                                1:function (response){
                                                    confirm({
                                                        title: "温馨提示",
                                                        content: "已经收藏过了，快去我的收藏看看吧",
                                                        buttons: [
                                                            {
                                                                text: '确定',
                                                                type: 'primary',
                                                                handler: function () {
                                                                    // 跳转到老师收藏页面
                                                                    this.hide();
                                                                    location.href = "/student_center/favourite";
                                                                }
                                                            },
                                                            {
                                                                text: '取消',
                                                                handler: function () {
                                                                    this.hide();
                                                                    result.reject();
                                                                }
                                                            }
                                                        ]
                                                    });
                                                }
                                            }
                                        })
                                        .done(function (response) {
                                            if (response.code === 0) {
                                                success("收藏成功");
                                                setTimeout(function(){
                                                    location.reload();
                                                }, 1000);
                                            }
                                        });
                                }
                            }
                        });
                    }
                    else {
                        if (teacherid) {
                            service
                                .addFavouriteTeacher(
                                teacherid,
                                {
                                    errorHandler:{
                                        1:function (response){
                                            confirm({
                                                title: "温馨提示",
                                                content: "已经收藏过了，快去我的收藏看看吧",
                                                buttons: [
                                                    {
                                                        text: '确定',
                                                        type: 'primary',
                                                        handler: function () {
                                                            // 跳转到老师收藏页面
                                                            this.hide();
                                                            location.href = "/student_center/favourite";
                                                        }
                                                    },
                                                    {
                                                        text: '取消',
                                                        handler: function () {
                                                            this.hide();
                                                            result.reject();
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        success("收藏成功");
                                        setTimeout(function(){
                                            location.reload();
                                        }, 1000);
                                    }
                                });
                        }
                    }
                }
                // 未登录
                else {
                    new LoginDialog({
                        onSuccess: function () {
                            // 调用Aiax请求，完成收藏
                            service
                                .addFavouriteTeacher(
                                teacherid,
                                {
                                    errorHandler:{
                                        1:function (response){
                                            confirm({
                                                title: "温馨提示",
                                                content: "已经收藏过了，快去我的收藏看看吧",
                                                buttons: [
                                                    {
                                                        text: '确定',
                                                        type: 'primary',
                                                        handler: function () {
                                                            // 跳转到老师收藏页面
                                                            this.hide();
                                                            location.href = "/student_center/favourite";
                                                        }
                                                    },
                                                    {
                                                        text: '取消',
                                                        handler: function () {
                                                            this.hide();
                                                            result.reject();
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        success("收藏成功");
                                        setTimeout(function(){
                                            location.reload();
                                        }, 1000);
                                    }
                                });
                        }
                    });
                }
            }
            else {
                if (teacherid) {

                    confirm({
                        title: "温馨提示",
                        content: "已经收藏过了，快去我的收藏看看吧",
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    // 跳转到老师收藏页面
                                    this.hide();
                                    location.href = "/student_center/favourite";
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    this.hide();
                                    result.reject();
                                }
                            }
                        ]
                    });
                }
            }
        });

    };
});