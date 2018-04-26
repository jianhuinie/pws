/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "msg": "succ",
            "data": {
                "selected": [
                    "975"
                ],
                "selected_name": [
                    "艺术"
                ],
                "level1_list": [
                    {
                        "name": "全部",
                        "value": ""
                    },
                    {
                        "name": "艺术",
                        "value": "975"
                    },
                    {
                        "name": "体育",
                        "value": "921"
                    },
                    {
                        "name": "生活技能",
                        "value": "897"
                    },
                    {
                        "name": "兴趣",
                        "value": "878"
                    },
                    {
                        "name": "出国留学",
                        "value": "783"
                    },
                    {
                        "name": "学前",
                        "value": "20"
                    },
                    {
                        "name": "小学",
                        "value": "107"
                    },
                    {
                        "name": "小升初",
                        "value": "140"
                    },
                    {
                        "name": "初中",
                        "value": "161"
                    },
                    {
                        "name": "中考",
                        "value": "237"
                    },
                    {
                        "name": "高中",
                        "value": "266"
                    },
                    {
                        "name": "高考",
                        "value": "342"
                    },
                    {
                        "name": "大学",
                        "value": "387"
                    },
                    {
                        "name": "语言培训",
                        "value": "714"
                    },
                    {
                        "name": "IT",
                        "value": "573"
                    },
                    {
                        "name": "管理",
                        "value": "455"
                    },
                    {
                        "name": "财经金融",
                        "value": "472"
                    },
                    {
                        "name": "公务员",
                        "value": "817"
                    },
                    {
                        "name": "司法",
                        "value": "852"
                    },
                    {
                        "name": "职业技能",
                        "value": "502"
                    },
                    {
                        "name": "资格考试",
                        "value": "634"
                    },
                    {
                        "name": "孕婴辅导",
                        "value": "1"
                    },
                    {
                        "name": "夏令营",
                        "value": "373"
                    },
                    {
                        "name": "国际游学",
                        "value": "376"
                    },
                    {
                        "name": "其他",
                        "value": "1104"
                    }
                ],
                "level2_list": [
                    {
                        "name": "全部",
                        "value": "975"
                    },
                    {
                        "name": "器乐",
                        "value": "976",
                        "children": [
                            {
                                "name": "全部",
                                "value": "976"
                            },
                            {
                                "name": "吉他",
                                "value": "978"
                            },
                            {
                                "name": "钢琴",
                                "value": "977"
                            },
                            {
                                "name": "古筝",
                                "value": "979"
                            },
                            {
                                "name": "葫芦丝",
                                "value": "985"
                            },
                            {
                                "name": "小提琴",
                                "value": "980"
                            },
                            {
                                "name": "萨克斯",
                                "value": "984"
                            },
                            {
                                "name": "琵琶",
                                "value": "987"
                            },
                            {
                                "name": "二胡",
                                "value": "986"
                            },
                            {
                                "name": "电子琴",
                                "value": "983"
                            },
                            {
                                "name": "架子鼓",
                                "value": "982"
                            },
                            {
                                "name": "大提琴",
                                "value": "988"
                            },
                            {
                                "name": "电吉他",
                                "value": "989"
                            },
                            {
                                "name": "单簧管",
                                "value": "992"
                            },
                            {
                                "name": "双簧管",
                                "value": "1137"
                            },
                            {
                                "name": "笛子",
                                "value": "993"
                            },
                            {
                                "name": "扬琴",
                                "value": "995"
                            },
                            {
                                "name": "爵士鼓",
                                "value": "996"
                            },
                            {
                                "name": "长号",
                                "value": "1000"
                            },
                            {
                                "name": "唢呐",
                                "value": "1002"
                            },
                            {
                                "name": "小号",
                                "value": "999"
                            },
                            {
                                "name": "圆号",
                                "value": "1008"
                            },
                            {
                                "name": "手鼓",
                                "value": "1005"
                            },
                            {
                                "name": "非洲鼓",
                                "value": "1004"
                            },
                            {
                                "name": "马林巴",
                                "value": "1003"
                            },
                            {
                                "name": "口琴",
                                "value": "1001"
                            },
                            {
                                "name": "贝斯",
                                "value": "998"
                            },
                            {
                                "name": "手风琴",
                                "value": "997"
                            },
                            {
                                "name": "箫",
                                "value": "994"
                            },
                            {
                                "name": "尤克里里",
                                "value": "991"
                            },
                            {
                                "name": "竖琴",
                                "value": "990"
                            },
                            {
                                "name": "古琴",
                                "value": "981"
                            },
                            {
                                "name": "笙",
                                "value": "1530"
                            },
                            {
                                "name": "陶笛",
                                "value": "1531"
                            },
                            {
                                "name": "巴扬手风琴",
                                "value": "1556"
                            },
                            {
                                "name": "箜篌",
                                "value": "1127"
                            },
                            {
                                "name": "双排键",
                                "value": "1164"
                            },
                            {
                                "name": "长笛",
                                "value": "1165"
                            },
                            {
                                "name": "大号",
                                "value": "1166"
                            },
                            {
                                "name": "低音提琴",
                                "value": "1167"
                            },
                            {
                                "name": "巴乌",
                                "value": "1168"
                            },
                            {
                                "name": "中阮",
                                "value": "1169"
                            },
                            {
                                "name": "马头琴",
                                "value": "1170"
                            },
                            {
                                "name": "其他",
                                "value": "1010"
                            }
                        ]
                    },
                    {
                        "name": "声乐",
                        "value": "1011",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1011"
                            },
                            {
                                "name": "流行",
                                "value": "1014"
                            },
                            {
                                "name": "卡拉OK",
                                "value": "1016"
                            },
                            {
                                "name": "美声",
                                "value": "1012"
                            },
                            {
                                "name": "民族",
                                "value": "1013"
                            },
                            {
                                "name": "原生态",
                                "value": "1015"
                            }
                        ]
                    },
                    {
                        "name": "音乐其他",
                        "value": "1017",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1017"
                            },
                            {
                                "name": "音乐理论",
                                "value": "1026"
                            },
                            {
                                "name": "指挥",
                                "value": "1018"
                            },
                            {
                                "name": "作曲",
                                "value": "1019"
                            },
                            {
                                "name": "音乐基本素养",
                                "value": "1027"
                            },
                            {
                                "name": "音乐表演",
                                "value": "1028"
                            },
                            {
                                "name": "音乐艺术管理",
                                "value": "1029"
                            },
                            {
                                "name": "音乐工程",
                                "value": "1030"
                            },
                            {
                                "name": "beatbox",
                                "value": "1155"
                            },
                            {
                                "name": "作词",
                                "value": "1179"
                            }
                        ]
                    },
                    {
                        "name": "舞蹈",
                        "value": "1031",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1031"
                            },
                            {
                                "name": "街舞",
                                "value": "1033"
                            },
                            {
                                "name": "拉丁舞",
                                "value": "1034"
                            },
                            {
                                "name": "芭蕾舞",
                                "value": "1036"
                            },
                            {
                                "name": "现代舞",
                                "value": "1038"
                            },
                            {
                                "name": "爵士舞",
                                "value": "1032"
                            },
                            {
                                "name": "肚皮舞",
                                "value": "1040"
                            },
                            {
                                "name": "古典舞",
                                "value": "1037"
                            },
                            {
                                "name": "民族舞",
                                "value": "1035"
                            },
                            {
                                "name": "韩舞",
                                "value": "1041"
                            },
                            {
                                "name": "钢管舞",
                                "value": "1039"
                            },
                            {
                                "name": "健美操",
                                "value": "1042"
                            },
                            {
                                "name": "民间舞",
                                "value": "1048"
                            },
                            {
                                "name": "国标舞",
                                "value": "1043"
                            },
                            {
                                "name": "探戈",
                                "value": "1145"
                            },
                            {
                                "name": "广场舞",
                                "value": "1046"
                            },
                            {
                                "name": "啦啦队舞",
                                "value": "1051"
                            },
                            {
                                "name": "锐舞",
                                "value": "1050"
                            },
                            {
                                "name": "迪斯科",
                                "value": "1049"
                            },
                            {
                                "name": "集体舞",
                                "value": "1047"
                            },
                            {
                                "name": "踢踏舞",
                                "value": "1044"
                            },
                            {
                                "name": "中国舞",
                                "value": "1555"
                            },
                            {
                                "name": "TB秀",
                                "value": "1151"
                            },
                            {
                                "name": "儿童舞蹈",
                                "value": "1175"
                            },
                            {
                                "name": "绸缎舞",
                                "value": "1176"
                            },
                            {
                                "name": "其他",
                                "value": "1056"
                            }
                        ]
                    },
                    {
                        "name": "绘画",
                        "value": "1061",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1061"
                            },
                            {
                                "name": "素描",
                                "value": "1063"
                            },
                            {
                                "name": "创意画",
                                "value": "1062"
                            },
                            {
                                "name": "国画",
                                "value": "1065"
                            },
                            {
                                "name": "油画",
                                "value": "1066"
                            },
                            {
                                "name": "水粉画",
                                "value": "1067"
                            },
                            {
                                "name": "水彩画",
                                "value": "1064"
                            },
                            {
                                "name": "沙画",
                                "value": "1068"
                            },
                            {
                                "name": "插画",
                                "value": "1110"
                            },
                            {
                                "name": "卡通画",
                                "value": "1111"
                            },
                            {
                                "name": "简笔画",
                                "value": "1112"
                            },
                            {
                                "name": "速写",
                                "value": "1113"
                            },
                            {
                                "name": "漫画",
                                "value": "1114"
                            },
                            {
                                "name": "纹身",
                                "value": "1171"
                            },
                            {
                                "name": "儿童画",
                                "value": "1172"
                            },
                            {
                                "name": "版画",
                                "value": "1173"
                            },
                            {
                                "name": "工笔画",
                                "value": "1174"
                            },
                            {
                                "name": "美术高考",
                                "value": "1249"
                            },
                            {
                                "name": "其他",
                                "value": "1069"
                            }
                        ]
                    },
                    {
                        "name": "书法",
                        "value": "1057",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1057"
                            },
                            {
                                "name": "硬笔书法",
                                "value": "1058"
                            },
                            {
                                "name": "软笔书法",
                                "value": "1059"
                            },
                            {
                                "name": "英语书法",
                                "value": "1163"
                            }
                        ]
                    },
                    {
                        "name": "媒体艺术",
                        "value": "512",
                        "children": [
                            {
                                "name": "全部",
                                "value": "512"
                            },
                            {
                                "name": "播音主持",
                                "value": "513"
                            },
                            {
                                "name": "影视表演",
                                "value": "514"
                            },
                            {
                                "name": "摄影培训",
                                "value": "515"
                            },
                            {
                                "name": "编导培训",
                                "value": "516"
                            },
                            {
                                "name": "电视包装",
                                "value": "517"
                            },
                            {
                                "name": "DJ培训",
                                "value": "518"
                            },
                            {
                                "name": "影视制作",
                                "value": "519"
                            },
                            {
                                "name": "模特培训",
                                "value": "520"
                            }
                        ]
                    },
                    {
                        "name": "雕塑",
                        "value": "1070",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1070"
                            },
                            {
                                "name": "皮雕",
                                "value": "1076"
                            },
                            {
                                "name": "木雕",
                                "value": "1071"
                            },
                            {
                                "name": "泥雕",
                                "value": "1079"
                            },
                            {
                                "name": "面塑",
                                "value": "1080"
                            },
                            {
                                "name": "石雕",
                                "value": "1072"
                            },
                            {
                                "name": "根雕",
                                "value": "1077"
                            },
                            {
                                "name": "冰雕",
                                "value": "1078"
                            },
                            {
                                "name": "漆雕",
                                "value": "1075"
                            },
                            {
                                "name": "沙雕",
                                "value": "1074"
                            },
                            {
                                "name": "玉雕",
                                "value": "1073"
                            },
                            {
                                "name": "石膏像",
                                "value": "1082"
                            },
                            {
                                "name": "牙雕",
                                "value": "1083"
                            },
                            {
                                "name": "创意雕塑",
                                "value": "1084"
                            },
                            {
                                "name": "陶艺",
                                "value": "1081"
                            },
                            {
                                "name": "雕刻",
                                "value": "1177"
                            },
                            {
                                "name": "其他",
                                "value": "1085"
                            }
                        ]
                    },
                    {
                        "name": "鉴赏",
                        "value": "1086",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1086"
                            },
                            {
                                "name": "葡萄酒品鉴",
                                "value": "1559"
                            },
                            {
                                "name": "古玩鉴赏",
                                "value": "1087"
                            },
                            {
                                "name": "字画鉴赏",
                                "value": "1088"
                            },
                            {
                                "name": "红酒鉴赏",
                                "value": "1107"
                            },
                            {
                                "name": "白酒鉴赏",
                                "value": "1178"
                            },
                            {
                                "name": "其他",
                                "value": "1089"
                            }
                        ]
                    },
                    {
                        "name": "戏剧",
                        "value": "1090",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1090"
                            },
                            {
                                "name": "音乐剧",
                                "value": "1522"
                            },
                            {
                                "name": "京剧",
                                "value": "1091"
                            },
                            {
                                "name": "评剧",
                                "value": "1092"
                            },
                            {
                                "name": "晋剧",
                                "value": "1093"
                            },
                            {
                                "name": "豫剧",
                                "value": "1094"
                            },
                            {
                                "name": "越剧",
                                "value": "1095"
                            },
                            {
                                "name": "昆曲",
                                "value": "1096"
                            },
                            {
                                "name": "秦腔",
                                "value": "1097"
                            },
                            {
                                "name": "川剧",
                                "value": "1098"
                            },
                            {
                                "name": "黄梅戏",
                                "value": "1099"
                            },
                            {
                                "name": "话剧",
                                "value": "1100"
                            },
                            {
                                "name": "二人转",
                                "value": "1250"
                            },
                            {
                                "name": "其他",
                                "value": "1101"
                            }
                        ]
                    },
                    {
                        "name": "其他",
                        "value": "1102",
                        "children": [
                            {
                                "name": "全部",
                                "value": "1102"
                            },
                            {
                                "name": "其他",
                                "value": "1103"
                            }
                        ]
                    }
                ]
            },
            "ts": 1491982586,
            "declare_config": {
                "declareTpl": ""
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
