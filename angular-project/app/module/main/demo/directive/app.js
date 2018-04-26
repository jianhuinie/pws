/**
 * @file demo
 * @author hurry
 */

define(function (require) {
    'use strict';

    angular.module('Manage.demo.directives', [
            'ui.router',
            'Manage.directives'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.directives', {
                        url: '/directive',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.directives.pager', {
                        url: '/pager',
                        controller: require('./pager/controller'),
                        templateUrl: 'app/module/main/demo/directive/pager/tpl.html'
                    })
                    .state('Manage.demo.directives.datetimepicker', {
                        url: '/datetimepicker',
                        controller: require('./datetimepicker/controller'),
                        templateUrl: 'app/module/main/demo/directive/datetimepicker/tpl.html'
                    })
                    .state('Manage.demo.directives.daterangepicker', {
                        url: '/daterangepicker',
                        controller: require('./daterangepicker/controller'),
                        templateUrl: 'app/module/main/demo/directive/daterangepicker/tpl.html'
                    })
                    .state('Manage.demo.directives.dropdown', {
                        url: '/dropdown',
                        controller: require('./dropdown/controller'),
                        templateUrl: 'app/module/main/demo/directive/dropdown/tpl.html'
                    })
                    .state('Manage.demo.directives.searchSubject', {
                        url: '/searchSubject',
                        controller: require('./searchSubject/controller'),
                        templateUrl: 'app/module/main/demo/directive/searchSubject/tpl.html'
                    })
                    .state('Manage.demo.directives.tooltip', {
                        url: '/tooltip',
                        controller: require('./tooltip/controller'),
                        templateUrl: 'app/module/main/demo/directive/tooltip/tpl.html'
                    })
                    .state('Manage.demo.directives.umeditor', {
                        url: '/umeditor',
                        controller: require('./umeditor/controller'),
                        templateUrl: 'app/module/main/demo/directive/umeditor/tpl.html'
                    });
            }
        ]);

});