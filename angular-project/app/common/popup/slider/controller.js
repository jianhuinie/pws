/**
 * @file slider
 * @author hanrui
 * @date 2015/10/08
 */
define(function(require) {
	'use strict';
	var config = require('common/config');
	var util = require('common/util');

	SliderController.$inject = [
		'$scope', '$modalInstance', 'items',
		'$rootScope', '$timeout'
	];

	function SliderController($scope, $modalInstance, items, $rootScope, $timeout) {
		var vm = $scope;

		init();

		function init() {
			// 属性
			vm.picIndex = (items.showIndex || 0) + 1;
			vm.urls = items.picUrls;
			// 1-乐视视频截图，2-身份认证
			vm.picType = items.picType;
			vm.isFirstLoad = true;
			// 方法
			vm.left = left;
			vm.right = right;
			vm.closeHandler = closeHandler;
			vm.showPicByIndex = showPicByIndex;

			$timeout(function() {
				$('.pic-all').css({
					width: config.PICTURE_SLIDER_WIDTH_HEIGHT * (items.picUrls.length + 2)
				});
			}, 300);

			generateUrl();
			pictureZoom();
			$timeout(function() {
				showPicByIndex(vm.picIndex);
			});
		}

		function initTitle() {
			vm.safeApply(function () {
				vm.title = vm.picUrls[vm.picIndex - 1].title || '图片查看';
			});
		}

		/**
		 * 图片放大镜
		 */
		function pictureZoom() {
			require(['jqRotateZoom'], function() {
				$('.jqzoom').jqrotatezoom({
					zoomWidth: 180,
					zoomHeight: 100,
					parentNodeHeight: 500,
					parentNodeWidth: 500,
					rotatePosition: 0
				});
			});
		}

		function closeHandler() {
			$modalInstance.dismiss();
		}

		function generateUrl() {
			vm.picUrls = vm.urls.map(function(pic) {
				var result = {};
				var url = '';
				if ($.isPlainObject(pic)) {
					url = pic.url;
					result.title = pic.title;
				} else {
					url = pic;
				}
				result.url = url;
				result.bigUrl = getBigUrl(url);
				result.smallUrl = getSmallUrl(url);
				return result;
			});
		}

		function getBigUrl(url) {
			return compressPicture(url, config.PICTURE_SLIDER_WIDTH_HEIGHT, config.PICTURE_SLIDER_WIDTH_HEIGHT);
		}

		function getSmallUrl(url) {
			return compressPicture(url, config.PICTURE_SLIDER_SMALL_WIDTH_HEIGHT, config.PICTURE_SLIDER_SMALL_WIDTH_HEIGHT);
		}

		function compressPicture(url, width, height) {
			if (vm.picType === config.PIC_TYPE_LE) {
				return util.compressLePicture(url, width, height);
			} else if (vm.picType === config.PIC_TYPE_GSX) {
				return util.compressBJHLPicture(url, width, height, null, null);
			}
		}

		function left() {
			var len = vm.picUrls.length;
			showPicByIndex(
				--vm.picIndex,
				function() {
					if (vm.picIndex < 1) {
						$rootScope.safeApply(function() {
							vm.picIndex = len;
						});
						$('.pic-all').css({
							left: -config.PICTURE_SLIDER_WIDTH_HEIGHT * len + 'px'
						});
					}
					initTitle();
				}
			);
		}

		function right() {
			showPicByIndex(
				++vm.picIndex,
				function() {
					if (vm.picIndex > vm.picUrls.length) {
						$rootScope.safeApply(function() {
							vm.picIndex = 1;
						});
						$('.pic-all').css({
							left: -config.PICTURE_SLIDER_WIDTH_HEIGHT + 'px'
						});
					}
					initTitle();
				}
			);
		}

		function showPicByIndex(index, callback) {
			vm.picIndex = index;
			if (vm.isFirstLoad) {
				vm.isFirstLoad = false;
				$('.pic-all').css({
					left: -config.PICTURE_SLIDER_WIDTH_HEIGHT * vm.picIndex + 'px'
				});
				initTitle();
				return;
			}
			$('.pic-all').animate({
					left: -config.PICTURE_SLIDER_WIDTH_HEIGHT * vm.picIndex + 'px'
				},
				// 'slow',
				callback
			);
		}
	}

	return SliderController;
});