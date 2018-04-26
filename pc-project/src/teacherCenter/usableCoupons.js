/**
 * @file 我的学生 - 可领取优惠券列表页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var SaveButton = require('common/component/SaveButton');


    exports.init = function () {

        var container = $('#content');
        var couponListDiv = container.find('.coupon-list');

        var studentNum = store.get('studentNum');

        container
        .on('click', '#select-all', function (e) { // 全选

            var target = $(e.currentTarget);
            if (target.prop('checked')) {
                couponListDiv
                .find('input[name="serial_number"]')
                .each(function (index, item) {
                    $(item).prop('checked', true);
                });
            }
            else {
                couponListDiv
                .find('input[name="serial_number"]')
                .each(function (index, item) {
                    $(item).prop('checked', false);
                });
            }
        });

        // 发送优惠券领取页链接
        var sendButton = new SaveButton({
            element: container.find('.btn-send'),
            save: function () {

                var serialNumArr = [];

                couponListDiv
                .find('input[name="serial_number"]')
                .each(function (index, item) {
                    if ($(item).prop('checked')) {
                        serialNumArr.push($(item).val());
                    }
                });

                var studentNumArr = [studentNum];

                if (serialNumArr.length) {
                    return service
                    .sendCoupon(
                        {
                            serialNum: serialNumArr,
                            studentNum: studentNumArr
                        }
                    )
                    .done(function (response) {

                        if (response.code === 0) {
                            success('发送成功', function(){
                                location.reload();
                            });
                        }
                    });
                }
                else {
                    alert('请选择需要发送的优惠券');
                }


            }
        });

    };


});