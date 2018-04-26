/**
 * Created by hanzhaohang on 16/5/16.
 * cps簽約
 */
define(function (require) {
    "use strict";
    var ui = require('common/ui'),
        $ = require('zepto'),
        isLocked = false;

    return function (page_data) {
        $('.button').click(function () {
            var me = $(this);
            if (+page_data.data.status === 1 || isLocked || me.hasClass('grey')) {
                return;
            }
            var cConfirm = ui.confirm({
                content: '我确认与跟谁学签订“课程收入分成合作协议”',
                title: '课程收入分成合作协议',
                button_ok: '确认',
                button_cancel: '取消',
                forceShow: true
            });
            cConfirm.done(function () {
                me.html('提交中..');
                isLocked = true;
                $.ajax({
                    url: '/activity/cps_confirm',
                    data:{
                        rate_type: page_data.data.rate_info.rate_type
                    },
                    type: 'post',
                    success: function (res) {
                        if (res.code) {
                            ui.remind(res.msg);
                            me.html("确认签约");
                        } else {
                            var c2 = ui.confirm({
                                content: '恭喜你签约成功',
                                title: '课程收入分成合作协议',
                                button_ok: '好的',
                                button_cancel: '关闭',
                                forceShow: true
                            });
                            me.html("已签约").addClass('grey');
                            c2.done(function () {
                                window.location.reload();
                            });
                            c2.fail(function () {
                                window.location.reload();
                            });
                        }
                    }
                }).always(function () {
                    isLocked = false;
                });

            });


        });

    };
});
