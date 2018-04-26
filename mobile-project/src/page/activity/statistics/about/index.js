/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){

    'use strict';

    var $ = require("zepto");
    var service = require("common/service");
    var url = require("util/url");

    return function(){
        $(".submit").click(function(){
            service.post("/activity/survey_teacher_active_suggest",{
                suggest: $("#information").val(),
                mobile: url().params.mobile
            },function(res){
                var res = res || {};

                if(res.code == 0){
                    $(".block_1").hide();
                    $(".block_2").show();
                }
            })
        });
    }
});