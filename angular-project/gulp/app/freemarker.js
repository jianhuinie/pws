
var gulp = require('gulp');
var Freemarker = require('freemarker.js');


var constants = require('./constants');
var es = require('event-stream');
var helper = require('../helper');


var navs = [
    {
        link: '/',
        text: '首页',
        type: 'main'
    },
    {
        ngHref: '{{ arrangeUrl }}',
        text: '教务管理',
        type: 'arrange',
        shown: {
            'downloadThird': 'AUTH_O["arrange"]',
            'mapp': 'AUTH_O["arrange"]',
            'signup': 'AUTH_O["arrange"]',
            'advisory': 'AUTH_O["arrange"]',
            'main': 'AUTH_O["arrange"]',
        }
    },
    {
        ngHref: '"/signup.html?tick=" + {{ orgInfo.number }}',
        text: '报名',
        type: 'signup',
        shown: {
            'downloadThird': 'AUTH_O["signup"]',
            'mapp': 'AUTH_O["signup"]',
            'signup': 'AUTH_O["signup"]',
            'advisory': 'AUTH_O["signup"]',
            'main': 'AUTH_O["signup"]'
        }
    },
    {
        ngHref: '"/advisory.html?tick=" + {{ orgInfo.number }}',
        text: '商机中心',
        type: 'advisory',
        shown: {
            'downloadThird': 'true',
            'mapp': 'true',
            'signup': 'true',
            'advisory': 'true',
            'main': 'true'
        }
    },
    {
        text: '机构主页',
        ngHref: '{{ orgUrl }}',
        type: 'home',
        target: '_blank',
        shown: {
            'downloadThird': 'orgInfo.number',
            'mapp': 'orgInfo.number',
            'signup': 'orgInfo.number',
            'advisory': 'orgInfo.number',
            'main': 'orgInfo.number'
        }
    },
    {
        link: '/download',
        text: '下载机构APP',
        type: 'app'
    },
    {
        text: '设置',
        state: 'jigou.account',
        ngHref: '/main#/account/',
        shown: {
            'downloadThird': 'HAS_SETTING_AUTH',
            'mapp': 'HAS_SETTING_AUTH',
            'main': 'HAS_SETTING_AUTH',
            'signup': 'HAS_SETTING_AUTH',
            'advisory': 'HAS_SETTING_AUTH'
        },
        useState: {
            'main': true
        }
    }
];

