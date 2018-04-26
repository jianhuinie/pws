/**
 * @file 获取学校列表弹窗
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');

    var userType;

    /**
     * 学校列表弹窗
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.outputSchoolInfo 输出学校信息
     */
    function SchoolListDialog(options) {
        $.extend(this, SchoolListDialog.defaultOptions, options);
        this.init();
    }

    SchoolListDialog.prototype = {

        init: function () {

            var me = this;

            me.dialog = new Dialog({
                title: '选择学校',
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#school-list-dialog').html(),
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            element
            .on('click', '.school-item', function (e) {

                var target = $(e.currentTarget);

                var schoolInfo = {
                    id: target.data('id'),
                    name: target.find('span').text()
                };

                me.dialog.hide();
                me.outputSchoolInfo(schoolInfo);

            });


        },
    };


    SchoolListDialog.defaultOptions = {
        title: '选择学校',
        width: 770,
        onSuccess: $.noop,
        skinClass: 'school-list-dialog',
        disposeOnHide: true
    };

    return SchoolListDialog;
});