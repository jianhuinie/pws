/*
*分期的下拉组件（适用于视频课与班课）
*hsm
*/

define(function (require) {

    'use strict';
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var artTemplate = require('artTemplate');
    var stagingRender = artTemplate.compile(require('text!./stagingComponent.tpl'));
    var stagingDialog = null;

    return function (options, type, flag) {

        var newPageElement;
        //var initEvents = false;

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
