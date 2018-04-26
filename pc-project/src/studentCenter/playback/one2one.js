/**
 * @file 学生中心 我的课程回放 － 一对一
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var etpl = require('cobble/util/etpl');

    var container = $('#onevone');
    var courseMap = {}; // 缓存课程目录

    /*
     * 课程目录模板
     */
    var courseDirectoryRender = etpl.compile(
        '<div class="directory-header">课程目录</div>'

        + '<ul class="directory-list">'
            + '<!-- for: ${data} as ${item}, ${index} -->'
                + '<li class="course-item">'

                    + '<a class="course-play" href="${item.play_url}" target="_blank">'
                        + '<i class="icon icon-caret-right"></i>播放'
                    + '</a>'

                    + '<span class="course-no">'
                        + '${item.index}'
                    + '</span>'

                    + '<span class="course-title">'
                        + '${item.title}'
                        + '（${item.time}）'
                    + '</span>'

                    + '<span class="expire-time">'
                        + '有效期至'
                        + '${item.expire_time}'
                    + '</span>'

                + '</li>'
            + '<!-- /for -->'
        + '</ul>'

        + '<div class="directory-footer">'
            + '<!-- if: ${limit} && ${index} > 4 -->'
                + '<span class="down">'
                    + '展开更多&nbsp;<i class="icon icon-angle-down"></i>'
                + '</span>'
            + '<!-- else -->'
                + '<span class="up">'
                    + '收起课程目录&nbsp;<i class="icon icon-angle-up"></i>'
                + '</span>'
            + '<!-- /if -->'
        + '</div>'
    );

    /*
     * 查看课程目录
     */
    var toAllRender = etpl.compile(
        '<div class="to-all">'
            + '查看课程目录&nbsp;<i class="icon icon-angle-down"></i>'
        + '</div>'
    );

    /*
     * ajax获取课程目录
     *
     * @param {object} courseItem 获取当前课程的目录
     * @param {number} limit 获取条数
     */
    function getCourseDirectory (courseItem, limit) {
        var courseNum = courseItem.data('number');

        if (courseMap[courseNum]) {
            courseItem
            .find('.course-directory')
            .html(courseDirectoryRender(courseMap[courseNum]));
        }
        else {
            service
            .lessonsPlaybackAjax({
                courseNum: courseNum,
                courseType: courseItem.data('type'),
                limit: limit
            })
            .done(function (response) {
                if (response.code === 0) {

                    response.limit = limit;

                    courseItem
                    .find('.course-directory')
                    .html(courseDirectoryRender(response));

                    // 缓存完整的课程目录
                    if (!limit) {
                        courseMap[courseNum] = response;
                    }

                }
            });
        }
    }

    exports.init = function () {

        // 获取第一门课程的前5条课程
        if (container.find('.first-item').length) {
            getCourseDirectory(container.find('.first-item'), 5);
        }

        container
        .on('click', '.to-all, .directory-footer .down', function () { // 查看课程目录，展开更多课程
            var courseItem = $(this).closest('.course-item');

            getCourseDirectory(courseItem);
        })

        .on('click', '.directory-footer .up', function () { // 收起课程目录
            var courseDirectory = $(this).closest('.course-directory');

            courseDirectory.html(toAllRender());
        });
    };

});