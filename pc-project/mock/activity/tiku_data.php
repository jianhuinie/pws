<?php

require("../bootstrap.php");

render(
    'activity/tag_index',
     array(
          "tpl_data" =>
                array(
                      "subject_id" =>  "s_10",
                      "subject_name" =>  "小学数学",
                      "points" => array(
                             array(
                                   "point_id" =>  "p_161523",
                                   "point_name" =>  "百以内的减法（不退位）"
                             ),
                             array(
                                    "point_id" =>  "p_163379",
                                    "point_name" =>  "长度单位（米，厘米）"
                             ),
                             array(
                                     "point_id" =>  "p_163543",
                                     "point_name" =>  "小数的简便算法"
                             )
                      )
                )
          )
    );
?>