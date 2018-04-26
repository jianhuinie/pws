<?php

$response = array(
    'code' => 0,
    'data' => array(
        'scores' => 100, // 检测分数
        'task_list' => array( // 检测项目
            array(
                'static_desc' => '您的照片少于4张，',
                'href_desc' => '去上传',
                'href_url' => '#'
            ),
            array(
                'static_desc' => '缺少视频，',
                'href_desc' => '去上传',
                'href_url' => '#'
            ),
            array(
                'static_desc' => '真实评价少于50条，',
                'href_desc' => '开课招生源并建议学生写评价',
                'href_url' => '#'
            ),
            array(
                'static_desc' => '静态描述，',
                'href_desc' => '点击描述',
                'href_url' => '跳转链接'
            )
        )
    )
);

echo json_encode($response);