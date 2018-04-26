/**
 * @file 缓存
 * @author hurry
 */
 define(function (require) {
 	'use strict';
 	require('./module')
 		.factory('tipsService', ['$timeout', '$q', function ($timeout, $q) {
 			return {
 				/**
 				 * [show description]
 				 * @param  {Object|string} options [description]
 				 * @param  {string} options.content 显示内容，支持html
 				 * @param  {string} options.positon 提示条位置  center top  默认center
 				 * @param  {string} options.type tip类型  用来控制提示条的背景色 默认 primary
 				 * 支持 success  danger primary error info warning muted secondary 等
 				 * @param  {number} options.showTime 显示时间，单位：ms，默认显示1000ms
 				 * @param  {cssSelector|jQuery=} options.element
 				 *         要显示的元素，可以是:
 				 *         1、css选择器
 				 *         2、jquery对象
 				 */
				show: function (options) {
					var deferred = $q.defer();
					var defaultOptions = {
						showTime: 1000
					};
					if (options + '' === options) {
						defaultOptions.content = options;
					}
					else {
						$.extend(defaultOptions, options);
					}
					var ele = $('.tips-wrapper');
					if (!ele.length) {
						ele = $('<div class="tips-wrapper" style="display:none;"></div>');
						$(document.body).append(ele);
					}
					if (defaultOptions.element) {
						var container = $(defaultOptions.element);
						var offset = container.offset();
						var containerWidth = container.width();
						ele.css({
							top: offset.top,
							left: offset.left,
							width: containerWidth,
							marginLeft: 0
						});
					}
					var typeClass = defaultOptions.type || 'primary';
					ele.addClass(typeClass);
					var positionClass = defaultOptions.position
										? 'position-' + defaultOptions.position
										: 'position-center';
					ele.addClass(positionClass);
					ele.html(defaultOptions.content);
					ele.slideDown();
					$timeout(function () {
						ele.slideUp('slow', function () {
							deferred.resolve();
						});
					}, defaultOptions.showTime);

					return deferred.promise;
				},
				// TODO: 
				dispose: function () {

				}
			};
 		}]);
 });
