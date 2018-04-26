{{*
@file 老师列表
@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = "老师列表页"}}
    {{$page_module = "page/orgDetail/teacherList/index"}}
    {{$enable_backTopButton = true}}

    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgDetail/teacherList/index.styl"/>
{{/block}}


{{block name="content"}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="老师列表"}}

<div class="container">
    {{foreach $tpl_data.hot_teacher.list as $item}}
        <div class="item" data-url="{{$item.url}}">
            <img data-src="{{$item.avatar}}">
            <div class="infos">
                <div class="name">{{$item.name}}</div>
                <div class="subject line-clamp">{{$item.course}}</div>
                <div class="detail line-clamp">{{$item.short_introduce}}</div>
                {{if $item.price > 0}}
                <div class="price">￥ {{$item.price}}</div>
                {{/if}}
            </div>
        </div>
    {{/foreach}}
</div>

<div class="has-more hide" data-next-cursor="2">
    还有更多
</div>


{{/block}}