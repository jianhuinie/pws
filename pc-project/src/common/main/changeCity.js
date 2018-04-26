/**
 * @file 切换城市
 * @author liucong
 */
define(function (require, exports) {
    'use strict';

    var RegionSelect = require('common/component/RegionSelect');
    var AutoComplete = require('cobble/ui/AutoComplete');
    var cookie = require('cobble/util/cookie');
    var _ = require('underscore');
    var dateUtil = require('cobble/util/date');

    var store = require('common/store');

    var cityUrlMap = {
        test: 'http://test.genshuixue.com/${domain}/',
        beta: 'http://beta.genshuixue.com/${domain}/',
        www:  'http://www.genshuixue.com/${domain}/'
    }

    exports.init = function () {
        var me = this;
        var container = $('#main');
        var select = container.find('.city-select');

        var alphabetCities = store.get('alphabetCities');
        var cities = [];

        var env = store.get('env');

        var changeCity = function(id, name, domain) {

            if (id||id == 0) {
                var expireTime = dateUtil.add(new Date(), 30);

                cookie.set('CITY_ID', id, {
                    domain: '.genshuixue.com',
                    expires: expireTime
                });

                if (domain) {
                    cookie.set('CITY_DOMAIN', domain, {
                        domain: '.genshuixue.com',
                        expires: expireTime
                    });
                }

                if (name) {
                    cookie.set('CITY_NAME', name, {
                        domain: '.genshuixue.com',
                        expires: expireTime
                    });
                }

                var nextUrl = store.get('next_url');

                if (nextUrl) {
                    return location.href = nextUrl;
                }

                var url = cityUrlMap[env]
                    ? cityUrlMap[env].replace(/\$\{domain\}/, domain)
                    : cityUrlMap['www'].replace(/\$\{domain\}/, domain);

                // search debug
                if (store.get('sd')) {
                    url = url + '?sd=' + store.get('sd');
                }

                location.href = url;
            }
        }

        if (alphabetCities) {
            $.each(
                alphabetCities,
                function (key, value) {
                    $.merge(cities, value);
                }
            )
        }

        var cityId;
        var cityName;
        var cityDomain;

        var citySelect = new RegionSelect({
            element: select,
            provinceText: '请选择',
            cityText: '请选择',
            onCityChange: function (data) {

                if(data.value) {
                    cityId = data.value;
                    cityName = data.text;
                }
            }
        });

        container
        .on('click', '.city-select .btn-comfirm', function () { // 按省份选择
            if (cityId) {

                var city = _.findWhere(cities, { id: cityId.toString() });
                cityDomain = city ? city.domain : '';

                changeCity(cityId, cityName, cityDomain);
            }
            else {
                alert('请选择城市');
            }
        });

        var searchInput = container.find('.search-input');
        var searchMenu = container.find('.search-suggestion');

        new AutoComplete({
            element: searchInput,
            menu: searchMenu,
            hoverClass: 'item-hover',
            activeClass: 'item-active',
            autoScroll: true,
            renderTemplate: function (data, tpl) {
                var html = '';
                $.each(
                    data || [],
                    function (index, item) {
                        var pinyin = item.pinyin ? item.pinyin.replace(/'/g, '') : null;
                        html = html
                            + '<li ' + (index === 0 ? 'class="item-active" ' : '') + 'data-id="' + item.id + '" data-text="' + item.name + '" data-domain="' + item.domain + '">'
                            +      item.name
                            +      (pinyin ? ('<span class="pinyin">' + pinyin + '</span>') : '')
                            +  '</li>';
                    }
                );
                return html;
            },

            onItemClick: function (e, data) {
                changeCity(data.id, data.text, data.domain);

            },
            onEnter: function (e, data) {
                searchInput.val(data.text);

                changeCity(data.id, data.text, data.domain);
            },
            load: function (value, callback) {
                var data = [];
                if (value == '' || cities.length === 0) {
                    return callback();
                }
                else { //search
                    var searchRegExp = new RegExp(value);
                    var index;

                    for (var i = cities.length - 1; i >= 0; i--) {
                        if (!cities[i].name) {
                            continue;
                        }
                        index = cities[i].name.search(searchRegExp);

                        if (index == -1) {
                            var pinyin = cities[i].pinyin ? cities[i].pinyin.split('\'') : null;
                            var wordPinyin = pinyin ? pinyin.join('') : null;

                            if (pinyin && wordPinyin) {
                                if (wordPinyin.search(searchRegExp) == 0) {
                                    index = 0;
                                }
                                else {
                                    if (pinyin[0].search(searchRegExp) === 0) {
                                        index = 0;
                                    }
                                }
                            }
                        }

                        if (index > -1) {
                            var item = {};

                            item.searchIndex = index;
                            $.extend(item, cities[i]);
                            data.push(item);
                        }
                    };

                    if (data.length > 0) {
                        data.sort(
                            function (a, b) {
                                if (a.searchIndex > b.searchIndex) {
                                    return 1;
                                }
                                else if (a.searchIndex < b.searchIndex) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            }
                        );
                    }
                    return callback(data);
                }
            }
        });

        container
        .on('click', 'a', function (event) {
            var element = $(event.currentTarget);

            changeCity(element.data('id'), element.text(), element.data('domain'));
            return false;
        });

        container
        .on('click', '.alphabet-index', function (event) {
            var element = $(event.currentTarget);
            var listElement = $(element.attr('href'));

            if(listElement.length > 0) {
                var top = listElement.offset().top;
                window.scrollTo(0, top);
            }

            return false;
        });
    }
});