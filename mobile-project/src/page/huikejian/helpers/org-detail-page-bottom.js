define(function(require, exports) {
    var ui = require('common/ui');
    var appController = require('common/app');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var gzBtn = null;
    exports.init = function(orgNum) {
        var $bottom = $('.bottom');

        if (appController.isApp()) {
            $('body').on('click', 'a', function(e) {
                var me = $(this);
                if (me.closest('tab').length != 0) {
                    location.href = me.attr('href');
                    e.preventDefault();
                    return false;
                }
            });
        }

        var initBottomBtnWidth = function() {
            var childDom = $bottom.find('.item');
            var twidth = parseInt(($bottom.width() - 20) / childDom.length);
            childDom.each(function() {
                $(this).width(twidth);
            });
        };
        initBottomBtnWidth();

        //机构信息
        var $orgInfoItem = $bottom.find('.org-information');
        var isHidden = true;
        $orgInfoItem.find('.handle').click(function() {
            var $menu = $orgInfoItem.find('.menu-container');
            if (isHidden) {
                $menu.show();
            } else {
                $menu.hide();
            }
            isHidden = !isHidden;
        });
        var $focus = $bottom.find('.org-focus');
        if (!$focus.length) {
            return
        }
        var currentVersionNumber = appController.version2Number(appController.getAppVersion());
        var supportVersionNumber = appController.version2Number('3.0.0');
        if (currentVersionNumber < supportVersionNumber) {
            $focus.hide();
            return false;
        }

        $focus.length && $focus.on('click', function() {
            var $me = $(this);
            gzBtn = $focus.find('.fixed-bottom-txt');
            if (gzBtn.html().indexOf("请稍候") > -1) {
                return;
            }
            var curDom = $(this);
            var flag = Number(curDom.attr('data-focused') == 0);

            function setAjaxFocused(flag, callback) {
                gzBtn && gzBtn.html('请稍候...');
                $.ajax({
                    url: '/focus/setFocus',
                    data: {
                        status: flag,
                        user_number: orgNum,
                        user_role: 6
                    },
                    method: 'post',
                    dataType: 'json'
                }).done(function(e) {
                    callback && callback(e);
                });
            }

            if (!flag) {
                ui.confirm({
                    content: '取消关注后，该联系人的消息将以陌生人的身份发给你'
                }).done(function() {
                    setAjaxFocused(flag, setFocused);
                });
            } else {
                setAjaxFocused(flag, setFocused);
            }

            function setFocused(response) {
                if (response.code == 401 || response.code == 200002) {
                    //未登录
                    if (appController.isApp()) {
                        appController.getUserInfo(function() {
                            setAjaxFocused(flag, setFocused);
                        });
                    } else {
                        var loginDialog = LoginDialog.getInstance();
                        observer.addListener(loginDialog, 'success', function() {
                            setAjaxFocused(flag, setFocused);
                        });
                        observer.addListener(loginDialog, 'display_changed', function() {
                            var display = this.get('display');
                            if (!display) {
                                loginDialog.destroy();
                            }
                        });
                        loginDialog.show();
                    }
                    flag = !flag;
                } else if (response.code == 0) {
                    curDom.attr('data-focused', flag);
                    ui.remind(response.msg);
                } else {
                    ui.remind(response.msg);
                    flag = !flag;
                }
                gzBtn.html(flag == 1 ? "已关注" : "关注");
                var addClass = flag == 1 ? "single_focus" : "no_focus";
                var removeClass = flag == 1 ? "no_focus" : "single_focus";
                $me.addClass(addClass).removeClass(removeClass);
            }

        });
    }
});
