{{*
@file 热文营销推广页面
@author shubaiqiao
@date 2016-09-06
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "热文营销推广"}}

    {{$page_module = "page/activity/hotDocument/hotDoc_list/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$article = $tpl_data.article}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/hotDocument/hotDoc_list/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text="热文营销推广"}}
    <div class="container">
        <div class="tip">您的主页链接会出现在分享后的文章页面</div>
        {{foreach $article as $list}}
            <div class="list" data-click="30004">
                <div class="img">
                    <img src="{{$list.thumb}}">
                </div>
                <div class="right">
                    <p class="title line-clamp line-clamp-2">{{$list.title}}</p>
                    <div class="info">
                        <p class="read">{{$list.read_count}}阅读</p>&nbsp;&nbsp;&nbsp;
                        <p class="good">{{$list.like_count}}赞</p>
                    </div>
                </div>
            </div>
        {{/foreach}}
        <div class="has-more">
            <div class="typing-loader"></div>
        </div>
        <div class="no-more">
            <div>没有更多热文了，小编正在抓紧更新</div>
        </div>
        <div class="more-flag"></div>
    </div>

{{/block}}