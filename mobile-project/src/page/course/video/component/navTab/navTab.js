/**
 * @file 视频课播放的公共处理
 * @author  hurry
 * @date 2016/1/15
 */
define(function (require) {
	'use strict';

	var Loading = require('common/ui/Loading/index');
    var lazyLoadImage = require('common/lazyLoadImage');

	var params;
    var scriptData;
	var container = $('#container');

	// 获取评价页面url
    function getCommentPageUrl() {
        return ''
            + scriptData.origin
            + '/comment/getCourseComments'
            + '?'
            + 'course_number=' + scriptData.course_info.number + '&'
            + 'comment_type=3&'
            + 'source=classCourse';
    }

    // 切换tab回调
	function changeTab(ele) {
		ele.addClass('active');
        ele.siblings('li').removeClass('active');
        var id = ele.data('id');
        var tabContainer = container.find('#tabs-container').find('.tabs.' + id);
        tabContainer.show();
        tabContainer.siblings().hide();

        if (id === 'class-comment') {
            // 课程评价页
            var url = getCommentPageUrl();
            var iframe = tabContainer.find('iframe');
            if (!iframe.attr('src')) {
                var loading = new Loading({
                    elem: '.class-comment',
                    isHideMask: true
                });
                loading.show();
                iframe
                    .attr('src', url)
                    .on('load', function () {
                        loading.destroy();
                        $(this).css({
                            height: $(this.contentWindow.document).height()
                        });
                    });
            }
            params.comment.send({
                teacher_number: scriptData.teacher_info.number || ''
            });
        }
	}

	return {
		/**
		 * 二次导航初始化，包括事件绑定
		 * @param  {Object} options 参数
         * @param  {Object} options.comment 评价上报
		 * @param  {Object} options.scriptData 评价上报
		 */
	    init: function (options) {
	    	params = options;
            scriptData = params.scriptData;
	        var tabContainer = container.find('#tabs-button-container');
	        tabContainer
	            .on('click', 'li', function() {
	                changeTab($(this));
	            });
	    },
	    // 切换tab统一处理方法
		changeTab: function (ele) {
	        changeTab(ele);
            lazyLoadImage.init();
	    }
	};
});