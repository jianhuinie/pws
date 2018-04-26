/**
 * Created by jixiaohui on 15/11/11.
 */
define(function (require, exports) {

    'use strict';
    var store = require('common/store');
    // var VideoVod = require('common/component/VideoVod');
    // var video = $('#video');

    var resolutionHash = {
        'std': 1,
        'high': 2,
        'super': 3
    };
    var cdnHash = {
        'lx': '6',
        'dl': '5',
        'ws': '4',
        'bd': '3',
        'tx': '2',
        'al': '1',
    };

    // 初始化播放器
    function initPlayer (pageData) {
        var player = new bjcPlayer('.video-container', {
            token: pageData.token,
            withPlayList: false,
            customPlayerLogo: pageData.frameWater,
            onended: function () {
                // 播放完成触发
            },
            onplay: function () {
                //点击播放
            },
            onpause: function () {
                // 暂停
            },
            onerror: function (e) {
                console.log(e);
            }
        });

        player.play(pageData.vid);
    }

    //页面初始化完成后调用init函数
    //注意：store要在init后才可以get到php传出的数据
    exports.init = function () {
        var pageData;
        var frameWater = null;
        var videoInfo = store.get('video_info');
        if (videoInfo) {
            frameWater = videoInfo.watermark;
        }
        pageData = {
            token: store.get('token'),
            vid: store.get('vid'),
            frameWater: frameWater
        };
        initPlayer(pageData);

        // 方便m站跨域
        // document.domain = 'genshuixue.com';

        // var playCount = 0;
        // var report = store.get('report');
        // var videoInfo = store.get('video_info');

        // var cdn = (videoInfo && videoInfo.urls && videoInfo.urls[0]) ? cdnHash[videoInfo.urls[0].cdn] : '0';

        // m站video播放器
        // if (video[0]) {
        //     videoVod = new VideoVod({
        //         user_number: report.user_number, // 跟谁学主站用户的number
        //         user_role: report.user_role, // 跟谁学主站用户角色: 学生2 老师0
        //         video_type: report.video_type, //视频类型 1.免费视频课 2.收费视频课 3.老师介绍 4.机构介绍
        //         video_id: report.video_id, //视频ID标示
        //         client: report.client, //客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
        //         app: report.app, //app类型 1.学生app 2.老师app 3.机构app 4.直播助手
        //         resolution: (videoInfo && videoInfo.urls && videoInfo.urls[0]) ? resolutionHash[videoInfo.urls[0].definition] : '',//视频清晰度
        //         cdn: cdn, //cdn
        //         version: report.version //版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
        //     });

        //     var buffer_num = 0,//缓冲次数
        //         buffer_time = 0, //缓冲时间
        //         flagBuffer = false,//开始缓冲的标志
        //         flagPlay = false,//开始播放的标志
        //         playStartTime = 0,//点击播放按钮后的开始时间
        //         flagSeek = false,//拖拽的标志
        //         seekStartTime = 0,//拖拽的开始时间
        //         flagWait = false,//缓冲的标志
        //         waitStartTime = 0,//缓冲开始时间
        //         startPos = video[0].currentTime,//开始播放位置和
        //         endPos = 0,//2分钟后播放位置
        //         play_time = 0,//播放时长
        //         pause_time = 0,//暂停时长
        //         flagFirstPlay = true,//第一次播放标志
        //         flagFirstSeek = true;//第一次缓冲标志

        //     video

        //     //视频播放VV（击“播放”按钮时上报，info = 1）
        //     //统计视频在单位时间内的播放次数，只上报一次（注.视频课自动从第一集/节切换至第二集/节，算作两个VV）切换清晰度不算
        //     .on('play', function () {
        //         // 去掉视频背景图
        //         video.css('background', '');
        //         // var mUrl = 'http://m.genshuixue.com';
        //         // var locationUrl = location.origin;
        //         // if (locationUrl.indexOf('test') >= 0) {
        //         //     mUrl = 'http://test-m.genshuixue.com';
        //         // }
        //         // else if (locationUrl.indexOf('beta') >= 0) {
        //         //     mUrl = 'http://beta-m.genshuixue.com';
        //         // }
        //         // 去掉聚惠学广告位
        //         window.parent.postMessage('start play', '*');
        //         // m站第一次播放发送播放请求
        //         if (playCount < 1) {
        //             playCount++;
        //             window.parent.postMessage('first play', '*');
        //         }
                
        //         if (flagFirstPlay) {
        //             videoVod.send(1, cdn);
        //             playStartTime = (new Date()).getTime();
        //             flagPlay = true;
        //             flagFirstPlay = false;
        //         }
        //     })
        //     //视频realVV（缓冲结束，开始播放时上报，info = 2）
        //     //统计视频在单位时间内的real播放次数，只上报一次（注.视频课自动从第一集/节切换至第二集/节，算作两个VV）切换清晰度不算
        //     .on('timeupdate', function () {
        //         //开始播放之前的缓冲时间
        //         if (flagPlay) {
        //             videoVod.send(2, cdn, (new Date()).getTime() - playStartTime);
        //             flagPlay = false;
        //         }
        //         //拖拽的缓冲时间
        //         /*if (flagSeek) {
        //          var buffer_time = (new Date()).getTime() - seekStartTime;
        //          videoVod.send(7, cdn, buffer_time);
        //          flagSeek = false;
        //          }*/
        //     })
        //     //播放失败次数（播放失败上报，info = 4）
        //     //播放失败统计；开始播放失败+1；播放过程中缓冲超时+1；没有网络的播放失败不上报
        //     .on('error, abort', function () {
        //         videoVod.send(4, cdn, 3);
        //     })
        //     //播放第一次卡顿（播放缓冲第一次上报，info = 5）
        //     //（1）播放缓冲一次，就算一次卡顿（2）一个视频多次缓冲就算一次卡顿；（3）拖拽后缓冲不算卡顿
        //     // 和永智讨论，永智说缓冲只上报一次
        //     .on('waiting', function () {
        //         //拖拽缓冲不上报
        //         if (!flagSeek && flagFirstSeek) {
        //             videoVod.send(5, cdn);
        //             flagFirstSeek = false;
        //         }
        //         //buffer_num++;
        //         flagWait = true;
        //         waitStartTime = (new Date()).getTime();
        //     })
        //     //拖拽统计（用户拖拽后上报，info = 7）
        //     //用于统计拖拽，及拖拽后用户等待时间
        //     .on('seeked', function () {
        //         flagSeek = true;
        //         seekStartTime = (new Date()).getTime();
        //         //拖动之后开始位置要重新计算
        //         //startPos = video[0].currentTime;
        //     });
        //     //获取播放地址失败
        //     // if (!store.get('video_url')) {
        //     //     videoVod.send(4, cdn, 1);
        //     // }
        //     // video[0].src = store.get('video_url');
        //     // hurry: 伊利说统一使用getPlayInfo中url
        //     var playUrl = store.get('play_url');
        //     $
        //         .getJSON(playUrl)
        //         .then(function (res) {
        //             if (res.code === 0) {
        //                 var playInfo = res.data.play_info;
        //                 video[0].src = playInfo && playInfo.low.cdn_list[0].url;
        //             } else {
        //                 alert(res.msg);
        //             }
        //         }, function (res) {
        //             alert(res.msg);
        //         });
        //     //2分钟内缓冲次数（播放耗时2分钟即上报缓冲次数，info = 6）
        //     //用于统计缓冲率，评估视频播放卡顿的严重程度；play_time是不包括缓冲时间的；不满2分钟需要上报
        //     //视频播放耗时和时长，（播放结束时上报，info = 3），和许峥讨论后，在info=6中上报；
        //     //buffer_num    视频2分钟内缓冲次数
        //     //play_time   观看时长
        //     var interval = setInterval(function () {
        //         //endPos = video[0].currentTime;
        //         //var play_time = Math.abs(endPos - startPos);
        //         videoVod.send(6, cdn, play_time * 1000, buffer_num, pause_time * 1000);
        //         play_time = 0;//播放时间清0
        //         buffer_num = 0; //将缓冲次数清0
        //         pause_time = 0; //暂停时间清0
        //         //startPos = endPos; //记录初始播放时间点
        //         //如果播放已经结束就去掉定时器
        //         if (video[0].ended) {
        //             clearInterval(interval);
        //         }
        //     }, 120000);
        //     // 播放时长计时
        //     var playTimeInterval = setInterval(function () {
        //         endPos = video[0].currentTime;
        //         // 让播放时长的计算更准确一些,加上双重保障
        //         if (!video[0].paused && (endPos != startPos)) {
        //             play_time++;
        //             startPos = video[0].currentTime;
        //             //缓冲标志位去掉
        //             flagBuffer = false;

        //             //拖拽的缓冲时间，用这个定时器来进行计算
        //             if (flagSeek) {
        //                 buffer_time = (new Date()).getTime() - seekStartTime;
        //                 videoVod.send(7, cdn, buffer_time);
        //                 flagSeek = false;
        //             }

        //             //缓冲时间不超过16秒，超时就算是播放失败
        //             if (flagWait) {
        //                 if (((new Date()).getTime() - waitStartTime) >= 16000) {
        //                     videoVod.send(4, cdn, 2);
        //                 }
        //                 flagWait = false;
        //             }
        //         } else {
        //             //拖拽的瞬间和刚开始的缓冲不计入buffer_num之中
        //             if (!video[0].paused && !flagBuffer && !video[0].seeking && !flagPlay && !flagSeek &&
        //                 (endPos == startPos)) {
        //                 buffer_num++;
        //                 flagBuffer = true;
        //             }
        //             //记录暂停时间
        //             if (video[0].paused) {
        //                 pause_time++;
        //             }
        //         }
        //     }, 1000);
        // }

        // window.getFlash(store.get('video_id'), function (objectElement) {
        //     //pc端flash播放器\
        //     videoVod = new VideoVod({
        //         user_number: report.user_number, // 跟谁学主站用户的number
        //         user_role: report.user_role, // 跟谁学主站用户角色: 学生2 老师0
        //         video_type: report.video_type, //视频类型 1.免费视频课 2.收费视频课 3.老师介绍 4.机构介绍
        //         video_id: report.video_id, //视频ID标示
        //         client: report.client, //客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
        //         app: report.app, //app类型 1.学生app 2.老师app 3.机构app 4.直播助手
        //         resolution: objectElement.getDefinition(),//视频清晰度
        //         // cdn: (videoInfo && videoInfo.urls && videoInfo.urls[0]) ? cdnHash[videoInfo.urls[0].cdn] : 0, // cdn
        //         version: report.version //版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
        //     });
        //     VideoVod.getResolution = function () {
        //         return objectElement.getDefinition();
        //     };

        //     // 因为flash上报1的时候,js还没有加载,所以改成在js中上报1
        //     videoVod.send(1, cdn);
        // });
    };
});