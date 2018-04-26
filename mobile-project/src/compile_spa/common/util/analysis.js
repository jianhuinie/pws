define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var urlParse = require('util/url_v2');
    var loadScript = require('util/loadScript');
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = {
        pgv: function pgv(options) {
            window.gsx_ready_reset();
            var hash = location.hash.replace('#', '');
            hash = hash.indexOf('?') > -1 ? hash.substring(0, hash.indexOf('?')) : hash;
            $.getJSON('/global/app-config', {
                statistics_url: hash,
                statistics_params: options && options.params
            }, function (result) {
                var data = result.data;
                var res = {
                    extData: data.ext_data,
                    siteConfig: data.site_config,
                    logData: data.log_data
                };
                window.gsx_ready(function (pageConfig) {
                    require(['common/analysis'], function (analysis) {
                        var pvParam = {
                            guid: pageConfig.log[0],
                            params: {
                                user_role: pageConfig.user ? pageConfig.user.type : '',
                                page_type: res.extData.page,
                                city_id: pageConfig.city.id
                            }
                        };
                        window.common_page_info = {};
                        common_page_info['page_type'] = res.extData.page;
                        if (res.logData) {
                            common_page_info['page_str'] = res.logData.page_type;
                        }
                        var queryString = urlParse.parseQuery(location.search);
                        if (queryString.source) {
                            common_page_info['url_source'] = queryString.source;
                        }
                        if (queryString.traffic_source) {
                            common_page_info['url_source'] = queryString.traffic_source;
                        }
                        pvParam.params['page_str'] = common_page_info.page_str || '';
                        if (common_page_info.traffic_source) {
                            pvParam.params['traffic_source'] = common_page_info.traffic_source || '';
                        }
                        analysis.pgv(pvParam);
                        if (!pageConfig.env.is_app) {
                            analysis.sku({
                                guid: pageConfig.log[0],
                                page_type: res.extData.page,
                                terminal: 'm',
                                city_id: pageConfig.city.id,
                                sku_id: options && options.skuId || ''
                            });
                        }
                        ;
                        analysis.watchClick({
                            params: {
                                type: 'msite',
                                service: res.extData.page
                            }
                        });
                        analysis.timing();
                    });
                });
                loadScript.async('/static/report?p=' + res.extData.page + '&city=' + res.extData.curr_city.id);
            });
        }
    };
});