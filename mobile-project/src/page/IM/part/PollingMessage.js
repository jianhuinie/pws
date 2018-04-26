/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var MVCObject = require("common/mvc/MVCObject");
    var base = require('util/base');
    var observer = require("common/mvc/observer");
    var service = require("common/service");

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

    base.inherits(Polling,MVCObject);

    var p = Polling.prototype;

    p._listener = function(){
        var _self = this;
        observer.addListener(this.timer,"polling",function(){
            _self.pollingMessage();
        });
    };

    p._addTimerSource = function(){
        var index = this.timer.get("index");
        this.timer.set("index",++index);
    };

    p._resetTimerSource = function(){
        this.timer.set("index",0);
    };
    //判断当前msg_id是否在polling
    p._polling_status = (function(){
        //
        var _polling_request = {};

        return {
            isPolling: function(msgId){
                if(_polling_request[msgId]){
                    return true;
                }
                this.set(msgId);
                return false;
            },
            set: function(msgId){
                _polling_request[msgId] = true;
            },
            del: function(msgId){
                delete _polling_request[msgId];
            }
        }
    })();

    p.resetPolling = function(){
        this.timer.stop();
        this.pollingMessage();
        this.timer.start();
    };

    //message
    p.pollingMessage = function(){
        var _self = this;
        var lastMsgId = this.get("lastMsgId");
        var object = this.get("object");

        if(lastMsgId == undefined){
            return false;
        }
        if(this._polling_status.isPolling(lastMsgId)){
            return false;
        }
        service.post("/hermes/polling",{
            user_last_msg_id:  lastMsgId,
            type: "1",
            peer_number: object.number,
            peer_role: object.role
        },function(response){
            var response = response || {};
            var data = response.data || {};
            var msgs = data.msgs || [];

            if(msgs.length){
                _self._resetTimerSource();
                _self.set("pollingList",data);
            } else {
                _self._addTimerSource();
            }
            _self._polling_status.del(lastMsgId);
            return false;
        });
    };

    return Polling;
});