var loginOrgs = [
    {
        "机构id": "1158",
        "机构名称": "月山国学艺术工作室",
        "机构简称": "月山国艺画室",
        "机构总收入": "2997600",
        "生效老师数": "26",
        "未生效老师数": "0",
        "number": "328997289",
        "logourl": "//img.genshuixue.com/126641_7yvcxt2j.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1099",
        "机构名称": "成都市金牛区旗舰英语培训学校",
        "机构简称": "灵格特英语",
        "机构总收入": "2102254.98",
        "生效老师数": "9",
        "未生效老师数": "1",
        "number": "370959379",
        "logourl": "//img.genshuixue.com/46873_doac8ag9.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1474",
        "机构名称": "武汉市硚口区松雁教育咨询中心",
        "机构简称": "轻松国文",
        "机构总收入": "1978269",
        "生效老师数": "10",
        "未生效老师数": "3",
        "number": "370940249",
        "logourl": "//img.genshuixue.com/55889_yp3lgqx4.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1822",
        "机构名称": "合肥市蓝马河教育信息咨询有限公司",
        "机构简称": "蓝马河国际教育",
        "机构总收入": "1509064.2",
        "生效老师数": "32",
        "未生效老师数": "9",
        "number": "329651779",
        "logourl": "//img.genshuixue.com/90523_k2rw42qy.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "2575",
        "机构名称": "成都力保职业技能培训学校",
        "机构简称": "成都力保培训学校",
        "机构总收入": "1441380",
        "生效老师数": "10",
        "未生效老师数": "0",
        "number": "331556339",
        "logourl": "//img.genshuixue.com/179039_kad8mi85.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1",
        "机构名称": "北京乐闻携尔教育咨询有限公司",
        "机构简称": "乐闻携尔",
        "机构总收入": "1317149.17",
        "生效老师数": "33",
        "未生效老师数": "1",
        "number": "328931849",
        "logourl": "//img.genshuixue.com/34618_vziuujxs.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1500",
        "机构名称": "合肥翰桥教育咨询有限公司",
        "机构简称": "翰桥教育",
        "机构总收入": "1268455",
        "生效老师数": "15",
        "未生效老师数": "1",
        "number": "371593219",
        "logourl": "//img.genshuixue.com/107019_a7ncov68.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1095",
        "机构名称": "武汉融贤教育咨询有限公司",
        "机构简称": "武汉融贤教育",
        "机构总收入": "1029669.6",
        "生效老师数": "7",
        "未生效老师数": "0",
        "number": "370959529",
        "logourl": "//img.genshuixue.com/52918_49o1mq4s.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "2618",
        "机构名称": "四川成都锦江区佳恩培训学校",
        "机构简称": "佳音英语",
        "机构总收入": "963750",
        "生效老师数": "20",
        "未生效老师数": "1",
        "number": "332354899",
        "logourl": "//img.genshuixue.com/135146_f4rf15fb.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "3391",
        "机构名称": "合肥123音乐培训学校",
        "机构简称": "123音乐舞蹈",
        "机构总收入": "764120",
        "生效老师数": "31",
        "未生效老师数": "2",
        "number": "332457219",
        "logourl": "//img.genshuixue.com/218235_62fiitk3.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1333",
        "机构名称": "成都唯一使命文化传播有限公司",
        "机构简称": "唯一使命",
        "机构总收入": "754800",
        "生效老师数": "5",
        "未生效老师数": "0",
        "number": "329833209",
        "logourl": "//img.genshuixue.com/54794_qqcz5f3o.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1260",
        "机构名称": "武汉市江岸区飞渡语言培训学校",
        "机构简称": "武汉飞渡教育",
        "机构总收入": "656581.81",
        "生效老师数": "19",
        "未生效老师数": "0",
        "number": "371101619",
        "logourl": "//img.genshuixue.com/250281_eqv5o3wi.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "2488",
        "机构名称": "高新区常春藤教育咨询服务部",
        "机构简称": "常春藤艺术中心",
        "机构总收入": "648001.1",
        "生效老师数": "6",
        "未生效老师数": "0",
        "number": "332353379",
        "logourl": "//img.genshuixue.com/150520_xf6y3g6d.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "2632",
        "机构名称": "合肥跃龙教育咨询有限公司",
        "机构简称": "合肥跃龙教育",
        "机构总收入": "561772",
        "生效老师数": "12",
        "未生效老师数": "0",
        "number": "373476179",
        "logourl": "//img.genshuixue.com/145359_t2p3ktms.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1031",
        "机构名称": "领俊教育",
        "机构简称": "领俊教育",
        "机构总收入": "535910",
        "生效老师数": "3",
        "未生效老师数": "1",
        "number": "329016489",
        "logourl": "//img.genshuixue.com/45864_hagatwbd.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1282",
        "机构名称": "成都市金牛区九方文化艺术培训学校",
        "机构简称": "九方·美考",
        "机构总收入": "501917",
        "生效老师数": "12",
        "未生效老师数": "0",
        "number": "328995929",
        "logourl": "//img.genshuixue.com/72591_op8mgjj2.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1224",
        "机构名称": "成都崇文教育咨询有限公司",
        "机构简称": "崇文教育",
        "机构总收入": "487061",
        "生效老师数": "5",
        "未生效老师数": "2",
        "number": "370937619",
        "logourl": "//img.genshuixue.com/83200_i32qtezw.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "3629",
        "机构名称": "武汉梦想启航教育咨询有限公司",
        "机构简称": "科大启航教育",
        "机构总收入": "486302",
        "生效老师数": "12",
        "未生效老师数": "0",
        "number": "331799539",
        "logourl": "//img.genshuixue.com/239381_qj4mkunz.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "1358",
        "机构名称": "成都市武侯区爱英语社区教育培训学校",
        "机构简称": "爱英语学校",
        "机构总收入": "471500",
        "生效老师数": "14",
        "未生效老师数": "2",
        "number": "370939139",
        "logourl": "//img.genshuixue.com/121550_5q0yiliv.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    },
    {
        "机构id": "",
        "机构名称": "",
        "机构简称": "武DO武术太极",
        "机构总收入": "",
        "生效老师数": "",
        "未生效老师数": "",
        "number": "331800489",
        "logourl": "//img.genshuixue.com/189510_2lcii0le.jpg@1e_98w_98h_1c_0i_1o_90Q_1x.jpg"
    }
];

var fm = new Freemarker({
    viewRoot: __dirname + '/../../app/html/',
    options: {

    }
});

gulp.task('app.swig', function () {

    var data = {
        navs: navs
    };

    var streams = [];

    /*constants.MODULE_NAMES.forEach(function (item) {

        var item = 'main';
        var options = {
            data: {
                pageType: item
            }
        };

        if (['register', 'login', 'forget'].indexOf(item) >= 0) {
            options.data.https = true;
        }

        if (item === 'login') {
            options.data.loginOrgs = loginOrgs
        }

        helper.apply(options, swigOptions);

        streams.push(
            gulp.src('app/html/' + item + '.html')
                .pipe(swig(options))
                .pipe(gulp.dest('app/'))
        );
    });*/

    fm.render('main.html', data, function (error, html, output) {
        console.log(error);
    });

    //return es.merge(streams);
});

