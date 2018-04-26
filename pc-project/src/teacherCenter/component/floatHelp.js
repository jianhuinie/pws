/**
 * @file 老师个人中心帮助浮窗
 * @author huahua
 */
define(function (require, exports) {
    'use strict';
    var cookie = require('cobble/util/cookie');

    var setFloat = function(obj) {
        var width = $(window).width();
        var height = $(window).height();
        var left = 1000 + (width - 1000) / 2 + 20;
        var bottom = height / 2 - 180;
        obj.css({
            'left': left + 'px',
            'bottom': bottom + 'px'
        });
    };

    exports.init = function() {
        setFloat($('#float-help'));

        $(window).resize(function() {
            setFloat($('#float-help'));
        });
        var floatHelpCookie = cookie.get('floatHelpCookie');

        if (floatHelpCookie == undefined || floatHelpCookie == 'show') {
            $('#float-help').removeClass('float-close');
        } else {
            $('#float-help').addClass('float-close');
        }
        $('#float-help').on('click', '.help-content', function(e) {
            if (!($('#float-help').hasClass('float-close'))) {
                return;
            }
            $('#float-help').removeClass('float-close');
            cookie.set('floatHelpCookie', 'show');
        });
        $('#float-help').on('click', '.close', function(e) {
            $('#float-help').addClass('float-close');
            cookie.set('floatHelpCookie', 'hide');
            e.stopPropagation();
        });
        $('#float-help').show();
    };

});
