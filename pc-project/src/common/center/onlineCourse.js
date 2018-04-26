/**
 * @file  进入在线教室后
 * @author zhangliyuan
 */
define(function (require, exports) {

    'use strict';

    var JSON = require('cobble/util/json');

    var store = require('common/store');
    var service = require('common/service');

    var Tab = require('cobble/ui/Tab');

    var moment = require('moment');
    var Tooltip = require('cobble/ui/Tooltip');

    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');

    var switchMenu = function (index) {
        var container = $('.contacts-list-con');
        container.find('.contacts-item.selected').removeClass('selected');
        container.find('.contacts-item:nth-child('+index+')').addClass('selected');
    }


    exports.init = function () {

        var container = $('.timeline');

        var user = store.get('user');



        container.on('click', '.enter-online-room', function (e) {

            user = store.get('user');

            if (user.type === 2) {
                container.find('.course-list-con').hide();
                exports.getLastContacts(user);
                exports.getTeacherContacts(user);

                var tab = new Tab({
                    trigger: 'click',
                    navActiveClass: 'active',
                    navSelector: '.tab-item',
                    contentSelector: '.contacts-item',
                    element: container.find('.contacts-list-con'),
                    index: 0
                });

                tab.onChange = function (e) {
                    switchMenu(e.cobble.index);
                };

                container.find('.contacts-list-con').show('slow');
            }
            else if (user.type === 0) {
                var responseData = '';
                // 获取在线教室客户端参数
                service.
                getLiveParams({
                    type: 'teacher',
                    number: user.number
                }).done(function (response) {
                    if(response.code === 0) {
                        responseData = response.data;
                            // 弹出打开客户端弹窗
                            new EnterClassroomDialog({
                                data: responseData,
                                classType: 'test',
                                type: ''
                            });
                    }
                });
            }
        })
        .on('click', '.back', function (e) {
            container.find('.contacts-list-con').hide();
            container.find('.course-list-con').show('slow');
        })
        .on('click', '.enter-class.course-enter', function (e) {

            var target = $(this);
            var data = target.data();

                new EnterClassroomDialog({
                    data: data.online,
                    classType: 'lesson',
                    type: ''
                });
        })
        .on('click', '.enter-class.try-enter', function (e) {
            var usernumber = $(e.target).data('usernumber');
            var responseData = '';
            // 获取在线教室客户端参数
            service.
            getLiveParams({
                type: 'teacher',
                number: usernumber
            }).done(function (response) {
                if(response.code === 0) {
                    responseData = response.data;
                        // 弹出打开客户端弹窗
                        new EnterClassroomDialog({
                            data: responseData,
                            classType: 'test',
                            type: ''
                        });
                }
            });
        })
        ;
    };

    exports.getOnlineCourse = function (user) {

        var container = $('.timeline');
        var quickSearch;
        if (user.type == 0) {
            quickSearch = service.onlineTeacherCourse;
        }
        else {
            quickSearch = service.onlineStudentCourse;
        }
        quickSearch({
            username: $.trim(user.name)
        })
        .done(function (response) {
            if (response.code === 0) {
                var responseData = response.data;
                var allCourses = responseData.course_list;
                container.find('.course-list-inner').html(exports.makeCourse(allCourses));
            }
            else {

            }
        });
    }

    exports.getLastContacts = function (user) {

        var container = $('.timeline');
        service
        .getLastContacts({
            imUsername: store.get('imUsername')
        })
        .done(function (response) {
            if (response.code === 0) {
                var lastContacts = response.data;
                container.find('.last-contacts .course-list-inner').html(exports.makeContacts(lastContacts,'last-contacts'));
                Tooltip.init(container.find('.course-text [data-title]'));
                Tooltip.init(container.find('.course-text [data-width]'));
            }
            else {

            }
        });
    }

    exports.getTeacherContacts = function (user) {

        var container = $('.timeline');
        var targetType = user.type ? 0 : 2;

        service
        .getMyContacts({
            imUsername: store.get('imUsername'),
            target_type: targetType
        })
        .done(function (response) {
            if (response.code === 0) {
                var teacherContacts = response.data;
                container.find('.my-teacher .course-list-inner').html(exports.makeContacts(teacherContacts,'my-teacher'));
                var tooltipOption = {
                    placement: 'left'
                };
                Tooltip.init(container.find('.course-text [data-title]'));
                Tooltip.init(container.find('.course-text [data-width]'));
            }
            else {

            }
        });
    }

    exports.makeCourse = function (data) {
        var courseList = '';
        var user = store.get('user');

        var container = $('.timeline');

        if (data.length == 0) {
            container.find('.course-list-con .course-list-inner').addClass('no-course');
            courseList += '<div class="no-course-info">'
                        + '<p>没有课程怎么行？</p>'
                        + '<p>约好的在线课程会出现在这里</p>';
            if (user.type == 2) {
                courseList += '<a target="_blank" class="btn-primary" href="http://www.genshuixue.com/" >立即发现好老师</a>';
            }
            courseList += '</div>';
            return courseList;
        }

        $.each(data, function (index, dataItem) {

            var item = dataItem.lessons[0];
            courseList += '<div class="course-item">'
                        +   '<div class="course-date">'
                        +       '<p class="date-text">';

            var startMoment = moment(item.lesson.start_time);
            var endMoment = moment(item.lesson.end_time);
            var currentMoment = moment();

            var yesterdayMoment = moment().subtract('days', 1);
            var tomorrowMoment = moment().add('days', 1);

            var startDate = startMoment.format('YYYY-MM-DD');

            var today = currentMoment.format('YYYY-MM-DD');

            var yesterday = yesterdayMoment.format('YYYY-MM-DD');

            var tomorrow = tomorrowMoment.format('YYYY-MM-DD');

            if (today === startDate) {
                courseList += '今天';
            }
            else if (yesterday === startDate) {
                courseList += '昨天';
            }
            else if (tomorrow === startDate) {
                courseList += '明天';
            }
            else {
                courseList += startDate;
            }

            courseList +=     '</p>'
                        +     '<i class="icon icon-circle"></i>'
                        + '</div>'
                        + '<div class="course-info">';

            //时间判断
            var enter_class = item.operation.actions.enter_classroom;
            if (enter_class != undefined && enter_class.disabled == 1) {
                if (currentMoment - endMoment > 10800) {
                    courseList += '<a class="btn-default no-enter-class" data-title="下课超过3小时无法进入课堂">进入教室</a>';
                }
                else {
                    courseList += '<a class="btn-default no-enter-class" data-title="未到上课时间哦">进入教室</a>';
                }
            }
            else {
                courseList += '<a class="btn-primary enter-class course-enter" '
                            + 'data-class-type="'
                            +     item.purchase.course_type
                            + '" '
                            + 'data-class-id="'
                            +     item.lesson.serial_number
                            + '" '
                            + "data-online='"
                            +     JSON.stringify(item.lesson.online_data)
                            + "'>进入教室</a>";


            }
            var course_type = item.purchase.course_type;

            if (course_type == 2) {
                courseList +=   '<a class="thumbnail circle" target="_blank" href="/teacher/classCourseDetail?number='+item.lesson.class_course_number+'">'
                            +   '<img src="'+item.lesson.poster+'">';
            }
            else if (user.type == 2) {
                courseList +=   '<a class="thumbnail circle" target="_blank" href="/'+item.user.private_domain+'">'
                            +   '<img src="'+item.user.avatar+'">';
            }
            else {
                courseList +=   '<a class="thumbnail circle no-hover">'
                            +   '<img src="'+item.user.avatar+'">';
            }


            courseList +=    '</a>'
                         +   '<div class="course-text" data-c-time="data[i].lesson.start_time">'
                         +       '<p>' + startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm') + '</p>'
                         +       '<p>';


            if (user.type == 2) {
                if (course_type == 2) {
                    courseList += '班课：<em>'+item.purchase.course_name+'</em>';
                }
                else {
                    courseList += '一对一：跟<em>'+item.purchase.teacher_user_name+'</em>学'+'<em>'+item.purchase.course_name+'</em>';
                }
            }
            else if (course_type != 2) {
                courseList +=       '一对一：教<em>'+item.purchase.real_student+'</em>学'+'<em>'+item.purchase.course_name+'</em>';
            }
            else {
                courseList +=       item.purchase.course_name;
            }
            courseList +=       '</p>';
            courseList +=       '<p class="course-no" data-course-no="'+item.lesson.serial_number+'">';
            if (course_type != 2) {
                courseList += '约课编号：'+item.lesson.serial_number;
            }
            else {
                // courseList += '<a class="class-course">班课</a>';
                courseList += '班课编号：'+item.lesson.class_course_number;

            }
            courseList +=       '</p>'
                         +   '</div>'
                         +   '</div>'
                         + '</div>';
        });

        return courseList;
    }

    exports.makeContacts = function (data, option) {
        var contacts = "";
        var container = $('.timeline');
        if (data.length == 0) {
            container.find('.'+option+' .course-list-inner').addClass('no-course');
            contacts += '<div class="no-course-info">'
                      + '<p>没有老师怎么行？</p>';
            if (option == 'last-contacts') {
                contacts +=  '<p>最近聊天过的老师会出现在这里哦～</p>';
            }
            else if (option == 'my-teacher'){
                contacts +=  '<p>购买过课程的老师会出现在这里哦～</p>';
            }

            contacts += '<a target="_blank" class="btn-primary" href="/s/city/'+store.get('cityId')+'/search.html" >立即发现好老师</a>'
                      + '</div>';
            return contacts;
        }

        for (var i = 0;i < data.length; i++) {
            var item = data[i];
            if (item.user_role == 0) {
                contacts += '<div class="course-item">';
                contacts +=     '<div class="course-info">';
                contacts +=         '<a class="btn-primary enter-class try-enter " data-usernumber="'+item.user_number+'">进入教室</a>';
                contacts +=         '<a target="_blank" class="thumbnail circle" href="/t/'+item.user_number+'">';
                contacts +=             '<img src="'+item.avatar+'">';
                contacts +=         '</a>';
                contacts +=         '<div class="course-text">';
                contacts +=             '<p><i class="icon icon-user-o"></i>'+item.user_name+'</p>';


            if (item.subject) {

                contacts +=             '<p class="subject-content" data-width=240 data-left=100 data-title="';
                var subject = '<i class="icon icon-book-o"></i>';

                for (var j = 0; j < item.subject.length; j++) {
                    if(j == 0) {
                        contacts += item.subject[j];
                        subject += ''+item.subject[j];
                    }
                    else {
                        contacts += ' · ' + item.subject[j];
                        subject += ' · '+''+item.subject[j];
                    }
                }
                contacts += '">';
                subject += '</p>';

                contacts += subject;
            }


                contacts +=         '</div>';
                contacts +=     '</div>';
                contacts += '</div>';
            }
        }
        return contacts;
    }
});