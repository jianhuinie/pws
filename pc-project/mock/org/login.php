<?php

require('../bootstrap.php');

render(
    'userCenter/login/login',
    array(
        'tpl_data' => array(
            'title' => '【汇课间】名师优课，尽在汇课间-跟谁学旗下专业的移动优课平台',
            "keywords" => "【汇课间】名师优课，尽在汇课间-跟谁学旗下专业的移动优课平台",
            "description" => "汇课间是公益互联网教育教育平台，致力于促进教育资源均衡。平台结合先进的教育理念和领先的移动互联网技术，\n                    以及万里挑一的师资与课程资源，为学校提供便捷、高效的直播课、录播课、互动答疑、师生互评、教学数据分析、课程资源\n                    库建设、家校互动、智能教室、智慧教研等服务。www.huikejian.com/"
        )
    )
);
