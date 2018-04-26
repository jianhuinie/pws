/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';
    //
    var object = require("util/object");
    var service = require("common/service");
    var user = require("common/user");

    var userInfo = {};

    exports.getUserInfo = function(callback){
        var _self = this;
        if(object.isEmpty(userInfo)) {
            if(this.isLogin()){
                var _info = user.getUserInfo();
                userInfo["user_name"] = _info.name;
                userInfo["user_number"] = _info.number;
                userInfo["avatar"] = _info.avatar;
                userInfo["role"] = _info.role;
                callback && callback(userInfo);
            } else {
                service.post("/im/getAnonymousInfo",{},function(response){
                    var response = response || {};
                    var data = response.data || {};
                    if(response.code == "0"){
                        userInfo["user_name"] = data.user_name;
                        userInfo["user_number"] = data.user_number;
                        userInfo["avatar"] = data.avatar;
                        userInfo["role"] = data.user_role;
                        callback(userInfo);
                    } else {
                        _self.getUserInfo(callback);
                    }
                });
            }
        } else {
            callback && callback(userInfo);
        }
    };

    exports.getCacheUserInfo = function(){
        return userInfo;
    };

    exports.isLogin = function(){
        return user.isLogin();
    };

    exports.destroy = function(){
        userInfo = {};
    };

});