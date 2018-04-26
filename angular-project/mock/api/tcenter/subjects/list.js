/**
 * @file 获取科目信息
 * @path /api/tcenter/subjects/list
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = [
            {
            "id": 975,
            "parent_id": 0,
            "level": 1,
            "name": "艺术",
            "remark_name": null,
            "children": [
            {
            "id": 976,
            "parent_id": 975,
            "level": 2,
            "name": "器乐",
            "remark_name": null,
            "children": [
            {
            "id": 978,
            "parent_id": 976,
            "level": 3,
            "name": "吉他",
            "remark_name": null,
            "children": []
            },
            {
            "id": 977,
            "parent_id": 976,
            "level": 3,
            "name": "钢琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 979,
            "parent_id": 976,
            "level": 3,
            "name": "古筝",
            "remark_name": null,
            "children": []
            },
            {
            "id": 985,
            "parent_id": 976,
            "level": 3,
            "name": "葫芦丝",
            "remark_name": null,
            "children": []
            },
            {
            "id": 980,
            "parent_id": 976,
            "level": 3,
            "name": "小提琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 984,
            "parent_id": 976,
            "level": 3,
            "name": "萨克斯",
            "remark_name": null,
            "children": []
            },
            {
            "id": 987,
            "parent_id": 976,
            "level": 3,
            "name": "琵琶",
            "remark_name": null,
            "children": []
            },
            {
            "id": 986,
            "parent_id": 976,
            "level": 3,
            "name": "二胡",
            "remark_name": null,
            "children": []
            },
            {
            "id": 983,
            "parent_id": 976,
            "level": 3,
            "name": "电子琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 982,
            "parent_id": 976,
            "level": 3,
            "name": "架子鼓",
            "remark_name": null,
            "children": []
            },
            {
            "id": 988,
            "parent_id": 976,
            "level": 3,
            "name": "大提琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 989,
            "parent_id": 976,
            "level": 3,
            "name": "电吉他",
            "remark_name": null,
            "children": []
            },
            {
            "id": 992,
            "parent_id": 976,
            "level": 3,
            "name": "单簧管",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1137,
            "parent_id": 976,
            "level": 3,
            "name": "双簧管",
            "remark_name": null,
            "children": []
            },
            {
            "id": 993,
            "parent_id": 976,
            "level": 3,
            "name": "笛子",
            "remark_name": null,
            "children": []
            },
            {
            "id": 995,
            "parent_id": 976,
            "level": 3,
            "name": "扬琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 996,
            "parent_id": 976,
            "level": 3,
            "name": "爵士鼓",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1000,
            "parent_id": 976,
            "level": 3,
            "name": "长号",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1002,
            "parent_id": 976,
            "level": 3,
            "name": "唢呐",
            "remark_name": null,
            "children": []
            },
            {
            "id": 999,
            "parent_id": 976,
            "level": 3,
            "name": "小号",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1008,
            "parent_id": 976,
            "level": 3,
            "name": "圆号",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1005,
            "parent_id": 976,
            "level": 3,
            "name": "手鼓",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1004,
            "parent_id": 976,
            "level": 3,
            "name": "非洲鼓",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1003,
            "parent_id": 976,
            "level": 3,
            "name": "马林巴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1001,
            "parent_id": 976,
            "level": 3,
            "name": "口琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 998,
            "parent_id": 976,
            "level": 3,
            "name": "贝斯",
            "remark_name": null,
            "children": []
            },
            {
            "id": 997,
            "parent_id": 976,
            "level": 3,
            "name": "手风琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 994,
            "parent_id": 976,
            "level": 3,
            "name": "箫",
            "remark_name": null,
            "children": []
            },
            {
            "id": 991,
            "parent_id": 976,
            "level": 3,
            "name": "尤克里里",
            "remark_name": null,
            "children": []
            },
            {
            "id": 990,
            "parent_id": 976,
            "level": 3,
            "name": "竖琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 981,
            "parent_id": 976,
            "level": 3,
            "name": "古琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1530,
            "parent_id": 976,
            "level": 3,
            "name": "笙",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1531,
            "parent_id": 976,
            "level": 3,
            "name": "陶笛",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1556,
            "parent_id": 976,
            "level": 3,
            "name": "巴扬手风琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1572,
            "parent_id": 976,
            "level": 3,
            "name": "埙",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1127,
            "parent_id": 976,
            "level": 3,
            "name": "箜篌",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1164,
            "parent_id": 976,
            "level": 3,
            "name": "双排键",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1165,
            "parent_id": 976,
            "level": 3,
            "name": "长笛",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1166,
            "parent_id": 976,
            "level": 3,
            "name": "大号",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1167,
            "parent_id": 976,
            "level": 3,
            "name": "低音提琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1168,
            "parent_id": 976,
            "level": 3,
            "name": "巴乌",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1169,
            "parent_id": 976,
            "level": 3,
            "name": "中阮",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1170,
            "parent_id": 976,
            "level": 3,
            "name": "马头琴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1010,
            "parent_id": 976,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1011,
            "parent_id": 975,
            "level": 2,
            "name": "声乐",
            "remark_name": null,
            "children": [
            {
            "id": 1014,
            "parent_id": 1011,
            "level": 3,
            "name": "流行",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1016,
            "parent_id": 1011,
            "level": 3,
            "name": "卡拉OK",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1012,
            "parent_id": 1011,
            "level": 3,
            "name": "美声",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1013,
            "parent_id": 1011,
            "level": 3,
            "name": "民族",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1015,
            "parent_id": 1011,
            "level": 3,
            "name": "原生态",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1017,
            "parent_id": 975,
            "level": 2,
            "name": "音乐其他",
            "remark_name": null,
            "children": [
            {
            "id": 1026,
            "parent_id": 1017,
            "level": 3,
            "name": "音乐理论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1018,
            "parent_id": 1017,
            "level": 3,
            "name": "指挥",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1019,
            "parent_id": 1017,
            "level": 3,
            "name": "作曲",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1027,
            "parent_id": 1017,
            "level": 3,
            "name": "音乐基本素养",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1028,
            "parent_id": 1017,
            "level": 3,
            "name": "音乐表演",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1029,
            "parent_id": 1017,
            "level": 3,
            "name": "音乐艺术管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1030,
            "parent_id": 1017,
            "level": 3,
            "name": "音乐工程",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1155,
            "parent_id": 1017,
            "level": 3,
            "name": "beatbox",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1179,
            "parent_id": 1017,
            "level": 3,
            "name": "作词",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1031,
            "parent_id": 975,
            "level": 2,
            "name": "舞蹈",
            "remark_name": null,
            "children": [
            {
            "id": 1033,
            "parent_id": 1031,
            "level": 3,
            "name": "街舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1034,
            "parent_id": 1031,
            "level": 3,
            "name": "拉丁舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1036,
            "parent_id": 1031,
            "level": 3,
            "name": "芭蕾舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1038,
            "parent_id": 1031,
            "level": 3,
            "name": "现代舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1032,
            "parent_id": 1031,
            "level": 3,
            "name": "爵士舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1040,
            "parent_id": 1031,
            "level": 3,
            "name": "肚皮舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1037,
            "parent_id": 1031,
            "level": 3,
            "name": "古典舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1035,
            "parent_id": 1031,
            "level": 3,
            "name": "民族舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1041,
            "parent_id": 1031,
            "level": 3,
            "name": "韩舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1039,
            "parent_id": 1031,
            "level": 3,
            "name": "钢管舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1042,
            "parent_id": 1031,
            "level": 3,
            "name": "健美操",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1048,
            "parent_id": 1031,
            "level": 3,
            "name": "民间舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1043,
            "parent_id": 1031,
            "level": 3,
            "name": "国标舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1145,
            "parent_id": 1031,
            "level": 3,
            "name": "探戈",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1046,
            "parent_id": 1031,
            "level": 3,
            "name": "广场舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1051,
            "parent_id": 1031,
            "level": 3,
            "name": "啦啦队舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1050,
            "parent_id": 1031,
            "level": 3,
            "name": "锐舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1049,
            "parent_id": 1031,
            "level": 3,
            "name": "迪斯科",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1047,
            "parent_id": 1031,
            "level": 3,
            "name": "集体舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1044,
            "parent_id": 1031,
            "level": 3,
            "name": "踢踏舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1555,
            "parent_id": 1031,
            "level": 3,
            "name": "中国舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1151,
            "parent_id": 1031,
            "level": 3,
            "name": "TB秀",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1175,
            "parent_id": 1031,
            "level": 3,
            "name": "儿童舞蹈",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1176,
            "parent_id": 1031,
            "level": 3,
            "name": "绸缎舞",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1056,
            "parent_id": 1031,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1061,
            "parent_id": 975,
            "level": 2,
            "name": "绘画",
            "remark_name": null,
            "children": [
            {
            "id": 1063,
            "parent_id": 1061,
            "level": 3,
            "name": "素描",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1062,
            "parent_id": 1061,
            "level": 3,
            "name": "创意画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1065,
            "parent_id": 1061,
            "level": 3,
            "name": "国画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1066,
            "parent_id": 1061,
            "level": 3,
            "name": "油画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1067,
            "parent_id": 1061,
            "level": 3,
            "name": "水粉画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1064,
            "parent_id": 1061,
            "level": 3,
            "name": "水彩画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1068,
            "parent_id": 1061,
            "level": 3,
            "name": "沙画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1110,
            "parent_id": 1061,
            "level": 3,
            "name": "插画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1111,
            "parent_id": 1061,
            "level": 3,
            "name": "卡通画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1112,
            "parent_id": 1061,
            "level": 3,
            "name": "简笔画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1113,
            "parent_id": 1061,
            "level": 3,
            "name": "速写",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1114,
            "parent_id": 1061,
            "level": 3,
            "name": "漫画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1171,
            "parent_id": 1061,
            "level": 3,
            "name": "纹身",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1172,
            "parent_id": 1061,
            "level": 3,
            "name": "儿童画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1173,
            "parent_id": 1061,
            "level": 3,
            "name": "版画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1174,
            "parent_id": 1061,
            "level": 3,
            "name": "工笔画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1249,
            "parent_id": 1061,
            "level": 3,
            "name": "美术高考",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1069,
            "parent_id": 1061,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1057,
            "parent_id": 975,
            "level": 2,
            "name": "书法",
            "remark_name": null,
            "children": [
            {
            "id": 1058,
            "parent_id": 1057,
            "level": 3,
            "name": "硬笔书法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1059,
            "parent_id": 1057,
            "level": 3,
            "name": "软笔书法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1163,
            "parent_id": 1057,
            "level": 3,
            "name": "英语书法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 512,
            "parent_id": 975,
            "level": 2,
            "name": "媒体艺术",
            "remark_name": null,
            "children": [
            {
            "id": 513,
            "parent_id": 512,
            "level": 3,
            "name": "播音主持",
            "remark_name": null,
            "children": []
            },
            {
            "id": 514,
            "parent_id": 512,
            "level": 3,
            "name": "影视表演",
            "remark_name": null,
            "children": []
            },
            {
            "id": 515,
            "parent_id": 512,
            "level": 3,
            "name": "摄影培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 516,
            "parent_id": 512,
            "level": 3,
            "name": "编导培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 517,
            "parent_id": 512,
            "level": 3,
            "name": "电视包装",
            "remark_name": null,
            "children": []
            },
            {
            "id": 518,
            "parent_id": 512,
            "level": 3,
            "name": "DJ培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 519,
            "parent_id": 512,
            "level": 3,
            "name": "影视制作",
            "remark_name": null,
            "children": []
            },
            {
            "id": 520,
            "parent_id": 512,
            "level": 3,
            "name": "模特培训",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1070,
            "parent_id": 975,
            "level": 2,
            "name": "雕塑",
            "remark_name": null,
            "children": [
            {
            "id": 1076,
            "parent_id": 1070,
            "level": 3,
            "name": "皮雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1071,
            "parent_id": 1070,
            "level": 3,
            "name": "木雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1079,
            "parent_id": 1070,
            "level": 3,
            "name": "泥雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1080,
            "parent_id": 1070,
            "level": 3,
            "name": "面塑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1072,
            "parent_id": 1070,
            "level": 3,
            "name": "石雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1077,
            "parent_id": 1070,
            "level": 3,
            "name": "根雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1078,
            "parent_id": 1070,
            "level": 3,
            "name": "冰雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1075,
            "parent_id": 1070,
            "level": 3,
            "name": "漆雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1074,
            "parent_id": 1070,
            "level": 3,
            "name": "沙雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1073,
            "parent_id": 1070,
            "level": 3,
            "name": "玉雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1082,
            "parent_id": 1070,
            "level": 3,
            "name": "石膏像",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1083,
            "parent_id": 1070,
            "level": 3,
            "name": "牙雕",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1084,
            "parent_id": 1070,
            "level": 3,
            "name": "创意雕塑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1081,
            "parent_id": 1070,
            "level": 3,
            "name": "陶艺",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1177,
            "parent_id": 1070,
            "level": 3,
            "name": "雕刻",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1085,
            "parent_id": 1070,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1086,
            "parent_id": 975,
            "level": 2,
            "name": "鉴赏",
            "remark_name": null,
            "children": [
            {
            "id": 1559,
            "parent_id": 1086,
            "level": 3,
            "name": "葡萄酒品鉴",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1087,
            "parent_id": 1086,
            "level": 3,
            "name": "古玩鉴赏",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1088,
            "parent_id": 1086,
            "level": 3,
            "name": "字画鉴赏",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1107,
            "parent_id": 1086,
            "level": 3,
            "name": "红酒鉴赏",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1178,
            "parent_id": 1086,
            "level": 3,
            "name": "白酒鉴赏",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1089,
            "parent_id": 1086,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1090,
            "parent_id": 975,
            "level": 2,
            "name": "戏剧",
            "remark_name": null,
            "children": [
            {
            "id": 1522,
            "parent_id": 1090,
            "level": 3,
            "name": "音乐剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1091,
            "parent_id": 1090,
            "level": 3,
            "name": "京剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1092,
            "parent_id": 1090,
            "level": 3,
            "name": "评剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1093,
            "parent_id": 1090,
            "level": 3,
            "name": "晋剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1094,
            "parent_id": 1090,
            "level": 3,
            "name": "豫剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1095,
            "parent_id": 1090,
            "level": 3,
            "name": "越剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1096,
            "parent_id": 1090,
            "level": 3,
            "name": "昆曲",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1097,
            "parent_id": 1090,
            "level": 3,
            "name": "秦腔",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1098,
            "parent_id": 1090,
            "level": 3,
            "name": "川剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1099,
            "parent_id": 1090,
            "level": 3,
            "name": "黄梅戏",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1100,
            "parent_id": 1090,
            "level": 3,
            "name": "话剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1250,
            "parent_id": 1090,
            "level": 3,
            "name": "二人转",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1101,
            "parent_id": 1090,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1102,
            "parent_id": 975,
            "level": 2,
            "name": "其他",
            "remark_name": null,
            "children": [
            {
            "id": 1103,
            "parent_id": 1102,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 921,
            "parent_id": 0,
            "level": 1,
            "name": "体育",
            "remark_name": null,
            "children": [
            {
            "id": 922,
            "parent_id": 921,
            "level": 2,
            "name": "运动",
            "remark_name": null,
            "children": [
            {
            "id": 928,
            "parent_id": 922,
            "level": 3,
            "name": "游泳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 923,
            "parent_id": 922,
            "level": 3,
            "name": "羽毛球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 924,
            "parent_id": 922,
            "level": 3,
            "name": "乒乓球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 927,
            "parent_id": 922,
            "level": 3,
            "name": "篮球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 925,
            "parent_id": 922,
            "level": 3,
            "name": "网球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 926,
            "parent_id": 922,
            "level": 3,
            "name": "足球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1146,
            "parent_id": 922,
            "level": 3,
            "name": "排球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 929,
            "parent_id": 922,
            "level": 3,
            "name": "瑜伽",
            "remark_name": null,
            "children": []
            },
            {
            "id": 932,
            "parent_id": 922,
            "level": 3,
            "name": "台球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 935,
            "parent_id": 922,
            "level": 3,
            "name": "跑酷",
            "remark_name": null,
            "children": []
            },
            {
            "id": 930,
            "parent_id": 922,
            "level": 3,
            "name": "轮滑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 931,
            "parent_id": 922,
            "level": 3,
            "name": "滑板",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1109,
            "parent_id": 922,
            "level": 3,
            "name": "骑行",
            "remark_name": null,
            "children": []
            },
            {
            "id": 933,
            "parent_id": 922,
            "level": 3,
            "name": "普拉提",
            "remark_name": null,
            "children": []
            },
            {
            "id": 934,
            "parent_id": 922,
            "level": 3,
            "name": "高尔夫",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1118,
            "parent_id": 922,
            "level": 3,
            "name": "耐力跑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1520,
            "parent_id": 922,
            "level": 3,
            "name": "短跑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 936,
            "parent_id": 922,
            "level": 3,
            "name": "潜水",
            "remark_name": null,
            "children": []
            },
            {
            "id": 937,
            "parent_id": 922,
            "level": 3,
            "name": "棒球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 938,
            "parent_id": 922,
            "level": 3,
            "name": "水球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 939,
            "parent_id": 922,
            "level": 3,
            "name": "门球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 940,
            "parent_id": 922,
            "level": 3,
            "name": "马球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 941,
            "parent_id": 922,
            "level": 3,
            "name": "橄榄球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 942,
            "parent_id": 922,
            "level": 3,
            "name": "曲棍球",
            "remark_name": null,
            "children": []
            },
            {
            "id": 951,
            "parent_id": 922,
            "level": 3,
            "name": "击剑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1115,
            "parent_id": 922,
            "level": 3,
            "name": "健身",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1210,
            "parent_id": 922,
            "level": 3,
            "name": "飞碟",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1211,
            "parent_id": 922,
            "level": 3,
            "name": "长跑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1212,
            "parent_id": 922,
            "level": 3,
            "name": "滑雪",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1213,
            "parent_id": 922,
            "level": 3,
            "name": "跳高",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1214,
            "parent_id": 922,
            "level": 3,
            "name": "拳击",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1215,
            "parent_id": 922,
            "level": 3,
            "name": "定向越野",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1251,
            "parent_id": 922,
            "level": 3,
            "name": "赛车",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1259,
            "parent_id": 922,
            "level": 3,
            "name": "跳绳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 943,
            "parent_id": 922,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 944,
            "parent_id": 921,
            "level": 2,
            "name": "武术",
            "remark_name": null,
            "children": [
            {
            "id": 953,
            "parent_id": 944,
            "level": 3,
            "name": "太极拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 945,
            "parent_id": 944,
            "level": 3,
            "name": "跆拳道",
            "remark_name": null,
            "children": []
            },
            {
            "id": 946,
            "parent_id": 944,
            "level": 3,
            "name": "散打",
            "remark_name": null,
            "children": []
            },
            {
            "id": 947,
            "parent_id": 944,
            "level": 3,
            "name": "泰拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 948,
            "parent_id": 944,
            "level": 3,
            "name": "空手道",
            "remark_name": null,
            "children": []
            },
            {
            "id": 949,
            "parent_id": 944,
            "level": 3,
            "name": "柔道",
            "remark_name": null,
            "children": []
            },
            {
            "id": 950,
            "parent_id": 944,
            "level": 3,
            "name": "剑道",
            "remark_name": null,
            "children": []
            },
            {
            "id": 952,
            "parent_id": 944,
            "level": 3,
            "name": "传统武术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1521,
            "parent_id": 944,
            "level": 3,
            "name": "马伽术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 954,
            "parent_id": 944,
            "level": 3,
            "name": "女子防身术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 955,
            "parent_id": 944,
            "level": 3,
            "name": "自由搏击",
            "remark_name": null,
            "children": []
            },
            {
            "id": 956,
            "parent_id": 944,
            "level": 3,
            "name": "咏春拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 957,
            "parent_id": 944,
            "level": 3,
            "name": "气功",
            "remark_name": null,
            "children": []
            },
            {
            "id": 958,
            "parent_id": 944,
            "level": 3,
            "name": "体适能",
            "remark_name": null,
            "children": []
            },
            {
            "id": 959,
            "parent_id": 944,
            "level": 3,
            "name": "少林拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1147,
            "parent_id": 944,
            "level": 3,
            "name": "形意拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1158,
            "parent_id": 944,
            "level": 3,
            "name": "截拳道",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1216,
            "parent_id": 944,
            "level": 3,
            "name": "双节棍",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1217,
            "parent_id": 944,
            "level": 3,
            "name": "长拳",
            "remark_name": null,
            "children": []
            },
            {
            "id": 960,
            "parent_id": 944,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 961,
            "parent_id": 921,
            "level": 2,
            "name": "棋牌",
            "remark_name": null,
            "children": [
            {
            "id": 962,
            "parent_id": 961,
            "level": 3,
            "name": "围棋",
            "remark_name": null,
            "children": []
            },
            {
            "id": 963,
            "parent_id": 961,
            "level": 3,
            "name": "象棋",
            "remark_name": null,
            "children": []
            },
            {
            "id": 964,
            "parent_id": 961,
            "level": 3,
            "name": "国际象棋",
            "remark_name": null,
            "children": []
            },
            {
            "id": 965,
            "parent_id": 961,
            "level": 3,
            "name": "五子棋",
            "remark_name": null,
            "children": []
            },
            {
            "id": 966,
            "parent_id": 961,
            "level": 3,
            "name": "麻将",
            "remark_name": null,
            "children": []
            },
            {
            "id": 967,
            "parent_id": 961,
            "level": 3,
            "name": "斗地主",
            "remark_name": null,
            "children": []
            },
            {
            "id": 968,
            "parent_id": 961,
            "level": 3,
            "name": "德州扑克",
            "remark_name": null,
            "children": []
            },
            {
            "id": 969,
            "parent_id": 961,
            "level": 3,
            "name": "牌九",
            "remark_name": null,
            "children": []
            },
            {
            "id": 970,
            "parent_id": 961,
            "level": 3,
            "name": "双升",
            "remark_name": null,
            "children": []
            },
            {
            "id": 971,
            "parent_id": 961,
            "level": 3,
            "name": "桥牌",
            "remark_name": null,
            "children": []
            },
            {
            "id": 972,
            "parent_id": 961,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 973,
            "parent_id": 921,
            "level": 2,
            "name": "其他",
            "remark_name": null,
            "children": [
            {
            "id": 974,
            "parent_id": 973,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 897,
            "parent_id": 0,
            "level": 1,
            "name": "生活技能",
            "remark_name": null,
            "children": [
            {
            "id": 917,
            "parent_id": 897,
            "level": 2,
            "name": "化妆",
            "remark_name": null,
            "children": [
            {
            "id": 1524,
            "parent_id": 917,
            "level": 3,
            "name": "护肤",
            "remark_name": null,
            "children": []
            },
            {
            "id": 918,
            "parent_id": 917,
            "level": 3,
            "name": "化妆",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 919,
            "parent_id": 897,
            "level": 2,
            "name": "家常菜",
            "remark_name": null,
            "children": [
            {
            "id": 920,
            "parent_id": 919,
            "level": 3,
            "name": "家常菜",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 905,
            "parent_id": 897,
            "level": 2,
            "name": "烘焙",
            "remark_name": null,
            "children": [
            {
            "id": 906,
            "parent_id": 905,
            "level": 3,
            "name": "烘焙",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 915,
            "parent_id": 897,
            "level": 2,
            "name": "沟通技巧",
            "remark_name": null,
            "children": [
            {
            "id": 916,
            "parent_id": 915,
            "level": 3,
            "name": "沟通技巧",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 907,
            "parent_id": 897,
            "level": 2,
            "name": "缝纫",
            "remark_name": null,
            "children": [
            {
            "id": 908,
            "parent_id": 907,
            "level": 3,
            "name": "缝纫",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 909,
            "parent_id": 897,
            "level": 2,
            "name": "生存逃生",
            "remark_name": null,
            "children": [
            {
            "id": 910,
            "parent_id": 909,
            "level": 3,
            "name": "生存逃生",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 911,
            "parent_id": 897,
            "level": 2,
            "name": "车辆驾驶",
            "remark_name": null,
            "children": [
            {
            "id": 912,
            "parent_id": 911,
            "level": 3,
            "name": "车辆驾驶",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 913,
            "parent_id": 897,
            "level": 2,
            "name": "烹饪",
            "remark_name": null,
            "children": [
            {
            "id": 914,
            "parent_id": 913,
            "level": 3,
            "name": "烹饪",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 898,
            "parent_id": 897,
            "level": 2,
            "name": "理财",
            "remark_name": null,
            "children": [
            {
            "id": 899,
            "parent_id": 898,
            "level": 3,
            "name": "股票",
            "remark_name": null,
            "children": []
            },
            {
            "id": 900,
            "parent_id": 898,
            "level": 3,
            "name": "基金",
            "remark_name": null,
            "children": []
            },
            {
            "id": 901,
            "parent_id": 898,
            "level": 3,
            "name": "期货",
            "remark_name": null,
            "children": []
            },
            {
            "id": 902,
            "parent_id": 898,
            "level": 3,
            "name": "证券",
            "remark_name": null,
            "children": []
            },
            {
            "id": 903,
            "parent_id": 898,
            "level": 3,
            "name": "支出预算",
            "remark_name": null,
            "children": []
            },
            {
            "id": 904,
            "parent_id": 898,
            "level": 3,
            "name": "外汇",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1196,
            "parent_id": 897,
            "level": 2,
            "name": "心理",
            "remark_name": null,
            "children": [
            {
            "id": 1197,
            "parent_id": 1196,
            "level": 3,
            "name": "心理辅导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1198,
            "parent_id": 1196,
            "level": 3,
            "name": "情感咨询",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1199,
            "parent_id": 1196,
            "level": 3,
            "name": "家庭教育",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1200,
            "parent_id": 897,
            "level": 2,
            "name": "生活小技巧",
            "remark_name": null,
            "children": [
            {
            "id": 1201,
            "parent_id": 1200,
            "level": 3,
            "name": "生活小技巧",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1202,
            "parent_id": 897,
            "level": 2,
            "name": "养生",
            "remark_name": null,
            "children": [
            {
            "id": 1203,
            "parent_id": 1202,
            "level": 3,
            "name": "养生",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1204,
            "parent_id": 897,
            "level": 2,
            "name": "形体礼仪",
            "remark_name": null,
            "children": [
            {
            "id": 1205,
            "parent_id": 1204,
            "level": 3,
            "name": "形体礼仪",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1206,
            "parent_id": 897,
            "level": 2,
            "name": "服装搭配",
            "remark_name": null,
            "children": [
            {
            "id": 1207,
            "parent_id": 1206,
            "level": 3,
            "name": "服装搭配",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1208,
            "parent_id": 897,
            "level": 2,
            "name": "人生规划",
            "remark_name": null,
            "children": [
            {
            "id": 1209,
            "parent_id": 1208,
            "level": 3,
            "name": "人生规划",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 878,
            "parent_id": 0,
            "level": 1,
            "name": "兴趣",
            "remark_name": null,
            "children": [
            {
            "id": 885,
            "parent_id": 878,
            "level": 2,
            "name": "魔术",
            "remark_name": null,
            "children": [
            {
            "id": 886,
            "parent_id": 885,
            "level": 3,
            "name": "魔术",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1116,
            "parent_id": 878,
            "level": 2,
            "name": "魔方",
            "remark_name": null,
            "children": [
            {
            "id": 1117,
            "parent_id": 1116,
            "level": 3,
            "name": "魔方",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1528,
            "parent_id": 878,
            "level": 2,
            "name": "生命密码",
            "remark_name": null,
            "children": [
            {
            "id": 1529,
            "parent_id": 1528,
            "level": 3,
            "name": "生命密码",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1538,
            "parent_id": 878,
            "level": 2,
            "name": "非物质文化遗产",
            "remark_name": null,
            "children": [
            {
            "id": 1539,
            "parent_id": 1538,
            "level": 3,
            "name": "传统技艺",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1540,
            "parent_id": 1538,
            "level": 3,
            "name": "传统医药",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1541,
            "parent_id": 1538,
            "level": 3,
            "name": "传统舞蹈",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1542,
            "parent_id": 1538,
            "level": 3,
            "name": "传统体育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1543,
            "parent_id": 1538,
            "level": 3,
            "name": "传统音乐",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1544,
            "parent_id": 1538,
            "level": 3,
            "name": "传统戏剧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1545,
            "parent_id": 1538,
            "level": 3,
            "name": "民间文学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1546,
            "parent_id": 1538,
            "level": 3,
            "name": "民俗",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1547,
            "parent_id": 1538,
            "level": 3,
            "name": "曲艺",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1548,
            "parent_id": 1538,
            "level": 3,
            "name": "传统美术",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 879,
            "parent_id": 878,
            "level": 2,
            "name": "插花",
            "remark_name": null,
            "children": [
            {
            "id": 880,
            "parent_id": 879,
            "level": 3,
            "name": "插花",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 881,
            "parent_id": 878,
            "level": 2,
            "name": "园艺",
            "remark_name": null,
            "children": [
            {
            "id": 882,
            "parent_id": 881,
            "level": 3,
            "name": "园艺",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 883,
            "parent_id": 878,
            "level": 2,
            "name": "手工",
            "remark_name": null,
            "children": [
            {
            "id": 884,
            "parent_id": 883,
            "level": 3,
            "name": "手工布艺",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1218,
            "parent_id": 883,
            "level": 3,
            "name": "手工制作",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1219,
            "parent_id": 883,
            "level": 3,
            "name": "手工布艺",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 887,
            "parent_id": 878,
            "level": 2,
            "name": "演讲",
            "remark_name": null,
            "children": [
            {
            "id": 888,
            "parent_id": 887,
            "level": 3,
            "name": "演讲",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 889,
            "parent_id": 878,
            "level": 2,
            "name": "星座",
            "remark_name": null,
            "children": [
            {
            "id": 890,
            "parent_id": 889,
            "level": 3,
            "name": "星座",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 891,
            "parent_id": 878,
            "level": 2,
            "name": "塔罗牌",
            "remark_name": null,
            "children": [
            {
            "id": 892,
            "parent_id": 891,
            "level": 3,
            "name": "塔罗牌",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 893,
            "parent_id": 878,
            "level": 2,
            "name": "动漫",
            "remark_name": null,
            "children": [
            {
            "id": 894,
            "parent_id": 893,
            "level": 3,
            "name": "动漫",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 895,
            "parent_id": 878,
            "level": 2,
            "name": "游戏",
            "remark_name": null,
            "children": [
            {
            "id": 896,
            "parent_id": 895,
            "level": 3,
            "name": "游戏",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1128,
            "parent_id": 878,
            "level": 2,
            "name": "咖啡",
            "remark_name": null,
            "children": [
            {
            "id": 1129,
            "parent_id": 1128,
            "level": 3,
            "name": "咖啡",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1132,
            "parent_id": 878,
            "level": 2,
            "name": "调酒",
            "remark_name": null,
            "children": [
            {
            "id": 1133,
            "parent_id": 1132,
            "level": 3,
            "name": "调酒",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1152,
            "parent_id": 878,
            "level": 2,
            "name": "趣味编程",
            "remark_name": null,
            "children": [
            {
            "id": 1153,
            "parent_id": 1152,
            "level": 3,
            "name": "趣味编程",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1156,
            "parent_id": 878,
            "level": 2,
            "name": "科学实验",
            "remark_name": null,
            "children": [
            {
            "id": 1157,
            "parent_id": 1156,
            "level": 3,
            "name": "科学实验",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1220,
            "parent_id": 878,
            "level": 2,
            "name": "动物饲养",
            "remark_name": null,
            "children": [
            {
            "id": 1221,
            "parent_id": 1220,
            "level": 3,
            "name": "动物饲养",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1222,
            "parent_id": 878,
            "level": 2,
            "name": "脑力训练",
            "remark_name": null,
            "children": [
            {
            "id": 1571,
            "parent_id": 1222,
            "level": 3,
            "name": "思维导图",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1223,
            "parent_id": 1222,
            "level": 3,
            "name": "记忆力",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1224,
            "parent_id": 1222,
            "level": 3,
            "name": "思维训练",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1225,
            "parent_id": 878,
            "level": 2,
            "name": "模型",
            "remark_name": null,
            "children": [
            {
            "id": 1226,
            "parent_id": 1225,
            "level": 3,
            "name": "车辆模型",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1227,
            "parent_id": 1225,
            "level": 3,
            "name": "航模",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1228,
            "parent_id": 1225,
            "level": 3,
            "name": "船模",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1229,
            "parent_id": 878,
            "level": 2,
            "name": "阅读",
            "remark_name": null,
            "children": [
            {
            "id": 1230,
            "parent_id": 1229,
            "level": 3,
            "name": "阅读",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1231,
            "parent_id": 878,
            "level": 2,
            "name": "写作",
            "remark_name": null,
            "children": [
            {
            "id": 1232,
            "parent_id": 1231,
            "level": 3,
            "name": "写作",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1233,
            "parent_id": 878,
            "level": 2,
            "name": "易经",
            "remark_name": null,
            "children": [
            {
            "id": 1588,
            "parent_id": 1233,
            "level": 3,
            "name": "连山易",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1234,
            "parent_id": 1233,
            "level": 3,
            "name": "周易",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1566,
            "parent_id": 1233,
            "level": 3,
            "name": "伏羲易",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 783,
            "parent_id": 0,
            "level": 1,
            "name": "出国留学",
            "remark_name": null,
            "children": [
            {
            "id": 784,
            "parent_id": 783,
            "level": 2,
            "name": "留学考试",
            "remark_name": null,
            "children": [
            {
            "id": 785,
            "parent_id": 784,
            "level": 3,
            "name": "托福",
            "remark_name": null,
            "children": []
            },
            {
            "id": 787,
            "parent_id": 784,
            "level": 3,
            "name": "雅思",
            "remark_name": null,
            "children": []
            },
            {
            "id": 788,
            "parent_id": 784,
            "level": 3,
            "name": "SAT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 793,
            "parent_id": 784,
            "level": 3,
            "name": "GRE",
            "remark_name": null,
            "children": []
            },
            {
            "id": 794,
            "parent_id": 784,
            "level": 3,
            "name": "GMAT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 786,
            "parent_id": 784,
            "level": 3,
            "name": "TOEFL Junior",
            "remark_name": null,
            "children": []
            },
            {
            "id": 791,
            "parent_id": 784,
            "level": 3,
            "name": "ACT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 792,
            "parent_id": 784,
            "level": 3,
            "name": "SSAT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1504,
            "parent_id": 784,
            "level": 3,
            "name": "WACE",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1518,
            "parent_id": 784,
            "level": 3,
            "name": "国际高中课程",
            "remark_name": null,
            "children": []
            },
            {
            "id": 795,
            "parent_id": 784,
            "level": 3,
            "name": "AP*Exam",
            "remark_name": null,
            "children": []
            },
            {
            "id": 796,
            "parent_id": 784,
            "level": 3,
            "name": "IBCourse",
            "remark_name": null,
            "children": []
            },
            {
            "id": 797,
            "parent_id": 784,
            "level": 3,
            "name": "LSAT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 798,
            "parent_id": 784,
            "level": 3,
            "name": "A-Level",
            "remark_name": null,
            "children": []
            },
            {
            "id": 799,
            "parent_id": 784,
            "level": 3,
            "name": "O-Level",
            "remark_name": null,
            "children": []
            },
            {
            "id": 800,
            "parent_id": 784,
            "level": 3,
            "name": "PTE",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1148,
            "parent_id": 784,
            "level": 3,
            "name": "留学预科",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1589,
            "parent_id": 784,
            "level": 3,
            "name": "TOPIK",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1590,
            "parent_id": 784,
            "level": 3,
            "name": "JLPT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1591,
            "parent_id": 784,
            "level": 3,
            "name": "J.test",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1592,
            "parent_id": 784,
            "level": 3,
            "name": "德福",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1593,
            "parent_id": 784,
            "level": 3,
            "name": "DSH",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1594,
            "parent_id": 784,
            "level": 3,
            "name": "TCF/TEF",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1595,
            "parent_id": 784,
            "level": 3,
            "name": "DELE",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1596,
            "parent_id": 784,
            "level": 3,
            "name": "SIELECILS",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 801,
            "parent_id": 783,
            "level": 2,
            "name": "留学技巧",
            "remark_name": null,
            "children": [
            {
            "id": 802,
            "parent_id": 801,
            "level": 3,
            "name": "择校辅导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 803,
            "parent_id": 801,
            "level": 3,
            "name": "文书辅导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 804,
            "parent_id": 801,
            "level": 3,
            "name": "签证辅导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 805,
            "parent_id": 801,
            "level": 3,
            "name": "面试辅导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1154,
            "parent_id": 801,
            "level": 3,
            "name": "背景提升",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 806,
            "parent_id": 783,
            "level": 2,
            "name": "留学申请",
            "remark_name": null,
            "children": [
            {
            "id": 807,
            "parent_id": 806,
            "level": 3,
            "name": "亚洲留学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 808,
            "parent_id": 806,
            "level": 3,
            "name": "美国留学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 809,
            "parent_id": 806,
            "level": 3,
            "name": "澳新留学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 810,
            "parent_id": 806,
            "level": 3,
            "name": "欧洲留学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1597,
            "parent_id": 806,
            "level": 3,
            "name": "加拿大留学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 811,
            "parent_id": 783,
            "level": 2,
            "name": "出国旅行",
            "remark_name": null,
            "children": [
            {
            "id": 812,
            "parent_id": 811,
            "level": 3,
            "name": "签证办理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 813,
            "parent_id": 811,
            "level": 3,
            "name": "行程安排",
            "remark_name": null,
            "children": []
            },
            {
            "id": 814,
            "parent_id": 811,
            "level": 3,
            "name": "景区攻略",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 815,
            "parent_id": 783,
            "level": 2,
            "name": "移民",
            "remark_name": null,
            "children": [
            {
            "id": 816,
            "parent_id": 815,
            "level": 3,
            "name": "移民",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 20,
            "parent_id": 0,
            "level": 1,
            "name": "学前",
            "remark_name": null,
            "children": [
            {
            "id": 21,
            "parent_id": 20,
            "level": 2,
            "name": "早教",
            "remark_name": null,
            "children": [
            {
            "id": 22,
            "parent_id": 21,
            "level": 3,
            "name": "益智",
            "remark_name": null,
            "children": []
            },
            {
            "id": 23,
            "parent_id": 21,
            "level": 3,
            "name": "潜能开发",
            "remark_name": null,
            "children": []
            },
            {
            "id": 25,
            "parent_id": 21,
            "level": 3,
            "name": "亲子",
            "remark_name": null,
            "children": []
            },
            {
            "id": 26,
            "parent_id": 21,
            "level": 3,
            "name": "启蒙",
            "remark_name": null,
            "children": []
            },
            {
            "id": 24,
            "parent_id": 21,
            "level": 3,
            "name": "感统训练",
            "remark_name": null,
            "children": []
            },
            {
            "id": 27,
            "parent_id": 21,
            "level": 3,
            "name": "才艺",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 28,
            "parent_id": 20,
            "level": 2,
            "name": "幼儿园",
            "remark_name": null,
            "children": [
            {
            "id": 31,
            "parent_id": 28,
            "level": 3,
            "name": "语言",
            "remark_name": null,
            "children": []
            },
            {
            "id": 36,
            "parent_id": 28,
            "level": 3,
            "name": "数学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 41,
            "parent_id": 28,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 46,
            "parent_id": 28,
            "level": 3,
            "name": "艺术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 51,
            "parent_id": 28,
            "level": 3,
            "name": "科学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 56,
            "parent_id": 28,
            "level": 3,
            "name": "社会教育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 66,
            "parent_id": 28,
            "level": 3,
            "name": "体育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 76,
            "parent_id": 28,
            "level": 3,
            "name": "多元智能",
            "remark_name": null,
            "children": []
            },
            {
            "id": 29,
            "parent_id": 28,
            "level": 3,
            "name": "择园经验",
            "remark_name": null,
            "children": []
            },
            {
            "id": 30,
            "parent_id": 28,
            "level": 3,
            "name": "政策信息",
            "remark_name": null,
            "children": []
            },
            {
            "id": 61,
            "parent_id": 28,
            "level": 3,
            "name": "健康",
            "remark_name": null,
            "children": []
            },
            {
            "id": 71,
            "parent_id": 28,
            "level": 3,
            "name": "创意",
            "remark_name": null,
            "children": []
            },
            {
            "id": 81,
            "parent_id": 28,
            "level": 3,
            "name": "手工活动",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 86,
            "parent_id": 20,
            "level": 2,
            "name": "学前艺术",
            "remark_name": null,
            "children": [
            {
            "id": 88,
            "parent_id": 86,
            "level": 3,
            "name": "学前艺体",
            "remark_name": null,
            "children": []
            },
            {
            "id": 87,
            "parent_id": 86,
            "level": 3,
            "name": "奥尔夫音乐",
            "remark_name": null,
            "children": []
            },
            {
            "id": 89,
            "parent_id": 86,
            "level": 3,
            "name": "蒙氏教育",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 90,
            "parent_id": 20,
            "level": 2,
            "name": "幼升小",
            "remark_name": null,
            "children": [
            {
            "id": 92,
            "parent_id": 90,
            "level": 3,
            "name": "咨询",
            "remark_name": null,
            "children": []
            },
            {
            "id": 95,
            "parent_id": 90,
            "level": 3,
            "name": "语言",
            "remark_name": null,
            "children": []
            },
            {
            "id": 96,
            "parent_id": 90,
            "level": 3,
            "name": "数学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 97,
            "parent_id": 90,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 98,
            "parent_id": 90,
            "level": 3,
            "name": "艺术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 99,
            "parent_id": 90,
            "level": 3,
            "name": "科学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 103,
            "parent_id": 90,
            "level": 3,
            "name": "创意",
            "remark_name": null,
            "children": []
            },
            {
            "id": 91,
            "parent_id": 90,
            "level": 3,
            "name": "择校",
            "remark_name": null,
            "children": []
            },
            {
            "id": 93,
            "parent_id": 90,
            "level": 3,
            "name": "简历",
            "remark_name": null,
            "children": []
            },
            {
            "id": 94,
            "parent_id": 90,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            },
            {
            "id": 100,
            "parent_id": 90,
            "level": 3,
            "name": "社会教育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 101,
            "parent_id": 90,
            "level": 3,
            "name": "健康",
            "remark_name": null,
            "children": []
            },
            {
            "id": 102,
            "parent_id": 90,
            "level": 3,
            "name": "体育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 104,
            "parent_id": 90,
            "level": 3,
            "name": "手工",
            "remark_name": null,
            "children": []
            },
            {
            "id": 105,
            "parent_id": 90,
            "level": 3,
            "name": "习惯养成",
            "remark_name": null,
            "children": []
            },
            {
            "id": 106,
            "parent_id": 90,
            "level": 3,
            "name": "纪律养成",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 107,
            "parent_id": 0,
            "level": 1,
            "name": "小学",
            "remark_name": null,
            "children": [
            {
            "id": 1526,
            "parent_id": 107,
            "level": 2,
            "name": "托管",
            "remark_name": null,
            "children": [
            {
            "id": 1527,
            "parent_id": 1526,
            "level": 3,
            "name": "托管",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 108,
            "parent_id": 107,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 109,
            "parent_id": 108,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 110,
            "parent_id": 108,
            "level": 3,
            "name": "一年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 111,
            "parent_id": 108,
            "level": 3,
            "name": "二年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 112,
            "parent_id": 108,
            "level": 3,
            "name": "三年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 113,
            "parent_id": 108,
            "level": 3,
            "name": "四年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 114,
            "parent_id": 108,
            "level": 3,
            "name": "五年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 115,
            "parent_id": 108,
            "level": 3,
            "name": "六年级",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 116,
            "parent_id": 107,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 117,
            "parent_id": 116,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 118,
            "parent_id": 116,
            "level": 3,
            "name": "一年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 119,
            "parent_id": 116,
            "level": 3,
            "name": "二年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 120,
            "parent_id": 116,
            "level": 3,
            "name": "三年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 121,
            "parent_id": 116,
            "level": 3,
            "name": "四年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 122,
            "parent_id": 116,
            "level": 3,
            "name": "五年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 123,
            "parent_id": 116,
            "level": 3,
            "name": "六年级",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 124,
            "parent_id": 107,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 125,
            "parent_id": 124,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 126,
            "parent_id": 124,
            "level": 3,
            "name": "一年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 127,
            "parent_id": 124,
            "level": 3,
            "name": "二年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 128,
            "parent_id": 124,
            "level": 3,
            "name": "三年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 129,
            "parent_id": 124,
            "level": 3,
            "name": "四年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 130,
            "parent_id": 124,
            "level": 3,
            "name": "五年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 131,
            "parent_id": 124,
            "level": 3,
            "name": "六年级",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 132,
            "parent_id": 107,
            "level": 2,
            "name": "奥数",
            "remark_name": null,
            "children": [
            {
            "id": 134,
            "parent_id": 132,
            "level": 3,
            "name": "一年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 133,
            "parent_id": 132,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 136,
            "parent_id": 132,
            "level": 3,
            "name": "三年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 137,
            "parent_id": 132,
            "level": 3,
            "name": "四年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 138,
            "parent_id": 132,
            "level": 3,
            "name": "五年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 135,
            "parent_id": 132,
            "level": 3,
            "name": "二年级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 139,
            "parent_id": 132,
            "level": 3,
            "name": "六年级",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1119,
            "parent_id": 107,
            "level": 2,
            "name": "国学",
            "remark_name": null,
            "children": [
            {
            "id": 1120,
            "parent_id": 1119,
            "level": 3,
            "name": "国学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1149,
            "parent_id": 107,
            "level": 2,
            "name": "能力提升",
            "remark_name": null,
            "children": [
            {
            "id": 1150,
            "parent_id": 1149,
            "level": 3,
            "name": "能力提升",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1159,
            "parent_id": 107,
            "level": 2,
            "name": "安全培训",
            "remark_name": null,
            "children": [
            {
            "id": 1160,
            "parent_id": 1159,
            "level": 3,
            "name": "安全培训",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1161,
            "parent_id": 107,
            "level": 2,
            "name": "财商培训",
            "remark_name": null,
            "children": [
            {
            "id": 1162,
            "parent_id": 1161,
            "level": 3,
            "name": "财商培训",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1243,
            "parent_id": 107,
            "level": 2,
            "name": "学习方法",
            "remark_name": null,
            "children": [
            {
            "id": 1244,
            "parent_id": 1243,
            "level": 3,
            "name": "学习方法",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 140,
            "parent_id": 0,
            "level": 1,
            "name": "小升初",
            "remark_name": null,
            "children": [
            {
            "id": 141,
            "parent_id": 140,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 142,
            "parent_id": 141,
            "level": 3,
            "name": "数学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 143,
            "parent_id": 140,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 144,
            "parent_id": 143,
            "level": 3,
            "name": "语文",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 145,
            "parent_id": 140,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 146,
            "parent_id": 145,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 147,
            "parent_id": 140,
            "level": 2,
            "name": "择校",
            "remark_name": null,
            "children": [
            {
            "id": 148,
            "parent_id": 147,
            "level": 3,
            "name": "择校",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 151,
            "parent_id": 140,
            "level": 2,
            "name": "咨询",
            "remark_name": null,
            "children": [
            {
            "id": 152,
            "parent_id": 151,
            "level": 3,
            "name": "咨询",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 153,
            "parent_id": 140,
            "level": 2,
            "name": "简历",
            "remark_name": null,
            "children": [
            {
            "id": 154,
            "parent_id": 153,
            "level": 3,
            "name": "简历",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 149,
            "parent_id": 140,
            "level": 2,
            "name": "政策分析",
            "remark_name": null,
            "children": [
            {
            "id": 150,
            "parent_id": 149,
            "level": 3,
            "name": "政策分析",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 155,
            "parent_id": 140,
            "level": 2,
            "name": "面试",
            "remark_name": null,
            "children": [
            {
            "id": 156,
            "parent_id": 155,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 157,
            "parent_id": 140,
            "level": 2,
            "name": "特长",
            "remark_name": null,
            "children": [
            {
            "id": 158,
            "parent_id": 157,
            "level": 3,
            "name": "特长",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 159,
            "parent_id": 140,
            "level": 2,
            "name": "三一口语",
            "remark_name": null,
            "children": [
            {
            "id": 160,
            "parent_id": 159,
            "level": 3,
            "name": "三一口语",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 161,
            "parent_id": 0,
            "level": 1,
            "name": "初中",
            "remark_name": null,
            "children": [
            {
            "id": 162,
            "parent_id": 161,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 163,
            "parent_id": 162,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 164,
            "parent_id": 162,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 165,
            "parent_id": 162,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 166,
            "parent_id": 162,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 167,
            "parent_id": 161,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 168,
            "parent_id": 167,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 169,
            "parent_id": 167,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 170,
            "parent_id": 167,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 171,
            "parent_id": 167,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 172,
            "parent_id": 161,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 173,
            "parent_id": 172,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 174,
            "parent_id": 172,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 175,
            "parent_id": 172,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 176,
            "parent_id": 172,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 177,
            "parent_id": 161,
            "level": 2,
            "name": "地理",
            "remark_name": null,
            "children": [
            {
            "id": 178,
            "parent_id": 177,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 179,
            "parent_id": 177,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 180,
            "parent_id": 177,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 181,
            "parent_id": 177,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 182,
            "parent_id": 161,
            "level": 2,
            "name": "政治",
            "remark_name": null,
            "children": [
            {
            "id": 183,
            "parent_id": 182,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 184,
            "parent_id": 182,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 185,
            "parent_id": 182,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 186,
            "parent_id": 182,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 187,
            "parent_id": 161,
            "level": 2,
            "name": "物理",
            "remark_name": null,
            "children": [
            {
            "id": 188,
            "parent_id": 187,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 189,
            "parent_id": 187,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 190,
            "parent_id": 187,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 191,
            "parent_id": 187,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 192,
            "parent_id": 161,
            "level": 2,
            "name": "化学",
            "remark_name": null,
            "children": [
            {
            "id": 193,
            "parent_id": 192,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 194,
            "parent_id": 192,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 195,
            "parent_id": 192,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 196,
            "parent_id": 192,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 197,
            "parent_id": 161,
            "level": 2,
            "name": "历史",
            "remark_name": null,
            "children": [
            {
            "id": 198,
            "parent_id": 197,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 199,
            "parent_id": 197,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 200,
            "parent_id": 197,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 201,
            "parent_id": 197,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 202,
            "parent_id": 161,
            "level": 2,
            "name": "生物",
            "remark_name": null,
            "children": [
            {
            "id": 203,
            "parent_id": 202,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 204,
            "parent_id": 202,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 205,
            "parent_id": 202,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 206,
            "parent_id": 202,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 207,
            "parent_id": 161,
            "level": 2,
            "name": "全科辅导",
            "remark_name": null,
            "children": [
            {
            "id": 208,
            "parent_id": 207,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 209,
            "parent_id": 207,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 210,
            "parent_id": 207,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 211,
            "parent_id": 207,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 212,
            "parent_id": 161,
            "level": 2,
            "name": "自然科学",
            "remark_name": null,
            "children": [
            {
            "id": 213,
            "parent_id": 212,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 214,
            "parent_id": 212,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 215,
            "parent_id": 212,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 216,
            "parent_id": 212,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 217,
            "parent_id": 161,
            "level": 2,
            "name": "英文版数学",
            "remark_name": null,
            "children": [
            {
            "id": 218,
            "parent_id": 217,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 219,
            "parent_id": 217,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 220,
            "parent_id": 217,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 221,
            "parent_id": 217,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 232,
            "parent_id": 161,
            "level": 2,
            "name": "奥数",
            "remark_name": null,
            "children": [
            {
            "id": 233,
            "parent_id": 232,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 234,
            "parent_id": 232,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 235,
            "parent_id": 232,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 236,
            "parent_id": 232,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 222,
            "parent_id": 161,
            "level": 2,
            "name": "英文版物理",
            "remark_name": null,
            "children": [
            {
            "id": 223,
            "parent_id": 222,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 224,
            "parent_id": 222,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 225,
            "parent_id": 222,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 226,
            "parent_id": 222,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 227,
            "parent_id": 161,
            "level": 2,
            "name": "英文版化学",
            "remark_name": null,
            "children": [
            {
            "id": 228,
            "parent_id": 227,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 229,
            "parent_id": 227,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 230,
            "parent_id": 227,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 231,
            "parent_id": 227,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1121,
            "parent_id": 161,
            "level": 2,
            "name": "国学",
            "remark_name": null,
            "children": [
            {
            "id": 1122,
            "parent_id": 1121,
            "level": 3,
            "name": "国学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1247,
            "parent_id": 161,
            "level": 2,
            "name": "学习方法",
            "remark_name": null,
            "children": [
            {
            "id": 1248,
            "parent_id": 1247,
            "level": 3,
            "name": "学习方法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1252,
            "parent_id": 161,
            "level": 2,
            "name": "科学",
            "remark_name": null,
            "children": [
            {
            "id": 1253,
            "parent_id": 1252,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1254,
            "parent_id": 1252,
            "level": 3,
            "name": "初一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1255,
            "parent_id": 1252,
            "level": 3,
            "name": "初二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1256,
            "parent_id": 1252,
            "level": 3,
            "name": "初三",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 237,
            "parent_id": 0,
            "level": 1,
            "name": "中考",
            "remark_name": null,
            "children": [
            {
            "id": 238,
            "parent_id": 237,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 239,
            "parent_id": 238,
            "level": 3,
            "name": "数学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 240,
            "parent_id": 237,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 241,
            "parent_id": 240,
            "level": 3,
            "name": "语文",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 242,
            "parent_id": 237,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 243,
            "parent_id": 242,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 244,
            "parent_id": 237,
            "level": 2,
            "name": "地理",
            "remark_name": null,
            "children": [
            {
            "id": 245,
            "parent_id": 244,
            "level": 3,
            "name": "地理",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 246,
            "parent_id": 237,
            "level": 2,
            "name": "政治",
            "remark_name": null,
            "children": [
            {
            "id": 247,
            "parent_id": 246,
            "level": 3,
            "name": "政治",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 248,
            "parent_id": 237,
            "level": 2,
            "name": "物理",
            "remark_name": null,
            "children": [
            {
            "id": 249,
            "parent_id": 248,
            "level": 3,
            "name": "物理",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 250,
            "parent_id": 237,
            "level": 2,
            "name": "化学",
            "remark_name": null,
            "children": [
            {
            "id": 251,
            "parent_id": 250,
            "level": 3,
            "name": "化学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 252,
            "parent_id": 237,
            "level": 2,
            "name": "历史",
            "remark_name": null,
            "children": [
            {
            "id": 253,
            "parent_id": 252,
            "level": 3,
            "name": "历史",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 254,
            "parent_id": 237,
            "level": 2,
            "name": "生物",
            "remark_name": null,
            "children": [
            {
            "id": 255,
            "parent_id": 254,
            "level": 3,
            "name": "生物",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 256,
            "parent_id": 237,
            "level": 2,
            "name": "理综",
            "remark_name": null,
            "children": [
            {
            "id": 257,
            "parent_id": 256,
            "level": 3,
            "name": "理综",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 258,
            "parent_id": 237,
            "level": 2,
            "name": "文综",
            "remark_name": null,
            "children": [
            {
            "id": 259,
            "parent_id": 258,
            "level": 3,
            "name": "文综",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 260,
            "parent_id": 237,
            "level": 2,
            "name": "中考择校",
            "remark_name": null,
            "children": [
            {
            "id": 261,
            "parent_id": 260,
            "level": 3,
            "name": "中考择校",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 262,
            "parent_id": 237,
            "level": 2,
            "name": "中考全科辅导",
            "remark_name": null,
            "children": [
            {
            "id": 263,
            "parent_id": 262,
            "level": 3,
            "name": "中考全科辅导",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 264,
            "parent_id": 237,
            "level": 2,
            "name": "中考心理辅导",
            "remark_name": null,
            "children": [
            {
            "id": 265,
            "parent_id": 264,
            "level": 3,
            "name": "中考心理辅导",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1257,
            "parent_id": 237,
            "level": 2,
            "name": "科学",
            "remark_name": null,
            "children": [
            {
            "id": 1258,
            "parent_id": 1257,
            "level": 3,
            "name": "科学",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 266,
            "parent_id": 0,
            "level": 1,
            "name": "高中",
            "remark_name": null,
            "children": [
            {
            "id": 1532,
            "parent_id": 266,
            "level": 2,
            "name": "全科辅导",
            "remark_name": null,
            "children": [
            {
            "id": 1536,
            "parent_id": 1532,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1533,
            "parent_id": 1532,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1534,
            "parent_id": 1532,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1535,
            "parent_id": 1532,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 267,
            "parent_id": 266,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 268,
            "parent_id": 267,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 269,
            "parent_id": 267,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 270,
            "parent_id": 267,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1573,
            "parent_id": 267,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 271,
            "parent_id": 267,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 272,
            "parent_id": 266,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 273,
            "parent_id": 272,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 274,
            "parent_id": 272,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 275,
            "parent_id": 272,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1574,
            "parent_id": 272,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 276,
            "parent_id": 272,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 277,
            "parent_id": 266,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 278,
            "parent_id": 277,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 279,
            "parent_id": 277,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 280,
            "parent_id": 277,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1575,
            "parent_id": 277,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 281,
            "parent_id": 277,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 282,
            "parent_id": 266,
            "level": 2,
            "name": "地理",
            "remark_name": null,
            "children": [
            {
            "id": 283,
            "parent_id": 282,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 284,
            "parent_id": 282,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 285,
            "parent_id": 282,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1576,
            "parent_id": 282,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 286,
            "parent_id": 282,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 287,
            "parent_id": 266,
            "level": 2,
            "name": "政治",
            "remark_name": null,
            "children": [
            {
            "id": 288,
            "parent_id": 287,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 289,
            "parent_id": 287,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 290,
            "parent_id": 287,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1577,
            "parent_id": 287,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 291,
            "parent_id": 287,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 292,
            "parent_id": 266,
            "level": 2,
            "name": "物理",
            "remark_name": null,
            "children": [
            {
            "id": 293,
            "parent_id": 292,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 294,
            "parent_id": 292,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 295,
            "parent_id": 292,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1578,
            "parent_id": 292,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 296,
            "parent_id": 292,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 297,
            "parent_id": 266,
            "level": 2,
            "name": "化学",
            "remark_name": null,
            "children": [
            {
            "id": 298,
            "parent_id": 297,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 299,
            "parent_id": 297,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 300,
            "parent_id": 297,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1579,
            "parent_id": 297,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 301,
            "parent_id": 297,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 302,
            "parent_id": 266,
            "level": 2,
            "name": "历史",
            "remark_name": null,
            "children": [
            {
            "id": 303,
            "parent_id": 302,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 304,
            "parent_id": 302,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 305,
            "parent_id": 302,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1580,
            "parent_id": 302,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 306,
            "parent_id": 302,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 307,
            "parent_id": 266,
            "level": 2,
            "name": "生物",
            "remark_name": null,
            "children": [
            {
            "id": 308,
            "parent_id": 307,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 309,
            "parent_id": 307,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 310,
            "parent_id": 307,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1581,
            "parent_id": 307,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 311,
            "parent_id": 307,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 327,
            "parent_id": 266,
            "level": 2,
            "name": "英文版物理",
            "remark_name": null,
            "children": [
            {
            "id": 328,
            "parent_id": 327,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 329,
            "parent_id": 327,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 330,
            "parent_id": 327,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1585,
            "parent_id": 327,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 331,
            "parent_id": 327,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 337,
            "parent_id": 266,
            "level": 2,
            "name": "奥数",
            "remark_name": null,
            "children": [
            {
            "id": 338,
            "parent_id": 337,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 339,
            "parent_id": 337,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 340,
            "parent_id": 337,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1587,
            "parent_id": 337,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 341,
            "parent_id": 337,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 312,
            "parent_id": 266,
            "level": 2,
            "name": "生命科学",
            "remark_name": null,
            "children": [
            {
            "id": 313,
            "parent_id": 312,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 314,
            "parent_id": 312,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 315,
            "parent_id": 312,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1582,
            "parent_id": 312,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 316,
            "parent_id": 312,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 317,
            "parent_id": 266,
            "level": 2,
            "name": "信息技术",
            "remark_name": null,
            "children": [
            {
            "id": 318,
            "parent_id": 317,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 319,
            "parent_id": 317,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 320,
            "parent_id": 317,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1583,
            "parent_id": 317,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 321,
            "parent_id": 317,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 322,
            "parent_id": 266,
            "level": 2,
            "name": "英文版数学",
            "remark_name": null,
            "children": [
            {
            "id": 323,
            "parent_id": 322,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 324,
            "parent_id": 322,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 325,
            "parent_id": 322,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1584,
            "parent_id": 322,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 326,
            "parent_id": 322,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 332,
            "parent_id": 266,
            "level": 2,
            "name": "英文版化学",
            "remark_name": null,
            "children": [
            {
            "id": 333,
            "parent_id": 332,
            "level": 3,
            "name": "全部",
            "remark_name": null,
            "children": []
            },
            {
            "id": 334,
            "parent_id": 332,
            "level": 3,
            "name": "高一",
            "remark_name": null,
            "children": []
            },
            {
            "id": 335,
            "parent_id": 332,
            "level": 3,
            "name": "高二",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1586,
            "parent_id": 332,
            "level": 3,
            "name": "高三",
            "remark_name": null,
            "children": []
            },
            {
            "id": 336,
            "parent_id": 332,
            "level": 3,
            "name": "会考",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1123,
            "parent_id": 266,
            "level": 2,
            "name": "国学",
            "remark_name": null,
            "children": [
            {
            "id": 1124,
            "parent_id": 1123,
            "level": 3,
            "name": "国学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1130,
            "parent_id": 266,
            "level": 2,
            "name": "学业与职业规划",
            "remark_name": null,
            "children": [
            {
            "id": 1131,
            "parent_id": 1130,
            "level": 3,
            "name": "学业与职业规划",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1245,
            "parent_id": 266,
            "level": 2,
            "name": "学习方法",
            "remark_name": null,
            "children": [
            {
            "id": 1246,
            "parent_id": 1245,
            "level": 3,
            "name": "学习方法",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 342,
            "parent_id": 0,
            "level": 1,
            "name": "高考",
            "remark_name": null,
            "children": [
            {
            "id": 343,
            "parent_id": 342,
            "level": 2,
            "name": "数学",
            "remark_name": null,
            "children": [
            {
            "id": 344,
            "parent_id": 343,
            "level": 3,
            "name": "数学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 345,
            "parent_id": 342,
            "level": 2,
            "name": "语文",
            "remark_name": null,
            "children": [
            {
            "id": 346,
            "parent_id": 345,
            "level": 3,
            "name": "语文",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 347,
            "parent_id": 342,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 348,
            "parent_id": 347,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 349,
            "parent_id": 342,
            "level": 2,
            "name": "地理",
            "remark_name": null,
            "children": [
            {
            "id": 350,
            "parent_id": 349,
            "level": 3,
            "name": "地理",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 351,
            "parent_id": 342,
            "level": 2,
            "name": "政治",
            "remark_name": null,
            "children": [
            {
            "id": 352,
            "parent_id": 351,
            "level": 3,
            "name": "政治",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 353,
            "parent_id": 342,
            "level": 2,
            "name": "物理",
            "remark_name": null,
            "children": [
            {
            "id": 354,
            "parent_id": 353,
            "level": 3,
            "name": "物理",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 355,
            "parent_id": 342,
            "level": 2,
            "name": "化学",
            "remark_name": null,
            "children": [
            {
            "id": 356,
            "parent_id": 355,
            "level": 3,
            "name": "化学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 357,
            "parent_id": 342,
            "level": 2,
            "name": "历史",
            "remark_name": null,
            "children": [
            {
            "id": 358,
            "parent_id": 357,
            "level": 3,
            "name": "历史",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 359,
            "parent_id": 342,
            "level": 2,
            "name": "生物",
            "remark_name": null,
            "children": [
            {
            "id": 360,
            "parent_id": 359,
            "level": 3,
            "name": "生物",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 361,
            "parent_id": 342,
            "level": 2,
            "name": "理综",
            "remark_name": null,
            "children": [
            {
            "id": 362,
            "parent_id": 361,
            "level": 3,
            "name": "理综",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 363,
            "parent_id": 342,
            "level": 2,
            "name": "文综",
            "remark_name": null,
            "children": [
            {
            "id": 364,
            "parent_id": 363,
            "level": 3,
            "name": "文综",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 365,
            "parent_id": 342,
            "level": 2,
            "name": "高考志愿",
            "remark_name": null,
            "children": [
            {
            "id": 366,
            "parent_id": 365,
            "level": 3,
            "name": "高考志愿",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 367,
            "parent_id": 342,
            "level": 2,
            "name": "艺考文化课",
            "remark_name": null,
            "children": [
            {
            "id": 368,
            "parent_id": 367,
            "level": 3,
            "name": "艺考文化课",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 369,
            "parent_id": 342,
            "level": 2,
            "name": "港澳面试",
            "remark_name": null,
            "children": [
            {
            "id": 370,
            "parent_id": 369,
            "level": 3,
            "name": "港澳面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 371,
            "parent_id": 342,
            "level": 2,
            "name": "高考心理辅导",
            "remark_name": null,
            "children": [
            {
            "id": 372,
            "parent_id": 371,
            "level": 3,
            "name": "高考心理辅导",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1139,
            "parent_id": 342,
            "level": 2,
            "name": "影视高考",
            "remark_name": null,
            "children": [
            {
            "id": 1140,
            "parent_id": 1139,
            "level": 3,
            "name": "广播电视编导",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1141,
            "parent_id": 1139,
            "level": 3,
            "name": "播音与主持艺术",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1142,
            "parent_id": 1139,
            "level": 3,
            "name": "戏剧影视表演",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1143,
            "parent_id": 1139,
            "level": 3,
            "name": "摄影摄像",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1144,
            "parent_id": 1139,
            "level": 3,
            "name": "空乘模特",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1180,
            "parent_id": 342,
            "level": 2,
            "name": "高考咨询",
            "remark_name": null,
            "children": [
            {
            "id": 1181,
            "parent_id": 1180,
            "level": 3,
            "name": "高考咨询",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 387,
            "parent_id": 0,
            "level": 1,
            "name": "大学",
            "remark_name": null,
            "children": [
            {
            "id": 388,
            "parent_id": 387,
            "level": 2,
            "name": "英语考级",
            "remark_name": null,
            "children": [
            {
            "id": 389,
            "parent_id": 388,
            "level": 3,
            "name": "四级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 390,
            "parent_id": 388,
            "level": 3,
            "name": "六级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 391,
            "parent_id": 388,
            "level": 3,
            "name": "专四",
            "remark_name": null,
            "children": []
            },
            {
            "id": 392,
            "parent_id": 388,
            "level": 3,
            "name": "专八",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 393,
            "parent_id": 387,
            "level": 2,
            "name": "大学专业课",
            "remark_name": null,
            "children": [
            {
            "id": 1108,
            "parent_id": 393,
            "level": 3,
            "name": "大学专业课",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 410,
            "parent_id": 387,
            "level": 2,
            "name": "考研",
            "remark_name": null,
            "children": [
            {
            "id": 1537,
            "parent_id": 410,
            "level": 3,
            "name": "考研逻辑",
            "remark_name": null,
            "children": []
            },
            {
            "id": 411,
            "parent_id": 410,
            "level": 3,
            "name": "考研英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 414,
            "parent_id": 410,
            "level": 3,
            "name": "考研数学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 418,
            "parent_id": 410,
            "level": 3,
            "name": "考研政治",
            "remark_name": null,
            "children": []
            },
            {
            "id": 419,
            "parent_id": 410,
            "level": 3,
            "name": "考研专业课",
            "remark_name": null,
            "children": []
            },
            {
            "id": 444,
            "parent_id": 410,
            "level": 3,
            "name": "在职研究生",
            "remark_name": null,
            "children": []
            },
            {
            "id": 445,
            "parent_id": 410,
            "level": 3,
            "name": "MBA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 450,
            "parent_id": 410,
            "level": 3,
            "name": "EMBA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 451,
            "parent_id": 410,
            "level": 3,
            "name": "SMBA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 452,
            "parent_id": 410,
            "level": 3,
            "name": "MPA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 453,
            "parent_id": 410,
            "level": 3,
            "name": "MPAcc",
            "remark_name": null,
            "children": []
            },
            {
            "id": 454,
            "parent_id": 410,
            "level": 3,
            "name": "MEM",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 394,
            "parent_id": 387,
            "level": 2,
            "name": "考博",
            "remark_name": null,
            "children": [
            {
            "id": 395,
            "parent_id": 394,
            "level": 3,
            "name": "英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 396,
            "parent_id": 394,
            "level": 3,
            "name": "专业课",
            "remark_name": null,
            "children": []
            },
            {
            "id": 397,
            "parent_id": 394,
            "level": 3,
            "name": "面试辅导",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 406,
            "parent_id": 387,
            "level": 2,
            "name": "专科",
            "remark_name": null,
            "children": [
            {
            "id": 407,
            "parent_id": 406,
            "level": 3,
            "name": "中专",
            "remark_name": null,
            "children": []
            },
            {
            "id": 408,
            "parent_id": 406,
            "level": 3,
            "name": "大专",
            "remark_name": null,
            "children": []
            },
            {
            "id": 409,
            "parent_id": 406,
            "level": 3,
            "name": "专升本",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 398,
            "parent_id": 387,
            "level": 2,
            "name": "成人",
            "remark_name": null,
            "children": [
            {
            "id": 399,
            "parent_id": 398,
            "level": 3,
            "name": "自学考试",
            "remark_name": null,
            "children": []
            },
            {
            "id": 400,
            "parent_id": 398,
            "level": 3,
            "name": "成人高考",
            "remark_name": null,
            "children": []
            },
            {
            "id": 401,
            "parent_id": 398,
            "level": 3,
            "name": "远程教育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 402,
            "parent_id": 398,
            "level": 3,
            "name": "函授",
            "remark_name": null,
            "children": []
            },
            {
            "id": 403,
            "parent_id": 398,
            "level": 3,
            "name": "继续教育",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1125,
            "parent_id": 387,
            "level": 2,
            "name": "国学",
            "remark_name": null,
            "children": [
            {
            "id": 1126,
            "parent_id": 1125,
            "level": 3,
            "name": "国学",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1194,
            "parent_id": 387,
            "level": 2,
            "name": "生活指导",
            "remark_name": null,
            "children": [
            {
            "id": 1195,
            "parent_id": 1194,
            "level": 3,
            "name": "生活指导",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 714,
            "parent_id": 0,
            "level": 1,
            "name": "语言培训",
            "remark_name": null,
            "children": [
            {
            "id": 715,
            "parent_id": 714,
            "level": 2,
            "name": "英语",
            "remark_name": null,
            "children": [
            {
            "id": 1557,
            "parent_id": 715,
            "level": 3,
            "name": "翻译",
            "remark_name": null,
            "children": []
            },
            {
            "id": 716,
            "parent_id": 715,
            "level": 3,
            "name": "公共英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 722,
            "parent_id": 715,
            "level": 3,
            "name": "新概念英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 727,
            "parent_id": 715,
            "level": 3,
            "name": "外教英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 729,
            "parent_id": 715,
            "level": 3,
            "name": "口语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 732,
            "parent_id": 715,
            "level": 3,
            "name": "MSE剑桥英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 733,
            "parent_id": 715,
            "level": 3,
            "name": "BEC",
            "remark_name": null,
            "children": []
            },
            {
            "id": 734,
            "parent_id": 715,
            "level": 3,
            "name": "TOEIC",
            "remark_name": null,
            "children": []
            },
            {
            "id": 735,
            "parent_id": 715,
            "level": 3,
            "name": "职称英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 736,
            "parent_id": 715,
            "level": 3,
            "name": "外贸英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 737,
            "parent_id": 715,
            "level": 3,
            "name": "旅游英语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 738,
            "parent_id": 715,
            "level": 3,
            "name": "口译",
            "remark_name": null,
            "children": []
            },
            {
            "id": 741,
            "parent_id": 715,
            "level": 3,
            "name": "SLEP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 742,
            "parent_id": 715,
            "level": 3,
            "name": "词汇",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1236,
            "parent_id": 715,
            "level": 3,
            "name": "音标",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 743,
            "parent_id": 714,
            "level": 2,
            "name": "小语种",
            "remark_name": null,
            "children": [
            {
            "id": 1519,
            "parent_id": 743,
            "level": 3,
            "name": "阿拉伯语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1558,
            "parent_id": 743,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            },
            {
            "id": 744,
            "parent_id": 743,
            "level": 3,
            "name": "日语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 751,
            "parent_id": 743,
            "level": 3,
            "name": "法语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 756,
            "parent_id": 743,
            "level": 3,
            "name": "韩语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 759,
            "parent_id": 743,
            "level": 3,
            "name": "德语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 765,
            "parent_id": 743,
            "level": 3,
            "name": "西班牙语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 769,
            "parent_id": 743,
            "level": 3,
            "name": "俄语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 773,
            "parent_id": 743,
            "level": 3,
            "name": "意大利语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 776,
            "parent_id": 743,
            "level": 3,
            "name": "葡萄牙语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1235,
            "parent_id": 743,
            "level": 3,
            "name": "泰语",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 777,
            "parent_id": 714,
            "level": 2,
            "name": "汉语培训",
            "remark_name": null,
            "children": [
            {
            "id": 778,
            "parent_id": 777,
            "level": 3,
            "name": "普通话等级考试",
            "remark_name": null,
            "children": []
            },
            {
            "id": 779,
            "parent_id": 777,
            "level": 3,
            "name": "对外汉语",
            "remark_name": null,
            "children": []
            },
            {
            "id": 780,
            "parent_id": 777,
            "level": 3,
            "name": "方言培训",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 573,
            "parent_id": 0,
            "level": 1,
            "name": "IT",
            "remark_name": null,
            "children": [
            {
            "id": 574,
            "parent_id": 573,
            "level": 2,
            "name": "计算机证书",
            "remark_name": null,
            "children": [
            {
            "id": 575,
            "parent_id": 574,
            "level": 3,
            "name": "计算机等级",
            "remark_name": null,
            "children": []
            },
            {
            "id": 576,
            "parent_id": 574,
            "level": 3,
            "name": "软考",
            "remark_name": null,
            "children": []
            },
            {
            "id": 577,
            "parent_id": 574,
            "level": 3,
            "name": "认证考试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 578,
            "parent_id": 573,
            "level": 2,
            "name": "常用软件",
            "remark_name": null,
            "children": [
            {
            "id": 579,
            "parent_id": 578,
            "level": 3,
            "name": "PhotoShop",
            "remark_name": null,
            "children": []
            },
            {
            "id": 581,
            "parent_id": 578,
            "level": 3,
            "name": "IIIustrator",
            "remark_name": null,
            "children": []
            },
            {
            "id": 582,
            "parent_id": 578,
            "level": 3,
            "name": "FLASH",
            "remark_name": null,
            "children": []
            },
            {
            "id": 583,
            "parent_id": 578,
            "level": 3,
            "name": "Dreamwaver",
            "remark_name": null,
            "children": []
            },
            {
            "id": 580,
            "parent_id": 578,
            "level": 3,
            "name": "3Dmax",
            "remark_name": null,
            "children": []
            },
            {
            "id": 584,
            "parent_id": 578,
            "level": 3,
            "name": "Fireworks",
            "remark_name": null,
            "children": []
            },
            {
            "id": 585,
            "parent_id": 578,
            "level": 3,
            "name": "Maya",
            "remark_name": null,
            "children": []
            },
            {
            "id": 586,
            "parent_id": 578,
            "level": 3,
            "name": "Axure",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1182,
            "parent_id": 578,
            "level": 3,
            "name": "word",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1183,
            "parent_id": 578,
            "level": 3,
            "name": "ANSYS",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1184,
            "parent_id": 578,
            "level": 3,
            "name": "Director",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1185,
            "parent_id": 578,
            "level": 3,
            "name": "AutoCAD",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1186,
            "parent_id": 578,
            "level": 3,
            "name": "PPT",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1187,
            "parent_id": 578,
            "level": 3,
            "name": "excel",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1188,
            "parent_id": 578,
            "level": 3,
            "name": "思维导图",
            "remark_name": null,
            "children": []
            },
            {
            "id": 587,
            "parent_id": 578,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 588,
            "parent_id": 573,
            "level": 2,
            "name": "设计制作",
            "remark_name": null,
            "children": [
            {
            "id": 589,
            "parent_id": 588,
            "level": 3,
            "name": "工具软件",
            "remark_name": null,
            "children": []
            },
            {
            "id": 591,
            "parent_id": 588,
            "level": 3,
            "name": "平面设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 592,
            "parent_id": 588,
            "level": 3,
            "name": "页面设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 594,
            "parent_id": 588,
            "level": 3,
            "name": "网站制作",
            "remark_name": null,
            "children": []
            },
            {
            "id": 597,
            "parent_id": 588,
            "level": 3,
            "name": "UI",
            "remark_name": null,
            "children": []
            },
            {
            "id": 598,
            "parent_id": 588,
            "level": 3,
            "name": "音视频处理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 590,
            "parent_id": 588,
            "level": 3,
            "name": "工业设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 593,
            "parent_id": 588,
            "level": 3,
            "name": "游戏设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 595,
            "parent_id": 588,
            "level": 3,
            "name": "三维设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 596,
            "parent_id": 588,
            "level": 3,
            "name": "CG动画",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1191,
            "parent_id": 588,
            "level": 3,
            "name": "动画制作",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1192,
            "parent_id": 588,
            "level": 3,
            "name": "Web前端开发",
            "remark_name": null,
            "children": []
            },
            {
            "id": 599,
            "parent_id": 588,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 600,
            "parent_id": 573,
            "level": 2,
            "name": "编程语言",
            "remark_name": null,
            "children": [
            {
            "id": 601,
            "parent_id": 600,
            "level": 3,
            "name": "PHP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 602,
            "parent_id": 600,
            "level": 3,
            "name": "C",
            "remark_name": null,
            "children": []
            },
            {
            "id": 603,
            "parent_id": 600,
            "level": 3,
            "name": "Java",
            "remark_name": null,
            "children": []
            },
            {
            "id": 604,
            "parent_id": 600,
            "level": 3,
            "name": "VC",
            "remark_name": null,
            "children": []
            },
            {
            "id": 605,
            "parent_id": 600,
            "level": 3,
            "name": "VisualBasic",
            "remark_name": null,
            "children": []
            },
            {
            "id": 608,
            "parent_id": 600,
            "level": 3,
            "name": "C#",
            "remark_name": null,
            "children": []
            },
            {
            "id": 610,
            "parent_id": 600,
            "level": 3,
            "name": "嵌入式开发",
            "remark_name": null,
            "children": []
            },
            {
            "id": 606,
            "parent_id": 600,
            "level": 3,
            "name": "ASP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 607,
            "parent_id": 600,
            "level": 3,
            "name": "Objective-C",
            "remark_name": null,
            "children": []
            },
            {
            "id": 609,
            "parent_id": 600,
            "level": 3,
            "name": ".NET",
            "remark_name": null,
            "children": []
            },
            {
            "id": 611,
            "parent_id": 600,
            "level": 3,
            "name": "Python",
            "remark_name": null,
            "children": []
            },
            {
            "id": 612,
            "parent_id": 600,
            "level": 3,
            "name": "JSP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 613,
            "parent_id": 600,
            "level": 3,
            "name": "delphi",
            "remark_name": null,
            "children": []
            },
            {
            "id": 614,
            "parent_id": 600,
            "level": 3,
            "name": "PowerBuilder",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 615,
            "parent_id": 573,
            "level": 2,
            "name": "数据库管理",
            "remark_name": null,
            "children": [
            {
            "id": 616,
            "parent_id": 615,
            "level": 3,
            "name": "MySQL",
            "remark_name": null,
            "children": []
            },
            {
            "id": 617,
            "parent_id": 615,
            "level": 3,
            "name": "Oracle",
            "remark_name": null,
            "children": []
            },
            {
            "id": 618,
            "parent_id": 615,
            "level": 3,
            "name": "SQLServer",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 619,
            "parent_id": 573,
            "level": 2,
            "name": "系统运维",
            "remark_name": null,
            "children": [
            {
            "id": 620,
            "parent_id": 619,
            "level": 3,
            "name": "Linux",
            "remark_name": null,
            "children": []
            },
            {
            "id": 621,
            "parent_id": 619,
            "level": 3,
            "name": "Windows",
            "remark_name": null,
            "children": []
            },
            {
            "id": 622,
            "parent_id": 619,
            "level": 3,
            "name": "服务器集群",
            "remark_name": null,
            "children": []
            },
            {
            "id": 623,
            "parent_id": 619,
            "level": 3,
            "name": "网络管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 624,
            "parent_id": 619,
            "level": 3,
            "name": "网络安全",
            "remark_name": null,
            "children": []
            },
            {
            "id": 625,
            "parent_id": 619,
            "level": 3,
            "name": "其他",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 626,
            "parent_id": 573,
            "level": 2,
            "name": "移动互联",
            "remark_name": null,
            "children": [
            {
            "id": 627,
            "parent_id": 626,
            "level": 3,
            "name": "IOS",
            "remark_name": null,
            "children": []
            },
            {
            "id": 628,
            "parent_id": 626,
            "level": 3,
            "name": "Android",
            "remark_name": null,
            "children": []
            },
            {
            "id": 629,
            "parent_id": 626,
            "level": 3,
            "name": "Webapp",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 630,
            "parent_id": 573,
            "level": 2,
            "name": "系统架构",
            "remark_name": null,
            "children": [
            {
            "id": 631,
            "parent_id": 630,
            "level": 3,
            "name": "架构设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 632,
            "parent_id": 630,
            "level": 3,
            "name": "云计算",
            "remark_name": null,
            "children": []
            },
            {
            "id": 633,
            "parent_id": 630,
            "level": 3,
            "name": "基础架构",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1189,
            "parent_id": 573,
            "level": 2,
            "name": "产品",
            "remark_name": null,
            "children": [
            {
            "id": 1190,
            "parent_id": 1189,
            "level": 3,
            "name": "互联网思维",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 455,
            "parent_id": 0,
            "level": 1,
            "name": "管理",
            "remark_name": null,
            "children": [
            {
            "id": 456,
            "parent_id": 455,
            "level": 2,
            "name": "管理通用",
            "remark_name": null,
            "children": [
            {
            "id": 457,
            "parent_id": 456,
            "level": 3,
            "name": "管理技能",
            "remark_name": null,
            "children": []
            },
            {
            "id": 458,
            "parent_id": 456,
            "level": 3,
            "name": "职业素养",
            "remark_name": null,
            "children": []
            },
            {
            "id": 459,
            "parent_id": 456,
            "level": 3,
            "name": "国学智慧",
            "remark_name": null,
            "children": []
            },
            {
            "id": 460,
            "parent_id": 456,
            "level": 3,
            "name": "项目管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1193,
            "parent_id": 456,
            "level": 3,
            "name": "团队建设",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 461,
            "parent_id": 455,
            "level": 2,
            "name": "企业运营",
            "remark_name": null,
            "children": [
            {
            "id": 462,
            "parent_id": 461,
            "level": 3,
            "name": "人力资源培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 463,
            "parent_id": 461,
            "level": 3,
            "name": "生产管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 464,
            "parent_id": 461,
            "level": 3,
            "name": "销售管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 465,
            "parent_id": 461,
            "level": 3,
            "name": "市场营销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 466,
            "parent_id": 461,
            "level": 3,
            "name": "战略管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 467,
            "parent_id": 461,
            "level": 3,
            "name": "客户服务",
            "remark_name": null,
            "children": []
            },
            {
            "id": 468,
            "parent_id": 461,
            "level": 3,
            "name": "财务管理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 469,
            "parent_id": 461,
            "level": 3,
            "name": "采购物流",
            "remark_name": null,
            "children": []
            },
            {
            "id": 470,
            "parent_id": 461,
            "level": 3,
            "name": "SAP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 471,
            "parent_id": 461,
            "level": 3,
            "name": "岗前培训",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 472,
            "parent_id": 0,
            "level": 1,
            "name": "财经金融",
            "remark_name": null,
            "children": [
            {
            "id": 473,
            "parent_id": 472,
            "level": 2,
            "name": "金融",
            "remark_name": null,
            "children": [
            {
            "id": 1560,
            "parent_id": 473,
            "level": 3,
            "name": "基金从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1561,
            "parent_id": 473,
            "level": 3,
            "name": "FRM",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1562,
            "parent_id": 473,
            "level": 3,
            "name": "AFP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1563,
            "parent_id": 473,
            "level": 3,
            "name": "CFP",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1564,
            "parent_id": 473,
            "level": 3,
            "name": "金融实务",
            "remark_name": null,
            "children": []
            },
            {
            "id": 474,
            "parent_id": 473,
            "level": 3,
            "name": "银行从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 475,
            "parent_id": 473,
            "level": 3,
            "name": "CFA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 476,
            "parent_id": 473,
            "level": 3,
            "name": "金融分析师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 477,
            "parent_id": 473,
            "level": 3,
            "name": "理财规划师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 478,
            "parent_id": 473,
            "level": 3,
            "name": "精算师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 479,
            "parent_id": 473,
            "level": 3,
            "name": "证券从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 480,
            "parent_id": 473,
            "level": 3,
            "name": "保险从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 481,
            "parent_id": 473,
            "level": 3,
            "name": "期货从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 482,
            "parent_id": 473,
            "level": 3,
            "name": "银行内控",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 483,
            "parent_id": 472,
            "level": 2,
            "name": "经济",
            "remark_name": null,
            "children": [
            {
            "id": 484,
            "parent_id": 483,
            "level": 3,
            "name": "经济师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 485,
            "parent_id": 483,
            "level": 3,
            "name": "注册商务师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 486,
            "parent_id": 483,
            "level": 3,
            "name": "价格鉴证师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 487,
            "parent_id": 483,
            "level": 3,
            "name": "统计师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 488,
            "parent_id": 483,
            "level": 3,
            "name": "资产评估师",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 489,
            "parent_id": 472,
            "level": 2,
            "name": "财务审计",
            "remark_name": null,
            "children": [
            {
            "id": 490,
            "parent_id": 489,
            "level": 3,
            "name": "金融会计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 491,
            "parent_id": 489,
            "level": 3,
            "name": "会计职称",
            "remark_name": null,
            "children": []
            },
            {
            "id": 492,
            "parent_id": 489,
            "level": 3,
            "name": "会计从业资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 493,
            "parent_id": 489,
            "level": 3,
            "name": "注册会计师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 494,
            "parent_id": 489,
            "level": 3,
            "name": "美国会计师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 495,
            "parent_id": 489,
            "level": 3,
            "name": "ACCA",
            "remark_name": null,
            "children": []
            },
            {
            "id": 496,
            "parent_id": 489,
            "level": 3,
            "name": "注册税务师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 497,
            "parent_id": 489,
            "level": 3,
            "name": "审计师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 498,
            "parent_id": 489,
            "level": 3,
            "name": "CFO",
            "remark_name": null,
            "children": []
            },
            {
            "id": 499,
            "parent_id": 489,
            "level": 3,
            "name": "会计电算化",
            "remark_name": null,
            "children": []
            },
            {
            "id": 500,
            "parent_id": 489,
            "level": 3,
            "name": "会计实务",
            "remark_name": null,
            "children": []
            },
            {
            "id": 501,
            "parent_id": 489,
            "level": 3,
            "name": "注册管理会计师",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 817,
            "parent_id": 0,
            "level": 1,
            "name": "公务员",
            "remark_name": null,
            "children": [
            {
            "id": 818,
            "parent_id": 817,
            "level": 2,
            "name": "国家公务员",
            "remark_name": null,
            "children": [
            {
            "id": 819,
            "parent_id": 818,
            "level": 3,
            "name": "言语理解与表达",
            "remark_name": null,
            "children": []
            },
            {
            "id": 820,
            "parent_id": 818,
            "level": 3,
            "name": "数量关系",
            "remark_name": null,
            "children": []
            },
            {
            "id": 821,
            "parent_id": 818,
            "level": 3,
            "name": "判断推理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 822,
            "parent_id": 818,
            "level": 3,
            "name": "常识判断",
            "remark_name": null,
            "children": []
            },
            {
            "id": 823,
            "parent_id": 818,
            "level": 3,
            "name": "资料分析",
            "remark_name": null,
            "children": []
            },
            {
            "id": 824,
            "parent_id": 818,
            "level": 3,
            "name": "申论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 825,
            "parent_id": 818,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 826,
            "parent_id": 817,
            "level": 2,
            "name": "地方公务员",
            "remark_name": null,
            "children": [
            {
            "id": 827,
            "parent_id": 826,
            "level": 3,
            "name": "言语理解与表达",
            "remark_name": null,
            "children": []
            },
            {
            "id": 828,
            "parent_id": 826,
            "level": 3,
            "name": "数量关系",
            "remark_name": null,
            "children": []
            },
            {
            "id": 829,
            "parent_id": 826,
            "level": 3,
            "name": "判断推理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 830,
            "parent_id": 826,
            "level": 3,
            "name": "常识判断",
            "remark_name": null,
            "children": []
            },
            {
            "id": 831,
            "parent_id": 826,
            "level": 3,
            "name": "资料分析",
            "remark_name": null,
            "children": []
            },
            {
            "id": 832,
            "parent_id": 826,
            "level": 3,
            "name": "申论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 833,
            "parent_id": 826,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 834,
            "parent_id": 817,
            "level": 2,
            "name": "事业单位",
            "remark_name": null,
            "children": [
            {
            "id": 835,
            "parent_id": 834,
            "level": 3,
            "name": "行政职业能力测验",
            "remark_name": null,
            "children": []
            },
            {
            "id": 836,
            "parent_id": 834,
            "level": 3,
            "name": "综合写作",
            "remark_name": null,
            "children": []
            },
            {
            "id": 837,
            "parent_id": 834,
            "level": 3,
            "name": "公共基础知识",
            "remark_name": null,
            "children": []
            },
            {
            "id": 838,
            "parent_id": 834,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 839,
            "parent_id": 817,
            "level": 2,
            "name": "选调生",
            "remark_name": null,
            "children": [
            {
            "id": 840,
            "parent_id": 839,
            "level": 3,
            "name": "行政职业能力测验",
            "remark_name": null,
            "children": []
            },
            {
            "id": 841,
            "parent_id": 839,
            "level": 3,
            "name": "申论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 842,
            "parent_id": 839,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 843,
            "parent_id": 817,
            "level": 2,
            "name": "军转干",
            "remark_name": null,
            "children": [
            {
            "id": 844,
            "parent_id": 843,
            "level": 3,
            "name": "行政职业能力测验",
            "remark_name": null,
            "children": []
            },
            {
            "id": 845,
            "parent_id": 843,
            "level": 3,
            "name": "申论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 846,
            "parent_id": 843,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 847,
            "parent_id": 817,
            "level": 2,
            "name": "公安招警",
            "remark_name": null,
            "children": [
            {
            "id": 848,
            "parent_id": 847,
            "level": 3,
            "name": "行政职业能力测验",
            "remark_name": null,
            "children": []
            },
            {
            "id": 849,
            "parent_id": 847,
            "level": 3,
            "name": "申论",
            "remark_name": null,
            "children": []
            },
            {
            "id": 850,
            "parent_id": 847,
            "level": 3,
            "name": "公安基础知识",
            "remark_name": null,
            "children": []
            },
            {
            "id": 851,
            "parent_id": 847,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 852,
            "parent_id": 0,
            "level": 1,
            "name": "司法",
            "remark_name": null,
            "children": [
            {
            "id": 853,
            "parent_id": 852,
            "level": 2,
            "name": "民法",
            "remark_name": null,
            "children": [
            {
            "id": 854,
            "parent_id": 853,
            "level": 3,
            "name": "民法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 855,
            "parent_id": 852,
            "level": 2,
            "name": "刑法",
            "remark_name": null,
            "children": [
            {
            "id": 856,
            "parent_id": 855,
            "level": 3,
            "name": "刑法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 857,
            "parent_id": 852,
            "level": 2,
            "name": "行政法",
            "remark_name": null,
            "children": [
            {
            "id": 858,
            "parent_id": 857,
            "level": 3,
            "name": "行政法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 859,
            "parent_id": 852,
            "level": 2,
            "name": "商经法",
            "remark_name": null,
            "children": [
            {
            "id": 860,
            "parent_id": 859,
            "level": 3,
            "name": "商法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 861,
            "parent_id": 859,
            "level": 3,
            "name": "经济法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 862,
            "parent_id": 852,
            "level": 2,
            "name": "国际法",
            "remark_name": null,
            "children": [
            {
            "id": 863,
            "parent_id": 862,
            "level": 3,
            "name": "国际公法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 864,
            "parent_id": 862,
            "level": 3,
            "name": "国际私法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 865,
            "parent_id": 852,
            "level": 2,
            "name": "诉讼法",
            "remark_name": null,
            "children": [
            {
            "id": 866,
            "parent_id": 865,
            "level": 3,
            "name": "行诉法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 867,
            "parent_id": 865,
            "level": 3,
            "name": "民诉法与仲裁制度",
            "remark_name": null,
            "children": []
            },
            {
            "id": 868,
            "parent_id": 865,
            "level": 3,
            "name": "刑诉法",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 869,
            "parent_id": 852,
            "level": 2,
            "name": "理论法学",
            "remark_name": null,
            "children": [
            {
            "id": 870,
            "parent_id": 869,
            "level": 3,
            "name": "法理学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 871,
            "parent_id": 869,
            "level": 3,
            "name": "法制史",
            "remark_name": null,
            "children": []
            },
            {
            "id": 872,
            "parent_id": 869,
            "level": 3,
            "name": "宪法",
            "remark_name": null,
            "children": []
            },
            {
            "id": 873,
            "parent_id": 869,
            "level": 3,
            "name": "法治理论",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 874,
            "parent_id": 852,
            "level": 2,
            "name": "司法制度",
            "remark_name": null,
            "children": [
            {
            "id": 875,
            "parent_id": 874,
            "level": 3,
            "name": "司法制度",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 876,
            "parent_id": 852,
            "level": 2,
            "name": "论述题",
            "remark_name": null,
            "children": [
            {
            "id": 877,
            "parent_id": 876,
            "level": 3,
            "name": "论述题",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 502,
            "parent_id": 0,
            "level": 1,
            "name": "职业技能",
            "remark_name": null,
            "children": [
            {
            "id": 503,
            "parent_id": 502,
            "level": 2,
            "name": "设计制作",
            "remark_name": null,
            "children": [
            {
            "id": 504,
            "parent_id": 503,
            "level": 3,
            "name": "室内设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 505,
            "parent_id": 503,
            "level": 3,
            "name": "影视设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 506,
            "parent_id": 503,
            "level": 3,
            "name": "广告设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 507,
            "parent_id": 503,
            "level": 3,
            "name": "服装设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 508,
            "parent_id": 503,
            "level": 3,
            "name": "建筑设计及装饰",
            "remark_name": null,
            "children": []
            },
            {
            "id": 509,
            "parent_id": 503,
            "level": 3,
            "name": "数码设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 510,
            "parent_id": 503,
            "level": 3,
            "name": "产品设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 511,
            "parent_id": 503,
            "level": 3,
            "name": "美工培训",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 521,
            "parent_id": 502,
            "level": 2,
            "name": "工程",
            "remark_name": null,
            "children": [
            {
            "id": 522,
            "parent_id": 521,
            "level": 3,
            "name": "机械电气维修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 523,
            "parent_id": 521,
            "level": 3,
            "name": "数控及模具维修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 524,
            "parent_id": 521,
            "level": 3,
            "name": "电子技术维修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 525,
            "parent_id": 521,
            "level": 3,
            "name": "弱电工程维修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 526,
            "parent_id": 521,
            "level": 3,
            "name": "工程造价预算",
            "remark_name": null,
            "children": []
            },
            {
            "id": 527,
            "parent_id": 521,
            "level": 3,
            "name": "专业设备维修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 528,
            "parent_id": 521,
            "level": 3,
            "name": "暖通",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 529,
            "parent_id": 502,
            "level": 2,
            "name": "市场",
            "remark_name": null,
            "children": [
            {
            "id": 530,
            "parent_id": 529,
            "level": 3,
            "name": "SEO",
            "remark_name": null,
            "children": []
            },
            {
            "id": 531,
            "parent_id": 529,
            "level": 3,
            "name": "SEM",
            "remark_name": null,
            "children": []
            },
            {
            "id": 532,
            "parent_id": 529,
            "level": 3,
            "name": "EDM",
            "remark_name": null,
            "children": []
            },
            {
            "id": 533,
            "parent_id": 529,
            "level": 3,
            "name": "SNS",
            "remark_name": null,
            "children": []
            },
            {
            "id": 534,
            "parent_id": 529,
            "level": 3,
            "name": "淘宝营销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 535,
            "parent_id": 529,
            "level": 3,
            "name": "微信营销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 536,
            "parent_id": 529,
            "level": 3,
            "name": "数据库营销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 537,
            "parent_id": 529,
            "level": 3,
            "name": "电子商务",
            "remark_name": null,
            "children": []
            },
            {
            "id": 538,
            "parent_id": 529,
            "level": 3,
            "name": "对外贸易",
            "remark_name": null,
            "children": []
            },
            {
            "id": 539,
            "parent_id": 529,
            "level": 3,
            "name": "市场营销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 540,
            "parent_id": 529,
            "level": 3,
            "name": "推销",
            "remark_name": null,
            "children": []
            },
            {
            "id": 541,
            "parent_id": 529,
            "level": 3,
            "name": "销售",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1240,
            "parent_id": 529,
            "level": 3,
            "name": "电话销售",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1260,
            "parent_id": 529,
            "level": 3,
            "name": "网络营销",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 542,
            "parent_id": 502,
            "level": 2,
            "name": "创业求职",
            "remark_name": null,
            "children": [
            {
            "id": 543,
            "parent_id": 542,
            "level": 3,
            "name": "创业",
            "remark_name": null,
            "children": []
            },
            {
            "id": 544,
            "parent_id": 542,
            "level": 3,
            "name": "求职",
            "remark_name": null,
            "children": []
            },
            {
            "id": 545,
            "parent_id": 542,
            "level": 3,
            "name": "面试",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 546,
            "parent_id": 502,
            "level": 2,
            "name": "烹饪技能",
            "remark_name": null,
            "children": [
            {
            "id": 547,
            "parent_id": 546,
            "level": 3,
            "name": "川菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 548,
            "parent_id": 546,
            "level": 3,
            "name": "粤菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 549,
            "parent_id": 546,
            "level": 3,
            "name": "湘菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 550,
            "parent_id": 546,
            "level": 3,
            "name": "鲁菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 551,
            "parent_id": 546,
            "level": 3,
            "name": "徽菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 552,
            "parent_id": 546,
            "level": 3,
            "name": "闽菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 553,
            "parent_id": 546,
            "level": 3,
            "name": "浙菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 554,
            "parent_id": 546,
            "level": 3,
            "name": "苏菜",
            "remark_name": null,
            "children": []
            },
            {
            "id": 555,
            "parent_id": 546,
            "level": 3,
            "name": "其他菜系",
            "remark_name": null,
            "children": []
            },
            {
            "id": 556,
            "parent_id": 546,
            "level": 3,
            "name": "西餐",
            "remark_name": null,
            "children": []
            },
            {
            "id": 557,
            "parent_id": 546,
            "level": 3,
            "name": "糕点",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 558,
            "parent_id": 502,
            "level": 2,
            "name": "高级技工",
            "remark_name": null,
            "children": [
            {
            "id": 559,
            "parent_id": 558,
            "level": 3,
            "name": "汽修",
            "remark_name": null,
            "children": []
            },
            {
            "id": 560,
            "parent_id": 558,
            "level": 3,
            "name": "焊接",
            "remark_name": null,
            "children": []
            },
            {
            "id": 563,
            "parent_id": 558,
            "level": 3,
            "name": "美容美发",
            "remark_name": null,
            "children": []
            },
            {
            "id": 564,
            "parent_id": 558,
            "level": 3,
            "name": "美体培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 565,
            "parent_id": 558,
            "level": 3,
            "name": "推拿按摩",
            "remark_name": null,
            "children": []
            },
            {
            "id": 566,
            "parent_id": 558,
            "level": 3,
            "name": "美甲培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 567,
            "parent_id": 558,
            "level": 3,
            "name": "宠物饲养",
            "remark_name": null,
            "children": []
            },
            {
            "id": 568,
            "parent_id": 558,
            "level": 3,
            "name": "礼仪培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 569,
            "parent_id": 558,
            "level": 3,
            "name": "纹绣培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 570,
            "parent_id": 558,
            "level": 3,
            "name": "速录培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 571,
            "parent_id": 558,
            "level": 3,
            "name": "制版培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 572,
            "parent_id": 558,
            "level": 3,
            "name": "开锁培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1237,
            "parent_id": 558,
            "level": 3,
            "name": "录音",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1238,
            "parent_id": 558,
            "level": 3,
            "name": "婚庆策划",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1241,
            "parent_id": 558,
            "level": 3,
            "name": "强电",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1242,
            "parent_id": 558,
            "level": 3,
            "name": "弱电",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 561,
            "parent_id": 502,
            "level": 2,
            "name": "工程机械",
            "remark_name": null,
            "children": [
            {
            "id": 562,
            "parent_id": 561,
            "level": 3,
            "name": "数控机床",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1239,
            "parent_id": 561,
            "level": 3,
            "name": "挖掘机",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1134,
            "parent_id": 502,
            "level": 2,
            "name": "职业指导",
            "remark_name": null,
            "children": [
            {
            "id": 1135,
            "parent_id": 1134,
            "level": 3,
            "name": "职业咨询",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1136,
            "parent_id": 1134,
            "level": 3,
            "name": "职业规划",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 634,
            "parent_id": 0,
            "level": 1,
            "name": "资格考试",
            "remark_name": null,
            "children": [
            {
            "id": 635,
            "parent_id": 634,
            "level": 2,
            "name": "建造地产",
            "remark_name": null,
            "children": [
            {
            "id": 636,
            "parent_id": 635,
            "level": 3,
            "name": "室内设计师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 637,
            "parent_id": 635,
            "level": 3,
            "name": "一级建造师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 638,
            "parent_id": 635,
            "level": 3,
            "name": "二级建造师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 639,
            "parent_id": 635,
            "level": 3,
            "name": "监理工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 640,
            "parent_id": 635,
            "level": 3,
            "name": "咨询工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 641,
            "parent_id": 635,
            "level": 3,
            "name": "建筑师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 642,
            "parent_id": 635,
            "level": 3,
            "name": "项目管理师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 643,
            "parent_id": 635,
            "level": 3,
            "name": "造价工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 644,
            "parent_id": 635,
            "level": 3,
            "name": "招标师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 645,
            "parent_id": 635,
            "level": 3,
            "name": "物业管理师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 646,
            "parent_id": 635,
            "level": 3,
            "name": "质量工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 647,
            "parent_id": 635,
            "level": 3,
            "name": "安全工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 648,
            "parent_id": 635,
            "level": 3,
            "name": "施工员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 649,
            "parent_id": 635,
            "level": 3,
            "name": "房产估价",
            "remark_name": null,
            "children": []
            },
            {
            "id": 650,
            "parent_id": 635,
            "level": 3,
            "name": "测绘师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 651,
            "parent_id": 635,
            "level": 3,
            "name": "造价员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 652,
            "parent_id": 635,
            "level": 3,
            "name": "景观工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 653,
            "parent_id": 635,
            "level": 3,
            "name": "城市规划师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 654,
            "parent_id": 635,
            "level": 3,
            "name": "营造师",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 655,
            "parent_id": 634,
            "level": 2,
            "name": "职业资格",
            "remark_name": null,
            "children": [
            {
            "id": 656,
            "parent_id": 655,
            "level": 3,
            "name": "教师资格证",
            "remark_name": null,
            "children": []
            },
            {
            "id": 657,
            "parent_id": 655,
            "level": 3,
            "name": "师资培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 658,
            "parent_id": 655,
            "level": 3,
            "name": "航空类培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 659,
            "parent_id": 655,
            "level": 3,
            "name": "消防资格培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 660,
            "parent_id": 655,
            "level": 3,
            "name": "招调工",
            "remark_name": null,
            "children": []
            },
            {
            "id": 661,
            "parent_id": 655,
            "level": 3,
            "name": "导游资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 662,
            "parent_id": 655,
            "level": 3,
            "name": "司法秘书资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 663,
            "parent_id": 655,
            "level": 3,
            "name": "服装设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 664,
            "parent_id": 655,
            "level": 3,
            "name": "茶艺师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 665,
            "parent_id": 655,
            "level": 3,
            "name": "调酒师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 666,
            "parent_id": 655,
            "level": 3,
            "name": "电源工程师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 667,
            "parent_id": 655,
            "level": 3,
            "name": "珠宝鉴定设计",
            "remark_name": null,
            "children": []
            },
            {
            "id": 668,
            "parent_id": 655,
            "level": 3,
            "name": "车辆鉴定评估师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 669,
            "parent_id": 655,
            "level": 3,
            "name": "收银员资格培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 670,
            "parent_id": 655,
            "level": 3,
            "name": "录音师培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 671,
            "parent_id": 655,
            "level": 3,
            "name": "房地产协理培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1138,
            "parent_id": 655,
            "level": 3,
            "name": "飞机驾驶",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 672,
            "parent_id": 634,
            "level": 2,
            "name": "医药",
            "remark_name": null,
            "children": [
            {
            "id": 673,
            "parent_id": 672,
            "level": 3,
            "name": "执业医师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 674,
            "parent_id": 672,
            "level": 3,
            "name": "执业药师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 675,
            "parent_id": 672,
            "level": 3,
            "name": "护士资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 676,
            "parent_id": 672,
            "level": 3,
            "name": "卫生资格",
            "remark_name": null,
            "children": []
            },
            {
            "id": 677,
            "parent_id": 672,
            "level": 3,
            "name": "临床",
            "remark_name": null,
            "children": []
            },
            {
            "id": 678,
            "parent_id": 672,
            "level": 3,
            "name": "临床助理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 679,
            "parent_id": 672,
            "level": 3,
            "name": "中医",
            "remark_name": null,
            "children": []
            },
            {
            "id": 680,
            "parent_id": 672,
            "level": 3,
            "name": "中医助理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 681,
            "parent_id": 672,
            "level": 3,
            "name": "中西医",
            "remark_name": null,
            "children": []
            },
            {
            "id": 682,
            "parent_id": 672,
            "level": 3,
            "name": "中西医助理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 683,
            "parent_id": 672,
            "level": 3,
            "name": "口腔",
            "remark_name": null,
            "children": []
            },
            {
            "id": 684,
            "parent_id": 672,
            "level": 3,
            "name": "口腔助理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 685,
            "parent_id": 672,
            "level": 3,
            "name": "公共卫生",
            "remark_name": null,
            "children": []
            },
            {
            "id": 686,
            "parent_id": 672,
            "level": 3,
            "name": "公共卫生助理",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 687,
            "parent_id": 634,
            "level": 2,
            "name": "企业管理",
            "remark_name": null,
            "children": [
            {
            "id": 688,
            "parent_id": 687,
            "level": 3,
            "name": "人力资源师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 689,
            "parent_id": 687,
            "level": 3,
            "name": "法律顾问",
            "remark_name": null,
            "children": []
            },
            {
            "id": 690,
            "parent_id": 687,
            "level": 3,
            "name": "企业培训师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 691,
            "parent_id": 687,
            "level": 3,
            "name": "策划师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 692,
            "parent_id": 687,
            "level": 3,
            "name": "生产管理师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 693,
            "parent_id": 687,
            "level": 3,
            "name": "企业法律顾问",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 694,
            "parent_id": 634,
            "level": 2,
            "name": "外贸",
            "remark_name": null,
            "children": [
            {
            "id": 695,
            "parent_id": 694,
            "level": 3,
            "name": "报关员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 696,
            "parent_id": 694,
            "level": 3,
            "name": "报检员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 697,
            "parent_id": 694,
            "level": 3,
            "name": "外销员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 698,
            "parent_id": 694,
            "level": 3,
            "name": "电子商务师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 699,
            "parent_id": 694,
            "level": 3,
            "name": "国际商务师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 700,
            "parent_id": 694,
            "level": 3,
            "name": "货代员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 701,
            "parent_id": 694,
            "level": 3,
            "name": "商务单证员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 702,
            "parent_id": 694,
            "level": 3,
            "name": "物流师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 703,
            "parent_id": 694,
            "level": 3,
            "name": "采购师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 704,
            "parent_id": 694,
            "level": 3,
            "name": "营销师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 705,
            "parent_id": 694,
            "level": 3,
            "name": "外贸跟单员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 706,
            "parent_id": 694,
            "level": 3,
            "name": "内审员",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 707,
            "parent_id": 634,
            "level": 2,
            "name": "健康保健",
            "remark_name": null,
            "children": [
            {
            "id": 708,
            "parent_id": 707,
            "level": 3,
            "name": "公共营养师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 709,
            "parent_id": 707,
            "level": 3,
            "name": "营养配餐员",
            "remark_name": null,
            "children": []
            },
            {
            "id": 710,
            "parent_id": 707,
            "level": 3,
            "name": "心理咨询师",
            "remark_name": null,
            "children": []
            },
            {
            "id": 711,
            "parent_id": 707,
            "level": 3,
            "name": "催乳师培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 712,
            "parent_id": 707,
            "level": 3,
            "name": "育婴师培训",
            "remark_name": null,
            "children": []
            },
            {
            "id": 713,
            "parent_id": 707,
            "level": 3,
            "name": "健康护理员",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 1,
            "parent_id": 0,
            "level": 1,
            "name": "孕婴辅导",
            "remark_name": null,
            "children": [
            {
            "id": 2,
            "parent_id": 1,
            "level": 2,
            "name": "备孕",
            "remark_name": null,
            "children": [
            {
            "id": 3,
            "parent_id": 2,
            "level": 3,
            "name": "孕前准备",
            "remark_name": null,
            "children": []
            },
            {
            "id": 4,
            "parent_id": 2,
            "level": 3,
            "name": "孕前健康",
            "remark_name": null,
            "children": []
            },
            {
            "id": 5,
            "parent_id": 2,
            "level": 3,
            "name": "遗传优生",
            "remark_name": null,
            "children": []
            },
            {
            "id": 6,
            "parent_id": 2,
            "level": 3,
            "name": "不孕不育",
            "remark_name": null,
            "children": []
            },
            {
            "id": 7,
            "parent_id": 2,
            "level": 3,
            "name": "备孕生活",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 8,
            "parent_id": 1,
            "level": 2,
            "name": "孕期",
            "remark_name": null,
            "children": [
            {
            "id": 9,
            "parent_id": 8,
            "level": 3,
            "name": "孕早期",
            "remark_name": null,
            "children": []
            },
            {
            "id": 10,
            "parent_id": 8,
            "level": 3,
            "name": "孕中期",
            "remark_name": null,
            "children": []
            },
            {
            "id": 11,
            "parent_id": 8,
            "level": 3,
            "name": "孕晚期",
            "remark_name": null,
            "children": []
            },
            {
            "id": 12,
            "parent_id": 8,
            "level": 3,
            "name": "孕期营养",
            "remark_name": null,
            "children": []
            },
            {
            "id": 13,
            "parent_id": 8,
            "level": 3,
            "name": "医院选择",
            "remark_name": null,
            "children": []
            },
            {
            "id": 14,
            "parent_id": 8,
            "level": 3,
            "name": "母婴用品选择",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 15,
            "parent_id": 1,
            "level": 2,
            "name": "婴幼儿",
            "remark_name": null,
            "children": [
            {
            "id": 16,
            "parent_id": 15,
            "level": 3,
            "name": "婴幼儿常见疾病",
            "remark_name": null,
            "children": []
            },
            {
            "id": 17,
            "parent_id": 15,
            "level": 3,
            "name": "婴幼儿护理",
            "remark_name": null,
            "children": []
            },
            {
            "id": 18,
            "parent_id": 15,
            "level": 3,
            "name": "婴幼儿营养",
            "remark_name": null,
            "children": []
            },
            {
            "id": 19,
            "parent_id": 15,
            "level": 3,
            "name": "婴幼儿互动",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 373,
            "parent_id": 0,
            "level": 1,
            "name": "夏令营",
            "remark_name": null,
            "children": [
            {
            "id": 374,
            "parent_id": 373,
            "level": 2,
            "name": "夏令营",
            "remark_name": null,
            "children": [
            {
            "id": 375,
            "parent_id": 374,
            "level": 3,
            "name": "夏令营",
            "remark_name": null,
            "children": []
            }
            ]
            }
            ]
            },
            {
            "id": 376,
            "parent_id": 0,
            "level": 1,
            "name": "国际游学",
            "remark_name": null,
            "children": [
            {
            "id": 377,
            "parent_id": 376,
            "level": 2,
            "name": "美国",
            "remark_name": null,
            "children": [
            {
            "id": 378,
            "parent_id": 377,
            "level": 3,
            "name": "美国",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 379,
            "parent_id": 376,
            "level": 2,
            "name": "加拿大",
            "remark_name": null,
            "children": [
            {
            "id": 380,
            "parent_id": 379,
            "level": 3,
            "name": "加拿大",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 381,
            "parent_id": 376,
            "level": 2,
            "name": "欧洲",
            "remark_name": null,
            "children": [
            {
            "id": 382,
            "parent_id": 381,
            "level": 3,
            "name": "欧洲",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 383,
            "parent_id": 376,
            "level": 2,
            "name": "澳洲",
            "remark_name": null,
            "children": [
            {
            "id": 384,
            "parent_id": 383,
            "level": 3,
            "name": "澳洲",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 385,
            "parent_id": 376,
            "level": 2,
            "name": "南美洲",
            "remark_name": null,
            "children": [
            {
            "id": 386,
            "parent_id": 385,
            "level": 3,
            "name": "南美洲",
            "remark_name": null,
            "children": []
            }
            ]
            },
            {
            "id": 1598,
            "parent_id": 376,
            "level": 3,
            "name": "学生游学",
            "remark_name": null,
            "children": []
            },
            {
            "id": 1599,
            "parent_id": 376,
            "level": 3,
            "name": "成人游学",
            "remark_name": null,
            "children": []
            }
            ]
            }
            
    ];

    return data;
};
