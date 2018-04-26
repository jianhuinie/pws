/**
 *  @file 学习头条
 *  @author zengcheng
 */
define(function(require, exports) {

    var ClickMonitor = require('common/component/ClickMonitor');
    var store = require('common/store');

    exports.init = function () {

        var user = store.get('user') || {};

        var clickMonitor = new ClickMonitor({
            monitorUrl: 'http://click.genshuixue.com/article',
            defaultParams: {
                city_id: store.get('cityId'),
                role: typeof user.type === undefined ? -1 : user.type,
                user_number: user.number || '',
                client_plat: 'pc',
                session_id: WAT.getCookie('__guid__') || '',
                channel_id: store.get('channel').channel_id
            }
        });

        // 参数生成器
        clickMonitor.setInterceptor(function (ele) {

            var params = {};
            params.qid = ele.data('qid');
            params.article_number = ele.data('article-number');
            params.rank = ele.data('rank');
            params.search_form = ele.data('search-form');
            params.time = new Date().getTime();
            params.content_type = ele.data('content-type');
            return params;
        });
    };
});