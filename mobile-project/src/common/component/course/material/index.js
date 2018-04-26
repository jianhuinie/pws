define(function (require) {
	'use strict';

	var appController = require('common/app');

	return {
		/**
	     * 初始化资料下载模块
	     */
	    init: function (container) {
	    	var isApp = appController.isApp();
	    	var isTeacherApp = appController.isTeacherApp();
	        var dataList = container.find('.data-list');
	        var isStudentApp = appController.isStudentApp();

	        var addAnchor = function() {
	            var url = location.href;
	            if (url.indexOf('#course-material') < 0) {
	                location.href = url + '#course-material';
	            }
	        };
	        if (dataList.length > 0) {
	            if (isApp && isStudentApp) {
	                var currentVersionNumber = appController.version2Number(appController.getAppVersion());
	                var supportVersionNumber = appController.version2Number('3.3.4');
	                if (currentVersionNumber >= supportVersionNumber) {
	                    dataList.show();
	                    // addAnchor();
	                }
	            } else if (isApp && isTeacherApp) {
	                dataList.show();
	                // addAnchor();
	            } else if (!isApp) {
	                dataList.show();
	                // addAnchor();
	            }
	        }
	        // 点击进入资料列表
	        $('.data-list').click(function(e) {
	            e.preventDefault();
	            var appUrl = $(this).data('url');
	            var url = $(this).data('href');
	            if (isStudentApp) {
	                appController.urlSchemeRoute({
	                    url: appUrl
	                });
	                return;
	            } else if (isTeacherApp) {
	                appController.openNewWindow(url);
	            } else {
	                location.href = url;
	            }
	        });
	    }
	};
});