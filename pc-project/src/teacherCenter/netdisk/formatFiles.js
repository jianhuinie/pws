define(function (require, exports) {

    'use strict';
    var formatFileSize = require('./formatFileSize');
    var formatFileType = require('./formatFileType');

    /**
     * 格式化用input:file 选中的文件信息
     * @param  {Array} files  文件队列
     * @return {Array} [{
     *             name: 'xxx',
     *             size: 'xxxGB',
     *             type: 'doc'
     *         }]
     */
    function formatFiles(files) {

        return $.map(files, function(item) {
            return {
                name: item.file.name,
                sizeStr: formatFileSize(item.file.size),
                size: item.file.size,
                type: formatFileType(item.file.type)
            }
        });
    }

    return formatFiles;

});