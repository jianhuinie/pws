<?php

require("../../bootstrap.php");

render(
    "userCenter/teacherCenter/netdiskShare",
    array(
        "tpl_data" => array(
            "course_name" => "2016英语冲刺班",
            "course_number" => "1232",
            "course_type" => 3,
            "path" => "ziliaoku/835693638/", // 当verify_faild_fields前目录路径
            "quota_used" => "1231231", //已使用
            "quota_total" => "12312312312", //总容量
            "file_list" => [
                array(
                    "name" => "2016冲刺纠结啊三季度撒就登记安师大纠结啊简单的模拟.jpg",
                    "file_type" => "zip",
                    "fid" => 11,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 0,  // 是否公开
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
                array(
                    "name" => '文件3.jpg',
                    "file_type" => "jpg",
                    "fid" => 12,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 1,  // 是否公开（1：公开，0：仅本班课）
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
                array(
                    "name" => '文件4.jpg',
                    "file_type" => "jpg",
                    "fid" => 13,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 0,  // 是否公开
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
                array(
                    "name" => '文件4.jpg',
                    "file_type" => "jpg",
                    "fid" => 14,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 0,  // 是否公开
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
                array(
                    "name" => '文件5.jpg',
                    "file_type" => "jpg",
                    "fid" => 15,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 0,  // 是否公开
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
                array(
                    "name" => '文件6.jpg',
                    "file_type" => "png",
                    "fid" => 16,
                    "path" => "ziliaoku/835670598/123123/2016冲刺模拟.jpg",
                    "view_count" => 0,  // 浏览量
                    "download_count" => 3,    // 下载量
                    "is_open" => 0,  // 是否公开
                    "can_download" => 1,  // 是否允许下载（0：禁止，1：允许）
                    "size" => 1234,    // 文件大小
                ),
            ],
            "is_org_teacher" => true, // 是否乃机构老师
            "bar_hidden" => false, // 是否显示工具条
            "root_path" => "ziliaoku/835693638/", // 我的资料，路径
            // "alias" => "ziliaoku/835693638/", 据说同path，故去掉
            "sort_by" => "update_time", // size=按大小排序, update_time=按最后更新时间
            "direction" => "asc", //desc asc,
            "is_live_course_ware_path" => false, // is_live_course_ware
            "objects"=> [ // 原名list
                // 加 fid
                array(
                    "is_virtual_object" => true, // 是否是不可操作项目／视频课文件库／直播回放视频 // 1显示删除按钮且可删除 2隐藏删除按钮 3显示删除按钮，但点击删除时，需发送请求，对删除操作进行鉴权
                    "can_rename" => false, // 是否可重命名
                    "can_move" => false, // 是否可移动
                    "can_download" => false, // 是否可下载
                    "can_delete" => false, // 是否可删除
                    "size" => 0, // 文件大小,B
                    "update_at" => null, // 文件最后修改时间
                    "is_live_course_ware" => false, // 直播课件
                    "path" => "video_course_root_dir/", // 文件全路径
                    "name" => "视频课文件库" // 名字
                ),
                array(
                    "is_virtual_object" => true, // 是否是不可操作项目／视频课文件库／直播回放视频
                    "can_rename" => false,
                    "can_move" => false,
                    "can_delete" => false, // 是否可删除
                    "size" => 0,
                    "update_at" => null,
                    "is_live_course_ware" => false,
                    "path" => "playback_root_dir/",
                    "can_download" => false,
                    "name" => "直播回放视频"
                ),
                array(
                    "is_virtual_object" => false,
                    "can_rename" => true,
                    "can_delete" => true, // 是否可删除
                    "can_move" => false,
                    "size" => 0,
                    "update_at" => null,
                    "is_live_course_ware" => false,
                    "path" => "playback_root_dir/",
                    "can_download" => false,
                    "name" => "我只是一个普通文件夹"
                ),
                array(
                    "is_virtual_object" => false,
                    "can_rename" => true,
                    "can_delete" => true, // 是否可删除
                    "can_move" => false,
                    "size" => 0,
                    "update_at" => null,
                    "is_live_course_ware" => false,
                    "path" => "playback_root_dir/",
                    "can_download" => false,
                    "name" => "我只是一个普通文件夹二"
                ),
                array(
                    "is_virtual_object" => false,
                    "can_rename" => true,
                    "can_delete" => true, // 是否可删除
                    "can_move" => true,
                    "can_download" => true,
                    "size" => 337345,
                    "update_at" => "2016-03-17 14:29",
                    "is_live_course_ware" => true,
                    "path" => "ziliaoku/412964518/在线课程课件.ppt",
                    "name" => "在线课程课件.ppt"
                ),
                array(
                    "is_virtual_object" => false, // 是否是不可操作项目
                    "can_rename" => true,
                    "can_delete" => true, // 是否可删除
                    "can_move" => true,
                    "can_download" => true,
                    "size" => 1337345,
                    "update_at" => "2016-03-27 14:29",
                    "is_live_course_ware" => true,
                    "path" => "/老师资料库/公开课.avi",
                    "name" => "公开课.avi"
                ),
                array(
                    "is_virtual_object" => false,
                    "can_rename" => false,
                    "can_delete" => true, // 是否可删除
                    "can_move" => false,
                    "can_download" => false,
                    "size" => 337345,
                    "update_at" => "2016-03-17 14:29",
                    "is_live_course_ware" => true,
                    "path" => "ziliaoku/412964518/在线课程课件.video",
                    "name" => "在线课程课件.video"
                ),
                array(
                    "is_virtual_object" => false, // 是否是不可操作项目
                    "can_rename" => false,
                    "can_delete" => true, // 是否可删除
                    "can_move" => false,
                    "can_download" => false,
                    "size" => 1337345,
                    "update_at" => "2016-03-27 14:29",
                    "is_live_course_ware" => true,
                    "path" => "/老师资料库/公开课.video",
                    "name" => "公开课.video"
                ),
                /*array(
                    // "Key" => "875094828/123/", //文件全路径
                    // "LastModified" => 1428901886, //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    // "Size" => 0, //文件大小
                    // "Name" => "123", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq', //下载链接,
                    // "Alias" => "我是别名我是别名我是别名我是别名我是我是别名我是别名我是别名我是别名我是"
                ),*/
            ]
        )
    )
);