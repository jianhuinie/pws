/**
 * @file 缓存
 * @author hurry
 */
 define(function (require) {
 	'use strict';
	var cache = {};
 	require('./module')
 		.factory('myCache', function () {

 			return {
				set: function (key, value) {
					cache[key] = value;
					return value;
				},
				get: function (key) {
					return cache[key];
				},
				del: function(key) {
					var val = cache[key];
					cache[key] = undefined;
					return val;
				}
			};
 		});
 });
