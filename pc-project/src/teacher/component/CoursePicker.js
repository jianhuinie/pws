/**
 * @file 科目选择器
 * @author zengcheng
 */
define(function (require, exports) {

    var Select = require('cobble/form/Select');
    var service = require('common/service');

    /**
     *
     * @class 科目选择
     * @param {object} options 参数配置
     * @property {Array.object} options.courses 科目的元素绑定
     *                 {
     *                      name: {string}, //名称
     *                      element: {jQuery} //对应元素
     *                      selected: {string|number} //当前选中的
     *                 }
     *
     */
    function CoursePicker (options) {
        this.options = $.extend(this, options);
        init(this);
    }

    /**
     * 初始化
     * @inner
     */
    function init (o) {
        // 一级分类
        var first = o.courses[0];
        var second = o.courses[1];
        var third = o.courses[2];
        var init = false;

        first.categorySelect = new Select({
            element: first.element,
            name: first.name,
            onChange: function () {
                first.selected = this.value;
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        second.categorySelect.refresh({
                            data: convert(response.data.list)
                        });
                        if (second.selected) {
                            second.categorySelect.setValue(
                                second.selected
                            );
                        }
                        if (init) {
                            second.selected = false;
                            third.selected = false;
                        }
                    }
                });
            }
        });


        // 二级分类
        second.categorySelect = new Select({
            element: second.element,
            name: second.name,
            onChange: function () {
                second.selected = this.value;
                getSubjectList(this.value)
                .done(function (response) {
                    if (response.code === 0) {
                        third.categorySelect.refresh({
                            data: convert(response.data.list)
                        });
                        if (third.selected) {
                            third.categorySelect.setValue(
                                third.selected
                            );
                        }
                        if (init) {
                            third.selected = false;
                        }
                    }
                });
            }
        });

        // 三级分类
        third.categorySelect = new Select({
            element: third.element,
            name: third.name,
            onChange: function () {
                third.selected = this.value;
                init = true;
            }
        });

        getSubjectList()
        .done(function (response) {
            if (response.code === 0) {
                first.categorySelect.refresh({
                    data: convert(response.data.list)
                });
                if (first.selected) {
                    first.categorySelect.setValue(
                        first.selected
                    );
                }
            }
        });
    }


    /**
     * 科目缓存
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

    /**
     * 获取当前选中值
     * @return {Array.(number|string)}
     */
    CoursePicker.prototype.getValue = function () {
        var courses = this.options.courses;
        var result = [];
        for (var i = 0, len = courses.length; i < len; i++) {
            result.push(courses[i].selected);
        }
        return result;
    }

    return CoursePicker;
});