/**
 * Created by xuzheng on 16/1/6.
 */
define(function (require) {
    'use strict';

    var MVCObject = require('common/mvc/MVCObject');
    var observer = require('common/mvc/observer');

    var env = require('util/env');

    var key = 'info';

    var user = new MVCObject();

    //userType: 0 老师, 2 学生

    function createUserObject(type, number, name, mobile, avatar) {
        return {
            'type': type || 2,
            'number': number,
            'name': name,
            'mobile': mobile || '',
            'avatar': avatar || '',
            'role': type || ''
        }
    }

    function updateUserInfo(callback) {
        require(['zepto'], function ($) {
            $.post('/user/basicInfo', function (response) {
                if (response.code == 0) {
                    var userInfo = response.data.user_data;
                    var obj = createUserObject(
                        userInfo.user_type,
                        userInfo.user_number,
                        userInfo.show_name,
                        userInfo.mobile,
                        userInfo.show_avatar
                    );
                    user.set(key, obj);
                }
                if (callback) {
                    callback();
                }
            });
        });
    }

    user.getUserInfo = function () {
        return user.get(key) || null;
    };

    user.loginOut = function (callback) {
        if (env.app) {
            if (env.app.name == 'student') {
                require(['jockey'], function (Jockey) {
                    Jockey.on('loginOut', function () {
                        //app退出登陆后必须刷新页面才能获取最新的gsx_ready
                        if (callback && typeof callback === 'function') {
                            callback();
                        } else {
                            location.reload();
                        }
                    });
                });
            }
        }
    };

    /*
     *    "auth_token": "B4IpfHpseWZxbCpCPEBANSt-fG57fYN6byxELDwtNy1ufy1FPUA9P0VCPEJDRDkvgG56gjBIMHJTZ4lAg0JAMY0",
     *    "user": {
     *      "id": "488",
     *      "number": "371019618",
     *      "name": "颜海岛的真实姓1",
     *      "mobile": "18612080868",
     *      "sex": 0, //0女 1男
     *      "avatar_url": "http://test-img.gsxservice.com/5648_65yw0511.jpeg",
     *      "usertype": 2,//
     *      "easemob_username": "738f4914c063f955b6bf3735baf9c5cf",
     *      "realname": "颜海岛的真实姓1"
     *    }
     * */
    user.loginStudent = function (callback) {
        if (env.app) {
            if (env.app.name == 'student') {
                require(['jockey'], function (Jockey) {
                    Jockey.off('setUserInfo');
                    Jockey.on('setUserInfo', function (response) {
                        //app登陆必须刷新页面才能种cookie
                        if (response && response['auth_token']) {
                            if (callback && typeof callback === 'function') {
                                callback();
                            } else {
                                location.reload();
                            }
                        }
                    });
                    Jockey.send('getUserInfo');
                });
            } else {
                require(['common/ui'], function (ui) {
                    ui.alert('登陆失败');
                });
            }
        } else {
            require(['common/ui/LoginDialog/LoginDialog'], function (LoginDialog) {
                var loginDialog = new LoginDialog();
                var listener1 = observer.addListener(loginDialog, 'success', function () {
                    updateUserInfo();
                    loginDialog.hide();
                    callback(user.getUserInfo());
                });
                var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                    var display = this.get('display');
                    if (!display) {
                        observer.removeListener(listener1);
                        observer.removeListener(listener2);
                        loginDialog.destroy();
                    }
                });
                loginDialog.show();
            });
        }
    };
    user.loginTeacher = function () {
        if (env.app) {
            if (env.app.name == 'teacher') {
                // 老师端app是强制登陆,不需要再次登陆了
                // jockey login
            } else {
                require(['common/ui'], function (ui) {
                    ui.alert('登陆失败');
                });
            }
        } else {
            // 暂不支持老师弹框登陆
            location.href = '/static/login?usertype=0&next=' + encodeURIComponent(location.href);
        }
    };
    user.logout = function (callback) {
        if (env.app) {
            //app暂时没有提供退出登陆的接口
            require(['common/ui'], function (ui) {
                ui.alert('注销失败');
            });
        } else {
            require(['zepto'], function ($) {
                $.post('/auth/logout', function (response) {
                    if (response.code == 0) {
                        user.set(key, null);
                    }
                    callback && callback();
                });
            });
        }
    };

    user.isStudentLogin = function () {
        var userInfo = user.getUserInfo();
        return userInfo && userInfo.type == 2;
    };

    user.isTeacherLogin = function () {
        var userInfo = user.getUserInfo();
        return userInfo && userInfo.type == 0;
    };

    user.isLogin = function () {
        return user.isStudentLogin() || user.isTeacherLogin();
    };

    user.update = function (callback) {
        updateUserInfo(callback);
    };

    observer.addListener(user, key.toLowerCase() + '_changed', function () {
        observer.trigger(user, 'status_changed');
    });

    if (window.gsx_ready) {
        window.gsx_ready(function (config) {
            var userData = config.user;
            if (userData) {
                var obj = createUserObject(
                    userData.type,
                    userData.number,
                    userData.name,
                    userData.mobile,
                    userData.avatar
                );
                user.set(key, obj);
            }
        });
    } else {
        updateUserInfo();
    }

    return user;
});