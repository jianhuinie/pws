/**
 * @file 默认头像选择弹出框
 * @author zhangshaolong
 */
define(function (require) {

    'use strict';

    var jquerify = require('cobble/function/jquerify');

    var Dialog = require('cobble/ui/Dialog');

    /**
     * 默认头像选择
     *
     * @param {Object} options
     * @property {?Function} options.onSelected 选中某个头像
     */
    function DefaultAvatarDialog(options) {
        $.extend(this, options);
        this.init();
    }

    DefaultAvatarDialog.prototype = {

        init: function () {

            var me = this;

            var dialog = this.dialog = new Dialog({
                title: '选择默认头像',
                content: '<div style="width: 378px; max-height: 326px; overflow-y: auto">'
                        +     '<div class="avatar-container male-avatar-container">'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man.png"><img src="http://img.gsxservice.com/headpic_man.png"/><div class="active"><div class="mask"></div><div class="icon icon-check-circle"></div></div></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_01.jpg"><img src="http://img.gsxservice.com/headpic_man_01.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_02.jpg"><img src="http://img.gsxservice.com/headpic_man_02.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_03.jpg"><img src="http://img.gsxservice.com/headpic_man_03.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_04.jpg"><img src="http://img.gsxservice.com/headpic_man_04.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_05.jpg"><img src="http://img.gsxservice.com/headpic_man_05.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_06.jpg"><img src="http://img.gsxservice.com/headpic_man_06.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_07.jpg"><img src="http://img.gsxservice.com/headpic_man_07.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_man_08.jpg"><img src="http://img.gsxservice.com/headpic_man_08.jpg"/></div>'
                        +    '</div>'
                        +    '<div class="avatar-container female-avatar-container">'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman.png"><img src="http://img.gsxservice.com/headpic_woman.png"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_01.jpg"><img src="http://img.gsxservice.com/headpic_woman_01.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_02.jpg"><img src="http://img.gsxservice.com/headpic_woman_02.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_03.jpg"><img src="http://img.gsxservice.com/headpic_woman_03.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_04.jpg"><img src="http://img.gsxservice.com/headpic_woman_04.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_05.jpg"><img src="http://img.gsxservice.com/headpic_woman_05.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_06.jpg"><img src="http://img.gsxservice.com/headpic_woman_06.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_07.jpg"><img src="http://img.gsxservice.com/headpic_woman_07.jpg"/></div>'
                        +       '<div class="default-avatar" data-avatar-name="headpic_woman_08.jpg"><img src="http://img.gsxservice.com/headpic_woman_08.jpg"/></div>'
                        +    '</div>'
                        + '</div>'
                        + '<div class="button-container"><button class="btn btn-primary">确认选择</button></div>'
                        + '<div class="no-find-my-favor">没有找到合适的默认头像？<a class="text-info" href="http://www.genshuixue.com/guide/feedback?a=feedback" target="_blank">马上告诉我们</a>你需要什么头像吧>></div>',
                skinClass: 'default-avatar-dialog'
            });

            var activeNode = dialog.element.find('.active');
            dialog.element
            .on('click', '.default-avatar', function () {
                if (activeNode.parent()[0] !== this) {
                    $(this).append(activeNode);
                }
            })
            .on('click', '.btn-primary', function () {
                me.emit('selectdefaultavatar', {
                    avatarPath: activeNode.prev().attr('src'),
                    avatarName: activeNode.parent().data('avatar-name')
                });
            });

            if ('' + this.type === '0') {
                dialog.element.find('.male-avatar-container').hide();
            }
            if ('' + this.type === '1') {
                dialog.element.find('.female-avatar-container').hide();
            }

            if(this.avatar) {
                dialog.element.find('.default-avatar[data-avatar-name="' + this.avatar + '"]')
                    .append(activeNode);
            }
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    jquerify(DefaultAvatarDialog.prototype);

    return DefaultAvatarDialog;
});