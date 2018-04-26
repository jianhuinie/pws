/**
 * @file 616活动专场列表
 * @author zengcheng
 */

define(function (require, exports) {

    var courseListWrapper = $('#excellent-course-wrapper');

    exports.init = function () {

        //跳转详情页
        courseListWrapper.on('click', '.course-item', function (e) {
            var that = $(this);
            var number = that.data('number');
            var target = $(e.target);
            if (target.hasClass('course-sec-btn') && !target.hasClass('active')) {
                return false;
            }
            window.open('/teacher/classCourseDetail?number=' + number, '_blank');
        });
    };
});