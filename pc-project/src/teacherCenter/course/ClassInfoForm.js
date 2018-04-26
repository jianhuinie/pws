/**
 * @file 班课设置 - 课程简介
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var service = require('common/service');
    var Text = require('cobble/form/Text');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {string} options.content 内容
     */
    function OtherForm(options) {
        $.extend(this, options);
        this.init();
    }

    OtherForm.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            var data = me.data;
            if (!data) {
                data = me.data = { };
            }

            me.editor = new UE.ui.Editor({
                initialFrameHeight: 200,
                maximumWords: 5000
            });

            me.editor.render(
                element.find('.editor')[0]
            );

/*            me.editor.addListener('contentChange', function () {

                var tooLarge = false;

                $('img', this.iframe.contentWindow.document).each(function () {

                    $(this).attr({
                        width: this.width,
                        height: this.height
                    });

                    if (this.width > 760) {
                        tooLarge = true;
                    }
                });

                if (tooLarge) {
                    alert({
                        title: '温馨提示',
                        content: '插入的图片宽度大于最大展现宽度 760px，请进行缩小处理吧',
                        width: 400
                    });
                    return;
                }
            });*/

            // 班课number
            me.numberInput = new Text({
                element: element.find('[name="number"]')
            });

            me.numberInput.setValue(
                data.number || ''
            );

            me.saveButton = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    if (data.number == undefined) {
                        alert('请先完成课程信息');
                        return;
                    }

                    var content = me.editor.getContent();
                    var len = me.editor.getContentLength(true);

                    if (store.get('hasStudent') && len == 0) {
                        alert({
                            title: '温馨提示',
                            content: '抱歉，课程简介不能为空哦',
                            buttons: [
                                {
                                    text: '我知道了',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });
                        return;
                    }

                    if (len.length > 5000) {
                        alert('请不要输入超过 5000 个字');
                        return;
                    }

                    var iframe = me.editor.iframe;
                    var doc = iframe.contentDocument || iframe.contentWindow.document;
                    var tooLarge = false;

                    $('img', doc).each(function () {

                        $(this).attr({
                            width: this.width,
                            height: this.height
                        });

                        if (this.width > 760) {
                            tooLarge = true;
                        }
                    });

                    if (tooLarge) {
                        alert({
                            title: '温馨提示',
                            content: '插入的图片宽度大于最大展现宽度 760px，请进行缩小处理吧',
                            width: 400
                        });
                        return;
                    }

                    return service
                    .upsertClassCourse(
                        {
                            number: data.number,
                            introduction: content
                        },
                        {
                            errorHandler: {
                                '100061': function (response) { // 敏感词过滤

                                    var map = {
                                        'introduction': '课程详情'
                                    };

                                    var errorMsg = response.data;
                                    var content = '你';

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
                        var oldContent = me.content;

                        if (isSuccess) {
                            me.content = content;
                        }

                        element.trigger(
                            'save',
                            {
                                content: me.content,
                                isSuccess: isSuccess,
                                isNew: oldContent == null
                            }
                        );

                        return response;
                    });
                }
            })
        },

        refresh: function () {

            var me = this;
            var element = me.element;
            var data = me.data || { };

            // 课程number
            me.numberInput.setValue(
                data.number || ''
            );

            me.editor.setContent(
                String(data.introduction || '')
            );
        },

        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }

    };

    return OtherForm;

});