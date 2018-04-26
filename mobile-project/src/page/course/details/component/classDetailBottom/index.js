/**
 * Created by niumeng on 11/2016.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");

    function purchase(url) {
        var submit = $('#btn-enrolling');
        var choseCourse = $('.course').filter('.chose');

        var purchaseLayerEle = $('#j_purchase');
        var numEle = purchaseLayerEle.find('#j_num');
        var plusEle = purchaseLayerEle.find('#j_plus');
        var minusEle = purchaseLayerEle.find('#j_minus');
        var sumEle = purchaseLayerEle.find('#j_sum');
        var submitEle = purchaseLayerEle.find('#j_submit');

        var price = parseFloat(sumEle.data('price'));

        var maskLayerEle = $('#j_mask');

        function setSum() {
            sumEle.html('¥' + (price * parseInt(numEle.html())));
        }

        setSum();

        submit.click(function () {
            maskLayerEle.show();
            purchaseLayerEle.css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            });
        });

        maskLayerEle.click(function () {
            maskLayerEle.hide();
            purchaseLayerEle.css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            });
        });

        purchaseLayerEle.find('.close').click(function () {
            maskLayerEle.hide();
            purchaseLayerEle.css({
                '-webkit-transform': 'translateY(100%)',
                'transform': 'translateY(100%)',
            });
        });

        plusEle.click(function () {
            var curNum = parseInt(numEle.html());
            numEle.html(curNum + 1);

            setSum();
        });

        minusEle.click(function () {
            var curNum = parseInt(numEle.html());

            if (curNum <= 1) {
                return;
            }

            numEle.html(curNum - 1);

            setSum();
        });

        submitEle.click(function () {
            location.href = url + '&' + $.param({'hours': parseInt(numEle.html())});
        });
    }

    function jumpToChoicePosition() {
        $('#btn-enrolling').click(function () {
             var pos = $('#j_choose_course').offset().top;

             $(window).scrollTop(pos);
        });
    }

    function jumpToPage(url) {
        $('#btn-enrolling').click(function () {
            location.href = url;
        });
    }

    return {
        purchase: purchase,
        jumpToChoicePosition: jumpToChoicePosition,
        jumpToPage: jumpToPage
    };
});
