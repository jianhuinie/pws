{{*
@file 金囿-下载页
@author laiqinyong
@date 16/7/12
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = "金囿，更多视角学金融"}}

    {{$page_module = "page/jinyou/download/download"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/jinyou/download/download.styl"/>
{{/block}}
{{block name="content"}}
    <div id="main">
        <div class="head">
            <div class="head-bg">
                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/jinyou/download/image/background.png" alt="">
            </div>
            <div class="app-icon">
                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/jinyou/download/image/jinyou_logo.png" alt="">
            </div>
            <p class="tip"></p>
            <div class="top-image">
                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/jinyou/download/image/top_image.png" alt="">
            </div>
        </div>
        <div class="content">
            <div class="block1">
                <p class="title">100门金融课程</p>
                <p class="brown">金融从业资格到金融专业资格</p>
                <p class="grey">你想学的金融课程都在这里</p>
            </div>
            <div class="block3">
                <p class="title">500场直播讲座</p>
                <p class="grey">基础、强化、冲刺、押题</p>
                <p class="grey">金融考证,全程陪伴</p>
            </div>
            <div class="block4">
                <p class="title">1000门免费视频</p>
                <p class="grey">章节练习、真题模考</p>
                <p class="grey">精准题库助你临门一脚</p>
            </div>
            <div class="block5">
                <p class="title">50000+金融资讯</p>
                <p class="grey">海量资讯，每日更新</p>
                <p class="grey">理论实践，相辅相成</p>
            </div>
        </div>
        <div class="bottom">
            <a href="/download/go">
                <div class="download-btn">下载金囿学堂</div>
            </a>
        </div>

    </div>
{{/block}}