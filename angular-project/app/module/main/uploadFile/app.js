/**
*@file uploadFile
*@author huangshiming
*/

define(function (require) {
    'use strict';
    require('./controller');
    require('./ngDirective/main');

    angular.module('Manage.uploadFile', [
        'ui.router',
        'pasvaz.bindonce',
        'Manage.uploadFile.controller',
        'Manage.uploadFile.directives'
    ])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('Manage.uploadFile', {
                    url: 'uploadFile',
                    controller: 'UploadFileCtrl',
                    templateUrl: 'app/module/main/uploadFile/tpl.html'
                });
        }
    ]);
});