/**
 * @file 临时新增地址弹窗
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var AddressDialogForm = require('./AddressDialogForm');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var userType;

    var addressDialogForm;

    /**
     * 临时新增地址弹窗
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 申请成功后的回调
     */
    function AddressDialog(options) {

        $.extend(this, AddressDialog.defaultOptions, options);
        this.init();
    }

    AddressDialog.prototype = {

        init: function () {

            var me = this;

            me.dialog = new Dialog({
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#address-dialog-template').html(),
                width: me.width,
                skinClass: me.skinClass,
                disposeOnHide: false,
                onAfterShow: function () {

                    // 地址薄
                    addressDialogForm = new AddressDialogForm({
                        element: $('.set-address-dialog')
                    });
                }
            });

            var element = me.dialog.element;

            element
            .on('click', '.btn-save-cancel', function () {
                me.dialog.hide();
            });

            // 保存表单
            new SaveButton({
                element: element.find('.btn-save-address'),
                save: function () {

                    var areaId = element.find('input[name="area"]').val();
                    var locationAddr = element.find('textarea[name="location_addr"]').val();
                    var lng = element.find('input[name="lng"]').val();
                    var lat = element.find('input[name="lat"]').val();
                    var asRegularAddress = element.find('input[name="regular_address"]').val();

                    var addressData = {
                        areaId: areaId,
                        locationAddr: locationAddr,
                        lng: lng,
                        lat: lat,
                        asRegularAddress: asRegularAddress
                    };

                    // 发送数据
                    service
                    .upsertAddress(addressData)
                    .done(function (response) {
                        if (response.code === 0) {
                            success('添加新地址成功', function () {
                                var area = addressDialogForm.getArea();
                                me.dialog.hide();
                                if ($.isFunction(me.onSuccess)) {
                                    me.onSuccess(addressData, area, response.data);
                                }
                            });
                        }
                    });

                }
            });


        },
    };


    AddressDialog.defaultOptions = {
        title: '添加新地址',
        width: 780,
        onSuccess: $.noop,
        skinClass: 'set-address-dialog',
        disposeOnHide: true
    };

    return AddressDialog;
});