/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    //
    var object = require("util/object");
    var service = require("common/service");

    var config = {};

    var getImConfig = function(done){
        if(object.isEmpty(config)){
            service.post("/hermes/syncConfig",{},function(response){
                var data = response.data || {};
                var sys_user = data.sys_user || {};
                if(response.code == "0"){
                    config = data;
                    done && done(config);
                }
            });
        } else {
            done && done(config);
        }
    };

    exports.getDelays = function(done){
        return config.polling_delta;
    };

    exports.getUserLastId = function(done){
        return config.user_last_msg_id;
    };

    exports.getKeFu = function(done){
        return config.sys_user.kefu
    };

    exports.getConfig = function(done){
        getImConfig(function(){
            done && done(config);
        });
    }
});