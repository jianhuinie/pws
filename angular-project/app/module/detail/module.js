define(function (require) {
    'use strict';
    require('bindonce');
    require('ng-sanitize');
    require('common/ngService/main');
    require('common/ngDirective/main');
    require('common/ngFilter/main');
    require('module/detail/courseList/app');
    require('module/detail/cloudPlayback/app');

    var deps = [
        'templates',
        'pasvaz.bindonce',
        'Manage.services',
        'Manage.directives',
        'Manage.filters',
        'detail.courseList',
        'detail.cloudPlayback'
    ];

    var app = angular.module('detail', deps);

    return app;
});