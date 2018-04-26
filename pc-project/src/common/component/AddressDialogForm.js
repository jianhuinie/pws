/**
 * @file 地址薄表单 - 含地图
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var RegionSelect = require('common/component/RegionSelect');
    var AutoComplete = require('cobble/ui/AutoComplete');
    var baiduMap = require('common/map/baidu');
    var Tooltip = require('cobble/ui/Tooltip');
    var form = require('common/form');
    var Text = require('cobble/form/Text');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var areaChangeSrc = 'user'; // 区值变更来源 user，用户手动更新；saveAddr:保存位置导致区变更回填
    var userCity; // suggestion 市信息

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {string} options.province  省
     * @property {string} options.city  市
     * @property {string} options.area  区
     * @property {string} options.country  商圈
     * @property {string} options.location_addr  详细地址
     *
     */
    function AddressDialogForm(options) {
        $.extend(this, options);
        this.init();
    }

    AddressDialogForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            Tooltip.init(element.find('[data-title]'));

            // 地址
            me.regionSelect = new RegionSelect({
                element: element.find('.region-select'),
                eachAll: false,
                onCityChange: function (e) {
                    userCity = e.text ;
                },
                onAreaChange: function (e) {

                    var locationTextarea = element.find('textarea[name="location_addr"]');

                    if (e.text != undefined) {
                        locationTextarea.prop('disabled', false);
                        // 区变，则刷新经纬度
                        if (locationTextarea.val()) {
                            if (areaChangeSrc == 'user') {
                                getAreaToMap(); // 刷新经纬度
                            }
                            else {
                                areaChangeSrc = 'user'; // 重置标志
                            }
                        }
                    }

                },
                callback: me.callback

            });

            // 这里没有全国全省全市的逻辑
            element.find('.region-select li').each(function () {
                var delAll = ['全国', '全省', '全市'];
                if ($.contains($(this).text(), delAll)) {
                    $(this).remove();
                }
            });

            // 详细地址的suggestion
            var suggestionInput = element.find('textarea[name="location_addr"]');
            var suggestionList = element.find('.suggestion-list');

            new AutoComplete({
                element: suggestionInput,
                menu: suggestionList,
                activeClass: 'active',
                renderTemplate: function (data) {
                    var html = '';
                    $.each(
                        data || [],
                        function (index, item) {
                            html = html
                                 + '<li data-text="' + item.name + '">'
                                 +     '<i class="icon icon-location"></i>'
                                 +     '<span>' + item.name + '</span>'
                                 +     '<em>' + item.city + item.district + '</em>'
                                 + '</li>';
                        }
                    );
                    return html;
                },
                load: function (text, callback) {

                    service
                    .getAddressSuggestion({
                        query: text,
                        region: userCity,
                    })
                    .done(function (response) {
                        if (response.result.length) {
                            callback(response.result);
                        }

                    });
                },
                onItemClick: function (e) {

                    var pca = ''; // suggestion中的省市区
                    var location = ''; // suggestion中的具体地址
                    $.each(element.find('.suggestion-list li'), function (index, item) {
                        if ($(item).hasClass('active')) {
                            pca = $(item).find('em').text();
                            location = $(item).data('text');
                        }
                    });

                    if (pca) {
                        location = pca + location;
                    }
                    else {
                        location = getArea();
                    }

                    element.find('#map').show();
                    element.find('.area-hint').hide();

                    baiduMap.addrReso('map', location);

                }
            });

            element
            .on('blur', 'textarea[name="location_addr"]', function (e) {
                var target = $(e.currentTarget);
                if (target.val()) {
                    element.find('.show-map').prop('disabled', false);
                }
                else {
                    element.find('.show-map').prop('disabled', true);
                }
            })

            .on('click', '.show-map', function () { // 地图定位
                getAreaToMap();
            })

            .on('click', '.btn-initial', function () { // 回原位置
                baiduMap.makeMarker('map', area);
            });

            // 保存位置
            var savePositionBtn = new SaveButton({
                element: element.find('.btn-over'),
                save: function () {

                    var bdAreaName = element.find('input[name="bd_area_name"]').val();
                    var cityId = element.find('input[name="city"]').val();
                    var areaId = element.find('input[name="area"]').val();
                    var userAreaName = element.find('.area span').text();

                    // 保存位置
                    return service
                    .checkAddress({
                        cityId: cityId,
                        areaName: bdAreaName
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            element.find('.map-oper').hide();

                            if (response.data.match_area && response.data.match_area.id) {

                                if (areaId != response.data.match_area.id) {
                                    confirm({
                                        content: '小秘书发现你输入的地址似乎在“' + bdAreaName + '”<br />是否需要小秘书帮你把“' + userAreaName + '”修改为“' + bdAreaName + '”呢？',
                                        title: '温馨提示',
                                        width: 400,
                                        buttons: [
                                            {
                                                text: '帮我修改',
                                                type: 'primary',
                                                handler: function () {
                                                    // 获取地图区级信息 - 只刷新区信息
                                                    areaChangeSrc = 'saveAddr'; // 牵涉区变动地图刷新与否
                                                    me.regionSelect.areaSelect.setValue(response.data.match_area.id);
                                                    this.hide();
                                                }
                                            },
                                            {
                                                text: '不修改',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            }
                                        ]
                                    });
                                }

                            }
                        }
                    });

                }
            });

            me.locationAddrInput = new Text({
                element: element.find('[name="location_addr"]')
            });

        },

        setAreaChangeSrc: function (data) {
            areaChangeSrc = data;
        },

        getArea: getArea

    };

    /*
     * 获取当前用户编辑的省市区地址信息，并定位地图
     */
    function getAreaToMap () {
        var formElement = $('.form');

        formElement.find('#map').show();
        formElement.find('.area-hint').hide();

        baiduMap.addrReso('map', getArea());

    }

    /*
     * 拼接当前用户输入的省市区信息
     * 如果有suggestion，优先从suggestion中取地址信息
     */
    var area = ''; // 省市区信息
    function getArea () {

        var formElement = $('.form');
        var data = form.parse(formElement);
        var regions= formElement.find('.region-select');
        var currentPro = regions.find('.province b span').text();
        var currentCity = regions.find('.city b span').text();
        var currentArea = regions.find('.area b span').text();
        var currentLocation = data.location_addr;

        area = ''; // 重新获取城市

        if (currentPro != '- 省 -') {
            area = currentPro;
        }
        if (currentCity != '- 市 -' && currentCity != currentPro ) {
            // 避免省市相同数据的情况
            area += currentCity;
        }
        if (currentPro != '- 省 -') {
            area += currentArea;
        }
        if (currentLocation != '') {
            area += currentLocation;
        }
        return area;
    }


    return AddressDialogForm;

});