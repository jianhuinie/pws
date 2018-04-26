/**
 * Created by bjhl on 16/4/8.
 */
define(function(require,exports){

    'use strict';

    var user = require("common/user");
    var app = require("common/app");

    exports.toLogin = function(){
        if(app.isApp()){
            require(['jockey'], function (Jockey) {
                Jockey.off('setUserInfo');
                Jockey.on('setUserInfo', function (response) {
                    //app登陆必须刷新页面才能种cookie
                    if (response && response['auth_token']) {
                        location.reload();
                    }
                });
                Jockey.send('getUserInfo');
            });
        }else {
            location.href = "/static/login?source=dt_uk2016_msite&next="+encodeURIComponent(location.href.split("?")[0]);
        }
    };

    exports.filter = function(callback){
        if(!user.isLogin()){
            this.toLogin();
        }else {
            callback && callback();
        }
    };
});