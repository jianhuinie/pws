define(function (require, exports) {

    'use strict';

    var suffix = [
        'folder',
        'other',
        'txt',
        'zip',
        'rar',
        'doc',
        'docx',
        'ppt',
        'pptx',
        'xls',
        'xlsx',
        'pdf',
        'jpg',
        'png',
        'mp4',
        'avi',
        'flv',
        'mkv',
        'mp3',
        'wav',
        'all'
    ];

    function formatFileType(type) {
        if ($.inArray(type, suffix) != -1) {
            return type;
        }
        else {
            return 'other';
        }
    }

    return formatFileType;
});