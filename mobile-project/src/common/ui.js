/**
 * Created by xuzheng on 15/9/1.
 */
define(function (require, exports) {

    'use strict';

    var $ = require('zepto');
    var observer = require('common/mvc/observer');
    var MVCArray = require('common/mvc/MVCArray');

    var util_base = require('util/base');

    var initQueue = function (mvcQueue) {

        var currentDialog = null;

        function setCurrentDialog(dialog) {
            currentDialog = dialog;
            if (currentDialog) {
                currentDialog.__uiqueue = setTimeout(function () {
                    if (currentDialog.get('display') !== true) {
                        currentDialog.show();
                    }
                }, 50);
            }
        }

        function resetCurrentDialog() {
            if (currentDialog) {
                if (currentDialog.__uiqueue) {
                    clearTimeout(currentDialog.__uiqueue);
                    delete currentDialog.__uiqueue;
                }
                if (currentDialog.get('display') !== false) {
                    currentDialog.hide();
                }
                currentDialog = null;
            }
        }

        observer.addListener(mvcQueue, 'insert_at', function (element, index) {
            if (index == 0) {
                resetCurrentDialog();
                setCurrentDialog(element);
            }
        });

        observer.addListener(mvcQueue, 'remove_at', function (element, index) {
            if (index == 0) {
                resetCurrentDialog();
                var nextElement = mvcQueue.getAt(0);
                if (nextElement) {
                    setCurrentDialog(nextElement);
                }
            }
        });

        return mvcQueue;
    };

    /**
     * 队列控制
     *  实现原理是一个MVCArray，默认永远显示数组第0位的元素，元素为MVCObject，需要有display属性
     *  alert和confirm等已封装的接口会自动控制队列中的顺序
     *  如果是自定义Dialog或TextTip实例，需要手动控制该实例在数组中的插入和删除逻辑
     * */
    var dialogQueue = new MVCArray();
    exports.dialogQueue = initQueue(dialogQueue);

    var tipQueue = new MVCArray();
    exports.tipQueue = initQueue(tipQueue);

    /**
     * 弹出提示
     *
     *  注意：
     *     1. 如果传简单字符串或数字作为内容，会自动居中显示文字
     *        如果是带标签的字符串或dom节点，不会做文字居中的处理
     *     2. 所有弹框会自动进入dialogQueue显示队列自动控制显示时机，如需特殊处理请调用Dialog自行实现
     *
     * options参数说明：
     * {
     *      content:'',
     *      title:'',
     *      button:'', //按钮文字，默认为"我知道了"
     *      forceShow: true //强制显示，插入队列头部，替代当前弹出框
     * }
     *
     * 示例：
     *  ui.alert('内容').done(function(){
     *     //点击确认
     *  });
     *
     *  ui.alert({
     *      content:'内容',
     *      title:'标题',
     *      button:'按钮文字',
     *      forceShow:true
     *  }).done(function(){
     *     //点击确认
     *  });
     *
     *
     * @param {string|object} options 内容 或 options
     * return {$.Deferred}
     * */
    exports.alert = function (options) {
        var rst = $.Deferred();

        var data = {
            position: 'fixed',
            content: '',
            closeButton: false,
            maxWidth: 300,
            buttons: [
                {
                    type: 'ok',
                    content: '确定'
                }
            ]
        };

        var content;
        var forceShow = false;

        if (util_base.isObject(options)) {
            if ('content' in options) {
                data['content'] = options.content;
            }
            if ('title' in options) {
                data['title'] = options.title + '';
            }
            if ('button' in options) {
                data['buttons'][0]['content'] = options.button + '';
            }
            forceShow = !!options.forceShow;
        } else if (arguments.length > 0) {
            data['content'] = options;
        }

        if (util_base.isString(data['content']) || util_base.isNumber(data['content'])) {
            var tempContent = $('<div style="text-align: center;">' + data['content'] + '</div>');
            if (tempContent.children().length == 0) {
                data['content'] = tempContent.get(0);
            }
        }

        require(['common/ui/Dialog/Dialog'], function (Dialog) {
            var dialog = new Dialog(data);
            rst.dialog = dialog;

            observer.addListenerOnce(dialog, 'button_click', function () {
                rst.resolve();
                dialogQueue.remove(dialog);
                setTimeout(function () {
                    dialog.destroy();
                    dialog = null;
                    rst = null;
                });
            });

            if (forceShow) {
                dialogQueue.insertAt(0, dialog);
            } else {
                dialogQueue.push(dialog);
            }
        });

        return rst;
    };

    /**
     * 弹出提示
     *
     *  注意：
     *     1. 如果传简单字符串或数字作为内容，会自动居中显示文字
     *        如果是带标签的字符串或dom节点，不会做文字居中的处理
     *     2. 所有弹框会自动进入dialogQueue显示队列自动控制显示时机，如需特殊处理请调用Dialog自行实现
     *
     * options参数说明：
     * {
     *      content:'',
     *      title:'',
     *      button_ok:'',   //确认按钮文字，默认为"确定"
     *      button_cancel:'' //取消按钮文字，默认为"取消"
     *      forceShow: true //强制显示，插入队列头部，替代当前弹出框
     * }
     *
     * 示例：
     *  var uiConfirm = ui.confirm('内容');
     *  uiConfirm.done(function(){
     *     //点击确认
     *  });
     *  uiConfirm.fail(function(){
     *      //点击取消
     *  });
     *
     *  ui.confirm({
     *      content:'内容',
     *      title:'标题',
     *      button_ok:'Yes',
     *      button_cancel:'No',
     *      forceShow:true
     *  })
     *
     *
     * @param {string|object} options 内容 或 options
     * return {$.Deferred}
     * */
    exports.confirm = function (options) {
        var rst = $.Deferred();

        var data = {
            position: 'fixed',
            content: '',
            closeButton: false,
            maxWidth: 350,
            offsetY: -60,
            buttons: [
                {
                    type: 'cancel',
                    content: '取消'
                },
                {
                    type: 'ok',
                    content: '确定'
                }
            ]
        };

        var content;
        var forceShow = false;

        if (util_base.isObject(options)) {
            if ('content' in options) {
                data['content'] = options.content;
            }
            if ('title' in options) {
                data['title'] = options.title + '';
            }
            if ('button_ok' in options) {
                data['buttons'][1]['content'] = options.button_ok + '';
            }
            if ('button_cancel' in options) {
                data['buttons'][0]['content'] = options.button_cancel + '';
            }
            forceShow = !!options.forceShow;
        } else if (arguments.length > 0) {
            data['content'] = options;
        }

        if (util_base.isString(data['content']) || util_base.isNumber(data['content'])) {
            var tempContent = $('<div style="text-align: center;">' + data['content'] + '</div>');
            if (tempContent.children().length == 0) {
                data['content'] = tempContent.get(0);
            }
        }

        require(['common/ui/Dialog/Dialog'], function (Dialog) {
            var dialog = new Dialog(data);
            rst.dialog = dialog;

            observer.addListenerOnce(dialog, 'button_click', function (e, buttonInfo) {
                if (buttonInfo.type == 'ok') {
                    rst.resolve();
                } else {
                    rst.reject();
                }
                dialogQueue.remove(dialog);
                setTimeout(function () {
                    dialog.destroy();
                    dialog = null;
                    rst = null;
                });
            });
            if (forceShow) {
                dialogQueue.insertAt(0, dialog);
            } else {
                dialogQueue.push(dialog);
            }
        });

        return rst;
    };


    /**
     * 文字浮层提示
     * 说明：
     *  1. 提示文字显示出1500ms后会自动隐藏
     *  2. 所有提示会自动进入tipQueue显示队列自动控制显示时机，如需特殊处理请调用TextTip自行实现
     *
     * 示例：
     * ui.remind('提示内容').done(function(){
     *      //提示完成
     * });
     *
     * @param {string} text 文字内容
     * return {$.Deferred}
     *
     * */
    exports.remind = function (text) {
        var rst = $.Deferred();

        var showTime = 1500;

        require(['common/ui/TextTip/TextTip'], function (TextTip) {
            var textTip = new TextTip({
                'text': text
            });

            var listener = observer.addListener(textTip, 'display_changed', function () {
                var display = textTip.get('display');
                if (!display) {
                    observer.removeListener(listener);
                    listener = null;
                    tipQueue.remove(textTip);
                    rst.resolve();
                    setTimeout(function () {
                        textTip.destroy();
                        textTip.ui_timer = null;
                        textTip = null;
                        rst = null;
                    });
                } else {
                    textTip.ui_timer = setTimeout(function () {
                        textTip.hide();
                    }, showTime);
                }
            });
            tipQueue.push(textTip);
            var currentTip = tipQueue.getAt(0);
            if (currentTip != textTip) {
                clearTimeout(currentTip.ui_timer);
                currentTip.hide(true);
            }
        });

        return rst;
    };

});