<?php

require('../bootstrap.php');

$response = array(
    "quota_used" => "123123123123", //已使用
    "quota_total" => "1123123", //总容量
    "path" => "ziliaoku/875094828/数学/语文/英语/",
    "alias" => "ziliaoku/875094828/数学/语文/英语/",
    "sort_by" => "size", //size=按大小排序, update_time=按最后更新时间
    "direction" => "asc", //desc asc
    "list" => [
        array(
            "Key" => "2344/jiy/jii.jpg", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "jii.jpg", //文件名
            "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
        ),
        array(
            "Key" => "2344/jiy/jii.jpg", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "jii.jpg", //文件名
            "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
        ),
        array(
            "Key" => "2344/jiy/jii.jpg", //文件全路径
            "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
            "ETag" => "0303jjJIi9848888M", //文件md5
            "Size" => 34449, //文件大小
            "Name" => "jii.jpg", //文件名
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