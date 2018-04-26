<?php

require('../bootstrap.php');

$response = array(
    "quota_used" => "123123123123", //已使用
    "quota_total" => "1123123", //总容量
    "path" => "/我的资料库/图片/",
    "alias" => "/我的资料库/图片/",
    "sort_by" => "size", //size=按大小排序, update_time=按最后更新时间
    "direction" => "asc", //desc asc
    "list" => [
        array(
            "Key" => "2344/jiy/深入学习MongoDB.pdf", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "深入学习MongoDB.pdf", //文件名
            "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
        ),
        array(
            "Key" => "2344/jiy/CSS权威指南__（第三版）.pdf", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "CSS权威指南__（第三版）.pdf", //文件名
            "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
        ),
        array(
            "Key" => "2344/jiy/Getting Started with Laravel 4.doc", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "Getting Started with Laravel 4.doc", //文件名
            "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
        )
    ],
    "data" => array(
        "list" => $list,
        "tpl" => array(
            "list" => fetch("teacher_center/netdisk/netdiskTable",
                array(
                    "tpl_data" => $list
                )
            )
        )
    )
);

echo json_encode($response);