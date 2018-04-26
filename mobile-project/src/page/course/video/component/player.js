/**
 * @file 视频课播放的公共处理
 * @author  hurry
 * @date 2016/1/15
 */
define(function (require) {
	'use strict';

	var navTab = require('./navTab/navTab');
	var urlUtil = require('util/url_v2');
	var container = $('#container');
	var videoPlayer;

	function selectItem(model, itemEle, isNoSet) {
		var className = itemEle.attr('class');
    	if (className.indexOf('listen-able') > -1) {
    		window.scrollTo(0, 0);
    		$('.class-sections.active').removeClass('active');
    		itemEle.addClass('active');
    		if (!isNoSet) {
    			model.set('sectionID', itemEle.data('section-id'));
    		}
    	}
	}

	function playVideo() {
		videoPlayer[0].play();
		$(videoPlayer).attr('autoplay', 'autoplay');
	}

	function play(courseInfo) {
		// 隐藏封面
        $('#video-image-panel').hide();
        $('#pay-tip').hide();
        $('#video-container').show();
		
        var len = courseInfo.number.length;
        if (len == 11) {
            document.domain = 'genshuixue.com';
            try {
				var playFrame = $('#player-frame')[0];
				//playFrame.contentWindow.postMessage(JSON.stringify({startPlay: true}), '*');
				 videoPlayer = playFrame.contentWindow.document.getElementsByTagName('video');
				if (videoPlayer[0].readyState === 4) {
					playVideo();
				}
				else {
					videoPlayer[0].load();
					videoPlayer[0].oncanplay = playVideo;
				}
            }
            catch (e) {}
        }
        else {
            // 录播
            var iframe = $('#video-container iframe');
            iframe.attr('src', iframe.attr('src') + '#/begin-play');
        }
	}

	function autoPlay(model, courseInfo, sectionId, isFree) {
		if (isFree) {
			play(courseInfo);
		}
		else {
			// hurry: 判断登陆决定是否自动播放
	        window.gsx_ready(function (config) {
	            // 已登录，未登录和登陆框存在跨域的问题
	            if (config.user) {
	                play(courseInfo);
	            }
	            else {
	                model.set('sectionID', sectionId || courseInfo.current_item.section_id);
	            }
	        });
		}
	}

	function changeTab(model, sectionId, isNoSet) {
		navTab.changeTab($('li.nav-tab-item-class-catalogue'));
    	var items = $('.class-catalogue .class-sections');
    	$.each(items, function (i, v) {
    		var item = $(v);
    		if (+item.data('section-id') === +sectionId) {
    			selectItem(model, item, isNoSet);
    			return false;
    		}
    	});
	}

	function playCurrent(model, courseInfo) {
		// var url = courseInfo.video_play_url;
		// var query = urlUtil.parseQuery(url.substr(url.indexOf('?')));
		// 后端定义个current_item，因为后端rd不敢动逻辑，永远取第一节
    	var sectionId = courseInfo.current_item.section_id;
    	changeTab(model, sectionId, true);
    	autoPlay(model, courseInfo, sectionId, true);
    }

	return {
		// 课程详情页免费试听
		tryListen: function (model, courseInfo) {
			$('.course-try-listen').on('click', '.item-listen-play', function () {
		    	var that = $(this);
		    	var sectionId = that.data('section-id');
		    	changeTab(model, sectionId);
		    });
		    $('.try-listen-button').on('click', function () {
		    	playCurrent(model, courseInfo);
		    });
		    // 点击封面，加载iframe并自动播放
	        container.on('click', '#video-image-panel', function () {
		    	playCurrent(model, courseInfo);
		    });
		},
		// 类目中统一处理方法
		catalogue: function (model) {
			var catalogue = $('.class-catalogue');
		    catalogue.on('click', '.class-sections', function () {
		    	selectItem(model, $(this));
		    });
		    catalogue.on('click', '.chapter-toggle', function () {
		    	var that = $(this);
		    	var className = that.attr('class');
		    	var chapterItems = that.closest('.chapters-title').siblings();
		    	if (className.indexOf('icon-angle-down') > -1) {
		    		// 合并
		    		that.removeClass('icon-angle-down');
		    		that.addClass('icon-angle-up');
		    		chapterItems.hide();
		    	}
		    	else {
		    		// 合并
		    		that.removeClass('icon-angle-up');
		    		that.addClass('icon-angle-down');
		    		chapterItems.show();
		    	}
		    });
		},
		// 自动播放
	    autoPlay: function (model, courseInfo) {
	        autoPlay(model, courseInfo);
	    }
	};
});