/**
 * @fileOverview UMEDITOR的angular directive 封装
 * @author hurry
 */
define(function (require) {
    'use strict';
    var UM_CONFIG = require('umeditor.config');

    var UM = require('umeditor');

    angular.module('Manage.directives')
        .directive('umeditor', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
                return {
                    priority: 10,
                    restrict: 'EAC',
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModel) {
                        var editor;
                        var createEditor = function () {
                            editor = UM.getEditor($attrs.id, UM_CONFIG);
                            editor.options.imageFieldName = 'attachment';
                            editor.options.autoSyncData = false;
                            // umeditor处理照片的hack标志  为了兼容后端返回的数据和富文本本身的处理问题
                            editor.options.isFormatImageHack = true;
                        };

                        //设置富文本编辑器的内容
                        function setEditorContent(value) {
                            var contentValue = value.replace(/white-space\s*:\s*nowrap/g, '');
                            if (editor.isReady) {
                                editor.setContent(contentValue);
                            }
                            else {
                                editor.removeListener('ready');
                                editor.addListener('ready', function () {
                                    editor.setContent(contentValue);
                                });
                            }
                        }

                        ngModel.$render = function () {
                            if (!editor) {
                                createEditor();
                            }

                            if (ngModel.$viewValue) {
                                if (editor.isReady) {
                                    editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                                }
                                else {
                                    editor.addListener('ready', function () {
                                        editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                                    });
                                }
                            }

                            editor.addListener('contentchange', function () {
                                ngModel.$viewValue.value = this.getContent().replace(/white-space\s*:\s*nowrap/g, '');
                                ngModel.$viewValue.modifyStatus = 1;
                                $rootScope.safeApply();
                            });
                        };

                        // var renderModel = function () {

                        //     if (!editor) {
                        //         createEditor();
                        //     }

                        //     if (editor.isReady) {
                        //         editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                        //         //ngModel.$viewValue.textValue = editor.getContentTxt();


                        //     }
                        //     else {
                        //         editor.addListener('ready', function () {
                        //             editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                        //             //ngModel.$viewValue.textValue = editor.getContentTxt();

                        //         });
                        //     }


                        //     editor.addListener('contentchange', function () {
                        //         ngModel.$viewValue.value = this.getContent().replace(/white-space\s*:\s*nowrap/g, '');
                        //         ngModel.$viewValue.modifyStatus = 1;
                        //         //ngModel.$viewValue.textValue = this.getContentTxt();

                        //         $scope.$apply();
                        //     });
                        // };

                        var tm;

                        var render = function () {

                            if (tm) {
                                $timeout.cancel(tm);
                            }

                            if (!createEditor) {
                                tm = $timeout(
                                    function () {
                                       render();
                                    },
                                    200
                                );
                            }
                            // else {
                            //     renderModel();
                            // }
                        };

                        render();

                        $scope.$on('$destroy', function () {
                            if (editor && editor.container) {
                                editor.removeListener('ready');
                                editor.removeListener('contentchange');
                                editor.destroy();
                                $('#' + $attrs.id).remove();
                                window.UM.clearCache($attrs.id);
                                editor = null;
                            }
                        });

                        $scope.$on('umeditorcontentchange', function (e, value) {
                            setEditorContent(value);
                        });
                    }
                };
            }
        ]);
});
