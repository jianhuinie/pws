<?php

require("../bootstrap.php");

render(
    "teacher_center/cloudPlayback",
    array(
        "tpl_data" => array(
            "class_course" => array( // 班课
                "course_list" => array(
                    "150629479741" => array(
                        "number" => "150629479741",
                        "name" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                        "playback_expire_day" => "10",
                        "schedule_list" => array(
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第1节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "20", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第3节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "30", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第5节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "50", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第7节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "70", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            )
                        )
                    ),
                    "147974926051" => array(
                        "number" => "150629479741",
                        "name" => "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
                        "playback_expire_day" => "10",
                        "schedule_list" => array(
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第1节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "20", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第3节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "30", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第5节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "50", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            ),
                            array(
                                "schedule_id" => "11117",
                                "schedule_name" => "第7节",
                                "begin_time" => "2015-07-05 06:00:00",
                                "playback_id" => "211", // 云端录制回放id
                                "media_expire" => "2016-03-28",
                                "media_status" => "70", // 初始状态-20，转码中-30，转码失败-50，转码成功-70，已过有效期－90
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=150629819699",
                                "video_item_exist" => 0 // 是否存在对应视频课 1已售卖课节 0前往售卖
                            )
                        )
                    ),
                )
            ),
            "onevone" => array( // 一对一
                "course_list" => array(
                    "160426484506" => array(
                        "number" => "160426484506",
                        "name" => "卡拉OK-一对一半小时 安东尼",
                        "playback_expire_day" => "10",
                        "schedule_list" => array(
                            array(
                                "schedule_id" => "33392",
                                "schedule_name" => "第1节",
                                "begin_time" => "2016-04-26 21:00",
                                "playback_id" => "357",
                                "media_expire" => "2016-05-06",
                                "media_status" => 90,
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=160426878745",
                                "video_item_exist" => 1
                            ),
                            array(
                                "schedule_id" => "33393",
                                "schedule_name" => "第2节",
                                "begin_time" => "2016-04-26 21:05",
                                "playback_id" => "358",
                                "media_expire" => "2016-05-06",
                                "media_status" => 90,
                                "cloud_playback_url" => "http://test.genshuixue.com/live/playback?classid=160426878749",
                                "video_item_exist" => 1
                            )
                        )
                    )
                )
            )
        )
    )
);






