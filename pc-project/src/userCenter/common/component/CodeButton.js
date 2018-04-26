/**
 * @file 发送验证码按钮
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var etpl = require('cc/util/etpl');
    var Timer = require('cc/util/Timer');

    return Ractive.extend({
        template: require('html!./CodeButton.html'),
        data: function () {
            return {
                options: {
                    text: '',
                    className: 'code-button',
                    disabled: false,
                    countdown: false,
                    countdownText: '${second}秒后可再次发送',
                    countdownSecond: 60
                }
            };
        },
        oninit: function () {

            var me = this;

            var text = me.get('options.text');
            var countdownText = me.get('options.countdownText');

            var render = etpl.compile(countdownText);
            var time;

            var timer =
            me.timer = new Timer({
                task: function () {
                    if (time === 1) {
                        me.set('options.countdown', false);
                        return;
                    }
                    me.set(
                        'options.text',
                        render({
                            second: --time
                        })
                    );
                },
                interval: 1000
            });

            me.observe('options.countdown', function (countdown) {
                if (countdown) {
                    time = me.get('options.countdownSecond');
                    me.set({
                        'options.disabled': true,
                        'options.text': render({
                            second: time
                        })
                    });
                    timer.start();
                }
                else {
                    me.set({
                        'options.disabled': false,
                        'options.text': text
                    });
                    timer.stop();
                }
            });

        },
        onteardown: function () {
            this.timer.dispose();
        }
    });

});