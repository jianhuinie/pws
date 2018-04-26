/**
 * @file 中英交流大使-个人主页
 * @author wx
 */



define(function(require, exports) {

    'use strict';

    var ukCommon = require('./common');

    var store = require('common/store');
    var service = require('common/service');
    var compressImage = require('common/function/compressImage');

    var LoginDialog = require('common/component/LoginDialog');

    var ShareDialog = require('common/component/ShareDialog');


    exports.init = function (){

        ukCommon.init();

        var frozen = store.get('frozen');
        if(frozen == 1){//被冻结
            var url = 'http://' + location.host + '/uk';
        }else{
            var url = 'http://' + location.host + '/uk/detail/' + store.get('number');
        }

        // 初始化分享
        $('a[data-share]').each(function () {
            var data = {
                'data-share-title': '我在参加中英文化交流大使招募大赛​，差你一票我就可以去英国了！',
                'data-share-content': '100个英国游学名额，跟谁学“请客”带你造访知名学府；400个国际交流名额，与国外师生共进“文化盛宴” ',
                'data-share-url': url,
                'data-share-img': compressImage({
                    url: store.get('avatar'),
                    width: 150,
                    height: 150
                })
            };
            $(this).attr(data);
        });
        ShareDialog.init($('.share'));

        // 压缩头像照片
        $('.member-photo').each(function () {
            var img = $(this);
            var src = img.data('src');
            var url = compressImage({
                url: src,
                width: 150,
                height: 150
            });
            img.attr('src', url);
        });

        // 邀请好友
        $('#invite-friend').on('click', function () {
            alert('好友报名时，将您的编号（' + store.get('user').number + '）作为邀请编号，<br/>并成功报名，即可在比赛结束后退还您的复赛评审费')
        });

        // 确认参赛
        $('.join-btn').on('click', function () {
            sureToJoin();
        });

        // 支付评审费
        $('#pay-audit').on('click', function () {
            sureToPayAudit();
        });

        if(store.get('user').type == -1) {

            $('#btn-go-join').attr('href', 'javascript:').on('click', function () {
                showLogin()
            });

        }
        else if (store.get('user').type == 0) {

            // 前往报名，验证老师
            $('#btn-go-join').attr('href', 'javascript:').on('click', function () {
                ukCommon.changeRole();
            });

            // 编辑资料，验证老师
            $('.to-edit').attr('href', 'javascript:').on('click', function () {
                ukCommon.changeRole('你目前是老师身份，需要切换到学生身份才能编辑资料', '你目前是老师身份，无法编辑，是否开通学生身份？');
            });

            // 上传视频，验证老师
            $('.upload-btn').attr('href', 'javascript:').on('click', function () {
                ukCommon.changeRole(
                    '你目前是老师身份，需要切换到学生身份才能上传视频',
                    '你目前是老师身份，无法上传视频，是否开通学生身份？',
                    '/uk/upload'
                );
            });

            // 修改视频，验证老师
            $('#change-video').attr('href', 'javascript:').on('click', function () {
                ukCommon.changeRole(
                    '你目前是老师身份，需要切换到学生身份才能上传视频',
                    '你目前是老师身份，无法上传视频，是否开通学生身份？',
                    '/uk/upload'
                );
            });

        }

    };

    function showLogin() {
        new LoginDialog({
            showKefu : false,
            registerPrefix: '/track/source?id=gsx_uk_pc&url=',
            onSuccess: function(){
                location.reload();
            }
        });
    }

    /**
     * 保存视频
     */
    function saveVideo(data) {
        service.post(
            '/Activity/UkSaveUploadVideo',
            {
                fid: data.fid,
                media_id: data.media_id
            }
        ).then(function () {
            tipJoin();
        });
    }

    /**
     * 提示是否参赛
     */
    function tipJoin() {

        confirm({
            content: '您已上传视频，是否确认参赛？（需支付10元评审费）<br/>参赛后将无法修改资料和视频'
        }).then(function () {
            // 去支付
            doPay();
        });
    }

    /**
     * 提示是否参赛
     */
    function sureToJoin() {

        confirm({
            content: '是否确认参赛？（需支付10元评审费）<br/>参赛后将无法修改资料和视频'
        }).then(function () {
            // 去支付
            doPay();
        });
    }

    /**
     * 提示是否确定支付10元评审费
     */
    function sureToPayAudit() {

        var price = 10;

        if ($('.current-process').find('.step.disable').length == 2) {
            // 已经到了复赛
            price = 20;
        }

        confirm({
            content: '您需要支付评审费：' + price + '元，是否确认？'
        }).then(function () {
            // 去支付
            doPay();
        });
    }

    /**
     * 去支付
     */
    function doPay() {

        location.href = '/uk/pay';

        //service.post(
        //    '/pay/createUkPurchase',
        //    {}
        //).then(function (response) {
        //    var data = response.data;
        //    var userId = store.get('user').id;
        //    location.href = '/pay/payProductPurchase?purchase_id=' + data.purchase_id + '&user_id=' + userId;
        //});
    }

});