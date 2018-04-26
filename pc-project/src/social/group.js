/**
 * 社区小组信息
 * @author zengcheng
 */
define(function (require, exports) {


    var proxyService = require('./common/proxyService');
    require('social/common/signHeader');
    require('social/group/postList');

    require('tpl!social/group.tpl')
    require('tpl!social/common/pager.tpl');

    exports.init = function () {
        $(document).on('click', '[data-need-intercept="1"]', function(){
            var target = $(this);
            proxyService.checkLogin().done(function () {
                window.open(target.data('href'), '_blank');
            });
            return false;
        });
    };
});