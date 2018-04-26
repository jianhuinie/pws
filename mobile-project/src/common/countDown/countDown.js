/**
 * Created by chenmo on 15/9/6.
 */
define(function (require, exports) {

    'use strict';

    var util = require('common/util');


    var cssCountDown = require('text!./countDown.styl');
    var htmlCountDown = require('text!./countDown.tpl');

    var initCss = false;

    function getFormatedNum(num) {
        var str = '';
        if (num < 10) {
            str = '0' + num;
        }
        else {
            str = str + num;
        }
        return str;
    }

    function setTime(container, options) {
        if (!initCss) {
            initCss = true;
            util.insertCssText(cssCountDown);
        }
        container.append(htmlCountDown);

        var date = new Date();
        var startTime = options.start;
        var endTime = options.end;
        var currentTime = Math.floor(date.getTime() / 1000);
        var nMS;

        if (currentTime - startTime < 0) {
            container.find('.notStart').show();
            container.find('.start').hide();
            nMS = startTime - currentTime;//取得距活动开始的秒数
        }
        else if (currentTime - startTime >= 0 && currentTime - endTime < 0) {
            container.find('.start').show();
            container.find('.notStart').hide();
            nMS = endTime - currentTime;//取得距活动结束的秒数
        }
        else {
            container.find('.start').show();
            container.find('.notStart').hide();
            nMS = 0;//当前时间超过结束时间
        }

        var remainD = getFormatedNum(Math.floor(nMS / (60 * 60 * 24)));//获得剩余天数
        var remainH = getFormatedNum(Math.floor(nMS / (60 * 60 )) % 24);//获得剩余小时数
        var remainM = getFormatedNum(Math.floor(nMS / 60) % 60);//获得剩余分钟数
        var remainS = getFormatedNum(Math.floor(nMS % 60));//获得剩余秒数

        if (remainD == 0) {
            container.find('.lessThanADay').show();
            container.find('.moreThanADay').hide();

            container.find('.CD_Hours_L').text(remainH);
            container.find('.CD_Minutes_L').text(remainM);
            container.find('.CD_Seconds_L').text(remainS);
        }
        else {
            container.find('.moreThanADay').show();
            container.find('.lessThanADay').hide();

            container.find('.CD_Day').text(remainD);
            container.find('.CD_Hours_M').text(remainH);
            container.find('.CD_Minutes_M').text(remainM);
        }


    }


    //页面初始化完成后调用init函数
    //注意：store要在init后才可以get到php传出的数据
    exports.init = function (container, options) {

        container.css('color', '#9d9e9e');

        setTime(container, options);
        setInterval(function () {
                container.empty();
                setTime(container, options);
            },
            1000
        );

    };
});