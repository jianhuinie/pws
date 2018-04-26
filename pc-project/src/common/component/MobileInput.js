/**
 * @fileOverview 国际手机号输入
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var service = require('common/service');
    var ComboBox = require('cobble/ui/ComboBox');
    var hotRegions = require('common/data/hotRegions');
    var regionFlagPositions = require('common/data/regionFlagPositions');

    function getRegionregionSnippet(region) {
        return ''
            +   '<li data-value="' + region.value + '" '
            +   'data-valuecode="' + region.valueCode + '" '
            +   'data-text="' + region.text + '" '
            +   'data-code="' + region.code + '" '
            +   'data-country-code="' + region.countryCode + '">'

            +       '<i class="icon icon-region-flag" style="background-position:0 '
            +       regionFlagPositions[region.countryCode]
            +       '"></i>'
            +       region.text

            +   '</li>'
    }

    function getHotRegionHtml(data) {
        return ''
            +   $.map(data, function (region) {
                    return getRegionregionSnippet(region);
                }).join('')
            +   '<li class="more">更多国家...</li>';
    }

    function getRegionHtml(data) {
        return ''
            +   $.map(data, function (alphabet) {
                    return ''
                        +   '<li class="alphabet">' + alphabet.text + '</li>'
                        +   $.map(alphabet.list, function (region) {
                                return getRegionregionSnippet(region);
                            }).join('');

                }).join('');
    }

    function changeValidator(code, codeValue, validator) {

        if (code !== '+86') {
            var length = codeValue.length;

            if (validator) {
                validator.fields.mobile.rules.pattern = new RegExp('^\\d{' + (7 - length)  + ',' + (20 - length) + '}$');
            }
        }
        else {
            if (validator) {
                validator.fields.mobile.rules.pattern = /^1[3-9]\d{9}$/;
            }
        }
    }

    function formatData(data, type, startIndex) {
        var rt = $.map(data, function (region, index) {
                return {
                    code: region.code,
                    value: startIndex ? startIndex + index : index,
                    valueCode: region.value,
                    text: region.text,
                    countryCode: region.country_code
                }
            });
        rt.type = type;

        return rt;
    }

    /**
     * 手机号输入框 构造函数
     * @param {jq element} options.element
     * @param {Function=} options.onChange
     * @param {Function=} options.onInputChange
     * @param {Function=} options.onMobileChange
     */
    function MobileInput(options) {
        $.extend(this, options);
        this.init();
    }

    var hasRefreshed = false; //combobox 两次以上refresh会导致无法highlight选中项
    MobileInput.prototype = {

        init: function () {
            var me = this;
            var element = me.element;

            me.wrapper = element.find('.wrapper');
            var flag = element.find('.flag');
            var code = element.find('.tel-code');
            var mobile = element.find('input[name="mobile"]');
            me.mobile = mobile;

            var select = new ComboBox({
                element: element.find('.tel-code-select'),
                button: element.find('.trigger'),
                menu: element.find('.dropdown-menu'),
                activeClass: 'active',
                data: null,
                renderTemplate: function (data) {
                    if (data.type == 'hot') {
                        return getHotRegionHtml(data);
                    }
                    else {
                        return getRegionHtml(data);
                    }
                },
                onChange: function (e, data) {
                    flag.css('background-position', '0 ' + regionFlagPositions[data.countryCode])
                    me.value = data.valuecode;
                    me.code = data.code;

                    changeValidator(me.code, me.value, me.validator);

                    code.text(data.code);

                    if ($.isFunction(me.onChange)) {

                        me.onChange();
                    }
                }
            });
            me.select = select;

            select.refresh({
                data: formatData(hotRegions, 'hot')
            });

            setTimeout(function () {
                select.setValue(0);
            });

            select.element
            .on('click', '.more', function () {

                service
                .getInternationalCode()
                .done(function (response) {
                    if (response.code === 0) {
                        var data = response.data;

                        var dataArr = [];

                        var index = 0;

                        for (var key in data) {
                            dataArr.push({
                                text: key,
                                list: formatData(data[key], 'all', index)
                            });
                            index += data[key].length;
                        }

                        select.refresh({
                            data: dataArr
                        });

                        select.setValue(0);

                        select.element
                        .find('.dropdown-menu')
                        .animate({ scrollTop: 0 }, 100, 'linear');
                    }
                });
            })

            if ($.isFunction(me.onInputChange)) {
                mobile.on('change', me.onInputChange);
            }

            if ($.isFunction(me.onMobileChange)) {
                mobile.on('input', onMobileChange).on('propertychange', onMobileChange);
            }

        },
        getValue: function () {
            return this.value;
        },
        getMobile: function () {
            var mobile;
            if (this.isInternational()) {
                mobile =  this.value + this.mobile.val();
            }
            else {
                mobile =  this.mobile.val();
            }

            return $.trim(mobile);
        },
        isInternational: function () {
            return this.code === undefined ? false : (this.code !== '+86');
        },
        disableInternational: function () {
            this.wrapper.removeClass('enable-international');
            this.wrapper.addClass('disable-international');
            this.code = '+86';
            changeValidator(this.code, '', this.validator);
            this.mobile.val('');
        },
        enableInternational: function () {
            this.wrapper.removeClass('disable-international');
            this.wrapper.addClass('enable-international');
            if (!hasRefreshed && this.data) {
                this.select.refresh({
                    data: this.data.slice(1)
                });
                hasRefreshed = true;
            }
            this.select.setValue(1, { force: true });
            this.mobile.val('');

        }
    }

    return MobileInput;
});