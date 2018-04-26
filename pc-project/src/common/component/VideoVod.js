/**
 * @file 视频统计上报
 * @author jixiaohui
 */
define(function (require) {

    'use strict';

    var store = require('common/store');

    var type = 'video_vod'; // 默认字段
    var user_number = ''; // 跟谁学主站用户的number
    var user_role = ''; // 跟谁学主站用户角色: 学生2 老师0
    var info = ''; // 信息类型
    var guid = WAT.getCookie('__guid__'); // 用户唯一标示，用于统计 UV string
    var video_type = ''; // 视频类型 1.免费视频课 2.收费视频课 3.老师介绍 4.机构介绍
    var video_id = ''; // 视频ID标示
    var client = ''; // 客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
    var app = ''; // app类型 1.学生app 2.老师app 3.机构app 4.直播助手
    var cdn = ''; // cdn渠道 1.阿里 2.腾讯 3.百度 4.网宿 5.帝联 6.蓝汛
    var net = ''; // 网络类型 1.pc 2.wifi 3.2G 4.3G 5.4G
    var resolution = ''; // 视频清晰度 1.流畅 2.清晰 3.高清
    var version = ''; // 版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
    var partner_id = '32891392'; // 合作方id 跟谁学业务的ID为固定值 （区分百家云和主站）


    //浏览器类型
    var browsers = {};
    var browser = '';
    browsers.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    browsers.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    browsers.opera = /opera/.test(navigator.userAgent.toLowerCase());
    browsers.msie = /msie/.test(navigator.userAgent.toLowerCase());
    browsers.safari = /safari/.test(navigator.userAgent.toLowerCase());

    if (browsers.opera) {
        browser = 1;
    } else if (browsers.msie) {
        browser = 2;
    } else if (browsers.webkit) {
        browser = 3;
    } else if (browsers.safari) {
        browser = 4;
    } else if (browsers.mozilla) {
        browser = 5;
    }

    /**
     * 播放视频对话框
     *
     * @constructor
     * @param {Object} options
     * @property {string} options.user_number  跟谁学主站用户的number
     * @property {number} options.user_role 跟谁学主站用户角色: 学生2 老师0
     * @property {number} options.info 信息类型
     * @property {string} options.guid 用户唯一标示，用于统计UV string
     * @property {number} options.video_type 视频类型 1.免费视频课 2.收费视频课 3.老师介绍 4.机构介绍
     * @property {number} options.video_id 视频ID标示
     * @property {number} options.client 客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
     * @property {number} options.app app类型 1.学生app 2.老师app 3.机构app 4.直播助手
     * @property {number} options.cdn cdn渠道 1.阿里 2.腾讯 3.百度 4.网宿 5.帝联 6.蓝汛
     * @property {number} options.browser 浏览器类型 1.opera 2.msie 3.chrome 4.applewebkit 5.firefox 6.mozilla
     * @property {number} options.net 网络类型 1.pc 2.wifi 3.2G 4.3G 5.4G
     * @property {number} options.resolution 视频清晰度 1.流畅 2.清晰 3.高清
     * @property {string} options.version 版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
     * @property {string} options._timestamp = Date.now() 随机值或时间戳防止缓存 必填
     */
    function VideoVod(options) {
        $.extend(this, VideoVod.defaultOptions, options);
        this.init();
    }

    VideoVod.prototype = {

        init: function () {
            var me = this;

            var env = store.get('env');
            if (env == 'dev' || env == 'test') {
                partner_id = '32891152';
            }
            else if (env == 'beta' || env == 'www'){
                partner_id = '32891392';
            }

            user_number = me.user_number;
            user_role = me.user_role;
            video_type = me.video_type;
            video_id = me.video_id;
            client = me.client;
            app = me.app;
            cdn = me.cdn;
            browser = me.browser;
            net = me.net;
            resolution = me.resolution;
            version = me.version;

            /*var data = {
             'type' : type,
             'user_number' : user_number,
             'user_role' : user_role,
             'info' : info,
             'guid' : guid,
             'video_type' : video_type,
             'video_id' : video_id,
             'client' : client,
             'app' : app,
             'cdn' : cdn,
             'browser' : browser,
             'net' : net,
             'resolution' : resolution,
             'version' : version,
             '_timestamp' : Date.now()
             }

             WAT.send(
             WAT.toUrl('pb0.genshuixue.com', '/gs.gif'),
             data
             );*/
        },
        /*
         * 上传统计信息，对外接口
         * 2016-06-23 新增cdn参数 wangyujie
         */
        send: function (info, cdn, arg1, arg2, arg3) {
            var me = VideoVod.prototype;

            var _data = {
                'type': type,
                'user_number': user_number,
                'user_role': user_role,
                'info': info,
                'guid': guid,
                'video_type': video_type,
                'video_id': video_id,
                'client': client,
                'app': app,
                'cdn': cdn,
                'browser': browser,
                'net': net,
                'resolution': VideoVod.getResolution ? VideoVod.getResolution() : resolution,
                'version': version,
                'partner_id': partner_id,
                '_timestamp': Date.now()
            }


            if (info == 1) { // 视频播放VV（击“播放”按钮时上报，info = 1）

            } else if (info == 2) { // 视频realVV（缓冲结束，开始播放时上报，info = 2）
                _data['buffer_time'] = arg1;
            } else if (info == 4) { // 播放失败次数（播放失败上报，info = 4）
                _data['error_code'] = arg1;
            } else if (info == 5) { // 播放第一次卡顿（播放缓冲第一次上报，info = 5）

            } else if (info == 6) { // 2分钟内缓冲次数（播放耗时2分钟即上报缓冲次数，info = 6）
                // 视频播放耗时和时长，（播放结束时上报，info = 3），和许峥讨论后，在info=6中上报；
                _data['play_time'] = arg1;
                _data['buffer_num'] = arg2;
                _data['pause_time'] = arg3;
            } else if (info == 7) { // 拖拽统计（用户拖拽后上报，info = 7）
                _data['buffer_time'] = arg1;
            } else if (info == 8) { // 视频上传信息（视频上传成功及上报，info = 8）
                _data['file_size'] = arg1;
                _data['file_time'] = arg2;
            } else if (info == 9) { // 上传文件失败次数（上传失败及上报，info = 9）

            }
            WAT.send(
                WAT.toUrl('pb0.genshuixue.com', '/gs.gif'),
                _data
            );
        }

    };

    VideoVod.defaultOptions = {
        type: 'video_vod', // 默认字段
        user_number: '', // 跟谁学主站用户的number
        user_role: '', // 跟谁学主站用户角色: 学生2 老师0
        info: '', // 信息类型
        guid: WAT.getCookie('__guid__'), //用户唯一标示，用于统计UV string
        video_type: '', //视频类型 1.免费视频课 2.收费视频课 3.老师介绍 4.机构介绍
        video_id: '', //视频ID标示
        client: '', //客户端类型1.iphone 2.ipad 3.Android 4.手机M站 5.PC网页
        app: 0, //app类型 1.学生app 2.老师app 3.机构app 4.直播助手
        cdn: '', //cdn渠道 1.阿里 2.腾讯 3.百度 4.网宿 5.帝联 6.蓝汛
        browser: browser, //浏览器类型 1.opera 2.msie 3.chrome 4.applewebkit 5.firefox 6.mozilla
        net: '', //网络类型 1.pc 2.wifi 3.2G 4.3G 5.4G
        resolution: '', //视频清晰度 1.流畅 2.清晰 3.高清
        version: '', //版本号 包括: pc版本号、前端版本号、app版本号、ipad版本号
        partner_id: partner_id,
        _timestamp: $.now() //随机值或时间戳防止缓存 必填
    };


    return VideoVod;

});