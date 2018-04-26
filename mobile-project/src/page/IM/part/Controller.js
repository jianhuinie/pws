/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var MVCObject = require("common/mvc/MVCObject");
    var base = require('util/base');
    var observer = require("common/mvc/observer");
    var service = require("common/service");
    var user =  require("./user");
    var imConfig = require("./imConfig");
    var format = require("./format");
    var $ = require("zepto");
    var ui = require("common/ui");

    /*
     *  input
     *    polling data
     * output
     *
     * */
    function Controller(){
        //this.beforeLastMsgId = null;
    }

    base.inherits(Controller,MVCObject);

    var p = Controller.prototype;

    p._list_removal = {};

    p._listRemoval = (function(){
        var _removal = {};
        return {
            is: function(msgId){
                if(_removal[msgId]){
                    return true;
                }
                this.set(msgId);
                return false;
            },
            set: function(msgId){
                _removal[msgId] = true;
            }
        }
    })();

    p.pollingList_changed = function(){
        var list = this.get("pollingList");
        if(list){
            var mvcArray = this.get("mvcArray");
            list = format.formatReturnData(this.get("pollingList"));

            var data = list[list.length-1].data || {};
            this.set("lastMsgId",data.lastMsgId);

            for(var i=0;i<list.length;i++){
                var itemLastMsgId = list[i].data.lastMsgId;
                if(!this._listRemoval.is(itemLastMsgId)){
                    mvcArray.push(list[i]);
                }
            }
        }
    };

    p._getBeforeMsgId = function(){
        var mvcArray = this.get("mvcArray") || [];
        var userBeforeId = this.get("lastMsgId") || "";
        mvcArray.forEach(function(item,index){
            if(item.status == "success"){
                userBeforeId = item.data.lastMsgId;
                return false;
            }
        });
        return userBeforeId;
    };

    //
    p.uploadImage = function(imageBase64,done){
        imageBase64 = imageBase64.split("base64,")[1];

        service.post("/storage/uploadBinaryImage",{
            image: imageBase64
        },function(response){
            response = response || {};
            var data = response.data || {};
            if(response.code == "0" && data){
                done({
                    url: data.url,
                    width: data.width,
                    height: data.height
                });
            } else {
                done(false);
            }
        });
    };

    //文本
    p.sendText = function(json,done){
        this.sendMessage("text",json,done);
    };
    //img
    p.sendImgage = function(content,done){
        this.sendMessage("image",{
            content: content
        },done);
    };
    //emoji
    p.sendEMOJI = function(content,done){
        this.sendMessage("emoji",content,done);
    };

    p.sendMessage = function(type,json,done){
        var _self = this;
        var _kf = imConfig.getKeFu();
        var _user = user.getCacheUserInfo();

        var mvcArray = _self.get("mvcArray");
        var params = {
            msg_t: format.dictionary(type),
            ext: "",
            chat_t: "0",
            body: JSON.stringify(json),
            client_id: "5",
            receiver: _kf.number,
            receiver_r: _kf.role,
            sender: _user.user_number,
            sender_r: _user.role,
            sign: _user.user_number+new Date().getTime()
        };
        //
        //var content = {
        //    "text": json.content,
        //    "image": json.url
        //}[type];

        var options = {
            status: "sending",
            data: {
                'type': type,
                'content': json.content,
                'sender': {
                    'avatar': _user.avatar,
                    'number': _user.user_number,
                    'role': _user.role
                }
            }
        };

        mvcArray.push(options);

        var send = function(){
            service.post("/hermes/sendMsg",params,function(response){
                var data = response.data || {};
                if(response.code == "0"){
                    options.data["create_time"] = Number(data.create_at)*1000;
                    options.data["lastMsgId"] = data.msg_id;
                    options["status"] = "success";

                    _self._listRemoval.set(data.msg_id);

                    done && done();
                } else {
                    options["status"] = "error";
                }

                observer.trigger(options,"statusUpdate",options.status);
            });
        };

        if(type == "image"){
            this.uploadImage(json.content,function(data){
                if(data){
                    params["body"] = JSON.stringify(data);
                    send();
                } else {
                    options["status"] = "error";
                }
            });
        } else {
            send();
        }
    };

    p.getHistory = function(include_eid,done){
        var _self = this;
        var _beforeId = this._getBeforeMsgId();
        var _kf = imConfig.getKeFu();

        if(!_beforeId){
            return false;
        }

        var params = {
            user_number:_kf.number,
            user_role:_kf.role,
            eid: _beforeId
        };
        //include_eid 判断是否显示当前消息
        if(include_eid){
            params["include_eid"] = 1;
        }

        var mvcArray = _self.get("mvcArray");
        if(mvcArray){
            service.post("/hermes/getMsg",params,function(response){
                var response = response || {};
                var data = response.data || {};
                if(response.code == 0){
                    if(data.msgs.length){
                        data = format.formatReturnData(data);
                        for(var i= 0,l=data.length;i<l;i++){
                            var item = data[i];
                            mvcArray.insertAt(0,item);
                        }
                    }else {
                       // ui.remind("没有更多数据了！");
                    }
                    done && done();
                }
            });
        }
    };

    p.getKefuGreen = function(done){
        if(user.isLogin()){
            service.post("/im/getKefuGreet",{},function(response){
                response = response || {};
                done && done();
                return false;
            });
        }else{
            done && done();
        }
    };
    return Controller;
});