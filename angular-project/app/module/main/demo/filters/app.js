/**
 * @file demo
 * @author hurry
 */

define(function (require) {
    'use strict';

    angular.module('Manage.demo.filters', [
            'ui.router',
            'Manage.filters'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.filters', {
                        url: '/filters',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.filters.trustUrl', {
                        url: '/trustUrl',
                        controller: require('./trustUrl/controller'),
                        templateUrl: 'app/module/main/demo/filters/trustUrl/tpl.html'
                    });
            }
        ]);

});