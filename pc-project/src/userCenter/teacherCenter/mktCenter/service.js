/**
 * Created by chenmo on 16/4/26.
 *
 * 营销中心接口
 */
define(function (require, exports) {

    'use strict';

    var service = require('../../common/service');
    var urlUtil = require('cc/util/url');

    var query = urlUtil.parseQuery(location.search);

    /**
     * 短信充值接口
     * @param data
     * @returns {*|Promise}
     */
    exports.charge = function (data, options) {
        return service.post(
            '/sms_account/charge',
            {
                sms_count: data.account,
                t: query.token,
            },
            options
        );
    };

    /**
     * 短信通知开关接口
     * @param data
     * @returns {*|Promise}
     */
    exports.switchStatus = function (data) {
        return service.post(
            '/sms_account/switchStatus',
            {
                status: data.status ? 1 : 0,
                t: query.token,
            }
        );
    };

    exports.nextPage = function (data) {
        var queryStr = $.param({
            page: data.page,
            render: 'json',
            t: query.token
        });
        return service.post(
            '/sms_account/center?' + queryStr
        );
    };


});
