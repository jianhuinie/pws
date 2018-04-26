/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var MVCObject = require("common/mvc/MVCObject");
    var imConfig = require("./part/imConfig");
    var Timer = require("./part/Timer");
    var Polling = require("./part/PollingNotice");
    var util = require('common/util');
    var observe = require("common/mvc/observer");

    var timer = new Timer();
    var polling = new Polling(timer);
    //
    function Notice(){
        this._init.apply(this,arguments);
    };

    util.inherits(Notice,MVCObject);

    var p = Notice.prototype;

    p.pollingList_changed = function(){
        var json = this.get("pollingList");
        if(json){
            var msgs = json.msgs;
            if(msgs && msgs.length){
                var msg_id = msgs[msgs.length-1].msg_id;
                this.set("lastMsgId",msg_id);
            }

            var source = (this.get("source") || 0) + msgs.length;

            this.set("source",source);
        }
    };

    p.source_changed = function(){
        observe.trigger(this,"notice",this.get("source"));
    };


    p._init = function(){
        var _self = this;
        imConfig.getConfig(function(config) {
            _self.bindTo("pollingList",polling,"pollingList");
            polling.bindTo("lastMsgId",_self,"lastMsgId");

            timer.set("delays",config.polling_delta);
            polling.set("object",config.sys_user.kefu);
            _self.set("lastMsgId",config.user_last_msg_id == "-1"? "" : config.user_last_msg_id);
        });
    };

    p.getSource = function(){
        return this.get("source");
    };

    p.destroy = function(){
        timer.destroy();
        this._source = 0;
        timer = null;
        polling = null;
    };

    return Notice;
});