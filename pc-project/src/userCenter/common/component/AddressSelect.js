/**
 * @file 地区选择器
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('common/service');

    function getAddress(id, callback) {
        return service
        .getRegionList({
            id: id,
            includeSubway: true
        })
        .done(function (response) {
            var data = $.map(
                response,
                function (item) {
                    return {
                        text: item.name,
                        value: item.id
                    };
                }
            );

            callback(data);
        });
    }

    return Ractive.extend({
        template: require('html!./AddressSelect.html'),
        data: function () {
            return {
                options: {

                    className: '',

                    province: {
                        name: '',
                        value: '',
                        data: null,
                        defaultText: '省'
                    },

                    city: {
                        name: '',
                        value: '',
                        data: null,
                        defaultText: '市'
                    },

                    area: {
                        name: '',
                        value: '',
                        data: null,
                        defaultText: '区'
                    }

                }
            };
        },
        components: {
            Select: require('./Select')
        },
        oninit: function () {

            var me = this;

            var hasArea = me.get('options.area');

            me.set('options.province.onselect', function () {
                var data = {
                    'options.city.value': ''
                };
                if (hasArea) {
                    data['options.area.value'] = '';
                    data['options.area.data'] = [];
                }
                me.set(data);
            });

            if (hasArea) {
                me.set('options.city.onselect', function () {
                    me.set('options.area.value', '');
                });
            }

            getAddress(
                null,
                function (data) {
                    me.set('options.province.data', data);
                }
            );

        },
        onrender: function () {

            var me = this;
            me.observe(
                'options.province.value',
                function (value) {
                    if (value) {
                        getAddress(
                            value,
                            function (data) {
                                me.set('options.city.data', data);
                            }
                        );
                    }
                }
            );
            var hasArea = me.get('options.area');
            if (hasArea) {
                me.observe(
                    'options.city.value',
                    function (value) {
                        if (value) {
                            getAddress(
                                value,
                                function (data) {
                                    me.set('options.area.data', data);
                                }
                            );
                        }
                    }
                );
            }
        }
    });

});