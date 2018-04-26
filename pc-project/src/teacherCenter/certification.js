/**
 * @file 老师认证设置
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var education = require('./certification/education');
    var teaching = require('./certification/teaching');
    var specialty = require('./certification/specialty');
    var ImageUploader = require('common/component/ImageUploader');
    var Zoom = require('cobble/ui/Zoom');
    var floatHelp = require('teacherCenter/component/floatHelp');

    var container = $('#content');
    var currentTrigger;
    var map = {
        'education': education,
        'teaching': teaching,
        'specialty': specialty
    };

    function open(trigger) {

        currentTrigger = trigger;

        trigger.data('visible', true);
        trigger.next('.form').show();
        trigger.next('.form').find('.wrapper').show();
    }

    function close(trigger) {

        currentTrigger = null;

        trigger.data('visible', false);

        trigger.show();
        trigger.nextAll('.form:visible').hide();
        trigger.nextAll('.form:visible').find('.wrapper').hide();
    }


    exports.init = function () {

        education.init();
        teaching.init();
        specialty.init();

        container
        // 认证
        .on('click', '.btn-auth', function (e) {

            var target = $(e.currentTarget);
            var trigger = target.hasClass('form-trigger')
                        ? target
                        : target.closest('.form-trigger');

            if (trigger.data('visible')) {
                close(trigger);
            }
            else {
                if (currentTrigger) {
                    close(currentTrigger);
                }

                open(trigger);

                // edit编辑的才有图——放大镜
                trigger.next('.edit')
                .find('.image')
                .each(function () {
                    var target = $(this);
                    target.data(
                        'zoom',
                        new Zoom({
                            element: target.find('img'),
                            finder: target.find('.image-finder'),
                            viewport: target.find('.image-viewport'),
                            url: target.data('image')
                        })
                    );
                });

            }
        })

        .on('click', '.btn-cancel', function (e) {

            var target = $(e.currentTarget);
            var form = target.closest('.form');
            var trigger = form.prevAll('.form-trigger:first');

            close(trigger);
        })

        // 重新编辑
        .on('click', '.btn-reupload', function (e) {

            var target = $(e.currentTarget);
            var trigger = target.closest('.show');
            var type = trigger.data('type');
            var formData = trigger.data('form');
            var uploaderForm = trigger.nextAll('.uploader-form:first');

            trigger.hide();

            // 判断表单是否反显数据
            if (formData) {
                map[type].fill({
                    id: formData.id,
                    storage_id: formData.storage_id,
                    idnumber: formData.idnumber,
                    type: formData.type,
                    name: formData.name,
                    url: formData.url
                });
            }
            uploaderForm.show();
            uploaderForm.find('.wrapper').show();

            // 放大镜
            uploaderForm
            .find('.image')
            .each(function () {
                var target = $(this);

                target.data(
                    'zoom',
                    new Zoom({
                        element: target.find('img'),
                        finder: target.find('.image-finder'),
                        viewport: target.find('.image-viewport'),
                        url: formData.url
                    })
                );
            });

            // 身份认证-示例图放大镜
            uploaderForm
            .find('.sample')
            .each(function () {
                var target = $(this);
                new Zoom({
                    element: target.find('img'),
                    finder: target.find('.image-finder'),
                    viewport: target.find('.image-viewport'),
                    url: target.data('image')
                });
            });
        });
        floatHelp.init();

    };


});