<?php

require("../bootstrap.php");


render(
        "information/infoDetail", array(
    "tpl_data" => array(
        'profile' => array(
            'user_id' => '1233456',
            'name' => '123213',
        ),
        "description" => '资询详情页',
        "key" => '中小学，资询详情，中小学，资询详情',
        "title" => '资询详情',
        "ranklist" => array(
            'week' => array(
                array(
                    "text" => "每周这里的大牛老师和别师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                )
            ),
            'month' => array(
                array(
                    "text" => "每月快看看这里的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师的大牛老师和别致和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老的大牛老师和别致师和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致的大牛老师和别致的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致师和别",
                    "url" => "http://baidu.com"
                )
            )
        ),
        'article' => array(
            'title' => '陈向东创业：任“跟谁学”CEO，名“百家互联”',
            'author' => '王凯',
            'source' => '跟谁学教育',
            'time' => '2014-05-22',
            'is_teacher' => '1',
            'url_teacher' => 'url',
            'slogan' => '文章缩略简介',
            'content' => '
    <div class="img">
        <img src="http://cdn.gsxservice.com/asset/img/guide/new/value/value2.jpg" alt="（来源：陈向东微博）"/>
    </div>
    <p class="paragraph">文章内容快看看这里的大牛老师和别致…快看看这里的大牛老师和别致…快看看这里的大牛老师和别致…</p><br/>
    <p class="paragraph">
        据教育自媒体《九宫八卦》主笔郑勇(微博)爆料，新东方前执行总裁陈向东(微博)近日已经结束在美休假，回到北京，宴请02年陪他创业的武汉新东方的同行者。虽未表明未来发展态度，但似乎踌躇满志。
    </p><br/>
    <p class="paragraph">
        据教育自媒体《九宫八卦》主笔郑勇(微博)爆料，新东方前执行总裁陈向东(微博)近日已经结束在美休假，回到北京，宴请02年陪他创业的武汉新东方的同行者。虽未表明未来发展态度，但似乎踌躇满志。
    </p>'
        ),
        "newlist" => array(
            'left' => array(
                array(
                    "text" => " 陈向东发声：徐小平极大关注跟谁学，体验并吐槽",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => " 陈向东发声：徐小平极大关注跟谁学，体验并吐槽",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                )
            ),
            'right' => array(
                array(
                    "text" => "来跟谁学，跟谁学？快看看这里的大牛老师和别致课程吧在要要要",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                ),
                array(
                    "text" => "快看看这里的大牛老师和别致…",
                    "url" => "http://baidu.com"
                )
            )
        ),
        'comment_list' => array(
            array(
                'id' => '4',
                'pid' => '0',
                'user_avatar' => 'http://img.gsxservice.com/14285_ecx3y3kx.jpeg',
                'user_name' => 'user_name',
                'user_name_cut' => 'user_name_cut',
                'info' => '老师讲的太好了师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                'create_time' => '2014-09-03 10:55:22',
                'support_num' => '122',
                'reply_num' => '12',
                'is_teacher' => '1',
                'url_teacher' => 'http://www.baidu.om'
            ),
            array(
                'id' => '4',
                'pid' => '0',
                'user_avatar' => 'http://img.gsxservice.com/14285_ecx3y3kx.jpeg',
                'user_name' => 'user_name',
                'user_name_cut' => 'user_name_cut',
                'info' => '老师讲的太好了师讲的太好了asd师讲的太好了，老师讲的太好了阿斯蒂芬老师讲的太好撒旦fwe师讲的太好了，老师讲的太好了，老师讲的太好阿斯顿发老师讲的太好了阿斯顿发讲的太好了，老师讲的太阿斯蒂芬老师讲的太好了，',
                'create_time' => '2014-09-03 10:55:22',
                'support_num' => '122',
                'reply_num' => '12',
                'is_teacher' => '1',
                'url_teacher' => 'http://www.baidu.om'
            ),
        ),
    )
        )
);

