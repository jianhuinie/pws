/**
* @file 查看举报内容的弹窗
* @author huangshiming
*/
define(function (require, exports){
    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    /**查看举报成功以后的对话框
    * @param {string} option
    * @param {Function=}
    */
    function UkAdminDialog(options){
        $.extend(this, options);
        this.init();
    }

    UkAdminDialog.prototype = {
        init:function () {

            var me = this;
            var content = me.content;
            var numbers = content.length;
            var report_info = [];
            for (var i = 0; i < numbers; i++) {
                if(content[i].description.length>10){
                    var str = '<td data-title="' + content[i].description + '" data-width="20em">'
                        + content[i].description.substring(0,9) + '...'
                        + '</td></tr>';
                }else{
                    var str = '<td>' + content[i].description + '</td></tr>';

                }
                var tmp ='<tr><td>' + content[i].number + '</td>'
                        + '<td>'+content[i].type + '</td>'
                        + '<td>'+content[i].time + '</td>'
                        + str;
                report_info.push(tmp);
            }

           var contents ='<table class="main-grid">'
                         +'<thead>'
                         +'<tr>'
                         +'<td>举报选手编号</td>'
                         +'<td>举报类型</td>'
                         +'<td>举报时间</td>'
                         +'<td>举报描述</td>'
                         +'</tr></thead>'+ report_info.join('') +'</table>';


            var dialog = new Dialog({
                title: '查看举报信息',
                skinClass: 'uk-check-report',
                content: contents,
                width: 800,
            });

            var element = dialog.element;
            Tooltip.init(element.find('[data-title]'));
        }
    }

    return UkAdminDialog;
});