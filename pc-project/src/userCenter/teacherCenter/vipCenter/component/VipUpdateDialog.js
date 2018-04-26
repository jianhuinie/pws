/**
 * @file 会员升级提示弹窗
 * @author niejianhui
 */
 define(function (require, exports) {

    var ractiveDialog = require('../../../common/function/ractiveDialog');
    var localStorage = require('cc/util/localStorage');

    /**
     * @param {Object} options
     * @property {Function=} options.onsuccess
     */
    return function (options) {

        options = options || {};

        var dialog = ractiveDialog({
            template: require('html!./VipUpdateDialog.html'),
            data: {
                noRemind: 0
            },
            onrender: function () {
                var me = this;
            },
            close: function () {
                if (this.get('noRemind')) {
                    localStorage.set('noRemindVipUpdate', true);
                }
                dialog.hide();
            }
        });

        return dialog;
    };

 });