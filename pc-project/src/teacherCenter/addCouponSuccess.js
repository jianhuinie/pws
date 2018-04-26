/**
 * @file 老师用户中心 新建优惠券成功
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var qrcode = require('common/component/qrcode');
    var etpl = require('cobble/util/etpl');
    var Dialog = require('cobble/ui/Dialog');

    etpl.addFilter('truncate', function (value, length) {
        return value.substring(0, length);
    });

    // 渲染优惠券列表
    var renderCouponList = function (staticData) {
        var render = etpl.compile($('#coupon-selected-list-template').html());
        renderCouponList = function(couponData) {
            return render({
                    data: {
                        topic: staticData.topic,
                        couponList: couponData
                    }
                });
        };
    };

    // 显示优惠券列表对话框
    function showCoupons (couponList) {

        var dtd = $.Deferred();
        var dialog = new Dialog({
            title: '选择优惠券',
            width: 806,
            content: renderCouponList(couponList)
        });
        var selected = false;

        dialog.element
            .on('click', '.btn-replace', function () {
                dialog.hide();
                dtd.resolve(selected);
            })
            .on('click', '.btn-cancel', function () {
                dialog.hide();
                dtd.reject();
            })
            .on('click', '.coupon-item', function () {
                var me = $(this);
                selected = couponList[+me.data('index')];
                me.addClass('selected')
                    .siblings().removeClass('selected');
            })

        return dtd;
    }

    exports.init = function () {

        // 老师number号
        var number = store.get('user').number;
        // 优惠券信息
        var coupon = store.get('coupon');

        // 初始化优惠劵对话框
        renderCouponList({
            topic: '你的主页目前已经有<span class="text-light">3</span>张优惠券了，请选择需要替换的那一张优惠券！'
        });

        var container = $('#content');
        var successElement = container.find('.add-success');

        // 领取优惠券页面链接
        var qrUrl = store.get('qrUrl');
        // 老师查看优惠券页面链接
        var dtUrl = store.get('dtUrl');

        // 生成二维码
        var supportCavans = document.createElement('canvas').getContext;
        qrcode({
            element: successElement.find('.qrcode'),
            text: qrUrl,
            width: 140,
            height: 140,
            render: supportCavans ? 'canvas' : 'table'
        });

        // 查看优惠券领取页
        successElement.find('.to-url').attr('href', dtUrl);

        successElement
        .on('click', '.btn-share', function () {
            successElement.find('.baidu-share').toggle();
        });

        // 是否推到首页
        container.find('.show-on-main').click(function(event) {
            var input = $('input', this);
            var checked = input.prop('checked');
            if (event.target.nodeName && event.target.nodeName.toLowerCase() !== 'input') {
                checked = !checked;
                input.prop('checked', checked);
            }
            if (checked) {
                service.getCouponList({number: number})
                    .done(function(response) {
                        var couponList = response.data.list;
                        if (couponList.length >= 3) {
                            showCoupons(couponList).done(function(selected){
                                service.couponReplace({
                                    srcId: selected.id,
                                    destId: coupon.id
                                }).done(function (result) {
                                    success('该优惠券已成功放置到个人主页展示');
                                });
                            });
                        } else {
                            service.syncCoupon({
                                serialNum: coupon.serial
                            }).done(function(result) {
                                success('该优惠券已成功放置到个人主页展示');
                            });
                        }
                    });
            } else {
                service.syncCoupon({
                        serialNum: coupon.serial
                    }).done(function(result) {
                        success('该优惠券已成功从首页隐藏');
                    });
            }
        });

    };


});