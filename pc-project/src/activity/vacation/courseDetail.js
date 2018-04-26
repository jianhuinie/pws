/**
 * @file 寒假一对一辅导详情页
 * @author wangtianhua
 */

define(function(require, exports) {

    'use strict';
    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');

    exports.init = function (){
        var container = $('.content');
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
            .vacationCourse({
                type_id: 2,
                mobile: mobile
            })
            .done(function (responses) {
                if (responses.code == 0) {
                    container.find('.input-number').val('');
                    alert('提交成功，请稍候！');
                }
            });
        })
    }

});