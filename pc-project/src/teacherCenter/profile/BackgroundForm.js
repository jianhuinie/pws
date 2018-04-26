/**
 * @file 背景资料表单
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Text = require('cobble/form/Text');
    var Validator = require('cobble/form/Validator');
    var store = require('common/store');

    var form = require('common/form');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var jsonUtil = require('cobble/util/json');

    var selectedLabels; // 选中标签展示位
    var sysLabels; // 系统标签列表

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

    /**
     * 生成选中标签
     *
     * @property {int} id
     * @property {string} title
     */
    function creatSelectedLabel(id, title) {
        var isHas = false;
        var li = '<li data-id="' + id + '" data-title="' + title + '">'
               + title
               + '<i class="icon icon-close"></i>'
               + '</li>';

        // 判断是否已选中该标签
        selectedLabels.find('li')
        .each(function (index, item) {
            if ($(item).data('title') == title) {
                isHas = true;
            }
        });

        if (isHas == false && title != '') {
            selectedLabels.append(li);
        }
    }

    BackgroundForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            sysLabels = element.find('.sys-labels'); // 系统标签
            selectedLabels = element.find('.selected-labels'); // 用户选中标签

            me.schoolAgeSelect = new Select({
                element: element.find('.school-age'),
                defaultText: '- 年 -',
                name: 'school_age'
            });

            // 主营科目 start
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


            // 课程类目
            var categoryIds = null;
            var container = element;
            if (store.get('subjects')) {
                categoryIds = store.get('subjects');
            }
            // 一级分类
            var cat1Select = new Select({
                element: container.find('.category1'),
                name: 'category1',
                onChange: function (e, data) {
                    /*store.set('subjectid1',data.value);
                    store.set('subjectid1text',data.text );*/

                    getSubjectList(data.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            cat2Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (categoryIds&&categoryIds[1]) {
                                cat2Select.setValue(
                                    categoryIds[1].id
                                );
                            }
                        }
                    });
                }
            });
            // 二级分类
            var cat2Select = new Select({
                element: container.find('.category2'),
                name: 'category2',
                onChange: function (e, data) {
                    /*store.set('subjectid2',data.value);
                    store.set('subjectid2text',data.text );*/

                    getSubjectList(data.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            cat3Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (categoryIds&&categoryIds[2]) {
                                cat3Select.setValue(
                                    categoryIds[2].id
                                );
                            }
                        }
                    });
                }
            });
            // 三级分类
            var cat3Select = new Select({
                element: container.find('.category3'),
                name: 'subject_id',
                onChange: function (e, data) {
                    store.set('subject_id',data.value);
                }
            });
            // 加载一级类目
            getSubjectList()
            .done(function (response) {
                if (response.code === 0) {
                    cat1Select.refresh({
                        data: convert(response.data.list)
                    });
                    if (categoryIds && categoryIds[0]) {
                        cat1Select.setValue(categoryIds[0].id);
                    }
                }
            });
            // 主营科目 end

