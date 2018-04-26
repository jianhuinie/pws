/**
 * @file demo
 * @author hurry
 */

define(function (require) {
    'use strict';

    require('./service/app');
    require('./filters/app');
    require('./directive/app');

    angular.module('Manage.demo', [
            'ui.router',
            'Manage.demo.services',
            'Manage.demo.filters',
            'Manage.demo.directives'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo', {
                        url: 'demo',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    });
                    // .state('Manage.demo2', {
                    //     url: 'demo2',
                    //     controller: 'demo2',
                    //     templateUrl: 'app/module/main/demo/demo2/tpl.html'
                    // })
                    // .state('Manage.pager', {
                    //     url: 'pager',
                    //     controller: require('./pager/controller'),
                    //     templateUrl: 'app/module/main/demo/pager/tpl.html'
                    // })
                    // .state('Manage.datetimepicker', {
                    //     url: 'datetimepicker',
                    //     controller: require('./datetimepicker/controller'),
                    //     templateUrl: 'app/module/main/demo/datetimepicker/tpl.html'
                    // });
            }
        ]);

});