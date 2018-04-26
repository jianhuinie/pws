/**
 * Created by chenmo on 16/2/19.
 * 打开IM聊天的功能
 */
define(function (require) {

    'use strict';

    var app = require('common/app');
    var openAppDialog = require('./openAppDialog');
    var user = require('common/user');

    function startChat(huanxinId, imData) {

        var supportVersionNumber = app.version2Number('3.0.7');
        var currentVersionNumber = app.version2Number(app.appVersion());

        if (app.isApp()) {

            require(['jockey'], function (Jockey) {
                Jockey.off('setCheckLogin');
                Jockey.on('setCheckLogin', function (response) {
                    //返回: isLogin:0|1 未登录|登录
                    if (!!Number(response.isLogin)) {

                        if (imData) {
                            /**
                             * 新版im聊天功能
                             * @param  {string} c_id 若与老师聊天，则为teacher_number;若为机构聊天，则为org_id;若为客服，则为客服id
                             * @param  {string} c_role 为角色标识号，老师为0，机构为6，客服为7
                             * @param  {string} group_id 群聊编号，只有群聊时，才传值。群聊时，其余字段为空；单聊时，该字段为空
                             * @return
                             */
                            var data = {
                                'c_id': imData.c_id + '',
                                'c_role': imData.c_role + ''
                            };
                            if (imData.group_id) {
                                data['group_id'] = imData.group_id + '';
                            }
                            app.send('IM', data);
                        }
                        else {
                            app.send('toChat', {
                                easemob: '' + huanxinId
                            });
                        }
                    }
                    else {

                        // 2016-01-05 by caoying，学生端要求未登录时调用另外一个jokey接口,无需调用原来的登陆页面
                        if (currentVersionNumber >= supportVersionNumber) {
                            app.send('anonymousIM');
                        }
                        else {
                            user.loginStudent();
                        }
                    }
                });
                Jockey.send('getCheckLogin');
            });

        }
        else {
            openAppDialog();
        }
    }

    return startChat;
});