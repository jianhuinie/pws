/**
 * Created by chenmo on 16/2/19.
 * 下载or打开app的弹窗
 */
define(function (require) {

    var app = require('common/app');
    var appDownload = require('common/app_download');
    var env = require('util/env');
    var ui = require('common/ui');


    var url = appDownload({
        type: 'student'
    });


    var whenClickLinks = function (callback) {
        callback();
    };

    return function () {
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var isBaiduZhidahao = (env.source == 'baidu_zhidahao') ? 1 : 0;
        if (isBaiduZhidahao) {
            ui.alert('请在电脑端打开跟谁学网站继续操作');
            return;
        }


        if (isWeixin) {
            location.href = appDownload({
                type: 'student'
            });
        }
        else {
            var content;
            content = "移动站点暂不支持咨询功能，请下载跟谁学APP进行咨询";

            location.href = 'bjhlstudent://o.c';
            ui.confirm({
                content: content
            }).done(function () {
                if (isBaiduZhidahao) {
                    ui.alert('抱歉，在百度直达号或轻应用中，我们无法为你打开客户端');
                }
                else {
                    location.href = url;
                }
            });

        }
    };
});
