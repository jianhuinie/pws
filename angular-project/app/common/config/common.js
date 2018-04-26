/**
 * 公共配置文件
 * @author  hurry
 * @date 2016/11/05
 */
define(function() {
	'use strict';
	return {
		/**
         * 日期格式
         */
        DATE_FORMAT: 'yyyy-MM-dd',
        MOMENT_DATE_FORMAT: 'YYYY-MM-DD',
        /**
         * 年-月
         * @type {String}
         */
        YEAR_MONTH_FORMAT: 'yyyy-MM',
        /**
         * 年-月－日 时：分：秒
         * @type {String}
         */
        DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
        /**
         * 时：分：秒
         * @type {String}
         */
        TIME_FORMAT: 'HH:mm:ss',
        /**
         * 有数据的开始月份
         * @const
         * @type {string}
         */
        DATA_BEGIN: '2014-06-16',

		// 默认每页显示多少条
		DEFAULT_PAGE_SZIE: 20,

        /**
         * 默认的当前页
         */
        DEFAULT_CURRENT_PAGE: 1,

        //一天的毫秒数
        ONE_DAY_MILLISECONDS: 24 * 60 * 60 * 1000,

        //文件类型映射classMAP
        FILE_TYPE_CLASS_MAP: {
            'ppt': 'file-ppt',
            'pptx': 'file-ppt',
            'img': 'file-img',
            'jpg': 'file-img',
            'jpeg': 'file-img',
            'png': 'file-img',
            'pdf': 'file-pdf',
            'doc': 'file-word',
            'docx': 'file-word',
            'audio': 'file-audio',
            'mp3': 'file-audio',
            'mp4': 'file-video',
            'avi': 'file-video',
            '3gp': 'file-video',
            'mkv': 'file-video',
            'rmvb': 'file-video',
            'wmv': 'file-video',
            'rm': 'file-video',
            'flv': 'file-video',
            'mov': 'file-video',
            'mpeg': 'file-video',
            'xls': 'file-excel',
            'xlsx': 'file-excel',
            'txt': 'file-txt',
            'zip': 'file-zip',
            'dir': 'file-folder',
            'unknown': 'file-unknown'
        }
	};
});