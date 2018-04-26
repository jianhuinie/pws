/**
 * @file 跟谁学大学顶部查询控件
 * @author hurry
 * @date 2016/10/11
 */
define(function (require) {
    'use strict';
    // 外部引入
    var template = require('artTemplate');
    var service = require('common/service');
    var ui = require('common/ui');
    var openAppWindow = require('common/openAppWindow');
    var rightNav = require('../rightNav/index');
    var app = require('common/app');

    // 变量
    var btnCancel;
    var downPanel;
    var inputSearch;
    var rightMenu;
    var formNode;

    var logoIcon;
    var forbid = 1;

    var storage = {
    	set: function (val) {
    		var items = this.get();
    		if (items.indexOf(val) === -1) {
    			items.unshift(val);
    		}
    		var len = items.length;
    		// 搜索关键字控制在5个
    		if (len > 5) {
    			items.splice(5, len - 1);
    		}
    		localStorage.setItem('gsx_college_search', items.join());
    	},
    	get: function () {
    		var history_search = localStorage.getItem('gsx_college_search');
    		var items = [];
    		if (history_search) {
    			items = history_search.split(',');
    		}
    		return items;
    	}
    };

    function initDOM(container) {
    	downPanel = $('.search-wrapper>.down');
		btnCancel = $('.search-wrapper .search .btn-cancel');
    	inputSearch = $('.search-wrapper .search .input-search');
    	rightMenu = $('.search-wrapper .search .icon-menu');
    	if (container) {
    		$(container).append(require('text!./index.tpl'));
    	}
    }

    function renderSuggestion() {
    	var items = storage.get();
    	var len = items.length;
    	// if (len < 5) {
		service.post(
			'/tcenter/gsx_college/recommendSearchKeys',
			null,
			function (res) {
				var recWords = res.data;
				items = items.concat(recWords.slice(0, 5));
				render();
			}
		);
    	// }
    	// else {
    	// 	render();
    	// }

    	function render() {
    		var suggRender = template.compile(require('text!./suggestion.tpl'));
	    	var html = suggRender({
	            items: items
	        });
	        downPanel.empty().append(html).addClass('on');
	        $('.search-suggestion').on('click', '.item', function (e) {
	    		var target = $(e.currentTarget);
	    		var val = target.data('val');
	    		inputSearch.val(val);
	    		downPanel.empty().removeClass('on');
	    		formNode.submit();
	    		e.stopPropagation();
	    	});
    	}
    }

    function renderResult() {
    	var searchKey = $.trim($('.search-wrapper .input-search').val());
    	if (!searchKey) {
    		ui.alert('请输入关键词！');
    		return;
    	} else if(searchKey.length > 20) {
            ui.alert('关键词太长了！');
            return;
        }
    	storage.set(searchKey);
    	service.post(
			'/tcenter/gsx_college/search',
			{
				search_key: searchKey
			},
			function (res) {
				template.config('escape', false);

				var result = res.data || [];
				result.map(function (val) {
					val.title = val.title.replace(new RegExp(searchKey, 'g'), '<span class="search-key">' + searchKey + '</span>');
				});
                var tplRender;
                var html;
                if (result.length) {
                    tplRender = template.compile(require('text!./result.tpl'));
                    html = tplRender({
                        data: {
                            items: result,
                            key: searchKey
                        }
                    });
                }
                else {
                    tplRender = template.compile(require('text!./empty.tpl'));
                    html = tplRender({
                        data: {
                            searchKey: searchKey
                        }
                    });
                }

		        downPanel.empty().append(html).addClass('on');
		        $('.search-result').on('click', '.item', function (e) {
		        	e.stopPropagation();
		        });
		        template.config('escape', true);
			}
		);
    }

    /**
     * 搜索
     * @param  {number} type 类型：1-搜索；0-取消
     */
    function changeSearch(type) {
    	var collegeIcon = $('.search-wrapper .search .college-icon');

    	if (type) {
            forbid = 0;
    		// 搜索
            rightMenu.addClass('display-none');
            collegeIcon.addClass('display-none');
            btnCancel.removeClass('display-none');
        }
        else {
            forbid = 1;
            rightMenu.removeClass('display-none');
            collegeIcon.removeClass('display-none');
            btnCancel.addClass('display-none');
        }
        document.addEventListener('touchmove', function (e) {
            if (forbid == 0) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
    }

    function initEvent() {
    	formNode = $('.search-form');
        logoIcon = $('.college-icon');
    	inputSearch.on('focus', function () {
    		changeSearch(1);
    		renderSuggestion();
    	});
    	formNode.on('submit', function (e) {
    		renderResult();
    		e.preventDefault();
    		return false;
    	});
    	btnCancel.on('click', function (e) {
    		changeSearch(0);
    		downPanel.empty().removeClass('on');
            e.stopPropagation();
    	});
    	rightMenu.on('click', function (e) {
            rightNav.init();
    		e.stopPropagation();
    	});
        logoIcon.on('click', function () {
            if (location.pathname != '/tcenter/gsx_college/index') {
                if (app.isApp()) {
                    app.openNewWindow(location.origin + '/tcenter/gsx_college/index');
                } else {
                    location.href = '/tcenter/gsx_college/index';
                }
            } else {
                location.reload();
            }
        });
    }

    return {
    	init: function (container) {
    		initDOM(container);
    		initEvent();
    		openAppWindow.init();
    	}
    };
});