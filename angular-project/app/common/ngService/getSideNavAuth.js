/**
 * @fileOverview  获取当前用户的侧边栏权限
 * @author niejianhui
 */


define(function (require) {
    'use strict';

    require('./module')
        .factory('getSideNavAuth', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send('/api/tcenter/nav/list', {currentHash: location.hash});
            };
        }]);
});

