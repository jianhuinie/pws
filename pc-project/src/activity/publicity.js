/**
 * @file 品宣
 * @author tangrongyan
 */


//活动ID 1001



define(function(require, exports) {

    'use strict';

    var page = require('./common/publicity');
    var Popup = require('cobble/helper/Popup');

    exports.init = function() {

        var container = $(document);


        $('.page video').each(function(i) {

            var me = $(this);
            $(this).oncanplay = function(i) {

                me.prev().css('z-index', '4') //先执行
                // console.log(me.prev().css('z-index','4')); //先执行


            }();

            $(this).onerror = function() {

            }();


        });







        var popup = new Popup({
            element: container.find('.applay'),
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


        var off = 1;
        var jiantou = 0;
        var prev_index;
        var next_index;

        var FullPage = page.init();


        var runPage;
        runPage = new FullPage({
            id: 'pageContain',
            slideTime: 1400,
            effect: {
                transform: {
                    translate: 'Y'
                },
                opacity: [0.6, 1]
            },
            mode: 'wheel, touch, nav:navBar',
            easing: 'ease',
            beforeChange: function(index, thisPage) {


                if (off) {
                    off = 0;
                } else {
                    if (index != 5) {
                        // return 'stop';
                    }
                    ;
                }
                ;


                prev_index = index;



            },
            callback: function(index, thisPage) {

                next_index = index;
                var bd = $('#bd');

                if ( (prev_index === 4 && next_index === 5) ||
                     (prev_index === 3 && next_index === 5) ||
                     (prev_index === 2 && next_index === 5) ||
                     (prev_index === 1 && next_index === 5) ||
                     (prev_index === 0 && next_index === 5)

                        ) {
                    bd.hide();

                } else {
                    bd.show();

                }



                if (!off) {
                    off = 1;
                }
                ;

            }
        });



    };
});