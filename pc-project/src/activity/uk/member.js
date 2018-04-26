/**
 * @file 中英交流大使
 * @author wx
 */



define(function(require, exports) {

    'use strict';

    var ukCommon = require('./common');

    var service = require('common/service');
    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');

    var compressImage = require('common/function/compressImage');

    var ShareDialog = require('common/component/ShareDialog');

    var Dialog = require('cobble/ui/Dialog');

    var lazyImage = require('common/lazyImage');

    exports.init = function (){

        ukCommon.init();

            var frozen = store.get('frozen');
            var user = store.get('user');

            if(frozen == 1){//被冻结
                var url = 'http://' + location.host + '/uk';
            }else{
                var url = 'http://' + location.host + '/uk/detail/' + store.get('number');
            }

        // 初始化分享
        $('a[data-share]').each(function () {

            var data = {
                'data-share-title': store.get('name') + '的主页-中英文化交流大使全国招募大赛',
                'data-share-content': store.get('name') + '的主页-中英文化交流大使全国招募大赛',
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
            img.data('src', url);
        });

        lazyImage.init();

        $('.vote-btn').on('click', function () {

            if(store.get('user').type == -1) {

                confirm('您要先登录才能投票哦').then(function () {
                    // 未登录
                    new LoginDialog({
                        showKefu: false,
                        registerPrefix: '/track/source?id=gsx_uk_pc&url=',
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                });
                return;
            }

            var btn = $(this);

            // 防止重复提交
            if (btn.attr('submiting')) {
                return;
            }
            btn.attr('submiting', true);

            var number = btn.data('number');
            service.post(
                '/uk/vote',
                {
                    number: number
                }
            ).then(function (response) {
                var data = response.data;

                btn.removeAttr('submiting');
                var has_pay = store.get('has_pay');
                var user_type = user.type;
                if(user_type == 2){ //学生跳到编辑页
                    var into_url = '/uk/edit';
                }
                else{ //老师跳到profile页
                    var into_url = '/uk/profile';
                }
                if (data.status == 0) {
                    //alert('投票成功！');
                    if(has_pay){
                        alert({
                            title: '温馨提示',
                            content: '投票成功，明天再来支持Ta哦',
                            buttons: [
                                {
                                text: '继续投票',
                                type: 'primary',
                                handler: function(){
                                    this.hide();
                                    }
                                }
                            ]
                        });
                    }
                    else{
                        confirm({
                            content:'投票成功，明天再来支持Ta哦',
                            title:'温馨提示',
                            width:400,
                            buttons:[
                                {
                                text: '继续投票',
                                type: 'primary',
                                handler: function(){
                                    this.hide();
                                    }
                                },
                                {
                                text:'我也要参加',
                                handler: function(){
                                    location.href = into_url;
                                    }
                                }
                            ]
                        });
                    }
                    btn.unbind('click').addClass('disable').text('已投票');

                    var countElement = btn.parents('.member-vote').find('.vote-count');

                    countElement.text(parseInt(countElement.text()) + 1);

                    var rank = data.rank;
                    $('#label-rank').text(rank);

                }
                else if (data.status == 1) {
                    alert('您今日已达到最大投票数！<br/>请明天再来（每日24:00刷新）');
                }
                else if (data.status == 2) {
                    alert('投票还没有开始！');
                }
                else if (data.status == 3) {
                    alert('投票已经截止！');
                }
                else if (data.status == 4) {
                    alert('您今天已经对此选手投过票了！');
                }

            });
        });

        var contentTpl = '<div class="report-type">' +
            '<ul>' +
            '<li><label><input type="radio" name="report-type" checked value="101"/>抄袭侵权</label></li>' +
            '<li><label><input type="radio" name="report-type" value="102"/>含有色情、反动内容</label></li>' +
            '<li><label><input type="radio" name="report-type" value="103"/>恶意侮辱他人、低价言论</label></li>' +
            '<li><label><input type="radio" name="report-type" value="104"/>其他</label></li>' +
            '</ul>' +

            '<div><textarea id="report-content" placeholder="您可以在这里输入更多描述"></textarea></div>' +
            '' +
            '<div class="report-button"><div class="uk-btn blue">提交</div></div>' +

            '</div>';

        $('#report-btn').on('click', function () {

            if(store.get('user').type == -1) {

                confirm('您要先登录才能举报哦').then(function () {
                    // 未登录
                    new LoginDialog({
                        showKefu: false,
                        registerPrefix: '/track/source?id=gsx_uk_pc&url=',
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                });
                return;
            }

            var dialog = new Dialog({
                title: '请选择您的举报理由',
                content: contentTpl,
                buttons: [
                    {
                        text: '123'
                    }
                ]
            });

            $('.report-button').off().on('click', function () {

                var num = store.get('number');
                var content = $('#report-content').val();
                var type = $('input[name=report-type]:checked').val();

                if (type == '104' && content == '') {
                    alert('请输入举报的内容！');
                    return;
                }
                service.post(
                    '/uk/report',
                    {
                        type: type,
                        number: num,
                        content: content
                    }
                ).then(function () {
                    dialog.dispose();
                    alert('感谢您的配合，<br/>我们将非常重视您的意见！');
                });
            });
        });

    };

});