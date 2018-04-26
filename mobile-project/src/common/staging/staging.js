/**
 * 分期的下拉组件（适用于视频课与班课）
 * @author  hsm
 */
define(function (require) {

    'use strict';
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var artTemplate = require('artTemplate');
    var stagingRender = artTemplate.compile(require('text!common/staging/stagingComponent.tpl'));
    var stagingDialog = null;

    return function (options, type, flag) {

        var newPageElement;
        //var initEvents = false;
        // yuanye: 支持免息的期数,数组
        var mianXiArr = options.mianxi || [];

        newPageElement = stagingRender({
            staging: options.data,
            type: type
        });


        newPageElement = '' + newPageElement;

        /*if(!stagingDialog) {
            stagingDialog = new SlideInDialog({content: newPageElement});
            initEvents = true;
        }*/

        stagingDialog = new SlideInDialog({content: newPageElement});
        stagingDialog.show();
        $('.slide-dialog-mask').css('position', 'fixed');

        var stagingItem = $('.staging-item');
        // yuanye: 修改分期免息文案
        stagingItem.each(function() {
            var self = $(this);
            var stagingPeriod = '' + self.data('periods');
            if (mianXiArr.indexOf(stagingPeriod) !== -1) {
                self.find('.fee').text('免息分期');
            }
        });
        stagingItem.unbind('click');
        stagingItem.on('click', function () {
            var that = $(this);
            that.siblings().each(function() {
                var there = $(this);
                if(!there.find('.options .icon').hasClass('hide')) {
                    there.find('.options .icon').addClass('hide');
                    there.attr('data-flag', '0');
                }
            });
            if(that.find('.options .icon').hasClass('hide')){
                that.find('.options .icon').removeClass('hide');
                that.attr('data-flag', '1');
            } else {
                that.find('.options .icon').addClass('hide');
                that.attr('data-flag', '0');
            }
        });

        var close = $('.staging-dialog').find('.nav .close-icon');
        close.unbind('click');
        close.on('click', function () {
            stagingDialog.hide();
        });

        if(flag == 'close') {
            stagingDialog.hide();
        }
    }
});