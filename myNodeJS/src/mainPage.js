define(function(require, exports) {
    var sayHello = require('sayHello');
    exports.init = function() {
        sayHello.init();
        var myChart = echarts.init($('#main')[0]);

        // 指定图表的配置项和数据
        var option = {
            backgroundColor: '#2c343c',
            title: {
               text: 'Customized Pie',
               left: 'center',
               top: 20,
               textStyle: {
                   color: '#ccc'
               }
           },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: [{
                    name: '销量',
                    icon: 'circle'
                }]
            },
            grid: {
            },
            xAxis: {
                name: '服装类型',
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {

            },
            // series: [{
            //     name: '销量',
            //     type: 'bar',
            //     data: [5, 20, 36, 10, 10, 20]
            // }]
            
            visualMap: {
               show: false,
               min: 80,
               max: 600,
               inRange: {
                   colorLightness: [0, 1]
               }
           },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎', itemStyle: {normal: {color: '#ccc'}}}
                    ].sort(function (a, b) { return a.value - b.value}),
                    // roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
});