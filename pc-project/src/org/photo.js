/**
 * @file 机构相册
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');

    var container = $('.photo');

    exports.init = function () {

        base.init();
        tianxiaoLog.send(store.get('orgnumber'), 'album');

        container
        /**
         * 弹出教师照片
         */
        .on('click' , '.img-thumbnail' , function (e) {

            var images = container.find('.img-thumbnail');
            var index = images.index(e.currentTarget);
            var data = images.map(function (index, item) {
                var element = $(item);
                var title = element.data('name');
                return {
                    url: element.data('image'),
                    title: title ? title : '机构图片'
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        });

    };
});