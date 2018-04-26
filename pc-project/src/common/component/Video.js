/**
 * @file 简单的 视频 edit
 * @author zhujialu, wangyujie
 */
define(function (require) {

    'use strict';

    var Popup = require('cobble/helper/Popup');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 主元素
     * @property {Function=} options.edit  编辑元素
     * @property {Function=} options.remove 删除
     * @property {Function=} options.beforeRemove 删除前处理函数
     */
    function Video(options) {
        $.extend(this, options);
        this.init();
    }

    Video.prototype = {

        /**
         * 初始化
         */
        init: function () {

            var me = this;
            var element = me.element;

            element
            .on('click', '.edit', function (e) {
                var target = $(e.currentTarget);
                var currentLi = target.closest('li');
                var id = currentLi.data('id');

                location.href = '/teacher_center/videoEdit?id=' + id;

            })
            .on('click', '.remove', function (e) {

                var remove = function () {
                    confirm('确认删除吗？', '温馨提示')
                    .done(function () {
                        me.remove({
                            event: e
                        });
                    });
                }

                if ($.isFunction(me.beforeRemove)) {
                    if (me.beforeRemove()) {
                        remove();
                    }
                }
                else {
                    remove();
                }

            });


        },

        /**
         * 销毁
         */
        dispose: function () {

            this.popup.dispose();
            this.element.off();

            this.popup =
            this.element = null;
        }

    };

    return Video;

});