/**
 * @file 课程封面的图片库
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict'

    var service = require('../service');
    var lazyImage = require('common/lazyImage');

    return Ractive.extend({
        template: require('html!./PhotoGallery.html'),
        data: function () {
            return {
                style: require('text!./PhotoGallery.styl'),
                imageList: [],
                options: {
                    list: [],
                    save: $.noop,
                    close: $.noop
                }
            };
        },
        components: {
        },
        onrender: function () {
            // lazyImage.scanning(true, $('.photo-gallery'));
            var me = this;
            var imageGallery = [];
            service
            .getPhotoGallery()
            .then(function (response) {
                var data = response.data;
                var list = me.get('options.list');
                $.each(
                    data,
                    function (index, value) {
                        var checked = false;
                        imageGallery.push({
                            url: value.url,
                            id: value.id,
                            checked: checked
                        });
                    }
                );
                lazyImage.init($('.pictures', '.photo-gallery'));
            });
            me.set('imageList', imageGallery);

            me.observe('imageList.*.checked', function (checked) {
                var list = me.get('options.list');
                if (!list) {
                    list = [];
                }
                var imageList = me.get('imageList');
                if (checked) {
                    list.push(imageList[arguments[3]]);
                }
                else {
                    var index = arguments[3];
                    var indexPos;
                    $.each(
                        list,
                        function (idx, item) {
                            if (item.id == imageList[index].id) {
                                indexPos = idx;
                            }
                        }
                    )

                    list.splice(indexPos, 1);
                }

                me.set('options.list', list);
            });

        },
        save: function () {
            var me = this;
            var list = me.get('options.list');
            me.get('options').save(list);
        },
        close: function () {
            this.get('options').close();
        }
    });

})