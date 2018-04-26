/**
 * @file 设置地址弹框
 * @author wangtianhua
 */
define(function (require, exports) {

    var ractiveDialog = require('../../common/function/ractiveDialog');
    var service = require('./service');
    var Validator = require('custom/form/Validator');

    function getTextByValue(data, value) {
        var text = '';
        $.each(
            data || [ ],
            function (index, item) {
                if (item.value == value) {
                    text = item.text;
                    return false;
                }
            }
        );
        return text;
    }

    /**
     * @param {Object} options
     * @property {Function=} options.onsuccess
     */
    return function (options) {

        options = options || { };

        var dialog = ractiveDialog({
            template: require('html!./AddressDialog.html'),
            data: {
                style: require('text!./AddressDialog.styl'),
                canSave: true,
                addressSelectOptions: {
                    className: 'address-select',
                    province: {
                        name: 'category1',
                        className: 'province-select',
                        defaultText: '省',
                        data: null,
                        value: ''
                    },
                    city: {
                        name: 'category2',
                        className: 'city-select',
                        defaultText: '市',
                        data: null,
                        value: ''
                    },
                    area: {
                        name: 'category3',
                        className: 'area-select',
                        defaultText: '区',
                        data: null,
                        value: ''
                    }
                },
                addressOptions: {
                    load: function (query, callback) {
                        service
                        .getAddressSuggestion({
                            query: query,
                            region: this.get('addressSelectOptions.province.value'),
                        })
                        .done(function (response) {
                            if (response.result.length) {
                                callback(null, response.result);
                            }
                        });
                    },
                    render: function (data) {
                        var html = '';

                        $.each(
                            data,
                            function(index,item){
                                html += '<li class="address-choose item" data-value="'
                                      +     item.name
                                      + '">'
                                      +     '<i class="icon icon-bd-marker"></i>'
                                      +     '<span class="link">'
                                      +         item.name
                                      +     '</span>'
                                      +     '<em class="city">' + item.city + item.district + '</em>'
                                      + '</li>';
                            }
                        );

                        return html;
                    },
                    input: {
                        name: 'address',
                        value: '',
                        placeholder: '不需要重复填写省市区，为保证定位可靠，建议提供精确到街道的地址',
                        className: 'address-input location-addr',
                        multiple: true
                    }
                },
                mapOptions: {
                    address: '',
                    needMarker: true
                },
                mapDisabled: true,
                mapHidden: true,
                asRegularAddress: false
            },
            components: {
                AddressSelect: require('../../common/component/AddressSelect'),
                AutoComplete: require('../../common/component/AutoComplete'),
                BaiduMap: require('../../common/component/BaiduMap')
            },
            onrender: function () {
                this.observe('addressOptions.input.value', function (value) {
                    this.set('mapDisabled', !value);
                    if (value) {
                        this.pin();
                    }
                });
            },
            toggleStatus: function () {
                this.set(
                    'asRegularAddress',
                    !this.get('asRegularAddress')
                );
            },
            getAddress: function () {

                var province = this.get('addressSelectOptions.province.value');
                var city = this.get('addressSelectOptions.city.value');
                var area = this.get('addressSelectOptions.area.value');
                var location = this.get('addressOptions.input.value');

                var result = '';

                if (province !== '省') {
                    result += getTextByValue(
                        this.get('addressSelectOptions.province.data'),
                        province
                    );
                }
                if (city !== '市' && city != province) {
                    // 避免省市相同数据的情况
                    result += getTextByValue(
                        this.get('addressSelectOptions.city.data'),
                        city
                    );
                }
                if (province !== '区') {
                    result += getTextByValue(
                        this.get('addressSelectOptions.area.data'),
                        area
                    );
                }
                if (location !== '') {
                    result += location;
                }

                return result;
            },
            pin: function () {

                this.set({
                    mapHidden: false,
                    'mapOptions.address': this.getAddress()
                });
            },
            backPosition: function() {
                this.set(
                    'mapOptions.address',
                    this.getAddress()
                );
            },
            savePosition: function () {
                var me = this;

                var cityId = me.get('addressSelectOptions.city.value');

                var areaId = me.get('addressSelectOptions.area.value');
                var areaName = getTextByValue(
                    me.get('addressSelectOptions.area.data'),
                    areaId
                );

                var bdDetailAddress = me.get('mapOptions.detail') || { };
                var bdAreaName = bdDetailAddress.district || '';

                // 保存位置

                return service
                .checkAddress({
                    cityId: cityId,
                    areaName: bdAreaName
                })
                .done(function (response) {

                    if (response.code === 0) {

                        var matchArea = response.data.match_area;
                        if (matchArea && matchArea.id) {

                            if (areaId != matchArea.id) {
                                confirm({
                                    content: '小秘书发现你输入的地址似乎在“'
                                            + bdAreaName
                                            + '”<br />是否需要小秘书帮你把“'
                                            + areaName
                                            + '”修改为“'
                                            + bdAreaName
                                            + '”呢？',
                                    title: '温馨提示',
                                    width: 400,
                                    buttons: [
                                        {
                                            text: '帮我修改',
                                            type: 'primary',
                                            action: function () {
                                                me.set(
                                                    'addressSelectOptions.area.value',
                                                    matchArea.id
                                                );
                                                this.hide();
                                            }
                                        },
                                        {
                                            text: '不修改',
                                            action: function () {
                                                this.hide();
                                            }
                                        }
                                    ]
                                });
                            }

                        }
                    }
                });
            },
            save: function() {

                var me = this;
                if (!me.get('canSave')) {
                    return;
                }
                me.validator = new Validator({
                    mainElement: $('.address-dialog'),
                    fields: {
                        address: {
                            rules: {
                                required: true,
                                maxlength: 20
                            },
                            errors: {
                                required: '请填写详细地址',
                                maxlength: '请将字数控制在 20 字以内'
                            }
                        },
                        category1: {
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您所在的省'
                            }
                        },
                        category2: {
                            before: function (data) {
                                var category1 = data.category1;
                                if (category1 && !category1.value) {
                                    return false;
                                }
                            },
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您所在的市'
                            }
                        },
                        category3: {
                            before: function (data) {
                                var category2 = data.category2;
                                if (category2 && !category2.value) {
                                    return false;
                                }
                            },
                            rules: {
                                required: true
                            },
                            errors: {
                                required: '请填写您所在的区'
                            }
                        }
                    }
                });

                if (me.validator.validate(true)) {
                    var asRegularAddress;
                    if (me.get('asRegularAddress')) {
                        asRegularAddress = 1
                    }
                    else {
                        asRegularAddress = 0
                    }
                    var addressData = {
                        areaId: me.get('addressSelectOptions.area.value'),
                        locationAddr: me.get('addressOptions.input.value'),
                        lng: me.get('mapOptions.lng'),
                        lat: me.get('mapOptions.lat'),
                        asRegularAddress: asRegularAddress,
                    };

                    service
                    .upsertAddress(addressData)
                    .done(function (response) {
                        if (response.code === 0) {
                            dialog.hide();
                            tip({
                                type: 'success',
                                content: '添加新地址成功'
                            })
                            .then(
                                function () {
                                    var area = '';

                                    var province = me.get('addressSelectOptions.province.value');
                                    var city = me.get('addressSelectOptions.city.value');
                                    var area = me.get('addressSelectOptions.area.value');
                                    var location = me.get('addressOptions.input.value');

                                    if (province !== '省') {
                                        area += getTextByValue(
                                            me.get('addressSelectOptions.province.data'),
                                            province
                                        );
                                    }
                                    if (city !== '市' && city != province) {
                                        // 避免省市相同数据的情况
                                        area += getTextByValue(
                                            me.get('addressSelectOptions.city.data'),
                                            city
                                        );
                                    }
                                    if (province !== '区') {
                                        area += getTextByValue(
                                            me.get('addressSelectOptions.area.data'),
                                            area
                                        );
                                    }
                                    if (location !== '') {
                                        area += location;
                                    }

                                    if ($.isFunction(options.onsuccess)) {
                                        options.onsuccess({
                                            addressData: addressData,
                                            area: area,
                                            data: response.data
                                        });
                                    }
                                }
                            );
                        }
                    });
                    me.set('canSave', false);
                }
            },
            close: function () {
                dialog.hide();
            }
        });

        return dialog;
    };

});