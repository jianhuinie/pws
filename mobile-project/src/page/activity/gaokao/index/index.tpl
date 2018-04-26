{{*
@file 高考首页（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "最全的高考志愿填报专区"}}
    {{$page_module = "page/activity/gaokao/index/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/gaokao/index/index.styl"/>
{{/block}}

{{block name="content"}}

    {{*include file="page/_common/nav_bar/nav_bar.tpl" text="最全的高考志愿填报专区       跟谁学" *}}
    <section class="wrap-show">
        <ul class="first-wrap clearfix">
            <a href="https://m.genshuixue.com/i-gaokao/school">
            <li class="query-content">
                    <img data-src="{{$static_origin}}/src/page/activity/gaokao/image/ic_search_yuanxiao.png" class="title-icon">
                    <div class="query-title">
                        <h1>查各院校</h1>
                        <p>各大院校信息</p>
                    </div>

            </li>
            <a href="https://m.genshuixue.com/i-gaokao/major_relate">
            <li class="query-content">
                    <img data-src="{{$static_origin}}/src/page/activity/gaokao/image/ic_search_zhuanye.png" class="title-icon">
                    <div class="query-title">
                        <h1>查院校专业</h1>
                        <p>各大院校专业查询</p>
                    </div>

            </li>
            </a>
            {{$province = $tpl_data.city.province}}
            <a href="http://www.chaojizhiyuan.com/wap/pici/query.html">
            <li class="query-content">
                    <img data-src="{{$static_origin}}/src/page/activity/gaokao/image/ic_search_fenshuxian.png" class="title-icon">
                    <div class="query-title">
                        <h1>查批次线</h1>
                        <p>各省录取批次线</p>
                    </div>

            </li>
            </a>
        </ul>

        <ul class="second-wrap clearfix">
            {{if $tpl_data.zy_param}}
            <a href="http://m.chaojizhiyuan.com/plan/index.html?zy_param={{$tpl_data.zy_param}}">
            {{else}}
            <a href="http://m.chaojizhiyuan.com/plan/index.html">
            {{/if}}
                <li class="test-content right-line">
                    <img data-src="{{$static_origin}}/src/page/activity/gaokao/image/ic_search_zhushou.png" class="test-icon">
                    <img src="{{$static_origin}}/src/page/activity/gaokao/image/hot-icon.png" class="hot-icon">
                    <div class="pro-test">
                        <h1>志愿填报助手</h1>
                        <p>专属订制志愿填报方案</p>
                    </div>
                </li>
            </a>
            <a href="http://m.chaojizhiyuan.com/paper/index.html?zn=gkzy">
                <li class="test-content">
                    <img data-src="{{$static_origin}}/src/page/activity/gaokao/image/ic_search_ceshi.png" class="test-icon">
                    <div class="pro-test">
                        <h1>职业性格测试</h1>
                        <p>快速了解自己的性格定位</p>
                    </div>
                </li>
            </a>
        </ul>
    </section>

    <a href="https://m.genshuixue.com/i-gaokao/school/article" class="daoliu">
        <img class="dl_l" src="{{$static_origin}}/src/page/activity/gaokao/image/dl_l.png">
        <img class="dl_r" src="{{$static_origin}}/src/page/activity/gaokao/image/dl_r.png">
    </a>

    {{$len1 = $tpl_data.teachers.online|count}}
    <section class="super">
        <span><h2>超级专家</h2></span>
        <span class="super-des">考得好不如填得好</span>
        <ul class="super-list">
            {{foreach $tpl_data.teachers.online as $key => $item}}
            {{if $key < 3}}
                <a href="{{$item.detail_url}}">
                    <li class="super-card">
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}
                        {{if isset($item.is_hot_teacher) && $item.is_hot_teacher == true}}
                            <img src="{{$static_origin}}/src/page/activity/gaokao/image/hot-icon.png" class="hot-teachers-icon">
                        {{/if}}
                        </p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        {{$display_name = $item.teacher.display_name|cn_truncate:6}}
                        <p class="super-name">{{$display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        {{if $item.has_buy == false}}
                        <div class="super-button-unpay">
                            免费报名
                        </div>
                        {{else}}
                        <div class="super-button-haspay">
                            已报名
                        </div>
                        {{/if}}
                    </li>
                </a>
            {{/if}}
            {{/foreach}}
            {{if $len1 < 3}}
            {{foreach $tpl_data.teachers.video as $key => $item}}
            {{if $key < 3-$len1}}
                <a class="video-course" data-href="{{$item.detail_url}}" data-number="{{$item.course_number}}">
                    <li class="super-card">
                        {{if isset($item.is_hot_teacher) && $item.is_hot_teacher == true}}
                        <img src="{{$static_origin}}/src/page/activity/gaokao/image/hot-icon.png" class="hot-teachers-icon">
                        {{/if}}
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}</p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        <p class="super-name">{{$item.teacher.display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        <div class="super-button-video">
                            观看回放
                        </div>
                    </li>
                </a>
            {{/if}}
            {{/foreach}}
            {{/if}}
        </ul>
        <div class="has_more">
            <a href="/gaokao/teacher">
                <p>查看全部课程></p>
            </a>
        </div>
    </section>

    <div class="baner-wrap">
        <div class="top-slider top-sliders-container" id="myslider">
            <ul class="slide_group clearfix">
                {{foreach $tpl_data.banner_list as $item}}
                <li class="slide" data-index="{{$item@index}}">
                    <a href="{{$item.url}}">
                        <img width="100%" height="100%" data-src="{{$item.image}}"/>
                    </a>
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach $tpl_data.banner_list as $item}}
                {{if $item@index == 0}}
                <li class="on">
                    <span></span>
                </li>
                {{else}}
                <li>
                    <span></span>
                </li>
                {{/if}}
                {{/foreach}}
            </ul>
        </div>
    </div>

    {{$len2 = $tpl_data.admissions.online|count}}
    <section class="zhuren">
        <span><h2>招办主任</h2></span>
        <span class="super-des">最新政策在线解读</span>
        <ul class="zhuren-list clearfix">
            {{foreach $tpl_data.admissions.online as $key => $item}}
            {{if $key < 3}}
                <a href="{{$item.detail_url}}">
                <li class="zhuren-card">
                    <img data-src="{{$item.school_logo}}" class="zhuren-avatar">
                    <p class="zhuren-school">{{$item.school_name}}</p>
                    <p class="zhuren-date">{{$item.class_date}}</p>
                    <p class="zhuren-date">{{$item.class_time}}</p>
                        {{if $item.has_buy == false}}
                        <div class="zhuren-button-unpay">
                            免费报名
                        </div>
                        {{else}}
                        <div class="zhuren-button-haspay">
                            已报名
                        </div>
                        {{/if}}
                </li>
                </a>
            {{/if}}
            {{/foreach}}
            {{if $len2 < 3}}
            {{foreach $tpl_data.admissions.video as $key => $item}}
            {{if $key < 3-$len2}}
                <a class="video-course" data-href="{{$item.detail_url}}" data-number="{{$item.course_number}}">
                    <li class="zhuren-card">
                        <img data-src="{{$item.school_logo}}" class="zhuren-avatar">
                        <p class="zhuren-school">{{$item.school_name}}</p>
                        <p class="zhuren-date">已结束</p>
                        <p class="zhuren-date">播放{{$item.play_count}}次</p>
                        <div class="zhuren-button-video">
                            观看回放
                        </div>
                    </li>
                </a>
            {{/if}}
            {{/foreach}}
            {{/if}}
        </ul>
        <div class="has_more_zhuren">
            <a href="/gaokao/admission">
                <p>查看全部></p>
            </a>
        </div>
    </section>

    <section class="zhuren">
        <span><h2>师兄师姐</h2></span>
        <span class="super-des">亲身介绍学校专业</span>
        <ul class="zhuren-list clearfix">
            {{foreach $tpl_data.senior as $item}}
            <a href="{{$item.video_url}}">
                <li class="brother-card">
                    <img data-src="{{$item.logo}}" class="zhuren-avatar">
                    {{$item.major = $item.major|cn_truncate:6}}
                    <p class="zhuren-school">{{$item.major}}</p>
                    <div class="name-school">
                        <p>{{$item.name}}</p>
                        <p>{{$item.school_name}}</p>
                    </div>
                    <div class="brother-button-video">
                        观看视频
                    </div>
                </li>
            </a>
            {{/foreach}}
        </ul>
        <div class="has_more_brother">
            <a href="/gaokao/senior">
                <p>查看全部></p>
            </a>
        </div>
    </section>

    <section class="gaokao-news">
        <span><h2>必读资讯</h2></span>
        <span class="super-des">最新政策在线解读</span>
        <div class="news-tabs">
            <span class="item-tab tab-on">必读</span>
            <span class="item-tab">政策</span>
            <span class="item-tab">专业</span>
            <span class="item-tab">院校</span>
        </div>

        <ul class="item-list">
            <div class="new-content">
            {{foreach $tpl_data.news_list as $item}}
                <li class="item-card">
                    <a href="{{$item.paper_url}}">
                    <img src="{{$item.cover.url}}" class="item-avatar">
                    <div class="item-content">
                        {{$item.paper_title = $item.paper_title|cn_truncate:10}}
                        <h1>{{$item.paper_title}}</h1>
                        {{$item.paper_snippet = $item.paper_snippet|cn_truncate:20}}
                        <p>{{$item.paper_snippet}}</p>
                        <span><img src="{{$static_origin}}/src/page/activity/gaokao/image/ic_eye_yuedu.png" class="item-yuedu-icon"></span>
                        <span><p>{{$item.paper_views}}次阅读</p></span>
                    </div>
                    </a>
                </li>
            {{/foreach}}
        </div>
        </ul>
    </section>

    <section class="rank-pic">
        <a  href="https://m.genshuixue.com/teacher/classCourseDetail/170527504042?zn=zn_gkzy_zyzt_xfc" class="rank-ad">
            <img src="{{$static_origin}}/src/page/activity/gaokao/image/ic_ad.png" class="rank-banner">
        </a>
        <a href="/gaokao/rank">
            <img src="{{$static_origin}}/src/page/activity/gaokao/image/rank-pic.jpg" class="rank-pic-show">
            <div class="rank-text">
                <h1>彩蛋之十五大排行榜</h1>
                <p>高薪专业排行榜、就业率TOP50榜、读研比例高专业排行榜...</p>
            </div>
        </a>
    </section>
    <section class="share-infos">
        <p>这么好的专题，我得赶紧分享给小伙伴们!</p>
        <div class="share-button"><p>分享给小伙伴</p></div>
    </section>
    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>

    {{include file="page/activity/gaokao/_part/index.tpl"}}
{{/block}}