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

        $('.to-submit').on('click', function () {
            require(['common/service'], function (service) {
                service.get(
                    '/fenqi/createRefundPurchase',
                    {
                        purchase_id: page_data.purchaseId,
                        term_no: page_data.termNo
                    },
                    function (response) {
                        if (response.code == 0) {
                            location.href = response.data.zhifu_url;
                        }
                    }
                );
            });
        });
    };
});