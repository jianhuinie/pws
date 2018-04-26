{{*
    @file 即时直播 落地页（分享链接所打开的页面）
    @author nanci
    @date 2016-11-29
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "{{$tpl_data.teacher_info.display_name}}老师的直播间"}}
    {{$page_module = "page/immediateLive/share/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.number = $smarty.get.number}}
    {{$script_data.check_key = $tpl_data.check_key}}
    {{$script_data.display_name = $tpl_data.teacher_info.display_name}}
    {{$live_status = $tpl_data.live_lesson_info.live_status}}
    {{if !empty($tpl_data.live_lesson_info.m_site)}}
    {{$live_url_m = $tpl_data.live_lesson_info.m_site}}
    {{$script_data.live_url_m = $tpl_data.live_lesson_info.m_site}}
    {{/if}}
    {{if !empty($tpl_data.live_lesson_info.app) }}
    {{$live_url_app = $tpl_data.live_lesson_info.app}}
    {{$script_data.live_url_app = $tpl_data.live_lesson_info.app}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/immediateLive/share/index.styl"/>
{{/block}}

{{block name="content"}}
<div id="main" data-live-url-m="{{if !empty($live_url_m)}}{{$live_url_m}}{{/if}}" data-live-url-app="{{if !empty($live_url_app)}}{{$live_url_app}}{{/if}}">
    <section class="cover">
        <div class="mask"></div>
        <img data-src="{{$tpl_data.live_lesson_info.cover_url}}" alt="" class="img">
        <div class="entry-or-not tac">
                <img src="./img/play.png" alt="" class="img playing{{if $tpl_data.live_lesson_info.live_status eq false}} hidden{{/if}}">
            <span class="entry tip{{if $tpl_data.live_lesson_info.live_status eq false}} not-playing{{/if}}">{{if $tpl_data.live_lesson_info.live_status eq true}}正在直播：{{$tpl_data.live_lesson_info.title}}{{else}}没有进行中的直播{{/if}}</span>
        </div>
        <div class="teacher-info ovh">
            <img data-src="{{$tpl_data.teacher_info.avatar}}" alt="" class="avatar fll">
            <div class="text fll">
                <div class="name">{{$tpl_data.teacher_info.display_name}}</div>
                <div class="brief-intro">{{$tpl_data.teacher_info.short_introduce|truncate:14}}</div>
            </div>
            <div class="open-in-app tac hidden">在APP中打开</div>
        </div>
    </section>
    <section class="homepage">
        <a href="{{$tpl_data.teacher_home_url}}" class="wrapper ovh">
            <img src="./img/home.png" alt="" class="img">
            <span class="desc">老师主页</span>
            <i class="icon icon-chevron-thin-right"></i>
        </a>
    </section>
    <section class="live-hall hidden">
        <a href="#" class="wrapper ovh">
            <img src="./img/tv.png" alt="" class="img">
            <span class="desc">直播大厅</span>
            <i class="icon icon-chevron-thin-right"></i>
            <span class="desc-more">更多直播，精彩好课</span>
        </a>
    </section>
    <section class="course-list">
        {{if !empty($tpl_data.live_course_list)}}
        <div class="title">
            <div class="desc">更多精彩课程</div>
            <a href="http://m.genshuixue.com/" class="more">查看更多</a>
        </div>
        {{foreach $tpl_data.live_course_list as $item0}}
        <a href="{{$item0.detail_url}}" class="unit ovh">
            <img data-src="{{$item0.cover_url}}" alt="" class="face fll">
            {{$typeText = "直播课"}}
            <div class="text fll">
                <div class="type tac">{{$typeText}}</div>
                <div class="name text-ellipsis">{{$item0.name}}</div>
                <div class="price{{if empty($item0.price)}} price-free{{/if}}">{{if empty($item0.price)}}免费{{else}}￥{{$item0.price}}{{/if}}</div>
            </div>
        </a>
        {{/foreach}}
        {{/if}}
        {{if !empty($tpl_data.courses_list.list)}}
        <div class="title">
            <div class="desc">Ta的精彩课程</div>
            <a href="{{$tpl_data.more_courses_url}}" class="more">查看全部</a>
        </div>
        {{foreach $tpl_data.courses_list.list as $item0}}
        <a href="{{$item0.url}}" class="unit ovh">
            <img data-src="{{$item0.cover_url}}" alt="" class="face fll">
            {{if $item0.type eq 1}}
            {{$typeText = "一对一"}}
            {{else if $item0.type eq 2}}
            {{$typeText = "班课"}}
            {{else if $item0.type eq 3}}
            {{$typeText = "视频课"}}
            {{else if $item0.type eq 4}}
            {{$typeText = "线下班课"}}
            {{/if}}
            <div class="text fll">
                <div class="type tac">{{$typeText}}</div>
                <div class="name text-ellipsis">{{$item0.name}}</div>
                <div class="price{{if empty($item0.price)}} price-free{{/if}}">{{if empty($item0.price)}}免费{{else}}￥{{$item0.price}}{{/if}}</div>
            </div>
        </a>
        {{/foreach}}
        {{/if}}
    </section>
    <section class="signup ovh hidden">
        <span class="desc">直播全面开放，在线教学如此简单</span>
        <a href="/static/login?usertype=0&next={{$smarty.server.REQUEST_URI}}" class="free tac">免费注册</a>
    </section>
    <div class="download-mask">
        <div class="content">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57c553cdc7b48.png">
        </div>
    </div>
</div>
{{/block}}