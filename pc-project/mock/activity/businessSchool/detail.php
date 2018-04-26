<?php

require("../../bootstrap.php");

render(
    "activity/businessSchool/detail",
    array(
        "tpl_data" => array(
            "hot_course_banners" => array( // 热门课程banner
                array(
                    "id" => "290",
                    "catid" => "1021",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "id" => "291",
                    "catid" => "1021",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程2",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "id" => "292",
                    "catid" => "1021",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程3",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                )
            ),
            "recent_courses" => array( // 近期课程安排
                "id" => "289",
                "catid" => "1022",
                "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd33931ca.png",
                "name" => "近期课程",
                "listorder" => "0",
                "description" => "很多卡拉胶发；开发；啊啦",
                "webUrl" => ""
            ),
            "hot_courses" => array( // 热门课程
                array(
                    "id" => "290",
                    "catid" => "1021",
                    "tags" => "anchor1",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "id" => "291",
                    "catid" => "1021",
                    "tags" => "anchor2",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程2",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "id" => "292",
                    "catid" => "1021",
                    "tags" => "anchor3",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程3",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "id" => "292",
                    "catid" => "1021",
                    "tags" => "anchor4",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程4",
                    "listorder" => "0",
                    "description" => "法律框架发；开发；阿奎罗发；浪费；啊",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                )
            ),
            "student_photos" => array( // 学员见证 － 照片集
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "课程1"
                )
            ),
            "student_docs" => array( // 学员见证 － 话术
                array(
                    "content" => "跟谁学团队是我见过的最牛逼的团队，他们有太多太多值得我们学习每次和跟谁学的人见面都能学到东西，包括陈向东老师，eric，陆毅，全娟，每次都让我受益匪浅，我每次看到他们只有感恩，老是想请他们吃饭.",
                    "org" => "洛阳金榜教育",
                    "name" => "董战坤1"
                ),
                array(
                    "content" => "跟谁学团队是我见过的最牛逼的团队，他们有太多太多值得我们学习每次和跟谁学的人见面都能学到东西，包括陈向东老师，eric，陆毅，全娟，每次都让我受益匪浅，我每次看到他们只有感恩，老是想请他们吃饭.",
                    "org" => "洛阳金榜教育",
                    "name" => "董战坤2"
                ),
                array(
                    "content" => "跟谁学团队是我见过的最牛逼的团队，他们有太多太多值得我们学习每次和跟谁学的人见面都能学到东西，包括陈向东老师，eric，陆毅，全娟，每次都让我受益匪浅，我每次看到他们只有感恩，老是想请他们吃饭.",
                    "org" => "洛阳金榜教育",
                    "name" => "董战坤3"
                ),
                array(
                    "content" => "跟谁学团队是我见过的最牛逼的团队，他们有太多太多值得我们学习每次和跟谁学的人见面都能学到东西，包括陈向东老师，eric，陆毅，全娟，每次都让我受益匪浅，我每次看到他们只有感恩，老是想请他们吃饭.",
                    "org" => "洛阳金榜教育",
                    "name" => "董战坤4"
                ),
                array(
                    "content" => "跟谁学团队是我见过的最牛逼的团队，他们有太多太多值得我们学习每次和跟谁学的人见面都能学到东西，包括陈向东老师，eric，陆毅，全娟，每次都让我受益匪浅，我每次看到他们只有感恩，老是想请他们吃饭.",
                    "org" => "洛阳金榜教育",
                    "name" => "董战坤5"
                ),
            ),
            "lecturers" => array( // 讲师天团
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字1",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字2",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字3",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字4",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字5",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字6",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字7",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "讲师名字8",
                    "description" => "陈龙博士曾在美国任教多年，长期教授投资和融资课程，获得美国华盛顿"
                ),
            ),
            "cooper_partners" => array( // 合作机构
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                ),
                array(
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574bfd78ea2cf.png",
                    "name" => "某某机构",
                    "webUrl" => "http://www.genshuixue.com/bj/"
                )
            )
        )
    )
);