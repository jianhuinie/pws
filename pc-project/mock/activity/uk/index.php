<?php

require("../../bootstrap.php");

render(
    "activity/uk/index",
    array(
        "tpl_data" => array(
            "has_pay" => 0, //0我要报名 1我要投票
            "active" => array(
                array(
                    "title" => "为加深国内外优秀文化的交流，传播和弘扬中华文化的精髓，颁发“中英文化交流优秀奖”证书",
                    "summary" => "本次大赛将选拔出一批拥有突出才艺和技能的优秀学生代表，作为中外文化交流的使者，参与一系列的文化交流活动，深化中英关系",
                    "number" => "2136",
                    "url" => "http://www.genshuixue.com"
                ),
                array(
                    "title" => "作为中外文化交流的使者，参与一系列的文化交流活动",
                    "summary" => "还将选拔出400名优秀学生",
                    "number" => "2136",
                    "url" => "http://www.genshuixue.com"
                ),
                array(
                    "title" => "活动设立小学组、初中组、高中组和大学组",
                    "summary" => "如高中生报名至初中组、初中生报名至小学组等情况",
                    "number" => "2136",
                    "url" => "http://www.genshuixue.com"
                ),
                array(
                    "title" => "参赛者按照所就读年级报名对应组别，不允许跨年级段报名",
                    "summary" => "本次大赛将选拔出一批拥有突出才艺和技能的优秀学生代表，作为中外文化交流的使者，参与一系列的文化交流活动，深化中英关系",
                    "number" => "2136",
                    "url" => "http://www.genshuixue.com"
                )
            )
        )
    )
);

