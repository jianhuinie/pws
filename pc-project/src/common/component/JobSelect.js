/**
 * @file 职位选择器（选择 一级 / 二级）
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
     * @property {jQuery} options.element 容器元素，从它往下找 .job-first, .job-second
     * @property {?string} options.prefix 生成的 hidden input name 前缀，避免出现一个表单多处同名的情况
     * @property {?string} options.jobFirstId 一级职位 Id
     * @property {?string} options.jobSecondId 二级职位 Id
     * @property {?Function} options.onJobFirstChange
     * @property {?Function} options.onJobSecondChange
     *
     */
    function JobSelect(options) {
        $.extend(this, options);
        this.init();
    }

    JobSelect.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var prefix = me.prefix || '';

            me.jobFirstSelect = new Select({
                element: element.find('.job-first'),
                defaultText: '- 请选择 -',
                name: prefix + 'jobFirst',
                onChange: function (e, data) {

                    getJobSecondList(data.value)
                    .done(function (response) {

                        var data = response;
                        refreshSelect(
                            me.jobSecondSelect,
                            data,
                            data.length === 1 ? data[0].id : null
                        );
                    });

                    if ($.isFunction(me.onJobFirstChange)) {
                        me.onJobFirstChange(data);
                    }

                }
            });

            me.jobSecondSelect = new Select({
                element: element.find('.job-second'),
                defaultText: '- 请选择 -',
                name: prefix + 'jobSecond',
                onChange: function (e, data) {
                    if ($.isFunction(me.onJobSecondChange)) {
                        me.onJobSecondChange(data);
                    }
                }
            });

            me.refresh();

        },

        /**
         * 刷新下拉框
         *
         * @param {Object} data
         * @property {string} data.jobFirstId
         * @property {string} data.jobSecondId
         *
         */
        refresh: function (data) {

            var me = this;

            if (data) {
                $.extend(me, data);
            }

            var JobFirstChange = me.jobFirstSelect.onChange;
            var JobSecondChange = me.jobSecondSelect.onChange;

            me.jobFirstSelect.onChange =
            me.jobSecondSelect.onChange = null;

            $
            .when(
                getJobFirstList(),
                getJobSecondList(me.jobFirstId)
            )
            .done(function (jobFirstList, jobSecondList) {

                refreshSelect(
                    me.jobFirstSelect,
                    jobFirstList,
                    me.jobFirstId
                );

                refreshSelect(
                    me.jobSecondSelect,
                    jobSecondList,
                    me.jobSecondId
                );

                me.jobFirstSelect.onChange = JobFirstChange;
                me.jobSecondSelect.onChange = JobSecondChange;

            });


        }
    };

    var jobFirstCache = null;
    var jobSecondCache = { };

    function resolvePromise(promise, data) {
        setTimeout(
            function () {
                promise.resolve(data);
            },
            0
        );
    }

    function getJobFirstList() {

        var promise = $.Deferred();

        if (jobFirstCache) {
            resolvePromise(promise, jobFirstCache);
        }
        else {
            service
            .getJobList({ })
            .done(function (response) {
                jobFirstCache = response.data;
                resolvePromise(promise, response.data);
            });
        }

        return promise;
    }

    function getJobSecondList(jobFirstId) {

        var promise = $.Deferred();

        if (jobFirstId == null) {
            resolvePromise(promise, []);
        }
        else if (jobSecondCache[jobFirstId]) {
            resolvePromise(promise, jobSecondCache[jobFirstId]);
        }
        else {
            service
            .getJobList({ id: jobFirstId })
            .done(function (response) {
                jobSecondCache[jobFirstId] = response.data;
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



    return JobSelect;

});