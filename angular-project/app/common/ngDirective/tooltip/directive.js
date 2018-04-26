/**
 * @file tooltip指令
 * @author hurry
 */

define(function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('tooltip', ['$timeout', function ($timeout){
            // Runs during compile
            return {
                restrict: 'A',
                scope: {
                    /**
                     * 配置
                     * @param {Object} options
                     * @param {string} options.position
                     *        'top/bottom/left/right' 默认top
                     * @param {number} options.width 宽度，默认120px
                     * @param {string} options.content 要显示内容
                     * @param {?function} options.getContent
                     *        获取显示内容
                     *        this: $scop
                     *        arguments: iAttr
                     */
                    options: '='
                },
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs) {

                    var layerStyle = {};
                    var tempElem;

                    function positionTip (elem, direction) {
                        var width = elem.outerWidth();
                        var height = elem.outerHeight();
                        var optWidth = $scope.options.width || 120;

                        switch(direction) {
                            case 'left':
                                break;
                            case 'right':
                                layerStyle.left = width + 10 + 'px';
                                layerStyle.top =  Math.ceil((height - 28) /2) + 'px';
                                break;
                            case 'top':
                            case 'bottom':
                                //有些挂靠元素只是一个图标  宽度很小  
                                if (width > 45) {
                                    layerStyle.left = (width - optWidth) + 'px';
                                }
                                else {
                                    layerStyle.left = (45 - optWidth) + 'px';
                                }
                                tempElem.find('i').css('left', (optWidth - 50 + 'px'));
                                break;
                            default:
                                break;
                        }

                        tempElem.css(layerStyle);

                    }


                    $scope.$watch('options', function (newValue) {

                        if (!newValue) {
                            return;
                        }

                        var position = newValue.position || 'top';

                        iElm.addClass('ex-tooltip-' + position)
                            .addClass('ex-tooltip');

                        layerStyle = {
                            width: (newValue.width || 120) + 'px'
                        };

                        tempElem = $(''
                            + '<div class="ex-tooltip-layer">'
                            +       '<i class="ex-tooltip-before"></i>'
                            +       '<i class="ex-tooltip-after"></i>'
                            +       (newValue.content || '')
                            + '</div>'
                        );

                        iElm.append(tempElem.hide());

                        var to;
                        iElm.on('mouseenter', function () {
                                if (angular.isFunction(newValue.getContent)) {
                                    tempElem.html(''
                                        + '<div class="ex-tooltip-layer">'
                                        +       '<i class="ex-tooltip-before"></i>'
                                        +       '<i class="ex-tooltip-after"></i>'
                                        +       newValue.getContent.apply($scope, [iAttrs])
                                        + '</div>'
                                    );
                                }

                                positionTip(iElm, position);
                                tempElem.show();
                            })
                            .on('mouseleave', function () {

                                to = $timeout(function(){
                                    tempElem.hide();
                                }, 100);
                            });

                        // tempElem.on('mouseover', function () {
                        //     to && $timeout.cancel(to);
                        // });

                        newValue.clazz && iElm.parent().addClass(newValue.clazz);

                    });
                }
            };
        }]);
});
