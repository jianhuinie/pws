/**
 * @file 已登陆用户 － 留单弹窗(个体老师) － 至客服
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var Captcha = require('common/component/Captcha');
    // var Editor = require('common/component/Editor');
    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');

    /**
     * 浅注册类
     *
     * @param {Object} options 配置信息
     * @property {string} options.title 弹窗的title
     * @property {string} options.pageType 来源 teacher-detail：老师主页
                                               one2one-detail：一对一详情页
                                               class-course-detail：班课详情页

     * @property {Function=} options.onSuccess 登录成功后得回调
     */
    function AdvisoryDialog(options) {
        $.extend(this, AdvisoryDialog.defaultOptions, options);
        this.init();
    }

    AdvisoryDialog.prototype = {

        init: function () {

            var me = this;

            me.dialog = new Dialog({
                //默认为5
                zIndex: me.zIndex || 5,
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#kf-advisory-dialog-form').html(),
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            // 图形验证码 - 每次换一个验证码
            var captcha = new Captcha({
                element: element.find('#captcha'),
                captchaName: 'advisory',
                autoValidate: true,
                skipAuth: false
            });

            /*/ 想学什么
            me.editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 50
            });*/

            me.validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    mobile: {
                        errors: {
                            required: '请输入手机号',
                            pattern: '请填写格式正确的手机号'
                        }
                    },
                    info: {
                        errors: {
                            maxlength: '请控制在50字内',
                            required: '请输入您想要的内容',
                            pattern: '请填写正确的学习内容'
                        }
                    },
                    username: {
                        errors: {
                            required: '请输入姓名',
                            pattern: '请填写格式正确的姓名'
                        }
                    }
                }
            });
            // 保存表单
            me.saveBtn = new SaveButton({
                element: element.find('.btn-save'),
                save: function () {
                    var url = 'http://pb0.genshuixue.com/gs.gif';
                    var params = {
                        type: 'recommend',
                        stype: '2',
                        client: 'PC',
                        page_type: leaveMessPageType,
                        track_id: cookie.get('__track_id__'),
                        _timestamp: new Date().getTime(),
                        user_number: store.get('user').number,
                        user_role: store.get('user').type,
                        location_type: leaveMessPageType+'_2',
                        tid: store.get('teacherId'),
                        cid: store.get('courseId'),
                    };
                    WAT.send(url, params);

                    if (me.validator.validate()) {

                        var data = form.parse(element);

                        data.pageType = me.pageType;

                        service
                        .addRecommendRecord({
                            userName: data.username,
                            mobile: data.mobile,
                            info: data.info,
                            pageType: data.pageType,
                            source: 'genshuixue',
                            // captcha: data.captcha,
                            // captchaName: 'advisory',
                            detailUrl: window.location.href
                        },
                        {
                            errorHandler: {
                                '1000070': function (response) { // 1分钟超过3次提交
                                    captcha.change();
                                    element.find('#captcha').show();
                                }
                            }
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('恭喜您' + me.title + '成功', function() {
                                    me.dialog.hide();
                                    me.onSuccess();
                                });
                            }
                        });


                    }

                }
            });

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    AdvisoryDialog.defaultOptions = {
        title: '预约',
        width: 510,
        onSuccess: $.noop,
        skinClass: 'kf-advisory-dialog'
    };


    return AdvisoryDialog;

});