define(function (require) {
    'use strict';
    require('bindonce');
    require('ng-sanitize');
    require('common/ngService/main');
    require('common/ngDirective/main');
    require('common/ngFilter/main');
    require('module/commonPage/dataBank/app');
    require('module/commonPage/teacherLive/app');
    require('module/commonPage/studentLive/app');

    var deps = [
        'templates',
        'pasvaz.bindonce',
        'Manage.services',
        'Manage.directives',
        'Manage.filters',
        'commonPage.dataBank',
        'commonPage.teacherLive',
        'commonPage.studentLive'
    ];

    var app = angular.module('commonPage', deps);

    return app;
});