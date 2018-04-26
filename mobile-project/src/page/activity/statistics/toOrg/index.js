/**
*create by huangshiming 16/5/12
**/

define(function(require,exports){
    'use strict';
    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');


    return function(page_data) {
        lazyLoadImage.init();
        //$('.banner-show').css('transform','scale(1)');

        /*setTimeout(function(){
            $('.banner-show').css('transform','scale(1)');
            $('.content-show').css('transform','scale(1)');
            $('.content-bottom').css('display','block');
        },300);*/

        var shareInfo = {
            title : '致跟谁学机构用户的一封信:感恩同行   ',
            content : '2014年6月至今，跟谁学服务超过6万家机构，5000万学生。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/575fe4a53f677.jpg'
        }
        setShare(shareInfo);
    }
});