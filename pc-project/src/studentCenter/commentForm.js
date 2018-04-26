/**
 * @file  改为好评
 * @author wth
 */
define(function (require, exports) {

    'use strict';

    var MoreImageUploader = require('common/component/MoreImageUploader');

    var hashFiles = {}; // 多图上传

    exports.init = function () {

        var uploader = $('.upload-pics');
        var btninfos = $('.btn-comment');

        // 多文件上传
        uploader.each(function (i, item) {
            // hashCountFiles[i] = 0;
            $(item).data('no', i); // 记录属于第几个表单

            hashFiles[i] = new MoreImageUploader({
                element: $(item),
                watermark: 'photo',
                previewWidth: 90,
                previewHeight: 70,
                maxCount: 5,
                onUploadStart: function () {
                    // 置灰提交按钮
                    btninfos.prop('disabled', true);
                },
                onUploadSuccess: function () {
                    // hashCountFiles[i]++;
                },
                onUploadComplete: function () {
                    btninfos.prop('disabled', false);
                }


            });
        });

    };

});