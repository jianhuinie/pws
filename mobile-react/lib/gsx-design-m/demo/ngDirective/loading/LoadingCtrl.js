/**
 * loading的控制器
 * @author hanrui
 * @date   2015/11/04
 */
angular
	.module('loading', [])
	.controller('LoadingCtrl', ['$scope', function ($scope) {
		$scope.isLoading = true;
		$scope.isFullScreen = true;
		$scope.isResize = false;
		$scope.imgUrl = 'http://www.d1net.com/statics/images/icon/loading_more.gif';
		// $scope.zIndex = 20;
	}]);