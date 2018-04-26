/**
 * @fileOverview suggestion demo
 * @author XiaoBin Li
 */

define(function() {

    'use strict';

    angular.module('app')
        .controller('AutoCompleteController', ['$scope', '$http',
            function AutoCompleteController($scope, $http) {

                $scope.people = [
                    {
                        firstName: 'Daryl',
                        surname: 'Rowland',
                        twitter: '@darylrowland',
                        pic: 'img/daryl.jpeg'
                    }, 
                    {
                        firstName: 'Alan',
                        surname: 'Partridge',
                        twitter: '@alangpartridge',
                        pic: 'img/alanp.jpg'
                    }, 
                    {
                        firstName: 'Annie',
                        surname: 'Rowland',
                        twitter: '@anklesannie',
                        pic: 'img/annie.jpg'
                    }
                ];

                $scope.requestParams = {
                    name: 'xiaobin',
                    department: 'efe'
                };

                $scope.countries = [
                    {
                        name: 'Afghanistan',
                        code: 'AF'
                    }, 
                    {
                        name: 'Aland Islands',
                        code: 'AX'
                    }, 
                    {
                        name: 'Albania',
                        code: 'AL'
                    }, 
                    {
                        name: 'Algeria',
                        code: 'DZ'
                    }, 
                    {
                        name: 'American Samoa',
                        code: 'AS'
                    }, 
                    {
                        name: 'AndorrA',
                        code: 'AD'
                    }
                ];
            }
        ]);
});