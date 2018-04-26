/**
 * Created by bjhl on 16/3/24.
 */
define(function(require,exports){

    'use strict';

    var share = require("common/share/initialize");
    var $ = require("zepto");

    exports.init = function(ops){
        //分享
        share($.extend({
            title: "中英文化交流大使招募大赛，公费英国游学机会等你来挑战！",
            content: "100个英国游学名额，跟谁学“请客”带你造访知名学府；400个国际交流名额，与国外师生共进“文化盛宴”  ",
            img: require.toUrl("./share.jpg")
        },ops));
    };
});