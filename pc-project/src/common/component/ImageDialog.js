/**
 * @file 图片对话框
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var compressImage = require('../function/compressImage');
    var imageDimension = require('cobble/function/imageDimension');
    var viewportHeight = require('cobble/function/viewportHeight');
    var scale = require('../function/scale');

    /**
     * 图片对话框
     *
     * @constructor
     * @param {Object} options
     * @property {Array.<Object>} options.data 图片数组，数组元素格式为 { url: 'http://xx', title: '图片标题' }
     * @property {number} options.index 当前显示第几张
     * @property {?number} options.imageHeight 图片高度，默认取浏览器视窗高度
     * @property {?number} options.imageWidth 图片高度，如果不传，等于 4/3 * imageHeight
     */
    function ImageDialog(options) {
        $.extend(this, ImageDialog.defaultOptions, options);
        this.init();
    }

    ImageDialog.prototype = {

        init: function () {

            var me = this;

            var dialog =
            me.dialog = new Dialog({
                skinClass: 'image-dialog',
                removeOnEmpty: false,
                hideOnClickMask: true,
                hidden: true
            });

            var element = dialog.element;

            var headerHeight = element.find('.dialog-header').outerHeight();
            var imageHeight =
            me.imageHeight = me.imageHeight
                            ? me.imageHeight
                            : (viewportHeight() - headerHeight - 20); // 上下留白 10px

            var imageWidth =
            me.imageWidth = me.imageWidth
                           ? me.imageWidth
                           : ((4 / 3) * imageHeight);  // 4:3 的比例

            element.width(imageWidth);

            var body = element.find('.dialog-body');
            body.height(imageHeight);

            var pager = '<i class="icon icon-chevron-left"></i>'
                      + '<i class="icon icon-chevron-right"></i>';
            body.after(pager);

            element
            .on('click', '.icon-chevron-left', function (e) {
                me.setImage(me.index - 1);
            })
            .on('click', '.icon-chevron-right', function (e) {
                me.setImage(me.index + 1);
            });

            me.setImage(me.index);

        },

        setImage: function (index) {

            var me = this;

            var img = me.data[index];

            var dialog = me.dialog;
            var element = dialog.element;

            element.find(dialog.titleSelector).html(img.title);

            if (img.noCompress) {
                var url = img.url;
            }
            else {
                var url = compressImage({
                    url: img.url,
                    width: me.imageWidth,
                    height: me.imageHeight,
                    noCrop: true
                });
            }


            var body = element.find(dialog.bodySelector);

            img = $('<img src="'+ url + '" />');
            body.html('');
            body.append(img);

            imageDimension(
                url,
                function (width, height) {
                    var ratio = scale(
                    {
                        width: width,
                        height: height
                    },
                    {
                        width: me.imageWidth,
                        height: me.imageHeight
                    });

                    height *= ratio;
                    img.css({
                        width: width * ratio,
                        height: height,
                        position: 'relative',
                        top: (me.imageHeight - height) / 2
                    });

                    dialog.show();
                }
            );

            me.index = index;

            var prevIcon = element.find('.icon-chevron-left');
            var nextIcon = element.find('.icon-chevron-right');

            prevIcon.show();
            nextIcon.show();

            if (index === 0) {
                prevIcon.hide();
            }

            if (index === me.data.length - 1) {
                nextIcon.hide();
            }

        }

    };

    ImageDialog.defaultOptions = {

    };


    return ImageDialog;

});