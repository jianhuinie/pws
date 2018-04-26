<?php

require("../bootstrap.php");

// $content = '
// "code": 0,
// "msg": "succ",
// // "data": {
//     "title": "【题目】阅读下列语段，把其中划线字的注音和拼音所表示的汉字依次填在方格内。（2分）北固山公园修缮( )工程历时两年多，于2013年元旦正式对外开放，喜迎各方游客。登上北固楼，俯kàn（）大江风貌。南边是现代化城市高楼鳞次栉( )比，北边是金山湖烟波浩渺，长江玉带一水横陈，东西两侧，金焦在望，轻风拂面之jì（），铜铃清脆在耳，真让人顿生宠辱皆忘之感。（摘自《京江晚报》）",
//     "content": "【题目】阅读下列语段，把其中划线字的注音和拼音所表示的汉字依次填在方格内。（2分）北固山公园修缮( )工程历时两年多，于2013年元旦正式对外开放，喜迎各方游客。登上北固楼，俯kàn（）大江风貌。南边是现代化城市高楼鳞次栉( )比，北边是金山湖烟波浩渺，长江玉带一水横陈，东西两侧，金焦在望，轻风拂面之jì（），铜铃清脆在耳，真让人顿生宠辱皆忘之感。（摘自《京江晚报》）",
//     "answer": "【解答】“潜龙一号”首次大洋试验性应用圆满完成",
//     "analyse": "【分析】<br />试题分析：新闻标题一般在导语中体现，而导语是新闻的第一段或者第一句话，本文段第一句话就完整的表述了新闻内容。<br />考点：压缩语段。能力层级为表达运用E。",
//     "degree": "3",
//     "degree_name": "一般",
//     "subject_id":"s_23",
//     "subject_name": "大学",
//     "point_id":"p_23",
//     "point_name":"声音",
//     "points_list":[
//         {
//             "point_id": "p_23",
//             "point_name": "立体几何"
//         },
//         {
//             "point_id": "p_24",
//             "point_name": "平面几何"
//         },
//         {
//             "point_id": "p_21",
//             "point_name": "立体几何"
//         },
//         {
//             "point_id": "p_232",
//             "point_name": "立体几何"
//         },
//         {
//             "point_id": "p_2311",
//             "point_name": "立体几何"
//         }
//     ],
// // },
// "text_book": "初中语文人教版",
// "points": "初中语文综合库,基础知识及语言表达,归纳总结",
// "relate": [
//     {
//     "title": "【题目】修改病句。（2分）<br />【小题1】生活中会遇到很多困难，但有准备的人总是有能力战胜困难而且有勇气面对困难。<br />【小题2】一个人只有对自己的人生负责，才能自觉地树立起对他人和社会的责任。",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/8m7l0khk66675012m4106m5mmhikmmj1.html"
//     },
//     {
//     "title": "【题目】语言运用（12分）<br />【小题1】.告别六年来一如父母的老师，王刚同学眼含热泪地给老师的留言中深情写到：“分别在即，老师，我们如何才能报答您呢？我们原想撷取一片树叶，您却给了我们整个森林；我们原想<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>，<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>；我们原想<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>，<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>（4分）<br />【小题2】.自全国全面启动“亿万学生阳光体育运动“工程后，许多学校积极响应并认真落实。但面对升学的压力，一些学生因忙于学业，疏于体育锻炼；同时仍有些学校的体育课存在缩水现象，特别是对毕业班的学生来说，体育课往往只是一种回忆……<br />（1）体育课上，你如何邀请不爱运动的小强参加体育运动？<br />答 ：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（</u>2分）<br />（2）假如你有机会代表同学与校长就以上现象面对面提出两点建议，你会怎么说答： <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>。（2分）<br />【小题3】.2011年，在由《华西都市报》发起的评选四川“最美街道”的活动中，成都市的人民南路、春熙路、宽窄巷子、锦里、滨江路府南河畔、琴台路、人民中路二段、天府广场、文殊坊街区等十几条街道有幸入围。作为成都市民，我们倍感自豪。请你选择其中的一条街道为对象，为这条街道设计一段参加“最美街道”的宣传用语，为你喜欢的街道拉票。<br />要求：用语得体；能抓住街道的主要特点进行宣传，语言优美，生动。<br />我选择的街道是：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br />我设计的宣传语：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/4314633i4010j96715340929l167m403.html"
//     },
//     {
//     "title": "【题目】阅读下面两则材料，按要求答题<br />材料一:近年来清明节祭奠亲友,一些地方从烧冥钞、纸人、纸马,发展到烧纸电视机、纸数码相机,甚至烧纸汽车、纸别墅……<br />材料二:今年清明节前,某市首个在线祭祀网站开通。清明节时,许多市民纷纷登录该网站,上传纪念图片,发布纪念文章,祭奠逝去的亲友,表达哀思。<br />【小题1】阅读了上面两则材料，你发现了什么问题？<br /><u>___________________________________________________________________________</u><br />【小题2】“清明节”是我国的传统节日，有的人认为要取消，有的人认为要保留，同学你怎么看？（说明看法并阐述理由）<br /><u>___________________________________________________________________________</u>",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/3m0lm44hj7l0386l65826l6i3mlim224.html"
//     },
//     {
//     "title": "【题目】阅读下面文字，把文中拼音所表示的汉字和划线字的注音依次填在方格内。<br />生命是大自然的奇迹。美国蒙特里海湾的沿岸，一棵柏树，历经cāng（&nbsp;　&nbsp;）桑，独自守候了百年；浩浩戈壁，茫茫沙漠，胡杨将根深深扎进地下20多米，挺拔的身姿顽强撑起一片生命的绿洲；奇寒无比的雪山上，雪莲花傲然<u>绽</u>（ 　&nbsp;&nbsp;）放……在如此恶劣的环境里，却有如许震hàn（&nbsp;&nbsp;　 ）人心的生命奇迹在上演。大自然就是以其神奇来导演一幕幕神话和传奇。请怀着一份敬畏之心去看待大自然，请珍惜、<u>呵</u>（&nbsp;&nbsp;&nbsp;）护每一个生命。",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/41ki897m7h5l2313lm2h07821l6m3kli.html"
//     },
//     {
//     "title": "【题目】语文实践活动（3分）<br />班级开展保护野生动物的活动，出了一期手抄小报，假若你是手抄报的编辑, 请你为报纸下面引用的两段材料加上几句精当的 “编后语”。<br />A. 羚羊为我国特有的珍贵濒危动物， 属国家一级保护动物，主要栖息在西藏等高原地带。喜群居生活，性怯懦机警，常出没在人迹罕至的地方。(引自《中学生知识画报》)<br />B. 几年来，武警官兵为保护可可西里生态环境打响了艰苦的保卫战……如今，在可可西里的青藏公路沿线，藏羚羊、藏野驴、野牦牛成群结队，不时向过路车辆鸣叫相迎，挥蹄致意。 (引自《中国国防报》)<br />编后语： <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br /><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/222k3479j627lji496h633271hm7h302.html"
//     }
// ],
// "hot": [
//     {
//     "title": "【题目】为了探究压力的作用效果与哪些因素有关，小丽同学用控制变量法做了如图所示的实验：(a)一块砖平放在泡沫塑料上；(b)两块砖叠放在泡沫塑料上；(c)一块砖竖放在泡沫塑料上。观察比较(a)、(b)的情况可知压力的作用效果与有关。比较图(a)、(c)的情况可知压力作用的效果与有关。用控制变量法还可探究实验。(只填一个)",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/4h4m7460293j623j768lhkl67m4l3942.html"
//     },
//     {
//     "title": "【题目】当梦想一次次地被暴风雨撕得粉碎；当远航的风帆一次次地升起又中途折返；当攀登的双手被磨得血肉模糊，我们依然能大声地向未来宣布：再试一次！请以“再试一次”为话题，写一篇作文。要求：文体不限，600字左右，不得出现真实的地名、校名、人名。",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/k94ki0li231k08kk6l621779k181jj87.html"
//     },
//     {
//     "title": "【题目】计算：．",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/81m63ij3kji787j8ijl51i6m3383758k.html"
//     },
//     {
//     "title": "【题目】下列叙述哪一项不是我们学习的理由A．学校是知识殿堂，进步的阶梯，人要接受教育，心智才能健全发展B．通过学习，我们会发现自己的潜能，培育自己的能力C．接受义务教育，是每个公民法定的权利和义务D．为了将来有好的生活条件",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/9557ihh964lk1274706m6hkhh86810mm.html"
//     },
//     {
//     "title": "【题目",
//     "url": "http://dev-zzl-m.genshuixue.com/tiku/j0981i4m716673l58klhmk264j6k67lh.html"
//     }
// ],
// "tdk":{
//         "title" : "梦想还是要有的，万一在【那天】实现了呢！",
//         "description" : "跟谁学热门老师，那天",
//         "keywords" : "名师,托福,老师,跟谁学,口语老师,英语老师"
//     }
// },
// "ts": 1448333527
// }';

