{{*
@file 高考首页（活动）师兄师姐落地页
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "师兄师姐"}}
    {{$page_module = "page/activity/gaokao/brother/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/gaokao/brother/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="师兄师姐"}}

    <section class="super-1">
        <ul class="super-list">
            {{foreach $tpl_data.senior as $key => $item}}
                {{if $key < 3}}
                <li class="super-card clearfix">
                     <a href="{{$item.video_url}}">
                        <img data-src="{{$item.logo}}" class="super-avatar">
                        <div class="super-text">
                            <p class="super-name">{{$item.major}}</p>
                                <span>{{$item.name}}</span>
                                <span><p>.</p></span>
                                {{$school_name = $item.school_name|cn_truncate:6}}
                                <span>{{$school_name}}</span>
                            <p class="super-see">随时看</p>
                        </div>
                        <div class="super-button-video">
                            <p>观看视频</p>
                        </div>
                    </a>
                </li>
                {{else}}
                <li class="super-card clearfix hide">
                     <a href="{{$item.video_url}}">
                        <img src="{{$item.logo}}" class="super-avatar">
                        <div class="super-text">
                            <p class="super-name">{{$item.major}}</p>
                                <span>{{$item.name}}</span>
                                <span><p>.</p></span>
                                {{$school_name = $item.school_name|cn_truncate:6}}
                                <span>{{$school_name}}</span>
                            <p class="super-see">随时看</p>
                        </div>
                        <div class="super-button-video">
                            <p>观看视频</p>
                        </div>
                    </a>
                </li>
                {{/if}}
            {{/foreach}}
        </ul>
        {{$length = $tpl_data.senior|count}}
        {{if $length > 3}}
        <div class="has_more">
            <span><p>查看全部课程</p></span>
            <span><img src="{{$static_origin}}/src/page/activity/gaokao/image/bottom-icon.png" class="bottom-icon"></span>
        </div>
        {{/if}}
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