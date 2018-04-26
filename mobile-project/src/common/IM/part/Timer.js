/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var observe = require("common/mvc/observer");
    var MVCObject = require("common/mvc/MVCObject");
    var util = require('common/util');

    /*
    * input
    *   delays [1,2,3,4]
    *   index: 0
    * event
    *   frame:执行一次
    * */
    function Timer(){

    }

    util.inherits(Timer,MVCObject);

    var p = Timer.prototype;

    p.delays_changed = function(){
        var delays = this.get("delays");
        if(delays){
            this.set("index",0);
            this.start();
        }
    };

    p._timer = null

    p.start = function(){
        var index = this.get("index") || 0;
        var delays = this.get("delays") || [3000,4000,5000,6000,7000];
        var delaysLen = delays.length;
        var _self = this;

        if(index>=delaysLen){
            index--;
            this.set("index",index);
        }

        var times = delays[index]*1000;

        this._timer = setTimeout(function(){
            if(_self._timer){
                observe.trigger(_self,"polling");
                _self.start();
            }
        },times);
    };

    p.stop = function(){
        if(this._timer){
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    p.destroy = function(){
        this.stop();
        observe.unbindAll();
    };

    return Timer;
});