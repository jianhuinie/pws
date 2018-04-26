/**
 * @file 下拉地址
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../service');

    return Ractive.extend({
        template: require('html!./AddressSelector.html'),
        data: function () {
            return {
                style: require('text!./AddressSelector.styl'),
                options: {
                    id: '',
                    location_addr: ''
                },
                showMore: false,
                addressOptions: {
                    className: 'fluid',
                    showMenuTrigger: 'click',
                    load: function (query, callback) {
                        var addressList = [];
                        service
                        .getAddressList()
                        .done(function (response) {
                            $.map(
                                response.data,
                                function (val) {
                                    addressList.push({
                                        id: val.id,
                                        location_addr: val.location_addr + val.detailed_address
                                    });
                                }
                            );
                            callback(null, addressList);
                        });
                    },
                    render: function (data) {
                        var html = '';

                        $.each(
                            data,
                            function (index, item) {
                                html += '<li class="item texts" data-value="'
                                      +     item.location_addr
                                      + '">'
                                      +     '<i class="icon icon-bd-marker text"></i>'
                                      +     '<span class="link text">'
                                      +         item.location_addr
                                      +     '</span>'
                                      + '</li>';
                            }
                        );

                        return html;
                    },
                    input: {
                        name: 'address',
                        value: '',
                        placeholder: '不需要重复填写省市区，为保证定位可靠，建议提供精确到街道的地址',
                        className: 'address-input fluid',
                        readonly: true
                    }
                },
            };
        },
        components: {
            AutoComplete: require('userCenter/common/component/AutoComplete'),
        },
        onrender: function () {
            var me = this;

            me.bindData({
                'addressOptions.input.value': 'options.location_addr'
            });
            me.observe('addressOptions.input.value', function (value) {
                var addressList = [];
                var data = me.get('addressOptions.data');

                if (!data) {
                    return;
                }

                $.each(
                    data,
                    function (index, item) {
                        if (item.location_addr == value) {
                            me.set('options.id', item.id);
                        }
                    }
                );

            });
            me.observe('addressOptions.opened', function (opened) {
                if (opened) {
                    me.set('showMore', true);
                }
                else {
                    me.set('showMore', false);
                }
            });
        },
        setAddress: function (address) {
            var me = this;
            me.set('options', address);
        }
    });
})