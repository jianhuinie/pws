<?php

$response = array(
    "code" => 0,
    "message" => "请求成功",
    "data" => array(
        "query_one_on_one_course" => array(
            "number" => "17042454228410",
            "lesson_ways" => array(
                "ONLINE",
                "STUDENT",
                "TEACHER"
            ),
            "categories" => array( // 分类
                array(
                    "name" => "可很快就好可很快就好",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "price_student" => null,
                    "normal_course_id" => "87882"
                ),
                array(
                    "name" => "哎哟喂哎哟喂哎哟喂",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "normal_course_id" => "87882"
                ),
                array(
                    "name" => "可很快就好",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "price_student" => null,
                    "normal_course_id" => "87882"
                ),
                array(
                    "name" => "哎哟喂哎哟喂哎哟喂",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "normal_course_id" => "87882"
                ),array(
                    "name" => "可很快就好",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "price_student" => null,
                    "normal_course_id" => "87882"
                ),
                array(
                    "name" => "哎哟喂哎哟喂哎哟喂哎哟喂",
                    "price_online" => "100.00",
                    "price_teacher" => "1.00",
                    "normal_course_id" => "87882"
                )
            ),
            "display_status_student" => array(
                "status" => array(
                    "state" => "ENROLLING",
                    "name" => "正在招生"
                )
            ),
            "combos" => array(
                array(
                    // "id" => "163845",
                    // "name" => "对方方法",
                    // "discount" => "8.5",
                    "hours" => "10"
                ),
                array(
                    // "id" => "163879",
                    // "name" => "&#39;222&#39;",
                    // "discount" => "10",
                    "hours" => "20"
                ),
                array(
                    // "id" => "163888",
                    // "name" => "&#39;222&#39;",
                    // "discount" => "10",
                    "hours" => "30"
                )
            )
        )
    )
);


echo json_encode($response);