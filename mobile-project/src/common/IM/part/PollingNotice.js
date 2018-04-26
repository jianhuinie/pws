/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var MVCObject = require("common/mvc/MVCObject");
    var util = require('common/util');
    var observer = require("common/mvc/observer");
    var cookie = require("util/cookie");
    /*
    *  input
    *    user_last_msg_id
    * output
    *  "avatar": "http://test-img.gsxservice.com/headpic_sexless.jpg",
    *  "user_name": "\u8bbf\u5ba2_SSydw",
    *  "user_number": "371678011",
    *  "user_role": -1
    * */
    function Polling(timer){
        this.timer = timer;

        this._listener();
    }

    util.inherits(Polling,MVCObject);

    var p = Polling.prototype;

    p._listener = function(){
        var _self = this;
        observer.addListener(this.timer,"polling",function(){
           _self._message();
        });
    };

    p._addTimerSource = function(){
        var index = this.timer.get("index");
        this.timer.set("index",++index);
    };

    p._resetTimerSource = function(){
        this.timer.set("index",0);
    };

    p._isPolling = function(){
       //m站 polling notice active status
       return !!cookie.get("pnas");
    };

    p._starting = true;

    //message
    p._message = function(){
        if(this._isPolling()){
            var _self = this;
            var lastMsgId = this.get("lastMsgId");
            var object = this.get("object");

            $.post("/hermes/polling",{
                user_last_msg_id:  lastMsgId,
                type: "1",
                peer_number: object.number,
                peer_role: object.role
            }).done(function(response){
                var response = response || {};
                var data = response.data || {};
                var msgs = data.msgs || [];

                if(msgs.length){
                    _self._resetTimerSource();
                    _self.set("pollingList",data);
                } else {
                    _self._addTimerSource();
                }
            });
        }
    };

    return Polling;
});
