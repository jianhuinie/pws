define(function(require, exports) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var weixinRender = template.compile(require('text!./weixinMask.tpl'));
    var container = $('#page_main');
    var flagArray = ['share', 'open'];
    var deviceRatio = window.devicePixelRatio;

    exports.openMask = function(flag) {
        var MakeMask =  function (flag) {
            this.flag = flag;
        };

        MakeMask.prototype.makeCanvas = function () {
            // 获取canvas容器
            var canvasTable = $('.canvas')[0];
            // 创建一个画布
            var ctx = canvasTable.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.moveTo(55, 30);
            ctx.lineTo(80, 20);
            ctx.lineTo(85, 65);
            ctx.lineTo(60, 28);
            ctx.lineTo(82, 50);
            ctx.lineTo(70, 27);
            ctx.lineTo(81, 45);
            ctx.lineTo(80, 20);
            ctx.quadraticCurveTo(45, 100, 70, 180);
            ctx.fill();
            ctx.restore();
            ctx.stroke();
        };
        MakeMask.prototype.show = function () {
            var wxMaskBox = container.find('.wxMask-box');
            if (flagArray.indexOf(this.flag) < 0) {
                return;
            }
            
            if (wxMaskBox.length && 
            wxMaskBox.attr('data-flag') === this.flag) {
                // 已经有这个遮罩了(并且是重复的遮罩)
                wxMaskBox.show();
            } else {
                var weixinMaskRender = weixinRender({
                    flag: this.flag
                });
                if (!wxMaskBox.length) {
                    // 遮罩不存在
                    wxMaskBox = $('<div class="wxMask-box"></div>');
                    // 保证页面只重绘一次
                    wxMaskBox
                        .attr('data-flag', this.flag)
                        .html(weixinMaskRender);
                    container
                        .append(wxMaskBox)
                        .find('.wxMask-box')
                        .show(); 
                } else {
                    // 遮罩存在,flag变化
                    wxMaskBox
                        .attr('data-flag', this.flag)
                        .html(weixinMaskRender)
                        .show();
                }
                // 绘制箭头
                this.makeCanvas();
            }
            container.on('click', '.wxMask-box', function () {
                $(this).hide();
            });
        };

        var newMakeMask = new MakeMask(flag);
        newMakeMask.show();
    };
});