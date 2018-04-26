/**
 * @file 可授课时间复制至未来八周 对话框
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.price
     * @property {Function=} options.onAfterSave
     */

    function CopyDateDialog(options) {
        $.extend(this, options);
        this.init();
    }

    CopyDateDialog.prototype = {

        init: function () {

            var me = this;
            var weeks = me.weeks;

            var content = ''
                + '<p>'
                +     '小秘书发现你在近八周内有几周不接受学生约课，他们都伤心了，确定要这样做么？'
                + '</p>'
                + '<input type="checkbox" name="copy" value="1" checked="checked">'
                + '将本周时间复制到近八周内所有空闲周'

                + '<div class="dialog-action">'
                +     '<button class="btn btn-primary btn-save">保存</button>'
                +     '<button class="btn btn-default btn-cancel">取消</button>'
                + '</div>';

            var dialog = new Dialog({
                title: '温馨提示',
                content: content,
                width: 350,
                skinClass: 'copy-date'
            });

            var element = dialog.element;

            element
            .on('click', '.btn-save', function () {

                var copy = element.find('input[name="copy"]').prop('checked');

                if ($.isFunction(me.onAfterSave)) {
                    me.onAfterSave(copy);
                }
                dialog.hide();
            })
            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });


        }

    };

    return CopyDateDialog;

});