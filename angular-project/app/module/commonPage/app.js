/**
 * @file 添加资料SDK
 * @author niejianhui
 */
define('module/commonPage/app', function (require) {
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
                    .state('commonPage', {
                        url: '/',
                        abstract: true,
                        template: '<div ui-view></div>',
                        controller: ['$rootScope', '$state',
                            function ($rootScope, $state) {
                                // debugger;
                            }
                        ]
                    });
            }
        ])
        .config( ['$compileProvider',
            function( $compileProvider )
            {   
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|genshuixue|baijiayun):/);
                // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
            }
        ])
        .run(['$rootScope', '$filter', 'utilService', 'ajaxService', '$sce',
            function ($rootScope, $filter, utilService, ajaxService, $sce) {

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


            }
        ]);
        

    angular.bootstrap(document, ['commonPage']);
});
