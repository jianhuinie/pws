/**
 * @file 接口层
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var defaultOptions = {
        timeout: 5000,
        sync: false,
        stringify: false,
        preventError: false
    };

    /**
     * 需要缓存的接口
     * 缓存策略：不发_user_number
     *
     * @inner
     * @type {Object}
     */
    var interfaceCacheMap = {
        '/area/list': 1,
        '/subject/getList': 1
    };

    /**
     * 需要缓存的接口
     * 缓存策略：不发请求
     *
     * @inner
     * @type {Object}
     */
    var dataCacheMap = {
        '/user/basicInfo': 1
    };

    /**
     * 缓存接口数据
     *
     * @inner
     * @type {Object}
     */
    var dataCache = { };

    /**
     * 获取缓存的 key
     *
     * @inner
     * @param {string} url
     * @param {Object=} data
     * @return {Object=}
     */
    function getCacheKey(url, data) {

        var key = url;

        if (data) {
            key += $.param(data);
        }

        return key;
    }



    /**
     * 发送 post 请求
     *
     * @inner
     * @param {string} url 请求 url
     * @param {Object} data 发送的数据
     * @param {Object=} options
     * @property {boolean} options.sync 是否是同步请求
     * @property {Object=} options.preventError 阻止后端错误弹窗
     * @property {Object=} options.errorHandler 自定义 error 处理
     *
     * @return {Promise}
     */
    function post(url, data, options) {

        data = data || { };

        options = $.extend({ }, defaultOptions, options)

        var cache;
        var cacheKey;

        if (dataCacheMap[url]) {
            cacheKey = getCacheKey(url, data);
            cache = dataCache[ cacheKey ];
        }

        var deferred = $.Deferred();

        if (cache) {
            if (!cache.response) {
                cache.deferredList.push(deferred);
            }
            else {
                deferred.resolve(cache.response);
            }
        }
        else {

            var number = userData.number || 0;

            if (!interfaceCacheMap[url]) {
                data._user_number = number;
                $.extend(data, siteData.monkey);
            }

            $.ajax({
                url: url,
                data: data,
                method: 'post',
                dataType: 'json',
                timeout: options.timeout,
                async: options.sync ? false : true
            })
            .then(
                function (response) {
                    if (dataCacheMap[url]) {
                        cache = dataCache[cacheKey];
                        cache.response = response;
                        $.each(cache.deferredList, function (index, item) {
                            if (response && response.code === 0) {
                                item.resolve(response);
                            }
                            else {
                                item.reject(response);
                            }
                        });
                        cache.deferredList.length = 0;
                    }
                    else {
                        if (response && response.code === 0) {
                            deferred.resolve(response);
                        }
                        else {
                            var msg = response.msg;
                            if (msg && !options.preventError) {
                                alert({
                                    title: '提示',
                                    content: msg
                                });
                            }
                            deferred.reject(response);
                        }
                    }
                },
                function (xhr, status) {
                    if (status === 'timeout' || status === 'error') {
                        deferred.reject({
                            code: -1
                        });
                    }
                }
            );


            if (dataCacheMap[url]) {
                dataCache[cacheKey] = {};
                dataCache[cacheKey].deferredList = [deferred];
            }
        }

        return deferred;

    }

    /**
     * 发送跨域的 jsonp请求
     *
     * @param {string} url
     * @param {Object} data
     * @return {Promise}
     */
    function getJsonp(url, data) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp'
        });
    }

    exports.post = post;

    exports.jsonp = getJsonp;


    /**
     * 获取用户基本信息，
     *
     * 如果传 userId 和 userType 表示获取指定用户的信息
     *
     * 如果不传，表示获取当前 session 用户的信息
     *
     * 返回数据：
     * {
     *     code: 0, 成功
     *     data: {
     *         mobile: "123",
     *         user_type: "2",
     *         user_id: "123",
     *         avatar: "url",
     *         user_name: "name",
     *         user_name_cut: "name",
     *         user_number: "123",
     *         org_id: "23" // 机构number 0为非机构
     *     }
     * }
     *
     * @param {?Object} data 可不传
     * @property {string} data.userId
     * @property {string} data.userType
     */
    exports.getUserBasicInfo = function (data) {

        var params;

        if (data && data.userId != null && data.userType != null) {
            params = {
                user_id: data.userId,
                user_type: data.userType
            };
        }

        return post(
            '/user/basicInfo',
            params
        );
    };

    /**
     * 获取 我的课程 json 数据
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        "lessons": [
     *            {
     *                "lesson": {
     *                    "course": "latin-lorem",
     *                    "lesson_way": "online",
     *                    "start_time": "2014-01-07 09:00:00",
     *                    "end_time": "2014-01-07 11:00:00",
     *                    "status_display": "待上课"
     *                 },
     *                 "user": {
     *                     "avatar": "http://test.storage.genshuixue.com/getfile.php?fid=274&sn=radb11a5",
     *                     "name": "lorem",
     *                 }
     *            }
     *        ],
     *        "length": 99,
     *    }
     * }
     *
     * @return {Promise}
     */
    exports.getCourseList = function () {
        return post(
            '/lesson/list'
        );
    };

    /**
     * 获取用户角色信息
     *
     * 返回数据：
     * {
     *     code: 0,   成功
     *     data: {
     *         roles: ["1","0"]
     *     }
     * }
     *
     * @return {Promise}
     */
    exports.getUserType = function () {
        return post(
            '/user/roles'
        );
    };

    /**
     * 提交邀请码
     *
     * @param {Object} data
     * @property {string} data.inviteCode  邀请码
     * @property {string} data.role 目标角色类型  0: 老师, 2： 学生
     * @property {Object}  data.formData  伴随这邀请码发送到后端的登录信息
     * @property {?string} data.formData.username  登录数据中的手机号码
     * @property {?string} data.formData.next    登录之后跳转的url
     * @property {?string} data.formData.password 如果是密码登录的话就有这个
     * @property {?string} data.formData.verifycode 如果是短信校验码就有这个
     * @property {?string} data.formData.usertype 0,老师，1 学生
     * @return {Promise}
     */
    exports.sendInviteCode = function (data) {

        var params = $.extend(data.formData || {}, {
            invite_code: data.inviteCode,
            role: data.role
        });

        return post(
            '/user/switch_role_ajax',
            params
        );

    };

    /**
     * 获取 CDN 测试 url 数组
     * 选择最快的 CDN 上传
     *
     * @return {Promise}
     */
    exports.getCDNSpeedTestUrls = function () {
        return post(
            '/video/getSpeedTestUrl'
        );
    };

});