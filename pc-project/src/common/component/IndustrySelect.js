/**
 * @file 行业选择器（选择 一级 / 二级）
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var service = require('common/service');

    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 容器元素，从它往下找 .industry-first, .industry-second
     * @property {?string} options.prefix 生成的 hidden input name 前缀，避免出现一个表单多处同名的情况
     * @property {?string} options.industryFirstId 一级行业 Id
     * @property {?string} options.industrySecondId 二级行业 Id
     * @property {?Function} options.onIndustryFirstChange
     * @property {?Function} options.onIndustrySecondChange
     *
     */
    function IndustrySelect(options) {
        $.extend(this, options);
        this.init();
    }

    IndustrySelect.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var prefix = me.prefix || '';

            me.industryFirstSelect = new Select({
                element: element.find('.industry-first'),
                defaultText: '- 请选择 -',
                name: prefix + 'industryFirst',
                onChange: function (e, data) {

                    getIndustrySecondList(data.value)
                    .done(function (response) {

                        var data = response;

                        refreshSelect(
                            me.industrySecondSelect,
                            data,
                            data.length === 1 ? data[0].id : null
                        );

                    });

                    if ($.isFunction(me.onIndustryFirstChange)) {
                        me.onIndustryFirstChange(data);
                    }

                }
            });

            me.industrySecondSelect = new Select({
                element: element.find('.industry-second'),
                defaultText: '- 请选择 -',
                name: prefix + 'industrySecond',
                onChange: function (e, data) {
                    if ($.isFunction(me.onIndustrySecondChange)) {
                        me.onIndustrySecondChange(data);
                    }
                }
            });

            me.refresh();

        },

        /**
         * 刷新下拉框
         *
         * @param {Object} data
         * @property {string} data.industryFirstId
         * @property {string} data.industrySecondId
         *
         */
        refresh: function (data) {

            var me = this;

            if (data) {
                $.extend(me, data);
            }

            var IndustryFirstChange = me.industryFirstSelect.onChange;
            var IndustrySecondChange = me.industrySecondSelect.onChange;

            me.industryFirstSelect.onChange =
            me.industrySecondSelect.onChange = null;

            $
            .when(
                getIndustryFirstList(),
                getIndustrySecondList(me.industryFirstId)
            )
            .done(function (industryFirstList, industrySecondList) {

                refreshSelect(
                    me.industryFirstSelect,
                    industryFirstList,
                    me.industryFirstId
                );

                refreshSelect(
                    me.industrySecondSelect,
                    industrySecondList,
                    me.industrySecondId
                );

                me.industryFirstSelect.onChange = IndustryFirstChange;
                me.industrySecondSelect.onChange = IndustrySecondChange;

            });


        }
    };

    var industryFirstCache = null;
    var industrySecondCache = { };

    function resolvePromise(promise, data) {

        setTimeout(
            function () {
                promise.resolve(data);
            },
            0
        );
    }

    function getIndustryFirstList() {

        var promise = $.Deferred();

        if (industryFirstCache) {
            resolvePromise(promise, industryFirstCache);
        }
        else {

            service
            .getIndustryList({ })
            .done(function (response) {
                industryFirstCache = response.data;
                resolvePromise(promise, response.data);
            });
        }

        return promise;
    }

    function getIndustrySecondList(industryFirstId) {

        var promise = $.Deferred();

        if (industryFirstId == null) {
            resolvePromise(promise, []);
        }
        else if (industrySecondCache[industryFirstId]) {
            resolvePromise(promise, industrySecondCache[industryFirstId]);
        }
        else {
            service
            .getIndustryList({ id: industryFirstId })
            .done(function (response) {
                industrySecondCache[industryFirstId] = response.data;
                resolvePromise(promise, response.data);
            });
        }

        return promise;
    }

    /**
     * 把数据源格式转为 Select 使用的格式
     *
     * @inner
     * @param {Array} data
     * @return {Array}
     */
    function format(data) {
        return $.map(
            data || [ ],
            function (item) {
                return {
                    text: item.name,
                    value: item.id
                };
            }
        );
    }


    function refreshSelect(select, data, id) {

        select.refresh({
            data: format(data),
            value: id != null ? id : null
        });

    }



    return IndustrySelect;

});