define(function (require) {
    'use strict';
    require('bindonce');
    require('ng-sanitize');
    require('common/ngService/main');
    require('common/ngDirective/main');
    require('common/ngFilter/main');
    require('module/main/demo/app');
    require('module/main/storageSpace/app');
    require('module/main/paySuccess/app');
    require('module/main/uploadFile/app');
    require('module/main/one2oneEdit/app');
    require('module/main/releaseSuccess/app');
    require('module/main/videoCourseEdit/app');

    var deps = [
        'templates',
        'pasvaz.bindonce',
        'Manage.services',
        'Manage.directives',
        'Manage.filters',
        'Manage.demo',
        'Manage.storageSpace',
        'Manage.paySuccess',
        'Manage.uploadFile',
        'Manage.one2oneEdit',
        'Manage.releaseSuccess',
        'Manage.videoCourseEdit'
    ];

    var app = angular.module('Manage', deps);

    return app;
});