define(function (require) {
	'use strict';

	var appController = require('common/app');
	var getAppUrl = require('common/download/getAppUrl');

	function download() {
        var isWeixin = appController.isWeixin();
        var url = getAppUrl('', 'student');
        $('.download,.app-download').on('click', function() {
            if (isWeixin) {
                location.href = getAppUrl('', 'student');
            } else {
                location.href = 'bjhlstudent://o.c';
                setTimeout(function() {
                    location.href = url;
                }, 1000);
            }
        });
    }
	return {
		init: function () {
			download();
		}
	};
});