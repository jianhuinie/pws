/**
 * @file 感兴趣课程
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var form = require('common/form');

    var selectedSub, toSelect, category3, tempSelected;
    var subNum = 0; // 感兴趣课程数目

    /*
     * 临时选中某科目
     *
     * @property {number} id 科目ID
     * @property {string} name 科目名
     */
    function addTempSubject (id, name) {

        var html = '<li data-id="' + id + '" data-name="' + name + '">'
                 +     name
                 +     '<i class="icon icon-times"></i>'
                 + '</li>';
        if (subNum < 10) {
            subNum++;
            tempSelected.find('.temp-list').append(html);
        }
        else {
            alert('最多只可以选择10个课程哦~');
        }

    }

    /**
     * 课程科目表单
     *
     * @constructor
     * @param {Object} options
     * @property {Object} options.element
     * @property {Object} options.data 后端传来的数据
     * @property {Object} options.data.category1
     * @property {string} options.data.category1.name
     * @property {string} options.data.category1.id
     * @property {Object} options.data.category2
     * @property {string} options.data.category2.name
     * @property {string} options.data.category2.id
     * @property {Object} options.data.category3
     * @property {string} options.data.category3.name
     * @property {string} options.data.category3.id
     *
     */
    function MoreSubjectForm(options) {
        $.extend(this, options);
        this.init();
    }

    MoreSubjectForm.prototype = {

        init: function () {

            var me = this;
            var element = this.element;
            var data = this.data || { };

            // 一级分类
            this.cat1Select = new Select({
                element: element.find('.category1'),
                name: 'category1',
                onChange: function () {
                    getSubjectList(this.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            me.cat2Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (data.category2) {
                                me.cat2Select.setValue(
                                    data.category2.id
                                );
                            }
                        }
                    });
                }
            });

            var cat3 = this.cat3MulSelect
                     = element.find('.category3-list');

            // 二级分类
            this.cat2Select = new Select({
                element: element.find('.category2'),
                name: 'category2',
                onChange: function () {
                    getSubjectList(this.value)
                    .done(function (response) {
                        if (response.code === 0) {

                            var cat3List = response.data.list;
                            var content = '';
                            $.each(cat3List, function (index, item) {
                                content += '<li data-id="' + item.id + '" data-name="' + item.name + '">' + item.name + '</li>';
                            });

                            cat3.closest('.category3').show();
                            cat3.html(content);
                        }
                    });
                }
            });

            getSubjectList()
            .done(function (response) {
                if (response.code === 0) {
                    me.cat1Select.refresh({
                        data: convert(response.data.list)
                    });
                }
            });

            // 定义常用div
            selectedSub = this.selectedSub = element.find('.selected-sub');
            toSelect = this.toSelect = element.find('.to-select');
            category3 = this.category3 = toSelect.find('.category3');
            tempSelected = this.tempSelected = element.find('.temp-selected');

            element
            .on('click', '.selected-sub .action', function (e) {

                var target = $(e.currentTarget);

                selectedSub.hide();
                toSelect.show();

                // 将反显数据添加到临时选中区
                var subList = selectedSub.find('.sub-list li');
                if (subList && subList.length > 0) {

                    subList.each(function (index, item) {
                        var id = $(item).data('id');
                        var name = $(item).data('name');
                        addTempSubject(id, name);
                    });

                    tempSelected.show();
                }

            })

            .on('click', '.category3-list li', function (e) {

                var target = $(e.currentTarget);

                if (!target.hasClass('active')) {

                    var id = target.data('id');
                    var name = target.data('name');

                    tempSelected.show();
                    addTempSubject(id, name);
                    if (subNum < 10) {
                        target.addClass('active');
                    }

                }

            })

            .on('click', '.temp-list li .icon', function (e) {
                var target = $(e.currentTarget);
                var tarLi = target.closest('li');
                var tarId = tarLi.data('id');

                tarLi.remove();

                category3.find('li').each(function () {
                    if ($(this).data('id') == tarId) {
                        $(this).removeClass('active');
                    }
                });

                subNum--;

            })

            .on('click', '.clear-all', function () {

                selectedSub.find('.sub-list').html('');
                tempSelected.find('.temp-list').html('');
                category3.find('li').each(function () {
                    $(this).removeClass('active');
                });

                subNum = 0;
            })

            .on('click', '.sure', function (e) {
                var target = $(e.currentTarget);

                toSelect.hide();
                target.hide();
                tempSelected.find('.action').show();

            })

            .on('click', '.temp-selected .action', function (e) {

                var target = $(e.currentTarget);

                toSelect.show();
                tempSelected.show();
                tempSelected.find('.action').hide();
                tempSelected.find('.sure').show();

            });

        },

        /**
         * 获取 感兴趣课程值
         *
         * @return {string}
         */
        getValue: function () {

            var array = [ ];

            this
            .tempSelected
            .find('.temp-list li')
            .each(
                function () {
                    array.push(
                        $(this).data('id')
                    );
                }
            );

            if (array.length == 0) {

                this
                .selectedSub
                .find('.sub-list li')
                .each(
                    function () {
                        array.push(
                            $(this).data('id')
                        );
                    }
                );

            }

            return array.toString();
        },

        /**
         * 更新成最新数据
         */
        refresh: function () {

            var data = this.data || { };

            // 课程类目
            if (data.category1) {
                this.cat1Select.setValue(data.category1.id);
            }
            if (data.category2) {
                this.cat2Select.setValue(data.category2.id);
            }

        }

    };

    /**
     * 科目缓存
     *
     * @inner
     * @type {Object}
     */
    var cache = { };

    function getSubjectList(id) {

        if (cache[id]) {

            var promise = $.Deferred();

            setTimeout(
                function () {
                    promise.resolve(cache[id]);
                },
                0
            );

            return promise;
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

    function getPrice(element) {

        var checkbox = element.find('[name="price"]');
        var price;

        if (checkbox.prop('checked')) {
            var money = element.find('[type="money"]');
            price = $.trim(money.val());
        }

        return $.isNumeric(price) ? price : '';
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


    return MoreSubjectForm;
});