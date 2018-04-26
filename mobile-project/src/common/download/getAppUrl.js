/**
 * 获取app的下载地址
 */

;define(function (require, exports) {

    'use strict';
    //
    //var cookie = require('cobble/util/cookie');
    //var appController = require('common/app');
    //
    //var DOWNLOAD_URL = {
    //    ios: {
    //        student: {
    //            defualt: 'https://itunes.apple.com/cn/app/gen-shui-xue-zhao-lao-shi/id919947654?mt=8',
    //            weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.genshuixue.student'
    //        },
    //        teacher: {
    //            defualt: 'http://itunes.apple.com/cn/app/id912267275?mt=8"',
    //            weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bjhl.education'
    //        }
    //    },
    //    android: {
    //        student: {
    //            defualt: 'http://d.gsxservice.com/app/genshuixue.apk',
    //            iamxueba: 'http://d.gsxservice.com/app/genshuixue_iamxueba.apk',
    //            weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.genshuixue.student'
    //        },
    //        teacher: {
    //            defualt: 'http://d.gsxservice.com/app/genshuixue_teacher.apk',
    //            weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bjhl.education'
    //        }
    //    }
    //};

    //
    //return function (platform, type) {
    //    var source = cookie.get('DOWNLOAD_SOURCE');
    //    var isWeixin = appController.isWeixin();
    //
    //    platform = platform || 'android';
    //
    //    type = type || 'student';
    //
    //    var url = DOWNLOAD_URL[platform][type]['defualt'];
    //
    //    if (isWeixin) {
    //        source = 'weixin';
    //    }
    //
    //    if (source && DOWNLOAD_URL[platform][type][source]) {
    //        url = DOWNLOAD_URL[platform][type][source];
    //    }
    //
    //    return url;
    //}

    return function (platform, type) {
        var url = 'https://m.genshuixue.com/app/dw?ct=GenShuiXue_M2100013';
        if (type == 'teacher') {
            url += '&t=t';
        }
        return url;
    }

});