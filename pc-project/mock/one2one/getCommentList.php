<?php

$response = array(
    "code" => 0,
    "message" => "请求成功",
    "data" => array(
        "comment_paged" => array(
            "pager" => array(
                "has_more" => true,
                "next_page" => 2,
                "current_page" => 1,
                "total" => 3
            ),
            "items" => array(
                array(
                    "id" => "38931",
                    "score" => 4,
                    "content" => "5566状态对不对哦，天回电话回电话BD本地化",
                    "thumb_count" => 0,
                    "create_time" => "2017-04-18 20:27:26",
                    "user" => array(
                        "avatar_url" => "https://test-imgs.genshuixue.com/822937_gj8gzom4.jpeg",
                        "display_name" => "吱吱",
                        "number" => 791812058
                    ),
                    "fold_comments" => array(
                        array(
                            "id" => "38931",
                            "score" => 3,
                            "thumb_count" => 33,
                            "create_time" => "2017-04-18",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    ),
                    "reply_comments" => array(
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    ),
                    "addition_comments" => array(
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        ),
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    )
                ),
                array(
                    "id" => "38931",
                    "score" => 5,
                    "content" => "994状态对不对哦，天回电话回电话BD本地化",
                    "thumb_count" => 0,
                    "create_time" => "2017-04-18 20:27:26",
                    "user" => array(
                        "avatar_url" => "https://test-imgs.genshuixue.com/822937_gj8gzom4.jpeg",
                        "display_name" => "呀呀",
                        "number" => 791812058
                    ),
                    "fold_comments" => array( // 该用户其他评论
                        array(
                            "id" => "38931",
                            "score" => 1,
                            "thumb_count" => 11,
                            "create_time" => "2017-04-18",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        ),
                        array(
                            "id" => "38931",
                            "score" => 2,
                            "thumb_count" => 22,
                            "create_time" => "2017-04-18",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    ),
                    "reply_comments" => array( // 评论回复
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        ),
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    ),
                    "addition_comments" => array( // 追加评论
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        ),
                        array(
                            "id" => "38931",
                            "content" => "994状态对不对哦，天回电话回电话BD本地化"
                        )
                    )
                )
            )
        )
    )
);


echo json_encode($response);