/**
 * @file 老师介绍页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {


//        var category = require('static/category');

//        category.init();

        var back = $('#back');
        var tab = $('#tab');
        var item = $('#item');

        back.on('click', function(){
            item.hide();
            tab.show();
        });

        tab.on('click', 'a', function(){
            var a = $(this);
            var current = $('#current');
            var class_name = a.attr('id');
            var a_content = a.text();
            var class_obj = $('.'+class_name+'');
            current.text(a_content); //面包

//                alert(a_content);
            tab.hide();
            item.show();
            item.find('div[class != "crumb"]').hide();
            class_obj.show();

        });
        item
        .on('click', '.nav-item', function(){
            var element = $(this);
            var compensation = item.find('.my-compensation');
            var withdraw = item.find('.withdraw');
            console.log(element);
            var drawback = item.find('.drawback');
            element.addClass('active')
                    .siblings().removeClass('active');

            if (element.data('floor') == 0) {
                withdraw.hide();
                drawback.hide();
                compensation.show();
            }
            else if (element.data('floor') == 1) {
                compensation.hide();
                drawback.hide();
                withdraw.show();
            }
            else if (element.data('floor') == 2) {
                compensation.hide();
                withdraw.hide();
                drawback.show();
            }
        })
    };
});