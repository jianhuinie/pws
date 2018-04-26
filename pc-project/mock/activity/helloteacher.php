<?php

require("../bootstrap.php");

render(
    "activity/helloteacherNew",
    array(
        "tpl_data" => array(
            "head" => array(
                "head_img" => "http://img.gsxservice.com/0cms/d/file/content/2016/01/569342a40a654.jpg",
                "mid_img" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720c8f2ea.jpg",
                "content" => array(
                    "跟谁学是目前全球最大的好老师平台",
                    "是一款万千家长推荐使用的找好老师APP",
                    "产品上线一年，注册老师数量变超过30万名",
                    "入驻机构超过3万家，覆盖城市数量超过300座",
                    "跟谁学的愿景是打造一个人人乐用的学习服务平台",
                    "跟谁学利用搜索、大数据、LBS和云计算等技术精准匹配师资，智能互动沟通",
                    "让教与学更平等、更便捷、更高效"
                ),
                "head_height" => "450px"
            ),
            "list" => array(
                array(
                    "img1" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa74edd23d6.jpg",
                    "img2" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720cbc4cd.jpg",
                    "activity_url" => "http://www.genshuixue.com"
                ),
                array(
                    "img1" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720d96476.jpg",
                    "img2" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720d63251.jpg"
                ),
                array(
                    "img1" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720e0c83f.jpg",
                    "img2" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720de162d.jpg"
                ),
                array(
                    "img1" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720e5dd3e.jpg",
                    "img2" => "http://img.gsxservice.com/0cms/d/file/content/2015/09/55fa720e38902.jpg"
                )
            )
        )
    )
);

