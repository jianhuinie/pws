/**
 * @file 资质上传组件（模板位于 view/teacherCenter/component/uploader-certification.html）
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Uploader = require('cobble/helper/FlashUploader');

    /**
     * 上传组件构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     */
    function CertificationUploader(options) {
        $.extend(this, options);
        this.init();
    }

    CertificationUploader.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var browseBtn = element.find('.btn-info');
            browseBtn.append('<input type="file" />');

            var uploader = new Uploader({
                action: '/123',
                element: browseBtn.find('input'),
                onFileChange: function () {
                    uploader.upload();
                }
            });

            element
            .on('click', '.btn-primary', function (e) {

            });
        }
    };

    return CertificationUploader;

});