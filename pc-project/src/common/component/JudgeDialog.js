/**
 * @file 评价弹窗
 * @author peilonghui
 */

define(function(require) {

    var Dialog = require('cobble/ui/Dialog');

    var Rater = require('cobble/ui/Rater');

    /**
     * etpl评价大拇指们
     *
     * @const
     * @type {String}
     */
    var JUDGE_TPL = ''
        + '<div class="judge-dialog-thumbs">'
        + '</div>'
        + '<div class="dialog-action">'
        +   '<button class="btn-primary">确定</button>'
        +   '<button class="btn-default btn-reject">拒绝</button>'
        + '</div>';


    /**
     * 评价弹窗类
     *
     * @constructor
     * @param {Object} options 配置信息
     * @property {Function=} options.okFunc 评价成功后的回调
     * @property {Function=} options.cancelFunc 拒绝评价时候的回调
     */
    function JudgeDialog(options) {

        this.options = $.extend({}, JudgeDialog.defaultOptions, options || {});
        this.options.starValue = 0;
        this.init();
    };

    /**
     * 评价弹窗的默认配置信息
     *
     * @const
     * @type {Object}
     */
    JudgeDialog.defaultOptions = {
        title: '快速评价',
        starTexts: ['不太满意', '满意', '非常满意'],
        disposeOnHide: true,
        width: 400,
        okFunc: $.noop,
        cancelFunc: $.noop,
        content: ''

    };


    JudgeDialog.prototype = {

        /**
         * 评价弹窗的入口方法
         *
         * @return
         */
        init: function () {

            var me = this;
            me.initContent();
            me.dialog = new Dialog(me.options);
            me.initEvents();
            me.dialog.show();

        },

        /**
         * 初始化dialog中的正文内容
         *
         * @return
         */
        initContent: function () {

            var me = this;

            var options = me.options;

            var starTexts = options.starTexts;

            options.content = ''
                + '<div class="judge-dialog-container">'
                + options.content
                + JUDGE_TPL
                + '</div>';

        },

        /**
         * 初始化弹窗中的事件们
         *
         * @return
         */
        initEvents: function () {

            var me = this;
            var container = me.dialog.element;

            var element = container.find('.judge-dialog-thumbs')

            new Rater({
                element: element,
                count: 3,
                min: 0,
                value: 0,
                hint: {
                    1: '一般',
                    2: '满意',
                    3: '非常满意'
                },
                onChange: function (e, data) {
                    me.starValue = data.value;
                },
                onClass: 'icon icon-thumbs-up active',
                offClass: 'icon icon-thumbs-up',
                itemTemplate: ''
                    + '<div>'
                    +   '<i class="${class}" data-value="${value}" title="${hint}"></i>'
                    +   '<span>${hint}</span>'
                    + '</div>',
                itemSelector: 'i'
            });

            container.on(
                'click',
                '.btn-primary',
                function () {
                    me.hide();
                    me.options.okFunc(me.starValue);
                }
            );

            container.on(
                'click',
                '.btn-reject',
                function () {
                    me.options.cancelFunc();
                    me.hide();

                }
            );
        },

        /**
         * 显示弹窗
         *
         * @return
         */
        show: function () {
            this.dialog.show();
        },

        /**
         * 隐藏弹窗
         *
         * @return
         */
        hide: function () {
            this.dialog.hide();
        }
    };


    return JudgeDialog;
});