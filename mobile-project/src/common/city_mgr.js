/**
 * Created by xuzheng on 16/2/18.
 */
define(function (require, exports) {

    'use strict';

    var cookie = require('util/cookie');
    var service = require('common/service');
    var util_base = require('util/base');
    var $ = require('zepto');

    var originUri = (function () {
        var hostname = window.location.hostname;
        var arr = /^[\w\-]+\.([\w\-]+\.genshuixue.com)/.exec(hostname);
        if (arr && arr[1]) {
            hostname = arr[1];
        }
        return hostname;
    })();

    var now = new Date().getTime();

    var positionCookieOptions = {
        'domain': originUri,
        'expires': new Date(now + 3600 * 24 * 0.5)
    };
    var cityCookieOptions = {
        'domain': originUri,
        'expires': new Date(now + 3600 * 24)
    };

    function gps2baidu(lat, lng, callback) {
        $.ajax({
            url: 'https://api.map.baidu.com/geoconv/v1/',
            data: {
                'coords': lng + ',' + lat,
                'from': '1',
                'to': '5',
                'ak': '2MrTdwjxa074wgqs6vhuWppfW57twsaB'
            },
            dataType: 'jsonp'
        }).done(function (response) {
            if (!response.status) {
                var latlng = response.result[0];
                callback(latlng.y, latlng.x);
            } else {
                callback();
            }
        });
    }


    var getCity = function (lat, lng, callback) {
        var data = {
            lat: lat ? lat : '',
            lng: lng ? lng : ''
        };
        service.post('/area/location', data, function (response) {
            if (response.code === 0) {
                var data = response.data;
                var cityName = data.name;
                var cityId = data.id;
                callback(cityId, cityName);
            }
        });
    };


    var getLocation = (function () {
        var geoLocation = navigator.geolocation;
        if (geoLocation) {
            var options = {
                // 指示浏览器获取高精度的位置，默认为false
                'enableHighAcuracy': true,
                // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                'timeout': 5000,
                // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                'maximumAge': 3000
            };
            return function (successCallback, errorCallback) {
                function onSuccess(data) {
                    var latitude = data.coords.latitude;
                    var longitude = data.coords.longitude;
                    gps2baidu(latitude, longitude, function (lat, lng) {
                        successCallback(lat, lng);
                    });
                }

                function onError(errorData) {
                    errorCallback(errorData);
                }

                geoLocation.getCurrentPosition(onSuccess, onError, options);
            }
        } else {
            return function (successCallback, errorCallback) {
                errorCallback();
            }
        }
    })();

    /**
     * 在页面中需要判断是否切换城市时调用
     * @param {string} currentCityId  当前城市id
     * @param {function} switchCallBack 用户选择切换的回掉函数（选）
     *       function switchCallBack(urlObj, cityId, cityName){
     *          // url对象，城市id，城市名
     *       }
     * @param {function} unSwitchCallBack 用户选择不切换的回掉函数（选）
     *       function unSwitchCallBack(cityId, cityName){
     *          // 城市id，城市名
     *       }
     * */
    exports.init = function (currentCityId, switchCallBack, unSwitchCallBack) {
        //判断用户是否已经选择过
        var cityFixed = cookie.get('__ctfd__');
        var cookieCityId = cookie.get('CITY_ID');
        if (!cityFixed || !cookieCityId) {
            //通过位置获取城市信息
            exports.geoLocation(function (lat, lng) {
                getCity(lat, lng, function (cityId, cityName) {
                    //如果和后台返回的cityID不一样，提示用户跳转，并在cookie中标识用户已选择
                    if (cityId && cityId !== currentCityId) {
                        exports.setCity(cityId, cityName, false);
                        cookie.set('__ctfd__', 1);
                        // 这里的confirm 可能会被common/ui.js替换
                        var confirmDialog = window['originalConfirm'] || window.confirm;

                        var r = confirmDialog('您目前定位是在:' + cityName + ',是否切换?');
                        if (r == true) {
                            var targetUrl = location.protocol + '//' + originUri +
                                location.pathname + location.hash + location.search;
                            if (util_base.isFunction(switchCallBack)) {
                                var urlObj = document.createElement('a');
                                urlObj.href = targetUrl;
                                switchCallBack(urlObj, cityId, cityName);
                            } else {
                                window.location.href = targetUrl;

                            }
                        } else if (util_base.isFunction(unSwitchCallBack)) {
                            unSwitchCallBack(cityId, cityName);
                        }
                    }
                });
            }, null, true);
        }
    };
    /**
     * 获取经纬度信息，优先试图从cookie中读取，如果读取不到则重新定位
     * 可以根据参数设定是否强制重新定位，或者设置只取cookie数据
     *
     * @param  {Function} onSuccess     获取成功后的回调方法
     * @param  {Function} onError       获取失败后的回调方法
     * @param  {boolean} [forceUpdate]   强制重新定位
     * @param  {boolean} [onlyGetCookie] 是否只取cookie数据
     */
    exports.geoLocation = function (onSuccess, onError, forceUpdate, onlyGetCookie) {
        //判断如果非强制更新，有限取cookie中的值
        if (!forceUpdate) {
            var cookieLat = parseFloat(cookie.get('lat'));
            var cookieLng = parseFloat(cookie.get('lng'));
            cookieLat = util_base.isNumber(cookieLat) ? cookieLat : undefined;
            cookieLng = util_base.isNumber(cookieLat) ? cookieLng : undefined;
            if (cookieLat && cookieLng || onlyGetCookie) {
                onSuccess(cookieLat, cookieLng);
                return;
            }
        }
        getLocation(function (lat, lng) {
            cookie.set('lat', lat, positionCookieOptions);
            cookie.set('lng', lng, positionCookieOptions);
            onSuccess && onSuccess(lat, lng);
        }, function () {
            onError && onError();
        });
    };

    //在cookie中设置城市信息
    exports.setCity = function (cityId, cityName, isUserSelect) {
        var options = $.extend(true, {}, cityCookieOptions);
        if (isUserSelect) {
            options['expires'] = 3 * 24;
        }
        cookie.set('__ctfd__', 1, options);
        cookie.set('CITY_ID', cityId, options);
        if (cityName) {
            cookie.set('CITY_NAME', cityName, options);
        } else {
            cookie.remove('CITY_NAME');
        }
    };

    exports.setOriginUri = function (uri) {
        originUri = uri;
    };
});