/**
 * @file 优选一对一
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.one2oneEdit', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.one2oneEdit.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.one2oneEdit', {
                        url: 'one2oneEdit/:courseNumber',
                        controller: 'One2oneEditCtrl',
                        templateUrl: 'app/module/main/one2oneEdit/tpl.html'
                    });
            }
        ]);

});