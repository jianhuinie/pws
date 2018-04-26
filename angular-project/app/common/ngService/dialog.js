/**
 * @file dialogInstance服务
 * @demo
 *     dialog.open({
                title: '获取语音验证码',
                controller: 'voiceMessageCtrl',
                width: 370,
                templateUrl: helper.getTplUrl('main/cash/dialog/messageValid/voiceCode/tpl'),
                resolve: {
                    dialogConfig: function () {
                        return {
                            sendMessagePath: $scope.sendMessagePath
                        };
                    }
                }
            });
 * @author hurry
 */
define(function (require) {
    'use strict';
    var serviceModule = require('./module');
    // var Dialog = require('cobble/ui/Dialog');
    require('cc-config/ui/Dialog');
    var Dialog = require('cc/ui/Dialog');
    serviceModule.factory('dialog', ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$compile',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $compile) {

            return {

                /**
                 * 显示一个弹框
                 * @param {Object} param 参数
                 * @param {Object.template} param 参数
                 * @param {Object.templateUrl} param 参数
                 * @param {Object.?} 其他参数透传，参见dep/cobble/0.3.0/src/ui/Dialog.js
                 */
                open: function (param) {

                    function getTemplatePromise(options) {
                        return options.template ? $q.when(options.template) :
                            $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                                {cache: $templateCache}).then(function (result) {
                                    return result.data;
                                });
                    }

                    function getResolvePromises(resolves) {
                        var promisesArr = [];
                        angular.forEach(resolves, function (value) {
                            if (angular.isFunction(value) || angular.isArray(value)) {
                                promisesArr.push($q.when($injector.invoke(value)));
                            }
                        });
                        return promisesArr;
                    }

                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();
                    var dialogInstance = {};

                    //merge and clean up options
                    param = angular.extend({}, param);
                    param.resolve = param.resolve || {};

                    //verify options
                    if (!param.template && !param.templateUrl) {
                        throw new Error('one of template or templateurl options is required.');
                    }

                    dialogInstance.result = modalResultDeferred.promise;
                    dialogInstance.opened = modalOpenedDeferred.promise;
                    var templateAndResolvePromise =
                        $q.all([getTemplatePromise(param)].concat(getResolvePromises(param.resolve)));


                    templateAndResolvePromise.then(function resolvesuccess(tplandvars) {
                        var modalscope = (param.scope || $rootScope).$new();
                        var ctrllocals = {};
                        var resolveiter = 1;

                        var opts = $.extend(
                            {},
                            {
                                title: '提示',
                                content: tplandvars[0],
                                width: 400,
                                zIndex: 1000
                                // y: '20%'
                            },
                            param
                        );

                        dialogInstance.dialog = new Dialog(opts);

                        dialogInstance.dialog.close = function (value) {
                            this.hide();
                            modalResultDeferred.reject(value);
                        };
                        dialogInstance.dialog.dismiss = function (value) {
                            this.hide();
                            modalResultDeferred.resolve(value);
                        };
                        //controllers
                        if (param.controller) {
                            ctrllocals.$scope = modalscope;
                            angular.forEach(param.resolve, function (value, key) {
                                ctrllocals[key] = tplandvars[resolveiter++];
                                modalscope[key] = tplandvars[resolveiter++];
                            });

                            $controller(param.controller, ctrllocals);
                        }
                        modalscope.dialog = dialogInstance.dialog;
                        dialogInstance.dialog.$scope = modalscope;
                        $compile(dialogInstance.dialog.options.mainElement)(modalscope);
                        modalOpenedDeferred.resolve(dialogInstance);

                    }, function resolveerror(reason) {
                        modalResultDeferred.reject(reason);
                        modalOpenedDeferred.reject(false);
                    });

                    templateAndResolvePromise.then(function () {
                        modalOpenedDeferred.resolve(true);
                    }, function () {
                        modalOpenedDeferred.reject(false);
                    });
                    return dialogInstance.result;
                },
                /**
                 * 显示一个弹框
                 * @param {Object} controller 控制器
                 */
                // bind: function (controller, options) {

                //     var dialogInstance = {};
                //     var options = options || {};

                //     dialogInstance.dialog = $modal.open({
                //         templateUrl: 'app/module/common/tpl/tpl.html',
                //         windowTemplateUrl: 'app/module/common/tpl/window.html',
                //         controller: controller,
                //         resolve: options.resolve || {},
                //         size: options.size,
                //         openedClass: options.openedClass,
                //         windowClass: options.windowClass,
                //         backdropClass: options.backdropClass
                //     });

                //     dialogInstance.dialog.rendered.then(function (dialog) {
                //     });

                //     return dialogInstance.opened;
                // }
            };
        }]);
});