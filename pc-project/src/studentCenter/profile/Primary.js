/**
 * @file 小学
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var DateSelect = require('common/component/DateSelect');
    var Select = require('cobble/form/Select');
    var service = require('common/service');
    var SchoolListDialog = require('common/component/SchoolListDialog');
    var dealSchoolList = require('common/center/dealSchoolList');
    var form = require('common/form');
    var AutoComplete = require('cobble/ui/AutoComplete');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Object} options.data
     * @property {number} options.data.primary_id 小学ID
     * @property {number} options.data.primary 小学名
     * @property {number} options.data.type 学校类型，1小学
     * @property {string} options.data.year 入学年份
     */
    function Senior(options) {
        $.extend(this, options);
        this.init();
    }

    Senior.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            if (!me.data) {
                me.data = { };
            }

            // 索引
            me.setIndex(me.index);

            // 入学年份
            me.enterSchoolSelect = new DateSelect({
                element: element.find('.enter-school'),
                year: me.data.enter_school,
                defaultYearText: '- 入学年份 -'
            });

            // 小学的suggestion
            var suggestionInput = element.find('.suggestion-input');
            var primaryId = element.find('input[name="primary_id"]');
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
                                 + '<li data-text="' + item.name + '" data-id="' + item.id + '">'
                                 +     item.name
                                 +     '<em>' + item.addr + '</em>'
                                 + '</li>';
                        }
                    );
                    return html;
                },
                load: function (text, callback) {
                    service
                    .getPrimarySuggestion({
                        key: text
                    })
                    .done(function (response) {

                        if (response.code === 1) {
                            callback(response.result);
                        }

                    });
                },
                onItemClick: function (e, data) {
                    // suggestionInput.val(data.text);
                    primaryId.val(data.id);
                }
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

            var data = {
                id: formData.id,
                school_name: formData.primary,
                enter_school: formData.year,
                type: 1
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
                data = me.data
            }

            element.find('[name="id"]').val(data.id);
            element.find('[name="primary_id"]').val(data.school_id);
            element.find('[name="primary"]').val(data.school_name);

            // 入学年份
            var enterSchool = {
                year: data.enter_school || ''
            };
            me.enterSchoolSelect.refresh(enterSchool);
        },

        // 设置当前项索引值
        setIndex: function (index) {
            this.index = index;
            this.element.data('index', index);
        }
    };

    return Senior;
});