// var_dump($content);exit;
// return;
// $content = json_decode($content,true);


render(
    "activity/tiku",
    array(
        "tpl_data" => array (
            "code" => 0,
            "msg" => "succ",
                "title" =>  "【题目】阅读下列语段，把其中划线字的注音和拼音所表示的汉字依次填在方格内。（2分）北固山公园修缮( )工程历时两年多，于2013年元旦正式对外开放，喜迎各方游客。登上北固楼，俯kàn（）大江风貌。南边是现代化城市高楼鳞次栉( )比，北边是金山湖烟波浩渺，长江玉带一水横陈，东西两侧，金焦在望，轻风拂面之jì（），铜铃清脆在耳，真让人顿生宠辱皆忘之感。（摘自《京江晚报》）",
                "content" => "【题目】阅读下列语段，把其中划线字的注音和拼音所表示的汉字依次填在方格内。（2分）北固山公园修缮( )工程历时两年多，于2013年元旦正式对外开放，喜迎各方游客。登上北固楼，俯kàn（）大江风貌。南边是现代化城市高楼鳞次栉( )比，北边是金山湖烟波浩渺，长江玉带一水横陈，东西两侧，金焦在望，轻风拂面之jì（），铜铃清脆在耳，真让人顿生宠辱皆忘之感。（摘自《京江晚报》）",
                "answer" => "【解答】“潜龙一号”首次大洋试验性应用圆满完成",
                "analyse" => "【分析】<br />试题分析：新闻标题一般在导语中体现，而导语是新闻的第一段或者第一句话，本文段第一句话就完整的表述了新闻内容。<br />考点：压缩语段。能力层级为表达运用E。",
                "degree" => "3",
                "degree_name" => "一般",
                "subject_id" =>"s_23",
                "subject_name" => "大学",
                "display" => "0",
                "points_breadcrumb" => array(
                    array(
                      "point_id" =>  "p_16464",
                      "point_name" =>  "刻度尺、游标卡尺的使用"
                    ),
                    array(
                      "point_id" =>  "p_16465",
                      "point_name" =>  "刻度尺、游标卡尺的使用"
                    ),
                    array(
                      "point_id" =>  "p_16466",
                      "point_name" =>  "描绘小电珠的伏安特性曲线"
                    )
                ),
                "point_id" =>"p_23",
                // "point_name" =>"声音",
                "relate_subject" =>array(
                    array(
                      "id" =>  "s_21",
                      "name" =>  "初中物理"
                    )
                ),
                "subjects" => array(
                                array(
                                    "subject_id" => "s_23",
                                    "subject_name" => "初中英语"
                                ),
                                array(
                                    "subject_id" => "s_24",
                                    "subject_name" => "初中数学"
                                ),
                                array(
                                    "subject_id" => "s_25",
                                    "subject_name" => "初中语文"
                                ),
                                array(
                                    "subject_id" => "s_34",
                                    "subject_name" => "高中生物"
                                ),
                                array(
                                    "subject_id" => "s_33",
                                    "subject_name" => "初中地理"
                                )
                            ),
                "points_list" =>array(
                    array(
                        "point_id" => "p_23",
                        "point_name" => "立体几何"
                    ),
                    array(
                        "point_id" => "p_24",
                        "point_name" => "平面几何"
                    ),
                    array(
                        "point_id" => "p_21",
                        "point_name" => "立体几何"
                    ),
                    array(
                        "point_id" => "p_232",
                        "point_name" => "立体几何"
                    ),
                    array(
                        "point_id" => "p_2311",
                        "point_name" => "立体几何"
                    )
                ),
            "text_book" => "初中语文人教版",
            "points_info" => array(
                    array(
                      "id" =>  "p_78",
                      "tag" =>  "高中物理综合库"
                    ),
                    array(
                      "id" =>  "p_185",
                      "tag" =>  "曲线运动"
                    ),
                    array(
                      "id" =>  "p_628",
                      "tag" =>  "天体运动"
                    ),
                    array(
                      "id" =>  "p_639",
                      "tag" =>  "同步卫星"
                    )
                  ),
            "relate" => array(
                array(
                "title" => "【题目】修改病句。（2分）<br />【小题1】生活中会遇到很多困难，但有准备的人总是有能力战胜困难而且有勇气面对困难。<br />【小题2】一个人只有对自己的人生负责，才能自觉地树立起对他人和社会的责任。",
                "url" =>  "http://dev-zzl-m.genshuixue.com/tiku/8m7l0khk66675012m4106m5mmhikmmj1.html"
                ),
                array(
                "title" => "【题目】语言运用（12分）<br />【小题1】.告别六年来一如父母的老师，王刚同学眼含热泪地给老师的留言中深情写到：“分别在即，老师，我们如何才能报答您呢？我们原想撷取一片树叶，您却给了我们整个森林；我们原想<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>，<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>；我们原想<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>，<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>（4分）<br />【小题2】.自全国全面启动“亿万学生阳光体育运动“工程后，许多学校积极响应并认真落实。但面对升学的压力，一些学生因忙于学业，疏于体育锻炼；同时仍有些学校的体育课存在缩水现象，特别是对毕业班的学生来说，体育课往往只是一种回忆……<br />（1）体育课上，你如何邀请不爱运动的小强参加体育运动？<br />答 ：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（</u>2分）<br />（2）假如你有机会代表同学与校长就以上现象面对面提出两点建议，你会怎么说答： <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>。（2分）<br />【小题3】.2011年，在由《华西都市报》发起的评选四川“最美街道”的活动中，成都市的人民南路、春熙路、宽窄巷子、锦里、滨江路府南河畔、琴台路、人民中路二段、天府广场、文殊坊街区等十几条街道有幸入围。作为成都市民，我们倍感自豪。请你选择其中的一条街道为对象，为这条街道设计一段参加“最美街道”的宣传用语，为你喜欢的街道拉票。<br />要求：用语得体；能抓住街道的主要特点进行宣传，语言优美，生动。<br />我选择的街道是：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br />我设计的宣传语：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/4314633i4010j96715340929l167m403.html"
                ),
                array(
                "title" =>  "【题目】阅读下面两则材料，按要求答题<br />材料一:近年来清明节祭奠亲友,一些地方从烧冥钞、纸人、纸马,发展到烧纸电视机、纸数码相机,甚至烧纸汽车、纸别墅……<br />材料二:今年清明节前,某市首个在线祭祀网站开通。清明节时,许多市民纷纷登录该网站,上传纪念图片,发布纪念文章,祭奠逝去的亲友,表达哀思。<br />【小题1】阅读了上面两则材料，你发现了什么问题？<br /><u>___________________________________________________________________________</u><br />【小题2】“清明节”是我国的传统节日，有的人认为要取消，有的人认为要保留，同学你怎么看？（说明看法并阐述理由）<br /><u>___________________________________________________________________________</u>",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/3m0lm44hj7l0386l65826l6i3mlim224.html"
                ),
                array(
                "title" => "【题目】阅读下面文字，把文中拼音所表示的汉字和划线字的注音依次填在方格内。<br />生命是大自然的奇迹。美国蒙特里海湾的沿岸，一棵柏树，历经cāng（&nbsp;　&nbsp;）桑，独自守候了百年；浩浩戈壁，茫茫沙漠，胡杨将根深深扎进地下20多米，挺拔的身姿顽强撑起一片生命的绿洲；奇寒无比的雪山上，雪莲花傲然<u>绽</u>（ 　&nbsp;&nbsp;）放……在如此恶劣的环境里，却有如许震hàn（&nbsp;&nbsp;　 ）人心的生命奇迹在上演。大自然就是以其神奇来导演一幕幕神话和传奇。请怀着一份敬畏之心去看待大自然，请珍惜、<u>呵</u>（&nbsp;&nbsp;&nbsp;）护每一个生命。",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/41ki897m7h5l2313lm2h07821l6m3kli.html"
                ),
                array(
                "title" => "【题目】语文实践活动（3分）<br />班级开展保护野生动物的活动，出了一期手抄小报，假若你是手抄报的编辑, 请你为报纸下面引用的两段材料加上几句精当的 “编后语”。<br />A. 羚羊为我国特有的珍贵濒危动物， 属国家一级保护动物，主要栖息在西藏等高原地带。喜群居生活，性怯懦机警，常出没在人迹罕至的地方。(引自《中学生知识画报》)<br />B. 几年来，武警官兵为保护可可西里生态环境打响了艰苦的保卫战……如今，在可可西里的青藏公路沿线，藏羚羊、藏野驴、野牦牛成群结队，不时向过路车辆鸣叫相迎，挥蹄致意。 (引自《中国国防报》)<br />编后语： <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br /><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/222k3479j627lji496h633271hm7h302.html"
                )
            ),
            "hot" => array(
                array(
                "title" => "【题目】为了探究压力的作用效果与哪些因素有关，小丽同学用控制变量法做了如图所示的实验：(a)一块砖平放在泡沫塑料上；(b)两块砖叠放在泡沫塑料上；(c)一块砖竖放在泡沫塑料上。观察比较(a)、(b)的情况可知压力的作用效果与有关。比较图(a)、(c)的情况可知压力作用的效果与有关。用控制变量法还可探究实验。(只填一个)",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/4h4m7460293j623j768lhkl67m4l3942.html"
                ),
                array(
                "title" => "【题目】当梦想一次次地被暴风雨撕得粉碎；当远航的风帆一次次地升起又中途折返；当攀登的双手被磨得血肉模糊，我们依然能大声地向未来宣布：再试一次！请以“再试一次”为话题，写一篇作文。要求：文体不限，600字左右，不得出现真实的地名、校名、人名。",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/k94ki0li231k08kk6l621779k181jj87.html"
                ),
                array(
                "title" => "【题目】计算：．",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/81m63ij3kji787j8ijl51i6m3383758k.html"
                ),
                array(
                "title" => "【题目】下列叙述哪一项不是我们学习的理由A．学校是知识殿堂，进步的阶梯，人要接受教育，心智才能健全发展B．通过学习，我们会发现自己的潜能，培育自己的能力C．接受义务教育，是每个公民法定的权利和义务D．为了将来有好的生活条件",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/9557ihh964lk1274706m6hkhh86810mm.html"
                ),
                array(
                "title" => "【题目",
                "url" => "http://dev-zzl-m.genshuixue.com/tiku/j0981i4m716673l58klhmk264j6k67lh.html"
                )
            ),
            "tdk" => array(
                    "title"  =>  "梦想还是要有的，万一在【那天】实现了呢！",
                    "description"  => "跟谁学热门老师，那天",
                    "keywords"  => "名师,托福,老师,跟谁学,口语老师,英语老师"
            ),
            "ts" => 1448333527,
            "newest" =>array(
                array(
                  "url" => "http://local-activity-www.genshuixue.com/tiku/j6lml2m93jk84ih3983iil9h4k93k167.html",
                  "title" => "如图是某质点做直线运动的图象，以下说法正确的是质点始终向同一方向运动B.质点的加速度保持不变C.前4s内物体的位移是4mD.和s两个时刻物体处在同一位置"
                ),
                array(
                  "url" =>  "http://local-activity-www.genshuixue.com/tiku/82j77i2927kklkhhij970i34m5i701mk.html",
                  "title" =>  "某一质点运动的速度v随时间t变化的图象是如图所示的抛物线，则( )A．质点的运动轨迹为抛物线B．10s时质点离出发点最远C．在10~20s内，质点的加速度方向与速度方向相反D．质点10s后与10s前的运动方向相反"
                )
              )
        )
    )
);

