define(function (require, exports) {

    'use strict';
    var service = require('common/service');
    var container = $('#content');

    exports.init = function () {

        container
        .on('click', '.manual-op .open-class', function (e) {

            var number = $(this).closest('.manual-op').data('course-number');

            confirm({
                title: '温馨提示',
                content: '确认开班后，班课将会如期进行，无法中途取消</br>是否确认开班？'
            })
            .done(function () {
                service
                .statusClassCourse({
                    number: number,
                    op: 'open'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                })
            });
        })
        .on('click', '.manual-op .close-class', function (e) {
            var number = $(this).closest('.manual-op').data('course-number');

            confirm({
                title: '温馨提示',
                content: '关闭班级后，小秘书将会帮你取消所有学生的订单，该操作不可恢复</br>是否确定关闭班级？'
            })
            .done(function () {
                service
                .statusClassCourse({
                    number: number,
                    op: 'close'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                })
            });
        });
    }

});