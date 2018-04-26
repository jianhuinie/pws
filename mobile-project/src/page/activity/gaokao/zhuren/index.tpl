{{*
@file 高考首页（活动）招办主任落地页
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "招办主任"}}
    {{$page_module = "page/activity/gaokao/zhuren/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}


{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/gaokao/zhuren/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="招办主任"}}
    <section class="search">
        <form id="search-form" method="get" action="">
            <input class="search-value" placeholder="搜索你感兴趣的学校" type="text" name="school"/>
            <span class="btn-search" onclick="$('#search-form').submit()">搜索</span>
        </form>
    </section>

    {{if isset($tpl_data.admissions.online)}}
    <section class="zhuren">
        <span><h2>即将进行</h2></span>
        <ul class="zhuren-list clearfix">
            {{foreach $tpl_data.admissions.online as $key => $item}}
            {{if $key < 9}}
            <a href="{{$item.detail_url}}">
                <li class="zhuren-card">
                    <img data-src="{{$item.school_logo}}" class="zhuren-avatar">
                    {{$item.school_name = $item.school_name|cn_truncate:6}}
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
        </ul>
        {{$length = $tpl_data.admissions.online|count}}
        {{if $length > 9}}
        <div class="has_more">
            <img src="{{$static_origin}}/src/page/activity/gaokao/image/bottom-icon.png" class="bottom-icon">
            <p>查看更多课程</p>
        </div>
        {{/if}}
    </section>
    {{/if}}
    {{if isset($tpl_data.admissions.video)}}
    <section class="zhuren-2">
        <span><h2>往期回顾</h2></span>
        <ul class="zhuren-list-2 clearfix">
            {{foreach $tpl_data.admissions.video as $key => $item}}
            {{if $key < 9}}
            <a class="video-course" data-href="{{$item.detail_url}}" data-number="{{$item.course_number}}" data-appnojump="true">
                <li class="zhuren-card">
                    <img data-src="{{$item.school_logo}}" class="zhuren-avatar">
                    {{$item.school_name = $item.school_name|cn_truncate:6}}
                    <p class="zhuren-school">{{$item.school_name}}</p>
                    <p class="zhuren-date">播放{{$item.play_count}}次</p>
                        <div class="zhuren-button-video">
                            观看回放
                        </div>
                </li>
            </a>
            {{/if}}
            {{/foreach}}
        </ul>
        {{$length = $tpl_data.admissions.video|count}}
        {{if $length > 9}}
        <div class="has_more-2">
            <img src="{{$static_origin}}/src/page/activity/gaokao/image/bottom-icon.png" class="bottom-icon">
            <p>查看更多课程</p>
        </div>
        {{/if}}
    </section>
    {{/if}}
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