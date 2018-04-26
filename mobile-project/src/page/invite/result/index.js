/**
 * 考研app的订单确认页
 * actually，只在了考研app里面用到了
 * Created by hanzh on 16/1/20.
 */
define(function(require, exports) {
    'use strict';

    var $ = require("zepto");
    var habo = require("common/component/analysis/habo/index");

    function addTeacherAvatar(teacherNumber) {
        $.ajax({
            type: "post",
            url: '/teacher/baseInfo',
            data: {
                teacher_number: teacherNumber
            },
            success: function(response) {
                if (response.code == 0) {
                    $('#j_avatar').attr('src', response.data.avatar);
                }
            }
        });
    }

    return function(page_data) {
        // console.log(page_data);

        var role = page_data.user_role == 0 ? 't' : 's';

        addTeacherAvatar(page_data.teacher_number);

        $('#j_download').click(function () {
            habo.send({
                type: 'tm_inv',
                stype: 'tm_inv_down' + role
            });
        });
    }
});
