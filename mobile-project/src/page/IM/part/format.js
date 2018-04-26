/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var $ = require("zepto");
    /*
    * 将接收到的数据格式化
    * status:""
    * data:{
    *   'type': 'text',
    *   'content': data.body,
    *   'create_time': data.create_at,
    *   'sender': {
    *       'avatar': userInfo.avatar,
    *       'number': userInfo.user_number,
    *       'role': userInfo.role,
    *       'url': ''
    *   }
    * }
    * */
    exports.formatReturnData = (function(){
        //将user数组转为以user_number为KEY的对象
        var getUserObject = function(users){
            var _obj = {};
            $.each(users,function(index,item){
                if(!_obj[item.user_number]){
                    _obj[item.user_number] = item;
                }
            });
            return _obj;
        };
        var getTypeData = {
            card: function(json){
                return {
                    title: json.body.title,
                    content: json.body.content,
                    href: json.body.url,
                    thumb: json.body.thumb
                }
            },
            image: function(json){
                return {
                    content: json.body.url,
                    width: json.body.width,
                    height: json.body.height
                }
            },
            emoji: function(json){
                return {
                    content: json.body.content
                };
            },
            text: function(json){
                return {
                    content: json.body.content
                }
            }
        };

        var getArrayData = function(json,users){
            var type = exports.dictionary(json.msg_t);
            var ops = {
                type: type,
                create_time: json.create_at,
                lastMsgId: json.msg_id,
                sender: {
                    avatar: users[json.sender].avatar,
                    role: json.sender_r,
                    number: json.sender
                }
            };
            if(getTypeData[type]){
                json = getTypeData[type](json);
            }

            ops = $.extend(ops,json);
            //s to ms
            ops["create_time"] = Number(ops.create_time) * 1000;

            return ops;
        };

        return function(json){
            var userObject = getUserObject(json.users);
            var arrays = [];
            $.each(json.msgs,function(index,item){
                item["body"] = JSON.parse(item.body);

                var ops = {
                    status: "success",
                    data: getArrayData(item,userObject)
                };

                arrays.push(ops);
            });
            return arrays;
        }
    })();

    exports.dictionary = function(key){
        return {
            "0": "text",
            "1": "image",
            "5": "card",
            "6": "emoji",
            "text": "0",
            "image": "1",
            "emoji": "6",
            "card": "5"
        }[key];
    };
});