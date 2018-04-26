/**
 * @file 数据中心访问数据
 * @author wth
 */
define(function (require, exports) {

    'use strict';

    var toNumber = require('cc/function/toNumber');
    var plus = require('cc/function/plus');
    var minus = require('cc/function/minus');

    var echarts = require('echarts');
    var service = require('../service');

    require('echarts/chart/line');
    require('echarts/chart/pie');

    var underscore = require('underscore');
    var img = require.toUrl('./image/nono.jpg');
    var chartline, chartpie;

    function sumPercent(array) {
        var result = 0;
        for (var i = 0, len = array.length; i < len; i++) {
            result = plus(
                result,
                toNumber(array[i], 0, 'float')
            );
        }
        return result;
    }

    function transformPieData(values, texts, percents) {
        // 取前五条数据
        // var length = 5;

        // if (values.length > length) {
        //     values.length = texts.length = percents.length = length - 1;
        //     var leftValue = minus(100, sumPercent(values));
        //     var leftPercent = minus(100, sumPercent(percents));
        //     values.push(
        //         Number(leftValue)
        //     );
        //     percents.push(
        //         Number(leftPercent).toFixed(2)+ '%'
        //     );
        //     texts.push('其它');
        // }
        return {
            value: values,
            origin: texts,
            order_rate: percents
        }
    }

    // 画表
    function canvasLine(data, title) {
        chartline.setOption ({
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: 50,
                y: 10,
                x2: 40,
                y2: 30
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: data.date
            }],
            yAxis: [{
                type: 'value'
            }],
            series : [{
                name: title,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#3dca6d',
                        lineStyle: {
                            color: "#3dca6d",
                            shadowColor: '#3dca6d'
                        },
                        areaStyle:{
                            type: 'default',
                            color: '#c2f5c6'
                        }
                    }
                },
                data: data.value
            }]
        });
    }

    // 画饼
    function canvasPie(data) {
        chartpie.setOption ({
            tooltip: {
                trigger: 'item',
                formatter : '{b}:{d}%'
            },
            series : [{
                type: 'pie',
                radius: ['50%', '70%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: [
                    {
                        value: data.value[0],
                        name: data.origin[0],
                        itemStyle: { normal: {color:'#ff5850'} }
                    },
                    {
                        value: data.value[1],
                        name: data.origin[1],
                        itemStyle: { normal: {color:'#FC6C21'} }
                    },
                    {
                        value: data.value[2],
                        name: data.origin[2],
                        itemStyle: { normal: {color:'#FDB840'} }
                    },
                    {
                        value: data.value[3],
                        name: data.origin[3],
                        itemStyle: { normal: {color:'#43B244'} }
                    },
                    {
                        value: data.value[4],
                        name: data.origin[4],
                        itemStyle: { normal: {color:'#64B5F6'} }
                    },
                    {
                        value: data.value[5],
                        name: data.origin[5],
                        itemStyle: { normal: {color: 'rgba(255,61,58,0.5)'} }
                    },
                    {
                        value: data.value[6],
                        name: data.origin[6],
                        itemStyle: { normal: {color: 'rgba(255,85,0,0.5)'} }
                    },
                    {
                        value: data.value[7],
                        name: data.origin[7],
                        itemStyle: { normal: {color: 'rgba(255,173,13,0.5)'} }
                    },
                    {
                        value: data.value[8],
                        name: data.origin[8],
                        itemStyle: { normal: {color: 'rgba(48,171,40,0.5)'} }
                    },
                    {
                        value: data.value[9],
                        name: data.origin[9],
                        itemStyle: { normal: {color: 'rgba(76,161,251,0.5)'} }
                    }
                ]
            }]
        });
    }

    exports.init = function (data) {

        var vip = userData.vip_level;

        new Ractive({
            el: '#container',
            template: require('html!./visitData.html'),
            data: {
                "vipLevel": userData.vip_level,
                "checked_tab_index": '',
                "data": data,
                "yesterday": '',
                "views": '',
                "org": '',
                "sum_pv": '',
                "viewDisc": '近7天',
                "origin": ''
            },
            getVisit: function () {
                var me = this;
                var range = [7, 30, 90];
                service
                .getVistdate({
                    range: range[me.get('checked_tab_index')]
                })
                .then (function (reponse) {
                    var container = $('#content');
                    var data = reponse.data;
                    var pv = data.pv;

                    if (pv) {
                        // 画表
                        chartline = echarts.init(container.find('.charts-line')[0], 'shine');
                        canvasLine(pv.data, '浏览量');

                        // 表头数据
                        me.set('yesterday', pv.yesterday);
                        me.set('views', pv.total);
                    }
                    else {
                        // 表头数据
                        me.set('yesterday', 0);
                        me.set('views', 0);
                    }
                    // 画饼
                    var analysis = data.origin_analysis;
                    if (me.get('vipLevel')) {
                        chartpie = echarts.init(container.find('.data-pie')[0], 'pie');
                        var data = transformPieData(analysis.value, analysis.origin, analysis.uv_rate);
                        if (analysis.order_rate.length != 0) {
                            canvasPie(data);
                            // 饼图的tooltip
                            var style = container.find('.data-pie div').attr('style');
                            var newStyle = style.replace('hidden', 'none');
                            container.find('.data-pie div').attr('style', newStyle);
                        }
                        else {
                            container.find('.data-pie').html('<img src='+img+'>');
                        }
                        me.set('sum_pv', analysis.total);
                        me.set('origin', data)
                    }
                })
            },
            changeItem: function (index) {

                var me = this;
                me.set('checked_tab_index', index);
                var viewDisc = ["近7天", "近30天", "近90天"]
                me.set('viewDisc', viewDisc[index])
                me.getVisit();

            },
            oncomplete: function (event) {
                var me = this;

                service
                .getUserBasicInfo()
                .then(function (response) {
                    var data = response.data;
                    me.set('org', data.org_id ? true : false);
                });

                me.getVisit();

            }
        });
        new Ractive({
            el: '#content-header',
            template: require('html!./../header.html')
        });

    };

});
