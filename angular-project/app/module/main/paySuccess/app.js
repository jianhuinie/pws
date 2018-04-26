/**
 * @file paySuccess
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.paySuccess', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.paySuccess.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.paySuccess', {
                        url: 'paySuccess',
                        controller: 'PaySuccessCtrl',
                        templateUrl: 'app/module/main/paySuccess/tpl.html'
                    });
            }
        ]);

});