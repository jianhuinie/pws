/**
 * @fileOverview 百度分享的指令
 * @author hurry
 */

define(function () {
    'use strict';

    function getShareFloat() {
        var shareFloat = $(''
            + '<div class="bdsharebuttonbox ex-tooltip-layer" data-tag="share_1">'
            +    '<a class="bds_more" data-cmd="more"></a>'
            // +    '<a class="bds_mshare" data-cmd="mshare"></a>'
            +    '<a class="bds_qzone" data-cmd="qzone" href="#"></a>'
            +     '<a class="bds_tsina" data-cmd="tsina"></a>'
            +    '<a class="bds_weixin" data-cmd="weixin"></a>'
            // +    '<a class="bds_renren" data-cmd="renren"></a>'
            // +    '<a class="bds_tqq" data-cmd="tqq"></a>'
            + '</div>'
        );

        return shareFloat;
    }


    var tempOptions = {};

    function setConfig(config) {
        for (var key in tempOptions) {
            config[key] = tempOptions[key];
        }
    }

    window._bd_share_config = {
        common: {
            bdSnsKey: {},
            bdText: '',
            bdDesc: '',
            bdMini:2,
            bdPic: '',
            bdStyle:0,
            bdSize:16,
            onBeforeClick: function (cmd, config) {
                setConfig(config);
                return config;
            }
        },
        share: {}
    };

    angular.module('Manage.directives')
        .directive('baiduShare', ['$timeout', function ($timeout){
            // Runs during compile
            return {
                restrict: 'A',
                scope: {
                    shareOptions: '=shareOptions'
                },
                replace: true,
                link: function($scope, iElm) {

                    var shareFloat = getShareFloat();
                    iElm.append(shareFloat.hide());

                    var shareOptions = $scope.shareOptions;
                    bind();
                    function bind() {
                        window.require(['BaiduShare'], function () {
                            // 解决分页分享失效问题
                            if (window._bd_share_main) {
                                window._bd_share_main.init();
                            }
                            var to;

                            iElm
                                .on('mouseover', function () {
                                    // 实例话多个分享 设置config
                                    for (var key in shareOptions) {
                                        tempOptions[key] = shareOptions[key];
                                    }
                                    to && $timeout.cancel(to);
                                    shareFloat.show();
                                })
                                .on('mouseout', function () {
                                    to = $timeout(function () {
                                        shareFloat.hide();
                                    }, 100);
                                });

                            shareFloat.on('mouseover', function () {
                                $timeout.cancel(to);
                            });
                        });
                    }
                }
            };
        }]);
});