/*
            me.tagInput = new TagInput({
                element: element.find('.tags'),
                max: 5,
                validate: function (text) {

                    if (text.length > 7) {
                        return false;
                    }

                    return /^[\w\u4e00-\u9fa5]+$/.test(text);
                }
            });
*/

            // 表单验证
            me.validator = new Validator({
                element: element,
                fields: {
                    school_age: {
                        errors: {
                            required: '请选择教龄'
                        }
                    },
                    institution: {
                        errors: {
                            required: '请填写机构名称',
                            minlength: '机构名称至少输入 2 个字',
                            maxlength: '机构名称请不要超过 20 个字'
                        }
                    }
                }
            });

            // 保存表单
            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    // 取标签
                    var tags = [];
                    selectedLabels
                    .find('li')
                    .each(function (index, item) {
                        var id = $(item).data('id');
                        if (id) {
                            tags.push({'id': id});
                        }
                        else {
                            tags.push({'title': $.trim($(item).data('title'))});
                        }
                    });

                    /*if (tags.length === 0) {
                        alert('请选择个人标签');
                        return;
                    }*/

                    if (!store.get('subject_id')) {
                        alert('请选择主营科目');
                        return;
                    }

                    if (me.validator.validate()) {

                        var data = form.parse(me.element);

                        return service
                        .editTeacherBackgroundInfo(
                            {
                                schoolAge: data.school_age,
                                institution: data.institution,
                                tags: jsonUtil.stringify(tags),
                                subject_id: store.get('subject_id')
                            },
                            {
                                errorHandler: {
                                    '100061': function (response) { // 敏感词过滤

                                        var map = {
                                            'institution': '单位/机构/学校',
                                            'tags': '教学特点'
                                        };

                                        var errorMsg = response.data;
                                        var content = '你';  // 你

                                        $.each(errorMsg, function (index, item) {

                                            if (item.length) {
                                                content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                                $.each(item, function (i, j) {
                                                    content += '“<em>' + j + '</em>”';
                                                });
                                                content += '；</span><br />';
                                            }

                                        });

                                        content += '请删除后重新输入';

                                        alert({
                                            title: '温馨提示',
                                            content: content,
                                            width: 450,
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        });

                                    }
                                }
                            }
                        )
                        .done(function (response) {

                            var isSuccess = response.code === 0;
                            var oldData = me.data;

                            if (isSuccess) {
                                me.data = {
                                    school_age: data.school_age,
                                    institution: data.institution,
                                    tags: tags
                                };
                            }

                            element.trigger(
                                'save',
                                {
                                    data: me.data,
                                    isSuccess: isSuccess,
                                    isNew: oldData == null
                                }
                            );

                            return response;

                        });
                    }
                }
            });

            me.institutionInput = new Text({
                element: element.find('[name="institution"]')
            });

            element
            .on('click', '.btn-add', function (e) { // 添加用户自定义标签
                var title = element.find('input[name="tags"]').val();
                var isSys = false;
                element.find('input[name="tags"]').val('');
                // 自定义标签不可包含标点符号
                if (/^[a-zA-z0-9\u4E00-\u9FA5]*$/.test(title)) {
                    // 判断系统标签中是否有用户输入标签
                    sysLabels.find('li')
                    .each(function (index, item) {
                        if ($(item).text() == title) {
                            isSys = true;
                            $(item).click();
                        }
                    });

                    if (isSys == false) {
                        creatSelectedLabel('', title);
                    };
                }
                else {
                    alert('个人标签不能包括标点符号哦~');
                }
            })

            .on('click', '.nav-item', function (e) { // 标签tab切换
                var target = $(e.currentTarget);
                var no = target.data('index');
                var panelNo = 'panel-' + no;

                var tabNav = element.find('.tab-nav');
                var tabContent = element.find('.tab-content');

                if (!target.hasClass('active')) {
                    tabContent
                    .find('.tab-panel')
                    .each(function (index, item) {
                        if ($(item).hasClass(panelNo)) {
                            $(item).show();
                        }
                        else {
                            $(item).hide();
                        }
                    });
                }

                tabNav
                .find('.nav-item')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');
            })

            .on('click', '.sys-labels li', function (e) { // 选择标签
                var target = $(e.currentTarget);
                var id = target.data('id');
                var title = target.text();

                if (!target.hasClass('active')) {
                    target.addClass('active');
                    creatSelectedLabel(id, title);
                }
            })

            .on('click', '.selected-labels .icon-close', function (e) { // 删除标签
                var target = $(e.currentTarget);
                var currtLi = target.closest('li');
                var id = currtLi.data('id');
                currtLi.remove();

                if (id) { // 系统默认标签才会有id..
                    sysLabels.find('li')
                    .each(function (index, item) {
                        if ($(item).data('id') == id) {
                            $(item).removeClass('active');
                        }
                    });
                }
            });

        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            me.schoolAgeSelect.setValue(data.school_age);

            me.institutionInput.setValue(
                data.institution || ''
            );

            // 系统默认标签，展示第一组
            element.find('.tab-nav b:first').click();

            var selectdTags = data.tags;
            var isSys;
            // 用户已选tags
            $.each(selectdTags, function (index, item) {
                isSys = false;
                // 系统默认标签
                sysLabels
                .find('li')
                .each(function (i, j) {
                    if ($(j).data('id') == item.id) {
                        isSys = true;
                        $(j).click();
                    }
                });
                // 用户自定义标签
                if (isSys == false) {
                    creatSelectedLabel(item.id, item.title);
                }
            });

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