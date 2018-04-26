define(function (require, exports) {
    'use strict';

    var service = require('common/service');
    var Popup = require('cobble/helper/Popup');
    var VideoDialog = require('common/component/VideoDialog');


    var container;

    var newVideoDialog = function (path, title) {
        new VideoDialog({
            title: title,
            url: path
        });
    }

        
    exports.init = function () {
        container = $('.content');
        new Popup({
            element: container.find('.sharebox'),
            layer: container.find('.sharebox .baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });
        container
        .on('click', '.submit-number', function () {
            var mobile = $.trim(container.find('.input-number').val());
            var regm = /^1[34578]\d{9}$/;
            var rego = /^(0[0-9]{2,3})(-)([0-9]{7,8})$/;
            if (!regm.test(mobile) && !rego.test(mobile)) {
                alert('请填写正确的电话号码！');
                return;
            }
            service
            .winterHoliday({
                mobile: mobile
            })
            .done(function (responses) {
                if (responses.code == 0) {
                    container.find('.input-number').val('');
                    alert('提交成功，请稍后！');
                }
            });
        })
        .on('click', '.video', function (e) {
            var view = $(this).data('view');
            var title = $(this).data('title') || '寒假班介绍';
            if (view) {
                newVideoDialog(view, title);
            }
            e.preventDefault();
        });

    };
});