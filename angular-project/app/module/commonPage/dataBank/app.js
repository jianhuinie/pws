/**
 * @file dataBank
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('commonPage.dataBank', [
            'ui.router',
            'pasvaz.bindonce',
            'commonPage.dataBank.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('commonPage.dataBank', {
                        url: 'dataBank',
                        controller: 'DataBankCtrl',
                        templateUrl: 'app/module/commonPage/dataBank/tpl.html'
                    });
            }
        ]);

});