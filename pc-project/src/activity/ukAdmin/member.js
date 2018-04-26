/**
 * @file 中英活动后台-选手管理
 * @author wangxu
 * @change huangshiming
 */

define(function(require, exports) {

    'use strict';
    var service = require('common/service');
    var CheckReportDialog = require('common/component/UkAdminDialog');

    exports.init = function (){
        var container = $('.main-grid');
        var Dialog = require('cobble/ui/Dialog');

        container
        .on('click','.action-report',function() { //查看举报的信息
            var cDom = $(this);
            var number = cDom.attr('number');
            service
            .report({
                number: number
            })
            .done(function (response) {
                if (response.code === 0){
                    if (response.data.length == 0){
                        alert('该选手无举报记录');
                    } else {
                        var content = response.data;
                        new CheckReportDialog({
                            content:content
                        });
                    }
                }
            });
        })

        .on('click','.action-frozen',function() {
            var cDom = $(this);
            var number = cDom.attr('number');
            service
            .frozen({
                number: number
            })
            .done(function (response) {
                if (response.code === 0 ) {
                    if(response.data.result == true) {
                        alert('操作成功');
                        if (response.data.status == 0) {
                            cDom.html('冻结选手');
                        } else if (response.data.status == 1){
                            cDom.html('恢复权限');
                        }
                    }
                }
            });
        });
    }

});