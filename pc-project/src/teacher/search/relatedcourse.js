
define(function (require, exports) {

    'use strict';
    var store = require('common/store');

    var relatedcourse = $('#relatedcourse');
    

    exports.init = function () {
        var type;
        var queryIndex = 'q';
        var courselevelIndex = 'course_level';
        var chref = location.href;
        if ((chref.indexOf('/sc/') > -1) || (chref.indexOf('/sc-') > -1)){
            type = "course_search";
            // niejianhui: 课程搜索重构后 query 和课程level字段名不一样
            queryIndex = 'query';
            courselevelIndex = 'sub_id';
        }
        else if ((chref.indexOf('/st/') > -1) || (chref.indexOf('/st-') > -1)){
            type = "teacher_search";
        }
        else {
            type = "org_search";
        }
        var condition = store.get('condition');
        
        relatedcourse
        .on('click', '.course-item', function (e) {
            var target = $(e.currentTarget);
            var params = {
                type: type,
                stype: 'right_recommend_course',
                user_number: store.get('user').number,
                course_number: target.data('number'),
                query: condition[queryIndex] || '',
                course_level1: condition[courselevelIndex + '1'] || '',
                course_level2: condition[courselevelIndex + '2'] || '',
                course_level3: condition[courselevelIndex + '3'] || '',
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        });
    };
    
});