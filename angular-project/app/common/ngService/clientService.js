/**
 * @file client service
 * @author niejianhui
 * 有些页面用在直播助手客户端  有一些业务逻辑涉及到客户端信息的判断
 */
define(function (require) {
    'use strict';
    angular
        .module('Manage.services')
        .factory('clientService', ['utilService', function (utilService) {
            //获取客户端版本号
            function getClientVersion () {
                var userAgent = navigator.userAgent;
                var length = userAgent.length;
                var index = userAgent.indexOf('gsxclient');
                var clientInfo = userAgent.substring(index, length - 1);
                var version = clientInfo.substring(10);
                return version;
            }

            //是否在客户端
            function isLiveClient() {
                var userAgent = navigator.userAgent;
                return userAgent.indexOf('gsxclient') > -1;
            }

            //是否在客户端
            function isOlderThan(compareVersion) {
                var currentVersion = getClientVersion();
                return utilService.transferToNmber(currentVersion) < utilService.transferToNmber(compareVersion);
            }
            
            return {
                /**
                 * 判断当前版本是否等于或低于某个版本（有些功能必须高于或等于某个版本才支持）
                 */
                isOlderThan: function (compareVersion) {
                   return isOlderThan(compareVersion);
                },
                /**
                 * 判断当是否在直播助手客户端
                 */
                isLiveClient: function () {
                    return isLiveClient();
                },
                /**
                 * 判断当是否支持回放和视频课功能
                 */
                isSupportMedia: function () {
                    //如果在客户端做版本检测
                    if (isLiveClient()) {
                        var lowestVersion = '6.6.0';
                        if (utilService.isMacOS()) {
                            lowestVersion = '6.6.0';
                        }
                        return !isOlderThan(lowestVersion);
                    }
                    return true;
                }
            };
        }]);
});