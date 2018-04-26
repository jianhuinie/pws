/**
 * 发表帖子的插件 － 插入卡片
 */
define(function (require, exports) {

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');

    exports.init = function () {

         UE.registerUI('dialog', function(editor, uiName){

            // 创建dialog
            var dialog = new UE.ui.Dialog({
                // 指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
                iframeUrl: 'customizeDialogPage.html',
                // 需要指定当前的编辑器实例
                editor: editor,
                // 指定dialog的名字
                name: uiName,
                // dialog的标题
                title: "添加课程卡片",

                // 指定dialog的外围样式
                cssRules: "width:380px;height:100px;",

                // 如果给出了buttons就代表dialog有确定和取消
                buttons: [
                    {
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function () {

                            var val = $('.form-text', $('iframe', dialog.getDom())[0].contentWindow.document).val();

                            if (val) {
                                service
                                .getCourseCard({
                                    url: val
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        // 处理课程卡片信息并插入进dom中
                                        $('#course-card').html(response.data.tpl.course_card).show();
                                        // editor.execCommand('inserthtml', val);
                                    }
                                });
                            }

                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function () {
                            dialog.close(false);
                        }
                    }
                ]
            });

            // 参考addCustomizeButton.js
            var btn = new UE.ui.Button({
                name: 'dialogbutton' + uiName,
                title: 'dialogbutton' + uiName,
                cssRules : 'background-position: -839px 54px; width: 75px !important',
                onclick: function () {
                    // 渲染dialog
                    dialog.render();
                    dialog.open();
                }
            });

            return btn;
        }/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
    };
});