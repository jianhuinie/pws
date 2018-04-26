/**
 * @file 玩转直播室js
 * @author tangrongyan
 */

define(function(require, exports) {

    'use strict';
    var store = require('common/store');


    exports.init = function() {

        var download = store.get('download');
        if (download == 1) {
            $('.banner #baidu').click();
        }

        var user_type;
        var user_number;
        if (store.get('user')) {

             user_type = store.get('user').type;
             user_number = store.get('user').number;

        };
        //判断是否是mac系统，是返回true，否则返回false
        function isMacOS(){
            var platform = navigator.platform;
            if(platform.indexOf("Mac") > -1){
                return true;
            }else{
                return false;
            }
        }
        if (isMacOS()) {
            $('.download').attr('href', 'http://www.baijiacloud.com/default/home/liveclientDownload?partner_id=32891392&type=mac');
        }
        if (user_type === 0 ) {
            $('.experience').attr('href', '/live/teacher_trial?number='+user_number+'');
            $('.download').addClass('special');
        }
        else if (user_type === 2) {
            $('.experience').attr('href', 'http://www.genshuixue.com/live/teacher_trial?number=371780178');
        }
        else {
            $('.experience').attr('href', '/static/login?next=/static/windows');
        }


    };

});