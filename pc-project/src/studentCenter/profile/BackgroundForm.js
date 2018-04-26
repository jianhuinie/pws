/**
 * @file 教育信息表单
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');

    var form = require('common/form');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var University = require('./University');
    var Senior = require('./Senior');
    var Technical = require('./Technical');
    var Junior = require('./Junior');
    var Primary = require('./Primary');

    var universityTpl, seniorTpl, technicalTpl, juniorTpl, primaryTpl;

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     */
    function BackgroundForm(options) {
        $.extend(this, options);
        this.init();
    }

    BackgroundForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            var universityGroup = element.find('.university'); // 大学
                universityTpl = element.find('#tpl-university').html();
                me.universityListContainer = element.find('.university-list');
                me.universityList = [];

            var seniorGroup = element.find('.senior'); // 高中
                seniorTpl = element.find('#tpl-senior').html();
                me.seniorListContainer = element.find('.senior-list');
                me.seniorList = [];

            var technicalGroup = element.find('.technical'); // 中专技校
                technicalTpl = element.find('#tpl-technical').html();
                me.technicalListContainer = element.find('.technical-list');
                me.technicalList = [];

            var juniorGroup = element.find('.junior'); // 初中
                juniorTpl = element.find('#tpl-junior').html();
                me.juniorListContainer = element.find('.junior-list');
                me.juniorList = [];

            var primaryGroup = element.find('.primary'); // 小学
                primaryTpl = element.find('#tpl-primary').html();
                me.primaryListContainer = element.find('.primary-list');
                me.primaryList = [];


            element
            .on('click', '#add-university', function () { // 添加大学，逐一显示
                me.addUniversity();
            })

            .on('click', '.del-university', function () { // 删除大学
                me.removeUniversity($(this));
            })

            .on('click', '#add-senior', function () { // 添加高中，逐一显示
                me.addSenior();
            })

            .on('click', '.del-senior', function () {
                me.removeSenior($(this));
            })

            .on('click', '#add-technical', function () { // 中专技校
                me.addTechnical();
            })

            .on('click', '.del-technical', function () {
                me.removeTechnical($(this));
            })

            .on('click', '#add-junior', function () { // 初中
                me.addJunior();
            })

            .on('click', '.del-junior', function () {
                me.removeJunior($(this));
            })

            .on('click', '#add-primary', function () { // 小学
                me.addPrimary();
            })

            .on('click', '.del-primary', function () {
                me.removePrimary($(this));
            });


            // 表单验证
            me.validator = new Validator({
                element: element,
                fields: {
                    primary: {
                        errors: {
                        }
                    }
                }
            });

            me.refresh();

            // 保存表单
            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    if (me.validator.validate()) {

                        // 获取到各层级学校的数据信息
                        var universitys = [];
                        var seniors = [];
                        var technicals = [];
                        var juniors = [];
                        var primarys = [];

                        $.each(me.universityList, function (i, item) {
                            var r = item.getData();
                            universitys.push(r.data);
                        });

                        $.each(me.seniorList, function (i, item) {
                            var r = item.getData();
                            seniors.push(r.data);
                        });

                        $.each(me.technicalList, function (i, item) {
                            var r = item.getData();
                            technicals.push(r.data);
                        });

                        $.each(me.juniorList, function (i, item) {
                            var r = item.getData();
                            juniors.push(r.data);
                        });

                        $.each(me.primaryList, function (i, item) {
                            var r = item.getData();
                            primarys.push(r.data);
                        });

                        return service
                        .editStudentBackground({
                            universitys: universitys,
                            seniors: seniors,
                            technicals: technicals,
                            juniors: juniors,
                            primarys: primarys
                        })
                        .done(function (response) {

                            var isSuccess = response.code === 0;

                            element.trigger(
                                'save',
                                {
                                    isSuccess: isSuccess
                                }
                            );

                            return response;

                        });
                    }
                }
            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            // 初始化各学校信息表单
            if (data.colleges && data.colleges.length > 0) {
                $.each(data.colleges, function (i, item) {
                    me.addUniversity(i + 1, item);
                });
            }
            else {
                me.addUniversity(1);
            }

            if (data.senior_schools && data.senior_schools.length > 0) {
                $.each(data.senior_schools, function (i, item) {
                    me.addSenior(i + 1, item);
                });
            }
            else {
                me.addSenior(1);
            }

            if (data.special_schools && data.special_schools.length > 0) {
                $.each(data.special_schools, function (i, item) {
                    me.addTechnical(i + 1, item);
                });
            }
            else {
                me.addTechnical(1);
            }

            if (data.middle_schools && data.middle_schools.length > 0) {
                $.each(data.middle_schools, function (i, item) {
                    me.addJunior(i + 1, item);
                });
            }
            else {
                me.addJunior(1);
            }

            if (data.primary_schools && data.primary_schools.length > 0) {
                $.each(data.primary_schools, function (i, item) {
                    me.addPrimary(i + 1, item);
                });
            }
            else {
                me.addPrimary(1);
            }
        },

        addUniversity: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.universityList.length;
                if (length >= 5) {
                    alert('最多只能设置 5 个大学信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            me.universityListContainer.append($(universityTpl));
            me.universityList.push(new University({
                element: me.universityListContainer.find('.university-card').last(),
                index: index,
                data: data
            }));
        },

        addSenior: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.seniorList.length;
                if (length >= 2) {
                    alert('最多只能设置 2 个高中信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            me.seniorListContainer.append($(seniorTpl));
            me.seniorList.push(new Senior({
                element: me.seniorListContainer.find('.senior-card').last(),
                index: index,
                data: data
            }));
        },

        addTechnical: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.technicalList.length;
                if (length >= 2) {
                    alert('最多只能设置 2 个中专技校信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            me.technicalListContainer.append($(technicalTpl));
            me.technicalList.push(new Technical({
                element: me.technicalListContainer.find('.technical-card').last(),
                index: index,
                data: data
            }));
        },

        addJunior: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.juniorList.length;
                if (length >= 2) {
                    alert('最多只能设置 2 个初中信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            me.juniorListContainer.append($(juniorTpl));
            me.juniorList.push(new Junior({
                element: me.juniorListContainer.find('.junior-card').last(),
                index: index,
                data: data
            }));
        },

        addPrimary: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.primaryList.length;
                if (length >= 2) {
                    alert('最多只能设置 2 个小学信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }


            me.primaryListContainer.append($(primaryTpl));
            me.primaryList.push(new Primary({
                element: me.primaryListContainer.find('.primary-card').last(),
                index: index,
                data: data
            }));
        },

        removeUniversity: function (select) {

            var me = this;
            var card = select.closest('.university-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentBackground({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // success('成功删除');
                    }
                });
            }

            var remove = function (index) {
               card.remove(); //移除dom
               me.universityList.splice(index - 1, 1); //移除组件
               $.each(me.universityList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.universityList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.universityList[0].refresh('clear');
            }
            else {
                var index = card.data('index');
                remove(index);
            }
        },

        removeSenior: function (select) {

            var me = this;
            var card = select.closest('.senior-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentBackground({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // success('成功删除');
                    }
                });
            }

            var remove = function (index) {
               card.remove(); //移除dom
               me.seniorList.splice(index - 1, 1); //移除组件
               $.each(me.seniorList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.seniorList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.seniorList[0].refresh('clear');
            }
            else {
                var index = card.data('index');
                remove(index);
            }
        },

        removeTechnical: function (select) {

            var me = this;
            var card = select.closest('.technical-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentBackground({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // success('成功删除');
                    }
                });
            }

            var remove = function (index) {
               card.remove(); //移除dom
               me.technicalList.splice(index - 1, 1); //移除组件
               $.each(me.technicalList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.technicalList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.technicalList[0].refresh('clear');
            }
            else {
                var index = card.data('index');
                remove(index);
            }
        },

        removeJunior: function (select) {

            var me = this;
            var card = select.closest('.junior-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentBackground({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // success('成功删除');
                    }
                });
            }

            var remove = function (index) {
               card.remove(); //移除dom
               me.juniorList.splice(index - 1, 1); //移除组件
               $.each(me.juniorList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.juniorList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.juniorList[0].refresh('clear');
            }
            else {
                var index = card.data('index');
                remove(index);
            }
        },

        removePrimary: function (select) {

            var me = this;
            var card = select.closest('.primary-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentBackground({
                    id: id
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // success('成功删除');
                    }
                });
            }

            var remove = function (index) {
               card.remove(); //移除dom
               me.primaryList.splice(index - 1, 1); //移除组件
               $.each(me.primaryList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.primaryList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.primaryList[0].refresh('clear');
            }
            else {
                var index = card.data('index');
                remove(index);
            }
        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }


    };

    return BackgroundForm;

});