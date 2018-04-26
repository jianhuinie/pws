/**
 * @file releaseSuccess
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.releaseSuccess', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.releaseSuccess.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.releaseSuccess', {
                        url: 'releaseSuccess',
                        params: {
                            courseNumber: ''
                        },
                        controller: 'ReleaseSuccessCtrl',
                        templateUrl: 'app/module/main/releaseSuccess/tpl.html'
                    });
            }
        ]);

});