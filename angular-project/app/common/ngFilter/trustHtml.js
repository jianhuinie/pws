/**
 * @fileOverview  将html字符串转为受信任的html文本
 * @author niejianhui
 */

define(function (require) {

    'use strict';


    angular.module('Manage.filters')
        .filter('trustHtml',
            function ($sce) {
                return function (string) {
                    return $sce.trustAsHtml(string);
                };
            }
        );
});