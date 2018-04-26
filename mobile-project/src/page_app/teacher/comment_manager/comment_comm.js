/**
 * @file 评价客户经理 推荐
 * @author wuxuelan @ 2016-09-02
 */
define(function(require, exports) {
    'use strict';

    /*var setShare = require('common/function/setShare');*/
    var lazyLoadImage = require('common/lazyLoadImage');
    var appController = require('common/app');
    var $ = require('zepto');
    var service = require('common/service');
    var ui = require("common/ui");

    var container = $('.container');
    var flag = false;

    /*发送推荐信息*/
    function doSend(options) {
        var param = {
            name: options.name,
            mobile: options.mobile,
            reason: options.reason
        };
        var url = '/tcenter/account-manager/postRecommend';
        return service.post(url, param, function(response) {
            flag = false;
            container.find('.submit').css('color','#fff');
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

    /*推荐信息是否为空*/
    function isEmpty(ele) {
        var val = ele.val().trim();
        var len = val.length;
        if(!len) {
            ele.parent().addClass('err');
            return false;
        }
        else {
            ele.parent().removeClass('err');
            return val;
        }
    }

    /*提交推荐*/
    function submitComment() {
        var name = container.find('input[name="name"]');
        var cel = container.find('input[name="cel-phone"]');
        var reason = container.find('textarea[name="reason"]');

        container.on('click', '.submit', function () {
            var options = {};
            options.name = isEmpty(name);
            options.cel = isEmpty(cel);
            options.reason = isEmpty(reason);
            if(!options.name) {
                ui.remind('请填写被推荐人姓名');
                name.focus();
                return;
            }
            if(!options.cel) {
                ui.remind('请填写被推荐人的联系方式');
                cel.focus();
                return;
            }
            if (!options.reason) {
                ui.remind('请填写推荐原因');
                reson.focus();
                return;
            }
            if (!flag) {
                flag = true;
                $(this).css('color','rgba(255,255,255,0.5)');
                doSend({
                    name: options.name,
                    mobile: options.cel,
                    reason: options.reason
                });
            }

        });
    }


    return function() {
        submitComment();
    }
});