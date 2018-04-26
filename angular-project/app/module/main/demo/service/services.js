/**
 * @file demo
 * @author hurry
 */

define(function () {
    'use strict';
    angular
        .module('Manage.demo.service.services', [
            'Manage.services'
        ])
        .factory('demoService', ['ajaxService',
        	function (ajaxService) {
                return {
                	demo1: function (params) {
		                return ajaxService.send('demo/demo/index.do', params || {});
	                }
                };
            }
        ]);
});