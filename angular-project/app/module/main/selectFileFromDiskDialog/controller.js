/**
 * @file 从资料库选择文件弹窗(机构老师都可以用)   resolve  传fileType参数
 * @author niejianhui
 */
define(function () {
    'use strict';
    function Controller($rootScope, $scope, $sce, utilService, fileType) {
        function initView() {
            var env = utilService.getEnvName();
            var iframeUrl;
            var user = $rootScope.user;
            var authToken = user.auth_token;

            // 机构走资料库
            var domainName = 'b';
            if (user.user_role === 6) {
                domainName = 'ziliao';
            }
            var str = domainName + '.genshuixue.com/commonPage.html?fileType=' + fileType + '&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + authToken + '#/dataBank';
            if (env === 'www') {
                iframeUrl = 'https://' + str;
                //本地调试用
                if (location.host.indexOf('8108') > -1) {
                    iframeUrl = 'http://0.0.0.0:8108/commonPage.html?fileType=' + fileType + '&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + authToken + '#/dataBank';
                }
            }
            else {
                iframeUrl = 'https://' + env + '-' + str;
            }
            $scope.iframeUrl = $sce.trustAsResourceUrl(iframeUrl);
        }
        //接收消息
        function receiveMessage(event) {
            if ((event.origin.indexOf('genshuixue.com') < 0)
                && (event.origin.indexOf('baijiahulian.com') < 0)
                && (event.origin.indexOf('8108') < 0)) {
                return;
            }
            if (event.data) {
                var data = JSON.parse(event.data);
                $scope.dialog.dismiss({
                    mediaId: data.mediaIdList[0],
                    fid: data.idList[0],
                    name: data.nameList[0]
                });
            }
        }
        initView();

        window.addEventListener('message', receiveMessage);
    }

    Controller.$inject = [
        '$rootScope', '$scope', '$sce', 'utilService', 'fileType'
    ];
    return Controller;
});
