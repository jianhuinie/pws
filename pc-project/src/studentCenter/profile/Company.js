/**
 * @file 公司
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Text = require('cobble/form/Text');
    var IndustrySelect = require('common/component/IndustrySelect');
    var JobSelect = require('common/component/JobSelect');
    var service = require('common/service');
    var DateSelect = require('common/component/DateSelect');
    var form = require('common/form');
    var AutoComplete = require('cobble/ui/AutoComplete');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.company 公司
     * @property {number} options.data.start_year 开始年
     * @property {number} options.data.start_month 开始月
     * @property {string} options.data.end_year 结束年
     * @property {string} options.data.end_month 结束月
     * @property {Object} options.data.industrySecond 行业
     * @property {Object} options.data.jobSecond 职务
     */
    function Company(options) {
        $.extend(this, options);
        this.init();
    }

    Company.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            // 索引
            me.setIndex(me.index);

            // 公司
            me.companyInput = element.find('[name="company"]');

            // 公司的suggestion
            var suggestionInput = element.find('input[name="company"]');
            var companyId = element.find('input[name="company_id"]');
            var suggestionList = element.find('.suggestion-list');

            new AutoComplete({
                element: suggestionInput,
                menu: suggestionList,
                activeClass: 'active',
                renderTemplate: function (data) {
                    var html = '';
                    $.each(
                        data || [],
                        function (index, item) {
                            html = html
                                 + '<li data-id="' + item.id + '">'
                                 + item.name
                                 + '</li>';
                        }
                    );
                    return html;
                },
                load: function (text, callback) {

                    service
                    .getCompanySuggestion({
                        key: text
                    })
                    .done(function (response) {

                        if (response.code === 1) {
                            callback(response.result);
                        }

                    });
                },
                onItemClick: function (e, data) {
                    suggestionInput.val(data.text);
                    companyId.val(data.id);
                }
            });

            var startElement = element.find('.start-date');
            var endElement = element.find('.end-date');
            // 结束年月
            me.endSelect = new DateSelect({
                                element: endElement,
                                prefix: 'end_',
                                sofar: true,
                                onYearChange: function () {

                                    var monthSelect = this.monthSelect;

                                    if (this.yearSelect.value == -1) {
                                        monthSelect.element.hide();
                                    }
                                    else {
                                        monthSelect.element.show();
                                    }

                                }
                            });

            // 开始年月
            me.startSelect = new DateSelect({
                                element: startElement,
                                prefix: 'start_',
                                onYearChange: function () {

                                    var startYear = this.yearSelect.getValue();
                                    if (!$.isNumeric(startYear)) {
                                        startYear = me.endSelect.startYear;
                                    }

                                    var endYear = me.endSelect.endYear;
                                    var data = DateSelect.createYearData(startYear, endYear, true);

                                    me.endSelect.yearSelect.refresh({
                                        data: data,
                                        value: data[0].value
                                    });

                                }
                            });

            // 行业
            var industryFirstId = data.industry_first ? data.industry_first.id : null;
            var industrySecondId = data.industry_second ? data.industry_second.id : null;

            me.industrySelect = new IndustrySelect({
                element: element.find('.industry-select'),
                industryFirstId: industryFirstId,
                industrySecondId: industrySecondId
            });

            // 职位
            var jobFirstId = data.job_first ? data.job_first.id : null;
            var jobSecondId = data.job_second ? data.job_second.id : null;

            me.jobSelect = new JobSelect({
                element: element.find('.job-select'),
                jobFirstId: jobFirstId,
                jobSecondId: jobSecondId
            });

            if ($.isNumeric(me.data.id)) {
                me.refresh();
            }

        },

        /**
         * 获取数据
         * @return {object}  data: {}
         */
        getData: function () {

            var me = this;
            var formData = form.parse(me.element);

            // 开始时间结束时间
            if (formData.start_month < 10) {
                formData.start_month = '0' + formData.start_month;
            }
            if (formData.end_month < 10) {
                formData.end_month = '0' + formData.end_month;
            }
            var start = formData.start_year + formData.start_month;
            var end = formData.end_year + formData.end_month;

            if (formData.end_year != -1 && start > end) {
                error = '工作时间设置有错误哦~';
                return {
                    error: error
                };
            }

            var data = {
                id: formData.id,
                company: formData.company,
                start_year: formData.start_year,
                start_month: formData.start_month,
                end_year: formData.end_year,
                end_month: formData.end_month,
                industry: formData.industrySecond,
                job: formData.jobSecond
            }

            return {
                data: data
            };

        },

        refresh: function (clear) {

            var me = this;
            var element = me.element;
            var data;

            if (clear) {
                data = ''; // 清空
            }
            else {
                data = me.data;
            }

            element.find('[name="id"]').val(data.id);

            // 公司名
            me.companyInput.val(
                data.company || ''
            );

            // 工作时间
            var startDate = data.start_date;
            var startYear, startMonth;
            if (startDate) {
                var parts = startDate.split('-');
                startYear = parseInt(parts[0], 10);
                startMonth = parseInt(parts[1], 10);
            }

            var endDate = data.end_date;
            var endYear, endMonth;
            if (endDate) {
                if (endDate == '0000-00') {
                    endYear = -1;  // 至今
                }
                else {
                    var parts = endDate.split('-');
                    endYear = parseInt(parts[0], 10);
                    endMonth = parseInt(parts[1], 10);
                }
            }

            me.startSelect.refresh({
                year: startYear,
                month: startMonth
            });

            me.endSelect.refresh({
                year: endYear,
                month: endMonth
            });

            if (clear) {
                // 工作时间的清空
                me.startSelect.refresh({
                    year: '',
                    month: ''
                });
                me.endSelect.refresh({
                    year: '',
                    month: ''
                });
            }

        },

        // 设置当前项索引值
        setIndex: function (index) {
            this.index = index;
            this.element.data('index', index);
        },

        getId: function () {
            return this.element.find('[name="id"]').val();
        }
    };

    return Company;
});