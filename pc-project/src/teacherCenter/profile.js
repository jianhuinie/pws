/**
 * @file 个人信息
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var baseInfo = require('./profile/baseInfo');
    var background = require('./profile/background');
    var experience = require('./profile/experience');
    var success = require('./profile/success');
    var other = require('./profile/other');
    var floatHelp = require('teacherCenter/component/floatHelp');

    var curEditModule;
    var moduleMap = {
        'baseInfo': baseInfo,
        'background': background,
        'other': other
    };

    /*
     * @param {string} module 用户当前点击的模块
     *
     * 返回true代表应该保存
     * false代表不用保存，可以继续执行
     */
    function shouldSave(module) {
        // 如果当前有edit状态的module，先提示保存
        if (curEditModule) {
            confirm({
                title: '温馨提示',
                content: '你有资料还没有保存，需要小秘书帮你保存吗？',
                buttons: [
                    {
                        text: '保存',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            curEditModule.save();
                        }
                    },
                    {
                        text: '不保存',
                        handler: function () {
                            this.hide();
                            curEditModule.cancel(); // 关闭当前模块
                            curEditModule = module;
                            module.status('edit');
                        }
                    }
                ]
            });
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 初始化
     */
    exports.init = function () {

        // 该页面展示上报
        var params = {
            type: 't_backstage',
            stype: 'tpc_einf',
            client: 'PC'
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

        var container = $('#content');

        baseInfo.init();
        background.init();
        experience.init();
        success.init();
        other.init();

        if (baseInfo.status() == 'edit') {
            curEditModule = baseInfo;
            baseInfo.edit();
        }

        // 只能有一个module处于edit状态。在这里统一接收各个module触发的状态变更event。
        container
        .on('display', function (e, data) {

            var name = data.name;
            var module = moduleMap[name];

            module.status('display');
            curEditModule = null;
        });

        container
        .on('edit', function (e, data) {

            var name = data.name;
            var module = moduleMap[name];

            if (shouldSave(module)) {
                return;
            }
            else {
                curEditModule = module;
                module.status('edit');
            }

        });
        floatHelp.init();
    };


});