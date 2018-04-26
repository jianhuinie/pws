/**
 * service 代理拦截登录
 */
define(function (require, exports) {

    var service = require('common/service');
    var store = require('common/store');
    var LoginDialog = require('common/component/LoginDialog');

    exports.checkLogin = function () {
        var deferred = $.Deferred();
        var user = store.get('user');
        if (user && user.id) {
            deferred.resolve(service);
        } else {
            new LoginDialog({
                onSuccess: function () {
                    window.location.reload();
                }
            });
        }
        return deferred.promise();
    };
});