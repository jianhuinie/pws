/**
 * @file spa页面上报处理util
 * @author hurry
 * @date 2017/6/19
 */
const $ = require('zepto');
const urlParse = require('util/url_v2');
const loadScript = require('util/loadScript');

export default {
    /**
     * pv0.gif上报统一入口，默认上报city_id
     * @param {?Object} options 配置项
     * @param {?Object} options.params 上报参数
     */
    pgv: function (options) {
        window.gsx_ready_reset();
        let hash = location.hash.replace('#', '');
        // 兼容不规范操作，hash中url参数
        hash = hash.indexOf('?') > -1 ? hash.substring(0, hash.indexOf('?')) : hash;
        $.getJSON('/global/app-config', {
            statistics_url: hash,
            statistics_params: options && options.params
        }, function (result) {
            const data = result.data;
            const res = {
                extData: data.ext_data,
                siteConfig: data.site_config,
                logData: data.log_data
            };
            window.gsx_ready(function (pageConfig) {
                require(['common/analysis'], function (analysis) {
                    const pvParam = {
                        guid: pageConfig.log[0],
                        params: {
                            user_role: pageConfig.user ? pageConfig.user.type : '',
                            page_type: res.extData.page,
                            city_id: pageConfig.city.id
                        }
                    };
                    window.common_page_info = {};
                    common_page_info["page_type"] = res.extData.page;
                    if (res.logData) {
                        common_page_info["page_str"] = res.logData.page_type;
                    }
                    var queryString = urlParse.parseQuery(location.search);
                    if (queryString.source) {
                        common_page_info["url_source"] = queryString.source;
                    }
                    if (queryString.traffic_source) {
                        common_page_info["url_source"] = queryString.traffic_source;
                    }
                    
                    pvParam.params['page_str'] = common_page_info.page_str || '';
                    if (common_page_info.traffic_source) {
                        pvParam.params['traffic_source'] = common_page_info.traffic_source || '';
                    }
                    // 上报
                    analysis.pgv(pvParam);
                    if (!pageConfig.env.is_app) {
                        analysis.sku({
                            guid: pageConfig.log[0],
                            page_type: res.extData.page,
                            terminal: 'm',
                            city_id: pageConfig.city.id,
                            sku_id: options && options.skuId || ''
                        });
                    };
                    analysis.watchClick({
                        params: {
                            type: 'msite',
                            service: res.extData.page,
                        }
                    });
                    analysis.timing();
                });
            });

            // 请求report接口
            loadScript.async('/static/report?p=' + res.extData.page + '&city=' + res.extData.curr_city.id);
        });
    }
};