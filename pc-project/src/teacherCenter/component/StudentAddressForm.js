/**
 * @file 学生所在地 - 含地图
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var RegionSelect = require('common/component/RegionSelect');
    var AutoComplete = require('cobble/ui/AutoComplete');
    // var Editor = require('common/component/Editor');
    var baiduMap = require('common/map/baidu');
    var LocationMapDialog = require('common/component/LocationMapDialog');

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
     * @property {string} options.provinceId  省
     * @property {string} options.cityId  市
     * @property {string} options.areaId  区
     * @property {string} options.countryId  商圈
     * @property {string} options.locationAddr  详细地址
     * @property {Function=} options.callback  初始化后成功的回调
     *
     */
    function AddressForm(options) {
        $.extend(this, options);
        this.init();
    }

    AddressForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            // 常用地址
            me.regionSelect = new RegionSelect({
                element: element.find('.region-select'),
                eachAll: false,
                onCityChange: function (e) {
                    userCity = e.text ;
                },
                onAreaChange: function (e) {

                    var locationAddr = element.find('textarea[name="location_addr"]');

                    if (e.text != undefined) {
                        locationAddr.prop('disabled', false);
                        // 区变，则刷新经纬度
                        if (locationAddr.val()) {

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
                onItemClick: function () {
                    var formElement = $('.form');
                    var pca = ''; // suggestion中的省市区
                    var location = ''; // suggestion中的具体地址
                    $.each(formElement.find('.suggestion-list li'), function (index, item) {
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

                    formElement.find('#map').show();
                    formElement.find('.area-hint').hide();
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
            })

            .on('click', '.amplify', function () { // 查看大图

                var currentArea = getArea();
                var currentLng = element.find('input[name="lng"]').val();
                var currentLat = element.find('input[name="lat"]').val();

                new LocationMapDialog({
                    area: currentArea,
                    lng: currentLng,
                    lat: currentLat,
                    closeDialog: function () {
                        // dialog对象销毁的同时，销毁big-map对象
                        var existedMap = baiduMap.getExistedMap();
                        existedMap['big-map'] = null;
                    },
                    saveAddress: function (lng, lat) {
                        baiduMap.addrReso('map', currentArea, lng, lat);
                    }
                });

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

            /*me.locationAddrInput = new Text({
                element: element.find('[name="location_addr"]')
            });*/

        },

        refresh: function (data) {

            var me = this;
            var element = me.element;

            me.data = data;

            // 详细地址
            var locationAddr = element.find('[name="location_addr"]');
            locationAddr.val(data.regular_address.location_addr);
            locationAddr.prop('disabled', false);

            element.find('.show-map').prop('disabled', false); // 定位地图

            // 所在地区
            var provinceId = data.regular_address ? data.regular_address.province.id : null;
            var cityId = data.regular_address ? data.regular_address.city.id : null;
            var areaId = data.regular_address ? data.regular_address.area.id : null;
            // var countryId = data.regular_address ? data.regular_address.country.id : null;

            userCity = data.regular_address.city.name; // 首次反填表单信息，获取市名称

            me.regionSelect.refresh({
                provinceId: provinceId,
                cityId: cityId,
                areaId: areaId,
                onCityChange: function (e) {
                    userCity = e.text ;
                },
                onAreaChange: function (e) {

                    if (e.text != undefined) {
                        locationAddr.prop('disabled', false);
                        // 区变，则刷新经纬度
                        if (locationAddr.val()) {

                            if (areaChangeSrc == 'user') {
                                getAreaToMap(); // 刷新经纬度
                            }
                            else {
                                areaChangeSrc = 'user'; // 重置标志
                            }
                        }
                    }
                },
                callback: function () {
                    // 地图加载触发 - 这里应该用经纬度定位地图
                    getAreaToMap(data.lng, data.lat);
                }
            });

        },

        setAreaChangeSrc: function (data) {
            areaChangeSrc = data;
        }

    };

    /*
     * 获取当前用户编辑的省市区地址信息，并定位地图
     * 如果有lng,lat 经纬度优先定位
     */
    function getAreaToMap (lng, lat) {

        var formElement = $('.form');

        formElement.find('#map').show();
        formElement.find('.area-hint').hide();
        if (lng && lat) {
            baiduMap.addrReso('map', getArea(), lng, lat);
        }
        else {
            baiduMap.addrReso('map', getArea());
        }
    }


    /*
     * 拼接当前用户输入的省市区信息
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

    return AddressForm;

});