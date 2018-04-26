/**
 * 社区首页
 */
define(function (require, exports) {

    var LoginDialog = require('common/component/LoginDialog');

    require('./index/banner');
    require('./index/group');
    require('./index/post');

    require('tpl!social/common/pager.tpl');
    require('tpl!social/index.tpl');

    exports.init = function () {

        $('.login').on('click', '.btn-login', function (){

            new LoginDialog({
                onSuccess: function () {
                    window.location.reload();
                }
            });
        });

    };
});