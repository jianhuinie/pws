/**
 * 进入课堂对话框
 * @author liucong
 */
define(function (require, exports) {

    'use strict';


    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');

    function openwin(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        document.body.appendChild(a);
        a.click();
    }


    //判断是否是mac系统，是返回true，否则返回false
    function isMacOS(){
        var platform = navigator.platform;
        if(platform.indexOf("Mac") > -1){
            return true;
        }else{
            return false;
        }
    }

    /**正在打开客户端dialog
     *options{}
     */
    function OpeningDialog(options) {
        $.extend(this, options);
        console.log(options);
        this.init();
    }

    OpeningDialog.prototype={
        constructor: OpeningDialog,
        init : function(){
            var thiz = this;
            var content = "<div class='opening-enter-classroom'>正在尝试打开客户端<i class='icon loading'></i>" +
               // "<a class='openlocal' style='display:none;' target='_blank' href="+thiz.openUrl+" ></a>" +
                "</div>";
            var dialog = new Dialog({
                width: 300,
                title : "友情提示",
                content : content
            });

            dialog.show();
            setTimeout(function(){
                dialog.hide();
                new InstallDialog({url : thiz.webUrl});
            },5000);
        }
    }

    /**正在打开客户端dialog
     *options{}
     */
    function GoDialog(options) {
        $.extend(this, options);
        this.init();
    }
    GoDialog.prototype={
        constructor:GoDialog,
        init : function(){
            var dialog = new Dialog({
                width: 400,
                title : "友情提示",
                content : '<div class="click-enter-classroom">' + $('#click-enter-classroom').html() + '</div>'
            });
            var element = dialog.element;
            dialog.show();
            var time = 3;
            var intervarl = setInterval(function(){
                element.find(".time").text(time--);
                if(time < 0){
                    clearInterval(intervarl);
                    dialog.hide();
                }
            },1000);
        }
    }



    /**请安装最新客户端dialog
     *options{}
     */
    function InstallDialog(options){
        $.extend(this,options)
        this.init();
    }
    InstallDialog.prototype={
        constructor : InstallDialog,
        init : function() {
            var thiz = this;
            var url = thiz.url;
            if(isMacOS()){
                var dialog = new Dialog({
                    width : 350,
                    title : "友情提示",
                    content : '<div class="enter-classroom">' + $('#enter-mac-classroom').html() + '</div>'
                });

                var element = dialog.element;
                element
                    .on("click",'.other',function(){
                        $(this).hide();
                        element.find(".website").attr("href",url);
                        element.find('.web-class').show();
                    })
                    .on("click",'.download',function(){
                        dialog.hide();
                        new GoDialog();
                    })
                    .on("click",".website",function(){
                        dialog.hide();
                    });
                dialog.show();
            }
            else {
                var dialog = new Dialog({
                    width : 350,
                    title : "友情提示",
                    content : '<div class="enter-classroom">' + $('#enter-classroom').html() + '</div>'
                });

                var element = dialog.element;
                element
                    .on("click",'.other',function(){
                        $(this).hide();
                        element.find(".website").attr("href",url);
                        element.find('.web-class').show();
                    })
                    .on("click",'.download',function(){
                        dialog.hide();
                        new GoDialog();
                    })
                    .on("click",".website",function(){
                        dialog.hide();
                    });
                dialog.show();
            }
        }
    }

    /**请先使用网页版dialog
     *options{}
     */
    function WebSiteDialog(options){
        $.extend(this,options)
        this.init();
    }
    WebSiteDialog.prototype={
        constructor: WebSiteDialog,
        init : function() {
            var thiz = this;
            var data = thiz.data || '';   // data-online 数据
            var url;
            if (thiz.data.location) {
                var url = thiz.data.location
            }
            else {
                var url = ""
            }

            var webUrl = "";
            if(thiz.type == "org") { // 是机构还是老师，org为机构，'' 为课程或老师
                webUrl = data.webUrl;
            }
            else {
                webUrl = data.location;
            }

            var wurl = 'genshuixue://'
                + 'userdbid=20;username=1;usertype=1;classid=66;classname=1;verifyurl=VerifyUrl/VerifyUrl;classtype=1;clientlivetype=1;'
                + $.param({urlpath: data.location,token: data.token,ts: data.timestamp});
            openwin(wurl);

            var dialog = new Dialog({
                width : 350,
                title : "友情提示",
                closeSelector: '> .close',
                content : '<div class="enter-classroom">'+ $('#enter-mac-classroom').html() + '</div>'
            });

            var element = dialog.element;
            element
            .on("click", ".dialog-close", function(){
                dialog.hide();
            })
            .on("click", ".attend", function(){
                dialog.hide();
                new OpeningDialog({webUrl : webUrl});
            })
            .on("click", ".other", function(){
                var dialog2 = new Dialog({
                    width : 350,
                    title : "友情提示",
                    closeSelector: '> .close',
                    content : '<div class="enter-classroom">'+ $('#enter-mac-classroom2').html() + '</div>'
                });
                var element2 = dialog2.element;
                element2.find(".webclass").attr("href",url);
                element2
                .on("click",".dialog-close",function(){
                    dialog.hide();
                    dialog2.hide();
                })
                .on("click",".other",function(){
                    dialog2.hide();
                    dialog.show();
                });
            });

            dialog.show();
        }
    }


    /**
     * 构造函数
     * @param {Object} options
     * @property {Object} options.data
     */
    function EnterClassroomDialog(options) {

        setDefaultOptions(options);

        $.extend(this, options);

        this.init();
    }

    EnterClassroomDialog.prototype = {

        constructor: EnterClassroomDialog,

        init: function () {

            var me = this;
            var data = me.data;   // data-online 数据
            var webUrl = "";
            if(me.type == "org") { // 是机构还是老师，org为机构，'' 为课程或老师
                webUrl = data.webUrl;
            }
            else {
                webUrl = data.location;
            }

            var url = 'genshuixue://'
                + 'userdbid=20;username=1;usertype=1;classid=66;classname=1;verifyurl=VerifyUrl/VerifyUrl;classtype=1;clientlivetype=1;'
                + $.param({urlpath: data.location,token: data.token,ts: data.timestamp});
            openwin(url);
            new OpeningDialog({webUrl : webUrl});
        }
    }

    function setDefaultOptions(options) {

        $.each(options, function(key, value) {
            if (value === undefined) {
                options[key] = '';
            }
        });

    }

    return EnterClassroomDialog;
});