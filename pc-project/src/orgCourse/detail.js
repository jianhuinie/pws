define(function (require,exports) {
    'use strict';

    var address = require('./common/address');
    var courseInfo = require('./detail/courseInfo');
    var allCourses = require('./detail/allCourses');
    var teachOutline = require('./common/teachOutline');
    var ceiling = require('./common/ceiling');
    var comment = require('./detail/comment');
    var courseData = require('./common/courseData');
    var courseDetail = require('./common/courseDetail');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');

    var container = $("#container");

    /*/上报
    function report() {
        var params = {
            teacher_number: store.get('teacherNum'),
            user_id: store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type: '1',
            comment_tag: store.get('commentTag_name') || "",
            comment_tag_num: store.get('commentTag_count') || "",
            dsp: '1',
            city_id: cookie.get('CITY_ID'),
            source: '3',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }
    */

    //页面滚动时
    function HoverTreeScroll() {
        var Obj = container.find('#course-comment');
        if (Obj.length != 1) {
            return false;
        }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    // // report();
                    //alert(1);
                    h_one = false;
                }

            }
        });
    }


    exports.init = function (){
        // 滚动上报
        HoverTreeScroll();
        address.init();
        courseInfo.init();
        allCourses.init();
        teachOutline.init();
        ceiling.init();
        comment.init();
        courseData.init();
        courseDetail.init();

        // h5链接跳转到PC定位
        if (location.hash === '#course-material') {
            var courseMaterialTop = container.find('#course-material').offset().top;
            window.scrollTo(0,courseMaterialTop - 68);
        }

        container
        .on('click', '[data-page]', function (e) { // 分页上报
            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            // report();
            //getCommentList();
            return false;
        })
        .on('click', '.nav-item', function (e) { // 点击类型上报
            var target = $(e.currentTarget);
            store.set('commentTag', target.data('value'));
            store.set('commentTag_name', target.data('name'));
            store.set('commentTag_count', target.data('num'));
            store.set('page', 1);
            // report();
            //getCommentList();
            return false;
        })
        .on('click', '.tabNav li', function (e) {
            $('.tabNav li').removeClass('selected');
            $(this).addClass('selected');
            var target = $(e.currentTarget);
            var element = $(target.data('link'));
            var top = element.offset().top;
            window.scrollTo(0,top - 68);
        });
    }
});



