define(function(require, exports) {
    'use strict';
    var container = $('#main');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var store = require('common/store');
    var timeSpan = require('common/function/timeSpan');
    var Popup = require('cobble/helper/Popup');

    function updateTime(element, time) {

        var timeObj = timeSpan(time);

        element.text(''
            + timeObj.days + '天'
            + timeObj.hours + '小时'
            + timeObj.minutes + '分'
            + timeObj.seconds + '秒');
    }

    function tryToRankPage() {
        if (store.get('user').type === 2) {
            //如果是学生身份，判断是否有老师身份
            service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasTeacherRole = getHasTeacherRole(roles);
                    var text = '';
                    if (hasTeacherRole) {
                        alert('你目前是学生身份，需要切换到老师身份才能查看哦');
                        return;
                    }
                    location.href = '/teacher_center/teacherRank';
                }
            });
        } else {
            location.href = '/teacher_center/teacherRank';
        }
    }
    /**
     * 判断是否有资格上榜
    */
    // function teacherRank7Check () {
    //     service
    //     .teacherRank7Check()
    //     .done(function (response) {
    //         if (response.code == 0) {

    //         }
    //     });
    // }
    /**
     * 获取是否有老师身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    // function getHasTeacherRole(roles) {
    //     var studentRoleCode = "0";
    //     var length = roles.length;
    //     var hasTeacherRole = false;

    //     if (length > 0) {
    //         for(var i = 0; i < length; i++) {
    //            if (roles[i] === studentRoleCode) {
    //                 hasTeacherRole = true;
    //                 break;
    //             }
    //         }
    //     }

    //     return hasTeacherRole;
    // }

    exports.init = function () {


        var topMap = [];

        var navs = store.get('navs');
        $.each(navs, function (index, data) {
            topMap.push({
                id: data.id,
                top: container.find('#' + data.id ).offset().top
            });

        });

        var baseTop = topMap[0].top;

        var side = container.find('.side-nav');


        side
        .on('click', 'li', function () {
            var element = $(this);
            var id = element.data('nav-id');
            var top;
            $.each(topMap, function(index, object) {

                if (object.id == id) {
                    top = object.top;
                    return false;
                }
            });
            if (top !== undefined) {
                side.find('.active').removeClass('active');
                element.addClass('active');

                //side.css('top', top - baseTop);
                $(window).unbind('scroll', scrollHanlder);

                $('html,body').animate(
                    {
                        scrollTop: top
                    },
                    200,
                    'easeOutCirc',
                    function () {

                        $(window).on('scroll', scrollHanlder);
                    }
                );
            }
            if (id == 'toRankPage') {

                if (!store.get('user').number) {
                    new LoginDialog({
                        onSuccess: function () {
                            tryToRankPage();
                        }
                    });
                    return;
                }
                tryToRankPage();

            }

        });

        var scrollHanlder = function() {

            var top = pageScrollTop();
            var cur;

            $.each(topMap, function(index, object) {

                if ((index == topMap.length - 1 || top <= topMap[index + 1].top - 200)
                    && (top >= object.top - 200)) {

                    cur = object.id;

                    side.find('.active').removeClass('active');
                    side.find('[data-nav-id='+ object.id +']').addClass('active');

                    return false;
                    //side.css('top', value - baseTop);

                }
            });

            if (!cur) {
                side.hide();
            }
            else {
                side.show();
            }
        };

        side
        .on('click', '.back-to-top', function() {

            $('html,body').animate(
                {
                    scrollTop: 0
                },
                1000,
                'easeOutCirc'
            );
        });

        $(window).on('scroll', scrollHanlder);

        var curTime = store.get('currentTime');
        var expTime = store.get('expiredTime');


        var countDownTime = (expTime - curTime) / 1000;

        if ($.isNumeric(countDownTime)) {

            var countDown = container.find('.count-down span');

            var updateCountDown = function () {

                countDownTime-= 1;

                if (countDownTime > 0) {


                    updateTime(countDown, countDownTime);
                    setTimeout(updateCountDown, 1000);
                }
                else {
                    countDown.text('活动已结束');
                }

            }

            updateTime(countDown, countDownTime);
            setTimeout(updateCountDown, 1000);
        }

        //分享
        if (store.get('needsShare')) {
            new Popup({
                element: $('.share div'),
                layer: container.find('.baidu-share'),
                show: {
                    trigger: 'over'
                },
                hide: {
                    trigger: 'out',
                    delay: 100
                }
            });
        }

    }
});