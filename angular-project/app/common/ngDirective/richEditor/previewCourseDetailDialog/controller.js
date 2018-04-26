/**
 * @file 预览课程详情 controller
 * @author niejianhui
 * @date 2017/08/18
 */
define(function () {
    'use strict';
    Controller.$inject = ['$scope', 'courseDetail'];
    function Controller($scope, courseDetail) {
        
        function initView () {
            $scope.style = courseDetail.style || 'white';
            $scope.editorList = $.extend(true, {}, courseDetail.editorList);
            $.each($scope.editorList, function (index, item) {
                if (item.type === 'body') {
                    item.options.text = item.options.text.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
                }
            });
        }

        initView();

        $scope.setBgStyle = function (style) {
            $scope.style = style;
            courseDetail.style = style;
        };

        $scope.bodyColorClassMap = {
            '#000000': 'black',
            '#999999': 'grey',
            '#FC5C5A': 'pink',
            '#FF9100': 'yellow',
            '#0F86E8': 'blue',
            '#43B244': 'green',
            '#3D618A': 'brown',
            '#9900CC': 'purple'
        };

    }

    return Controller;
});
