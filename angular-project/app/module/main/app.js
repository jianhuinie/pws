/**
 * @file 应用入口
 * @author hurry
 */
define('module/main/app', function (require) {
    'use strict';
    // 公共校验配置
    require('cc-config/form/Validator');
    require('../../common/ngService/main');

    var app = require('./module');
        app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
                $urlRouterProvider.otherwise('/');
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self', 'https://*.genshuixue.com/**'
                ]);

                //配置状态
                $stateProvider
                    .state('Manage', {
                        url: '/',
                        abstract: true,
                        template: '<div ui-view></div>',
                        controller: ['$rootScope', '$state', 'userInfo',
                            function ($rootScope, $state, userInfo) {
                                // debugger;
                            }
                        ]
                    });
                //$urlRouterProvider.otherwise('/storageSpace');
            }
        ])
        .config( ['$compileProvider',
            function( $compileProvider )
            {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|genshuixue|baijiayun):/);
                // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
            }
        ])
        .run(['$rootScope', '$filter', 'utilService', 'ajaxService', '$sce', 'userInfo',
            function ($rootScope, $filter, utilService, ajaxService, $sce, userInfo) {

                $rootScope.safeApply = function (fn) {
                    var phase = this.$root.$$phase;
                    if (phase === '$apply' || phase === '$digest') {
                        if (fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };
                
                userInfo()
                    .then(function (response) {
                        var data = response.data;
                        $rootScope.user = data;
                    });
            }
        ]);

    angular.bootstrap(document, ['Manage']);
});
