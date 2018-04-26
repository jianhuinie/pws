/**
 * @file 工作情况表单
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');
    var Company = require('./Company');
    var companyTpl;

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.company 公司名称
     * @property {Object} options.company_id 公司ID
     * @property {Object} options.start_date 开始时间
     * @property {Object} options.end_date 结束时间
     * @property {Object} options.industry 行业
     * @property {Object} options.job 职位
     *
     */
    function WorkForm(options) {
        $.extend(this, options);
        this.init();
    }

    WorkForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            var companyGroup = element.find('.company'); // 公司
            companyTpl = element.find('#tpl-company').html();
            me.companyListContainer = element.find('.company-list');
            me.companyList = [];

            element
            .on('click', '#add-company', function () { // 添加公司，逐一显示
                me.addCompany();
            })

            .on('click', '.del-company', function () { // 删除公司
                me.removeCompany($(this));
            });

            // 表单验证
            me.validator = new Validator({
                element: element,
                fields: {
                    company: {
                        errors: {
                            minlength: '公司名称至少输入 2 个字',
                            maxlength: '公司名称请不要超过 30 个字'
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

                        var companys = [];
                        var errors = [];

                        $.each(me.companyList, function (i, item) {
                            var r = item.getData();
                            if (r.error) {
                                errors.push(r.error);
                            }
                            else {
                                companys.push(r.data);
                            }
                        });

                        if (errors.length > 0) {
                            alert({
                                title: '温馨提示',
                                content: errors[0]
                            });
                        }
                        else {
                            return service
                            .editStudentWork({
                                companys: companys
                            })
                            .done(function (response) {

                                var isSuccess = response.code === 0;
                                var oldData = me.data;

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

                }
            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            if (data && data.length > 0) {
                $.each(data, function (i, item) {
                    me.addCompany(i + 1, item);
                });
            }
            else {
                me.addCompany(1);
            }

        },

        addCompany: function (index, data) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.companyList.length;
                if (length >= 5) {
                    alert('最多只能设置 5 个公司信息');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            me.companyListContainer.append($(companyTpl));
            me.companyList.push(new Company({
                element: me.companyListContainer.find('.company-card').last(),
                index: index,
                data: data
            }));

        },

        removeCompany: function (select) {

            var me = this;
            var card = select.closest('.company-card');
            var id = card.find('input[name="id"]').val();

            if (id) {
                service
                .delStudentWork({
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
               me.companyList.splice(index - 1, 1); //移除组件
               $.each(me.companyList, function (index, item) { //刷新组件index
                   item.setIndex(index + 1);
               });
            }

            if (me.companyList.length <= 1) {
                // 最后一条信息，不可删除，要清空...
                me.companyList[0].refresh('clear');
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

    return WorkForm;

});