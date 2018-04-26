/**
 * @file storageSpace
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.storageSpace', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.storageSpace.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.storageSpace', {
                        url: 'storageSpace',
                        controller: 'ManageSpaceCtrl',
                        templateUrl: 'app/module/main/storageSpace/tpl.html'
                    });
            }
        ]);

});