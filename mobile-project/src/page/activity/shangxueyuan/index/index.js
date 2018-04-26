define(function(require) {

    'use strict';

    var $ = require("zepto");
    var slideImageControl = require("common/ui/slideImageControl/slideImageControl");
    var lazyLoadImage = require("common/lazyLoadImage");
    var openAppWindow = require("common/openAppWindow");
    var app = require("common/app");
    var setShare = require('common/share/initialize');
    var url = require("util/url");
    var env = require('util/env');
    var ui = require("common/ui");
    var liudan = require("../_part/liudan");

    var params = url().params;
    var Iscroll = require("iscroll");

    //init slider
    function initSlider(item) {
        var cContain = $(item);
        var bullets = cContain.find(".slide_position li");
        var curimage = new slideImageControl(cContain[0], {
            auto: 3000,
            continuous: true,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            var dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
            bullets.removeClass('on');
            bullets.eq(index).addClass('on');
        }

        lazyloadSlideImg(curimage.get('index'));
    }
    var showMore = function(){
        $('.has-more').on('click',function(){
            $('.student-com ul li').each(function(index,item){
                $(item).removeClass('hide');
                $('.has-more').hide();
            });
        });
    }

    var moreHotCourse = function(number){
        var tempHush = [];
        for(var i = 0;i < number; i++){
            var tempHtml = '<li class="hot-course-list">'
                            +'<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57527e7630fd7.png" class="hot-course-img">'
                            + '</li>';
            tempHush.push(tempHtml);
        }
        $('.hot-course-box').append(tempHush.join(""));
    }

    return function(page_data){
        //app link
        openAppWindow.init();
        //lazy load image
        lazyLoadImage.init();
        //init slider
        if(page_data.hot_course_banners.length>0){
            initSlider('#myslider');
        }

        if(page_data.student_photos.length>0){
            initSlider('#myslider2');
        }
        liudan('first');
        showMore();

        var hotCourseLength = page_data.hot_courses.length;
        if(hotCourseLength < 4){
            var tempNumber = 4 - hotCourseLength;
            moreHotCourse(tempNumber);
        }

        var shareInfo = {
            title : '来跟谁学商学院，与最优秀的人一起成长!',
            content : '50万老师、6万机构大数据样本总结，1年时间课程打磨，业绩总和超1000亿的导师团的智慧结晶都在这里！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/575282c3a7ddd.jpg'
        };
        setShare(shareInfo);

        openAppWindow.init();

    }
});