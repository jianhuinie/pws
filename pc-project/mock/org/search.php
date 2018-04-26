<?php

require("../bootstrap.php");

render(
    "org/search",
    array(
        "tpl_data" => array(
            "is_www" => true, // 全国站
            'hit_tag' => array(
                'course1'=>array(
                    'name'  => '艺术',
                    'id'    => '1',
                ),
                'course2'=> array(
                    'name'  => '器乐',
                    'id'    => '11',
                ),
                'course3'=> array(
                    'name'  => '钢琴',
                    'id'    => '111',
                ),
                'area' => array(
                    "朝阳区",
                    "海淀区",
                    "昌平区",
                    "东莞区",
                    "西城区",
                    "海淀区",
                    "朝阳区"
                ),
            ),
            'hit_nav' => array(
                array(
                        'name'=> '艺术',
                        'type'=> 'course'
                ),
                array(
                        'name'=> '器乐',
                        'type'=> 'course',
                ),
                array(
                        'name'=> '钢琴',
                        'type'=> 'course',
                        'id' => '12321/1231/1233'
                )
            ),
            'course_related' => array( // 面包屑中的相关课程
                array(
                    "id" => "119",
                    "name" => "二年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "121",
                    "name" => "四年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "122",
                    "name" => "五年级",
                    "level" => "3",
                    "parent_id" => "116"
                ),
                array(
                    "id" => "123",
                    "name" => "六年级",
                    "level" => "3",
                    "parent_id" => "116"
                )
            ),
            'filter'  => array( // 筛选数据
                'course_level1' => array(
                    array('id' => '1','name' => '艺术','style' => 'disable'),
                    array('id' => '2','name' => '体育', 'style' => 'show'),
                    array('id' => '3','name' => '生活', 'style' => 'show'),
                    array('id' => '4','name' => '兴趣','style' => 'show'),
                    array('id' => '5','name' => '出国','style' => 'disable'),
                    array('id' => '6','name' => '留学','style' => 'disable'),
                    array('id' => '7','name' => '学前','style' => 'disable'),
                    array('id' => '1','name' => '小学','style' => 'active'),
                    array('id' => '2','name' => '初中', 'style' => 'show'),
                    array('id' => '3','name' => '高中','style' => 'show'),
                    array('id' => '4','name' => '大学考试','style' => 'show'),
                    array('id' => '4','name' => '管理培训','style' => 'show'),
                    array('id' => '4','name' => '财经金融','style' => 'show'),
                    array('id' => '4','name' => '公务员','style' => 'show'),
                    array('id' => '4','name' => '司法','style' => 'show'),
                    array('id' => '4','name' => '中考','style' => 'show'),
                    array('id' => '4','name' => '职业技能','style' => 'show'),
                    array('id' => '4','name' => '资格考试','style' => 'show'),
                    array('id' => '4','name' => '国际旅游','style' => 'show'),
                    array('id' => '4','name' => '中学考试','style' => 'show'),
                    array('id' => '4','name' => '小学考试','style' => 'show'),
                    array('id' => '4','name' => '大学考试','style' => 'show'),
                    array('id' => '5','name' => '语言培训','style' => 'disable'),
                    array('id' => '6', 'name' => 'IT','style' => 'disable')
                ),
                "course_level2"=>array(
                    array('id'=>'1','name'=>'初一','style'=>'show'),
                    array('id'=>'-1','name'=>'初二','style'=>'show'),
                    array('id'=>'3','name'=>'初三','style'=>'show'),
                    array('id'=>'4','name'=>'高一','style'=>'show'),
                    array('id'=>'5','name'=>'高二','style'=>'show'),
                    array('id'=>'6','name'=>'高三','style'=>'active'),
                    array('id'=>'7','name'=>'大学1','style'=>'show'),
                    array('id'=>'7','name'=>'大学2','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show')
                ),
                "course_level3"=>array(
                    array('id'=>'1','name'=>'初一','style'=>'show'),
                    array('id'=>'2','name'=>'初二','style'=>'show'),
                    array('id'=>'3','name'=>'初三','style'=>'show'),
                    array('id'=>'4','name'=>'高一','style'=>'show'),
                    array('id'=>'5','name'=>'高二','style'=>'show'),
                    array('id'=>'6','name'=>'高三','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'show'),
                    array('id'=>'7','name'=>'大学','style'=>'active'),
                    array('id'=>'7','name'=>'大学','style'=>'show')
                ),
                'area_level1' => array(
                    array('id'=>'1','name'=>'东城区','style'=>'show'),
                    array('id'=>'2','name'=>'地铁沿线','style'=>'show'),
                    array('id'=>'3','name'=>'海淀区','style'=>'active'),
                    array('id'=>'4','name'=>'朝阳区','style'=>'show'),
                    array('id'=>'5','name'=>'石景山区','style'=>'show'),
                    array('id'=>'6','name'=>'丰台区','style'=>'show'),
                    array('id'=>'7','name'=>'通州区','style'=>'show'),
                    array('id'=>'8','name'=>'顺义区','style'=>'show'),
                    array('id'=>'9','name'=>'大兴区','style'=>'show'),
                    array('id'=>'10','name'=>'昌平区','style'=>'disable'),
                    array('id'=>'11','name'=>'房山区','style'=>'show'),
                    array('id'=>'12','name'=>'怀柔区','style'=>'show'),
                    array('id'=>'13','name'=>'平谷区','style'=>'show'),
                    array('id'=>'14','name'=>'顺义区','style'=>'show'),
                    array('id'=>'15','name'=>'密云县','style'=>'show'),
                    array('id'=>'16','name'=>'延庆县','style'=>'show')
                ),
                'area_level2' => array(
                    array('id'=>'1','name'=>'中关村','style'=>'active'),
                    array('id'=>'2','name'=>'知春路','style'=>'show'),
                    array('id'=>'3','name'=>'西二旗','style'=>'show'),
                    array('id'=>'4','name'=>'上帝','style'=>'show'),
                    array('id'=>'5','name'=>'肖家河','style'=>'show'),
                    array('id'=>'6','name'=>'西苑','style'=>'show'),
                    array('id'=>'7','name'=>'苏州街','style'=>'show'),
                    array('id'=>'8','name'=>'区政府','style'=>'show'),
                    array('id'=>'9','name'=>'万柳','style'=>'show'),
                    array('id'=>'10','name'=>'白石桥','style'=>'disable'),
                    array('id'=>'11','name'=>'世纪城','style'=>'show'),
                    array('id'=>'12','name'=>'马连洼','style'=>'show'),
                    array('id'=>'13','name'=>'北沙滩','style'=>'show'),
                    array('id'=>'14','name'=>'西北旺','style'=>'show'),
                    array('id'=>'15','name'=>'农业大学','style'=>'show'),
                    array('id'=>'16','name'=>'永定门','style'=>'show'),
                    array('id'=>'16','name'=>'西直门','style'=>'show'),
                    array('id'=>'16','name'=>'大前门','style'=>'show')
                ),
                'org_type' => array(
                    array('id'=>'1','name'=>'工作室','style'=>'active'),
                    array('id'=>'2','name'=>'学校','style'=>'show'),
                    array('id'=>'2','name'=>'公司','style'=>'show'),
                ),
                'is_total' => array(
                    "course"=>1,
                    "area"=>array(
                        '1'=>0,
                        '2'=>1
                    ),
                    "org_type"=>0
                ),
                "course" => array(

                )
            ),
            "orgs" => array(// 机构列表
                array(
                    "id" => "123",//机构ID
                    "membership_level" => 3, // 1非会员 2普通会员 3高级会员 4超级会员
                    "org_avatar" => "https://img.genshuixue.com/90523_k2rw42qy.jpg",
                    "org_number" => "876544523",//机构number
                    "org_domain" => "leasduy",//机构域名
                    "org_name" => "机构简称机",
                    "is_gold_certification" => true,
                    "org_brief" => "托福、SAT培训机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称；名校留学申请托福、托福、SAT培训；名校留学申请SAT培训；名校留学申请",
                    "org_tags" => array(
                        "托福",
                        "SAT",
                        "GRE"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "org_score" => "5.0",
                    "comment_count" => 203,//总评论条数
                    "invite_comment_count" => 21,//邀请评论条数
                    "location" => "",
                    "school_area" => array(
                        array(
                            "name" => "",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                    ),
                    "desc_match" => 0,
                    "teach_result" => 0,
                    "service_attitude" => 0,
                    "teacher_count" => 53,//多少位老师
                    "course_count" => 120,//课程数量
                    "courses" => array(
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                ),
                array(
                    "id" => "123",//机构ID
                    "membership_level" => 3, // 1非会员 2普通会员 3高级会员 4超级会员
                    "org_avatar" => "https://img.genshuixue.com/90523_k2rw42qy.jpg",
                    "org_number" => "876544523",//机构number
                    "org_domain" => "leasduy",//机构域名
                    "org_name" => "机构简称机",
                    "org_brief" => "托福、SAT培训机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称；名校留学申请托福、托福、SAT培训；名校留学申请SAT培训；名校留学申请",
                    "org_tags" => array(
                        "托福",
                        "SAT",
                        "GRE"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "org_score" => "5.0",
                    "comment_count" => 203,//总评论条数
                    "invite_comment_count" => 21,//邀请评论条数
                    "location" => "",
                    "school_area" => array(
                        array(
                            "name" => "",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                    ),
                    "desc_match" => 0,
                    "teach_result" => 0,
                    "service_attitude" => 0,
                    "teacher_count" => 53,//多少位老师
                    "course_count" => 120,//课程数量
                    "courses" => array(
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                ),

                
            ),
            "city_hero_orgs" => array(// 机构列表
                array(
                    "id" => "123",//机构ID
                    "is_gold_certification" => true,
                    "membership_level" => 3, // 1非会员 2普通会员 3高级会员 4超级会员
                    "org_avatar" => "https://img.genshuixue.com/90523_k2rw42qy.jpg",
                    "org_number" => "876544523",//机构number
                    "org_domain" => "leasduy",//机构域名
                    "org_name" => "机构简称机",
                    "org_brief" => "托福、SAT培训机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称；名校留学申请托福、托福、SAT培训；名校留学申请SAT培训；名校留学申请",
                    "org_tags" => array(
                        "托福",
                        "SAT",
                        "GRE"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "org_score" => "5.0",
                    "comment_count" => 203,//总评论条数
                    "invite_comment_count" => 21,//邀请评论条数
                    "location" => "",
                    "school_area" => array(
                        array(
                            "name" => "",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                    ),
                    "desc_match" => 0,
                    "teach_result" => 0,
                    "service_attitude" => 0,
                    "teacher_count" => 53,//多少位老师
                    "course_count" => 120,//课程数量
                    "courses" => array(
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                ),
                array(
                    "id" => "123",//机构ID
                    "is_gold_certification" => true,
                    "membership_level" => 3, // 1非会员 2普通会员 3高级会员 4超级会员
                    "org_avatar" => "https://img.genshuixue.com/90523_k2rw42qy.jpg",
                    "org_number" => "876544523",//机构number
                    "org_domain" => "leasduy",//机构域名
                    "org_name" => "机构简称机",
                    "org_brief" => "托福、SAT培训机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称；名校留学申请托福、托福、SAT培训；名校留学申请SAT培训；名校留学申请",
                    "org_tags" => array(
                        "托福",
                        "SAT",
                        "GRE"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "org_score" => "5.0",
                    "comment_count" => 203,//总评论条数
                    "invite_comment_count" => 21,//邀请评论条数
                    "location" => "",
                    "school_area" => array(
                        array(
                            "name" => "",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "海淀苏州街总部",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                        array(
                            "name" => "国贸校区",
                            "detail" => "北京市海淀区苏州街18号长远天地大厦A1座1606（地铁10号线苏州街站C出口即是）"
                        ),
                    ),
                    "desc_match" => 3,
                    "teach_result" =>5,
                    "service_attitude" => 5,
                    "teacher_count" => 53,//多少位老师
                    "course_count" => 120,//课程数量
                    "courses" => array(
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称机构简称000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "klass_type" => 1,
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 2,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                        array(
                            "lesson_way" => 4,
                            "name" => "托福1000核心词汇训练营",//班课名称
                            "price" => "23.4",
                            "number" => "123123"
                        ),
                    ),
                    'area_match' => 1, // 0表示非当前地域,1表示当前地域
                ),

                
            ),
            "related_orgs" => array(// 相关机构
                array(
                    "id" => "123",//机构ID
                    "avatar" => "https://img.genshuixue.com/189510_2lcii0le.jpg",
                    "number" => "876544523",//机构number
                    "domain" => "leasduy",//机构域名
                    "name" => "机构简称",
                    "brief" => "托福、SAT培训；名校留学申请名校留学申请名校留学申请名校留学申请名校留学申请",
                    "tags" => array(
                        "xxx",
                        "bbbb",
                        "xcc"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "teacher_count" => 53,//多少位老师
                ),
                array(
                    "id" => "123",//机构ID
                    "avatar" => "https://img.genshuixue.com/150520_xf6y3g6d.jpg",
                    "number" => "876544523",//机构number
                    "domain" => "leasduy",//机构域名
                    "name" => "常春藤艺术中心",
                    "brief" => "名校留学申请名校留学申请名校留学申请名校留学申请",
                    "tags" => array(
                        "xxx",
                        "bbbb",
                        "xcc"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "teacher_count" => 93,//多少位老师
                ),
                array(
                    "id" => "123",//机构ID
                    "avatar" => "https://img.genshuixue.com/83200_i32qtezw.jpg",
                    "number" => "876544523",//机构number
                    "domain" => "leasduy",//机构域名
                    "name" => "崇文教育",
                    "brief" => "托福、SAT培训；名校留学申请",
                    "tags" => array(
                        "xxx",
                        "bbbb",
                        "xcc"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "teacher_count" => 773,//多少位老师
                ),
                array(
                    "id" => "123",//机构ID
                    "avatar" => "https://img.genshuixue.com/90523_k2rw42qy.jpg",
                    "number" => "876544523",//机构number
                    "domain" => "leasduy",//机构域名
                    "name" => "蓝马河国际教育",
                    "brief" => "托福、SAT培训；名校留学申请",
                    "tags" => array(
                        "xxx",
                        "bbbb",
                        "xcc"
                    ),
                    "org_type" => 1,//1,2,3 公司、学校等，与数据库字段值一致
                    "teacher_count" => 3,//多少位老师
                ),
            ),
            'condition'=>array(// 筛选条件
                'course' => '1231',
                "stype" => "st",
                "q" => "高中数学",
                "sort" => "all",
                "source" => "search",
                // 'org_type' => '1',
                // 'area' => '123',
                'source' => 'search', //获取搜索来源
                                    //source=hot 来自首页搜索框下方
                                    //source=cat 来自全部课程中的导航
                                    //source=floor-k12 来自首页中小学
                                    //source=floor-abroad 来自首页出国留学
                                    //source=floor-art 来自首页艺术
                'city' => array(
                    /*array(
                        'id' => '123123',
                        'name' => '长沙'
                    ),
                    array(
                        'id' => '123132',
                        'name' => '松原'
                    )*/
                ),    //新增字段,代表要搜索的城市.
                // 'video_intro' => 1, //是否有视频介绍
                // 'can_order' => 1,//可报名
                // 'is_local' => 1, //是否是本地机构
                // 'is_online' => 0 , //上课方式
                //当前选中的tab选项
                //all  综合排序
                //popular  人气
                //comment  评论数
                //teacher 老师数
                // 'sort'=> 'all',
            ),
            //右侧相关老师
            'relatedteacher' => array(
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    'detail_url' => 'xxx',
                    'stars_level' => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
                array(
                    "name" => "传世美",
                    "course" => "数学－高中数学",
                    "price" => 234,
                    "avatar_url" => 'http://pic3.zhongsou.com/image/380b94d58dd70103ef2.jpg',
                    "detail_url" => 'xxx',
                    "stars_level" => 4.5,
                ),
            ),
            //右侧相关课程
            'relatedcourse' => array(
                    array(
                    'pic' => '123', //课程图片
                    'name' => '沈佳宜1', //课程名称
                    'price' => 243 ,     //课程价格
                    'detail_url' => 'xxx',
                ),
                    array(
                    'pic' => '123', //课程图片
                    'name' => '沈佳宜2', //课程名称
                    'price' => 243 ,     //课程价格
                    'detail_url' => 'xxx',
                ),
                    array(
                    'pic' => '123', //课程图片
                    'name' => '沈佳宜3', //课程名称
                    'price' => 0 ,     //课程价格
                    'detail_url' => 'xxx',
                ),
                     array(
                    'pic' => '123', //课程图片
                    'name' => '沈佳宜4', //课程名称
                    'price' => 243 ,     //课程价格
                    'detail_url' => 'xxx',
                ),
                    array(
                    'pic' => '123', //课程图片
                    'name' => '沈佳宜5', //课程名称
                    'price' => 243 ,     //课程价格
                    'detail_url' => 'xxx',
                ),

            ),
            //搜索query
            'q'=>'',
            'category' => '分类关键词',
            'keywords' => '海淀区, 男, 上门教学',
            'title' => '北京 数学 老师-跟谁学',
            'description' => '【找好老师，上跟谁学】跟谁学拥有大量优秀的老师，在北京提供教学服务，每位老师都有详尽的个人信息展示，让您全面了解老师，轻松选择，快来看看吧',
            'has_filter' => false,
            'pager'=>array(
                'result_total' => 101,
                'local_total' => 40,
                'page' => 3, // %27%22/%3E%3C/script%3E%3Cscript%3Ealert(%27aaa%27)%3C/script%3E
                'page_size' => 10
            ),
            //搜索词纠错
            'suggest' => '英语',
            'suggests' => array(
                '英语',
                '音乐'
            ),
            'pageInnerLinks' => array(
                "channel" => array(
                    "title" => "北京英语频道",
                    "desc" => "跟谁学北京站北京艺术培训频道汇聚了众多的北京名师，为您提供最新北京艺术培训的教学、课程信息。使用北京艺术培训频道、北京艺术培训移动版，让您找到更理想的北京艺术培训."
                ),
                "recommend" => array(
                    ["name" => "北京老师", "link" => "http://"]
                ),
                "around" => array(
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""],
                    ["name" => "北京老师" , "link" => ""]
                ),
                "local" => array(
                    "title" => "北京老师",
                    "data" => array(
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""],
                        ["name" => "北京老师" , "link" => ""]
                    )
                ),
                "all" => array(
                    'A' => array(
                        ["name" => "阿克苏接电话" , "link" => ""]
                    ),
                    'B' => array(
                        ["name" => "萨克的" , "link" => ""]
                    ),
                    'C' => array(
                        ["name" => "萨克" , "link" => ""]
                    ),
                    'D' => array(
                        ["name" => "萨的" , "link" => ""]
                    )
                )
            ),
            "citylist" => array(
                "a" => [array(
                    "id" => "33816576",
                    "name" => "安庆",
                    "pinyin" => "an'qing",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "aq",
                    "city_type" => "hot"
                ), array(
                    "id" => "117964800",
                    "name" => "安顺",
                    "pinyin" => "an'shun",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "as",
                    "city_type" => "hot"
                ), array(
                    "id" => "168820736",
                    "name" => "安阳",
                    "pinyin" => "an'yang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "ay",
                    "city_type" => "hot"
                ), array(
                    "id" => "285999104",
                    "name" => "鞍山",
                    "pinyin" => "an'shan",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "anshan",
                    "city_type" => "hot"
                ), array(
                    "id" => "302514176",
                    "name" => "阿拉善盟",
                    "pinyin" => "a'la'shan'meng",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "alsm",
                    "city_type" => "open"
                ), array(
                    "id" => "386400256",
                    "name" => "安康",
                    "pinyin" => "an'kang",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "ak",
                    "city_type" => "open"
                ), array(
                    "id" => "420216832",
                    "name" => "阿坝",
                    "pinyin" => "a'ba",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "ab",
                    "city_type" => "open"
                ), array(
                    "id" => "453509120",
                    "name" => "阿里",
                    "pinyin" => "a'li",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "al",
                    "city_type" => "star"
                ), array(
                    "id" => "470286336",
                    "name" => "阿克苏",
                    "pinyin" => "a'ke'su",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "aks",
                    "city_type" => "common"
                ), array(
                    "id" => "470548480",
                    "name" => "阿拉尔",
                    "pinyin" => "a'la'er",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "ale",
                    "city_type" => "common"
                ), array(
                    "id" => "553910272",
                    "name" => "澳门",
                    "pinyin" => "ao'men",
                    "province" => "澳门",
                    "province_id" => "553648128",
                    "alpha" => "a",
                    "order" => "0",
                    "domain" => "am",
                    "city_type" => "common"
                )],
                "b" => [array(
                    "id" => "17039360",
                    "name" => "北京",
                    "pinyin" => "bei'jing",
                    "province" => "北京",
                    "province_id" => "16777216",
                    "alpha" => "b",
                    "order" => "2",
                    "domain" => "bj",
                    "city_type" => "open"
                ), array(
                    "id" => "34078720",
                    "name" => "蚌埠",
                    "pinyin" => "beng'bu",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bb",
                    "city_type" => "open"
                ), array(
                    "id" => "37748736",
                    "name" => "亳州",
                    "pinyin" => "bo'zhou",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bz",
                    "city_type" => "open"
                ), array(
                    "id" => "67633152",
                    "name" => "白银",
                    "pinyin" => "bai'yin",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "by",
                    "city_type" => "open"
                ), array(
                    "id" => "101449728",
                    "name" => "百色",
                    "pinyin" => "bai'se",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bs",
                    "city_type" => "open"
                ), array(
                    "id" => "101711872",
                    "name" => "北海",
                    "pinyin" => "bei'hai",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bh",
                    "city_type" => "open"
                ), array(
                    "id" => "118226944",
                    "name" => "毕节",
                    "pinyin" => "bi'jie",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bijie",
                    "city_type" => "open"
                ), array(
                    "id" => "135004160",
                    "name" => "白沙",
                    "pinyin" => "bai'sha",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "baisha",
                    "city_type" => "open"
                ), array(
                    "id" => "135266304",
                    "name" => "保亭",
                    "pinyin" => "bao'ting",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bt",
                    "city_type" => "open"
                ), array(
                    "id" => "151519232",
                    "name" => "保定",
                    "pinyin" => "bao'ding",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bd",
                    "city_type" => "open"
                ), array(
                    "id" => "235667456",
                    "name" => "白城",
                    "pinyin" => "bai'cheng",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bc",
                    "city_type" => "open"
                ), array(
                    "id" => "235929600",
                    "name" => "白山",
                    "pinyin" => "bai'shan",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "baishan",
                    "city_type" => "open"
                ), array(
                    "id" => "286261248",
                    "name" => "本溪",
                    "pinyin" => "ben'xi",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bx",
                    "city_type" => "open"
                ), array(
                    "id" => "302776320",
                    "name" => "巴彦淖尔盟",
                    "pinyin" => "ba'yan'nao'er'meng",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bynem",
                    "city_type" => "open"
                ), array(
                    "id" => "303038464",
                    "name" => "包头",
                    "pinyin" => "bao'tou",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "baotou",
                    "city_type" => "open"
                ), array(
                    "id" => "353107968",
                    "name" => "滨州",
                    "pinyin" => "bin'zhou",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "binzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "386662400",
                    "name" => "宝鸡",
                    "pinyin" => "bao'ji",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "baoji",
                    "city_type" => "open"
                ), array(
                    "id" => "420478976",
                    "name" => "巴中",
                    "pinyin" => "ba'zhong",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bazhong",
                    "city_type" => "open"
                ), array(
                    "id" => "470810624",
                    "name" => "巴音郭楞",
                    "pinyin" => "ba'yin'guo'leng",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "bygl",
                    "city_type" => "open"
                ), array(
                    "id" => "471072768",
                    "name" => "博尔塔拉",
                    "pinyin" => "bo'er'ta'la",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "betl",
                    "city_type" => "open"
                ), array(
                    "id" => "487849984",
                    "name" => "保山",
                    "pinyin" => "bao'shan",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "b",
                    "order" => "0",
                    "domain" => "baoshan",
                    "city_type" => "open"
                )],
                "c" => [array(
                    "id" => "419692544",
                    "name" => "成都",
                    "pinyin" => "cheng'du",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "c",
                    "order" => "2",
                    "domain" => "chengdu",
                    "city_type" => "open"
                ), array(
                    "id" => "218365952",
                    "name" => "长沙",
                    "pinyin" => "chang'sha",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "c",
                    "order" => "1",
                    "domain" => "cs",
                    "city_type" => "open"
                ), array(
                    "id" => "235143168",
                    "name" => "长春",
                    "pinyin" => "chang'chun",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "c",
                    "order" => "1",
                    "domain" => "cc",
                    "city_type" => "open"
                ), array(
                    "id" => "520355840",
                    "name" => "重庆",
                    "pinyin" => "chong'qing",
                    "province" => "重庆",
                    "province_id" => "520093696",
                    "alpha" => "c",
                    "order" => "1",
                    "domain" => "cq",
                    "city_type" => "open"
                ), array(
                    "id" => "34340864",
                    "name" => "巢湖",
                    "pinyin" => "chao'hu",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "ch",
                    "city_type" => "open"
                ), array(
                    "id" => "34603008",
                    "name" => "池州",
                    "pinyin" => "chi'zhou",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "chizhou",
                    "city_type" => "open"
                ), array(
                    "id" => "34865152",
                    "name" => "滁州",
                    "pinyin" => "chu'zhou",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cz",
                    "city_type" => "open"
                ), array(
                    "id" => "84672512",
                    "name" => "潮州",
                    "pinyin" => "chao'zhou",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "chaozhou",
                    "city_type" => "open"
                ), array(
                    "id" => "101974016",
                    "name" => "崇左",
                    "pinyin" => "chong'zuo",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "chongzuo",
                    "city_type" => "open"
                ), array(
                    "id" => "135528448",
                    "name" => "昌江",
                    "pinyin" => "chang'jiang",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cj",
                    "city_type" => "open"
                ), array(
                    "id" => "135790592",
                    "name" => "澄迈县",
                    "pinyin" => "cheng'mai'xian",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cmx",
                    "city_type" => "open"
                ), array(
                    "id" => "151781376",
                    "name" => "沧州",
                    "pinyin" => "cang'zhou",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cangzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "152043520",
                    "name" => "承德",
                    "pinyin" => "cheng'de",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cd",
                    "city_type" => "open"
                ), array(
                    "id" => "218890240",
                    "name" => "常德",
                    "pinyin" => "chang'de",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "changde",
                    "city_type" => "open"
                ), array(
                    "id" => "219152384",
                    "name" => "郴州",
                    "pinyin" => "chen'zhou",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "chenzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "252706816",
                    "name" => "常州",
                    "pinyin" => "chang'zhou",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "changzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "286523392",
                    "name" => "朝阳",
                    "pinyin" => "chao'yang",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cy",
                    "city_type" => "open"
                ), array(
                    "id" => "303300608",
                    "name" => "赤峰",
                    "pinyin" => "chi'feng",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cf",
                    "city_type" => "open"
                ), array(
                    "id" => "369623040",
                    "name" => "长治",
                    "pinyin" => "chang'zhi",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "changzhi",
                    "city_type" => "open"
                ), array(
                    "id" => "453771264",
                    "name" => "昌都",
                    "pinyin" => "chang'du",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "changdu",
                    "city_type" => "open"
                ), array(
                    "id" => "471334912",
                    "name" => "昌吉",
                    "pinyin" => "chang'ji",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "changji",
                    "city_type" => "open"
                ), array(
                    "id" => "488112128",
                    "name" => "楚雄",
                    "pinyin" => "chu'xiong",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "c",
                    "order" => "0",
                    "domain" => "cx",
                    "city_type" => "open"
                )],
                "d" => [array(
                    "id" => "369885184",
                    "name" => "大同",
                    "pinyin" => "da'tong",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "d",
                    "order" => "2",
                    "domain" => "dt",
                    "city_type" => "open"
                ), array(
                    "id" => "84934656",
                    "name" => "东莞",
                    "pinyin" => "dong'guan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "d",
                    "order" => "1",
                    "domain" => "dg",
                    "city_type" => "open"
                ), array(
                    "id" => "285736960",
                    "name" => "大连",
                    "pinyin" => "da'lian",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "d",
                    "order" => "1",
                    "domain" => "dl",
                    "city_type" => "open"
                ), array(
                    "id" => "67895296",
                    "name" => "定西",
                    "pinyin" => "ding'xi",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dx",
                    "city_type" => "open"
                ), array(
                    "id" => "136052736",
                    "name" => "定安县",
                    "pinyin" => "ding'an'xian",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dax",
                    "city_type" => "open"
                ), array(
                    "id" => "136314880",
                    "name" => "东方",
                    "pinyin" => "dong'fang",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "df",
                    "city_type" => "open"
                ), array(
                    "id" => "138936320",
                    "name" => "儋州",
                    "pinyin" => "dan'zhou",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dz",
                    "city_type" => "open"
                ), array(
                    "id" => "185073664",
                    "name" => "大庆",
                    "pinyin" => "da'qing",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dq",
                    "city_type" => "open"
                ), array(
                    "id" => "185335808",
                    "name" => "大兴安岭",
                    "pinyin" => "da'xing'an'ling",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dxal",
                    "city_type" => "open"
                ), array(
                    "id" => "286785536",
                    "name" => "丹东",
                    "pinyin" => "dan'dong",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dd",
                    "city_type" => "open"
                ), array(
                    "id" => "353370112",
                    "name" => "德州",
                    "pinyin" => "de'zhou",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dezhou",
                    "city_type" => "open"
                ), array(
                    "id" => "353632256",
                    "name" => "东营",
                    "pinyin" => "dong'ying",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dy",
                    "city_type" => "open"
                ), array(
                    "id" => "420741120",
                    "name" => "达州",
                    "pinyin" => "da'zhou",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dazhou",
                    "city_type" => "open"
                ), array(
                    "id" => "421003264",
                    "name" => "德阳",
                    "pinyin" => "de'yang",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "deyang",
                    "city_type" => "open"
                ), array(
                    "id" => "488374272",
                    "name" => "大理",
                    "pinyin" => "da'li",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dali",
                    "city_type" => "open"
                ), array(
                    "id" => "488636416",
                    "name" => "德宏",
                    "pinyin" => "de'hong",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "dh",
                    "city_type" => "open"
                ), array(
                    "id" => "488898560",
                    "name" => "迪庆",
                    "pinyin" => "di'qing",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "d",
                    "order" => "0",
                    "domain" => "diqing",
                    "city_type" => "open"
                )],
                "e" => [array(
                    "id" => "202113024",
                    "name" => "鄂州",
                    "pinyin" => "e'zhou",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "e",
                    "order" => "0",
                    "domain" => "ez",
                    "city_type" => "open"
                ), array(
                    "id" => "205783040",
                    "name" => "恩施",
                    "pinyin" => "en'shi",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "e",
                    "order" => "0",
                    "domain" => "es",
                    "city_type" => "open"
                ), array(
                    "id" => "303562752",
                    "name" => "鄂尔多斯",
                    "pinyin" => "e'er'duo'si",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "e",
                    "order" => "0",
                    "domain" => "eeds",
                    "city_type" => "open"
                )],
                "f" => [array(
                    "id" => "50593792",
                    "name" => "福州",
                    "pinyin" => "fu'zhou",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "f",
                    "order" => "1",
                    "domain" => "fz",
                    "city_type" => "open"
                ), array(
                    "id" => "35127296",
                    "name" => "阜阳",
                    "pinyin" => "fu'yang",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fy",
                    "city_type" => "open"
                ), array(
                    "id" => "85196800",
                    "name" => "佛山",
                    "pinyin" => "fo'shan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fs",
                    "city_type" => "open"
                ), array(
                    "id" => "102236160",
                    "name" => "防城港",
                    "pinyin" => "fang'cheng'gang",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fcg",
                    "city_type" => "open"
                ), array(
                    "id" => "268959744",
                    "name" => "抚州",
                    "pinyin" => "fu'zhou",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fuzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "287047680",
                    "name" => "抚顺",
                    "pinyin" => "fu'shun",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fushun",
                    "city_type" => "open"
                ), array(
                    "id" => "287309824",
                    "name" => "阜新",
                    "pinyin" => "fu'xin",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "f",
                    "order" => "0",
                    "domain" => "fx",
                    "city_type" => "open"
                )],
                "g" => [array(
                    "id" => "84148224",
                    "name" => "广州",
                    "pinyin" => "guang'zhou",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "g",
                    "order" => "1",
                    "domain" => "gz",
                    "city_type" => "open"
                ), array(
                    "id" => "117702656",
                    "name" => "贵阳",
                    "pinyin" => "gui'yang",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "g",
                    "order" => "1",
                    "domain" => "gy",
                    "city_type" => "open"
                ), array(
                    "id" => "68157440",
                    "name" => "甘南",
                    "pinyin" => "gan'nan",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "gn",
                    "city_type" => "open"
                ), array(
                    "id" => "101187584",
                    "name" => "桂林",
                    "pinyin" => "gui'lin",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "gl",
                    "city_type" => "open"
                ), array(
                    "id" => "102498304",
                    "name" => "贵港",
                    "pinyin" => "gui'gang",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "gg",
                    "city_type" => "open"
                ), array(
                    "id" => "269221888",
                    "name" => "赣州",
                    "pinyin" => "gan'zhou",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "ganzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "319291392",
                    "name" => "固原",
                    "pinyin" => "gu'yuan",
                    "province" => "宁夏",
                    "province_id" => "318767104",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "guyuan",
                    "city_type" => "open"
                ), array(
                    "id" => "336068608",
                    "name" => "果洛",
                    "pinyin" => "guo'luo",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "guoluo",
                    "city_type" => "open"
                ), array(
                    "id" => "421265408",
                    "name" => "甘孜",
                    "pinyin" => "gan'zi",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "ganzi",
                    "city_type" => "open"
                ), array(
                    "id" => "421527552",
                    "name" => "广安",
                    "pinyin" => "guang'an",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "ga",
                    "city_type" => "open"
                ), array(
                    "id" => "421789696",
                    "name" => "广元",
                    "pinyin" => "guang'yuan",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "g",
                    "order" => "0",
                    "domain" => "guangyuan",
                    "city_type" => "open"
                )],
                "h" => [array(
                    "id" => "38010880",
                    "name" => "合肥",
                    "pinyin" => "he'fei",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "h",
                    "order" => "1",
                    "domain" => "hf",
                    "city_type" => "open"
                ), array(
                    "id" => "134479872",
                    "name" => "海口",
                    "pinyin" => "hai'kou",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "h",
                    "order" => "1",
                    "domain" => "hk",
                    "city_type" => "open"
                ), array(
                    "id" => "184811520",
                    "name" => "哈尔滨",
                    "pinyin" => "ha'er'bin",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "h",
                    "order" => "1",
                    "domain" => "heb",
                    "city_type" => "open"
                ), array(
                    "id" => "503578624",
                    "name" => "杭州",
                    "pinyin" => "hang'zhou",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "h",
                    "order" => "1",
                    "domain" => "hangzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "35389440",
                    "name" => "淮北",
                    "pinyin" => "huai'bei",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hb",
                    "city_type" => "open"
                ), array(
                    "id" => "35651584",
                    "name" => "淮南",
                    "pinyin" => "huai'nan",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hn",
                    "city_type" => "open"
                ), array(
                    "id" => "35913728",
                    "name" => "黄山",
                    "pinyin" => "huang'shan",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hs",
                    "city_type" => "open"
                ), array(
                    "id" => "85458944",
                    "name" => "河源",
                    "pinyin" => "he'yuan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hy",
                    "city_type" => "open"
                ), array(
                    "id" => "85721088",
                    "name" => "惠州",
                    "pinyin" => "hui'zhou",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hz",
                    "city_type" => "open"
                ), array(
                    "id" => "102760448",
                    "name" => "河池",
                    "pinyin" => "he'chi",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hc",
                    "city_type" => "open"
                ), array(
                    "id" => "103022592",
                    "name" => "贺州",
                    "pinyin" => "he'zhou",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hezhou",
                    "city_type" => "open"
                ), array(
                    "id" => "152305664",
                    "name" => "邯郸",
                    "pinyin" => "han'dan",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hd",
                    "city_type" => "open"
                ), array(
                    "id" => "152567808",
                    "name" => "衡水",
                    "pinyin" => "heng'shui",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hengshui",
                    "city_type" => "open"
                ), array(
                    "id" => "169082880",
                    "name" => "鹤壁",
                    "pinyin" => "he'bi",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hebi",
                    "city_type" => "open"
                ), array(
                    "id" => "185597952",
                    "name" => "鹤岗",
                    "pinyin" => "he'gang",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hg",
                    "city_type" => "open"
                ), array(
                    "id" => "185860096",
                    "name" => "黑河",
                    "pinyin" => "hei'he",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hh",
                    "city_type" => "open"
                ), array(
                    "id" => "202375168",
                    "name" => "黄冈",
                    "pinyin" => "huang'gang",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "huanggang",
                    "city_type" => "open"
                ), array(
                    "id" => "202637312",
                    "name" => "黄石",
                    "pinyin" => "huang'shi",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "huangshi",
                    "city_type" => "open"
                ), array(
                    "id" => "219414528",
                    "name" => "衡阳",
                    "pinyin" => "heng'yang",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hengyang",
                    "city_type" => "open"
                ), array(
                    "id" => "219676672",
                    "name" => "怀化",
                    "pinyin" => "huai'hua",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "huaihua",
                    "city_type" => "open"
                ), array(
                    "id" => "252968960",
                    "name" => "淮安",
                    "pinyin" => "huai'an",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "ha",
                    "city_type" => "open"
                ), array(
                    "id" => "287571968",
                    "name" => "葫芦岛",
                    "pinyin" => "hu'lu'dao",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hld",
                    "city_type" => "open"
                ), array(
                    "id" => "302252032",
                    "name" => "呼和浩特",
                    "pinyin" => "hu'he'hao'te",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hhht",
                    "city_type" => "open"
                ), array(
                    "id" => "303824896",
                    "name" => "呼伦贝尔",
                    "pinyin" => "hu'lun'bei'er",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hlbe",
                    "city_type" => "open"
                ), array(
                    "id" => "336330752",
                    "name" => "海北",
                    "pinyin" => "hai'bei",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "haibei",
                    "city_type" => "open"
                ), array(
                    "id" => "336592896",
                    "name" => "海东",
                    "pinyin" => "hai'dong",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "haidong",
                    "city_type" => "open"
                ), array(
                    "id" => "336855040",
                    "name" => "海南",
                    "pinyin" => "hai'nan",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hainan",
                    "city_type" => "open"
                ), array(
                    "id" => "337117184",
                    "name" => "海西",
                    "pinyin" => "hai'xi",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hx",
                    "city_type" => "open"
                ), array(
                    "id" => "337379328",
                    "name" => "黄南",
                    "pinyin" => "huang'nan",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "huangnan",
                    "city_type" => "open"
                ), array(
                    "id" => "353894400",
                    "name" => "菏泽",
                    "pinyin" => "he'ze",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "heze",
                    "city_type" => "open"
                ), array(
                    "id" => "386924544",
                    "name" => "汉中",
                    "pinyin" => "han'zhong",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hanzhong",
                    "city_type" => "open"
                ), array(
                    "id" => "471597056",
                    "name" => "哈密",
                    "pinyin" => "ha'mi",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "hm",
                    "city_type" => "open"
                ), array(
                    "id" => "471859200",
                    "name" => "和田",
                    "pinyin" => "he'tian",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "ht",
                    "city_type" => "open"
                ), array(
                    "id" => "489160704",
                    "name" => "红河",
                    "pinyin" => "hong'he",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "honghe",
                    "city_type" => "open"
                ), array(
                    "id" => "503840768",
                    "name" => "湖州",
                    "pinyin" => "hu'zhou",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "h",
                    "order" => "0",
                    "domain" => "huzhou",
                    "city_type" => "open"
                )],
                "i" => [],
                "j" => [array(
                    "id" => "352583680",
                    "name" => "济南",
                    "pinyin" => "ji'nan",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "j",
                    "order" => "1",
                    "domain" => "jn",
                    "city_type" => "open"
                ), array(
                    "id" => "68419584",
                    "name" => "嘉峪关",
                    "pinyin" => "jia'yu'guan",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jyg",
                    "city_type" => "open"
                ), array(
                    "id" => "68681728",
                    "name" => "金昌",
                    "pinyin" => "jin'chang",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jc",
                    "city_type" => "open"
                ), array(
                    "id" => "68943872",
                    "name" => "酒泉",
                    "pinyin" => "jiu'quan",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jq",
                    "city_type" => "open"
                ), array(
                    "id" => "85983232",
                    "name" => "江门",
                    "pinyin" => "jiang'men",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jm",
                    "city_type" => "open"
                ), array(
                    "id" => "86245376",
                    "name" => "揭阳",
                    "pinyin" => "jie'yang",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jy",
                    "city_type" => "open"
                ), array(
                    "id" => "169345024",
                    "name" => "济源",
                    "pinyin" => "ji'yuan",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jiyuan",
                    "city_type" => "open"
                ), array(
                    "id" => "169607168",
                    "name" => "焦作",
                    "pinyin" => "jiao'zuo",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jz",
                    "city_type" => "open"
                ), array(
                    "id" => "186122240",
                    "name" => "鸡西",
                    "pinyin" => "ji'xi",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jx",
                    "city_type" => "open"
                ), array(
                    "id" => "186384384",
                    "name" => "佳木斯",
                    "pinyin" => "jia'mu'si",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jms",
                    "city_type" => "open"
                ), array(
                    "id" => "202899456",
                    "name" => "荆门",
                    "pinyin" => "jing'men",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jingmen",
                    "city_type" => "open"
                ), array(
                    "id" => "203161600",
                    "name" => "荆州",
                    "pinyin" => "jing'zhou",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jingzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "235405312",
                    "name" => "吉林",
                    "pinyin" => "ji'lin",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jl",
                    "city_type" => "open"
                ), array(
                    "id" => "269484032",
                    "name" => "吉安",
                    "pinyin" => "ji'an",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "ja",
                    "city_type" => "open"
                ), array(
                    "id" => "269746176",
                    "name" => "景德镇",
                    "pinyin" => "jing'de'zhen",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jdz",
                    "city_type" => "open"
                ), array(
                    "id" => "270008320",
                    "name" => "九江",
                    "pinyin" => "jiu'jiang",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jj",
                    "city_type" => "open"
                ), array(
                    "id" => "287834112",
                    "name" => "锦州",
                    "pinyin" => "jin'zhou",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jinzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "354156544",
                    "name" => "济宁",
                    "pinyin" => "ji'ning",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jining",
                    "city_type" => "open"
                ), array(
                    "id" => "370147328",
                    "name" => "晋城",
                    "pinyin" => "jin'cheng",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jincheng",
                    "city_type" => "open"
                ), array(
                    "id" => "370409472",
                    "name" => "晋中",
                    "pinyin" => "jin'zhong",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jinzhong",
                    "city_type" => "open"
                ), array(
                    "id" => "504102912",
                    "name" => "嘉兴",
                    "pinyin" => "jia'xing",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jiaxing",
                    "city_type" => "open"
                ), array(
                    "id" => "504365056",
                    "name" => "金华",
                    "pinyin" => "jin'hua",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "j",
                    "order" => "0",
                    "domain" => "jh",
                    "city_type" => "open"
                )],
                "k" => [array(
                    "id" => "486801408",
                    "name" => "昆明",
                    "pinyin" => "kun'ming",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "k",
                    "order" => "1",
                    "domain" => "km",
                    "city_type" => "open"
                ), array(
                    "id" => "168558592",
                    "name" => "开封",
                    "pinyin" => "kai'feng",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "k",
                    "order" => "0",
                    "domain" => "kf",
                    "city_type" => "open"
                ), array(
                    "id" => "472121344",
                    "name" => "喀什",
                    "pinyin" => "ka'shi",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "k",
                    "order" => "0",
                    "domain" => "ks",
                    "city_type" => "open"
                ), array(
                    "id" => "472383488",
                    "name" => "克拉玛依",
                    "pinyin" => "ke'la'ma'yi",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "k",
                    "order" => "0",
                    "domain" => "klmy",
                    "city_type" => "open"
                ), array(
                    "id" => "472645632",
                    "name" => "克孜勒苏",
                    "pinyin" => "ke'zi'le'su",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "k",
                    "order" => "0",
                    "domain" => "kzls",
                    "city_type" => "open"
                )],
                "l" => [array(
                    "id" => "67371008",
                    "name" => "兰州",
                    "pinyin" => "lan'zhou",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "l",
                    "order" => "1",
                    "domain" => "lz",
                    "city_type" => "open"
                ), array(
                    "id" => "36175872",
                    "name" => "六安",
                    "pinyin" => "lu'an",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "la",
                    "city_type" => "open"
                ), array(
                    "id" => "50855936",
                    "name" => "龙岩",
                    "pinyin" => "long'yan",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "ly",
                    "city_type" => "open"
                ), array(
                    "id" => "69206016",
                    "name" => "临夏",
                    "pinyin" => "lin'xia",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lx",
                    "city_type" => "open"
                ), array(
                    "id" => "69468160",
                    "name" => "陇南",
                    "pinyin" => "long'nan",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "ln",
                    "city_type" => "open"
                ), array(
                    "id" => "103284736",
                    "name" => "来宾",
                    "pinyin" => "lai'bin",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lb",
                    "city_type" => "open"
                ), array(
                    "id" => "103546880",
                    "name" => "柳州",
                    "pinyin" => "liu'zhou",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "liuzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "118489088",
                    "name" => "六盘水",
                    "pinyin" => "liu'pan'shui",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lps",
                    "city_type" => "open"
                ), array(
                    "id" => "136577024",
                    "name" => "乐东",
                    "pinyin" => "le'dong",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "ld",
                    "city_type" => "open"
                ), array(
                    "id" => "136839168",
                    "name" => "临高县",
                    "pinyin" => "lin'gao'xian",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lgx",
                    "city_type" => "open"
                ), array(
                    "id" => "137101312",
                    "name" => "陵水",
                    "pinyin" => "ling'shui",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "ls",
                    "city_type" => "open"
                ), array(
                    "id" => "152829952",
                    "name" => "廊坊",
                    "pinyin" => "lang'fang",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lf",
                    "city_type" => "open"
                ), array(
                    "id" => "168296448",
                    "name" => "洛阳",
                    "pinyin" => "luo'yang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "luoyang",
                    "city_type" => "open"
                ), array(
                    "id" => "172228608",
                    "name" => "漯河",
                    "pinyin" => "luo'he",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lh",
                    "city_type" => "open"
                ), array(
                    "id" => "219938816",
                    "name" => "娄底",
                    "pinyin" => "lou'di",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "loudi",
                    "city_type" => "open"
                ), array(
                    "id" => "236191744",
                    "name" => "辽源",
                    "pinyin" => "liao'yuan",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "liaoyuan",
                    "city_type" => "open"
                ), array(
                    "id" => "253231104",
                    "name" => "连云港",
                    "pinyin" => "lian'yun'gang",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lyg",
                    "city_type" => "open"
                ), array(
                    "id" => "288096256",
                    "name" => "辽阳",
                    "pinyin" => "liao'yang",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "liaoyang",
                    "city_type" => "open"
                ), array(
                    "id" => "354418688",
                    "name" => "莱芜",
                    "pinyin" => "lai'wu",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lw",
                    "city_type" => "open"
                ), array(
                    "id" => "354680832",
                    "name" => "聊城",
                    "pinyin" => "liao'cheng",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lc",
                    "city_type" => "open"
                ), array(
                    "id" => "354942976",
                    "name" => "临沂",
                    "pinyin" => "lin'yi",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "linyi",
                    "city_type" => "open"
                ), array(
                    "id" => "370671616",
                    "name" => "临汾",
                    "pinyin" => "lin'fen",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "linfen",
                    "city_type" => "open"
                ), array(
                    "id" => "370933760",
                    "name" => "吕梁",
                    "pinyin" => "lv'liang",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "ll",
                    "city_type" => "open"
                ), array(
                    "id" => "422051840",
                    "name" => "乐山",
                    "pinyin" => "le'shan",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "leshan",
                    "city_type" => "open"
                ), array(
                    "id" => "422313984",
                    "name" => "凉山",
                    "pinyin" => "liang'shan",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "liangshan",
                    "city_type" => "open"
                ), array(
                    "id" => "424935424",
                    "name" => "泸州",
                    "pinyin" => "lu'zhou",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "luzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "453246976",
                    "name" => "拉萨",
                    "pinyin" => "la'sa",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lasa",
                    "city_type" => "open"
                ), array(
                    "id" => "454033408",
                    "name" => "林芝",
                    "pinyin" => "lin'zhi",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "linzhi",
                    "city_type" => "open"
                ), array(
                    "id" => "487587840",
                    "name" => "丽江",
                    "pinyin" => "li'jiang",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lj",
                    "city_type" => "open"
                ), array(
                    "id" => "489422848",
                    "name" => "临沧",
                    "pinyin" => "lin'cang",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lincang",
                    "city_type" => "open"
                ), array(
                    "id" => "504627200",
                    "name" => "丽水",
                    "pinyin" => "li'shui",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "l",
                    "order" => "0",
                    "domain" => "lishui",
                    "city_type" => "open"
                )],
                "m" => [array(
                    "id" => "36438016",
                    "name" => "马鞍山",
                    "pinyin" => "ma'an'shan",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "mas",
                    "city_type" => "open"
                ), array(
                    "id" => "86507520",
                    "name" => "茂名",
                    "pinyin" => "mao'ming",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "mm",
                    "city_type" => "open"
                ), array(
                    "id" => "86769664",
                    "name" => "梅州",
                    "pinyin" => "mei'zhou",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "mz",
                    "city_type" => "open"
                ), array(
                    "id" => "186646528",
                    "name" => "牡丹江",
                    "pinyin" => "mu'dan'jiang",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "mdj",
                    "city_type" => "open"
                ), array(
                    "id" => "419954688",
                    "name" => "绵阳",
                    "pinyin" => "mian'yang",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "my",
                    "city_type" => "open"
                ), array(
                    "id" => "422576128",
                    "name" => "眉山",
                    "pinyin" => "mei'shan",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "m",
                    "order" => "0",
                    "domain" => "ms",
                    "city_type" => "open"
                )],
                "n" => [array(
                    "id" => "100925440",
                    "name" => "南宁",
                    "pinyin" => "nan'ning",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "n",
                    "order" => "1",
                    "domain" => "nn",
                    "city_type" => "open"
                ), array(
                    "id" => "251920384",
                    "name" => "南京",
                    "pinyin" => "nan'jing",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "n",
                    "order" => "1",
                    "domain" => "nj",
                    "city_type" => "open"
                ), array(
                    "id" => "268697600",
                    "name" => "南昌",
                    "pinyin" => "nan'chang",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "n",
                    "order" => "1",
                    "domain" => "nc",
                    "city_type" => "open"
                ), array(
                    "id" => "51118080",
                    "name" => "南平",
                    "pinyin" => "nan'ping",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "np",
                    "city_type" => "open"
                ), array(
                    "id" => "51380224",
                    "name" => "宁德",
                    "pinyin" => "ning'de",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nd",
                    "city_type" => "open"
                ), array(
                    "id" => "169869312",
                    "name" => "南阳",
                    "pinyin" => "nan'yang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "ny",
                    "city_type" => "open"
                ), array(
                    "id" => "253493248",
                    "name" => "南通",
                    "pinyin" => "nan'tong",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nt",
                    "city_type" => "open"
                ), array(
                    "id" => "422838272",
                    "name" => "南充",
                    "pinyin" => "nan'chong",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nanchong",
                    "city_type" => "open"
                ), array(
                    "id" => "423100416",
                    "name" => "内江",
                    "pinyin" => "nei'jiang",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "neijiang",
                    "city_type" => "open"
                ), array(
                    "id" => "454295552",
                    "name" => "那曲",
                    "pinyin" => "na'qu",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nq",
                    "city_type" => "open"
                ), array(
                    "id" => "487063552",
                    "name" => "怒江",
                    "pinyin" => "nu'jiang",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nujiang",
                    "city_type" => "open"
                ), array(
                    "id" => "504889344",
                    "name" => "宁波",
                    "pinyin" => "ning'bo",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "n",
                    "order" => "0",
                    "domain" => "nb",
                    "city_type" => "open"
                )],
                "o" => [],
                "p" => [array(
                    "id" => "51642368",
                    "name" => "莆田",
                    "pinyin" => "pu'tian",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pt",
                    "city_type" => "open"
                ), array(
                    "id" => "69730304",
                    "name" => "平凉",
                    "pinyin" => "ping'liang",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pl",
                    "city_type" => "open"
                ), array(
                    "id" => "170131456",
                    "name" => "平顶山",
                    "pinyin" => "ping'ding'shan",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pds",
                    "city_type" => "open"
                ), array(
                    "id" => "172490752",
                    "name" => "濮阳",
                    "pinyin" => "pu'yang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "py",
                    "city_type" => "open"
                ), array(
                    "id" => "270270464",
                    "name" => "萍乡",
                    "pinyin" => "ping'xiang",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "px",
                    "city_type" => "open"
                ), array(
                    "id" => "288358400",
                    "name" => "盘锦",
                    "pinyin" => "pan'jin",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pj",
                    "city_type" => "open"
                ), array(
                    "id" => "423362560",
                    "name" => "攀枝花",
                    "pinyin" => "pan'zhi'hua",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pzh",
                    "city_type" => "open"
                ), array(
                    "id" => "487325696",
                    "name" => "普洱",
                    "pinyin" => "pu'er",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "p",
                    "order" => "0",
                    "domain" => "pe",
                    "city_type" => "open"
                )],
                "q" => [array(
                    "id" => "352845824",
                    "name" => "青岛",
                    "pinyin" => "qing'dao",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "q",
                    "order" => "1",
                    "domain" => "qd",
                    "city_type" => "open"
                ), array(
                    "id" => "51904512",
                    "name" => "泉州",
                    "pinyin" => "quan'zhou",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qz",
                    "city_type" => "open"
                ), array(
                    "id" => "69992448",
                    "name" => "庆阳",
                    "pinyin" => "qing'yang",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qy",
                    "city_type" => "open"
                ), array(
                    "id" => "87031808",
                    "name" => "清远",
                    "pinyin" => "qing'yuan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qingyuan",
                    "city_type" => "open"
                ), array(
                    "id" => "103809024",
                    "name" => "钦州",
                    "pinyin" => "qin'zhou",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qinzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "118751232",
                    "name" => "黔东南",
                    "pinyin" => "qian'dong'nan",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qdn",
                    "city_type" => "open"
                ), array(
                    "id" => "119013376",
                    "name" => "黔南",
                    "pinyin" => "qian'nan",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qn",
                    "city_type" => "open"
                ), array(
                    "id" => "119275520",
                    "name" => "黔西南",
                    "pinyin" => "qian'xi'nan",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qxn",
                    "city_type" => "open"
                ), array(
                    "id" => "137363456",
                    "name" => "琼海",
                    "pinyin" => "qiong'hai",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qh",
                    "city_type" => "open"
                ), array(
                    "id" => "137625600",
                    "name" => "琼中",
                    "pinyin" => "qiong'zhong",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qiongzhong",
                    "city_type" => "open"
                ), array(
                    "id" => "153092096",
                    "name" => "秦皇岛",
                    "pinyin" => "qin'huang'dao",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qhd",
                    "city_type" => "open"
                ), array(
                    "id" => "186908672",
                    "name" => "七台河",
                    "pinyin" => "qi'tai'he",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qth",
                    "city_type" => "open"
                ), array(
                    "id" => "187170816",
                    "name" => "齐齐哈尔",
                    "pinyin" => "qi'qi'ha'er",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qqhe",
                    "city_type" => "open"
                ), array(
                    "id" => "203423744",
                    "name" => "潜江",
                    "pinyin" => "qian'jiang",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qj",
                    "city_type" => "open"
                ), array(
                    "id" => "489684992",
                    "name" => "曲靖",
                    "pinyin" => "qu'jing",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "qujing",
                    "city_type" => "open"
                ), array(
                    "id" => "506200064",
                    "name" => "衢州",
                    "pinyin" => "qu'zhou",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "q",
                    "order" => "0",
                    "domain" => "quzhou",
                    "city_type" => "open"
                )],
                "r" => [array(
                    "id" => "355205120",
                    "name" => "日照",
                    "pinyin" => "ri'zhao",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "r",
                    "order" => "0",
                    "domain" => "rz",
                    "city_type" => "open"
                ), array(
                    "id" => "454557696",
                    "name" => "日喀则",
                    "pinyin" => "ri'ke'ze",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "r",
                    "order" => "0",
                    "domain" => "rkz",
                    "city_type" => "open"
                )],
                "s" => [array(
                    "id" => "151257088",
                    "name" => "石家庄",
                    "pinyin" => "shi'jia'zhuang",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "s",
                    "order" => "1",
                    "domain" => "sjz",
                    "city_type" => "open"
                ), array(
                    "id" => "36700160",
                    "name" => "宿州",
                    "pinyin" => "su'zhou",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sz",
                    "city_type" => "open"
                ), array(
                    "id" => "52166656",
                    "name" => "三明",
                    "pinyin" => "san'ming",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sm",
                    "city_type" => "open"
                ), array(
                    "id" => "84410368",
                    "name" => "深圳",
                    "pinyin" => "shen'zhen",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shenzhen",
                    "city_type" => "open"
                ), array(
                    "id" => "87293952",
                    "name" => "汕头",
                    "pinyin" => "shan'tou",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "st",
                    "city_type" => "open"
                ), array(
                    "id" => "87556096",
                    "name" => "汕尾",
                    "pinyin" => "shan'wei",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sw",
                    "city_type" => "open"
                ), array(
                    "id" => "87818240",
                    "name" => "韶关",
                    "pinyin" => "shao'guan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sg",
                    "city_type" => "open"
                ), array(
                    "id" => "134742016",
                    "name" => "三亚",
                    "pinyin" => "san'ya",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sy",
                    "city_type" => "open"
                ), array(
                    "id" => "170393600",
                    "name" => "三门峡",
                    "pinyin" => "san'men'xia",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "smx",
                    "city_type" => "open"
                ), array(
                    "id" => "170655744",
                    "name" => "商丘",
                    "pinyin" => "shang'qiu",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sq",
                    "city_type" => "open"
                ), array(
                    "id" => "187432960",
                    "name" => "双鸭山",
                    "pinyin" => "shuang'ya'shan",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sys",
                    "city_type" => "open"
                ), array(
                    "id" => "187695104",
                    "name" => "绥化",
                    "pinyin" => "sui'hua",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sh",
                    "city_type" => "open"
                ), array(
                    "id" => "203685888",
                    "name" => "神农架林区",
                    "pinyin" => "shen'nong'jia'lin'qu",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "snjlq",
                    "city_type" => "open"
                ), array(
                    "id" => "203948032",
                    "name" => "十堰",
                    "pinyin" => "shi'yan",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shiyan",
                    "city_type" => "open"
                ), array(
                    "id" => "204210176",
                    "name" => "随州",
                    "pinyin" => "sui'zhou",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "suizhou",
                    "city_type" => "open"
                ), array(
                    "id" => "220200960",
                    "name" => "邵阳",
                    "pinyin" => "shao'yang",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shaoyang",
                    "city_type" => "open"
                ), array(
                    "id" => "236453888",
                    "name" => "四平",
                    "pinyin" => "si'ping",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sp",
                    "city_type" => "open"
                ), array(
                    "id" => "236716032",
                    "name" => "松原",
                    "pinyin" => "song'yuan",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "songyuan",
                    "city_type" => "open"
                ), array(
                    "id" => "252182528",
                    "name" => "苏州",
                    "pinyin" => "su'zhou",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "suzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "253755392",
                    "name" => "宿迁",
                    "pinyin" => "su'qian",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "suqian",
                    "city_type" => "open"
                ), array(
                    "id" => "270532608",
                    "name" => "上饶",
                    "pinyin" => "shang'rao",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sr",
                    "city_type" => "open"
                ), array(
                    "id" => "285474816",
                    "name" => "沈阳",
                    "pinyin" => "shen'yang",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shenyang",
                    "city_type" => "open"
                ), array(
                    "id" => "319553536",
                    "name" => "石嘴山",
                    "pinyin" => "shi'zui'shan",
                    "province" => "宁夏",
                    "province_id" => "318767104",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "szs",
                    "city_type" => "open"
                ), array(
                    "id" => "371195904",
                    "name" => "朔州",
                    "pinyin" => "shuo'zhou",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shuozhou",
                    "city_type" => "open"
                ), array(
                    "id" => "387186688",
                    "name" => "商洛",
                    "pinyin" => "shang'luo",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sl",
                    "city_type" => "open"
                ), array(
                    "id" => "402915328",
                    "name" => "上海",
                    "pinyin" => "shang'hai",
                    "province" => "上海",
                    "province_id" => "402653184",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shanghai",
                    "city_type" => "open"
                ), array(
                    "id" => "423624704",
                    "name" => "遂宁",
                    "pinyin" => "sui'ning",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sn",
                    "city_type" => "open"
                ), array(
                    "id" => "454819840",
                    "name" => "山南",
                    "pinyin" => "shan'nan",
                    "province" => "西藏",
                    "province_id" => "452984832",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shannan",
                    "city_type" => "open"
                ), array(
                    "id" => "472907776",
                    "name" => "石河子",
                    "pinyin" => "shi'he'zi",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "shz",
                    "city_type" => "open"
                ), array(
                    "id" => "505151488",
                    "name" => "绍兴",
                    "pinyin" => "shao'xing",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "s",
                    "order" => "0",
                    "domain" => "sx",
                    "city_type" => "open"
                )],
                "t" => [array(
                    "id" => "369360896",
                    "name" => "太原",
                    "pinyin" => "tai'yuan",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "t",
                    "order" => "1",
                    "domain" => "ty",
                    "city_type" => "open"
                ), array(
                    "id" => "436469760",
                    "name" => "天津",
                    "pinyin" => "tian'jin",
                    "province" => "天津",
                    "province_id" => "436207616",
                    "alpha" => "t",
                    "order" => "1",
                    "domain" => "tj",
                    "city_type" => "open"
                ), array(
                    "id" => "36962304",
                    "name" => "铜陵",
                    "pinyin" => "tong'ling",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tl",
                    "city_type" => "open"
                ), array(
                    "id" => "70254592",
                    "name" => "天水",
                    "pinyin" => "tian'shui",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "ts",
                    "city_type" => "open"
                ), array(
                    "id" => "119537664",
                    "name" => "铜仁",
                    "pinyin" => "tong'ren",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tr",
                    "city_type" => "open"
                ), array(
                    "id" => "137887744",
                    "name" => "屯昌县",
                    "pinyin" => "tun'chang'xian",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tcx",
                    "city_type" => "open"
                ), array(
                    "id" => "153354240",
                    "name" => "唐山",
                    "pinyin" => "tang'shan",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tangshan",
                    "city_type" => "open"
                ), array(
                    "id" => "204472320",
                    "name" => "天门",
                    "pinyin" => "tian'men",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tm",
                    "city_type" => "open"
                ), array(
                    "id" => "236978176",
                    "name" => "通化",
                    "pinyin" => "tong'hua",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "th",
                    "city_type" => "open"
                ), array(
                    "id" => "254017536",
                    "name" => "泰州",
                    "pinyin" => "tai'zhou",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tz",
                    "city_type" => "open"
                ), array(
                    "id" => "288620544",
                    "name" => "铁岭",
                    "pinyin" => "tie'ling",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tieling",
                    "city_type" => "open"
                ), array(
                    "id" => "304087040",
                    "name" => "通辽",
                    "pinyin" => "tong'liao",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tongliao",
                    "city_type" => "open"
                ), array(
                    "id" => "355467264",
                    "name" => "泰安",
                    "pinyin" => "tai'an",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "ta",
                    "city_type" => "open"
                ), array(
                    "id" => "387448832",
                    "name" => "铜川",
                    "pinyin" => "tong'chuan",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tc",
                    "city_type" => "open"
                ), array(
                    "id" => "473169920",
                    "name" => "图木舒克",
                    "pinyin" => "tu'mu'shu'ke",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tmsk",
                    "city_type" => "open"
                ), array(
                    "id" => "473432064",
                    "name" => "吐鲁番",
                    "pinyin" => "tu'lu'fan",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tlf",
                    "city_type" => "open"
                ), array(
                    "id" => "505413632",
                    "name" => "台州",
                    "pinyin" => "tai'zhou",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "taizhou",
                    "city_type" => "open"
                ), array(
                    "id" => "570687488",
                    "name" => "台湾",
                    "pinyin" => "tai'wan",
                    "province" => "台湾",
                    "province_id" => "570425344",
                    "alpha" => "t",
                    "order" => "0",
                    "domain" => "tw",
                    "city_type" => "open"
                )],
                "u" => [],
                "v" => [],
                "w" => [array(
                    "id" => "201588736",
                    "name" => "武汉",
                    "pinyin" => "wu'han",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "w",
                    "order" => "2",
                    "domain" => "wh",
                    "city_type" => "open"
                ), array(
                    "id" => "470024192",
                    "name" => "乌鲁木齐",
                    "pinyin" => "wu'lu'mu'qi",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "w",
                    "order" => "1",
                    "domain" => "wlmq",
                    "city_type" => "open"
                ), array(
                    "id" => "37224448",
                    "name" => "芜湖",
                    "pinyin" => "wu'hu",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wuhu",
                    "city_type" => "open"
                ), array(
                    "id" => "70516736",
                    "name" => "武威",
                    "pinyin" => "wu'wei",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "ww",
                    "city_type" => "open"
                ), array(
                    "id" => "104071168",
                    "name" => "梧州",
                    "pinyin" => "wu'zhou",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wz",
                    "city_type" => "open"
                ), array(
                    "id" => "138149888",
                    "name" => "万宁",
                    "pinyin" => "wan'ning",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wn",
                    "city_type" => "open"
                ), array(
                    "id" => "138412032",
                    "name" => "文昌",
                    "pinyin" => "wen'chang",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wc",
                    "city_type" => "open"
                ), array(
                    "id" => "138674176",
                    "name" => "五指山",
                    "pinyin" => "wu'zhi'shan",
                    "province" => "海南",
                    "province_id" => "134217728",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wzs",
                    "city_type" => "open"
                ), array(
                    "id" => "252444672",
                    "name" => "无锡",
                    "pinyin" => "wu'xi",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wx",
                    "city_type" => "open"
                ), array(
                    "id" => "304349184",
                    "name" => "乌海",
                    "pinyin" => "wu'hai",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wuhai",
                    "city_type" => "open"
                ), array(
                    "id" => "304611328",
                    "name" => "乌兰察布市",
                    "pinyin" => "wu'lan'cha'bu'shi",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wlcbs",
                    "city_type" => "open"
                ), array(
                    "id" => "319815680",
                    "name" => "吴忠",
                    "pinyin" => "wu'zhong",
                    "province" => "宁夏",
                    "province_id" => "318767104",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wuzhong",
                    "city_type" => "open"
                ), array(
                    "id" => "355729408",
                    "name" => "威海",
                    "pinyin" => "wei'hai",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "weihai",
                    "city_type" => "open"
                ), array(
                    "id" => "355991552",
                    "name" => "潍坊",
                    "pinyin" => "wei'fang",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wf",
                    "city_type" => "open"
                ), array(
                    "id" => "387710976",
                    "name" => "渭南",
                    "pinyin" => "wei'nan",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "weinan",
                    "city_type" => "open"
                ), array(
                    "id" => "473694208",
                    "name" => "五家渠",
                    "pinyin" => "wu'jia'qu",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wjq",
                    "city_type" => "open"
                ), array(
                    "id" => "489947136",
                    "name" => "文山",
                    "pinyin" => "wen'shan",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "ws",
                    "city_type" => "open"
                ), array(
                    "id" => "505675776",
                    "name" => "温州",
                    "pinyin" => "wen'zhou",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "w",
                    "order" => "0",
                    "domain" => "wenzhou",
                    "city_type" => "open"
                )],
                "x" => [array(
                    "id" => "52428800",
                    "name" => "厦门",
                    "pinyin" => "xia'men",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "x",
                    "order" => "1",
                    "domain" => "xm",
                    "city_type" => "open"
                ), array(
                    "id" => "386138112",
                    "name" => "西安",
                    "pinyin" => "xi'an",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "x",
                    "order" => "1",
                    "domain" => "xa",
                    "city_type" => "open"
                ), array(
                    "id" => "37486592",
                    "name" => "宣城",
                    "pinyin" => "xuan'cheng",
                    "province" => "安徽",
                    "province_id" => "33554432",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xc",
                    "city_type" => "open"
                ), array(
                    "id" => "153616384",
                    "name" => "邢台",
                    "pinyin" => "xing'tai",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xt",
                    "city_type" => "open"
                ), array(
                    "id" => "170917888",
                    "name" => "新乡",
                    "pinyin" => "xin'xiang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xx",
                    "city_type" => "open"
                ), array(
                    "id" => "171180032",
                    "name" => "信阳",
                    "pinyin" => "xin'yang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xy",
                    "city_type" => "open"
                ), array(
                    "id" => "171442176",
                    "name" => "许昌",
                    "pinyin" => "xu'chang",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xuchang",
                    "city_type" => "open"
                ), array(
                    "id" => "201850880",
                    "name" => "仙桃",
                    "pinyin" => "xian'tao",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xiantao",
                    "city_type" => "open"
                ), array(
                    "id" => "204734464",
                    "name" => "咸宁",
                    "pinyin" => "xian'ning",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xn",
                    "city_type" => "open"
                ), array(
                    "id" => "204996608",
                    "name" => "襄樊",
                    "pinyin" => "xiang'fan",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xf",
                    "city_type" => "open"
                ), array(
                    "id" => "205258752",
                    "name" => "孝感",
                    "pinyin" => "xiao'gan",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xg",
                    "city_type" => "open"
                ), array(
                    "id" => "220463104",
                    "name" => "湘潭",
                    "pinyin" => "xiang'tan",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xiangtan",
                    "city_type" => "open"
                ), array(
                    "id" => "220725248",
                    "name" => "湘西",
                    "pinyin" => "xiang'xi",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xiangxi",
                    "city_type" => "open"
                ), array(
                    "id" => "254279680",
                    "name" => "徐州",
                    "pinyin" => "xu'zhou",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xz",
                    "city_type" => "open"
                ), array(
                    "id" => "270794752",
                    "name" => "新余",
                    "pinyin" => "xin'yu",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xinyu",
                    "city_type" => "open"
                ), array(
                    "id" => "304873472",
                    "name" => "锡林郭勒盟",
                    "pinyin" => "xi'lin'guo'le'meng",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xlglm",
                    "city_type" => "open"
                ), array(
                    "id" => "305135616",
                    "name" => "兴安盟",
                    "pinyin" => "xing'an'meng",
                    "province" => "内蒙古",
                    "province_id" => "301989888",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xam",
                    "city_type" => "open"
                ), array(
                    "id" => "335806464",
                    "name" => "西宁",
                    "pinyin" => "xi'ning",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xining",
                    "city_type" => "open"
                ), array(
                    "id" => "371458048",
                    "name" => "忻州",
                    "pinyin" => "xin'zhou",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xinzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "387973120",
                    "name" => "咸阳",
                    "pinyin" => "xian'yang",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xianyang",
                    "city_type" => "open"
                ), array(
                    "id" => "490209280",
                    "name" => "西双版纳",
                    "pinyin" => "xi'shuang'ban'na",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xsbn",
                    "city_type" => "open"
                ), array(
                    "id" => "537133056",
                    "name" => "香港",
                    "pinyin" => "xiang'gang",
                    "province" => "香港",
                    "province_id" => "536870912",
                    "alpha" => "x",
                    "order" => "0",
                    "domain" => "xianggang",
                    "city_type" => "open"
                )],
                "y" => [array(
                    "id" => "254803968",
                    "name" => "扬州",
                    "pinyin" => "yang'zhou",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "y",
                    "order" => "1",
                    "domain" => "yangzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "319029248",
                    "name" => "银川",
                    "pinyin" => "yin'chuan",
                    "province" => "宁夏",
                    "province_id" => "318767104",
                    "alpha" => "y",
                    "order" => "1",
                    "domain" => "yinchuan",
                    "city_type" => "open"
                ), array(
                    "id" => "88080384",
                    "name" => "阳江",
                    "pinyin" => "yang'jiang",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yj",
                    "city_type" => "open"
                ), array(
                    "id" => "88342528",
                    "name" => "云浮",
                    "pinyin" => "yun'fu",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yf",
                    "city_type" => "open"
                ), array(
                    "id" => "104333312",
                    "name" => "玉林",
                    "pinyin" => "yu'lin",
                    "province" => "广西",
                    "province_id" => "100663296",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yl",
                    "city_type" => "open"
                ), array(
                    "id" => "187957248",
                    "name" => "伊春",
                    "pinyin" => "yi'chun",
                    "province" => "黑龙江",
                    "province_id" => "184549376",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yc",
                    "city_type" => "open"
                ), array(
                    "id" => "205520896",
                    "name" => "宜昌",
                    "pinyin" => "yi'chang",
                    "province" => "湖北",
                    "province_id" => "201326592",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yichang",
                    "city_type" => "open"
                ), array(
                    "id" => "220987392",
                    "name" => "益阳",
                    "pinyin" => "yi'yang",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yiyang",
                    "city_type" => "open"
                ), array(
                    "id" => "221249536",
                    "name" => "永州",
                    "pinyin" => "yong'zhou",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yz",
                    "city_type" => "open"
                ), array(
                    "id" => "221511680",
                    "name" => "岳阳",
                    "pinyin" => "yue'yang",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yy",
                    "city_type" => "open"
                ), array(
                    "id" => "237240320",
                    "name" => "延边",
                    "pinyin" => "yan'bian",
                    "province" => "吉林",
                    "province_id" => "234881024",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yb",
                    "city_type" => "open"
                ), array(
                    "id" => "254541824",
                    "name" => "盐城",
                    "pinyin" => "yan'cheng",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yancheng",
                    "city_type" => "open"
                ), array(
                    "id" => "271056896",
                    "name" => "宜春",
                    "pinyin" => "yi'chun",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yichun",
                    "city_type" => "open"
                ), array(
                    "id" => "271319040",
                    "name" => "鹰潭",
                    "pinyin" => "ying'tan",
                    "province" => "江西",
                    "province_id" => "268435456",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yt",
                    "city_type" => "open"
                ), array(
                    "id" => "288882688",
                    "name" => "营口",
                    "pinyin" => "ying'kou",
                    "province" => "辽宁",
                    "province_id" => "285212672",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yk",
                    "city_type" => "open"
                ), array(
                    "id" => "337641472",
                    "name" => "玉树",
                    "pinyin" => "yu'shu",
                    "province" => "青海",
                    "province_id" => "335544320",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "ys",
                    "city_type" => "open"
                ), array(
                    "id" => "356253696",
                    "name" => "烟台",
                    "pinyin" => "yan'tai",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yantai",
                    "city_type" => "open"
                ), array(
                    "id" => "371720192",
                    "name" => "阳泉",
                    "pinyin" => "yang'quan",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yq",
                    "city_type" => "open"
                ), array(
                    "id" => "371982336",
                    "name" => "运城",
                    "pinyin" => "yun'cheng",
                    "province" => "山西",
                    "province_id" => "369098752",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yuncheng",
                    "city_type" => "open"
                ), array(
                    "id" => "388235264",
                    "name" => "延安",
                    "pinyin" => "yan'an",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "ya",
                    "city_type" => "open"
                ), array(
                    "id" => "388497408",
                    "name" => "榆林",
                    "pinyin" => "yu'lin",
                    "province" => "陕西",
                    "province_id" => "385875968",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yulin",
                    "city_type" => "open"
                ), array(
                    "id" => "423886848",
                    "name" => "雅安",
                    "pinyin" => "ya'an",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yaan",
                    "city_type" => "open"
                ), array(
                    "id" => "424148992",
                    "name" => "宜宾",
                    "pinyin" => "yi'bin",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yibin",
                    "city_type" => "open"
                ), array(
                    "id" => "473956352",
                    "name" => "伊犁",
                    "pinyin" => "yi'li",
                    "province" => "新疆",
                    "province_id" => "469762048",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yili",
                    "city_type" => "open"
                ), array(
                    "id" => "490471424",
                    "name" => "玉溪",
                    "pinyin" => "yu'xi",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "y",
                    "order" => "0",
                    "domain" => "yx",
                    "city_type" => "open"
                )],
                "z" => [array(
                    "id" => "168034304",
                    "name" => "郑州",
                    "pinyin" => "zheng'zhou",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "z",
                    "order" => "1",
                    "domain" => "zhengzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "356777984",
                    "name" => "淄博",
                    "pinyin" => "zi'bo",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "z",
                    "order" => "1",
                    "domain" => "zb",
                    "city_type" => "open"
                ), array(
                    "id" => "52690944",
                    "name" => "漳州",
                    "pinyin" => "zhang'zhou",
                    "province" => "福建",
                    "province_id" => "50331648",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zz",
                    "city_type" => "open"
                ), array(
                    "id" => "70778880",
                    "name" => "张掖",
                    "pinyin" => "zhang'ye",
                    "province" => "甘肃",
                    "province_id" => "67108864",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zy",
                    "city_type" => "open"
                ), array(
                    "id" => "88604672",
                    "name" => "湛江",
                    "pinyin" => "zhan'jiang",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zj",
                    "city_type" => "open"
                ), array(
                    "id" => "88866816",
                    "name" => "肇庆",
                    "pinyin" => "zhao'qing",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zq",
                    "city_type" => "open"
                ), array(
                    "id" => "89128960",
                    "name" => "中山",
                    "pinyin" => "zhong'shan",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zs",
                    "city_type" => "open"
                ), array(
                    "id" => "89391104",
                    "name" => "珠海",
                    "pinyin" => "zhu'hai",
                    "province" => "广东",
                    "province_id" => "83886080",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zh",
                    "city_type" => "open"
                ), array(
                    "id" => "119799808",
                    "name" => "遵义",
                    "pinyin" => "zun'yi",
                    "province" => "贵州",
                    "province_id" => "117440512",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zunyi",
                    "city_type" => "open"
                ), array(
                    "id" => "153878528",
                    "name" => "张家口",
                    "pinyin" => "zhang'jia'kou",
                    "province" => "河北",
                    "province_id" => "150994944",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zjk",
                    "city_type" => "open"
                ), array(
                    "id" => "171704320",
                    "name" => "周口",
                    "pinyin" => "zhou'kou",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zk",
                    "city_type" => "open"
                ), array(
                    "id" => "171966464",
                    "name" => "驻马店",
                    "pinyin" => "zhu'ma'dian",
                    "province" => "河南",
                    "province_id" => "167772160",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zmd",
                    "city_type" => "open"
                ), array(
                    "id" => "218628096",
                    "name" => "张家界",
                    "pinyin" => "zhang'jia'jie",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zjj",
                    "city_type" => "open"
                ), array(
                    "id" => "221773824",
                    "name" => "株洲",
                    "pinyin" => "zhu'zhou",
                    "province" => "湖南",
                    "province_id" => "218103808",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zhuzhou",
                    "city_type" => "open"
                ), array(
                    "id" => "255066112",
                    "name" => "镇江",
                    "pinyin" => "zhen'jiang",
                    "province" => "江苏",
                    "province_id" => "251658240",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zhenjiang",
                    "city_type" => "open"
                ), array(
                    "id" => "320077824",
                    "name" => "中卫",
                    "pinyin" => "zhong'wei",
                    "province" => "宁夏",
                    "province_id" => "318767104",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zw",
                    "city_type" => "open"
                ), array(
                    "id" => "356515840",
                    "name" => "枣庄",
                    "pinyin" => "zao'zhuang",
                    "province" => "山东",
                    "province_id" => "352321536",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zaozhuang",
                    "city_type" => "open"
                ), array(
                    "id" => "424411136",
                    "name" => "资阳",
                    "pinyin" => "zi'yang",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "ziyang",
                    "city_type" => "open"
                ), array(
                    "id" => "424673280",
                    "name" => "自贡",
                    "pinyin" => "zi'gong",
                    "province" => "四川",
                    "province_id" => "419430400",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zg",
                    "city_type" => "open"
                ), array(
                    "id" => "490733568",
                    "name" => "昭通",
                    "pinyin" => "zhao'tong",
                    "province" => "云南",
                    "province_id" => "486539264",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zt",
                    "city_type" => "open"
                ), array(
                    "id" => "505937920",
                    "name" => "舟山",
                    "pinyin" => "zhou'shan",
                    "province" => "浙江",
                    "province_id" => "503316480",
                    "alpha" => "z",
                    "order" => "0",
                    "domain" => "zhoushan",
                    "city_type" => "open"
                )]
            ),
            "qid" => '123123',
            "abtest" => 0, // 已废弃
            "city_pinyin" => 'songyuan',
            "gold_cert_org" => [
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873150_b4d0ym7d.png@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873231_88l65hxf.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ],
                [
                    "imgUrl" => 'http://img.gsxservice.com/4873159_y4nf3mhx.jpg@0e_1190w_110h_1c_0i_1o_90Q_1x.jpg',
                    "webUrl" => 'www.genshuixue.com',
                    "orgNumber" => 413075219,
                    "cityId" => 17039360
                ]
            ]
        ),

        "log_data" => array(
            "qid" => '123123',
        )
        
    )
);
