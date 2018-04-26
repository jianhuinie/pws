/**
 * @file 科目选择器
 * @author  liucong
 *
 * 三级分类 实现联动、赋值
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');

    var service = require('common/service');

    var defaultOptions = {
        category1Selector: '.category1',
        category2Selector: '.category2',
        category3Selector: '.category3',
        category1Name: 'category1',
        category2Name: 'category2',
        category3Name: 'category3'
    };

    /**
     * 科目缓存
     *
     * @inner
     * @type {Object}
     */
    var cache = { };

    /**
     * 构造函数
     *
     * @param {Object} options
     * @property {Object} options.element 容器
     * @property {string} options.category1Selector 一级类目选择器
     * @property {string} options.category2Selector 二级类目选择器
     * @property {string} options.category3Selector 三级类目选择器
     * @property {string} options.category1Name 一级类目 name
     * @property {string} options.category2Name 三级类目 name
     * @property {string} options.category3Name 三级类目 name
     * @property {Function=} options.onChange
     */
    function CategorySelect(options) {

        $.extend(
            this,
            defaultOptions,
            options
        );

        this.init();

    }

    CategorySelect.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            me.categorySelect1 = new Select({
                element: element.find(me.category1Selector),
                name: me.category1Name,
                onChange: function () {
                    $.proxy(changeHandler, me)
                        (me.categorySelect1, me.categorySelect2);

                }
            });

            me.categorySelect2 = new Select({
                element: element.find(me.category2Selector),
                name: me.category2Name,
                onChange: function () {
                    $.proxy(changeHandler, me)
                        (me.categorySelect2, me.categorySelect3);
                }
            });

            me.categorySelect3 = new Select({
                element: element.find(me.category3Selector),
                name: me.category3Name,
                onChange: me.onChange
            });

            getSubjectList()
            .done(function (response) {
                if (response.code === 0) {
                    me.categorySelect1.refresh({
                        data: convert(response.data.list)
                    });
                    me.onloadData();
                }
            });
        },
        /**
         * 赋值
         *
         * @param {Array.<Object>} subjectList
         */
        setValue: function (subjectList) {

            var deferred = $.Deferred();

            var cat1 = this.categorySelect1;
            var cat2 = this.categorySelect2;
            var cat3 = this.categorySelect3;

            if (!subjectList || subjectList.length !== 3) {
                return;
            }

            cat1.setValue(subjectList[0].id);

            cat1.changePromise
            .done(function () {
                cat2.setValue(subjectList[1].id);
                cat3.setValue('');
                cat2.changePromise
                .done(function () {
                    cat3.setValue(subjectList[2].id);
                    deferred.resolve();
                });
            });
            return deferred.promise();
        },

        getValue: function () {
            if (this.categorySelect2.getValue() && this.categorySelect1.getValue()) {
                return this.categorySelect3.getValue();
            }
        },

        onloadData: function () {

        }
    };

    function getSubjectList(id) {

        if (cache[id]) {

            var promise = $.Deferred();

            setTimeout(
                function () {
                    promise.resolve(cache[id]);
                },
                0
            );

            return promise.promise();
        }

        return service
        .getSubjectList({ id: id })
        .done(function (response) {
            if (response.code === 0) {
                cache[id] = response;
            }
            return response;
        });
    }

    function changeHandler(select, relative) {
        var me = this;
        // 作用是生成一个deferred对象。
        select.changePromise = $.Deferred();

        var value = select.value;

        if (select.name == 'category1') {
            me.categorySelect3.setValue('');
            me.categorySelect2.setValue('');
        }
        if (select.name == 'category2') {
            me.categorySelect3.setValue('');
        }

        if (value) {
            getSubjectList(value)
            .done(function (response) {
                if (response.code === 0) {

                    var data = response.data;
                    relative.refresh({
                        data: convert(data.list)
                    });

                    select.changePromise.resolve();
                }
            });
        }


    }

    /**
     * 转换数据源
     *
     * @inner
     * @param {Array} datasource
     * @return {Array}
     */
    function convert(datasource) {
        return $.map(
            datasource,
            function (item) {
                return {
                    text: item.name,
                    value: item.id
                };
            }
        );
    }

    return CategorySelect;

});