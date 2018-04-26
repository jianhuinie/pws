/**
 * @file 给 flash 添加全屏接口
 * @author zhujialu
 */
define(function (require) {

    var fullScreen = require('cobble/util/fullScreen');

    window.enterFullScreen = fullScreen.enter;
    window.exitFullScreen = fullScreen.exit;

});