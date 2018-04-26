/**
 * 配置文件
 * @author  niejianhui
 */
define(function() {
    'use strict';
    return {
        //文件类型映射数组MAP
        FILE_TYPE_ARRAY_MAP: {
            'video': ['mp4', 'mkv', 'avi', 'rmvb', 'flv'],
            'audio': ['mp3']
        },
        //文件类型话术MAP
        FILE_TYPE_TEXT_MAP: {
            'video': '视频',
            'audio': '音频'
        }
    };
});