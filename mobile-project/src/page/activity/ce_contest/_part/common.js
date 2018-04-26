/**
 * Created by bjhl on 16/4/8.
 */
define(function(require,exports){

    'use strict';

    var $ = require("zepto");
    var openAppWindow = require("common/openAppWindow");

    exports.init = function(callback){
        //重写返回到首页
        $(".nav-button").click(function(e){
            e.preventDefault();

            openAppWindow.open("/uk/index?source=dt_uk2016_msite");
        });
    };
});