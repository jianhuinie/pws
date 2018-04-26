/**
 * @file ajax service
 * @author hurry
 */
define(function () {
    'use strict';
    angular
        .module('Manage.services')
        .factory('ajaxService',
            [
                '$http', '$q', '$cacheFactory', '$timeout',
                'utilService',
            function (
                $http, $q, $cacheFactory, $timeout,
                utilService
            ) {

            var ajaxCache;
            // 成功状态码，默认0
            var doneCode;
            // 失败状态码，默认1
            var failCode;
            // 状态码对应字段，默认code
            var dataField;
            return {
                /**
                 * 发送请求
                 * @param {string} path 请求的path
                 * @param {Object} options 请求的参数
                 * @param {string} options.method 请求的method，默认'POST'
                 * @param {string} options.responseType 请求的responseType，默认'json'
                 * @param {string} options.contentType 请求的contentType，默认'application/json'
                 * @param {Function} options.transformRequest 请求的参数二次处理
                 * @param {Object} options.data 请求的参数，没有-直接发送options
                 * @param {boolean} options.isResponseFilter 是否对response返回数据做过滤，会过滤掉\u0001-\u001f之间控制字符，默认false
                 * @param {Function} options.logoutUrl 700异常，退出操作
                 * @param {Function} options.alert 提示框
                 * @param {Object|boolean} options.cache
                 * 缓存
                 *    boolean: == true, 通过$cacheFactory创建
                 *    {} 有缓存从缓存读取，没有写入，key: path + '_' + JSON.stringify(options)
                 * @param {number} options.cacheExpires 缓存过期时间，单位毫秒
                 * @param {Object} options.userDefineErrors 用户自定义error code
                 * @param {string} options.userDefineErrors.doneCode 成功状态码，默认0
                 * @param {string} options.userDefineErrors.failCode 失败状态码，默认1
                 * @param {string} options.userDefineErrors.dataField 状态码对应字段，默认是code
                 * @param {Array<Object>} options.userDefineErrors.otherCodes 其他自定义状态码
                 * @param {string} options.userDefineErrors.otherCodes.code 状态码
                 * @param {Function} options.userDefineErrors.otherCodes.handler 对应处理函数
                 * @param {Object} options.options 如果我这里都不能满足你，请直接设置该属性
                 * @return {Object}         promise
                 */
                send: function(path, options) {
                    return doRequest(path, options);
                },
                /**
                 * 清空指定path的缓存
                 * @param path
                 */
                clearCache: function () {
                    ajaxCache && ajaxCache.destroy();
                }
            };

            //生成uuid
            function generateUuid(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    for (i = 0; i < len; i++) {
                        uuid[i] = chars[0 | Math.random() * radix];
                    }
                } 
                else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random()*16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            }

            // 请求
            function doRequest(path, options) {
                var deferred = $q.defer();
                // cache的key值
                var key;
                options = options || {};
                var params = initParams(path, options);
                var data;
                if (options.cache) {
                    key = path + '_' + JSON.stringify(options);
                    data = ajaxCache.get(key);
                    if (data && options.cacheExpires && new Date().getTime() - data.createTime > options.cacheExpires) {
                        data = null;
                        ajaxCache.remove(key);
                    }
                }
                if (data) {
                    $timeout(function () {
                        successCallback(data.data, options, key, deferred);
                    });
                } else {
                    $http(params)
                        .success(function (data) {
                            successCallback(data, options, key, deferred);
                        })
                        .error(function (er) {
                            // options.alert ? options.alert('网络异常') : window.alert('网络异常');
                            deferred.reject(er);
                        });
                }
                return deferred.promise;
            }
            // 初始化参数
            function initParams(path, options) {
                doneCode = options.userDefineCodes && options.userDefineCodes.doneCode || 0;
                failCode = options.userDefineCodes && options.userDefineCodes.failCode || 1;
                dataField = options.userDefineCodes && options.userDefineCodes.dataField || 'code';
                options.alert = options.alert || utilService.showMessage;
                if (options.cache) {
                    if (angular.isObject(options.cache)) {
                        ajaxCache = options.cache;
                    } else {
                        ajaxCache = $cacheFactory('ajax_cache_' + new Date().getTime());
                    }
                }
                //支持 GET 请求 对URL和参数做处理 
                if (options.method && options.method === 'GET' && options.data && !$.isEmptyObject(options.data) ) {
                    var str = '';
                    $.each(options.data, function (key, value) {
                        str += '&' + key + '=' + value;
                    });
                    path += '?' + str.substring(1);
                }
                var params = options.options || {
                    method: options.method || 'POST',
                    responseType: options.responseType || 'json',
                    headers: {
                        'Content-Type': options.contentType || 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Logger-Id': generateUuid(32, 16)
                        // 'Actual-Referer': location.href
                    },
                    transformRequest: function (obj) {
                        if ($.isFunction(options.transformRequest)) {
                            return options.transformRequest(obj);
                        }
                        return obj;
                    },
                    url: path,
                    data: options.data ? JSON.stringify(options.data) : JSON.stringify(options)
                };
                // 后端json.stringify问题，没有过滤掉\u0001-\u001f字符
                if (options.isResponseFilter && Array.isArray($http.defaults.transformResponse)) {
                    $http.defaults.transformResponse.unshift(function (value) {
                        if (value.startsWith('{"data"')) {
                            var rxEscapable = /[\u0000-\u001f]/g;
                            var data = rxEscapable.test(value)
                                ? value.replace(rxEscapable, function (a) {
                                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16));
                                })
                                : value;
                            return data;
                        }
                        return value;
                    });
                }
                return params;
            }

            //错误弹窗提示
            function showErrorMsg(data, options, deferred) {
                var errorMessage = data.message
                || data.msg
                || 'code=1异常error不能为空';
                if (data.track_id) {
                    errorMessage += '<br/><span class="track-id">' + data.track_id + '</span>';
                }
                var dialog = options.alert({
                    title: '提示',
                    skinClass: 'error-message-dialog',
                    content: errorMessage
                });
                deferred.reject(data, dialog);
            }

            // 成功回调
            function successCallback(data, options, key, deferred) {
                var status = data[dataField];
                switch (status) {
                    case doneCode:
                        // 成功
                        if (options.cache) {
                            ajaxCache.put(key, {
                                data: data,
                                createTime: new Date().getTime()
                            });
                        }
                        deferred.resolve(data);
                        break;
                    case 300:
                        // 部分成功
                        deferred.resolve(data);
                        break;
                    case 302:
                        //普通跳转  重定向
                        location.href = data.redirect_url;
                        break;
                    case 401:
                        // 未登录  重定向
                        location.href = data.redirect_url + encodeURIComponent(location.hash);
                        break;
                    case failCode:
                        showErrorMsg(data, options, deferred);
                        break;
                    case 500:
                        options.alert('系统异常');
                        deferred.reject(data);
                        break;
                    case 700:
                        // 登录异常
                        if (options.logoutUrl) {
                            return $http({
                                method: options.method || 'GET',
                                url: options.logoutUrl,
                                data: {}
                            });
                        }
                        break;
                    default:
                        if (!options.userDefineErrors || !options.userDefineErrors.otherCodes) {
                            showErrorMsg(data, options, deferred);
                            return;
                        }
                        // 其他状态码
                        var otherCodes = options.userDefineErrors.otherCodes;
                        if (Array.isArray) {
                            otherCodes.forEach(function (error) {
                                error.code === status && $.isFunction(error.handler) && error.handler(data);
                            });
                        } else {
                            for (var i = 0, error; (error = otherCodes[i++]); ) {
                                error.code === status && $.isFunction(error.handler) && error.handler(data);
                            }
                        }
                        break;
                }
            }
        }]);
});