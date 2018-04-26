/**
 * @file 获取老师历史科目
 * @path /api/tcenter/courses/all-courses/history-subjects
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = [
        {
            "id":88,
            "path_crumbs":"学前>学前艺术>学前艺体"
        },
        {
            "id":945,
            "path_crumbs":"体育>武术>跆拳道"
        },
        {
            "id":977,
            "path_crumbs":"艺术>器乐>钢琴"
        },
        {
            "id":978,
            "path_crumbs":"艺术>器乐>吉他"
        }
    ]


    return data;
};