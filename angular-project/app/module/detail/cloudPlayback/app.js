/**
 * @file cloudPlayback
 * @author niejianhui
 */

define(function (require) {
    'use strict';
    require('./controller');

    angular.module('detail.cloudPlayback', [
            'ui.router',
            'pasvaz.bindonce',
            'detail.cloudPlayback.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('detail.cloudPlayback', {
                        url: 'cloudPlayback',
                        controller: 'CloudPlaybackCtrl',
                        templateUrl: 'app/module/detail/cloudPlayback/tpl.html'
                    });
            }
        ]);

});