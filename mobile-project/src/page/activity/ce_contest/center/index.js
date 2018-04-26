/**
 * Created by bjhl on 16/1/20.
 */
define(function(require,exports){
    'use strict';

    var ui = require("common/ui");
    var share = require("../_part/pageShare/init");
    var pageFilter = require("../_part/pageFilter");
    var pageInit = require("../_part/common");

    var lazyLoadImage = require('common/lazyLoadImage');

    exports.init = function(page_data){

        lazyLoadImage.init();

        pageInit.init();

        pageFilter.filter(function(){
            share.init({
                url: "/uk/detail/"+page_data.number,
                title: "我在参加中英文化交流大使招募大赛​，差你一票我就可以去英国了！",
                content: "100个英国游学名额，跟谁学“请客”带你造访知名学府；400个国际交流名额，与国外师生共进“文化盛宴”"
            });

            if(page_data.frozen == "1"){
                ui.alert("此账号被封");
            }
        });

        $("#video-start").click(function(){
            $("#video")[0].play();


            $(this).parent().remove();

            $("#video").show();
        });

    }
});