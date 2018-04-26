/**
 * @author hurry
 * @date 2016/07/28
 */

define(function(require) {
    'use strict';
    var openApp = require('common/app_wakeup');

    // target=bjhlstudent://o.c/?a=video_course&number=15090779616&index=0
    // encode:
    // 		target=bjhlstudent%3A%2F%2Fo.c%3Fa%3Dvideo_course%26number%3D1111%26index%3D0

    return function(page_data) {
        openApp({
        	type: 'internal',
        	url: decodeURIComponent(page_data.target)
        }, function (isSuc) {
            if (!isSuc) {
                var type = page_data.type || 'student';
                location.href =  (page_data.openError && decodeURIComponent(page_data.openError))
                    || 'https://m.genshuixue.com/app/?target=' + type;
            }
        });
    };
});