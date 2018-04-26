/**
 * @file 学生中心 我的视频课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');

    var container = $('#content');

    exports.init = function () {

        var checkboxes = container.find('.card-body input[name="purchase_id"]')
        var tables = container.find('.card-body table');

        container
        .on('click', '.to-del', function () { // 删除视频课

            $(this).hide();
            var operarions = $(this).closest('.operarions');

            operarions.find('.cancel-del').show()
            operarions.find('.del-video-course').show();

            checkboxes.show();
            tables.css('width', '95%');
        })
        .on('click', '.cancel-del', function () { // 取消删除操作

            $(this).hide();
            var operarions = $(this).closest('.operarions');

            operarions.find('.to-del').show()
            operarions.find('.del-video-course').hide();

            checkboxes.hide();
            tables.css('width', '100%');
        })
        .on('click', '.del-video-course', function () { // 删除选中视频课

            // 准备删除的视频课们～
            var ids = [];

            $.each(checkboxes, function (index, item) {
                if ($(item).is(':checked')) {
                    ids.push($(item).val());
                    // $(item).closest('.video-course-group').addClass('death-mark');
                }
            });

            if (ids.length === 0) {
                alert('请选择要删除的视频课');
            }
            else {
                var content = '确认要删除这' + ids.length + '门视频课么？<br><div class="text-primary">删除之后不可恢复</div>';

                confirm({
                    content: content,
                    width: 380,
                    skinClass: 'confirm-del-dialog',
                    buttons: [
                        {
                            text: '取消',
                            type: 'default',
                            handler: function () {
                                this.hide();
                            }
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                                // container.find('.death-mark').fadeOut();
                                service
                                .deleteStudentVideoCourse({
                                    ids: ids.join(',')
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        window.location.reload();
                                        // container.find('.death-mark').fadeOut();
                                    }
                                });
                            }
                        }
                    ]
                });
            }
        });
    };

});