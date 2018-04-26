<?php

require("../bootstrap.php");

render(
    "activity/kaoyan",
    array(
       "tpl_data" => array(
            'share_img' => '',
            'share_text' => '跟谁学《⽣活家》专题',
            'title' => '《懂⾏行·⽣生活家》|《懂⾏行》第⼀一期|塔罗牌|摄影|烘焙|红酒品鉴|养⽣生|咖啡精选课程',
            'description' => '跟谁学优质兴趣类课程专栏——《懂⾏行·⽣生活家》',
            'keywords' => '兴趣课程、跟谁学、塔罗牌、摄影教程、烘焙教程、品酒、养⽣生咖啡精品课'
        )
    )
);