<?php

require("../bootstrap.php");

$tpl_data = array(
    "tpl_data" => array(
        "course_infos" =>array(
            array(
              'number' => '15021142724',
              'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
              'title' => '机构老师-视频课',
              'user_name' =>'james',
              'introduce' => '机构老师机构老师机构老师机构老师',
              'price' => 10,
              'payers_count' => 35,
              'profit' => 0,
              'label_ids' => array(
                  '啥来的快放假',
                  'alsdkjf'
              ),
              'course_items_count' => 34, //课节数
              'language' => 1,
              'subjects' => array(
                  '体育',
                  '武术',
                  '跆拳道'
              ), // 科目
              'user_id' => '874171288',
              'name' => '徐梅山',
              'section_id' => '1231231'
            ),
            array(
              'number' => '15021142724',
              'portrait' => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
              'title' => '机构老师-视频课',
              'user_name' =>'james',
              'introduce' => '机构老师机构老师机构老师机构老师',
              'price' => 0,
              'payers_count' => 35,
              'profit' => 0,
              'label_ids' => array(
                  '啥来的快放假',
                  'alsdkjf'
              ),
              'course_items_count' => 34, //课节数
              'language' => 1,
              'subjects' => array(
                  '体育',
                  '武术',
                  '跆拳道'
              ), // 科目
              'user_id' => '874171288',
              'name' => '徐梅山',
              'section_id' => '1231231'
              )
        ),
        "course_type" => "video",
        "is_headmaster" => true
    )
);
$response = array(
    "code" => 0,
    "data" => array(
        "course_infos" => $tpl_data['tpl_data']['course_infos'],
        "profile" =>array(
            'name' => 'zhangsan',
            'can_order' => true
        ),
        "tpl"=>array("course_list" => fetch('teacher/newDetail/courseListNew', array(
                'tpl_data' => $tpl_data['tpl_data']
        )))

    )
);

echo json_encode($response);