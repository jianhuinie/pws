{{*
@file 考研-下载页
@author chenmo
@date 16/2/24
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = "考研人的专属神器"}}

    {{$page_module = "page/kaoyan/download/download"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/kaoyan/download/download.styl"/>
{{/block}}
{{block name="content"}}
    <div id="main">
        <div class="head">
            <div class="head-bg">
                <img width="100%" height="100%" data-src="./image/background.png" alt="">
            </div>
            <div class="app-icon">
                <img width="100%" height="100%" data-src="./image/kaoyan-logo.png" alt="">
            </div>
            <p class="tip">考研人的专属神器</p>
            <div class="top-image">
                <img width="100%" height="100%" data-src="./image/top_image.png" alt="">
            </div>
        </div>
        <div class="content">
            <div class="block1">
                <p class="title">20多位考研名师</p>
                <p class="red">李永乐、徐之明、任汝芬、钟平、商志</p>
                <p class="grey">你知道的大咖老师都在这里</p>
            </div>
            <div class="block2">
                <img width="100%" height="100%" src="./image/teachers.png" alt="">
            </div>
            <div class="block3">
                <p class="title">500场直播讲座</p>
                <p class="grey">基础、强化、冲刺、押题</p>
                <p class="grey">考研全程,相依相守</p>
            </div>
            <div class="block4">
                <p class="title">1000门免费视频</p>
                <p class="grey">数学、政治、英语、专业课</p>
                <p class="grey">随时随地,想学就学</p>
            </div>
            <div class="block5">
                <p class="title">98%的考研学生</p>
                <p class="title">上过他们的课</p>
                <p class="grey">2017考研<span class="red">跟谁学考研</span></p>
                <p class="grey">一路相随,不离不弃</p>
            </div>
        </div>
        <div class="bottom">
            <a href="/download/go">
                <div class="download-btn">下载跟谁学考研</div>
            </a>
        </div>

    </div>
{{/block}}