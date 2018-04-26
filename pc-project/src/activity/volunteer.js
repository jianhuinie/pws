/**
 * @file 活动页面 - 公益活动
 * @author liuxin
 */

define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');

    exports.init = function() {

        require(['common/component/baiduShare', 'cobble/helper/Popup'],function( baiduShare, Popup){

                var shareText = '牵手流浪儿童，共圆艺术之梦。@跟谁学 公开招募志愿老师，共赴爱心之旅，快来报名吧！';
                baiduShare.init({
                    text: shareText,
                    image: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b50d9db879a.jpg',
                    element: $('.baidu-share')
                });

                var container = $('#main');

                var popup = new Popup({
                    element: container.find('.press'),
                    layer: container.find('.baidu-share'),
                    show: {
                        trigger: 'click'
                    },
                    hide: {
                        trigger: 'click'
                    }
                });
        });

    };
});