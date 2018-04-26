/**
 * @file 添加相关课程
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var service = require('../service');

    return Ractive.extend({
        template: require('html!./RelatedCourse.html'),
        data: function () {
            return {
                style: require('text!./RelatedCourse.styl'),
                relatedCourseList: null,
                hasComputed: false,
                options: {
                    item: [],
                    save: $.noop,
                    close: $.noop
                }
            }
        },
        components: {

        },
        onrender: function () {
            var me = this;

            service
            .getRelatedCourse()
            .then(function (response) {
                if (response.code == 0) {
                    var list = [];
                    var data = response.data;
                    $.each(
                        data,
                        function (index, item) {
                            var isChecked = false;
                            var optionsItem = me.get('options.item');
                            if (!optionsItem) {
                                optionsItem = {};
                            }
                            $.each(
                                optionsItem,
                                function (idx, value) {
                                    if (item.number == value.number) {
                                        isChecked = true;
                                    }
                                }
                            );
                            if (!isChecked) {
                                list.push({
                                    item: item,
                                    checked: false
                                });
                            }
                        }
                    );
                    me.set({
                        hasComputed: true,
                        relatedCourseList: list
                    });
                }
            });

            me.observe('relatedCourseList.*.checked', function (checked) {
                var list = me.get('options.item');
                if (!list) {
                    list = [];
                }
                var relatedCourseList = me.get('relatedCourseList');
                if (checked) {
                    list.push(relatedCourseList[arguments[3]]);
                }
                else {
                    var newList = [];
                    $.each(
                        list,
                        function (index, value) {
                            if (value.checked) {
                                newList.push(value);
                            }
                        }
                    )
                    list = newList;
                }

                me.set('options.item', list);
            });
        },
        save: function () {
            var data = this.get('options.item');
            this.get('options').save(data);
        },
        close: function () {
            this.get('options').close();
        }
    });
})