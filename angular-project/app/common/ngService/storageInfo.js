/**
 * @fileOverview  获取当前用户的存储空间信息
 * @author niejianhui
 */


define(function (require) {
    'use strict';

    require('./module')
        .factory('storageInfo', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send(
                    '/api/user/storageInfo'
                );
            };
        }]);
});

