/**
 * @file 相关课程
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';
    var RelatedCourse = require('../common/RelatedCourse');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');
    var service = require('../service');

    return Ractive.extend({
        template: require('html!./OfflineRelatedCourses.html'),
        data: function () {
            return {
                style: require('text!./OfflineRelatedCourses.styl'),
                relatedCourseList: null,
                showButton: true,
                options: {
                    relatedCourse: null,
                    save: $.noop,
                    close: $.noop
                }
            }
        },
        onrender: function () {
            var me = this;

            me.bindData({
                'relatedCourseList': 'options.relatedCourse'
            });
            var list = me.get('options.relatedCourse');
            if (list && list.length >= 3) {
                me.set('showButton', false);
            }

        },
        addRecommendCourse: function () {
            var me = this;
            me.dialog = ractiveDialog(
                RelatedCourse,
                {
                    title: '选择你的推荐课程',
                    skinClass: 'add-related-course-dialog'
                },
                {
                    item: me.get('options.relatedCourse'),
                    close: function () {
                        me.dialog.dispose();
                    },
                    save: function (data) {
                        if (!data) {
                            alert({
                                title: '温馨提示',
                                content: '您还没有选择相关课程'
                            });
                            return;
                        }

                        var list = me.get('relatedCourseList');

                        if (!list) {
                            list = [];
                        };

                        var courseNumbers = [];
                        $.each(
                            list,
                            function (index, value) {
                                courseNumbers.push(value.number)
                            }
                        );
                        if (list.length + data.length > 3) {
                            alert({
                                title: '温馨提示',
                                content: '最多选择 3 门推荐课程'
                            });
                            return;
                        }
                        $.each(
                            data,
                            function (index, value) {
                                if (courseNumbers.indexOf(value.item.number) == -1) {
                                    courseNumbers.push(value.item.number);
                                    list.push(value.item);
                                }
                                else {
                                    alert({
                                        title: '温馨提示',
                                        content: '您有课程上传重复了,请重新选择吧'
                                    });
                                }
                            }
                        )

                        if (list.length == 3) {
                            me.set({
                                'showButton': false
                            });
                        }

                        me.set({
                            'relatedCourseList': list,
                            'options.relatedCourse': list
                        });

                        me.dialog.dispose();
                    }
                }
            );

            me.dialog.show();
        },
        deleteItem: function (index) {
            var me = this;
            alert({
                title: '温馨提示',
                content: '是否确认取消推荐',
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        action: function () {
                            var list = me.get('relatedCourseList');
                            list.splice(index, 1);
                            if (list.length < 3) {
                                me.set({
                                    'showButton': true,
                                    'relatedCourseList': list
                                });
                            }
                            this.hide();
                        }
                    },
                    {
                        text: '取消',
                        action: function () {
                            this.hide();
                        }
                    }
                ]
            });
        }
    })
})