/**
 * @file 转为视频课
 * @path /api/cloudPlayBack/copyToCloudVideoCourse
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 991109,
        pageDto: null,
        error: null
    };

    data.data = {
        new_course: true,
        // video_section_id: 4221
        state: 3,
        video_course_number: 343231
    };

    return data;
};