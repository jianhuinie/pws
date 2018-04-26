<?php

if ($_GET['path'] == "") {
    $response = array(
        "code" => 0,
        "data" => array(
            "path" => "ziliaoku/88735647737/",
            "alias" => "我是别名",
            "list" => [
/*                array(
                    "Key" => "/老师资料库/", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "老师资料库", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                )*/
            ]
        )
    );
}
else if ($_GET['path'] == "/老师资料库/") {
    $response = array(
        "code" => 0,
        "data" => array(
            "list" => [
                array(
                    "Key" => "/老师资料库/语文/", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "语文", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                ),
                array(
                    "Key" => "/老师资料库/数学/", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "数学", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                ),
                array(
                    "Key" => "/老师资料库/个人简历.pdf", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "个人简历.pdf", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                )
            ]
        )
    );
}
else if ($_GET['path'] == "/老师资料库/语文/") {
    $response = array(
        "code" => 0,
        "data" => array(
            "list" => [
                array(
                    "Key" => "/老师资料库/语文/高一", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "高一", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                ),
                array(
                    "Key" => "/老师资料库/语文/高二/", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "高二", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                ),
                array(
                    "Key" => "/老师资料库/语文/语文讲义.ppt", //文件全路径
                    "LastModified" => "2012-02-23T07:01:12.000Z", //文件最后修改时间
                    "ETag" => "0303jjJIi9848888M", //文件md5
                    "Size" => 34449, //文件大小
                    "Name" => "语文讲义.ppt", //文件名
                    "download_link" =>'http://img.gsxservice.com/589169.jpq' //下载链接
                )
            ]
        )
    );
}

echo json_encode($response);