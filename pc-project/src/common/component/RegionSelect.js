/**
 * @file 地址选择器（选择 省 / 市 / 区 / 商圈）
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var store = require('common/store');

    var filter = '';

    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 容器元素，从它往下找 .province, .city, .area, .country
     * @property {string=} options.filter='seek_teacher' 来自于帮我找老师
     * @property {?string} options.prefix 生成的 hidden input name 前缀，避免出现一个表单多处同名的情况
     * @property {?string} options.provinceId 选中的省 ID
     * @property {?string} options.cityId 选中的市 ID
     * @property {?string} options.areaId 选中的区 ID
     * @property {?string} options.countryId 选中的县 ID
     * @property {?Function} options.onProvinceChange
     * @property {?Function} options.onCityChange
     * @property {?Function} options.onAreaChange
     * @property {?Function} options.onCountryChange
     * @property {?string} options.provinceText 省 显示的文字
     * @property {?string} options.cityText 市 显示的文字
     * @property {?string} options.areaText 区 显示的文字
     * @property {?string} options.countryText 商圈 显示的文字
     *
     * @property {?Function} options.callback 刷新完信息后的回调函数
     *
     * @property {boolean} options.eachAll 全国/全省/全市(/全部)
     */
    function RegionSelect(options) {
        $.extend(this, options);
        this.init();
    }

    RegionSelect.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            filter = me.filter;

            var prefix = me.prefix || '';

            me.provinceSelect = new Select({
                element: element.find('.province'),
                defaultText: me.provinceText || '- 省 -',
                name: prefix + 'province',
                onChange: function (e, data) {

                    getCityList(data.value)
                    .done(function (response) {

                        // 全省权限
                        if (store.get('user').globalDistrict == '1') {
                            if (me.eachAll && response.length > 1) {
                                response.unshift({
                                    id: data.value,
                                    name: '全省'
                                });
                            }
                        }

                        refreshSelect(
                            me.citySelect,
                            response,
                            response.length === 1 ? response[0].id : null
                        );
                    });

                    if ($.isFunction(me.onProvinceChange)) {
                        me.onProvinceChange(data);
                    }

                }
            });

            me.citySelect = new Select({
                element: element.find('.city'),
                defaultText: me.cityText || '- 市 -',
                name: prefix + 'city',
                onChange: function (e, data) {

                    getAreaList(data.value)
                    .done(function (response) {

                        if (me.eachAll) {
                            response.unshift({
                                id: data.value,
                                name: '全市'
                            });
                        }

                        refreshSelect(
                            me.areaSelect,
                            response,
                            null
                        );
                    });

                    if ($.isFunction(me.onCityChange)) {
                        me.onCityChange(data);
                    }

                }
            });

            me.areaSelect = new Select({
                element: element.find('.area'),
                defaultText: me.areaText || '- 区 -',
                name: prefix + 'area',
                onChange: function (e, data) {

                    getCountryList(data.value)
                    .done(function (response) {

                        if (me.eachAll) {
                            response.unshift({
                                id: data.value,
                                name: '全部'
                            });
                        }

                        refreshSelect(
                            me.countrySelect,
                            response,
                            null
                        );
                    });

                    if ($.isFunction(me.onAreaChange)) {
                        me.onAreaChange(data);
                    }

                }
            });

            me.countrySelect = new Select({
                element: element.find('.country'),
                defaultText: me.countrySelect || '- 商圈 -',
                name: prefix + 'country',
                onChange: function (e, data) {
                    if ($.isFunction(me.onCountryChange)) {
                        me.onCountryChange(data);
                    }
                }
            });

            me.refresh();

        },

        /**
         * 刷新下拉框
         *
         * @param {Object} data
         * @property {string} data.provinceId
         * @property {string} data.cityId
         * @property {string} data.areaId
         * @property {string} data.countryId
         */
        refresh: function (data) {

            var me = this;

            if (data) {
                $.extend(me, data);
            }

            var provinceChange = me.provinceSelect.onChange;
            var cityChange = me.citySelect.onChange;
            var areaChange = me.areaSelect.onChange;
            var countryChange = me.countrySelect.onChange;

            me.provinceSelect.onChange =
            me.citySelect.onChange =
            me.areaSelect.onChange =
            me.countrySelect.onChange = null;

            $
            .when(
                getProvinceList(),
                getCityList(me.provinceId),
                getAreaList(me.cityId),
                getCountryList(me.areaId)
            )
            .done(function (provinceList, cityList, areaList, countryList) {

                // 全国权限
                if (store.get('user').globalDistrict == '1') {
                    if (me.eachAll) {
                        provinceList.unshift({
                            id: 0,
                            name: '全国'
                        });
                    }
                }

                refreshSelect(
                    me.provinceSelect,
                    provinceList,
                    me.provinceId
                );

                refreshSelect(
                    me.citySelect,
                    cityList,
                    me.cityId
                );

                refreshSelect(
                    me.areaSelect,
                    areaList,
                    me.areaId
                );

                refreshSelect(
                    me.countrySelect,
                    countryList,
                    me.countryId
                );

                me.provinceSelect.onChange = provinceChange;
                me.citySelect.onChange = cityChange;
                me.areaSelect.onChange = areaChange;
                me.countrySelect.onChange = countryChange;


                if ($.isFunction(me.callback)) {
                    me.callback();
                }

            });
        }
    };

    var provinceCache = null;
    var cityCache = { };
    var areaCache = { };
    var countryCache = { };

    function resolvePromise(promise, data) {
        setTimeout(
            function () {
                promise.resolve(data);
            },
            0
        );
    }

    function getProvinceList() {

        var promise = $.Deferred();

        if (provinceCache) {
            resolvePromise(
                promise,
                $.extend(true, [], provinceCache)
            );
        }
        else {
            service
            .getRegionList({
                filter: filter
            })
            .done(function (response) {
                provinceCache = response;
                resolvePromise(
                    promise,
                    $.extend(true, [], response)
                );
            });
        }

        return promise;
    }

    function getCityList(provinceId) {

        var promise = $.Deferred();

        if (!provinceId) {
            resolvePromise(promise, []);
        }
        else if (cityCache[provinceId]) {
            resolvePromise(
                promise,
                $.extend(true, [], cityCache[provinceId])
            );
        }
        else {
            service
            .getRegionList({
                id: provinceId,
                filter: filter
            })
            .done(function (response) {
                cityCache[provinceId] = response;
                resolvePromise(
                    promise,
                    $.extend(true, [], response)
                );
            });
        }

        return promise;
    }

    function getAreaList(cityId) {

        var promise = $.Deferred();

        if (!cityId) {
            resolvePromise(promise, []);
        }
        else if (areaCache[cityId]) {
            resolvePromise(
                promise,
                $.extend(true, [], areaCache[cityId])
            );
        }
        else {
            service
            .getRegionList({
                id: cityId,
                filter: filter
            })
            .done(function (response) {

                areaCache[cityId] = response;
                resolvePromise(
                    promise,
                    $.extend(true, [], response)
                );
            });
        }

        return promise;
    }

    function getCountryList(areaId) {

        var promise = $.Deferred();

        if (!areaId) {
            resolvePromise(promise, []);
        }
        else if (countryCache[areaId]) {
            resolvePromise(
                promise,
                $.extend(true, [], countryCache[areaId])
            );
        }
        else {
            service
            .getRegionList({
                id: areaId,
                filter: filter
            })
            .done(function (response) {
                countryCache[areaId] = response;
                resolvePromise(
                    promise,
                    $.extend(true, [], response)
                );
            });
        }

        return promise;
    }

    /**
     * 把数据源格式转为 Select 使用的格式
     *
     * @inner
     * @param {Array} data
     * @return {Array}
     */
    function format(data) {
        return $.map(
            data || [ ],
            function (item) {
                return {
                    text: item.name,
                    value: item.id
                };
            }
        );
    }


    function refreshSelect(select, data, id) {

        select.refresh({
            data: format(data),
            value: id != null ? id : null
        });

    }



    return RegionSelect;

});