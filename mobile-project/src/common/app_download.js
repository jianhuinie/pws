/**
 * Created by xuzheng on 16/2/18.
 */
define(function (require, exports) {
    'use strict';

    var util_url = require('util/url');

    var default_ct = 'GenShuiXue_M2100013';

    var download_url = 'https://m.genshuixue.com/app/dw';

    /*
    * options {object|null}
    *   ct {string} 渠道包id
    *   type {string}  学生端app: student
    *                   老师端app: teacher
    *
    * return {string} app下载地址
    * */
    return function (options) {
        options = options || {};
        var url = util_url(download_url);
        var params = {};
        params['ct'] = options.ct || default_ct;

        if (options.type) {
            switch (options.type) {
                case 'teacher':
                    params['t'] = 't';
                    break;
                case 'student':
                    params['t'] = 's';
            }
        }
        url.params = params;

        return url.toString();
    };
});
