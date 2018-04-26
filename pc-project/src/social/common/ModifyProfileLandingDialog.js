/**
 * 需要修改昵称或者头像
 */
define(function (require, exports) {

    var Dialog = require('cobble/ui/Dialog');
    var getUrl = window.require.toUrl;

    var TPLS = {
        'no-avatar': '<div class="text-center"><img width="88px" src="' + getUrl('./img/social/empty_nickname.png') + '"/></div><div class="text-center tip"><span class="hilight">上传个人头像</span>后就可以玩转社区啦~</div><div class="text-center"><a href="javascript:void(0);" class="btn btn-primary btn-action">现在就去</a></div>',
        'no-nickname': '<div class="text-center"><img width="88px" src="' + getUrl('./img/social/empty_nickname.png') + '"/></div><div class="text-center tip"><span class="hilight">填写昵称</span>后就可以玩转社区啦~</div><div class="text-center"><a href="javascript:void(0);" class="btn btn-primary btn-action">现在就去</a></div>',
        'duply-nickname': '<div class="text-center"><img width="88px" src="' + getUrl('./img/teacher/comment_empty.png') + '"/></div><div class="text-center tip">我们的口号是：不要撞衫、拒绝重名</div><div class="text-center"><a href="javascript:void(0);" class="btn btn-primary btn-action">马上取个新名字</a></div>'
    }

    /**
     * 对话框构造函数
     * @param {Object} options
     * @property {String} options.tpl 模板类型
     */
    function ModifyProfileLandingDialog(options) {

        options = $.extend({tpl: 'no-nickname'}, options);

        var dialog = new Dialog({
            content: TPLS[options.tpl],
            title: '温馨提示',
            width: 402,
            skinClass: 'modify-landing-dialog'
        });

        dialog.element.on('click', '.btn-action', function () {
            dialog.hide();
            window.open('/forum/userUploadAvatar', '_blank');
        });
    };

    return ModifyProfileLandingDialog;
});