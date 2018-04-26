/**
 * @file 视频课管理
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var cookie = require('cobble/util/cookie');
    var dateUtil = require('cobble/util/date');
    var Image = require('common/component/Image');
    var VideoDialog = require('common/component/VideoDialog');
    var service = require('common/service');

    var ShareDialog = require('common/component/ShareDialog');

    var urlUtil = require('cc/util/url');

    var org_id = '';

    exports.init = function () {
        var vip_level = store.get('vip_level');
        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        //控制优选1对1tab的显示
        service
        .overviewAudit()
        .then(function (response) {
            if (response.data.manager_one_on_one_course_permission) {
                $('.tab-nav-info').find('.one2one-best').show();
            }
        });
        
        var container = $('#content');
        var appleTpl =
             '<div class="apple-dialog"> '
        +       '<div class="apple-content">根据苹果公司规定，学生在苹果手机上通过跟谁学客户端购买付费视频课，苹果公司会收取学生实付课酬金额的30%作为苹果渠道费。</div>'
        +       '<div class="apple-action">'
        +           '<button class="btn-primary btn-continue">继续开课</button>'
        +           '<a href="http://bbs.genshuixue.com/forum/postBrowse/14105" target="_blank" class="btn-default">查看详情</a href="www">'
        +           '<label class="donot-tips"><input type="checkbox" text="">不再提示</label>'
        +       '</div>'
        +    '</div>';
        var tpl =
          '<div class="attention">'
        +     '<div class="attention-content">'
        +         '<p class="indent head">跟谁学网站为入驻机构及老师提供售卖教学视频服务，机构及老师自行上传教学视频并使用跟谁学相关服务时，请遵守如下规定：</p>'
        +         '<div class="section">'
        +             '<h3>一、视频内容</h3>'
        +             '<p>机构及老师上传的视频内容应仅限于机构情况介绍、老师情况介绍及与教学相关的内容，</p>'
        +             '<p>其他与教学无关的内容请勿上传跟谁学网站。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>二、法律责任</h3>'
        +             '<p>1、机构及老师对上传视频内容的真实性、合法性、有效性承担法律责任。</p>'
        +             '<p>2、机构及老师对上传的视频应享有合法的、完整的著作权。</p>'
        +             '<p>3、视频内容如涉嫌违反法律规定或侵犯其他第三方著作权等合法权益的，由上传机构及老师独立承担法律责任。由此给跟谁学造成损失的，亦应对跟谁学承担赔偿责任。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>三、视频作品的定价及观看有效期</h3>'
        +             '<p>1、定价不符合市场规律或与品质相差悬殊导致付费用户投诉的，由机构及老师自行承担退费或赔偿责任。</p>'
        +             '<p>2、机构及老师上传的视频作品可以自行设置观看有效期，但所有付费用户的观看有效期均届满时，机构及老师方可删除该视频作品。</p>'
        +             '<p>3、视频作品的观看有效期可随时更改，但不得影响已付费用户的权益。</p>'
        +             '<p>4、机构及老师上传的视频作品如设置永久有效，且存在付款用户时，该视频作品无法删除。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>四、跟谁学权利</h3>'
        +             '<p>1、跟谁学如收到任何第三方声明相关视频侵犯其合法权益的维权通知，应及时告知相关机构及老师，同时，跟谁学有权删除相关侵权视频。</p>'
        +             '<p>2、机构及老师上传的视频如涉嫌包含违反法律规定或黄赌毒等内容，跟谁学有权立即删除相关视频。</p>'
        +             '<p>3、机构及老师如违反本须知规定，跟谁学有权终止向其提供服务。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>五、跟谁学免责声明</h3>'
        +             '<p>1、学生在浏览或付费观看相关视频作品时，如基于非其本人学习使用之目的而进行的拍摄、修改、复制、传播、盈利等行为，跟谁学均无法控制，亦不承担任何法律责任。</p>'
        +             '<p>2、机构及老师在跟谁学上传视频内容而导致任何第三方提出索赔要求或衍生的任何损害或损失，跟谁学不承担任何责任。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>六、跟谁学平台对视频课管理有解释和修订权</h3>'
        +             '<p class="indent">当前跟谁学对机构及老师售卖的视频作品不收取任何费用，未来如需收取技术服务等相关费用，跟谁学将在网站首页提前公告，机构及老师可选择接受或拒绝继续使用跟谁学服务。</p>'
        +         '</div>'
        +     '</div>'
        +     '<div class="attention-action">'
        +         '<button class="btn-primary btn-agree">同意</button>'
        +         '<button class="btn-default btn-cancel">不同意</button>'
        +         '<label class="no-tips"><input type="checkbox" text="">不再提示</label>'
        +     '</div>'
        + '</div>';
        var tplVideo =
          '<div class="attention">'
        +     '<div class="attention-content" style="overflow:auto;height:auto;">'
        +         '<p class="indent head">为了保障用户有更加流畅的视频观看体验，目前主流视频网站如优酷、乐视均会将用户上传的视频进行转码处理。跟谁学则会将用户上传的视频提交到乐视服务器进行转码处理。因为视频本身或者乐视服务器的原因，一些视频会转码失败。而转码失败的视频不能够在网站上成功播放。因而，跟谁学会校验用户上传的视频是否能够成功转码，而存在转码失败课节视频的课程则不能够成功发布。 </p>'
        +         '<div class="section">'
        +             '<h3>转码失败原因比较多，通常比较常见原因如下： </h3>'
        +             '<p>1、视频头信息（对视频进行解释说明的信息）出现问题；</p>'
        +             '<p>2、视频被二次处理过，在二次处理过程中，文件处理不规范；</p>'
        +             '<p>3、乐视服务器不稳定。</p>'
        +         '</div>'
        +         '<div class="section">'
        +             '<h3>如遇到转码失败的视频，跟谁学建议您：</h3>'
        +             '<p>1、可以再次或多次重新上传转码失败的课节视频；</p>'
        +             '<p>2、可以转换视频至其它格式后再次上传（可以使用网络上的格式转换器转换视频格式）；</p>'
        +             '<p>3、如果以上方案经多次尝试均不可行，请拨打跟谁学客服电话：4000-910-910，010-86448910。</p>'
        +         '</div>'
        +     '</div>'
        +     '<div class="attention-action">'
        +         '<button class="btn-primary btn-agree">继续编辑</button>'
        +     '</div>'
        + '</div>';

        container
        .on('click', '.dropdown', function (e) {
            var element = $(this);

            confirm({
                content: '确定要下架视频课么？<br>(下架后,付费学生在有效期内可以继续观看)',
                title: '温馨提示',
                width: 330
            })
            .done(function () {

                // 下架
                service
                .post(
                    '/video_course/setcourseonlinestatus',
                    {
                        number: element.data('number'),
                        status: 3
                    }
                )
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                    else {
                        alert('下架失败！')
                    }
                });

            });
        })
        .on('click', '.updown', function (e) {
            var element = $(this);

            // 上架
            service
            .post(
                '/video_course/setcourseonlinestatus',
                {
                    number: element.data('number'),
                    status: 1
                }
            )
            .done(function (response) {
                if (response.code === 0) {
                    alert({
                        title: '温馨提示',
                        content: '上架成功！',
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                    location.href = element.data('url');
                                }
                            }

                        ]
                    });

                }
            });

        })
        .on('click', ':checkbox', function (e) {
            var element = $(this);
            if (!element.prop('checked')){
                // 取消显示在主页
                service
                .saveVideoCourse({
                    userNumber: store.get('user').number,
                    number: element.data('number'),
                    type: 4
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('取消显示在个人主页成功');
                    } else {
                        alert('取消显示在个人主页失败！')
                    }
                });
            } else {
                /*var list = container.find(':checkbox');
                var counter = 0 ;
                list.each(function(i, item){
                    if ($(item).prop('checked')) {
                        counter++;
                    }
                });
                var count = parseInt(store.get('mainCount'));
                if (counter > count ) {
                    alert('最多只能设置3个视频课显示在个人主页');
                    return false;
                } else {*/
                    // 显示在主页
                    service
                    .saveVideoCourse({
                        userNumber: store.get('user').number,
                        number: element.data('number'),
                        type: 5
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('显示在个人主页成功');
                        } else {
                            alert('显示在个人主页失败！')
                        }
                    });
                //}
            }
        })
        .on('click', '.edit', function (e) {
            var element = $(this);
            var status = element.data('status');
            var videoStatus = element.data('videostatus');
            if (status != 2 && videoStatus == 2) {
                var dialog = new Dialog({
                    title: '什么是视频转码？',
                    content: tplVideo,
                    width: 800,
                    onBeforeShow: function () {
                        //this.element.off();去掉事件
                        var attention = $('.attention');
                        attention.find('.btn-agree').click(function(e){
                            dialog.hide();
                            location.href = element.prop('href');
                        });
                        attention.parent().parent().find('.dialog-close').click(function(e){
                            dialog.hide();
                            location.href = element.prop('href');
                        });
                    }
                });
                return false;
            }
            else {
                location.href = element.prop('href');
                return false;
            }
        })
        // 添加视频课弹出用户协议
        .on('click', '.add-video', function (e) {
            if(cookie.get('APPLECOIN')) {
                if (cookie.get('VIDEOCOURSENOTIP')) {
                    location.href ='/video_course/getcourseeditdetail?status=1';
                }
                else {
                    var dialog = new Dialog({
                        title: '视频上传须知',
                        content: tpl,
                        width: 800,
                        onBeforeShow: function () {
                            //this.element.off();去掉事件
                            var attention = $('.attention');
                            attention.find('.btn-agree').click(function(e){
                                dialog.hide();
                                location.href ='/video_course/getcourseeditdetail?status=1';
                            });
                            attention.find('.btn-cancel').click(function(e){
                                dialog.hide();
                            });
                            attention.find('.no-tips input').click(function(e){
                                var element = $(this);
                                if (element.is(':checked')) {
                                    var expireTime = dateUtil.add(new Date(), 365);
                                    cookie.set('VIDEOCOURSENOTIP', 1, {
                                        domain: '.genshuixue.com',
                                        expires: expireTime
                                    });
                                } else {
                                    cookie.remove(
                                        'VIDEOCOURSENOTIP',
                                        {
                                            domain: '.genshuixue.com'
                                        }
                                    );
                                }
                            })
                        }
                    });
                    return false;
                }
            }
            else {
                var appledialog = new Dialog({
                    title: '温馨提示',
                    content: appleTpl,
                    width: 300,
                    onBeforeShow: function(){
                        var Continue = $('.btn-continue');
                        Continue.click(function(e){
                             if (cookie.get('VIDEOCOURSENOTIP')) {
                                location.href ='/video_course/getcourseeditdetail?status=1';
                            }
                            else {
                                appledialog.hide();
                                var dialog = new Dialog({
                                    title: '视频上传须知',
                                    content: tpl,
                                    width: 800,
                                    onBeforeShow: function () {
                                        //this.element.off();去掉事件
                                        var attention = $('.attention');
                                        attention.find('.btn-agree').click(function(e){
                                            dialog.hide();
                                            location.href ='/video_course/getcourseeditdetail?status=1';
                                        });
                                        attention.find('.btn-cancel').click(function(e){
                                            dialog.hide();
                                        });
                                        attention.find('.no-tips input').click(function(e){
                                            var element = $(this);
                                            if (element.is(':checked')) {
                                                var expireTime = dateUtil.add(new Date(), 365);
                                                cookie.set('VIDEOCOURSENOTIP', 1, {
                                                    domain: '.genshuixue.com',
                                                    expires: expireTime
                                                });
                                            } else {
                                                cookie.remove(
                                                    'VIDEOCOURSENOTIP',
                                                    {
                                                        domain: '.genshuixue.com'
                                                    }
                                                );
                                            }
                                        })
                                    }
                                });
                                return false;
                            }
                        });
                        $('.donot-tips input').click(function(e){
                            var element = $(this);
                            if (element.is(':checked')) {
                                var expireTime = dateUtil.add(new Date(), 365);
                                cookie.set('APPLECOIN', 1, {
                                    domain: '.genshuixue.com',
                                    expires: expireTime
                                });
                            }
                            else {
                                cookie.remove(
                                    'APPLECOIN',
                                    {
                                        domain: '.genshuixue.com'
                                    }
                                );
                            }
                        })
                    }
                });
            }
        })
        .on('click', '.add-watermark', function (e) {
            if (vip_level < 3) {
                if (org_id == 0) {
                    alert({
                        title: '温馨提示',
                        content: '抱歉，您还不是超级会员，无法使用该功能。',
                        width: 320,
                        skinClass: 'watermark-dialog',
                        buttons: [
                            {
                                text: '升级超级会员',
                                type: 'error',
                                handler: function () {
                                    location.href = "/teacher_center/vip_center";
                                    this.hide();
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
                }
                else {
                    alert({
                        title: '温馨提示',
                        content: '抱歉，您还不是超级会员，请联系机构开通超级会员。',
                        width: 320,
                        skinClass: 'watermark-dialog',
                        buttons: [
                            {
                                text: '我知道了',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                }
            }
            else {
                location.href="/video_course/editwatermark"
            }
        })
        // 删除视频课
        .on('click', '.delete', function (e) {

                var element = $(this);
                var video_number = element.data('number');

                confirm({
                    title: '温馨提示',
                    content: '确认删除该视频课吗？',
                    width: 400
                })
                .then(function () {
                    var input = actionElement.find('input[type="checkbox"]');
                    service
                        .deletevideocourse({
                            number: video_number,
                            deleteMedia: input.prop('checked'),
                            act: 'delete'
                        })
                        .done(function (response) {
                            if(response.code == 0){
                                success('删除成功', function () {
                                    var length = $('.video-list .video-item').length;
                                    if (length > 1) {
                                        location.reload();
                                    }
                                    else {
                                        location.href = urlUtil.mixin({ page: 1});
                                    }
                                });
                            }
                        });
                });

                var actionElement = $('.dialog-confirm .dialog-action');
                actionElement.append(''
                    + '<label class="form-checkbox" style="margin-left: 10px">'
                    +     '<input type="checkbox">'
                    +     '是否删除视频'
                    + '</label>'
                );
        })
        // 撤销发布
        .on('click', '.undo', function (e) {

                var element = $(this);
                var video_number = element.data('number');

                dia('', '4', element, '您确定要撤销发布该课程？', video_number);
        })
        .on('click', '.roster', function (e) {
            var element = $(this);
            if(element.data('price') != 0) {
                if(vip_level == 0) {
                    if (org_id == 0) {
                        alert({
                            title: '温馨提示',
                            content: '视频课的花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦~',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '立即开通',
                                    type: 'error',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_center";
                                        this.hide();
                                    }
                                },
                                {
                                    text: '了解详情',
                                    type: 'default',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_detail?type=seeRoster";
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        alert({
                            title: '温馨提示',
                            content: '视频课的花名册只有会员才能查看，请联系机构开通会员',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    return false;
                }
            }
            else {
                if(vip_level == 0) {
                    if (org_id == 0) {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，超级会员还可享有优先推荐获得更多生源哦~',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '立即开通',
                                    type: 'error',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_center";
                                        this.hide();
                                    }
                                },
                                {
                                    text: '了解详情',
                                    type: 'default',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_detail?type=seeRoster";
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，请联系机构开通超级会员',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    return false;
                }
                else if(vip_level == 1) {
                    if (org_id == 0) {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，超级会员还可享有优先推荐获得更多生源哦~',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '立即开通',
                                    type: 'error',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_center";
                                        this.hide();
                                    }
                                },
                                {
                                    text: '了解详情',
                                    type: 'default',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_detail?type=seeRoster";
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，请联系机构开通超级会员',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }

                    return false;
                }
                else if(vip_level == 2) {
                    if (org_id == 0) {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，超级会员还可享有优先推荐获得更多生源哦~',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '立即开通',
                                    type: 'error',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_center";
                                        this.hide();
                                    }
                                },
                                {
                                    text: '了解详情',
                                    type: 'default',
                                    handler: function () {
                                        location.href = "/teacher_center/vip_detail?type=seeRoster";
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        alert({
                            title: '温馨提示',
                            content: '免费视频课的花名册只有超级会员才能查看，请联系机构开通超级会员',
                            width: 382,
                            skinClass: 'roster-dialog',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                    }

                    return false;
                }
            }
        });

        ShareDialog.init(container);

        /**
         * 弹窗
         * @param {string} type 1.已被购买 2. 可以删除 3.已经被添加 4.撤销发布
         * @return {Object}
         */
        function dia(text, type, target, msg, video_number){
            var text_tpl;
            if(type == 1){
                text_tpl = ''
                + '<div>'
                + '<p>'
                + msg
                + '</p>'
                + '<b class="btn-primary cancel">我知道了</b>'
                + '</div>'
            }
            else if(type == 2){
                text_tpl = ''
                + '<div>'
                + '<p>'
                + msg
                + '</p>'
                + '<b class="btn-primary">确定</b>'
                + '<b class="cancel kuai">取消</b>'
                + '</div>'
            }
            else if(type == 3){
                text_tpl = ''
                + '<div>'
                + '<p>'
                + msg
                + '</p>'
                + '<b class="btn-primary cancel">我知道了</b>'
                + '</div>'
            }
            else if(type == 4){
                text_tpl = ''
                + '<div>'
                + '<p>'
                + msg
                + '</p>'
                + '<b class="btn-primary">确定</b>'
                + '<b class="cancel kuai">取消</b>'
                + '</div>'
            }

            $('.dialog-mask').remove();
            $('.dialog').remove();

            var aa = new Dialog({
                title: '温馨提示',
                content: text_tpl,
                // reloading: reload,
                width: 300,
                skinClass: 'delete-undo',
                closeSelector: '.cancel',
                onBeforeShow: function (){

                    var me = $('.delete-undo');
                    me.find('.btn-primary').click(function(){
                        if (type == 2) {


                                var element = $(this);
                                service
                                .deletevideocourse({
                                    number: video_number,
                                    act: 'delete'
                                })
                                .done(function (response) {

                                    if(response.code == 0){

                                         success('删除成功');
                                         target.parent().parent().parent().remove();
                                         if($('.video-list .video-item').length == 0){
                                              location.reload();
                                         }

                                    }

                                });

                        }
                        if (type == 4) {

                                service
                                .cancelvideocourse({
                                    number: video_number
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                         success('撤销成功');
                                         location.reload();
                                    }else{
                                        // alert(response.msg);
                                    }

                                });
                        }

                    });

                }
            });

            $('.dialog-close').click(function(){
                aa.hide();
            });

            $('.btn-primary').click(function(){
                aa.hide();
            });
        }

    };

});