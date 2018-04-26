/**
 * @file 教师列表中的教师跳转app教师详情页
 * @author  peilonghui
 */

define(function (require) {

    var appController = require('common/app');

    var store = require('common/store');

    return {
        bind: function () {

            var isTeacherApp = appController.isTeacherApp();
            var isOrgApp = appController.isOrgApp();

            if (appController.isApp()) {
                $('.teacher-list')
                    .on('click', '.teacher-item', function (e) {

                        var number = $(this).data('number');

                        if (number && !(isTeacherApp || isOrgApp)) {
                            e.preventDefault();
                            appController.redirectTeacherDetail(number);
                        }
                        else if (isTeacherApp || isOrgApp ) {
                            e.preventDefault();
                            appController.openNewWindow($(this).prop('href'));
                        }

                    });
            }

        }
    };
});