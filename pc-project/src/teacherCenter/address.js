/**
 * @file 地址管理
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var AddressForm = require('./component/AddressForm');
    var ComboBox = require('cobble/ui/ComboBox');
    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');
    var baiduMap = require('common/map/baidu');
    var store = require('common/store');
    var regionFlagPositions = require('common/data/regionFlagPositions');
    var Editor = require('common/component/Editor');

    var countryList; // 国家列表

    /*
     * 格式化国家列表数据
     */
    function formatData(data, startIndex) {
        var rt = $.map(data, function (region, index) {
                return {
                    text: region.name,
                    countryCode: region.country_code,
                    value: region.id
                }
            });

        return rt;
    }

    /*
     * 渲染国家列表 - 字母+地区
     */
    function getRegionHtml(data) {
        return ''
            +   $.map(data, function (item) {
                    return ''
                        +   '<li class="alphabet">' + item.text + '</li>'
                        +   $.map(item.list, function (region) {
                                return getRegionregionSnippet(region);
                            }).join('');

                }).join('');
    }

    /*
     * 渲染国家列表 - 地区
     */
    function getRegionregionSnippet(region) {
        return ''
            +   '<li data-value="' + region.value + '" '
            +   'data-text="' + region.text + '" '
            +   'data-country-code="' + region.countryCode + '">'

            +       '<i class="icon icon-region-flag" style="background-position:0 '
            +       regionFlagPositions[region.countryCode]
            +       '"></i>'
            +       region.text

            +   '</li>'
    }

    /**
     * 初始化
     */
    exports.init = function () {

        var me = this;
        var container = $('#content');
        var formElement = container.find('.form');
        var inlandForm = formElement.find('.inland-address');
        var foreignForm = formElement.find('.foreign-address');

        // 国内外地址
        var countryRadio = formElement.find('[name="country"]');
        var inlandRadio = countryRadio.filter('[value="1"]');
        var foreignRadio = countryRadio.filter('[value="2"]');

        // 国内地址
        var addressForm = new AddressForm({
            element: inlandForm
        });

        // 海外地址 - 国家列表
        var flag = foreignForm.find('.flag');
        var countryName = flag.next('span');

        var countrySelect = new ComboBox({
            element: foreignForm.find('.country-select'),
            button: foreignForm.find('.trigger'),
            menu: foreignForm.find('.dropdown-menu'),
            activeClass: 'active',
            data: null,
            renderTemplate: function (data) {
                return getRegionHtml(data);
            },
            onChange: function (e, data) {

                // console.log(e, data); // 为毛data，有时候出来有时候出不来

                flag.css('background-position', '0 ' + regionFlagPositions[data.countryCode])
                countryName.text(data.text);
                countryName.closest('.country-select').find('input[name="country_id"]').val(data.value);

            }
        });

        // 获取海外地址列表
        service
        .getCountryList()
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data.result.list;
                var dataArr = [];
                var index = 0;

                for (var key in data) {
                    dataArr.push({
                        text: data[key].alphabet,
                        list: formatData(data[key].list, index)
                    });
                    index += data[key].length;
                }

                countrySelect.refresh({
                    data: dataArr,
                    value: 0
                });

            }
        });

        var foreignEditor = new Editor({
            element: foreignForm.find('.foreign-editor'),
            maxLength: 50
        });

        // 验证对象
        var validator = new Validator({
            element: formElement,
            fields: {
                area: {
                    errors: {
                        required: '请选择所在地区'
                    }
                },
                location_addr: {
                    errors: {
                        required: '请填写详细地址',
                        maxlength: '请将字数控制在 45 个字以内'
                    }
                },
                country_id: {
                    errors: {
                        required: '请选择国家'
                    }
                },
                foreign_addr: {
                    rules: {
                        maxlength: 50
                    },
                    errors: {
                        required: '请填写详细地址',
                        maxlength: '请将字数控制在 50 个字以内'
                    }
                }
            }
        });

        container
        .on('change', '[name="country"]', function () { // 国内地址、海外地址切换
            var thiz = $(this);
            if (thiz.val() == 1) { // 国内地址
                inlandForm.show();
                foreignForm.hide();
            }
            else if (thiz.val() == 2) { // 海外地址
                inlandForm.hide();
                foreignForm.show();
            }
        })

        .on('click', '.btn-modify', function (e) { // 修改
            var target = $(e.currentTarget);
            var trElement = target.closest('tr');
            var addressEidt = container.find('.address-edit');

            if (addressEidt.is(':visible') == false) {
                addressEidt.show();
            }

            // 判断国内、国外地址
            var country = target.data('country');
            if (country == 'inland') { // 国内地址
                countryRadio = inlandRadio;
                addressForm.refresh(trElement.data('address'));
                container.find('textarea[name="location_addr"]').trigger('blur');
            }
            else if (country == 'foreign') { // 海外地址

                foreignForm.find('input[name="id"]').val(trElement.data('address').id);
                countryRadio = foreignRadio;
                countrySelect.setValue(trElement.data('address').regular_address.country.id);
                foreignEditor.setValue(trElement.data('address').location_addr);
                // 常用地址
                var checkbox = foreignForm.find(':checkbox');
                checkbox.prop('disabled', false);
                if (trElement.data('address').status == 1) {
                    checkbox.prop('checked', true).prop('disabled', true);
                }
                else {
                    checkbox.prop('checked', false);
                }

                if (store.get('addressNum') == 1) {
                    checkbox.prop('disabled', true);
                }
            }

            // 不用点击没法触发 change 事件
            countryRadio.click();
        })

        .on('click', '.btn-del', function (e) { // 删除

            var target = $(e.currentTarget);
            var trElement = target.closest('tr');
            var tableElement = target.closest('table');

            if (tableElement.find('tr').length === 2 && store.get('addressNum') == 1) {
                alert({
                    content: '至少保留一条地址信息，不然学生就无法搜索到您啦~',
                    title: '温馨提示',
                    width: 380,
                    buttons: [
                        {
                            type: 'primary',
                            text: '好的',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });

            }
            else {
                confirm({
                    content: '确认删除这条地址信息吗？',
                    title: '温馨提示'
                })
                .done(function () {
                    service
                    .delNewAddress({
                        addressId: trElement.data('address').id
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('删除成功', function () {
                                location.reload();
                            })
                        }
                    });
                });
            }
        })

        .on('click', '.btn-regular', function (e) { // 设为常用地址
            var target = $(e.currentTarget);
            var trElement = target.closest('tr');

            service
            .setDefaultNewAddress({
                addressId: trElement.data('address').id
            })
            .done(function (response) {
                if (response.code === 0) {
                    success('常用地址设置成功', function () {
                        location.reload();
                    })
                }
            });
        });

        // 保存表单 - 请求
        var addressSubmit = function (data) {
            console.log(data);
            service
            .upsertNewAddress({
                addressId: data.id,
                areaId: data.area,
                lng: data.lng,
                lat: data.lat,
                locationAddr: data.location_addr,
                detailedAddr: data.detailed_address,
                status: data.regular_address
            })
            .done(function (response) {
                if (response.code === 0) {
                    success('保存成功', function () {
                        location.reload();
                    });
                }
            });
        };

        var checkAddrOK = false; // 保存表单前优先保存用户当前位置

        // 保存表单 - 国内地址
        var saveButton = new SaveButton({
            element: inlandForm.find('.btn-save-inland'),
            save: function () {

                var data = form.parse(inlandForm);

                // 验证后操作
                if (validator.validate(['area', 'location_addr'])) {

                    // 保证地图已出现
                    if (!inlandForm.find('#map').is(':visible')) {
                        alert({
                            title: '温馨提示',
                            width: 347,
                            content: '填写详细地址后请点击“地图定位”标注你的位置吧，准确的地址有助于学生更好地找到你哦~',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                        return false;
                    }

                    // 优先保存位置
                    var mapBtns = inlandForm.find('.map-oper');
                    if (checkAddrOK) {

                        if (baiduMap.getConfidence() < 80) {

                            confirm({
                                content: '你提供的地址不够准确，将可能影响到你的搜索排序，是否仍然强行保存？',
                                title: '温馨提示',
                                width: 335
                            })
                            .done(function () {
                                addressSubmit(data);
                            });
                        }
                        else {
                            addressSubmit(data);
                        }
                    }
                    else {

                        var bdAreaName = inlandForm.find('input[name="bd_area_name"]').val();
                        var cityId = inlandForm.find('input[name="city"]').val();
                        var areaId = inlandForm.find('input[name="area"]').val();
                        var userAreaName = inlandForm.find('.area span').text();

                        // 保存位置
                        return service
                        .checkAddress({
                            cityId: cityId,
                            areaName: bdAreaName
                        })
                        .done(function (response) {
                            if (response.code === 0) {

                                checkAddrOK = true;

                                mapBtns.hide();
                                // 获取地图区级信息 - 只刷新区信息
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
                                                        addressForm.setAreaChangeSrc('saveAddr'); // 牵涉区变动地图刷新与否
                                                        addressForm.regionSelect.areaSelect.setValue(response.data.match_area.id);
                                                        this.hide();
                                                        // 保存表单
                                                        data = form.parse(inlandForm); // 重新解析区
                                                        addressSubmit(data);
                                                    }
                                                },
                                                {
                                                    text: '不修改',
                                                    handler: function () {
                                                        this.hide();
                                                        // 保存表单
                                                        addressSubmit(data);
                                                    }
                                                }
                                            ]
                                        });

                                    }
                                    else {
                                        // 触发保存按钮
                                        addressSubmit(data);
                                    }

                                }

                            }
                        });

                    }

                }
            }
        });

        // 保存表单 - 国外地址
        var saveButton = new SaveButton({
            element: foreignForm.find('.btn-save-foreign'),
            save: function () {

                // 验证后操作
                if (validator.validate(['country_id', 'foreign_addr'])) {

                    var data = {};
                    data.id = foreignForm.find('input[name="id"]').val();
                    data.area = foreignForm.find('input[name="country_id"]').val();
                    data.location_addr = foreignForm.find('textarea[name="foreign_addr"]').val();
                    data.regular_address = foreignForm.find('input[name="regular_address"]').prop('checked') ? 1 : 0;

                    addressSubmit(data);
                }
            }
        });

    };



});