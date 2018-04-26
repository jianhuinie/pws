/**
 * @file 中英交流大使
 * @author wx
 */



define(function(require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var LoginDialog = require('common/component/LoginDialog');

    var BanLessonDialog = require('common/component/BanLessonDialog');

    function showLogin() {
        new LoginDialog({
            showKefu : false,
            registerPrefix: '/track/source?id=gsx_uk_pc&url=',
            onSuccess: function(){
                location.reload();
            }
        });
    }


    exports.init = function (){

        var user = store.get('user');

        var common = this;

        if(user.type == -1){
            // 未登录
            // 显示报名
            $('#btn-entry').attr('href', 'javascript:').show().on('click', function () {
                showLogin();
            });
        } else if(user.type == 0){
            $('#btn-entry').attr('href', 'javascript:').show().on('click', function () {
                exports.changeRole();
            });
        }

        $('#hd-login').on('click', function () {
            showLogin();
        });


    };

    exports.changeRole = function (tipChange, tipOpen, url, onCancel) {
        service
            .getUserType()
            .done(function (response) {
                if (response.code === 0) {
                    var roles = response.data.roles;
                    var hasStudentRole = getHasStudentRole(roles);
                    var text = '';

                    if (hasStudentRole) {
                        text = tipChange ? tipChange : '你目前是老师身份，需要切换到学生身份才能报名';
                    }
                    else {
                        text = tipOpen ? tipOpen : '你目前是老师身份，无法报名，是否开通学生身份？';
                    }
                    // 变更身份
                    new BanLessonDialog({
                        text: text,
                        hasStudentRole: hasStudentRole,
                        next: '0',
                        onSuccess: function () {

                            location.href = url ? url : '/uk/edit#uk-nav';

                        },
                        onCancel: function () {

                            if (onCancel) {
                                onCancel();
                            }

                        },
                        noskip: false
                    });
                }
            });
    };

    /**
     * 获取是否有学生身份
     * @param  {Array} roles 身份数组
     * @return {Bool}  返回是否具有学生身份，默认为false
     */
    function getHasStudentRole(roles) {
        var studentRoleCode = "2";
        var length = roles.length;
        var hasStudentRole = false;

        if (length > 0) {
            for(var i = 0; i < length; i++) {
                if (roles[i] === studentRoleCode) {
                    hasStudentRole = true;
                    break;
                }
            }
        }

        return hasStudentRole;
    }

});