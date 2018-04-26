/**
 * @fileOverview  将url字符串转为受信任的url
 * @author niejianhui
 */

define(function (require) {

    'use strict';


    angular.module('Manage.filters')
        .filter('trustUrl',
            function ($sce) {
                return function (string) {
                    return $sce.trustAsResourceUrl(string);
                };
            }
        );
});