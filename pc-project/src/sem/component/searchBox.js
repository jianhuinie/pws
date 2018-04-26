/*
 * @file SEM K12聚合页 - 切换城市
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');

    exports.init = function () {

        var container = $('.search-box');
        // 缓存城市信息
        getCityCache();

        container
        .on('click', '.current-city .icon', function (e) {
            var target = $(e.currentTarget);
            var currentCity = target.closest('.current-city');
            var allCity = currentCity.siblings('.all-city');

            var cityList = getCityCache();
            allCity.html(cityList).show();
        })

        .on('mouseleave', '.all-city', function (e) {
            $(e.currentTarget).hide();
        });

    }

    /*
     * 获取城市列表 缓存
     *
     * @inner
     * @type {Object}
     */
    var cityCache = '';
    function getCityCache () {
        if (cityCache != '') {
            return cityCache;
        }

        return service
        .getCityList()
        .done(function (response) {
            if (response.code === 0) {
                cityCache = joinCityInfo(response.data.city);
            }
            return cityCache;
        });

    }

    /*
     * 拼接城市数据
     * @param tities 城市信息
     * @return string
     */
    function joinCityInfo (cities) {

        var source = store.get('source');
        var plan = store.get('plan');
        var group = store.get('group');
        var keyword = store.get('keyword');
        var query = store.get('query');

        var allCityList = '';
        $.each(
            cities,
            function (index, item) {

                if ($(item).length) {
                    var ddContent = '';

                    $.each(item, function (m, n) {

                        var link = '<a target="_self" href="/sem/k12?city='+ n.id;
                        if (source) {
                            link += '&source=' + source;
                        }
                        if (plan) {
                            link += '&plan=' + plan;
                        }
                        if (group) {
                            link += '&group=' + group;
                        }
                        if (keyword) {
                            link += '&keyword=' + keyword;
                        }
                        if (query) {
                            link += '&q=' + query;
                        }
                        link +=  '" class="common">'
                                 + n.name
                                 + '</a>';

                        ddContent += link;
                    });

                    var currtDL = '<dl id="alphabet-' + index + '">'
                                +     '<dt>' + index.toUpperCase() + '</dt>'
                                +     '<dd>' + ddContent + '</dd>'
                                + '</dl>';

                    allCityList += currtDL;
                }

            }
        );

        return allCityList;
    }


});