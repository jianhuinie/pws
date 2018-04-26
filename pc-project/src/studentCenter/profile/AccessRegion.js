/**
 * @file 可授课范围
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var RegionSelect = require('common/component/RegionSelect');
    var service = require('common/service');

    function AccessRegion(options) {
        $.extend(this, options);
        this.init();
    }

    AccessRegion.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var regionBox =
            me.regionBox = element.find('.region-box');

            var areaList =
            me.areaList = element.find('.area-list');

            var countryList =
            me.countryList = element.find('.country-list');

            var regionList =
            me.regionList = element.find('.region-list');

            var selectedList =
            me.selectedList = element.find('.selected-region');

            var regionSelect =
            me.regionsSelect = new RegionSelect({
                element: element,
                prefix: 'region_',
                onProvinceChange: function (data) {
                    areaList.html('');
                    countryList.html('');
                },
                onCityChange: function (data) {

                    var id = data.value;

                    if (id != null) {
                        service
                        .getRegionList({ id: id, includeSubway: true })
                        .done(function (response) {

                            var html = createList(response);
                            if (html.length > 0) {
                                regionBox.show();
                            }

                            areaList.html(html);
                            countryList.html('');

                        });
                    }

                    regionBox.hide();

                }
            });

            var activeClass = 'active';

            element

            .on('click', '.area-list li', function (e) {

                var target = $(e.currentTarget);
                if (target.hasClass(activeClass)) {
                    return;
                }

                var data = target.data();

                // 单选
                areaList.find('.' + activeClass).removeClass(activeClass);
                target.addClass(activeClass);

                service
                .getRegionList({ id: data.id, includeSubway: true })
                .done(function (response) {

                    // 第一个是`全部`
                    response.unshift({
                        id: data.id,
                        name: data.name,
                        text: '全部'
                    });

                    countryList.html(
                        createList(response)
                    );

                    // 默认选中全部
                    countryList.find('[data-id="' + data.id + '"]').click();

                    // 自动加上 activeClass
                    regionList
                    .find('li')
                    .each(function () {

                        var id = $(this).data('id');
                        countryList.find('[data-id="' + id + '"]').addClass(activeClass);

                    });



                });

            })

            .on('click', '.country-list li', function (e) {

                var target = $(e.currentTarget);

                if (target.hasClass(activeClass)) {
                    return;
                }

                // 全部 和 其他选项 互斥
                var index = target.index();

                var items = countryList.find('li');
                var allItem = items.first();

                // 全部 是第一个 li
                var isAllActive = allItem.hasClass(activeClass);

                if (isAllActive) {
                    if (index > 0) {
                        allItem.removeClass(activeClass);
                        regionList.find('[data-id="' + allItem.data('id') + '"]').remove();
                    }
                }
                else {
                    if (index === 0) {

                        countryList
                        .find('.' + activeClass)
                        .each(function () {

                            var item = $(this);
                            item.removeClass(activeClass);
                            regionList.find('[data-id="' + item.data('id') + '"]').remove();

                        });

                    }
                }

                target.addClass(activeClass);

                var data = target.data();
                if (regionList.find('[data-id="' + data.id + '"]').length === 0) {
                    regionList.append(
                        createTag(data)
                    );
                }

            })

            .on('click', '.icon-times', function (e) {

                var target = $(e.currentTarget).closest('li');
                var item = target.data();

                target.remove();

                countryList.find('[data-id="' + item.id + '"]').removeClass(activeClass);
            })

            .on('click', '.btn-primary', function (e) {

                var data = [ ];

                regionList
                .find('li')
                .each(function () {

                    data.push(
                        createItem(
                            $(this).data()
                        )
                    );

                });

                regionBox.hide();
                me.refresh();


                selectedList.show();
                selectedList.find('ul').html(
                    data.join('')
                );

            })

            .on('click', '.btn-default', function (e) {
                regionBox.hide();
                me.refresh();
            });

        },

        /**
         * 获得选中的 ID 数组
         *
         * @return {Array}
         */
        getValue: function () {

            var me = this;

            var data = [ ];

            me
            .selectedList
            .find('li')
            .each(function () {
                data.push(
                    $(this).data('id')
                );
            });

            return data.join(',');
        },


        refresh: function () {

            var me = this;
            var data = me.data || [ ];

            me.areaList.html('');
            me.countryList.html('');
            me.regionList.html(
                createTags(data)
            );

            me.regionBox.hide();


            var selectedList = me.selectedList;
            selectedList.find('ul').html(
                createList(data)
            );
            if (data.length > 0) {
                selectedList.show();
            }
            else {
                selectedList.hide();
            }


            me.regionsSelect.refresh({
                provinceId: null,
                cityId: null
            });
        }
    };

    function createList(data) {
        var html = [ ];
        $.each(
            data || [ ],
            function (index, item) {
                html.push(
                    createItem(item)
                );
            }
        );
        return html.join('');
    }

    function createItem(item) {
        return '<li data-id="' + item.id + '" data-name="' + item.name + '">'
             +     (item.text || item.name)
             + '</li>';
    }


    function createTags(data) {
        var html = [ ];
        $.each(
            data || [ ],
            function (index, item) {
                html.push(
                    createTag(item)
                );
            }
        );
        return html.join('');
    }

    function createTag(item) {
        return '<li data-id="' + item.id + '" data-name="' + item.name + '">'
             +     item.name
             +     '<i class="icon icon-times"></i>'
             + '</li>';
    }


    return AccessRegion;

});