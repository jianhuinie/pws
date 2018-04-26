define(function(require) {

    'use strict';

    var $ = require('zepto');
    var ui = require('common/ui');

    return function(page_data) {

        $('.list .unit').each(function (ind, ele) {
            var infoEle = $(this).find('.info');
            $(this)
            .on('click', '.info', function () {
                $('.unit .info').removeClass('choosen');
                $('.unit .info').find('.icon-checkmark').addClass('hidden');
                $(this).addClass('choosen');
                $(this).find('.icon-checkmark').removeClass('hidden');
            })
            .on('click', '.unit-edit-del .edit', function () {
                location.href = '/org_course/editAddress'
                    + '?purchase_id=' + encodeURIComponent($('.main-content').data('purchase-id'))
                    + '&user_name=' + encodeURIComponent(infoEle.data('user-name'))
                    + '&mobile=' + encodeURIComponent(infoEle.data('mobile'))
                    + '&area_id=' + encodeURIComponent(infoEle.data('area-id'))
                    + '&address=' + encodeURIComponent(infoEle.data('address'))
                    + '&address_id=' + encodeURIComponent(infoEle.data('address-id'))
                    + '&email=' + encodeURIComponent(infoEle.data('email'))
                    + '&province=' + encodeURIComponent(infoEle.data('province'))
                    + '&city=' + encodeURIComponent(infoEle.data('city'))
                    + '&area=' + encodeURIComponent(infoEle.data('area'))
                    + '&province_id=' + encodeURIComponent(infoEle.data('province-id'))
                    + '&city_id=' + encodeURIComponent(infoEle.data('city-id'))
                    + '&area_id=' + encodeURIComponent(infoEle.data('area-id'))
                    ;
            })
            .on('click', '.unit-edit-del .del', function () {
                ui.confirm({
                    content: '确定删除该地址吗？',
                    button_ok: '确定',
                    button_cancel: '取消'
                }).done(function() {
                    $.post('/org_course/deleteAddress', {
                        address_id: infoEle.data('address-id')
                    }, function () {
                        location.reload();
                    });
                });
            });
        });

        $('#main')
        .on('click', '.state-receive .no', function () {
            if ($('.choosen').data('address-id')) {
                $.post('/org_course/receiveTextbook', {
                    purchase_id: $('.main-content').data('purchase-id'),
                    address_id: $('.choosen').data('address-id')
                }, function () {
                    ui.remind('教材已领取');
                    location.href = '/student_center/order_detail?purchase_id=' + $('.main-content').data('purchase-id');
                    // location.reload();
                });
            }
            else {
                ui.remind('请先新增地址');
            }
        })
        .on('click', '.unit-add', function () {
            location.href = '/org_course/editAddress?purchase_id=' + $('.main-content').data('purchase-id');
        });

    };

});