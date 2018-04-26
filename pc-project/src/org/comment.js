/**
 * @file 机构评 价
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    var Select = require('cobble/form/Select');
    var url = require('cobble/util/url');
    var store = require('common/store');
    var container = $('.main-comment');
    var Popup = require('cobble/helper/Popup');
    var tianxiaoLog = require('common/tianxiaoLog');

    function buildUrl(data,del_item) {

        var param = url.parseQuery(location.search);
        $.each(data, function (key, item) {

            param[item.name] = item.value;

        });
        if (del_item.length > 0) {
            for( var i = 0 ; i < del_item.length; i++) {
                delete param[del_item[i]];
            }
        }

        var link = '/i/comment/' + store.get('domain');

        return link + '?' + $.param(param);
    }

    exports.init = function () {

        var sortBy = store.get('sortBy');

        base.init();
        tianxiaoLog.send(store.get('orgnumber'), 'comment');

        var sortSelect = container.find('.tab-nav .sort-select');

        var trigger = container.find('.nav-item-all');
        var angleIcon = trigger.find('i');

        new Popup({
            element: trigger,
            layer: container.find('.nav-list'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 100
            },
            onAfterShow: function () {
                angleIcon
                .removeClass('icon-angle-down')
                .addClass('icon-angle-up');
            },
            onAfterHide: function () {
                angleIcon
                .removeClass('icon-angle-up')
                .addClass('icon-angle-down');
            }
        });

        var sortBySelector = new Select({
            element: sortSelect,
            onChange: function (e, data) {
                if (container.data('num') > 1) {
                    location.href = buildUrl([
                        {
                            name: 'sort_by',
                            value: data.value
                        }
                    ],['page']);
                }

            }
        });

        sortBySelector.setValue(sortBy, {
            silence: true
        });

        container
        .on('click', '[data-face-type-value]', function (e) {

            var value = $(this).data('face-type-value');

            location.href = buildUrl([
                {
                    name: 'face_type',
                    value: value
                }
            ],['page']);

        });

        container
        .on('click', '[data-comment-type-value]', function (e) {

            var value = $(this).data('comment-type-value');

            location.href = buildUrl([
                {
                    name: 'comment_type',
                    value: value
                },
                {
                    name: 'face_type',
                    value: '0'
                }
            ],['page']);

        });

    };
});