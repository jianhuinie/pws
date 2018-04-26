/**
 * @file 个人信息-左侧导航栏
 * @author zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    exports.updateAvatar = function (url) {

        $('#sidebar').find('.user-info img').attr('src', url);

    };

});