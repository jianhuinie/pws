define(function (require) {
    var $  = require('zepto');
    var headerDom = $('.base-info-box');
    var starsDom = headerDom.find('.box .last-line .stars');
    var platformEnsureDom = $('.platform-ensure');
    var adsBanner = $('.show-banners');
    var initStars = require('common/comment/initStars');
 
    // 随机替换封面图
    function changeCover () {
        var randomNumber = parseInt(Math.random() * 10);
        var picsArray = [
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64cf5b6ed.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64cfc13dc.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d014c87.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d04025c.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d07cd82.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d0b50c4.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d0d4407.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d10c24b.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d132f90.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58ba64d183ece.png'
        ];

        var cover = $('.avatar-mask').find('img');
        cover.attr('data-src', picsArray[randomNumber]);
    }


    return function () {
        initStars.initStars($('.stars'));
        changeCover();
        var that = this;
        platformEnsureDom.unbind('click').on('click', function (){
            that.secureDialog();
        }); 

        adsBanner.unbind('click').on('click', function () {
            that.secureDialog();
        });
    };
});