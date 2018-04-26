/**
 * @file 免费午餐页面
 * @author tangrongyan
 */


//活动ID 1001



define(function(require, exports) {

    'use strict';
    var Carousel = require('cobble/ui/Carousel');
    var Dialog = require('cobble/ui/Dialog');
    var Popup = require('cobble/helper/Popup');

    var service = require('common/service');

    exports.init = function() {


        var counter = $('.counter span');


        service.getLunchCount()
            .done(function(msg) {
                var data = msg.data;
                var text = data.total;
                counter.text(text);
                if (msg.data.is_join === 1) {
                    centre.off('click').css({cursor: 'no-drop'});
                }
            });



        var controls = $('#controls');
        var prev = controls.find('.prev');
        var next = controls.find('.next');


//        自动轮播

        var carousel = new Carousel({
            element: $('.promotion-slider-nav'),
            itemSelector: 'span',
            iconSelector: 'span',
            activeClass: 'active',
            trigger: 'click',
            delay: 6000,
            animation: function(data) {


                var me = this;
                var elem = me.element.prev();
                var len = elem.children().length;

                var navLength = me.element.children().length;

                var toIndex = data.to;
                var fromIndex = data.from;

                if (fromIndex === toIndex || toIndex < 0) {
                    return;
                }


                if ((toIndex - fromIndex) === (navLength - 1)) {

                    if (fromIndex === 0) {
                        toIndex = -1;
                    }

                }
                else if ((fromIndex - toIndex) === (navLength - 1)) {

                    if (toIndex === 0) {
                        toIndex = len - 2;
                    }
                }


                elem
                        .animate(
                                {
                                    left: (-970 - toIndex * 970) + 'px'
                                },
                        800,
                                'easeOutQuad',
                                function() {
                                    if (toIndex === len - 2) {
                                        elem.css('left', '-970px');
                                        me.index = 0;
                                    }

                                    if (toIndex === -1) {
                                        elem.css('left', (-970 - (navLength - 1) * 970) + 'px')
                                        me.index = navLength - 1;
                                    }
                                }
                        );
            }
        });

        carousel.play();


//点击 切图
        prev.on('click', function() {
            carousel.prev();
        });


        next.on('click', function() {
            carousel.next();
//            carousel.pause();
        });





//点赞
        var centre = $('.centre');
        centre.on('click', function() {

            $(this).toggleClass('on');
            $(this).css({cursor: 'no-drop'});


            service.sentLunchCount()
                .done(function(msg) {
                    if (msg.code === 0) {

                        var text = msg.data.total;
                        counter.text(text);

                        Dialogs();
                        clicked();

                    } else {
    //                                alert('点赞失败，可能由于网络原因~~');
                        alert('点赞失败，你已经点过赞了~~');

                    }
                });

//            var text = counter.text();
//            text = parseInt(text) + 1;
//            counter.text(text);

            $(this).off('click');


        })
                .mousedown(function() {
                    $(this).addClass('on');
                })
                .mouseup(function() {
                    $(this).removeClass('on');
                });

//分享相关：
        var id_apply = $('#apply');

        function Dialogs() {
            new Dialog({
                content: '\
<p class="success" >非常感谢你的赞！</p>\n\
<p class="reminder" >请小伙伴们一起来点赞吧，让爱心传递飞一会</p>\n\
<button class="apply btn btn-primary" >分享</button>',
                width: 670,
                height: 332
            });
            id_apply.addClass('faile').css({cursor: 'no-drop'});
            id_apply.off('click');
        }

//点击弹出窗里面的分享按钮：

        function clicked() {
            var container = $(document);
            var apply = $(document);
            apply.delegate('.apply', 'click', function() {


                    var popup = new Popup({
                        element: container.find('.apply'),
                        layer: container.find('.baidu-share'),
                        show: {
                            trigger: 'over',
                            delay: 100
                        },
                        hide: {
                            trigger: 'out',
                            delay: 200
                        }
                    });
                    $('.baidu-share').appendTo('.dialog-body').show();
            });
        }






    };
});