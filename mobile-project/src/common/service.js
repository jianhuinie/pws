/**
 * Created by xuzheng on 16/1/6.
 */
define(function (require, exports) {
    'use strict';

    var app = require("common/app");
    var defaultErrorMessage = '网络请求失败, 请稍后重试';
    var app = require('common/app');
    var user = require('common/user');

    function alertErrorInfo(response) {
        require(['common/ui'], function (ui) {
            ui.alert({
                'content': response.message || response.msg || defaultErrorMessage,
                'button': '确定'
            });
        });
    }

    function send(type, url, data, callback) {
        function handler(res) {
            var disableError = false;
            if (callback) {
                disableError = callback(res) === false;
            }
            //callback返回false
            if (!disableError){
                // 未登陆
                if (res.code === 401) {
                    require(['common/ui'], function (ui) {
                        // hurry: 和钱丽沟通统一去掉弹框，直接登录
                        // ui.confirm({
                        //     content: '您尚未登录，请前往登录',
                        //     button: '登陆'
                        // }).done(function () {
                            if (app.isStudentApp()) {
                                user.loginStudent();
                            } else if (app.isTeacherApp()) {
                                user.loginTeacher();
                            } else {
                                // document.referer不带hash信息
                                location.href = res.redirect_url + encodeURIComponent(location.hash);
                            }
                        // });
                    });

                    return false;
                }
                // 302直接跳转
                if (res.code === 302) {
                    location.href = res.redirect_url;
                    return;
                }
                // code为888889是竞品老师评价的时候的错误码
                // code为1000111发送验证码时，需要出图形验证码的错误码
                // code为110056发送验证码时，图形验证码无效
                if (
                    res.code !== 0
                    && res.code !== 1000111
                    // && res.code !== 110056
                    && (res.code !== 990000 && res.code !== 888889)
                ) {
                    alertErrorInfo(res);
                }
            }
        }

        return $[type == 1 ? 'get' : 'post'](url, data, function (res) {
                    handler(res);
                }).fail(function () {
                    handler({
                        code: -1
                    });
                });
    }

    exports.get = function (url, data, callback) {
        return send(1, url, data, callback);
    };

    exports.post = function (url, data, callback) {
        return send(2, url, data, callback);
    };

    /**
     * 视频课详情页评价点赞
     * @param {Object} data
     * @property {string} data.id  评论id
     * @property {string} data.action 点赞1/取消赞0
     * @property {string} data.type 点赞1/取消赞0
     * */
    exports.videoCommentPraise = function (data) {
        return post('/video_course/do', data);
    };

    /**
     * 视频课详情页点击加载更多评价
     * @param {Object} data
     * @property {string} data.page 页码数
     * @property {string} data.type  评价标签类型
     * @property {string} data.number 视频课number
     * */
    exports.videoMoreComment = function (data) {
        return post('/video_course/ajax_comment_video', data);
    };

    /**
     * 视频课追加评论
     */
    exports.addCommentAddition = function (data) {
        return post('/comment/addCommentAddition', data);
    };

    /**
     * 发表评论
     */
    exports.publishComment = function (data) {
        return post('/comment/addComment', data);
    };

    function errorHandler(response) {
        if (response.code !== 0) {
            if (+response.code !== 700000 && +response.code !== 888889) {
                alertErrorInfo(response);
            }
        }

        return response;
    }

    function post(url, data, sync) {
        return $
            .ajax({
                url: url,
                data: data,
                method: 'post',
                dataType: 'json',
                async: sync ? false : true
            })
            .done(errorHandler);
    }

    function get(url, data, sync) {
        return $
            .ajax({
                url: url,
                data: data,
                method: 'get',
                dataType: 'json',
                async: sync ? false : true
            })
            .done(errorHandler);
    }

    /**
     * 视频课详情页发送第一次播放请求
     * @param  {Object} param
     * @property {string} param.section_id  视频id
     * @property {string} param.number  课程number
     * @return {Promise}
     */
    exports.sendPlay = function (param) {
        return post('/video_course/add_count', param);
    };

    /**
     * 检查订单状态
     */
    exports.checkOrderStatus = function (param) {
        return post(
            '/pay/checkClassOrder',
            {
                course_number: param.number
            }
        );
    };

    /**
     * 新班课详情页收藏接口
     * code
     * */
    exports.favorCollection = function (param) {
        var data = {
            'number': param.number,
            'type': param.type,
            'value': param.value
        };
        return post(
            '/collection/addFav',
            data
        );
    };
});
