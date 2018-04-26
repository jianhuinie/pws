/*{{*
@file 学生回访
@author hanzhaohang
@date 2016-05-11
*}}*/

define(function(require) {
	'use strict';
	var $ = require("zepto");
	var lazyLoadImage = require('common/lazyLoadImage');
	var isLocked = false;
	var ui = require("common/ui");

	return function(page_data) {
		lazyLoadImage.init();
		$('.call-btn').on('click', function() {
			if (isLocked) {
				return;
			}
			var feedback_status = $(this).attr('data-status');
			var me = $(this);
			var momerryText = me.html();
			me.html('提交中..');
			isLocked = true;
			$.ajax({
				url: '/opportunity/student_feedback_post',
				type: 'post',
				data: {
					feedback_status: feedback_status,
					dispatch_id: page_data.dispatch_id
				},
				success: function(res){
					if (res.code) {
						ui.remind(res.msg);
						me.html(momerryText);
					} else {
						location.reload();
					}
				}
			}).always(function(){
				isLocked = false;
			});

		})
	}
});