/**
 * @file installment refund detail
 * @auto lijun
 */

define(function(require) {

    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require("common/lazyLoadImage");

    return function(){
        lazyLoadImage.init();

        $('.submit').on('click', function () {
            require(['common/service'], function (service) {
                service.get(
                    '/fenqi/checkAuth',
                    {
                        course_number: page_data.courseNumber
                    },
                    function (response) {
                        if (response.code == 0) {
                            var redirectUrl = response.data.redirect_url;

                            if (redirectUrl) {
                                location.href = redirectUrl;
                            }
                        }
                    }
                )
            });
        });
    };
});