/**
 * @file 老师介绍页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {


        var h2 = $('h2:first').text();
        var current = $('#current');


        current.text(h2); //面包
        var item = $('#item');
        item
        .on('click', '.nav-item', function(){
            var element = $(this);
            var compensation = item.find('.my-compensation');
            var withdraw = item.find('.withdraw');
            var drawback = item.find('.drawback');
            var popularize = item.find('.popularize');
                element.addClass('active')
                    .siblings().removeClass('active');

            if (element.data('floor') == 0) {
                withdraw.hide();
                drawback.hide();
                popularize.hide();
                compensation.show();
            }
            else if (element.data('floor') == 1) {
                compensation.hide();
                drawback.hide();
                popularize.hide();
                withdraw.show();
            }
            else if (element.data('floor') == 2) {
                compensation.hide();
                withdraw.hide();
                popularize.hide();
                drawback.show();
            }
            else if (element.data('floor') == 3) {
                compensation.hide();
                withdraw.hide();
                drawback.hide();
                popularize.show();
            }
        })

    };


});