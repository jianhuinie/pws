/**
 * @file 赢在校园【投票】
 * @author caoying
 */
define(function(require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var store = require('common/store');
    var service = require('common/service');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var Popup = require('cobble/helper/Popup');

    var content = $('.content');

    exports.init = function() {
        var user = store.get('user');
        var hasLogin = user.id;
        var url = location.href;
        var count = store.get('count');
        var share = content.find('.icon-share');

        var flag = url.substr(1).match('search_name');

        if ( count == 0 && flag != null ) {

            $(window).scrollTop(500);
            success( "没有符合该选手的相关信息！" );

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
        .on( 'click', '#student-search', function (e) {

            var searchName = content.find('.form-text').val();

            // 模糊搜索投票用户信息
            location.href = '/activity/vote?search_name=' + searchName;

        })

        .on( 'click', '.btn-vote', function (e) {

            var parent = $(this).closest('.vote-result');
            var userId = parent.find('.vote-user-id').text();

            // 未登录事件的处理
            if ( !hasLogin ) {

                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
            }

            // ajax 获取投票结果
            service
            .getVoteResult({
                user_id: userId
            })
            .done( function (response) {

                if ( response.code === 0 ) {

                    if ( response.msg == "投票成功") {
                        alert({
                            title: '温馨提示',
                            content: response.msg,
                            width: 400,
                            onAfterHide: function () {
                                location.reload();
                            }
                        });
                    }

                    else {
                        success( response.msg );
                    }
                }

            });

        })

    };
});