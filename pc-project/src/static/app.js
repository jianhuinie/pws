/**
 * @file app下载页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');

    exports.init = function() {

        // 学生、老师、机构数目配置
        service
        .getTheCount()
        .done(function (response) {
            if (response.code === 0) {
                $('.org-num').html(response.data.org);
            }
        });

        var search =location.search.split("=");
        var type = 'student';
        if (search.length > 1) {
            type = search[1];
        }
        if (type == 'org') {
            type = 'all';
        }
        if (type != 'all' && type !='teacher'){
            type = 'student';
        }

        $(".content").find(".apps").removeClass("active");
        $(".content").find("." + type + 'App').addClass("active");

        $('.apply-app').find('li').removeClass('active');
        $('.apply-app').find('.' + type).addClass('active');

        function isMacOS(){
            var platform = navigator.platform;
            if (platform.indexOf("Mac") > -1){
                return true;
            }
            else {
                return false;
            }
        }

        if (isMacOS()) {
            var timeSamp = new Date().getTime();
            $('.ismac').attr('href', 'http://www.baijiacloud.com/default/home/liveclientDownload?partner_id=32891392&type=mac');
        }

        var intervalId;
        // 自动轮播
        function aotuPlay(){
            var container = $('.banner');
            var index = 0;
            var list = container.find('.listin');
            var imgs = container.find('.ic-content');
            var descrips = $('.descrips');

            function swap(index){
                descrips.find('.descrip').removeClass('active');
                descrips.find('.descrip'+index).addClass('active');
            }

            function getLeft(index){
                if (index == 0)
                    return 0;
                else if(index ==1)
                    return -220;
                else
                    return -440;
            };

            //定时器，自动轮播
            intervalId = setInterval(function(){
                //图片滚动
                if(index == 0) {
                    list.css({left : 0});
                 }
                list.animate({left:getLeft(index)},500);
                //图标设置
                imgs.removeClass('active');
                $('.show'+index).addClass('active');
                //文字设置
                swap(index);
                if(index >= 2){
                    index = 0;
                }else{
                    index++;
                }
            },5000);


            //添加点击事件
            container.on('click', '.promotion-slider-left', function(){
                //获取当前将要显示的对象
                index = (index-1+3)%3 ;
                if(index == 0) {
                    list.css({left : 0});
                }
                list.animate({left:getLeft(index)},500);

                imgs.removeClass('active');
                $('.show'+index).addClass('active');
                 swap(index);

            }).on('click', '.promotion-slider-right', function(){
                index = (index+1+3)%3 ;
                if(index == 0) {
                    list.css({left : 0});
                }
                list.animate({left:getLeft(index)},500);

                imgs.removeClass('active');
                $('.show'+index).addClass('active');
                swap(index);
            }).on('click','.ic-content',function(){
                index = $(this).attr('data-index');
                if(index == 0) {
                    list.css({left : 0});
                }
                list.animate({left:getLeft(index)},500);

                imgs.removeClass('active');
                $(this).addClass('active');
                swap(index);
            })
        }

        if (store.get('type') == 'teacher') {
            aotuPlay();
        }

        $('.apply-app li')
        .click(function () {
            var element = $(this);
            var target = element.attr("data-target")
            $(".apply-app").find("li").removeClass("active");
            element.addClass("active");

            $(".content").find(".apps").removeClass("active");
            $(".content").find("."+target).addClass("active");

            // 当切换到老师tab的时候，开始轮播
            if (target == 'teacherApp'){
                aotuPlay();
            }
            else if(intervalId != 0){
                clearInterval(intervalId);
                intervalId = 0;
            }

        });
        $('.allApp').find('.item').mouseover(function(){
            var element = $(this);
            element.find('.nows').hide();
            element.find('.hover').show();
        })
        $('.allApp').find('.item').mouseout(function(){
            var element = $(this);
            element.find('.hover').hide();
            element.find('.nows').show();

        });
    };
});