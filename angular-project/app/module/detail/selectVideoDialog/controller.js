/**
 * @file 从资料库选择视频弹窗
 * @author niejianhui
 */
define(function () {
    'use strict';
    function Controller($rootScope, $scope, $sce, utilService) {
        function initView() {
            var env = utilService.getEnvName();
            var iframeUrl;
            var str = 'b.genshuixue.com/commonPage.html?fileType=video&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + $rootScope.user.auth_token + '#/dataBank';
            if (env === 'www') {
                iframeUrl = 'https://' + str;
                // iframeUrl = 'https://0.0.0.0:8108/commonPage.html?fileType=video&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + $rootScope.user.auth_token + '#/dataBank';
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
        '$rootScope', '$scope', '$sce', 'utilService'
    ];
    return Controller;
});
