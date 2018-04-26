/**
 * @file 老师个人中心数据中心交易数据
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var echarts = require('echarts');
    var service = require('../../common/service');
    require('echarts/chart/line');
    require('echarts/chart/pie');

    var img = require.toUrl('./image/nono.jpg');

    var underscore = require('underscore');

    //画表
    function canvasline(chart, data, title){
        chart.setOption(
            {
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    x: 50,
                    y: 10,
                    x2: 40,
                    y2: 30
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : underscore.keys(data)
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:title,
                        type:'line',
                        itemStyle:{
                            normal:{
                                color:'#ff712e',
                                lineStyle:{
                                    color:"#ff712e",
                                    shadowColor:'#ff712e'
                                },
                                areaStyle:{
                                    type:'default',
                                    color:'#ffe2c4'
                                }
                            }
                        },
                        data: underscore.values(data),
                        lineStyle:{
                            color:'#555555',
                            type:'solid',
                            width:1
                        }
                    }
                ]
            }
        );
    }

    // 画饼
    function canvaspie( data){

        if((data.one2one + data.class + data.video + data.trial) == 0 ){
            $('#content').find('.data-pie').html('<img src='+img+'>');
            return;
        }
        var chart = echarts.init($('#content').find('.data-pie')[0], 'shine');

        chart.setOption(
            {
                tooltip : {
                    trigger: 'item',
                    formatter : '{b}:{d}%'
                },
                series : [
                    {
                        type:'pie',
                        radius : ['45%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            }

                        },
                        data:[
                            {value:data.one2one,name:"一对一",itemStyle:{normal:{color:'#f3846c'}}},
                            {value:data.class,name:"班课",itemStyle:{normal:{color:'#eebb5e'}}},
                            {value:data.video,name:"视频课",itemStyle:{normal:{color:'#95ca70'}}},
                            {value:data.trial,name:"试听课",itemStyle:{normal:{color:'#747b9b'}}}
                        ]
                    }
                ]
            }
        );
    }

    function animateData(data, type){
        var eles = $('#content').find('.source-item')
        $('#content').find('.visit-number').text(data.sum);
        $('#content').find('.visit-descrip').text("最近"+type+"成单数");
        eles.find('.one2one-percent').text(data.one2one + '%');
        eles.find('.class-percent').text(data.class + '%');
        eles.find('.video-percent').text(data.video + '%');
        eles.find('.trial-percent').text(data.trial + '%');

        eles.find('.one2one').animate({width:data.one2one+'%'}, 300);
        eles.find('.class').animate({width:data.class+'%'}, 300);
        eles.find('.video').animate({width:data.video+'%'}, 300);
        eles.find('.trial').animate({width:data.trial+'%'}, 300);
    }

    exports.init = function (data) {

        var weekData = data.deal_statistic.week;
        var monthData = data.deal_statistic.month;
        var seasonData = data.deal_statistic.season;
        var source = data.deal_source;
        source.week.sum = data.deal_statistic.tot_week;
        source.month.sum = data.deal_statistic.tot_month;
        source.season.sum = data.deal_statistic.tot_season;
        var vip = userData.vip_level;

        new Ractive({
            el: '#container',
            template: require('html!./transactionData.html'),
            data:{
                tot_today:data.deal_statistic.tot_today,
                tot_yest:data.deal_statistic.tot_yest,
                tot_week:data.deal_statistic.tot_week,
                tot_month:data.deal_statistic.tot_month,
                tot_season:data.deal_statistic.tot_season,
                source:source.week,
            },
            changeTab:function(event){
                var thiz = $(event.node);
                container.find(".dates-times").removeClass('active');
                thiz.addClass("active");
                var index = thiz.attr("data-index");
                container.find(".visit-data .datas").hide();
                container.find(".visit-data").find("."+index).show();

                if(index == 'month'){
                    canvasline(chartline,monthData,"成单数");
                    canvaspie(source.month,"平均成单数");
                    animateData(source.month,"1月");
                }
                else if(index == 'month3'){
                    canvasline(chartline,seasonData,"成单数");
                    canvaspie(source.season,"平均成单数");
                    animateData(source.season,"3月");
                }else{
                    canvasline(chartline,weekData,"成单数");
                    canvaspie(source.week,"成单数");
                    animateData(source.week,"7天");
                }
            }
        });
        new Ractive({
            el: '#content-header',
            template: require('html!./../header.html')
        });
        var container = $('#content');
        if(vip){
            new Ractive({
                el: '.exchange',
                template: require('html!./vipchange.html'),
                data: {
                    weeks: data.deal_conversion.weeks,
                    history: data.deal_conversion.history,
                    vistor_rate: parseInt(data.deal_conversion.weeks.vistor_rate),
                    getNumber: function (number) {
                        var type = $.type(number);
                        if (type != 'number')
                        {
                            var rate = +number.replace('%', '');
                            if (rate > 0) {
                                return rate + '%'
                            }
                            else {
                                return (-1) * rate + '%'
                            }
                        }
                        else if (type === 'number') {
                            if (number > 0) {
                                return number + "%";
                            }
                            else {
                                return 0 - number + "%";
                            }
                        }
                        else {
                            return 0;
                        }

                    },
                },
                changeTrans : function(event){
                    var thiz = $(event.node);
                    var index = thiz.attr('data-index');
                    container.find('.exchange-times').removeClass('active');
                    thiz.addClass('active');
                    container.find('.exchange-data-item').hide();
                    container.find('.'+index).show();
                }
            });
        }else{
            var ractive = new Ractive({
                el: '.exchange',
                template: require('html!./novipchange.html'),
                data:{},
                onrender:function(){
                    service
                    .getUserBasicInfo()
                    .then(function (response) {
                        var data = response.data;
                        // 机构老师
                        ractive.set('org', data.org_id ? true : false);
                    });
                }
            });
        }


        //画表
        var chartline = echarts.init(container.find('.charts-table-line')[0], 'shine');
        canvasline(chartline,weekData,"成单数");

        //画饼
        canvaspie(source.week);
    };

});
