define(function(require,exports){

    'use strict';

    // var lazyLoadImage = require('common/lazyLoadImage');
    // var openAppWindow = require("common/openAppWindow");
    var $ = require('zepto');
    var url = require('util/url');
    var urlParams = url().params;

    return function() {
        // lazyLoadImage.init();
        // console.log(urlParams.type);
        if (urlParams.type == 1) {
            $('.tab .icon .rank-single-img').removeClass('hidden');
            $('.tab .single-total').html('累计人数');
            // $('.nav-header').html('累计学生人数排行榜');
            $('.pager .prev').attr('href',  $('.pager .prev').attr('href').replace(/type=0/, 'type=1'));
            $('.pager .next').attr('href',  $('.pager .next').attr('href').replace(/type=0/, 'type=1'));
        }
        else {
            $('.tab .icon .rank-total-img').removeClass('hidden');
        }
    }
});