/**
 * @file 9-10教师节
 * @author tangrongyan
 *
 */



define(function(require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var VideoDialog = require('common/component/VideoDialog');

    // var etpl = require('cobble/util/etpl');
    var store = require('common/store');


    exports.init = function() {


        /**
         * 弹出教师视频
         */
        $('#main .wrapper')
                .on('click', 'a', function(e) {


                    // var element = $(this);
                    // var url = element.data('url');

                    // new VideoDialog({
                    //     url: url
                    // });

                });




        // 基本
                $('.video-thumbnail').click(function(e) {
                    $('#iframe').attr('src', 'http://www.genshuixue.com/video/view/1adfcf2ef6').show();
                    $(this).hide();

                });


                var container = $('#main');

                new Popup({
                    element: container.find('.applay'),
                    layer: container.find('.applay .baidu-share'),
                    show: {
                        trigger: 'over',
                        delay: 100
                    },
                    hide: {
                        trigger: 'out',
                        delay: 200
                    }
                });





    };
});