/**
 * @file 班级花名册
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';
    var store = require('common/store');
    var service = require('common/service');
    var org_id;

    var vipTip = function(vip,course,done) {
        var content;
        if (vip == 0) {
            content = done +course+'花名册功能只有会员才能使用，会员还可享有优先推荐获得更多生源哦~';
            vip = vip + 1;
        }
        else if (vip == 1) {
            content = done +course+'花名册功能只有高级会员才能使用，高级会员还可享有优先推荐获得更多生源哦~';
            vip = vip + 1;
        }
        alert({
            title: '温馨提示',
            content: content,
            width: 382,
            skinClass: 'vip-dialog',
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
    var OrgvipTip = function(vip,course,done) {
        var content;
        if (vip == 0) {
            content = done +course+'花名册功能只有会员才能使用，请联系机构开通会员~';
            vip = vip +1;
        }
        else if (vip == 1) {
            content = done +course+'花名册功能只有高级会员才能使用，请联系机构开通高级会员~';
            vip = vip+1;
        }
        alert({
            title: '温馨提示',
            content: content,
            width: 382,
            skinClass: 'vip-dialog',
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

    exports.init = function () {
        var container = $('#main');

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        $('.no-selection').each(function () {
            this.onselectstart = function () {
                return false;
            };
        });
        if(store.get('vip_level') == 0) {
            container.find('.card').addClass('no-selection');
        }
        else if (store.get('vip_level') == 1) {
            var copy = container.find('.no-copy');
            if(copy.length != 0) {
                container.find('.card').addClass('no-selection');
            }
        }

        container
        .on('click', '.only-local', function () { // 只看本地学生
            var url = location.href;
            if ($(this).find('input[name="local"]').prop('checked')) {
                location.href = url + '&show_local=1&page=1';
            }
            else {
                location.href = url.replace('&show_local=1', '');
            }
        })
        .on('click', '.one2one-down', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'一对一课程','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'一对一课程','下载');
                    return false;
                }
            }
        })
        .on('click', '.free-online-class', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费直播课','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费直播课','下载');
                    return false;
                }
            }
            else if (store.get('vip_level') == 1) {
                if(org_id == 0) {
                    vipTip(1,'免费直播课','下载');
                    return false;
                }
                else {
                    OrgvipTip(1,'免费直播课','下载');
                    return false;
                }

            }
        })
        .on('click', '.free-underline-class', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费班课','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费班课','下载');
                    return false;
                }
            }
        })
        .on('click', '.class-down', function() {
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if (store.get('vip_level') == 0) {
                if (org_id == 0) {
                    vipTip(0,'班课','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'班课','下载');
                    return false;
                }
            }
        })
        .on('click', '.video-free-down', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费视频课','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费视频课','下载');
                    return false;
                }
            }
            else if(store.get('vip_level') == 1) {
                if(org_id == 0) {
                    vipTip(1,'免费视频课','下载');
                    return false;
                }
                else {
                    OrgvipTip(1,'免费视频课','下载');
                    return false;
                }
            }
            else if(store.get('vip_level') == 2) {
                if(org_id == 0) {
                    vipTip(2,'免费视频课','下载');
                    return false;
                }
                else {
                    OrgvipTip(2,'免费视频课','下载');
                    return false;
                }
            }
        })
        .on('click', '.video-down', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'download',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'视频课','下载');
                    return false;
                }
                else {
                    OrgvipTip(0,'视频课','下载');
                    return false;
                }
            }
        })
        .on('click','.free-online-class-print',function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费直播课','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费直播课','打印');
                    return false;
                }
            }
            else if (store.get('vip_level') == 1) {
                if(org_id == 0) {
                    vipTip(1,'免费直播课','打印');
                    return false;
                }
                else {
                    OrgvipTip(1,'免费直播课','打印');
                    return false;
                }
            }
        })
        .on('click','.free-underline-class-print',function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费班课','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费班课','打印');
                    return false;
                }
            }
        })
        .on('click', '.one2one-print', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'一对一课程','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'一对一课程','打印');
                    return false;
                }
            }
        })
        .on('click', '.class-print', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'班课','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'班课','打印');
                    return false;
                }
            }
        })
        .on('click', '.video-free-print', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'免费视频课','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'免费视频课','打印');
                    return false;
                }
            }
            else if(store.get('vip_level') == 1) {
                if(org_id == 0) {
                    vipTip(1,'免费视频课','打印');
                    return false;
                }
                else {
                    OrgvipTip(1,'免费视频课','打印');
                    return false;
                }
            }
            else if(store.get('vip_level') == 2) {
                if(org_id == 0) {
                    vipTip(2,'免费视频课','打印');
                    return false;
                }
                else {
                    OrgvipTip(2,'免费视频课','打印');
                    return false;
                }
            }
        })
        .on('click', '.video-print', function(){
            var url = 'http://pb0.genshuixue.com/gs.gif';
            var params = {
                type: 'course_roster',
                stype: 'print',
                course_number: store.get('course_number'),
                course_type: store.get('course_type'),
                org_id: org_id,
                vip_level: store.get('vip_level')
            };
            WAT.send(url, params);

            if(store.get('vip_level') == 0) {
                if(org_id == 0) {
                    vipTip(0,'视频课','打印');
                    return false;
                }
                else {
                    OrgvipTip(0,'视频课','打印');
                    return false;
                }
            }
        });


    };

});