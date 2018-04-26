/**
 * @file 评价客户经理
 * @author wuxuelan @ 2016-09-01
 */
define(function(require, exports) {
    'use strict';

    /*var setShare = require('common/function/setShare');*/
    var lazyLoadImage = require('common/lazyLoadImage');
    var appController = require('common/app');
    var $ = require('zepto');
    var service = require('common/service');
    var ui = require("common/ui");

    var flag = false;

    /*发送评价信息*/
    function doSend(options) {
        var param = {
            service: options.service,
            promise: options.promise,
            know: options.know,
            bugfix: options.bugfix,
            comment: options.advice
        };
        var url = '/tcenter/account-manager/postComment';
        return service.post(url, param, function(response) {
            flag = false;
            $('.submit').css('color', '#fff');
            if (response.code == 0) {
                ui.remind('提交成功');

                if (appController.isApp()) {
                    Jockey.send('goBack', {
                        force: true
                    });
                }
                else {
                    location.href = history.go(-1);
                }
            } else if (response.code == -1) {
                ui.remind('提交失败，请再次提交');
            }
        });
    }
    /*查看选择是否为空并返回选择信息*/
    function isCommented(element) {
        var question_1 = element.hasClass('question_1');
        var radioBtns = element.find('.radio-btn');
        var count = 0;
        var checked_obj = {};
        var key;
        $.each(radioBtns, function (index, item) {
            if (question_1) {
                key = (Math.floor(index / 3) == 1) ? 'promise' : 'service';
            }
            else {
                key = (Math.floor(index / 3) == 1) ? 'bugfix' : 'know';
            }
            if (!(index%3)) {
                checked_obj[key] = 0;
            }
            if ($(item).hasClass('checkedRadio')) {
                count++;
                checked_obj[key] = (index % 3) + 1;
            }
        });

        if (count >= 2) {
            return checked_obj;
        }
        else {
            return false;
        }
    }

    /*提交评价*/
    function submitComment() {
        var options = {};
        $('.submit').on('click', function () {
            var question_1 = isCommented($('.question_1'));
            var question_2 = isCommented($('.question_2'));
            var advice = $('.advice').val().trim();

            if (!question_1) {
                ui.remind('请对客户经理的服务质量进行评价');
                return false;
            }
            if (!question_2) {
                ui.remind('请对客户经理的业务质量进行评价');
                return false;
            }
            if (question_1 && question_2) {
                options.service = question_1.service;
                options.promise = question_1.promise;
                options.know = question_2.know;
                options.bugfix = question_2.bugfix;
            }
            options.advice = advice || '';

            if (!flag) {
                flag = true;
                $(this).css('color', 'rgba(255,255,255,0.5)');
                doSend(options);
            }

        });
    }


    return function(page_data) {
        var pageData = page_data;

        $('.danxuan').on('click', function () {
            var block = $(this).parent();
            block.find('input[type=radio]').attr('checked', false);
            block.find('.radio-btn').removeClass('checkedRadio');
            $(this).children("div").addClass('checkedRadio');
            $(this).children("div").find('input[type=radio]').attr('checked', true);
        });
        submitComment();
    }
});