/**
 * @file 分页指令
 *
 * @author hurry
 */

define(function (require) {
    'use strict';
    var config = require('common/config/common');
    require('cc-config/ui/Pager');
    var Pager = require('cc/ui/Pager');
    // var Pager = require('cobble/ui/Pager');

    angular.module('Manage.directives')
        .directive('pager', function () {

            /**
             * 默认每页显示的条数
             * @type {number}
             */
            var DEFAULT_PAGE_SIZE = 20;

            return {
                restrict: 'EA',
                replace: false,
                scope: {
                    totalCount: '=',
                    page: '=',
                    showCount: '@',
                    pageChangeHandler: '&',
                    pageSize: '@'
                },
                templateUrl: 'app/common/ngDirective/pager/tpl.html',
                link: function ($scope, $element) {
                    var vm = $scope;
                    vm.totalCount = vm.totalCount || 1;
                    var showCount = vm.showCount || 5;
                    var page = vm.page || config.DEFAULT_CURRENT_PAGE;
                    var prePageIndex = page;
                    vm.pageSize = vm.pageSize || config.DEFAULT_PAGE_SZIE;
                    var count = Math.ceil(
                            vm.totalCount / vm.pageSize
                    );
                    var pager = new Pager({
                        mainElement: $($element).find('.page-wrapper'),
                        count: count,
                        showCount: showCount,
                        page: page,
                        onselect: function (e) {
                            vm.page = +$(e.target).data('page');
                            if (vm.page !== prePageIndex && $.isFunction(vm.pageChangeHandler)) {
                                vm.pageChangeHandler({
                                    newVal: vm.page,
                                    oldVal: prePageIndex
                                });
                                prePageIndex = vm.page;
                            }
                        },
                        prevTemplate: ''
                            + '<li class="item button icon-angles-left'
                            + '<!-- if: ${active} === ${first} -->'
                            +     ' disabled"'
                            + '<!-- else -->'
                            +     '<!-- var: prev = ${active} - 1 -->'
                            +     '"data-page="${prev}"'
                            + '<!-- /if -->'

                            + '>'
                            +     '<i class="icon icon-chevron-left" data-page="${prev}"></i>'
                            + '</li>',
                        nextTemplate: ''
                            + '<li class="item button icon-angles-right'
                            + '<!-- if: ${active} === ${last} -->'
                            +     ' disabled"'
                            + '<!-- else -->'
                            +     '<!-- var: next = ${active} + 1 -->'
                            +     '" data-page="${next}"'
                            + '<!-- /if -->'

                            + '>'
                            +     '<i class="icon icon-chevron-right" data-page="${next}"></i>'
                            + '</li>'
                    });

                    vm.$watch('totalCount', function (newValue, oldValue) {
                        var pageSize = vm.pageSize || DEFAULT_PAGE_SIZE;
                        if (newValue !== oldValue) {
                            pager.count = Math.ceil(
                                    newValue / pageSize);
                            pager.page = config.DEFAULT_CURRENT_PAGE;
                            // pager.render();
                            pager.set({
                                page: pager.page,
                                count: pager.count
                            });
                        }
                    });
                    //处理 不通过点击分页  换页的情况
                    // vm.$watch('page', function (newValue, oldValue) {
                    //     if (newValue !== oldValue) {
                    //         pager.set({
                    //             page: newValue
                    //         });
                    //     }
                    // });
                }
            };
        }
    );
});