/**
 * @file 配置表
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var Uploader = require('cc/ui/Uploader');

    exports.UPLOADER_STATUS_WAITING = Uploader.STATUS_WAITING;

    exports.UPLOADER_STATUS_UPLOADING = Uploader.STATUS_UPLOADING;

    exports.UPLOADER_STATUS_SUCCESS = Uploader.STATUS_UPLOAD_SUCCESS;

    exports.UPLOADER_STATUS_ERROR = Uploader.STATUS_UPLOAD_ERROR;

    exports.UPLOADER_STATUS_CANCELED = 10;

    exports.UPLOADER_STATUS_COPYNAME = 11;

});