/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    //
    var util = require("common/util");

    var config = {};

    var getImConfig = function(done){
        if(util.object.isEmpty(config)){
            $.post("/hermes/syncConfig").done(function(response){
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

    exports.getConfig = function(done){
        getImConfig(function(){
            done && done(config);
        });
    }
});