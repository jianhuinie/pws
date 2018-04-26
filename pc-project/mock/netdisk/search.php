<?php

require('../bootstrap.php');

$response = array(
        "code" => 0,
        "data" => array(
        "quota_used" => "123123123123", //已使用
        "quota_total" => "1123123", //总容量
        "path" => "/我的资料库/我的关键词/",
        "alias" => "/我的资料库/我的关键词/",
        "sort_by" => "size", //size=按大小排序, update_time=按最后更新时间
        "direction" => "asc", //desc asc
        "list" => [
            array(
                "Key" => "2344/jiy/优惠劵.jpg", //文件全路径
                "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                "ETag" => "0303jjJIi9848888M", //文件md5
                "Size" => 34449, //文件大小
                "Name" => "优惠劵.jpg", //文件名
                "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
            ),
            array(
                "Key" => "2344/jiy/优惠劵使用流程.zip", //文件全路径
                "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                "ETag" => "0303jjJIi9848888M", //文件md5
                "Size" => 34449, //文件大小
                "Name" => "优惠劵使用流程.zip", //文件名
                "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
            ),
            array(
                "Key" => "2344/jiy/优惠券-主站展示&下单&使用逻辑.docx", //文件全路径
                "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                "ETag" => "0303jjJIi9848888M", //文件md5
                "Size" => 34449, //文件大小
                "Name" => "优惠券-主站展示&下单&使用逻辑.docx", //文件名
                "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
            )
        ]
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