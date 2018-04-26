/**
 * @file demo
 * @author hurry
 */

define(function (require) {
    'use strict';
    require('./services');
    // require('./controllers');
    angular.module('Manage.demo.services', [
            'ui.router',
            'Manage.demo.service.services'
            // 'Manage.demo.service.controllers'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.services', {
                        url: '/services',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.services.ajax', {
                        url: '/ajax',
                        controller: require('./ajaxService/index'),
                        templateUrl: 'app/module/main/demo/service/ajaxService/tpl.html'
                    })
                    .state('Manage.demo.services.dialog', {
                        url: '/dialog',
                        controller: require('./dialog/controller'),
                        templateUrl: 'app/module/main/demo/service/dialog/tpl.html'
                    })
                    .state('Manage.demo.services.alert', {
                        url: '/alert',
                        controller: require('./alert/controller'),
                        template: '<div></div>'
                    })
                    .state('Manage.demo.services.confirm', {
                        url: '/confirm',
                        controller: require('./confirm/controller'),
                        template: '<div></div>'
                    })
                    .state('Manage.demo.services.uploader', {
                        url: '/uploader',
                        controller: require('./uploader/controller'),
                        templateUrl: 'app/module/main/demo/service/uploader/tpl.html'
                    })
                    .state('Manage.demo.services.tips', {
                        url: '/tips',
                        controller: require('./tips/controller'),
                        templateUrl: 'app/module/main/demo/service/tips/tpl.html'
                    })
                    .state('Manage.demo.services.utilService', {
                        url: '/utilService',
                        controller: require('./utilService/controller'),
                        templateUrl: 'app/module/main/demo/service/utilService/tpl.html'
                    });
            }
        ]);

});