/**
 * @file 发布视频课程 接口
 * @path /api/tcenter/courses/video-courses/save
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        mutation_save_one_on_one_course : {
            number: 17040554138410
        }
        
    };

    return data;
};
