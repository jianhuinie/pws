/**
 * shubaiqiao
 */

define(function(require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var env = require('util/env');
    var app = require('common/app');
    var log = require('common/liudanClickLog/liudanClickLog');

    // 调起成为校友功能
    var beSchoolMate = function () {
        var Akey = '1qt3IKo8ZY2nx6Z-FXnUw1c352E88i98';
        var joinUrl = 'https://qm.qq.com/cgi-bin/qm/qr?from=app&p=android&k=1qt3IKo8ZY2nx6Z-FXnUw1c352E88i98';
        var schoolJoin = $('.button');
        schoolJoin.on('click', function () {
            log.send({
                type: 'core_client',
                detail_url: location.href,
                stype: 1
            });
            if (app.isApp()) {
                if (app.isStudentApp() && env.os.isAndroid) {
                    Jockey.send('joinQQGroup', {
                        key: Akey
                    });
                } else {
                    app.openNewWindow(joinUrl);
                }
            } else {
                location.href = joinUrl;
            }
        });
    };

    return function (){
        lazyLoadImage.init();
        // 为分享留的代码
        /*var shareInfo = {
            title : '学费卫士 学费安全有保障 ',
            content : '对学费进行双重保障，官方托管资金，保证随时退款',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/575e4cb34b078.png'
        };
        setShare(shareInfo);*/

    // 调起成为校友窗口
        beSchoolMate();
    };
});