/**
 * 考研app的订单确认页
 * actually，只在了考研app里面用到了
 * Created by hanzh on 16/1/20.
 */
define(function(require, exports) {
    'use strict';
    var $ = require("zepto");
    var addTeacherInfo = require("./addTeacherInfo");
    var register = require("./register");
    var habo = require("common/component/analysis/habo/index");

    return function(page_data) {
        console.log(page_data);

        var role = page_data.user_role == 0 ? 't' : 's';

        habo.send({
            type: 'tm_inv',
            stype: 'tm_inv_show' + role
        });

        addTeacherInfo(page_data.teacher_number);

        register.init(page_data);
    }

});
