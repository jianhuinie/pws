/**
 * 国家选择同一控件
 * @author hurry
 * @date 16/10/10
 */
define(function (require, exports) {
    'use strict';
    var artTemplate = require('artTemplate');
    var selectRender = artTemplate.compile(require('text!./index.tpl'));
    var MVCObject = require('common/mvc/MVCObject');
    var initCountrySelectControl = require('./initCountrySelectControl');

    return {
    	/**
    	 * 初始化方法
    	 * @param  {DOM} 容器
    	 */
        init: function (container) {
	           $.ajax({
	                url: '/index/get_all_intl_code',
	                data: {},
	                method: 'post',
	                dataType: 'json'
	            })
	            .done(function (res) {
	            	var html = selectRender({
	                    data: res.data.default
	                });
	                $(container).append(html);
        	        var mvcObj = new MVCObject();
        	        initCountrySelectControl($(container).find('.country_select_control'), mvcObj);
                });
        }
    };
});
