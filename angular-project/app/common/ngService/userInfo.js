/**
 * @fileOverview  获取当前用户的信息
 * @author niejianhui
 */


define(function (require) {
    'use strict';

    require('./module')
        .factory('userInfo', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send(
                    '/api/user/basicInfo'
                );
            };
        }]);
});

