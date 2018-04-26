/**
 * @file 老师个人中心数据中心排名解析
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var echarts = require('echarts');
    require('echarts/chart/radar');

    var service = require('../../common/service');
    var underscore = require('underscore');
    var renderImage = require('userCenter/common/function/renderImage');
    var chart;

    //画雷达
    function drawradar(data) {
        var values = [];
        var texts = [];
        $.each(
            data,
            function (index, value) {
                values.push(data[index].score);
                texts.push(data[index].name);
            }
        );
        chart.setOption(
            {
                tooltip: {
                    trigger: 'axis'
                },
                polar: [
                    {
                        indicator: [
                            {text: texts[0], max : 100},
                            {text: texts[1], max : 100},
                            {text: texts[2], max : 100},
                            {text: texts[3], max : 100},
                            {text: texts[4], max : 100}
                        ],
                        radius: 150
                    }
                ],
                series: [
                    {
                        name: '综合排名',
                        type: 'radar',
                        opacity:0.8,
                        itemStyle: {
                            normal: {
                                color: '#4bb9f5',
                                areaStyle: {
                                    type: 'default',
                                    color: '#4bb9f5'
                                },
                            },
                            axisPointer: {
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold',
                                            color: '#000000'
                                        }
                                    }
                                }
                            }
                        },
                        data: [
                            {
                                value: values,
                                name: ''
                            }
                        ]
                    }
                ]
            }
        );
    }

    exports.init = function (data) {

        var selectOptions = [];
        var results = data.results;
        if(!data.results) {
            new Ractive({
                el: '#container',
                template: require('html!./nocourse.html')
            });
        }
        else {
            var keys = underscore.keys(data.results).length;
            var rank = [];
            var rank_rate = [];
            var top = [];
            $.each(results, function (key,value) {
                selectOptions.push({
                    text: value.name,
                    value: key
                });
                rank.push(value.rank);
                rank_rate.push(value.rank_rate);
                top.push(value.top_5);
            });
            var ractive = new Ractive({
                el: '#container',
                template: require('html!./sysntheticSort.html'),
                data: {
                    statusSelectOptions: {
                        name: 'status',
                        className: 'course-select',
                        data: selectOptions,
                        value: underscore.keys(results)[0],
                        onselect: function(e){

                            var key = this.properties.value;
                            var rank = results[key].rank;
                            var rank_rate = results[key].rank_rate;

                            ractive.set('number', rank); // 同步排名

                            if (rank_rate != "") {
                                $('.title-header').find('.win').text(rank_rate+"%");
                            }
                            if (rank != "") {
                                $('.title-header').find('.number').text(rank);
                            }

                            drawradar(results[key].Obj);

                            new Ractive({
                                el: '.data-source',
                                template: require('html!./vipsort.html'),
                                data: {
                                    table: results[key].Obj
                                }
                            });

                            new Ractive({
                                el: '.teachers',
                                template: require('html!./viptop.html'),
                                data: {
                                    teachers: results[key].top_5,
                                    getName: function(name){
                                        return name.length > 5 ? name.substr(0,5)+'...': name;
                                    }
                                }
                            });
                            renderImage($('.teachers'));

                        }
                    },
                    city: data.city_name,
                    data: data,
                    number: rank[0],
                    win: rank_rate[0]+"%",
                    influence: data.others.name,
                    question: data.others,
                    results: data.results
                },
                components: {
                    Select: require('../../../common/component/Select')
                },
                ranking: function () {
                    var tpl = "<div class='qadialog' style='width: 370px'>";
                    tpl += this.get('question').question['Q1']+'<br/>';
                    tpl += this.get('question').answer['A1']+'<br/><br/>';
                    tpl += this.get('question').question['Q2']+'<br/>';
                    tpl += this.get('question').answer['A2']+'<br/>';
                    tpl += "</div>"
                    alert({
                        title: '',
                        content: tpl,
                        buttons: [
                            {
                                text: '确定',
                                type: 'primary',
                                action: function () {
                                   this.hide();
                                }
                            }
                        ]
                    });
                }
            });

            new Ractive ({
                el: '.teachers',
                template: require('html!./viptop.html'),
                data: {
                    teachers: top[0],
                    getName: function(name){
                        return name.length > 5 ? name.substr(0,5)+'...': name;
                    }
                }
            });
            renderImage($('.teachers'));

            //初始化雷达和表格
            var weekData = [];
            for(var idx in results){
                weekData.push(results[idx].Obj);
            }
            var container = $('#content');
            chart = echarts.init($('.canvas-radar')[0], 'shine');
            drawradar(weekData[0]);

            new Ractive({
                el: '.data-source',
                template: require('html!./vipsort.html'),
                data: {
                    table: weekData[0]
                }
            });

        };
        var header = new Ractive({
            el: '#content-header',
            template: require('html!./../header.html')
        });

    };
});