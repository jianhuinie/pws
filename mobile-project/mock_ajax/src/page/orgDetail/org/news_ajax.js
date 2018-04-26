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
module.exports = function(path, queryParam, postParam) {
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
                "news_list": {
                    "list": [{
                        "type": "新闻资讯",
                        "title": "信达雅国际教育：别人家的学霸孩子分享5",
                        "brief": "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                        "create_time": "08月23日 20:17",
                        "url": "http://local-m.genshuixue.com/i/blackDetail/718.html",
                        "read_times": 1,
                        "support_num": "0",
                        "preface": "http://img.gsxservice.com/18445091_d95bgcyc.png",
                        "course_info": {
                            "preface": "http://test-img.gsxservice.com/747333_yprjvva0.png",
                            "price": "100.00",
                            "name": "舞蹈",
                            "course_type": "直播课"
                        }
                    }, {
                        "type": "新闻资讯",
                        "title": "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                        "brief": "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦 啦啦啦啦啦啦&nbsp;",
                        "create_time": "08月22日 15:20",
                        "url": "http://local-m.genshuixue.com/i/blackDetail/716.html",
                        "read_times": 0,
                        "support_num": "0",
                        "preface": "http://img.gsxservice.com/18445091_d95bgcyc.png",
                        "course_info": {}
                    }, {
                        "type": "新闻资讯",
                        "title": "啦啦啦啦啦啦啦",
                        "brief": "&nbsp;哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                        "create_time": "08月21日 11:31",
                        "url": "http://local-m.genshuixue.com/i/blackDetail/715.html",
                        "read_times": 0,
                        "preface": "http://img.gsxservice.com/18445091_d95bgcyc.png",
                        "support_num": "0",
                        "course_info": {}
                    }, {
                        "type": "新闻资讯",
                        "title": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                        "brief": "信达雅国际教育：北美精算师信达雅老师创办的国际课程AP,IB,ALEVEL,SAT2,SAT1,ACT,SSAT,托福，雅思等留学考试高分满分全球最高分领导品牌，留学活动独家策划，美加英澳新等大国名校申请。IB,IA,EE,TOK论文高分指导，国外大学课程指导，国际学校核心课程及考试高分资料出版及全球合作。&nbsp; 信达雅老师，信达雅国际教育创办人，美国精算科学硕士、有12年国际课程ib、ap、alevel、wace、olevel、sat1、sat2等讲课经验、北美精算师、大学生数学竞赛大奖得主、北美精算师模型咨询、创业企业风险模型分析、同时担任多家创业公司董事、信达雅国际教育在信达雅老师带领下、成为ib、ap、alevel、sat1、sat2全球最高分培训品牌、ia、ee、tok高分指导品牌、瑞典皇室贵族指定培训品牌、中国大国数学思维走向世界领导品牌之中国武汉ap信达雅国际学校、占地近万平的ap国际学校目前已落成、国际课程考试改革专家、已为国内外近千所学校提供ib、ap、alevel、sat、act、ibia、ee、tok高分指导、托福、雅思等培训、是学霸公认的高分满分全球最高分领导品牌、信达雅国际教育咨询电话：18811042096、微信号18811042096&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;qq号：469030401 skype：xindaya10 电话：010-53381580&nbsp; 010-62680957信达雅国际教育 Cinda Insight Education&nbsp;为国内外国际学校7-12年年级学生提供各门国际课程辅导，主要的考试体系涵盖A-LEVEL、IB,AP,SAT1,SAT2,SSAT,ACT等考试体系。信达雅国际教育立志做满分数学辅导领导者，数学组信达雅老师身为北美精算师，所带学生有全球ALEVEL最高分，IB HL 7分辅导达到98%，IB SL 培训7分高分辅导达到100%，SAT2 满分达到99%，SAT1 高分2400分（该学员被斯坦福录取），SAT1 在2200分学员占了89%,A-LEVEL高分辅导A*及A学员高达95%，AP满分辅导接近98%，美国竞赛，加拿大竞赛，英国剑桥牛津数学竞赛，国际大学生数学竞赛辅导首选品牌。信达雅国际教育远景规划是：做精英培训高分辅导品牌，学霸系列品牌。让学生们树立学霸范。信达雅国际教育开设的IB考试体系培训：提供SL,HL课程。主要包括IB HL ,SL 数学，IB HL,SL 物理，IB HL,SL 化学，IB HL,SL生物，IB HL,SL经济，IB HL,SL商学，IB HL,SL心理，IB HL,SL艺术，IB HL,SL音乐，IB HL,SL计算机等课程。信达雅国际教育开设的AP的考试体系培训：提供AP AB微积分，AP BC 微积分，(AP CALCULUS),AP 统计学，AP 物理学，AP化学，AP 经济学，AP 宏观经济学，AP 微观经济学，AP 计算机，AP心理学等等课程。信达雅国际教育开设的A-Level的考试体系培训：提供IGCSE课程，AS课程，A2课程，具体培训涵盖数学纯数1，纯数2，纯数3 机械学，统计学，进阶数学（高等数学）纯数，统计和机械，A-LEVEL PURE MATH1, A-LEVEL PURE MATHE 2,A-LEVEL PURE MATH 3, A-LEVEL MECHANICS A-LEVEL STATISTICS,A-LEVEL FURTHER MAHT,A-LEVEL的物理（AS,A2阶段），A-LEVEL的化学课程（AS,A2阶段），A-LEVEL 生物，A-LEVEL 经济学，A-LEVEL 商学，A-LEVEL 计算机，A-LEVEL会计学等课程培训。信达雅国际教育开设的SAT1 考试体系培训:涵盖 critical reading， writing， math 培训信达雅国际教育开设的SAT2考试体系培训:&nbsp;涵盖SAT2 数学，物理，化学，计算机，美国历史等课程培训。信达雅国际教育开设的ACT&nbsp;考试体系培训:&nbsp;涵盖reading，writing，math， science 培训信达雅国际教育开设的SSAT&nbsp;考试体系培训:&nbsp;涵盖reading，writing，math等培训。信达雅国际个性学前教育：提供儿童个性生活教育、活动策划创新能力教育、励志教育等品牌。打造大山深处孩子走出来看世界的品牌幼教体系。信达雅精算数字中心：为80后-90后创业企业，尤其是留学回国人员创业提供数据支持和精准分析包括数学经济金融建模分析及预测，让创业者通过数据来分析优劣来挖掘创业的可行性规避风险性，从而直达成功，早日上市。",
                        "create_time": "2015-08-23 20:13",
                        "url": "http://local-m.genshuixue.com/i/blackDetail/717.html",
                        "read_times": 0,
                        "preface": "http://img.gsxservice.com/18445091_d95bgcyc.png",
                        "support_num": "0",
                        "course_info": {
                            "preface": "http://test-img.gsxservice.com/747333_yprjvva0.png",
                            "price": "100.00",
                            "name": "舞蹈",
                            "course_type": "直播课"
                        }
                    }]
                },
                "pager": {
                    "total_number": 4,
                    "next_cursor": 2,
                    "has_more": 0
                }
            },
            "ts": 1477293276,
            "declare_config": {
                "declareTpl": ""
            }
        }
    };
};

/* eslint-enable fecs-camelcase */