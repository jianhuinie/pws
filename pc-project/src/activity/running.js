/**
 * @file  梦想课堂
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var string = require('cobble/util/string');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var etpl = require('cobble/util/etpl');
    var VideoDialog = require('common/component/VideoDialog');


    function prev(item, me, class_i){

        var sc = $(class_i).offset().top;
        $('html, body').scrollTop(sc);

        $(me).siblings().removeClass('active');
        $(me).addClass('active');

        var prev = item.filter('.active');
        var next_o = prev.prev();
        var a_index = prev.index();

        if (a_index == 0) {
            prev.removeClass('active');
            item.last().addClass('active');
        } else {
            prev.removeClass('active');
            next_o.addClass('active');
        }
    }

    function next(item, me, class_i){

        var sc = $(class_i).offset().top;
        $('html, body').scrollTop(sc);


        $(me).siblings().removeClass('active');
        $(me).addClass('active');

        var prev = item.filter('.active');
        var next_o = prev.next();
        var a_index = prev.index();

        if (a_index == item.length - 1) {
            prev.removeClass('active');
            item.first().addClass('active');
        } else {
            prev.removeClass('active');
            next_o.addClass('active');
        }

    }



    exports.init = function (){


        $('.class-info').each(
                function() {
                    new Tab({
                        trigger: 'click',
                        navActiveClass: 'active',
                        navSelector: '.tab-nav-w',
                        contentSelector: 'ul.list',
                        element: $(this),
                        index: 0
                    });
                }
        );

// 视频 点击
        $('.link-btn').click(function(e){

            var link = $(this).attr('href');

            var isVideo = link.indexOf('/');

            if (isVideo == -1) {
                e.preventDefault();

                new VideoDialog({
                    url: 'http://www.genshuixue.com/video/view/'+link
                });
            };

        });



//文章跳转
        var container = $('#main');
        var item = container.find('.page-ul-first');
        var class_i = $('.class-info');

        container.delegate('.prev','click',function(){
            var me = this;
            prev(item, me, class_i);
        });

        container.delegate('.next','click',function(){
            var me = this;
            next(item, me, class_i);
        });



// // 文章跳转2
//         var item2 = container.find('.page-ul-second');
//         var class_i2 = $('.break-through');

//         container.delegate('.prev-second','click',function(){
//             var me = $(this);
//             prev(item2, me, class_i2);
//         });

//         container.delegate('.next-second','click',function(){
//             var me = $(this);
//             next(item2, me, class_i2);
//         });

// // 突破
//         $('.break-through').each(
//                 function() {
//                     new Tab({
//                         trigger: 'over',
//                         navActiveClass: 'active',
//                         navSelector: '.tab-nav-w',
//                         contentSelector: 'ul.list',
//                         element: $(this),
//                         index: 0
//                     });
//                 }
//         );





    var container = $('#main');

    etpl.addFilter('sub', function (title) {
        if (string.getLength(title) > 30) {
            return string.truncate(title, 46);
        }
        return title;
    });

    var render = etpl.compile($('#teacher-template').html());




    // 函数
    function requ(data){

            $.ajax({
                url: '/activity/running',
                data: data,
                method: 'post',
                dataType: 'json',
                success: function(msg){

                    var html = render({
                        page_content: msg.data.page_content
                    });
                    if (msg.data.total_page > 1){
                        $('.page-control').show();
                    }else{
                        $('.page-control').hide();
                    }
                    page = msg.data.total_page;

                     // $(html).appendTo('.page-ul-second');
                     $('.page-ul-second').html(html);
                    // console.log(html);


                }
            });


    }

    // subject
    var break_through = $('.break-through');
    break_through.delegate('.tab-nav-w', 'click', function(){

        var me = this;
        $(me).siblings().removeClass('active');
        $(me).addClass('active');

        type = $(this).data('type');

        var  data = {
                'page': 1,
                'type': type
                };

        requ(data);




    })




    // page
    var count_page = 1 ;
    var page_ul_second = $('.page-ul-second');
    var page = page_ul_second.data('page');
    var type = 'shuxue';

    container
        .delegate('.next-second', 'click', function(){
            var me = this;
            $(me).siblings().removeClass('active');
            $(me).addClass('active');

            if (page < 2) {
                return;
            };
            if (count_page == page) {
                count_page = 1;
            }else{
                count_page++;
            }

            var  data = {
                    'page': count_page,
                    'type': type
                    };
                 requ(data);



        })
        .delegate('.prev-second', 'click', function(){
            var me = this;
            $(me).siblings().removeClass('active');
            $(me).addClass('active');


            if (page < 2) {
                return;
            };
            if (count_page == 1) {
                count_page = page;
            }else{
                count_page--;
            }

            var  data = {
                    'page': count_page,
                    'type': type
                    };
                 requ(data);


        });



















// ie8

$('#main .tab-content .list > li:last-child').css('margin-bottom','30px');







    }

});